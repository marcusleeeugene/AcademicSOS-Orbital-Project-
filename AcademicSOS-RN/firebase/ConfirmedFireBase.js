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
};

export default ConfirmedFB;
