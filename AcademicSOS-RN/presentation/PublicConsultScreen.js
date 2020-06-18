import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import Modal from "react-native-modal";
import PublicConsultFB from "../firebase/PublicConsultFireBase.js";

export default function PublicConsultScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, userID, moduleCode } = route.params;

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];

  const [isWeekModalVisible, setWeekModalVisible] = useState(false);
  const [isDayModalVisible, setDayModalVisible] = useState(false);

  const [week, setWeek] = useState("All Weeks");
  const [day, setDay] = useState("All Days");

  const [consultations, setConsultations] = useState([]);
  const [weekList, setWeekList] = useState([]);

  const toggleModal = (type) => {
    if (type === "Week") {
      setWeekModalVisible(!isWeekModalVisible);
    } else if (type === "Day") {
      setDayModalVisible(!isDayModalVisible);
    }
  };

  const updateModalChoice = (data) => {
    var type = data.split("#")[0];
    var val = data.split("#")[1];
    if (type === "Week") {
      setWeek(val);
    } else if (type === "Day") {
      setDay(val);
    }
    toggleModal(type);
  };

  const activateGetUserBookings = () => {
    //Loads user bookings onto the screen
    //Generate list of consultation bookings
    var tempConsultations = [];
    const colourCodes = ["#90CAF9", "#FFF59D", "#A5D6A7", "#FFAB91", "#B39DDB", "#80CBC4", "#c5e1a5", "#fff59d", "#ffcc80", "#bcaaa4"];
    PublicConsultFB.getPublicConsultation(moduleCode, week, day).then((data) => {
      for (var i = 0; i < data.length; i++) {
        tempConsultations.push({
          creator: data[i].creator,
          bookingId: data[i].bookingId,
          module: data[i].module,
          ta: data[i].ta,
          type: data[i].type,
          location: data[i].location,
          consultDate: data[i].consultDate,
          consultStartTime: data[i].consultStartTime,
          consultEndTime: data[i].consultEndTime,
          agenda: data[i].agenda,
          participants: data[i].participants,
          size: data[i].size,
          consultStatus: data[i].consultStatus,
          bookDate: data[i].bookDate,
          bookTime: data[i].bookTime,
          weekRange: data[i].weekRange,
          color: colourCodes[i]
        });
      }
      setConsultations(tempConsultations)
    });
    //Generate list of academic weeks
    var tempWeeks = [];
    PublicConsultFB.getNumWeeks().then((data) => {
      tempWeeks.push({ week: "All Weeks" });
      for (var i = 0; i < data; i++) {
        tempWeeks.push({ week: `Week ${i}` });
      }
      setWeekList(tempWeeks);
    });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      //To force re-render current screen once navigating back from pending screen.
      activateGetUserBookings();
    });
    activateGetUserBookings(); //Runs whenever there is a filter change by the user
  }, [week, day]);

  const weekJSX = (
    <Modal isVisible={isWeekModalVisible} onBackdropPress={() => setWeekModalVisible(false)}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Week: </Text>
        <ScrollView>
          {weekList.map((item) => (
            <TouchableOpacity key={item.key} style={styles.modalBtn} onPress={() => updateModalChoice("Week#" + item.week)}>
              <Text style={styles.modalBtnText}> {item.week} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const days = [{ key: "All Days" }, { key: "Monday" }, { key: "Tuesday" }, { key: "Wednesday" }, { key: "Thursday" }, { key: "Friday" }, { key: "Saturday" }, { key: "Sunday" }];
  const dayJSX = (
    <Modal isVisible={isDayModalVisible} onBackdropPress={() => setDayModalVisible(false)}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Day: </Text>
        <ScrollView>
          {days.map((item) => (
            <TouchableOpacity key={item.key} style={styles.modalBtn} onPress={() => updateModalChoice("Day#" + item.key)}>
              <Text style={styles.modalBtnText}> {item.key} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const consultationsJSX = (
    <View>
      {consultations.map((item, index) => (
        <View key={"consultation" + index} style={styles.moduleRow}>
          <View style={styles.dateTime}>
            <Text style={styles.dateTime_Text}> {item.consultDate} </Text>
            <Text style={styles.dateTime_Text}> {item.consultStartTime} </Text>
          </View>
          <TouchableOpacity
            style={[styles.moduleContainer, { backgroundColor: item.color }]}
            onPress={() => {
              item.consultStatus === "Pending" || item.consultStatus == "Open"
                ? navigation.navigate("Pending", {
                    fourthScreen: "Info",
                    thirdScreen: item.module,
                    secondScreen: secondScreen,
                    firstScreen: firstScreen,
                    userID: userID,
                    consultDetails: item,
                    bookingId: item.bookingId,
                  })
                : navigation.navigate("Confirmed", {
                    fourthScreen: "Info",
                    thirdScreen: item.module,
                    secondScreen: secondScreen,
                    firstScreen: firstScreen,
                    userID: userID,
                    consultDetails: item,
                    bookingId: item.bookingId,
                  });
            }}
          >
            <Text style={styles.consultationInfoMod}>
              {item.module}
              {item.consultStatus === "Pending" ? ( //Show notification only if status is pending
                <Image style={styles.notification} source={require("../assets/images/notification.png")} />
              ) : null}
            </Text>
            <Text style={styles.consultationInfo}> TA: {item.ta["name"]} </Text>
            <Text style={styles.consultationInfo}> Status: {item.consultStatus} </Text>
            <Text style={styles.consultationInfo} numberOfLines={1}>
              {" "}
              Agenda: {item.agenda}{" "}
            </Text>
          </TouchableOpacity>
        </View>
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
          <Text style={styles.title}> Public Consultation </Text>
          <View style={styles.filter}>
            <TouchableOpacity style={styles.filterBtn} onPress={() => toggleModal("Week")}>
              <Text style={styles.filter_text}>
                {" "}
                {week} <Image style={styles.chevron_inv} source={require("../assets/images/chevron-inv.png")} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn} onPress={() => toggleModal("Day")}>
              <Text style={styles.filter_text}>
                {" "}
                {day} <Image style={styles.chevron_inv} source={require("../assets/images/chevron-inv.png")} />
              </Text>
            </TouchableOpacity>
          </View>
          {weekJSX}
          {dayJSX}
          <ScrollView style={styles.moduleView}>{consultationsJSX}</ScrollView>
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
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("20%"),
    marginTop: "5%",
  },
  filterBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    height: hp("3%"),
    width: wp("25%"),
  },
  filter_text: {
    textAlign: "center",
    fontSize: hp("1.5%"),
    fontFamily: "Righteous-Regular",
    justifyContent: "center",
  },
  chevron_inv: {
    height: hp("2%"),
    width: wp("3%"),
    resizeMode: "contain",
  },
  consultations: {
    marginTop: "5%",
    flexDirection: "column",
  },
  moduleView: {
    marginTop: "10%",
  },
  moduleRow: {
    flexDirection: "row",
  },
  moduleContainer: {
    borderRadius: hp("1.1%"),
    height: hp("10%"),
    width: wp("70%"),
    backgroundColor: "#FFFFFF",
    marginBottom: "3%",
  },
  dateTime: {
    flexDirection: "column",
    width: wp("33%"),
    marginTop: "3%",
  },
  dateTime_Text: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: wp("4%"),
  },
  consultationInfoMod: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    paddingHorizontal: wp("2%"),
  },
  consultationInfo: {
    fontSize: hp("1.5%"),
    fontFamily: "Righteous-Regular",
  },
  notification: {
    height: hp("2%"),
    width: wp("7.5%"),
    resizeMode: "contain",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  modalView: {
    backgroundColor: "#CFD8DC",
    flexDirection: "column",
    height: hp("40%"),
  },
  modalTitle: {
    textAlign: "center",
    fontSize: hp("3%"),
    fontFamily: "Righteous-Regular",
    marginBottom: "5%",
  },
  modalBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    height: hp("3.5%"),
    width: wp("25%"),
    justifyContent: "center",
    left: "36%",
    marginBottom: "3%",
  },
  modalBtnText: {
    textAlign: "center",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
});
