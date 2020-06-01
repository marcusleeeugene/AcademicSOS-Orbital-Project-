import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import Modal from "react-native-modal";

export default function PublicConsultScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, userID } = route.params;
  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [isWeekModalVisible, setWeekModalVisible] = useState(false);
  const [isDayModalVisible, setDayModalVisible] = useState(false);

  const [status, setStatus] = useState("All Status");
  const [week, setWeek] = useState("All Weeks");
  const [day, setDay] = useState("All Days");

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
    console.log(data);
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

  //let tempTimeStorage = moment(new Date()).format("hh:mm A");
  const statusJSX = (
    <Modal
      isVisible={isStatusModalVisible}
      onBackdropPress={() => setStatusModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Status: </Text>
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Status#All Types")}
        >
          <Text style={styles.modalBtnText}> All Types </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Status#Confirmed")}
        >
          <Text style={styles.modalBtnText}> Confirmed </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Status#Pending")}
        >
          <Text style={styles.modalBtnText}> Pending </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const weeks = [
    { key: "Week 1" },
    { key: "Week 2" },
    { key: "Week 3" },
    { key: "Week 4" },
    { key: "Week 5" },
    { key: "Week 6" },
    { key: "Reading 1" },
    { key: "Week 7" },
    { key: "Week 8" },
    { key: "Week 9" },
    { key: "Week 10" },
    { key: "Week 11" },
    { key: "Week 12" },
    { key: "Week 13" },
    { key: "Reading 2" },
    { key: "Exam 1" },
    { key: "Exam 2" },
  ];
  const weekJSX = (
    <Modal
      isVisible={isWeekModalVisible}
      onBackdropPress={() => setWeekModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Week: </Text>
        <ScrollView>
          {weeks.map((item) => (
            <TouchableOpacity
              key = {item.key}
              style={styles.modalBtn}
              onPress={() => updateModalChoice("Week#" + item.key)}
            >
              <Text style={styles.modalBtnText}> {item.key} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const days = [
    { key: "Monday" },
    { key: "Tuesday" },
    { key: "Wednesday" },
    { key: "Thursday" },
    { key: "Friday" },
    { key: "Saturday" },
    { key: "Sunday" },
  ];
  const dayJSX = (
    <Modal
      isVisible={isDayModalVisible}
      onBackdropPress={() => setDayModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Day: </Text>
        <ScrollView>
          {days.map((item) => (
            <TouchableOpacity
              key = {item.key}
              style={styles.modalBtn}
              onPress={() => updateModalChoice("Day#" + item.key)}
            >
              <Text style={styles.modalBtnText}> {item.key} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const consultations = [
    {
      name: "CS1101S",
      ta: "John Tan",
      remarks: "Recursion problems",
      date: "21 - Jun - 20",
      time: "11.00 AM",
      color: "#90CAF9",
      type: "approved",
    },
    {
      name: "MA1101R",
      ta: "Peter Lee",
      remarks: "How to gaussian eliminate",
      date: "21 - Jun - 20",
      time: "11.00 AM",
      color: "#A5D6A7",
      type: "approved",
    },
    {
      name: "ES1601",
      ta: "Mary Koh",
      remarks: "Verbs and adjectives",
      date: "21 - Jun - 20",
      time: "11.00 AM",
      color: "#FFAB91",
      type: "approved",
    },
    {
      name: "NM3221",
      ta: "Bob Tan",
      remarks: "Verbs and adjectives",
      date: "21 - Jun - 20",
      time: "11.00 AM",
      color: "#B39DDB",
      type: "pending",
    },
  ];

  const consultationsJSX = (
    <View>
      {consultations.map((item, index) => (
        <View key = {"consultation" + index} style={styles.moduleRow}>
          <View style={styles.dateTime}>
            <Text style={styles.dateTime_Text}> {item.date} </Text>
            <Text style={styles.dateTime_Text}> {item.time} </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.moduleContainer,
              { backgroundColor: item.color },
            ]}
          >
            <Text style={styles.consultationInfoMod}>
              {" "}
              {item.name}{" "}
            </Text>
            <Text style={styles.consultationInfo}>
              {" "}
              TA: {item.ta}{" "}
            </Text>
            <Text style={styles.consultationInfo}>
              {" "}
              Remarks: {item.remarks}{" "}
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
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => toggleModal("Status")}
            >
              <Text style={styles.filter_text}>
                {" "}
                {status}{" "}
                <Image
                  style={styles.chevron_inv}
                  source={require("../assets/images/chevron-inv.png")}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => toggleModal("Week")}
            >
              <Text style={styles.filter_text}>
                {" "}
                {week}{" "}
                <Image
                  style={styles.chevron_inv}
                  source={require("../assets/images/chevron-inv.png")}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => toggleModal("Day")}
            >
              <Text style={styles.filter_text}>
                {" "}
                {day}{" "}
                <Image
                  style={styles.chevron_inv}
                  source={require("../assets/images/chevron-inv.png")}
                />
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
    width: wp("100%"),
    backgroundColor: "#FFFFFF",
    marginBottom: "3%",
  },
  dateTime: {
    flexDirection: "column",
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
  },
  consultationInfo: {
    fontSize: hp("1.5%"),
    fontFamily: "Righteous-Regular",
  },
  modal: {
    justifyContent: "center",
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
