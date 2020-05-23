import React from 'react';
import { useFonts } from '@use-expo/font';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BreadCrumb from "../components/BreadCrumb";

export default function PublicConsultScreen() {

  let [fontsLoaded] = useFonts({
    'SonsieOne-Regular': require('../assets/fonts/SonsieOne-Regular.ttf'),
    'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
  });

  const consultations = [
      { name: 'CS1101S', ta: "John Tan", remarks: "Recursion problems", date: "21 - Jun - 20", time: "11.00 AM", color: '#90CAF9', type: 'approved'},
      { name: 'MA1101R', ta: "Peter Lee", remarks: "How to gaussian eliminate", date: "21 - Jun - 20", time: "11.00 AM", color: '#A5D6A7', type: 'approved'},
      { name: 'ES1601', ta: "Mary Koh", remarks: "Verbs and adjectives", date: "21 - Jun - 20", time: "11.00 AM", color: '#FFAB91', type: 'approved'},
      { name: 'NM3221', ta: "Bob Tan", remarks: "Verbs and adjectives", date: "21 - Jun - 20", time: "11.00 AM", color: '#B39DDB', type: 'pending'}
    ];

  let consultationsJSX = []
  for (var i = 0; i < consultations.length; i++) {
    consultationsJSX.push(
      <View style = {styles.moduleRow}>
        <View style = {styles.dateTime}>
          <Text style = {styles.dateTime_Text}> {consultations[i].date} </Text>
          <Text style = {styles.dateTime_Text}> {consultations[i].time} </Text>
        </View>
      <TouchableOpacity style = {[styles.moduleContainer, {backgroundColor: consultations[i].color}]}>
        <Text style = {styles.consultationInfoMod}> {consultations[i].name} </Text>
        <Text style = {styles.consultationInfo}> TA: {consultations[i].ta} </Text>
        <Text style = {styles.consultationInfo}> Remarks: {consultations[i].remarks} </Text>
      </TouchableOpacity>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb/>
        <View style = {styles.body}>
          <Text style = {styles.title}> Public Consultation </Text>
          <View style = {styles.filter}>
            <TouchableOpacity style = {styles.filterBtn}>
              <Text style = {styles.filter_text}> Status <Image style={styles.chevron} source={require("../assets/images/chevron.png")}/></Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.filterBtn}>
              <Text style = {styles.filter_text}> Date <Image style={styles.chevron} source={require("../assets/images/chevron.png")}/></Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.filterBtn}>
              <Text style = {styles.filter_text}> Time <Image style={styles.chevron} source={require("../assets/images/chevron.png")}/></Text>
            </TouchableOpacity>
          </View>
          <ScrollView style = {styles.moduleView}>
            {consultationsJSX}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#003D7C'
  },
  title: {
    fontSize: hp('3.5%'),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF"
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('6%'),
    marginTop: '5%'
  },
  filterBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    height: hp("3.5%"),
    width: wp("25%"),
  },
  filter_text: {
    fontSize: hp("1.5%"),
    height: hp('2%'),
    fontFamily: "Righteous-Regular",
    textAlign: 'center'
  },
  chevron: {
    transform: [{ rotate: '90deg' }],
    height: hp("4%"),
    width: wp("2%"),
    resizeMode: "contain",
  },
  consultations: {
    marginTop: '5%',
    flexDirection: 'column'
  },
  moduleView: {
    marginTop: '10%'
  },
  moduleRow: {
    flexDirection: 'row'
  },
  moduleContainer: {
    borderRadius: hp("1.1%"),
    height: hp('10%'),
    width: wp('100%'),
    backgroundColor: "#FFFFFF",
    marginBottom: '3%'
  },
  dateTime: {
    flexDirection: 'column',
    marginTop: '3%'
  },
  dateTime_Text: {
    fontSize: hp('2%'),
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    textAlign: 'center',
    paddingHorizontal: wp('4%')
  },
  consultationInfoMod: {
    fontSize: hp('2%'),
    fontFamily: "Righteous-Regular",
  },
  consultationInfo: {
    fontSize: hp('1.5%'),
    fontFamily: "Righteous-Regular",
  }
});
