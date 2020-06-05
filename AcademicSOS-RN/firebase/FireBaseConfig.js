import * as firebase from 'firebase';

// Initialize Firebase
const FireBaseConfig = {
  apiKey: "AIzaSyBsUJECsPssBTt1ylGFhItVhSkr1AD02JU",
  authDomain: "academicsos-db.firebaseapp.com",
  databaseURL: "https://academicsos-db.firebaseio.com/",
  storageBucket: "academicsos-db.appspot.com",
};

let app = firebase.initializeApp(FireBaseConfig);
export const database = app.database(); //Database Link

export const role = (id) => { //Checks which role branch user belongs to (Student / Professor)
  var userRole;
  if (id.charAt(0) == "e" || id.charAt(0) == "E" ) {
    userRole = "students";
  } else {
    userRole = "professors";
  }
  return userRole;
};
