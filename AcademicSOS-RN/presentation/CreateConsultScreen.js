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
import RadioButton from "../components/RadioButton.js";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreateConsultScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, userID } = route.params;
  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];

  const [isDatePickerVisible, showDatePicker] = useState(false);
  const [isTimePickerVisible, showTimePicker] = useState(false);

  const [chosenDate, handleDatePicker] = useState("");
  const [chosenTime, handleTimePicker] = useState("");
  const [consultType, setConsultType] = useState("Public");

  const type = [
    {
      key: "Public",
    },
    {
      key: "Private",
    },
  ];

  const updateDatePicker = (date) => {
    showDatePicker(false);
    handleDatePicker(moment(date).format("DD-MMM-YY"));
  };

  const updateTimePicker = (time) => {
    showTimePicker(false);
    handleTimePicker(moment(time).format("hh:mm A"));
  };

  const updateConsultType = (consultType) => {
    setConsultType(consultType);
  }; // handle callBack of button (public, private consult type)

  // callbackFunction = (childData) => {
  //   this.setState((prevState) => ({
  //     consultType: prevState.consultType,
  //   }));
  //   this.setState({ consultType: childData });
  // }; // handle callBack of button (public, private consult type)

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

            <Text style={styles.itemName}> Type:</Text>
            <View style={styles.typeContainer}>
              <RadioButton type={type} parentCallback={updateConsultType} />
            </View>
            {consultType === "Private" ? (
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
            ) : null}
            <Text style={styles.itemName}> Size:</Text>
            <View>
              <TextInput
                style={styles.sizeContainer}
                maxLength={3}
                keyboardType="numeric"
              />
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
            <TouchableOpacity style={styles.createBtn}>
              <Text style={styles.createBtnText}>Create</Text>
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
    marginTop: hp("1.8%"),
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    marginBottom: hp("2%"),
  },
  text: {
    color: "white",
    fontFamily: "Righteous-Regular",
  },
  dateTimeTextBox: {
    marginLeft: wp("7%"),
    flex: 1,
    paddingHorizontal: wp("2%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
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
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sizeContainer: {
    marginTop: hp("1.5%"),
    marginHorizontal: "42.5%",
    marginVertical: "1%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: wp("3.5%"),
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  remarkBox: {
    marginTop: hp("2%"),
    marginLeft: wp("15%"),
    borderColor: "black",
    fontSize: hp("1.5%"),
    marginBottom: "5%",
    height: hp("8.5%"),
    width: wp("68%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp("2%"),
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("40%"),
    flexDirection: "column",
    alignItems: "center",
  },
  createBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    alignItems: "center",
    marginTop: wp("1%"),
  },
});
