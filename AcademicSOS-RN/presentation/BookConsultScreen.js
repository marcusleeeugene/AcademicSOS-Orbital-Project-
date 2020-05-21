import React from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BreadCrumb from "./BreadCrumb";

const options = [
  {
    name: "Teaching Assistant:",
    image: require("../assets/images/teachingassistant.png"),
    id: 1,
  },
  { name: "Date:", image: require("../assets/images/date.png"), id: 2 },
  { name: "Time:", image: require("../assets/images/time.png"), id: 3 },
  {
    name: "Location:",
    image: require("../assets/images/location.png"),
    id: 4,
  },
  {
    name: "Students involved:",
    image: require("../assets/images/student.png"),
    id: 5,
  },
];

export default function BookConsultScreen() {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb />
        <ScrollView style={styles.body}>
          <Text style={styles.title}> Fill in consultation details: </Text>
          {options.map((item) => (
            <View key={item.id}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ flex: 1,     paddingHorizontal: wp('2%')}}
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity style={styles.button}>
                  <Image source={item.image} style={styles.imageStyle} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text style={styles.itemName}> Remarks:</Text>
          <View>
            <TextInput
              multiline={true}
              maxLength={200}
              autoFocus={true}
              numberofLines={10}
              style={styles.remarkBox}
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookBtnText}>Book</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginTop: "2%",
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    marginBottom: "3%",
  },
  textInput: {
    marginHorizontal: "15%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: hp("3.5%"),
    width: wp("70%"),
    borderRadius: 5,
    margin: 8,
  },
  itemName: {
    marginTop: "2%",
    textAlign: "center",
    fontSize: hp("2%"),
    color: "white",
    alignItems: "center",
    height: hp("5%"),
    width: wp("100%"),
    fontFamily: "Righteous-Regular",
    marginBottom: "-5%",
  },
  button: {
    height: hp("3.5%"),
    width: wp("10%"),
    borderRadius: hp("0.8%"),
    borderColor: "black",
    borderWidth: 1.1,
    alignItems: "center",
    paddingHorizontal: wp('0%'),
  },
  imageStyle: {
    height: hp("3%"),
    width: wp("7.5%"),
    resizeMode: "contain",
    alignItems: "center",
  },
  remarkBox: {
    marginTop: "3%",
    marginLeft: "15%",
    flexDirection: "row",
    borderColor: "black",
    fontSize: hp("1.5%"),
    marginBottom: "5%",
    height: hp("8.5%"),
    width: wp("68%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp('2%')
  },
  bookBtn: {
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    marginTop: "2%",
    marginHorizontal: "40%",
    flexDirection: "column",
    alignItems: "center",
  },
  bookBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    alignItems: "center",
    marginTop: "4%"
  },
});
