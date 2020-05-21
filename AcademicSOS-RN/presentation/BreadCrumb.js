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

  const navigation = [
      { name: 'Home', code: 'bye' }, { name: 'NextOne', code: 'bye' }, { name: 'NetxTwo', code: 'bye' }
    ];

  let navJSX = []
  for (var i = 0; i < navigation.length; i++) {
    navJSX.push(<Text style={styles.breadCrumbText} onPress={() => null}> {navigation[i].name} </Text>)
    if (i != navigation.length - 1 && navigation.length > 1) {
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
  breadCrumbText: {
    marginTop: "20%",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
  chevron: {
    marginTop: "19.5%",
  },
});
