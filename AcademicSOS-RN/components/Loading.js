import React, { useState, useEffect } from "react";
import { Modal, ActivityIndicator, View, StyleSheet } from "react-native";

export default function Loading() {
  const [animating, setAnimating] = useState(true);

  const closeActivityIndicator = () => setTimeout(() => setAnimating(false), 3000);

  useEffect(() => {
    closeActivityIndicator();
  }, []);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={animating}>
        <ActivityIndicator animating={animating} color="#FFFFFF" size="large" style={styles.activityIndicator} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
