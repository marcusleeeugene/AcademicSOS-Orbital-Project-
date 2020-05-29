import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

const BreadCrumb = (props) => {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  //Navigation elements to show (To be changed )
  const { navHistory } = props;
  const [value, setValue] = useState("Home");
  const navigation = useNavigation();

  let navJSX = [];
  let lastElem = navHistory.length - 1;
  for (var i = 0; i < navHistory.length; i++) {
    if (i == lastElem) {
      //Current directory
      navJSX.push(
        <View style={[styles.textContainer, styles.underline]}>
          <TouchableOpacity>
            <Text style={styles.breadCrumbText}> {navHistory[i].key} </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      //Previous directories
      navJSX.push(
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => {
              setValue(navHistory);
              navigation.navigate(value); //navHistory[i].key not working
            }}
          >
            <Text style={styles.breadCrumbText}>{navHistory[i].key}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (i != lastElem && navHistory.length > 1) {
      //Only render chevron if it is not last element
      navJSX.push(
        <Image
          style={styles.chevron}
          source={require("../assets/images/chevron.png")}
        />
      );
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <View style={styles.header}>{navJSX}</View>;
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EF7C00",
    height: hp("16%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: "20%",
  },
  breadCrumbText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
  underline: {
    height: hp("3%"),
    borderBottomWidth: 3,
  },
  chevron: {
    marginTop: "19.5%",
  },
});

export default BreadCrumb;
