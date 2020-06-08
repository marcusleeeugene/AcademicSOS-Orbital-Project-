import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";
import moment from "moment";

function compareDate(a, b) {
  const first = moment(a.bookDate, "DD-MMM-YY").format();
  const second = moment(b.bookDate, "DD-MMM-YY").format();

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
}

function compareTime(a, b) {
  const first = moment(a.startTime, 'hh:mm A').format();
  const second = moment(b.startTime, 'hh:mm A').format();

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
}

const ManageBookingFB = {
  getUserBookings: function (id, status, week, day) {
    return database.ref(`modules`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var allUserBookings = [];
        for (var mod in obj) {
          var modules = obj[mod];
          var bookings = modules["bookings"];
          if (bookings != undefined) {
            for (var userBookings in bookings) {
              var individualBookings = bookings[userBookings]
              var creator = individualBookings["creator"];
              var ta = individualBookings["ta"];
              if (creator === id || ta === id || (id in individualBookings["ta"])) {
                var bookDate = individualBookings["bookDate"];
                var startTime = individualBookings["startTime"];
                var remarks = individualBookings["remarks"];
                //var bookTime = individualBookings[bookTime] //for sorting later on base on priority queue
                allUserBookings.push({module: mod, bookDate: bookDate, startTime: startTime, ta: ta, remarks: remarks});
              }
            }
          }
        }
        return allUserBookings.sort(compareDate).sort(compareTime);
      }).then((data) => {
          return data//.filter(status); //do filter here
      })
  }
};

export default ManageBookingFB;
