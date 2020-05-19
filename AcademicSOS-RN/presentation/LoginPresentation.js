import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function LoginPresentation() {
  props => {
    let [fontsLoaded] = useFonts({
      'SonsieOne-Regular': require('../assets/fonts/SonsieOne-Regular.ttf'),
    });
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.font}>AcademicSOS</Text>
      <Image style = {styles.nusLogo} source={require('../images/NUS_logo_full-horizontal.jpg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  font: {
    fontSize: 50,
    textAlign: "center",
    margin: 10,
    fontFamily: "SonsieOne-Regular"
  }


});
