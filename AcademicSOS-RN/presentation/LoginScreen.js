import React, { useState, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputDataFB from "../firebase/InputDataFireBase.js";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [extraScrollHeight, setScrollHeight] = useState(0);

  const [dimensions, setDimensions] = useState({ window, screen });

  // *** Check screen sizes(Do not delete!!!)`${dimensions.screen.height}, ${dimensions.screen.width}`

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  login = (userID, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(`${userID}@u.nus.edu`, password)
        .then(() => {
          navigation.navigate("Home", {
            userID: userID,
            firstScreen: "Home",
          });
          setUserID("");
          setPassword("");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("Invalid User ID or blank fields !!!");
              setUserID("");
              break;
            case "auth/wrong-password":
              alert("Invalid password or blank fields !!!");
              setPassword("");
              break;
            default:
              alert("Invalid User !!!");
              setUserID("");
              setPassword("");
          }
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={extraScrollHeight}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.AcademicSOS}> AcademicSOS </Text>
        <Image
          style={styles.nusLogo}
          source={require("../assets/images/NUS_logo_Transparent.png")}
        />
        <View style={styles.loginBackground}>
          <Text style={styles.textInputTitle}> NUSNET ID: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setUserID}
            placeholder={"NUSNET ID"}
            value={userID}
            onFocus={() => {
              dimensions.screen.height > 700
                ? setScrollHeight(250)
                : setScrollHeight(150);
            }}
          />
          <Text style={styles.textInputTitle}> Password: </Text>

          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder={"Password"}
            onChangeText={setPassword}
            value={password}
            onFocus={() => {
              dimensions.screen.height > 700
                ? setScrollHeight(250)
                : setScrollHeight(150);
            }}
          />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => login(userID.toLowerCase(), password)}
          >
            <Text style={styles.loginBtnText}> LOGIN </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#EF7C00",
  },
  AcademicSOS: {
    marginTop: hp("15%"),
    fontSize: hp("4%"),
    textAlign: "center",
    fontFamily: "SonsieOne-Regular",
    color: "#FFFFFF",
  },
  nusLogo: {
    height: hp("15%"),
    width: wp("45%"),
    resizeMode: "contain",
  },
  loginBackground: {
    backgroundColor: "#003D7C",
    height: hp("30%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
  },
  textInputTitle: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    left: "-15%",
    marginBottom: "2%",
  },
  textInput: {
    borderColor: "black",
    fontSize: hp("1.5%"),
    marginBottom: "5%",
    height: hp("3.5%"),
    width: wp("50%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp("2%"),
  },
  loginBtn: {
    marginTop: "5%",
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnText: {
    marginTop: "-5%",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
});
