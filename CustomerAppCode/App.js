import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  LogBox,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerIcon,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import login from "./screens/Login";
import home from "./screens/homeScreen";
import Signup from "./screens/signUp";
import Profile from "./drawer/userProfile";
import splashScreen from "./screens/splashScreen";
import UpdateInfo from "./screens/updateInfo";
import My_Rides from "./drawer/myRides";
import Payment from "./drawer/user_Payment";
import Settings from "./drawer/settings";
import MenuBar from "./pages/menuBar";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
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
          options={{ headerShown: false, hideStatusBar: false }}
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
          component={Signup}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Home"
          component={home}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="UpdateInfo"
          component={UpdateInfo}
        />
      </Stack.Navigator>
    );
    return (
      <NavigationContainer>
        <Drawer.Navigator
          edgeWidth={-1}
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
                <MaterialIcons
                  reverse
                  name="account-outline"
                  style={{ fontSize: 23 }}
                />
              ),
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="My Profile"
            component={Profile}
          />
          <Drawer.Screen
            options={{
              drawerIcon: () => (
                <Icon name="create-outline" style={{ fontSize: 23 }} />
              ),
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="My Rides"
            component={My_Rides}
          />
          <Drawer.Screen
            options={{
              drawerIcon: () => <Icon name="cash" style={{ fontSize: 23 }} />,
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#3b5389",
            }}
            name="Payment"
            component={Payment}
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
            component={Settings}
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
  topDrawer: {
    top: 20,
    marginTop: 15,
    borderTopWidth: 2,
  },
});
