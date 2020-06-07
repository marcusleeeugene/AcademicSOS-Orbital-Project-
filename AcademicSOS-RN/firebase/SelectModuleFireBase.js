import * as firebase from "firebase";
import { database, role } from "./FireBaseConfig.js";

const SelectModuleFB = {
  loadUserModules: function (id, screen) {
    //returns a promise of array of modules taken by user
    var modules = [];
    return database
      .ref(`users/${role(id)}/${id}/modules/`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((obj) => {
        for (var each in obj) {
          var role = obj[each]["role"];
          if ((screen === "Book" || screen === "Priority Points" || screen === "Public Consultation") && role === "Student") {
            //If screen is book consultation or priority points, add only modules where user are students
            modules.push(each);
          } else if (screen == "Create Consultation" && (role === "TA" || role === "Professor")) {
            //If screen is create consultation, add only modules where user are TA / Prof
            modules.push(each);
          }
        }
        return modules;
      });
  },
};

export default SelectModuleFB;
