import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const PendingFB = {
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
  acceptBooking: function(userId, name, consultDetails, bookingId, status) {
    if (consultDetails["participants"] == " ") {
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
        participants: [{id: userId, name: name}],
        size: consultDetails["size"],
        bookDate: consultDetails["bookDate"],
        bookTime: consultDetails["bookTime"],
        weekRange: consultDetails["weekRange"],
      });
    } else {
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
        weekRange: consultDetails["weekRange"]
      });
    }
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
