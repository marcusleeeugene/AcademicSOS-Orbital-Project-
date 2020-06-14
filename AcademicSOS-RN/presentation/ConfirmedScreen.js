import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, Alert, TextInput } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomeFB from "../firebase/HomeFireBase.js";
import { QRCode } from "react-native-custom-qr-codes-expo";

export default function ConfirmedScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, userID, consultDetails, bookingId } = route.params;
  const [userType, setUserType] = useState("");
  const [qrCode, setQRCode] = useState("https://www.qrcode-monkey.com/cs2030/12345");

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "" },
  ];

  const options = [
    {
      name: "Scan Attendance",
      color: "#80DEEA",
    },
    {
      name: "Cancel Booking",
      color: "#FF5252",
    },
  ];

  const scanAttendance = () => {
    navigation.navigate("Scan");
  };

  useEffect(() => {
    var tempUserType = "Student";
    HomeFB.checkUserRole(userID).then((data) => {
      if (data.includes("Professor")) {
        tempUserType = "Professor";
      } else if (data.includes("TA")) {
        tempUserType = "TA";
      }
      setUserType(tempUserType);
    });
  });

  const studentJSX = (
    <View style={styles.button}>
      {options.map((item) => (
        <TouchableOpacity
          style={[styles.buttonOption, { backgroundColor: item.color }]}
          onPress={() => {
            item.name === "Scan Attendance"
              ? scanAttendance()
              : Alert.alert(
                  "Cancel Options",
                  "Do you really want to cancel your booking?",
                  [
                    {
                      text: "Proceed to cancel",
                      onPress: () => {
                        null;
                      },
                    },
                    {
                      text: "I will think again",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                  ],
                  { cancelable: false }
                );
          }}
        >
          <Text style={styles.option}>{item.name}</Text>
          {console.log(item.name)}
        </TouchableOpacity>
      ))}
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb navHistory={navHistory} />
        <View style={styles.body}>
          <Text style={styles.titleText}> {consultDetails["module"]}</Text>
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

          {userType !== "Student" ? (
            <View style={styles.container}>
              <QRCode content={qrCode} size={200} />
            </View>
          ) : (
            studentJSX
          )}
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
    marginTop: hp("3%"),
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
    marginTop: hp("4%"),
    fontSize: hp("3%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#000000",
  },
  container: {
    marginTop: hp("4%"),
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("2%"),
    backgroundColor: "white",
  },
});
