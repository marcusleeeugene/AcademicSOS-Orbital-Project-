import * as firebase from 'firebase';
import { database, role } from "./FireBaseConfig.js";

const HomeFB = {
  checkUserRole: function(id) { //returns a promise array that contains "Student / TA / Professor"
    return database.ref(`users/${role(id)}/${id}/modules/`).once('value')
      .then(snapshot => snapshot.val())
      .then(obj => {
          var moduleRole = [];
          for (var each in obj) {
            moduleRole.push(obj[each]["role"]);
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

export default HomeFB;
