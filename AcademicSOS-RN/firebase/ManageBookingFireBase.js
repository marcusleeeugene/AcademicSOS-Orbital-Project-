import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";
import moment from "moment";

function compareDateTime(a, b) {
  const firstTime = moment(a.consultDate + " " + a.consultStartTime, ["DD-MMM-YY hh:mm A"]).format();
  const secondTime = moment(b.consultDate + " " + b.consultStartTime, ["DD-MMM-YY hh:mm A"]).format();

  let comparison = 0;
  if (firstTime > secondTime) {
    comparison = 1;
  } else if (firstTime < secondTime) {
    comparison = -1;
  }
  return comparison;
}

function WeekRange() {
  //get a promise for week range within acad year based on real time later on.
  return database
    .ref(`modules`)
    .once("value")
    .then((snapshot) => snapshot.val())
    .then((data) => {
      var acadYear = data.acadYear;
      return fetch(`https://api.nusmods.com/v2/${acadYear}/modules/CS2040.json`) //This part, to be made dynamic in future
        .then((result) => result.json())
        .then((data) => {
          var semData = data["semesterData"];
          var weekRange;
          for (var sem in semData) {
            if ("start" in semData[sem]["timetable"][0]["weeks"]) {
              weekRange = semData[sem]["timetable"][0]["weeks"];
              break;
            }
          }
          return weekRange;
        });
    });
}

function checkStudentIsParticipant(id, participants) {
  for (var i = 0; i < participants.length; i++) {
    if (id === participants[i]["id"]) {
      return true;
    }
  }
  return false;
}

function checkAllAltStatus(participants) { //return true if all altStatus is accepted and consultStatus confirmed
  for (var user in participants) {
    if (participants[user].altStatus != "Accepted") {
      return false;
    }
  }
  return true;
}

const ManageBookingFB = {
  getModRole: function (id, modCode) {
    //Returns a promise of module role for user in the module
    return database
      .ref(`users/${role(id)}/${id}/modules/${modCode}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        return obj["role"];
      });
  },
  getUserBookings: function (id, status, week, day) {
    return database
      .ref(`modules`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var allUserBookings = [];
        for (var modCode in obj) {
          //Loop through each module
          var modules = obj[modCode];
          var bookings = modules["bookings"];
          if (bookings != undefined) {
            for (var userBookings in bookings) {
              //Loop through each booking
              var individualBookings = bookings[userBookings];
              var creator = individualBookings["creator"];
              var ta = individualBookings["ta"];
              var bookingId = Object.keys(bookings)[0];
              var type = individualBookings["type"];
              var location = individualBookings["location"];
              var consultDate = individualBookings["consultDate"];
              var consultStartTime = individualBookings["consultStartTime"];
              var consultEndTime = individualBookings["consultEndTime"];
              var agenda = individualBookings["agenda"];
              var consultStatus = individualBookings["consultStatus"];
              var size = individualBookings["size"];
              var weekRange = individualBookings["weekRange"];
              var bookDate = individualBookings["bookDate"];
              var bookTime = individualBookings["bookTime"];
              if (individualBookings["participants"] == " ") {
                if (creator === id || ta["id"] === id) {
                  //Check if user is involved in the consultation (No checkStudentIsParticipant as it is public consult)
                  //var bookTime = individualBookings[bookTime] //for sorting later on base on priority queue
                  allUserBookings.push({
                    creator: creator,
                    bookingId: bookingId,
                    module: modCode,
                    ta: ta,
                    size: size,
                    type: type,
                    location: location,
                    consultDate: consultDate,
                    consultStartTime: consultStartTime,
                    consultEndTime: consultEndTime,
                    agenda: agenda,
                    participants: " ",
                    consultStatus: consultStatus,
                    weekRange: weekRange,
                    bookDate: bookDate,
                    bookTime: bookTime,
                  });
                }
              } else {
                var studentsInvolved = individualBookings["participants"]; //create consult not adding in participants
                if (creator === id || (ta["id"] === id && checkAllAltStatus(studentsInvolved)) || checkStudentIsParticipant(id, studentsInvolved)) {
                  //Check if user is involved in the consultation
                  allUserBookings.push({
                    creator: creator,
                    bookingId: bookingId,
                    module: modCode,
                    ta: ta,
                    size: size,
                    type: type,
                    location: location,
                    consultDate: consultDate,
                    consultStartTime: consultStartTime,
                    consultEndTime: consultEndTime,
                    agenda: agenda,
                    participants: studentsInvolved,
                    consultStatus: consultStatus,
                    weekRange: weekRange,
                    bookDate: bookDate,
                    bookTime: bookTime,
                  });
                }
              }
            }
          }
        }
        return allUserBookings.sort(compareDateTime);
      })
      .then((data) => {
        return data //Filter by status
          .filter((rsl) => rsl.consultStatus === status || status === "All Status")
          .filter((rsl) => {
            //Filter by week
            var selectedWeek = week.split(" ")[1];
            var startingWeek = moment(rsl.weekRange["start"]);
            var selectedDate = moment(rsl.consultDate);
            return selectedWeek == selectedDate.diff(startingWeek, "weeks") || selectedWeek === "Weeks";
          })
          .filter((rsl) => {
            //Filter by day
            var bookDay = moment(rsl.consultDate).format("dddd");
            return bookDay === day || day === "All Days";
          });
      });
  },
  getNumWeeks: function () {
    //returns a promise for the number of weeks of current academic semester
    return WeekRange().then((date) => {
      var start = moment(date["start"]);
      var end = moment(date["end"]);
      return end.diff(start, "weeks");
    });
  },
};

export default ManageBookingFB;
