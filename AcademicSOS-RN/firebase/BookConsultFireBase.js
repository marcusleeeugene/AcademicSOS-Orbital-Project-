import * as firebase from 'firebase';
import { database } from "./FireBaseConfig.js";

const BookConsultFB = {
  addBooking: function(creator, modCode, ta, date, startTime, endTime, location, participants, remarks, status, bookDate, bookTime) {
    database.ref(`modules/${modCode}/bookings`).push({
      creator: creator,
      ta: ta,
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      participants: participants,
      remarks: remarks,
      status: status,
      //Date and time of booking made
      bookDate: bookDate,
      bookTime: bookTime
    });
  },
  getTutorialClass: function(id, modCode) { //Returns a promise of tutorial class
    var role;
    if (id.charAt(0) == "e" || id.charAt(0) == "E" ) {
      role = "students";
    } else {
      role = "professors";
    }
    return database.ref(`users/${role}/${id}/modules/${modCode}`).once('value')
      .then(snapshot => snapshot.val())
      .then(obj => {
          return obj["tutorialClass"];
      });
  },
  getTutorialClassTA: function(tutorialClass) { //Returns an array of TAs belonging to the tutorialClass
    return database.ref(`users`).once('value')
      .then(snapshot => snapshot.val())
      .then(obj => {
        var TA = [];
        for (var role in obj) {
          for (var id in obj[role]) {
            for (var mod in obj[role][id]["modules"]) {
              var tc = obj[role][id]["modules"][mod]["tutorialClass"];
              var name = obj[role][id]["name"];
              var modRole = obj[role][id]["modules"][mod]["role"];
              if (tc === tutorialClass && modRole != "Student") {
                TA.push({"id": id, "name": name})
              }
            }
          }
        }
        return TA;
      });
  }
}

export default BookConsultFB;
