import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const StudentPendingFB = {
  checkUserName: function (id) {
    //returns a promise that consists of user name
    return database
      .ref(`users/${role(id)}/${id}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        return obj["name"];
      });
  },
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
  getAltStatus: function (id, modCode, bookingId) {
    return database
      .ref(`modules/${modCode}/bookings/`)
      .child(bookingId)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var participants = obj["participants"];
        for (var user in participants) {
          if (id == participants[user]["id"]) {
            return participants[user]["altStatus"];
          }
        }
      });
  },
  acceptBooking: function (consultDetails, bookingId, updatedParticipants) {
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).update({
      consultStatus: consultDetails["consultStatus"],
      creator: consultDetails["creator"],
      ta: consultDetails["ta"],
      type: consultDetails["type"],
      location: consultDetails["location"],
      consultDate: consultDetails["consultDate"],
      consultStartTime: consultDetails["consultStartTime"],
      consultEndTime: consultDetails["consultEndTime"],
      agenda: consultDetails["agenda"],
      participants: updatedParticipants,
      size: consultDetails["size"],
      bookDate: consultDetails["bookDate"],
      bookTime: consultDetails["bookTime"],
      weekRange: consultDetails["weekRange"],
    });
  },
  cancelBooking: function (consultDetails, bookingId) {
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).remove();
  },
  rejectPublicBooking: function (consultDetails, bookingId, updatedParticipants) {
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).update({
      consultStatus: consultDetails["consultStatus"],
      creator: consultDetails["creator"],
      ta: consultDetails["ta"],
      type: consultDetails["type"],
      location: consultDetails["location"],
      consultDate: consultDetails["consultDate"],
      consultStartTime: consultDetails["consultStartTime"],
      consultEndTime: consultDetails["consultEndTime"],
      agenda: consultDetails["agenda"],
      participants: updatedParticipants,
      size: consultDetails["size"],
      bookDate: consultDetails["bookDate"],
      bookTime: consultDetails["bookTime"],
      weekRange: consultDetails["weekRange"],
    });
  },
  rejectPrivateBooking: function (consultDetails, bookingId, updatedParticipants) {
    database
      .ref(`modules/${consultDetails["module"]}/bookings`)
      .child(bookingId)
      .update({
        consultStatus: consultDetails["consultStatus"],
        creator: consultDetails["creator"],
        ta: consultDetails["ta"],
        type: consultDetails["type"],
        location: consultDetails["location"],
        consultDate: consultDetails["consultDate"],
        consultStartTime: consultDetails["consultStartTime"],
        consultEndTime: consultDetails["consultEndTime"],
        agenda: consultDetails["agenda"],
        participants: updatedParticipants,
        size: consultDetails["size"] - 1,
        bookDate: consultDetails["bookDate"],
        bookTime: consultDetails["bookTime"],
        weekRange: consultDetails["weekRange"],
      });
  },
};
export default StudentPendingFB;
