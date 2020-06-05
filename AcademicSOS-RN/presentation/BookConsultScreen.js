import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import DateTime, { currentTime, currentDate } from "../components/DateTime.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import BookConsultFB from "../firebase/BookConsultFireBase.js";

export default function BookConsultScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const {
    firstScreen,
    secondScreen,
    thirdScreen,
    userID,
    moduleCode,
  } = route.params;

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [tutor, setTutor] = useState([]);
  const [chosenTutor, setTutorPicker] = useState("");
  const [extraScrollHeight, setScrollHeight] = useState(0);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [remarks, setRemarks] = useState("");

  const updateDate = (date) => {
    setDate(date);
  };

  const updateStartTime = (time) => {
    setStartTime(time);
  };

  const updateEndTime = (time) => {
    setEndTime(time);
  };

  const updateTutorModalChoice = (data) => {
    setTutorPicker(data);
    setModalVisible(!isModalVisible);
  };

  const bookConsultation = () => {
    BookConsultFB.addBooking(
      userID,
      moduleCode,
      chosenTutor,
      date,
      startTime,
      endTime,
      location,
      participants,
      remarks,
      "Pending",
      currentDate,
      currentTime
    );
    alert("Successfully booked! Pls check your booking in Manage Bookings!");
    navigation.navigate("Manage Bookings", {
      secondScreen: "Manage Bookings",
      firstScreen: "Home",
      userID: userID,
    });
  };
  useEffect(() => {
    var loadedTA = [];
    var getTutorialClassForStudent = BookConsultFB.getTutorialClass(
      userID,
      moduleCode
    );

    getTutorialClassForStudent
      .then((tutorialClass) =>
        BookConsultFB.getTutorialClassTA(tutorialClass, moduleCode)
      )
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          loadedTA.push({ id: data[i]["id"], name: data[i]["name"] });
        }
      });

    setTutor(loadedTA);
  }, []);

  const tutorJSX = (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Teaching Assistant:</Text>
        <ScrollView>
          {tutor.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.modalBtn}
              onPress={() => updateTutorModalChoice(item.name)}
            >
              <Text style={styles.modalBtnText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const locationJSX = (
    <View>
      <Text style={styles.itemName}>{"Location:"}</Text>
      <View style={styles.textInput}>
        <TextInput
          style={styles.textBox}
          underlineColorAndroid="transparent"
          onFocus={() => {
            setScrollHeight(50);
          }}
          onChangeText={(text) => setLocation(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../assets/images/location.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const participantJSX = (
    <View>
      <Text style={styles.itemName}>{"Students involved:"}</Text>
      <View style={styles.textInput}>
        <TextInput
          style={styles.textBox}
          underlineColorAndroid="transparent"
          maxLength={20}
          numberofLines={5}
          editable={false}
          onChangeText={(text) => setParticipants(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../assets/images/student.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.body}
        enableOnAndroid={true}
        extraScrollHeight={extraScrollHeight}
      >
        <BreadCrumb navHistory={navHistory} />
        <Text style={styles.title}> Fill in consultation details: </Text>
        <Text style={styles.itemName}>{"Teaching Assistant:"}</Text>
        <View style={styles.textInput}>
          <TextInput
            style={styles.textBox}
            underlineColorAndroid="transparent"
            editable={false}
            value={chosenTutor}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}
          >
            <Image
              source={require("../assets/images/teachingassistant.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dateTimeContainer}>
          <DateTime
            dateCallback={updateDate}
            startTimeCallback={updateStartTime}
            endTimeCallback={updateEndTime}
          />
        </View>
        {locationJSX}
        {participantJSX}
        <Text style={styles.itemName}> Remarks:</Text>
        <View>
          <TextInput
            multiline={true}
            maxLength={200}
            numberofLines={5}
            style={styles.remarkBox}
            underlineColorAndroid="transparent"
            onFocus={() => {
              setScrollHeight(200);
            }}
            onChangeText={(text) => setRemarks(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => bookConsultation()}
        >
          <Text style={styles.bookBtnText}>Book</Text>
        </TouchableOpacity>
        {tutorJSX}
      </KeyboardAwareScrollView>
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
    marginTop: "2%",
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    marginBottom: "3%",
  },
  textInput: {
    marginHorizontal: wp("25"),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: hp("3.5%"),
    width: wp("50%"),
    borderRadius: 5,
    margin: hp("2%"),
  },
  dateTimeContainer: {
    marginTop: hp("-2%"),
  },
  dateTimeTextBox: {
    marginLeft: wp("7%"),
    flex: 1,
    paddingHorizontal: wp("2%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  textBox: {
    flex: 1,
    paddingHorizontal: wp("1%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  itemName: {
    marginTop: hp("1%"),
    textAlign: "center",
    fontSize: hp("2%"),
    color: "white",
    alignItems: "center",
    height: hp("5%"),
    width: wp("100%"),
    fontFamily: "Righteous-Regular",
    marginBottom: hp("-3%"),
  },
  button: {
    height: hp("3.5%"),
    width: wp("10%"),
    borderRadius: hp("0.8%"),
    borderColor: "black",
    borderWidth: 1.1,
    alignItems: "center",
  },
  imageStyle: {
    height: hp("3%"),
    width: wp("7.5%"),
    resizeMode: "contain",
    alignItems: "center",
  },
  remarkBox: {
    marginTop: "3%",
    marginLeft: "15%",
    flexDirection: "row",
    borderColor: "black",
    fontSize: hp("1.5%"),
    marginBottom: "5%",
    height: hp("8.5%"),
    width: wp("68%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp("2%"),
  },
  bookBtn: {
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    marginTop: "2%",
    marginHorizontal: "40%",
    flexDirection: "column",
    alignItems: "center",
  },
  bookBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    alignItems: "center",
    marginTop: "4%",
  },
  modalView: {
    backgroundColor: "#CFD8DC",
    flexDirection: "column",
    height: hp("36%"),
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
    width: wp("45%"),
    justifyContent: "center",
    left: "25%",
    marginBottom: "3%",
  },
  modalBtnText: {
    textAlign: "center",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
});
