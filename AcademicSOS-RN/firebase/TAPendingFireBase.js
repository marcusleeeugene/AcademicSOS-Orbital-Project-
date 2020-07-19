import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

import { sendConfirmedConsultPushNotification, sendRejectedConsultPushNotification } from "../components/PushNotification.js";

const TAPendingFB = {
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
  updateBooking: function (consultDetails, bookingId, consultStatus) {
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).update({
      consultStatus: consultStatus,
      creator: consultDetails["creator"],
      ta: consultDetails["ta"],
      type: consultDetails["type"],
      location: consultDetails["location"],
      consultDate: consultDetails["consultDate"],
      consultStartTime: consultDetails["consultStartTime"],
      consultEndTime: consultDetails["consultEndTime"],
      agenda: consultDetails["agenda"],
      participants: consultDetails["participants"],
      size: consultDetails["participants"].length,
      bookDate: consultDetails["bookDate"],
      bookTime: consultDetails["bookTime"],
      weekRange: consultDetails["weekRange"],
    });
  },
  removeBooking: function (consultDetails, bookingId) {
    database.ref(`modules/${consultDetails["module"]}/bookings`).child(bookingId).remove();
  },

  notifyConfirmedConsultation: function (bookingId, consultDetails) {
    //notify each student of Confirmed consultation
    var participants = consultDetails["participants"];
    for (var each in participants) {
      //Loop through participants
      var user = participants[each];
      if (user.id != undefined) {
        database
          .ref(`users/${role(user.id)}/${user.id}`)
          .once("value")
          .then((snapshot) => snapshot.val())
          .then((data) => {
            sendConfirmedConsultPushNotification(data.pushToken, consultDetails["module"], consultDetails); //Send notification to students
          });
      }
    }
  },

  notifyRejectedConsultation: function (bookingId, consultDetails) {
    //notify each student of Rejected consultation
    var participants = consultDetails["participants"];
    for (var each in participants) {
      //Loop through participants
      var user = participants[each];
      if (user.id != undefined) {
        database
          .ref(`users/${role(user.id)}/${user.id}`)
          .once("value")
          .then((snapshot) => snapshot.val())
          .then((data) => {
            sendRejectedConsultPushNotification(data.pushToken, consultDetails["module"], consultDetails); //Send notification to students
          });
      }
    }
  },
};
export default TAPendingFB;
