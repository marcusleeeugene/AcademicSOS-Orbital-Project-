import * as firebase from 'firebase';
import FireBaseConfig from "./FireBaseConfig.js";

const database = firebase.initializeApp(FireBaseConfig).database();

const InputDataFB = {
  createUserData: function(role, id, pw, name) {
    firebase.auth().createUserWithEmailAndPassword(`${id}@u.nus.edu`, `${pw}`).then(
      database.ref(`users/${role}/${id}`).set({
        name: name
      })
    ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
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
  },
}

export default InputDataFB;

//===================================
//First time pump in dummy data here:
//===================================
//import InputDataFB from "../firebase/InputDataFireBase.js";  (Paste this in a screen to run file)

//Add accounts
InputDataFB.createUserData('students', 'e0415870', 'password', 'Marcus Lee Eugene');
InputDataFB.createUserData('professors', 'p0123456', 'password', 'Martin Henz');

//Add modules
InputDataFB.addModule('CS1231S', 'Discrete Structures');
InputDataFB.addModule('CS1101S', 'Programming Methodology');
InputDataFB.addModule('NM3221', 'Mobile Interaction Design');
InputDataFB.addModule('MA1101R', 'Linear Algebra I');
InputDataFB.addModule('ES1691', 'English Communication');

//Add modules under student / professor
InputDataFB.addModuleUnderProfessor('p0123456', 'CS1101S', 'Programming Methodology', 'Professor');
InputDataFB.addModuleUnderStudent('e0415870', 'CS1101S', 'Programming Methodology', 'Student');
