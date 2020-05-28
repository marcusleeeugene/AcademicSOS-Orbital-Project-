import * as firebase from 'firebase';
import FireBaseConfig from "./FireBaseConfig.js";

const database = firebase.initializeApp(FireBaseConfig).database();

const HomeScreenFB = {
  checkUserRole: function(id) { //returns "Student / TA / Professor"
    var role;
    if (id.charAt(0) == "e" || id.charAt(0) == "E" ) {
      role = "students";
    } else {
      role = "professors";
    }
    database.ref(`users/${role}/${id}/modules/`).once('value').then(function(snapshot) {
      var obj = snapshot.val();
      var moduleRole = "Student";
      var count = Object.keys(obj).length;
      for (var i = 0; i < count; i++) {
        var each = obj[Object.keys(obj)[i]];
        if (each.role == "TA" || each.role == "Professor") {
          moduleRole = each.role;
          break;
        }
      }
      return moduleRole;
    });
  },
  logOutUser: function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("Successfully Signed Out!")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
}

export default HomeScreenFB;

HomeScreenFB.checkUserRole("e0415870");
