import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

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
                allUserBookings.push({module: modules, bookDate: bookDate, startTime: startTime, ta: ta, remarks: remarks});
              }
            }
          }
        }
      });
      return allUserBookings;
  }
};

export default ManageBookingFB;

ManageBookingFB.getUserBookings("e0415870", 'All Status', 'All Weeks', 'All Days');
