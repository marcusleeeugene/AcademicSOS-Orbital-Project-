import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const ConfirmedFB = {
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
  getConsultSize: function (bookingId, modCode) {
    //Returns a promise of consult size
    return database
      .ref(`modules/${modCode}/bookings/${bookingId}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        return obj["size"];
      });
  },

  NonCreatorCancelPublicBooking: function (consultDetails, bookingId, status) {
    //Non creator cancels booking
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).update({
      consultStatus: status,
      creator: consultDetails["creator"],
      ta: consultDetails["ta"],
      type: consultDetails["type"],
      location: consultDetails["location"],
      consultDate: consultDetails["consultDate"],
      consultStartTime: consultDetails["consultStartTime"],
      consultEndTime: consultDetails["consultEndTime"],
      agenda: consultDetails["agenda"],
      participants: consultDetails["participants"],
      size: consultDetails["size"],
      bookDate: consultDetails["bookDate"],
      bookTime: consultDetails["bookTime"],
      weekRange: consultDetails["weekRange"],
    });
  },

  NonCreatorCancelPrivateBooking: function (consultDetails, bookingId, status) {
    //Non creator cancels booking
    database
      .ref(`modules/${consultDetails["module"]}/bookings`)
      .child(bookingId)
      .update({
        consultStatus: status,
        creator: consultDetails["creator"],
        ta: consultDetails["ta"],
        type: consultDetails["type"],
        location: consultDetails["location"],
        consultDate: consultDetails["consultDate"],
        consultStartTime: consultDetails["consultStartTime"],
        consultEndTime: consultDetails["consultEndTime"],
        agenda: consultDetails["agenda"],
        participants: consultDetails["participants"],
        size: consultDetails["size"] - 1,
        bookDate: consultDetails["bookDate"],
        bookTime: consultDetails["bookTime"],
        weekRange: consultDetails["weekRange"],
      });
  },
  cancelBooking: function (consultDetails, bookingId) {
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).remove();
  },
  checkAttendance: function (id, modCode, bookingId) {
    return database
      .ref(`modules/${modCode}/bookings/`)
      .child(bookingId)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var attendees = 0;
        var participants = obj["participants"];
        for (var user in participants) {
          if (participants[user]["attending"] == true) {
            attendees += 1;
          }
        }
        return attendees;
      });
  },
};

export default ConfirmedFB;
