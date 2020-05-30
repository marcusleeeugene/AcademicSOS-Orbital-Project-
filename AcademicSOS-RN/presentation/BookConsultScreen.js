import React, { useState } from "react";
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
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";

export default function BookConsultScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, userID } = route.params;
  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [chosenTutor, setTutorPicker] = useState("");

  const [isDatePickerVisible, showDatePicker] = useState(false);
  const [isTimePickerVisible, showTimePicker] = useState(false);

  const [chosenDate, setDatePicker] = useState("");
  const [chosenTime, setTimePicker] = useState("");

  const updateDatePicker = (date) => {
    showDatePicker(false);
    setDatePicker(moment(date).format("DD-MMM-YY"));
  };

  const updateTimePicker = (time) => {
    showTimePicker(false);
    setTimePicker(moment(time).format("hh:mm A"));
  };

  const updateTutorModalChoice = (data) => {
    setTutorPicker(data);
    setModalVisible(!isModalVisible);
  };

  const tutor = [
    { key: "John Tan Ah kow" },
    { key: "Peter Lee" },
    { key: "Mary Goh" },
    { key: "Prof Aaron Tan" },
    { key: "Prof Martin Henz" },
    { key: "Prof Henry" },
  ];

  const tutorJSX = (
    <Modal
      visible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Teaching Assistant:</Text>
        <ScrollView>
          {tutor.map((item) => (
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => updateTutorModalChoice(item.key)}
            >
              <Text style={styles.modalBtnText}>{item.key}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  //SCROLLVIEW SHOULD BE IN BODY BUT SOME WEIRD ERROR HAPPENING
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <KeyboardAwareScrollView>
          <BreadCrumb navHistory={navHistory} />
          <ScrollView style={styles.body}>
            <Text style={styles.title}> Fill in consultation details: </Text>
            <View>
              {tutorJSX}
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
              <Text style={styles.itemName}>{"Date:"}</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.dateTimeTextBox}
                  underlineColorAndroid="transparent"
                  value={chosenDate}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => showDatePicker(true)}
                >
                  <Image
                    source={require("../assets/images/date.png")}
                    style={styles.imageStyle}
                  />
                  <DateTimePicker
                    isVisible={isDatePickerVisible}
                    onConfirm={updateDatePicker}
                    onCancel={() => showDatePicker(false)}
                    mode={"date"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemName}>{"Time:"}</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.dateTimeTextBox}
                  underlineColorAndroid="transparent"
                  value={chosenTime}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => showTimePicker(true)}
                >
                  <Image
                    source={require("../assets/images/time.png")}
                    style={styles.imageStyle}
                  />

                  <DateTimePicker
                    headerTextIOS="Pick a time"
                    isVisible={isTimePickerVisible}
                    onConfirm={updateTimePicker}
                    onCancel={() => showTimePicker(false)}
                    mode={"time"}
                    is24Hour={false}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemName}>{"Location:"}</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.textBox}
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity style={styles.button}>
                  <Image
                    source={require("../assets/images/location.png")}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text style={styles.itemName}>{"Students involved:"}</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.textBox}
                  underlineColorAndroid="transparent"
                  maxLength={20}
                  numberofLines={5}
                />
                <TouchableOpacity style={styles.button}>
                  <Image
                    source={require("../assets/images/student.png")}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemName}> Remarks:</Text>
            <View>
              <TextInput
                multiline={true}
                maxLength={200}
                numberofLines={10}
                style={styles.remarkBox}
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Book</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAwareScrollView>
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
