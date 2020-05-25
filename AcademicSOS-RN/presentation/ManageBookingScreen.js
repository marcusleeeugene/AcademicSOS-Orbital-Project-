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
  Platform
} from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function ManageBookingScreen() {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);

  const [status, setStatus] = useState("Status");
  const [date, setDate] = useState("Date");
  const [time, setTime] = useState("Time");

  const toggleModal = (type) => {
    if (type === "Status") {
      setStatusModalVisible(!isStatusModalVisible);
    } else if (type === "Date") {
      setDateModalVisible(!isDateModalVisible);
    } else if (type === "Time") {
      setTimeModalVisible(!isTimeModalVisible);
    }
  };

  const updateModalChoice = (data) => {
    var type = data.split("#")[0];
    var val = data.split("#")[1];
    if (type === "Status") {
      setStatus(val);
    } else if (type === "Date") {
      setDate(val);
    } else if (type === "Time") {
      setTime(val);
    }
    toggleModal(type);
  };

  let tempDateStorage = moment(new Date()).format("DD-MMM-YY");
  const selectedDate = (event, selectedDate) => {
    tempDateStorage = moment(selectedDate).format("DD-MMM-YY");
  };

  let tempTimeStorage = moment(new Date()).format("hh:mm A");
  const selectedTime = (event, selectedTime) => {
    tempTimeStorage = moment(selectedTime).format("hh:mm A");
  };

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

  const consultationsJSX = [];
  for (var i = 0; i < consultations.length; i++) {
    consultationsJSX.push(
      <View style={styles.moduleRow}>
        <View style={styles.dateTime}>
          <Text style={styles.dateTime_Text}> {consultations[i].date} </Text>
          <Text style={styles.dateTime_Text}> {consultations[i].time} </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.moduleContainer,
            { backgroundColor: consultations[i].color },
          ]}
        >
          <Text style={styles.consultationInfoMod}>
            {" "}
            {consultations[i].name}{" "}
          </Text>
          <Text style={styles.consultationInfo}>
            {" "}
            TA: {consultations[i].ta}{" "}
          </Text>
          <Text style={styles.consultationInfo}>
            {" "}
            Remarks: {consultations[i].remarks}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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

  const dateJSX = (
    <Modal
      isVisible={isDateModalVisible}
      onBackdropPress={() => setDateModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Date: </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          display="default"
          onChange={selectedDate}
        />
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Date#All Dates")}
        >
          <Text style={styles.modalBtnText}> All Dates </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Date#" + tempDateStorage)}
        >
          <Text style={styles.modalBtnText}> Set </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const timeJSX = (
    <Modal
      isVisible={isTimeModalVisible}
      onBackdropPress={() => setTimeModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}> Time: </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          display="default"
          onChange={selectedTime}
        />
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Time#Any Time")}
        >
          <Text style={styles.modalBtnText}> Any Time </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => updateModalChoice("Time#" + tempTimeStorage)}
        >
          <Text style={styles.modalBtnText}> Set </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb />
        <View style={styles.body}>
          <Text style={styles.title}> Manage Bookings </Text>
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
              onPress={() => toggleModal("Date")}
            >
              <Text style={styles.filter_text}>
                {" "}
                {date}{" "}
                <Image
                  style={styles.chevron_inv}
                  source={require("../assets/images/chevron-inv.png")}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => toggleModal("Time")}
            >
              <Text style={styles.filter_text}>
                {" "}
                {time}{" "}
                <Image
                  style={styles.chevron_inv}
                  source={require("../assets/images/chevron-inv.png")}
                />
              </Text>
            </TouchableOpacity>
          </View>
          {statusJSX}
          {dateJSX}
          {timeJSX}
          <ScrollView style={styles.moduleView}>
            {consultationsJSX}
          </ScrollView>
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
    justifyContent: "center"
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
    if (Platform.OS === 'ios') {
      backgroundColor: "#CFD8DC",
      flexDirection: "column",
      justifyContent: "center",
      height: hp("40%")
    } else if (Platform.OS === 'android') {
      visibility: 'hidden',
    }
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
