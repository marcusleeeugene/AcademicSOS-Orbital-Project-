import * as firebase from 'firebase';
import FireBaseConfig from "./FireBaseConfig.js";

const database = firebase.initializeApp(FireBaseConfig).database();

const SelectModuleFB = {
  loadUserModules: function(id) { //returns an array of modules taken by user
    var role;
    if (id.charAt(0) == "e" || id.charAt(0) == "E" ) {
      role = "students";
    } else {
      role = "professors";
    }
    database.ref(`users/${role}/${id}/modules/`).once('value').then(function(snapshot) {
      var obj = snapshot.val();
      var modules = [];
      for (var each in obj) {
        modules.push(each);
      }
      return modules;
    });
  },
}

export default SelectModuleFB;
