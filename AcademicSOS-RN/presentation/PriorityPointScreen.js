import React, { useState, useEffect } from "react";
import { useFonts } from "@expo-google-fonts/inter";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb.js";
import PriorityPointFB from "../firebase/PriorityPointFireBase.js";

export default function PriorityPointsPresentation({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, userID, moduleCode } = route.params;
  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];

  const [priorityPoint, setPriorityPoint] = useState("");

  useEffect(() => {
    var loadedPriorityPoint = "";
    PriorityPointFB.getPriorityPointStudent(userID, moduleCode).then((data) => {
      loadedPriorityPoint = data;
      setPriorityPoint(loadedPriorityPoint);
    });
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb navHistory={navHistory} />
        <View style={styles.body}>
          <Text style={styles.title}> {moduleCode}</Text>
          <View style={styles.SquareShapeView}>
            <Text style={styles.priorityTitle}> Points: </Text>
            <Text style={styles.marks}> {priorityPoint} / 50 </Text>
          </View>
          <Text style={styles.noteTitle}> Rules: </Text>
          <Text style={styles.note}>
            10 Priority Points will be deducted each time you fail to turn up on your consultation slot.{"\n \n"}You will receive a one week ban from booking
            consultations if you fail to show up when your Priority Points is 30 or less.{"\n \n"}When Priority hits 0, you will be unable to book any
            consultation for the entire semester.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#003D7C",
    alignItems: "center",
  },
  title: {
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  SquareShapeView: {
    marginTop: hp("5%"),
    width: wp("55%"),
    height: hp("22%"),
    backgroundColor: "#FFFF8D",
    borderRadius: hp("1.1%"),
  },
  priorityTitle: {
    marginTop: hp("4.5%"),
    fontSize: hp("5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#000000",
  },
  marks: {
    marginTop: hp("1%"),
    fontSize: hp("5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#000000",
  },
  noteTitle: {
    marginTop: hp("15%"),
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  note: {
    marginTop: hp("1%"),
    marginHorizontal: wp("2%"),
    fontSize: hp("2.5%"),
    textAlign: "left",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
});
