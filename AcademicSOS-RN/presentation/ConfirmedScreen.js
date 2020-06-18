import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Dimensions, Text, View, Alert, FlatList, ScrollView } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import ConfirmedFB from "../firebase/ConfirmedFireBase.js";
import { QRCode } from "react-native-custom-qr-codes-expo";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function ConfirmedScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const [dimensions, setDimensions] = useState({ window, screen });
  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const { firstScreen, secondScreen, thirdScreen, fourthScreen, userID, consultDetails, bookingId } = route.params;

  const [userType, setUserType] = useState("");
  const [consultSize, setConsultSize] = useState("");
  const qrCode = "https://www.academicSOS.com/" + consultDetails["module"] + "/" + bookingId;

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    secondScreen == "Public Consultation" ? { dest: secondScreen, alt_dest: "Select Module" } : { dest: secondScreen, alt_dest: "Manage Bookings" },
    secondScreen == "Public Consultation" ? { dest: thirdScreen, alt_dest: "Public Consultation" } : { dest: thirdScreen, alt_dest: "" },
    fourthScreen != undefined ? {dest:fourthScreen, alt_dest: ""} : null,
  ].filter((item) => item != null);

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
    navigation.navigate("Scan", {
      qrCode: qrCode,
    });
  };

  useEffect(() => {
    ConfirmedFB.getModRole(userID, consultDetails["module"]).then((data) => {
      setUserType(data);
    });
    ConfirmedFB.getConsultSize(bookingId, consultDetails["module"]).then((data) => {
      setConsultSize(data);
    });

    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const studentJSX = (
    <View style={styles.button}>
      {options.map((item) => (
        <TouchableOpacity
          key = { item.name }
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
                        null; //put in cancel booking and minus priority points!!!
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
        </TouchableOpacity>
      ))}
    </View>
  );

  const taJSX = (
    <View>
      <View style={styles.container}>
        <QRCode content={qrCode} size={dimensions.screen.height > 700 ? 250 : 200} />
      </View>
      <View>
        <Text style={styles.size}> Class Size: </Text>
        <Text style={styles.infoText}> 1 / {consultSize}</Text>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
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
            <Text style={styles.secondTitle}> Students: </Text>
            <FlatList data={consultDetails.participants} renderItem={({ item }) => <Text style={styles.infoText}>{item.name}</Text>} style={styles.flatList} />
            <Text style={styles.secondTitle}> Agenda: </Text>
            <Text style={styles.infoText}>{consultDetails["agenda"]} </Text>
          </View>
          {userType !== "Student" ? taJSX : studentJSX}
        </View>
      </ScrollView>
    );
  }
}

// line 106: need to dynamically update number of students who scanned the consult QR code

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
  secondTitle: {
    marginTop: hp("3%"),
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
    width: wp("35%"),
    height: hp("16%"),
    borderRadius: hp("1.1%"),
  },
  option: {
    marginTop: hp("4%"),
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#000000",
  },
  container: {
    marginTop: hp("3%"),
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("2%"),
    backgroundColor: "white",
  },
  size: {
    marginTop: hp("2.5%"),
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  flatList: { flexGrow: 0 },
});
