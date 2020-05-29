import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function DateTime() {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const [isDatePickerVisible, showDatePicker] = useState(false);
  const [isTimePickerVisible, showTimePicker] = useState(false);

  const [chosenDate, handleDatePicker] = useState("");
  const [chosenTime, handleTimePicker] = useState("");

  const updateDatePicker = (date) => {
    showDatePicker(false);
    handleDatePicker(moment(date).format("DD-MMM-YY"));
  };

  const updateTimePicker = (time) => {
    showTimePicker(false);
    handleTimePicker(moment(time).format("hh:mm A"));
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
