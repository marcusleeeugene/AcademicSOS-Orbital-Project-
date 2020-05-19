import React from 'react';
import { useFonts } from '@use-expo/font';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function LoginPresentation() {

  let [fontsLoaded] = useFonts({
    'SonsieOne-Regular': require('../assets/fonts/SonsieOne-Regular.ttf'),
    'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style = {styles.container}>
        <Text style = {styles.AcademicSOS}> AcademicSOS </Text>
        <Image style = {styles.nusLogo} source={require('../assets/images/NUS_logo_Transparent.png')} />
        <View style = {styles.loginBackground}>
          <Text style = {styles.textInputTitle}> Student ID: </Text>
          <TextInput style = {styles.textInput} placeholder="    Student ID"/>
          <Text style = {styles.textInputTitle}> Password: </Text>
          <TextInput style = {styles.textInput} placeholder="    Password"/>
          <TouchableOpacity style = {styles.loginBtn}><Text style = {styles.loginBtnText}> LOGIN </Text></TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  AcademicSOS: {
    fontSize: hp('4%'),
    textAlign: "center",
    fontFamily: "SonsieOne-Regular",
    color: "#FF5722"
  },
  nusLogo: {
    height: hp('15%'),
    width: wp('45%'),
    resizeMode: 'contain'
  },
  loginBackground: {
    backgroundColor: '#003D7C',
    height: hp('30%'),
    width: wp('80%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputTitle: {
    fontSize: hp('2%'),
    fontFamily: "Righteous-Regular",
    color: '#FFFFFF',
    left: '-15%',
    marginBottom: '2%'
  },
  textInput: {
    borderColor: 'black',
    fontSize: hp('1.5%'),
    marginBottom: '5%',
    height: hp('3.5%'),
    width: wp('50%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('1.1%')
  },
  loginBtn: {
    marginTop: '5%',
    backgroundColor: '#FFFFFF',
    height: hp('3.5%'),
    width: wp('20%'),
    fontFamily: "Righteous-Regular",
    borderRadius: hp('1.1%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtnText: {
    marginTop: '-5%',
    fontSize: hp('2%'),
    fontFamily: "Righteous-Regular",
  }
});
