import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../presentation/HomeScreen.js";
import LoginScreen from "../presentation/LoginScreen.js";
import PriorityPointScreen from "../presentation/PriorityPointScreen.js";
import BookConsultScreen from "../presentation/BookConsultScreen.js";
import PublicConsultScreen from "../presentation/PublicConsultScreen.js";
import ManageBookingScreen from "../presentation/ManageBookingScreen.js";
import CreateConsultScreen from "../presentation/CreateConsultScreen.js";
import SelectModuleScreen from "../presentation/SelectModuleScreen.js";
import PendingScreen from "../presentation/PendingScreen.js";
import ConfirmedScreen from "../presentation/ConfirmedScreen.js";

import StudentPendingScreen from "../presentation/StudentPendingScreen.js";

import ScanScreen from "../presentation/ScanScreen.js";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Select Module" component={SelectModuleScreen} />
        <Stack.Screen name="Book" component={BookConsultScreen} />
        <Stack.Screen name="Public Consultation" component={PublicConsultScreen} />
        <Stack.Screen name="Priority Points" component={PriorityPointScreen} />
        <Stack.Screen name="Manage Bookings" component={ManageBookingScreen} />
        <Stack.Screen name="Create Consultation" component={CreateConsultScreen} />
        <Stack.Screen name="Pending" component={PendingScreen} />
        <Stack.Screen name="Confirmed" component={ConfirmedScreen} />

        <Stack.Screen name="Student Pending" component={StudentPendingScreen} />

        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
