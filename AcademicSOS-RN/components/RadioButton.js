import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

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
              <View key={item.key} style={styles.buttonContainer}>
                <Text style={styles.text}>{item.key}</Text>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    props.parentCallback(item.key); //return callBack value to parent component
                    setValue(item.key); // assign value to radioButton accordingly
                  }}
                >
                  {value === item.key && <View style={styles.checkedCircle} />}
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

export default RadioButton;
