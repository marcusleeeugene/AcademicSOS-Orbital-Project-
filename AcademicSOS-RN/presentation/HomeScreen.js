import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatGrid } from "react-native-super-grid";
import BreadCrumb from "../components/BreadCrumb";
import HomeFB from "../firebase/HomeFireBase.js";
import * as firebase from "firebase";

export default function HomeScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { userID, firstScreen } = route.params;
  const [userType, setUserType] = useState("");

  const navHistory = [{ dest: firstScreen, alt_dest: "" }];

  useEffect(() => {
    var tempUserType = "Student";
    HomeFB.checkUserRole(userID).then((data) => {
      if (data.includes("Professor")) {
        tempUserType = "Professor";
      } else if (data.includes("TA")) {
        tempUserType = "TA";
      }
      setUserType(tempUserType);
    });
  });

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        navigation.navigate("Login");
        alert("Signed out successfully!");
      })
      .catch(function (error) {
        // An error happened.
        alert(error);
      });
  };

  const optionTA = [
    {
      key: "Book\n consultation",
      image: require("../assets/images/bookConsult.png"),
      upcomingScreen: "Book",
    },
    {
      key: "Public\n consultation",
      image: require("../assets/images/publicConsult.png"),
      upcomingScreen: "Public Consultation",
    },
    {
      key: "Priority\n Points",
      image: require("../assets/images/priorityPoints.png"),
      upcomingScreen: "Priority Points",
    },
    {
      key: "Manage\n Bookings",
      image: require("../assets/images/manageBookings.png"),
      upcomingScreen: "Manage Bookings",
    },
    {
      key: "Create\n Consulation",
      image: require("../assets/images/createConsult.png"),
      upcomingScreen: "Create Consultation",
    },
  ];

  const optionStudent = optionTA.slice(0, 4);

  const optionProf = optionTA.slice(4).concat(optionTA.slice(3, 4));

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb navHistory={navHistory} />
        <View style={styles.body}>
          <Text style={styles.title}>Welcome {userID} !</Text>
          <FlatGrid
            itemDimension={130}
            items={
              userType == "TA"
                ? optionTA
                : userType == "Professor"
                ? optionProf
                : optionStudent
            }
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.optionContainer]}>
                <TouchableOpacity
                  onPress={() =>
                    item.key !== "Manage\n Bookings"
                      ? navigation.navigate("Select Module", {
                          secondScreen: item.upcomingScreen,
                          firstScreen: "Home",
                          userID: userID,
                        })
                      : navigation.navigate("Manage Bookings", {
                          secondScreen: item.upcomingScreen,
                          firstScreen: "Home",
                          userID: userID,
                        })
                  }
                >
                  <Text style={styles.optionName}> {item.key} </Text>
                  <Image style={styles.optionImage} source={item.image} />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.logoutBtn} onPress={logOut}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
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
    alignItems: "center",
  },
  title: {
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  optionImage: {
    marginTop: "-15%",
    height: hp("10%"),
    width: wp("40%"),
    resizeMode: "contain",
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  optionContainer: {
    marginLeft: wp("5%"),
    justifyContent: "center",
    borderRadius: 10,
    height: hp("20%"),
    width: hp("19%"),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  optionName: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    height: hp("10%"),
    fontFamily: "Righteous-Regular",
  },
  logoutBtn: {
    marginBottom: hp("20%"),
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("30%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    alignItems: "center",
  },
  logoutBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    marginTop: "4%",
  },
});
