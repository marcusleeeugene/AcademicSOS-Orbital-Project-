import React from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatGrid } from "react-native-super-grid";
import BreadCrumb from "../components/BreadCrumb";

export default function ConsultDetailScreen() {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  let consultationInfo = { module: 'CS1101S', ta: 'John Tan Ah Kow', type: 'private', Location: 'COM 2 room 1', date: '19-jun-20', time: '11.20 AM', agenda: 'Recursion problem and how to do wishful thinking.'};
  let consultScreen = "" //ManageBookingScreen or publicConsultScreen

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb />
        <View style={styles.body}>
          <Text style={styles.title}> {consultationInfo.module} </Text>
          <View style={styles.consultationInfo}>
            <Text style = {styles.consultationInfoText}> TA: {consultationInfo.ta} </Text>
            <Text style = {styles.consultationInfoText}> Type: {consultationInfo.type} </Text>
            <Text style = {styles.consultationInfoText}> Location: {consultationInfo.location} </Text>
            <Text style = {styles.consultationInfoText}> Date: {consultationInfo.date} </Text>
            <Text style = {styles.consultationInfoText}> Time: {consultationInfo.time} </Text>
            <Text style = {styles.consultationInfoText}> Agenda: {consultationInfo.agenda} </Text>
          </View>
          <View style = {styles.options}>
            <TouchableOpacity style={styles.optionAccept}>
              <Text style={styles.optionName}> Accept </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionReject}>
              <Text style={styles.optionName}> Reject </Text>
            </TouchableOpacity>
          </View>
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
  },
  title: {
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  consultationInfo: {
    marginTop: '5%',
  },
  consultationInfoText: {
    fontSize: hp("2%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  options: {
    marginTop: '30%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  optionAccept: {
    marginLeft: wp("5%"),
    justifyContent: "center",
    borderRadius: 10,
    height: hp("15%"),
    width: hp("15%"),
    alignItems: "center",
    backgroundColor: "#B2FF59"
  },
  optionReject: {
    marginLeft: wp("5%"),
    justifyContent: "center",
    borderRadius: 10,
    height: hp("15%"),
    width: hp("15%"),
    alignItems: "center",
    backgroundColor: "#FF5252"
  },
  optionName: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    height: hp("4%"),
    fontFamily: "Righteous-Regular",
  },
});
