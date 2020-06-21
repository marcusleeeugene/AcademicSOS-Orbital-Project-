import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ScanFB from "../firebase/ScanFireBase.js";

export default function ScanScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [valid, setValid] = useState(false);
  const { qrCode, userID, bookingId, consultDetails} = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (qrCode == data) {
      setValid(true);
      setScanned(true);

      for (var user in consultDetails.participants) {
        if (userID == user.id) {
          user.attending = true;
          console.log(user.attending);
        }
      }
      ScanFB.updateAttendance(consultDetails, bookingId).then((rsl) =>{
        navigation.navigate("Home"); //go back Home screen, need to disable confirmed slot(onPress becomes null) in Manage Bookings
        alert(`Valid QR Code with link ${data} has been scanned!`);
      });
    } else {
      alert("Invalid Consult QR Code!!!");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />

      {!valid && <Button title={"Tap to Return"} onPress={() => navigation.goBack()} />}
    </View>
  );
}
