import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const PendingFB = {
  acceptBooking(consultDetails, bookingId, status) {
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
    });
  },
};
export default PendingFB;
