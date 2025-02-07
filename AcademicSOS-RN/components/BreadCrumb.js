import React from "react";
import { useFonts } from "@expo-google-fonts/inter";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppLoading } from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

const BreadCrumb = (props) => {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { navHistory } = props;
  const navigation = useNavigation();

  const navJSX = (
    <View style={styles.header}>
      {navHistory.map((item, index) => (
        <View key={item.dest} style={index != navHistory.length - 1 ? styles.textContainer : [styles.textContainer, styles.underline]}>
          <TouchableOpacity
            onPress={() => {
              index != navHistory.length - 1 && item.alt_dest == "" ? navigation.navigate(item.dest) : index != navHistory.length - 1 ? navigation.navigate(item.alt_dest) : null;
            }}
          >
            <Text style={styles.breadCrumbText}> {item.dest} </Text>
          </TouchableOpacity>
          {index != navHistory.length - 1 ? ( //If not only "Home", generate chevron for directories
            <Image style={styles.chevron} source={require("../assets/images/chevron.png")} />
          ) : null}
        </View>
      ))}
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <View>{navJSX}</View>;
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EF7C00",
    height: hp("15%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: hp("8%"),
    flexDirection: "row",
  },
  breadCrumbText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    justifyContent: "center",
  },
  underline: {
    height: hp("3%"),
    borderBottomWidth: 3,
  },
  chevron: {
    marginTop: hp("-0.5%"),
  },
});

export default BreadCrumb;
