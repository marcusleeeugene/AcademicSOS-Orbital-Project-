import React from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function BreadCrumb() {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  //Navigation elements to show (To be changed )
  const navigation = [
      { name: 'Home', code: 'bye' }, { name: 'NextOne', code: 'bye' }, { name: 'NextTwo', code: 'bye' }
    ];

  //Handle navigation system
  let navJSX = []
  let lastElem = navigation.length - 1
  for (var i = 0; i < navigation.length; i++) {
    if (i == lastElem) { //Current directory
      navJSX.push(
        <View style={[styles.textContainer, styles.underline]}>
          <Text style={styles.breadCrumbText} onPress={() => null}> {navigation[i].name} </Text>
        </View>
      )
    } else { //Previous directories
      navJSX.push(
        <View style={styles.textContainer}>
          <Text style={styles.breadCrumbText} onPress={() => null}> {navigation[i].name} </Text>
        </View>
      )
    }

    if (i != lastElem && navigation.length > 1) { //Only render chevron if it is not last element
      navJSX.push(<Image style={styles.chevron} source={require("../assets/images/chevron.png")} />)
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.header}>
        {navJSX}
      </View>
    );
  }
}

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
    fontFamily: "Righteous-Regular"
  },
  underline: {
    height: hp('3%') ,
    borderBottomWidth: 3
  },
  chevron: {
    marginTop: "19.5%",
  },
});
