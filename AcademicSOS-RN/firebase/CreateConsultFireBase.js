import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const CreateConsultFB = {
  addPublicBooking: function (
    creator,
    modCode,
    date,
    startTime,
    endTime,
    location,
    consultType,
    size,
    remarks,
    status,
    bookDate,
    bookTime
  ) {
    database.ref(`modules/${modCode}/bookings`).push({
      creator: creator,
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      consultType: consultType,
      size: size,
      remarks: remarks,
      status: status,
      bookDate: bookDate,
      bookTime: bookTime,
    });
  },

  addPrivateBooking: function (
    creator,
    modCode,
    date,
    startTime,
    endTime,
    location,
    consultType,
    participants,
    size,
    remarks,
    status,
    bookDate,
    bookTime
  ) {
    database.ref(`modules/${modCode}/bookings`).push({
      creator: creator,
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      consultType: consultType,
      participants,
      size: size,
      remarks: remarks,
      status: status,
      bookDate: bookDate,
      bookTime: bookTime,
    });
  },
  getTutorialClass: function (id, modCode) {
    //Returns a promise of tutorial class
    return database
      .ref(`users/${role(id)}/${id}/modules/${modCode}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        return obj["tutorialClass"];
      });
  },
  getTutorialClassStudent: function (tutorialClass, modCode) {
    //Returns an array of TAs belonging to the tutorialClass
    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var student = [];
        for (var role in obj) {
          //Loop through Students & Professor branch
          for (var id in obj[role]) {
            //Loop through each user
            if (modCode in obj[role][id]["modules"]) {
              //If user is taking the module
              var tc = obj[role][id]["modules"][modCode]["tutorialClass"];
              var modRole = obj[role][id]["modules"][modCode]["role"];
              if (tc === tutorialClass && modRole == "Student") {
                //And user is in the tutorial class and is a student role
                var name = obj[role][id]["name"];
                student.push({ id: id, name: name });
              }
            }
          }
        }
        return student;
      });
  },
};

export default CreateConsultFB;
