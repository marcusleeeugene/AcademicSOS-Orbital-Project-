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
  Platform,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DateTime = (props) => {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const options = [
    { name: "Date", image: require("../assets/images/date.png"), id: 1 },
    { name: "Time", image: require("../assets/images/time.png"), id: 2 },
  ];

  const [isDatePickerVisible, showDatePicker] = useState(false);
  const [isTimePickerVisible, showTimePicker] = useState(false);

  const [chosenDate, setDatePicker] = useState("");
  const [chosenTime, setTimePicker] = useState("");

  const updateDatePicker = (date) => {
    showDatePicker(false);
    var pickedDate = moment(date).format("DD-MMM-YY");
    setDatePicker(pickedDate);
    props.dateCallback(pickedDate);
  };

  const updateTimePicker = (time) => {
    showTimePicker(false);
    var pickedTime = moment(time).format("hh:mm A");
    setTimePicker(pickedTime);
    props.timeCallback(pickedTime);
  };

  const dateView = (
    <View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        onConfirm={updateDatePicker}
        onCancel={() => showDatePicker(false)}
        mode={"date"}
      />
    </View>
  );

  const timeView = (
    <View>
      <DateTimePicker
        headerTextIOS="Pick a time"
        isVisible={isTimePickerVisible}
        onConfirm={updateTimePicker}
        onCancel={() => showTimePicker(false)}
        mode={"time"}
        is24Hour={false}
      />
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
              value={item.name === "Date" ? chosenDate : chosenTime}
              editable={false}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                item.name === "Date"
                  ? showDatePicker(true)
                  : showTimePicker(true);
              }}
            >
              <Image source={item.image} style={styles.imageStyle} />
              {item.name === "Time" ? timeView : dateView}
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <View>{dateTimeJSX}</View>;
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

export default DateTime;
