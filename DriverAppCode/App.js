import "react-native-gesture-handler";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import CarDetails from "./drawer/Car_Detail";
import Earnings from "./drawer/Earnings";
import myRides from "./drawer/MyRides";
import settings from "./drawer/Settings";
import UpdateInfo from "./screens/updateInfo";
import UpdateCar from "./screens/updateCar";
import login from "./screens/Login";
import signup from "./screens/Signup";
import splashScreen from "./screens/splashScreen";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawer(props) {
  const logOut = () => {
    props.navigation.navigate("Login");
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <Icon name="log-out-outline" size={23} />}
        label="Sign out"
        // onPress={
        //   (() => props.navigation.navigate("Login"))
        // }
        onPress={logOut}
        style={styles.bottomDrawer}
      />
    </DrawerContentScrollView>
  );
}

export default class App extends React.Component {
  render() {
    createHomeStack = () => (
      <Stack.Navigator
        initialRouteName="     Home"
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="md-menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={35}
              padding={25}
            />
          ),
          headerTitleAlign: "center",
          headerBackground: () => (
            <LinearGradient
              colors={["#2f4878", "#1b3f82"]}
              style={styles.container}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
            />
          ),
          headerTitleStyle: { color: "#fff" },
        })}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={splashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={signup}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UpdateInfo"
          component={UpdateInfo}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UpdateCar"
          component={UpdateCar}
        />
      </Stack.Navigator>
    );

    return (
      <NavigationContainer>
        <Drawer.Navigator
          edgeWidth={-1}
          initialRouteName="Home"
          drawerStyle={{
            backgroundColor: "white",
            width: 240,
          }}
          drawerContentOptions={{
            activeTintColor: "#4691B9",
            itemStyle: { marginVertical: 15 },
          }}
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen
            options={{
              hideStatusBar: false,
              drawerIcon: () => <Icon name="home" style={{ fontSize: 23 }} />,
            }}
            name="Home"
            children={createHomeStack}
          />
          <Drawer.Screen
            options={{
              drawerIcon: () => (
                <MaterialIcons name="car-electric" style={{ fontSize: 23 }} />
              ),
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="Car Details"
            component={CarDetails}
          />
          <Drawer.Screen
            options={{
              drawerIcon: () => <Icon name="cash" style={{ fontSize: 23 }} />,
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="Earnings"
            component={Earnings}
          />
          <Drawer.Screen
            options={{
              drawerIcon: () => (
                <Icon name="reader-outline" style={{ fontSize: 23 }} />
              ),
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="My Rides"
            component={myRides}
          />
          <Drawer.Screen
            options={{
              drawerIcon: () => (
                <Icon name="settings" style={{ fontSize: 23 }} />
              ),
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="Settings"
            component={settings}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomDrawer: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
