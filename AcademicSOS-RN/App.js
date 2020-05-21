import React from "react";
import LoginPresentation from "./presentation/LoginPresentation.js";
import SelectModulePresentation from "./presentation/SelectModulePresentation.js";
import BreadCrumb from "./components/BreadCrumb.js";
import BookConsultScreen from "./presentation/BookConsultScreen.js";
import HomeScreen from "./presentation/HomeScreen.js";
import CreateConsultScreen from "./presentation/CreateConsultScreen.js";
import RadioButton from "./components/RadioButton.js";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
const options = [
  {
    key: "public",
    text: "Public",
  },
  {
    key: "private",
    text: "Private",
  },
];

//Testing: Always uncomment whatever component you would like to show.
export default function App() {
  return (
    //<LoginPresentation></LoginPresentation>
    //<HomeScreen></HomeScreen>
    //<SelectModulePresentation></SelectModulePresentation>
    //<BreadCrumb></BreadCrumb>
    <CreateConsultScreen></CreateConsultScreen>
  );
}
