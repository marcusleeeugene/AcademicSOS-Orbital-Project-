import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class RadioButton extends Component {
  state = {
    value: "",
  };

  render() {
    const { type } = this.props;
    const { value } = this.state;

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {type.map((item) => {
            return (
              <View key={item.key} style={styles.buttonContainer}>
                <Text style={styles.text}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    this.props.parentCallback(item.key);
                    this.setState({
                      value: item.key,
                    });
                  }}
                >
                  {value === item.key && <View style={styles.checkedCircle} />}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* <Text style={styles.text}> Selected: {this.state.value} </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },

  circle: {
    backgroundColor: "white",
    marginHorizontal: 2,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "black",
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10,
    color: "white",
    fontFamily: "Righteous-Regular",
  },
});
