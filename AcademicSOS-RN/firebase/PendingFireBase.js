import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const PendingFB = {
  acceptBooking(creator, bookingId, modCode, ta, type, location, consultDate, consultStartTime, consultEndTime, agenda, participants) {
    database.ref(`modules/${modCode}/bookings`).child(bookingId).push({
      consultStatus: status,
      creator: creator,
      ta: ta,
      type: type,
      location: location,
      consultDate: consultDate,
      consultStartTime: consultStartTime,
      consultEndTime: consultEndTime,
      agenda: agenda,
      participants: participants,
    });
  },
};

export default PendingFB;
