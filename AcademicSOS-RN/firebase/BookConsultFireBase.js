import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const BookConsultFB = {
  getWeekRange: function() {
    return fetch('https://api.nusmods.com/v2/2019-2020/modules/CS2040.json') //This part, to be made dynamic in future
      .then((result) => result.json())
      .then((data) => {
        var semData = data['semesterData'];
        var weekRange;
        for (var sem in semData) {
          if ("start" in semData[sem]['timetable'][0]['weeks']) {
            weekRange = semData[sem]['timetable'][0]['weeks']
            break;
          }
        }
        return weekRange;
      });
  },
  addBooking: function (creator, modCode, ta, date, startTime, endTime, location, participants, agenda, status, bookDate, bookTime, weekRange) {
    database.ref(`modules/${modCode}/bookings`).push({
      creator: creator,
      ta: ta,
      consultDate: date,
      consultStartTime: startTime,
      consultEndTime: endTime,
      location: location,
      participants: participants,
      agenda: agenda,
      consultStatus: status,
      type: "private",
      //Date and time of booking made
      bookDate: bookDate,
      bookTime: bookTime,
      weekRange: weekRange
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
  getTutorialClassTA: function (tutorialClass, modCode) {
    //Returns an array of TAs belonging to the tutorialClass
    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var TA = [];
        for (var role in obj) {
          //Loop through Students & Professor branch
          for (var id in obj[role]) {
            //Loop through each user
            var mod = obj[role][id]["modules"]
            if (modCode in mod) {
              //If user is taking the module
              var tc = mod[modCode]["tutorialClass"];
              var modRole = mod[modCode]["role"];
              if (tc === tutorialClass && modRole != "Student") {
                //And user is in the tutorial class and is TA/Prof
                var name = obj[role][id]["name"];
                TA.push({ id: id, name: name });
              }
            }
          }
        }
        return TA;
      });
  },
  getStudentsMod: function (modCode) {
    //Returns an array of students taking the module
    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        var students = [];
        for (var role in obj) {
          //Loop through Students & Professor branch
          for (var id in obj[role]) {
            //Loop through each user
            var mod = obj[role][id]["modules"];
            if (modCode in mod) {
              //If user is taking the module
              var modRole = mod[modCode]["role"];
              if (modRole == "Student") {
                var name = obj[role][id]["name"];
                students.push({ id: id, name: name });
              }
            }
          }
        }
        return students;
      });
  }
}

export default BookConsultFB;
