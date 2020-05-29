import * as firebase from 'firebase';
import FireBaseConfig from "./FireBaseConfig.js";

const database = firebase.initializeApp(FireBaseConfig).database();

const SelectModuleFB = {
  loadUserModules: function(id) { //returns a promise of array of modules taken by user
    var role;
    if (id.charAt(0) == "e" || id.charAt(0) == "E" ) {
      role = "students";
    } else {
      role = "professors";
    }
    var modules = [];
    return database.ref(`users/${role}/${id}/modules/`).once('value')
      .then(snapshot => snapshot.val())
      .then(obj => {
        for (each in obj) {
          modules.push(each);
        }
        return modules;
      });
  },
}

export default SelectModuleFB;
SelectModuleFB.loadUserModules("e0415870").then(data => console.log(data));
