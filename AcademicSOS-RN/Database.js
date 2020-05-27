import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBsUJECsPssBTt1ylGFhItVhSkr1AD02JU",
  authDomain: "academicsos-db.firebaseapp.com",
  databaseURL: "https://academicsos-db.firebaseio.com/",
  storageBucket: "academicsos-db.appspot.com",
};

const database = firebase.initializeApp(firebaseConfig).database();

const db = {
  createUserData: function(role, id, pw, name) {
    database.ref(`users/${role}/${id}`).set({
      password: pw,
      name: name
    });
  },
  addModule: function(modCode, modName) {
    database.ref(`modules/${modCode}`).set({
      name: modName
    });
  },
  addModuleUnderStudent: function(id, modCode, modName, role) {
    database.ref(`users/students/${id}/modules/${modCode}`).update({
      name: modName,
      role: role
    });
  },
  addModuleUnderProfessor: function(id, modCode, modName, role) {
    database.ref(`users/professors/${id}/modules/${modCode}`).update({
      name: modName,
      role: role
    });
  }
}

export default db;


//First time pump in dummy data here:
//===========================
//Add accounts
db.createUserData('students', 'e0415870', 'password', 'Marcus Lee Eugene');
db.createUserData('professors', 'p0123456', 'password', 'Martin Henz');

//Add modules
db.addModule('CS1231S', 'Discrete Structures');
db.addModule('CS1101S', 'Programming Methodology');
db.addModule('NM3221', 'Mobile Interaction Design');
db.addModule('MA1101R', 'Linear Algebra I');
db.addModule('ES1691', 'English Communication');

//Add modules under student / professor
db.addModuleUnderProfessor('p0123456', 'CS1101S', 'Programming Methodology', 'Professor');
db.addModuleUnderStudent('e0415870', 'CS1101S', 'Programming Methodology', 'Student');
