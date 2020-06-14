import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import PendingFB from "../firebase/PendingFireBase.js";

export default function PendingScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, userID, consultDetails, bookingId } = route.params;

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "" },
  ];

  const options = [
    {
      name: "Accept",
      color: "#B2FF59",
    },
    {
      name: "Reject",
      color: "#FF5252",
    },
  ];

  const acceptConsultation = (consultDetails) => {
    {
      console.log(bookingId);
    }
    PendingFB.acceptBooking(consultDetails, bookingId, "Confirmed");
    alert("Successfully updated booking status!");
    navigation.goBack();
  };

  const rejectOption = () => {
    Alert.alert(
      "Reject Options",
      "Do you want to suggest another consult slot to student?",
      [
        {
          text: "Suggest",
          onPress: () => {
            navigation.navigate("Create Consultation", {
              thirdScreen: consultDetails["module"],
              secondScreen: secondScreen,
              firstScreen: firstScreen,
              userID: userID,
              finalisedConsultType: consultDetails["type"],
              studentsInvolved: consultDetails["participants"],
              moduleCode: consultDetails["module"],
              bookingId: bookingId,
            });
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Reject", onPress: () => console.log("OK Rejected") },
      ],
      { cancelable: false }
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb navHistory={navHistory} />
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.titleText}> {consultDetails["module"]}</Text>
            <Image source={require("../assets/images/notification.png")} style={styles.imageStyle} />
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}> TA: {consultDetails.ta["name"]}</Text>
            <Text style={styles.infoText}> Type: {consultDetails["type"]}</Text>
            <Text style={styles.infoText}> Location: {consultDetails["location"]}</Text>
            <Text style={styles.infoText}>Date: {consultDetails["consultDate"]}</Text>
            <Text style={styles.infoText}> Start Time: {consultDetails["consultStartTime"]}</Text>
            <Text style={styles.infoText}> End Time: {consultDetails["consultEndTime"]}</Text>
            <Text style={styles.agendaTitle}> Agenda: </Text>
            <Text style={styles.infoText}>{consultDetails["agenda"]} </Text>
          </View>

          <View style={styles.button}>
            {options.map((item) => (
              <TouchableOpacity
                style={[styles.buttonOption, { backgroundColor: item.color }]}
                onPress={() => {
                  item.name == "Accept" ? acceptConsultation(consultDetails) : rejectOption();
                }}
              >
                <Text style={styles.option}>{item.name}</Text>
              </TouchableOpacity>
            ))}
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
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  imageStyle: {
    height: hp("3%"),
    width: wp("7.5%"),
    resizeMode: "contain",
    alignItems: "center",
  },
  info: {
    marginTop: hp("5%"),
  },
  infoText: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  agendaTitle: {
    marginTop: hp("5%"),
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  button: {
    flexDirection: "row",
  },
  buttonOption: {
    marginTop: hp("5%"),
    marginLeft: wp("5%"),
    width: wp("30%"),
    height: hp("16%"),
    borderRadius: hp("1.1%"),
  },
  option: {
    marginTop: hp("5.5%"),
    fontSize: hp("4%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#000000",
  },
});
