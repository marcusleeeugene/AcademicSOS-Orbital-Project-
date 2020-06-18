import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const PendingFB = {
  acceptBooking(consultDetails, bookingId, status) {
    console.log(bookingId);
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
};
export default PendingFB;
