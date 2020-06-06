import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { Text, TextInput, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export var currentDate = moment(new Date()).format("DD-MMM-YY");
export var currentTime = moment(new Date()).format("hh:mm:ss A");

const DateTime = (props) => {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const options = [
    { name: "Date", image: require("../assets/images/date.png"), id: 1 },
    { name: "Start Time", image: require("../assets/images/time.png"), id: 2 },
    { name: "End Time", image: require("../assets/images/time.png"), id: 3 },
  ];

  const [isDatePickerVisible, showDatePicker] = useState(false);
  const [isStartTimePickerVisible, showStartTimePicker] = useState(false);
  const [isEndTimePickerVisible, showEndTimePicker] = useState(false);

  const [chosenDate, setDatePicker] = useState("");
  const [chosenStartTime, setStartTimePicker] = useState("");
  const [chosenEndTime, setEndTimePicker] = useState("");

  const updateDatePicker = (date) => {
    showDatePicker(false);
    var pickedDate = moment(date).format("DD-MMM-YY");
    setDatePicker(pickedDate);
    props.dateCallback(pickedDate);
  };

  const updateStartTimePicker = (time) => {
    showStartTimePicker(false);
    var pickedTime = moment(time).format("hh:mm A");
    setStartTimePicker(pickedTime);
    props.startTimeCallback(pickedTime);
  };

  const updateEndTimePicker = (time) => {
    showEndTimePicker(false);
    var pickedTime = moment(time).format("hh:mm A");
    setEndTimePicker(pickedTime);
    props.endTimeCallback(pickedTime);
  };

  const dateView = (
    <View>
      <DateTimePicker isVisible={isDatePickerVisible} onConfirm={updateDatePicker} onCancel={() => showDatePicker(false)} mode={"date"} />
    </View>
  );

  const startTimeView = (
    <View>
      <DateTimePicker headerTextIOS="Pick a time" isVisible={isStartTimePickerVisible} onConfirm={updateStartTimePicker} onCancel={() => showStartTimePicker(false)} mode={"time"} is24Hour={false} />
    </View>
  );

  const endTimeView = (
    <View>
      <DateTimePicker headerTextIOS="Pick a time" isVisible={isEndTimePickerVisible} onConfirm={updateEndTimePicker} onCancel={() => showEndTimePicker(false)} mode={"time"} is24Hour={false} />
    </View>
  );

  const dateTimeJSX = (
    <View>
      {options.map((item) => (
        <View key={item.id}>
          <Text style={styles.itemName}>{item.name}:</Text>
          <View style={styles.textInput}>
            <TextInput
              style={styles.dateTimeTextBox}
              underlineColorAndroid="transparent"
              value={item.name.includes("Date") ? chosenDate : item.name == "Start Time" ? chosenStartTime : chosenEndTime}
              editable={false}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                item.name.includes("Date") ? showDatePicker(true) : item.name == "Start Time" ? showStartTimePicker(true) : showEndTimePicker(true);
              }}
            >
              <Image source={item.image} style={styles.imageStyle} />
              {item.name.includes("Date") ? dateView : item.name == "Start Time" ? startTimeView : endTimeView}
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <View style={styles.container}>{dateTimeJSX}</View>;
  }
};

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
    margin: hp("1%"),
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

export default DateTime;
