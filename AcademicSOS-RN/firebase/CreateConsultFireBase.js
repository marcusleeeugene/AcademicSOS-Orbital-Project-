import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const CreateConsultFB = {
  getWeekRange: function () {
    return fetch("https://api.nusmods.com/v2/2019-2020/modules/CS2040.json") //This part, to be made dynamic in future
      .then((result) => result.json())
      .then((data) => {
        var semData = data["semesterData"];
        var weekRange;
        for (var sem in semData) {
          if ("start" in semData[sem]["timetable"][0]["weeks"]) {
            weekRange = semData[sem]["timetable"][0]["weeks"];
            break;
          }
        }
        return weekRange;
      });
  },

  addPublicBooking: function (creator, modCode, date, startTime, endTime, location, consultType, TA, size, agenda, status, bookDate, bookTime, weekRange) {
    database.ref(`modules/${modCode}/bookings`).push({
      creator: creator,
      consultDate: date,
      consultStartTime: startTime,
      consultEndTime: endTime,
      location: location,
      type: consultType,
      size: size,
      ta: TA,
      participants: " ",
      agenda: agenda,
      consultStatus: status,
      bookDate: bookDate,
      bookTime: bookTime,
      weekRange: weekRange,
    });
  },

  addPrivateBooking: function (creator, modCode, date, startTime, endTime, location, consultType, TA, participants, size, agenda, status, bookDate, bookTime, weekRange) {
    database.ref(`modules/${modCode}/bookings`).push({
      creator: creator,
      consultDate: date,
      consultStartTime: startTime,
      consultEndTime: endTime,
      location: location,
      type: consultType,
      ta: TA,
      participants: participants,
      size: size,
      agenda: agenda,
      consultStatus: status,
      bookDate: bookDate,
      bookTime: bookTime,
      weekRange: weekRange,
    });
  },

  updateBooking: function (creator, bookingId, modCode, date, startTime, endTime, location, consultType, TA, participants, size, agenda, status, bookDate, bookTime, weekRange) {
    database.ref(`modules/${modCode}/bookings`).child(bookingId).update({
      creator: creator,
      consultDate: date,
      consultStartTime: startTime,
      consultEndTime: endTime,
      location: location,
      type: consultType,
      ta: TA,
      participants: participants,
      size: size,
      agenda: agenda,
      consultStatus: status,
      bookDate: bookDate,
      bookTime: bookTime,
      weekRange: weekRange,
    });
  },

  checkUserData: function (id) {
    //returns a promise that consists of user name and user id
    return database
      .ref(`users/${role(id)}/${id}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var user = [];
        var name = obj["name"];
        user.push({ id: id, name: name, altStatus: "Pending", attending: false});
        return user;
      });
  },

  checkUserName: function (id) {
    return database
      .ref(`users/${role(id)}/${id}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        return obj["name"];
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
