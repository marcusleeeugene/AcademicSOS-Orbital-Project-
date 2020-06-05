import * as firebase from 'firebase';
import { database, role } from "./FireBaseConfig.js";

const LoginFB = {
  loginUser: function(id, pw) {
    firebase.auth().signInWithEmailAndPassword(`${id}@u.nus.edu`, `${pw}`).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
}

export default LoginFB;
