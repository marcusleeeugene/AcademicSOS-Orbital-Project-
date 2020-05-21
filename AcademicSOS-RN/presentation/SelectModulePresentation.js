import React from 'react';
import { useFonts } from '@use-expo/font';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { FlatGrid } from 'react-native-super-grid';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BreadCrumb from './BreadCrumb.js';

export default function SelectModulePresentation() {

  let [fontsLoaded] = useFonts({
    'SonsieOne-Regular': require('../assets/fonts/SonsieOne-Regular.ttf'),
    'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
  });

  const modules = [
      { name: 'CS1101S', code: '#90CAF9'}, { name: 'CS1231S', code: '#FFF59D'},
      { name: 'MA1101R', code: '#A5D6A7'}, { name: 'ES1103', code: '#FFAB91'},
      { name: 'NM3221', code: '#B39DDB'}, { name: 'GEQ1917', code: '#80CBC4'},
    ];

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb/>
        <View style = {styles.body}>
          <Text style = {styles.title}> Select a module </Text>
          <FlatGrid
            itemDimension = {130}
            items = {modules}
            style = {styles.gridView}
            renderItem = {({item}) => (
              <View style = {[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style = {styles.itemName}> {item.name} </Text>
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
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: hp('2.5%'),
    textAlign: "center",
    height: hp('9%'),
    fontFamily: "Righteous-Regular",
  },
});
