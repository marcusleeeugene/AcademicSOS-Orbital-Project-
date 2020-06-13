import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import Modal from "react-native-modal";
import ManageBookingFB from "../firebase/ManageBookingFireBase.js";

export default function ManageBookingScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, userID } = route.params;
  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "" },
  ];

  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [isWeekModalVisible, setWeekModalVisible] = useState(false);
  const [isDayModalVisible, setDayModalVisible] = useState(false);

  const [status, setStatus] = useState("All Status");
  const [week, setWeek] = useState("All Weeks");
  const [day, setDay] = useState("All Days");

  const [consultations, setConsultations] = useState([]);
  const [weekList, setWeekList] = useState([]);

  const toggleModal = (type) => {
    if (type === "Status") {
      setStatusModalVisible(!isStatusModalVisible);
    } else if (type === "Week") {
      setWeekModalVisible(!isWeekModalVisible);
    } else if (type === "Day") {
      setDayModalVisible(!isDayModalVisible);
    }
  };

  const updateModalChoice = (data) => {
    var type = data.split("#")[0];
    var val = data.split("#")[1];
    if (type === "Status") {
      setStatus(val);
    } else if (type === "Week") {
      setWeek(val);
    } else if (type === "Day") {
      setDay(val);
    }
    toggleModal(type);
  };

  useEffect(() => {
    //Generate list of consultation bookings
    var tempConsultations = [];
    const colourCodes = ["#90CAF9", "#FFF59D", "#A5D6A7", "#FFAB91", "#B39DDB", "#80CBC4", "#c5e1a5", "#fff59d", "#ffcc80", "#bcaaa4"];
    ManageBookingFB.getUserBookings(userID, status, week, day).then((data) => {
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
          color: colourCodes[i],
        });
      }
      setConsultations(tempConsultations);
    });
    //Generate list of academic weeks
    var tempWeeks = [];
    ManageBookingFB.getNumWeeks().then((data) => {
      tempWeeks.push({ week: "All Weeks" });
      for (var i = 0; i < data; i++) {
        tempWeeks.push({ week: `Week ${i}` });
      }
      setWeekList(tempWeeks);
    });
  }, [status, week, day]);

  const statusJSX = (
    <Modal isVisible={isStatusModalVisible} onBackdropPress={() => setStatusModalVisible(false)}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Status: </Text>
        <TouchableOpacity style={styles.modalBtn} onPress={() => updateModalChoice("Status#All Status")}>
          <Text style={styles.modalBtnText}> All Status </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalBtn} onPress={() => updateModalChoice("Status#Confirmed")}>
          <Text style={styles.modalBtnText}> Confirmed </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalBtn} onPress={() => updateModalChoice("Status#Pending")}>
          <Text style={styles.modalBtnText}> Pending </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

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
            onPress={() =>
              navigation.navigate("Pending", {
                secondScreen: secondScreen,
                firstScreen: firstScreen,
                userID: userID,
                consultDetails: item,
                bookingId: item.bookingId[index],
                // creator: item.creator,
                // bookingId: item.bookingId[index],
                // module: item.module,
                // ta: item.ta,
                // type: item.type,
                // location: item.location,
                // consultDate: item.consultDate,
                // consultStartTime: item.consultStartTime,
                // consultEndTime: item.consultEndTime,
                // agenda: item.agenda,
                // participants: item.participants,
              })
            }
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
          <Text style={styles.title}> Manage Bookings </Text>
          <View style={styles.filter}>
            <TouchableOpacity style={styles.filterBtn} onPress={() => toggleModal("Status")}>
              <Text style={styles.filter_text}>
                {" "}
                {status} <Image style={styles.chevron_inv} source={require("../assets/images/chevron-inv.png")} />
              </Text>
            </TouchableOpacity>
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
          {statusJSX}
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
    paddingHorizontal: wp("6%"),
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
