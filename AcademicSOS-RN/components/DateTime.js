import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

export default class DateTime extends Component {
  constructor() {
    super();
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      chosenDate: "",
      chosenTime: "",
    };
  }

  handleDatePicker = (date) => {
    this.setState({
      isDatePickerVisible: false,
      chosenDate: moment(date).format("DD-MMM-YY"),
    });
  };

  handleTimePicker = (time) => {
    this.setState({
      isTimePickerVisible: false,
      chosenTime: moment(time).format("hh:mm A"),
    });
  };

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
    });
  };

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.displayLabel}>{this.state.chosenDate}</Text>
        <Text style={styles.displayLabel}>{this.state.chosenTime}</Text>
        <TouchableOpacity style={styles.button} onPress={this.showDatePicker}>
          <Text style={styles.text}> Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicker}
          onCancel={this.hideDatePicker}
          //   mode={"time"}
          //   is24Hour={false}
          mode={"date"}
          //   mode={"datetime"}
          //   is24Hour={false}
          //   datePickerModeAndroid={"spinner"}
        />

        <TouchableOpacity style={styles.button} onPress={this.showTimePicker}>
          <Text style={styles.text}> Show TimePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicker}
          onCancel={this.hideTimePicker}
          mode={"time"}
          is24Hour={false}
          //   mode={"date"}
          //   mode={"datetime"}
          //   is24Hour={false}
          //   datePickerModeAndroid={"spinner"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  displayLabel: {
    color: "red",
    fontSize: 20,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#330066",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
