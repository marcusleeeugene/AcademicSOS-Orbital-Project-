import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const InputDataFB = {
  createUserData: function (role, id, pw, name) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(`${id}@u.nus.edu`, `${pw}`)
      .then(
        database.ref(`users/${role}/${id}`).set({
          name: name,
        })
      )
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  },
  addModule: function (modCode, modName) {
    database.ref(`modules/${modCode}`).set({
      name: modName,
    });
  },
  addAcadYear: function (yearRange) {
    database.ref(`modules/`).update({
      acadYear: yearRange,
    });
  },
  addModuleUnderStudent: function (id, modCode, modName, role, tutorialClass, priorityPoint) {
    database.ref(`users/students/${id}/modules/${modCode}`).update({
      name: modName,
      role: role,
      tutorialClass: tutorialClass,
      priorityPoint: priorityPoint,
    });
  },
  addModuleUnderProfessor: function (id, modCode, modName, role, tutorialClass, priorityPoint) {
    database.ref(`users/professors/${id}/modules/${modCode}`).update({
      name: modName,
      role: role,
      tutorialClass: tutorialClass,
      priorityPoint: priorityPoint,
    });
  },
};

export default InputDataFB;

//===================================
//FIRST TIME PUMP IN DUMMY DATA HERE
//===================================
//import InputDataFB from "../firebase/InputDataFireBase.js";  (Paste this in a screen to run file)

//===================================
//ADD USERS
//===================================
//Create Students
InputDataFB.createUserData("students", "e0123456", "password", "Mike Tan");

//Create Profs
InputDataFB.createUserData("professors", "p0123456", "password", "Martin Henz");
InputDataFB.createUserData("professors", "p1234567", "password", "Aaron Tan");
//Create TAs
InputDataFB.createUserData("students", "e0407217", "password", "Tay Kai Xiang");
InputDataFB.createUserData("students", "e0415870", "password", "Marcus Lee Eugene");

//===================================
//ADD MODULES
//===================================
InputDataFB.addModule("CS1231S", "Discrete Structures");
InputDataFB.addModule("CS1101S", "Programming Methodology I");
InputDataFB.addModule("NM3221", "Mobile Interaction Design");
InputDataFB.addModule("MA1101R", "Linear Algebra I");
InputDataFB.addModule("ES1601", "English Communication");
InputDataFB.addModule("GEQ1917", "GE: Environment and Sustainability");
InputDataFB.addModule("MA1521", "Calculus for Computing");
InputDataFB.addModule("CS2030", "Programming Methodology II");
InputDataFB.addModule("GER1000", "Quantitative Reasoning: Asking Questions");

//===================================
//ADD ACADEMIC YEAR
//===================================
InputDataFB.addAcadYear("2019-2020");

//Add modules under Student
InputDataFB.addModuleUnderStudent("e0415870", "CS1231S", "Discrete Structures", "Student", "T12", 100);
InputDataFB.addModuleUnderStudent("e0415870", "CS1101S", "Programming Methodology", "Student", "T16", 100);
InputDataFB.addModuleUnderStudent("e0415870", "NM3221", "Mobile Interaction Design", "Student", "T19", 100);
InputDataFB.addModuleUnderStudent("e0415870", "MA1101R", "Linear Algebra I", "TA", "T03", "");
InputDataFB.addModuleUnderStudent("e0415870", "ES1601", "English Communication", "Student", "T13", 100);
InputDataFB.addModuleUnderStudent("e0415870", "GEQ1917", "GE: Environment and Sustainability", "Student", "T11", 100);
InputDataFB.addModuleUnderStudent("e0415870", "MA1521", "Calculus for Computing", "TA", "T03", "");

InputDataFB.addModuleUnderStudent("e0407217", "CS1231S", "Discrete Structures", "TA", "T12", "");
InputDataFB.addModuleUnderStudent("e0407217", "CS1101S", "Programming Methodology", "Student", "T16", 100);
InputDataFB.addModuleUnderStudent("e0407217", "NM3221", "Mobile Interaction Design", "Student", "T12", 100);
InputDataFB.addModuleUnderStudent("e0407217", "MA1101R", "Linear Algebra I", "Student", "T05", "");
InputDataFB.addModuleUnderStudent("e0407217", "ES1601", "English Communication", "Student", "T03", 100);

InputDataFB.addModuleUnderStudent("e0123456", "CS2030", "Programming Methodology II", "Student", "T15", 100);
InputDataFB.addModuleUnderStudent("e0123456", "MA1101R", "Linear Algebra I", "Student", "T03", 100);
InputDataFB.addModuleUnderStudent("e0123456", "MA1521", "Calculus for Computing", "Student", "T03", 100);
InputDataFB.addModuleUnderStudent("e0123456", "ES1601", "English Communication", "Student", "T04", 100);
InputDataFB.addModuleUnderStudent("e0123456", "GER1000", "Quantitative Reasoning: Asking Questions", "Student", "T03", 100);

//Add modules under Professor
InputDataFB.addModuleUnderProfessor("p0123456", "CS1101S", "Programming Methodology", "Professor", "T16", "");
InputDataFB.addModuleUnderProfessor("p0123456", "GER1000", "Quantitative Reasoning: Asking Questions", "Professor", "T03", "");
InputDataFB.addModuleUnderProfessor("p0123456", "ES1601", "English Communication", "Professor", "T04", "");
InputDataFB.addModuleUnderProfessor("p1234567", "CS1231S", "Discrete Structures", "Professor", "T12", "");
InputDataFB.addModuleUnderProfessor("p1234567", "CS2030", "Programming Methodology II", "Professor", "T15", "");
InputDataFB.addModuleUnderProfessor("p1234567", "MA1101R", "Linear Algebra I", "Professor", "T05", "");
