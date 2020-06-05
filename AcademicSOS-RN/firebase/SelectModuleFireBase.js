import * as firebase from 'firebase';
import { database, role } from "./FireBaseConfig.js";

const SelectModuleFB = {
  loadUserModules: function(id) { //returns a promise of array of modules taken by user
    var modules = [];
    return database.ref(`users/${role(id)}/${id}/modules/`).once('value')
      .then(snapshot => snapshot.val())
      .then(obj => {
        for (var each in obj) {
          modules.push(each);
        }
        return modules;
      });
  },
}

export default SelectModuleFB;
