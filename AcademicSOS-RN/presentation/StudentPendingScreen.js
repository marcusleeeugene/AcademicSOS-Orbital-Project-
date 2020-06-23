import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, Alert, FlatList } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import StudentPendingFB from "../firebase/StudentPendingFireBase.js";

export default function StudentPendingScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, fourthScreen, userID, consultDetails, bookingId } = route.params;

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    secondScreen == "Public Consultation" ? { dest: secondScreen, alt_dest: "Select Module" } : { dest: secondScreen, alt_dest: "Manage Bookings" },
    secondScreen == "Public Consultation" ? { dest: thirdScreen, alt_dest: "Public Consultation" } : { dest: thirdScreen, alt_dest: "" },
    fourthScreen != undefined ? { dest: fourthScreen, alt_dest: "" } : null,
  ].filter((item) => item != null);

  const [userType, setUserType] = useState("");
  const [altStatus, setAltStatus] = useState("");

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

  const creatorOptions = [
    {
      name: "Cancel",
      color: "#FF5252",
    },
  ];

  useEffect(() => {
    StudentPendingFB.getModRole(userID, consultDetails["module"]).then((data) => {
      setUserType(data);
    });
    StudentPendingFB.getAltStatus(userID, consultDetails.module, bookingId).then((data) => {
      setAltStatus(data);
    });
  });

  const removeParticipant = () => {
    var filteredConsultParticipants = consultDetails.participants.filter((user) => user.id != userID);
    if (filteredConsultParticipants.length != 0) {
      consultDetails.participants = filteredConsultParticipants;
    } else {
      consultDetails.participants = " ";
    }
  };

  const acceptConsultation = (consultDetails) => {
    if (consultDetails.type == "Public") {
      if (consultDetails.participants == " ") {
        consultDetails.participants = [];
      }
      StudentPendingFB.checkUserName(userID)
        .then((name) => {
          consultDetails.participants.push({ id: userID, name: name, altStatus: "Accepted", attending: false });
        })
        .then((rsl) => {
          if (consultDetails.participants.length == consultDetails.size) {
            consultDetails.consultStatus = "Confirmed";
          }
          StudentPendingFB.acceptBooking(consultDetails, bookingId, consultDetails.participants);
        });
    } else {
      consultDetails.participants.map((user) => {
        if (user["id"] == userID) {
          user["altStatus"] = "Accepted";
        }
      });
      StudentPendingFB.acceptBooking(consultDetails, bookingId, consultDetails.participants);
    }
    alert("Successfully updated booking status!");
    navigation.goBack();
  };

  const rejectStudentOption = () => {
    Alert.alert(
      "Reject Options",
      "Do you want to reject this suggested consultation?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Reject",
          onPress: () => {
            removeParticipant();
            StudentPendingFB.rejectBooking(consultDetails, bookingId, consultDetails.participants);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const cancelCreatorOption = () => {
    Alert.alert(
      "Cancel Options",
      "Do you want to cancel this consultation?",
      [
        {
          text: "Yes",
          onPress: () => {
            if (consultDetails["creator"] == userID) {
              StudentPendingFB.cancelBooking(consultDetails, bookingId);
            } else {
              removeParticipant();
              StudentPendingFB.rejectBooking(consultDetails, bookingId, consultDetails.participants);
            }
            alert("Cancelled!!!");
            navigation.goBack();
          },
        },
        { text: "No", onPress: () => null },
      ],
      { cancelable: false }
    );
  };

  const nonCreatorJSX = (
    <View style={styles.button}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.buttonOption, { backgroundColor: item.color }]}
          onPress={() => {
            item.name == "Accept" ? acceptConsultation(consultDetails) : userType != "Student" ? rejectOption() : rejectStudentOption();
          }}
        >
          <Text style={styles.option}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const creatorJSX = (
    <View style={styles.button}>
      {creatorOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.creatorButtonOption, { backgroundColor: item.color }]}
          onPress={() => {
            cancelCreatorOption();
          }}
        >
          <Text style={styles.option}>{item.name}</Text>
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
            <Text style={styles.secondTitle}> Students: </Text>
            <FlatList data={consultDetails.participants} renderItem={({ item }) => <Text style={styles.infoText}>{item.name}</Text>} style={styles.flatList} keyExtractor={(item, index) => index.toString()}/>
            <Text style={styles.secondTitle}> Agenda: </Text>
            <Text style={styles.infoText}>{consultDetails["agenda"]} </Text>
            {consultDetails["creator"] === userID || (consultDetails["consultStatus"] == "Pending" && altStatus == "Accepted") ? creatorJSX : nonCreatorJSX}
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
    alignItems: "center",
  },
  infoText: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  secondTitle: {
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
    height: hp("13%"),
    borderRadius: hp("1.1%"),
  },
  creatorButtonOption: {
    marginTop: hp("5%"),
    width: wp("30%"),
    height: hp("13%"),
    borderRadius: hp("1.1%"),
  },
  option: {
    marginTop: hp("5.5%"),
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#000000",
  },
  flatList: { flexGrow: 0 },
});
