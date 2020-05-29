import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppLoading } from "expo";
import { FlatGrid } from "react-native-super-grid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import SelectModuleFB from "../firebase/SelectModuleFireBase.js";

export default function SelectModuleScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen } = route.params;
  const [modules, setModules] = useState([]);

  const navHistory = [{ key: firstScreen }, { key: secondScreen }];

  // const goNextScreen = (nextScreen) => {
  //   navigation.navigate(nextScreen);
  // };

  useEffect(() => {
    var tempModules = [];
    const colourCodes = [
      "#90CAF9",
      "#FFF59D",
      "#A5D6A7",
      "#FFAB91",
      "#B39DDB",
      "#80CBC4",
      "#c5e1a5",
      "#fff59d",
      "#ffcc80",
      "#bcaaa4",
    ];
    SelectModuleFB.loadUserModules("e0415870").then((data) => {
      for (var i = 0; i < data.length; i++) {
        tempModules.push({ name: data[i], code: colourCodes[i] });
      }
      setModules(tempModules);
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb navHistory={navHistory} />
        <View style={styles.body}>
          <Text style={styles.title}> Select a module </Text>
          <FlatGrid
            itemDimension={130}
            items={modules}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View
                style={[styles.itemContainer, { backgroundColor: item.code }]}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(secondScreen, {
                      thirdScreen: item.name,
                      secondScreen: secondScreen,
                      firstScreen: firstScreen,
                    })
                  }
                >
                  <Text style={styles.itemName}> {item.name} </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#003D7C",
  },
  title: {
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    height: hp("9%"),
    fontFamily: "Righteous-Regular",
  },
});
