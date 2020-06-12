import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";
import moment from "moment";

function compareDateTime(a, b) {
  const first = moment(a.date, "DD-MMM-YY hh:mm A").format();
  const second = moment(b.date, "DD-MMM-YY hh:mm A").format();

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
}

function WeekRange() { // get acad year base on real time later on.
  return fetch('https://api.nusmods.com/v2/2019-2020/modules/CS2040.json')
    .then((result) => result.json())
    .then((data) => {
      var semData = data['semesterData'];
      var weekRange;
      for (var sem in semData) {
        if ("start" in semData[sem]['timetable'][0]['weeks']) {
          weekRange = semData[sem]['timetable'][0]['weeks']
          break;
        }
      }
      return weekRange;
    });
}

const ManageBookingFB = {
  getUserBookings: function (id, status, week, day) {
    return database.ref(`modules`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var allUserBookings = [];
        for (var modCode in obj) { //Loop through each module
          var modules = obj[modCode];
          var bookings = modules["bookings"];
          if (bookings != undefined) {
            for (var userBookings in bookings) { //Loop through each booking
              var individualBookings = bookings[userBookings]
              var creator = individualBookings["creator"];
              var ta = individualBookings["ta"];
              var studentsInvolved = individualBookings["participants"];
              if (creator === id || ta === id || (id in studentsInvolved)) { //Check if user is involved in the consultation
                //var bookTime = individualBookings[bookTime] //for sorting later on base on priority queue
                var bookingId = Object.keys(bookings)[0];
                var type = individualBookings["type"];
                var location = individualBookings["location"];
                var consultDate = individualBookings["consultDate"];
                var consultStartTime = individualBookings["consultStartTime"];
                var consultEndTime = individualBookings["consultEndTime"];
                var agenda = individualBookings["agenda"];
                var consultStatus = individualBookings["consultStatus"];
                allUserBookings.push({bookingId: bookingId, module: modCode, ta: ta, type: type, location: location, consultDate: consultDate, consultStartTime: consultStartTime, consultEndTime: consultEndTime, agenda: agenda, participants: studentsInvolved, consultStatus: consultStatus});
              }
            }
          }
        }
        return allUserBookings.sort(compareDateTime);
      }).then((data) => {
          return data.filter(rsl => //Filter by status
              rsl.status === status || status === "All Status"
            ).filter(rsl => { //Filter by day
              var bookDay = moment(rsl.date).format('dddd');
              return bookDay === day || day === "All Days";
            });
      })
  },
  getNumWeeks: function() {
    return WeekRange().then((date) => {
      var start = moment(date['start']);
      var end = moment(date['end']);
      return end.diff(start, 'weeks');
    });
  }
};

export default ManageBookingFB;
