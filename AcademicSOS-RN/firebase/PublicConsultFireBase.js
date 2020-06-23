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
  return fetch("https://api.nusmods.com/v2/2019-2020/modules/CS2040.json") //This part, to be made dynamic in future
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
}

function getAltStatus(id, modCode, bookingId, obj) {
  var participants = obj[bookingId]["participants"];
  for (var user in participants) {
    if (id == participants[user]["id"]) {
      return participants[user]["altStatus"];
    }
  }
}

const PublicConsultFB = {
  getPublicConsultation: function (userId, modCode, week, day) {
    return database
      .ref(`modules/${modCode}/bookings`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var allPublicBookings = [];
        for (var bookings in obj) {
          var individualBookings = obj[bookings];
          var type = individualBookings["type"];
          var participants = individualBookings["participants"];
          var consultStatus = individualBookings["consultStatus"];
          var size = individualBookings["size"];
          if (type == "Public" && (participants == " " || participants.length != size && getAltStatus(userId, modCode, bookings, obj) === "Pending")) {
            var creator = individualBookings["creator"];
            var bookingId = bookings;
            var ta = individualBookings["ta"];
            var location = individualBookings["location"];
            var consultDate = individualBookings["consultDate"];
            var consultStartTime = individualBookings["consultStartTime"];
            var consultEndTime = individualBookings["consultEndTime"];
            var agenda = individualBookings["agenda"];
            var studentsInvolved = individualBookings["participants"];
            var weekRange = individualBookings["weekRange"];
            var bookDate = individualBookings["bookDate"];
            var bookTime = individualBookings["bookTime"];
            allPublicBookings.push({
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
        return allPublicBookings.sort(compareDateTime);
      })
      .then((data) => {
        return data //Filter by status
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

export default PublicConsultFB;
