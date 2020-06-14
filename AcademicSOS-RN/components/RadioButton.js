import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const RadioButton = (props) => {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { type } = props;
  const [value, setValue] = useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {type.map((item) => {
            return (
              <View key={item.name} style={styles.buttonContainer}>
                <Text style={styles.text}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    props.parentCallback(item.name); //return callBack value to parent component
                    setValue(item.name); // assign value to radioButton accordingly
                  }}
                >
                  {value === item.name && <View style={styles.checkedCircle} />}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: wp("18%"),
  },
  circle: {
    backgroundColor: "white",
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
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
    color: "white",
    fontFamily: "Righteous-Regular",
    fontSize: hp("2.3%"),
  },
});

export default RadioButton;
