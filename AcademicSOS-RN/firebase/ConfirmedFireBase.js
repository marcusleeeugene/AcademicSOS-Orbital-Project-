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
  cancelBooking: function(consultDetails, bookingId, status) {
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
  }
};

export default ConfirmedFB;
