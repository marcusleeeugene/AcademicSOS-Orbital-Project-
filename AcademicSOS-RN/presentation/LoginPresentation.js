import React from 'react';
import { useFonts } from '@use-expo/font';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AppLoading } from 'expo';

export default function LoginPresentation() {

  let [fontsLoaded] = useFonts({
    'SonsieOne-Regular': require('../assets/fonts/SonsieOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style = {styles.container}>
        <Text style = {styles.font}>AcademicSOS</Text>
        <Image style = {styles.nusLogo} source={require('../images/NUS_logo_full-horizontal.jpg')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  font: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "SonsieOne-Regular"
  }


});
