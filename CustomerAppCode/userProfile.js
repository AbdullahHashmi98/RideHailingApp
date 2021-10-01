import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Badge, Divider } from "react-native-elements";
import { useColorScheme } from "react-native-appearance";
import Icon from "react-native-vector-icons/Ionicons";

userProfile = () => {
  const route = useRoute();
  console.log(route);
  const [userData, setData] = useState(null);
  useEffect(() => {
    fetch("http://192.168.10.10:5000/user_details")
      .then((response) => response.json())
      .then((userData) => setData(userData));
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          top: -78,
        }}
      >
        {/*  <Avatar
          rounded
          source={require("../assets/profile.jpg")}
          size="xlarge"
          containerStyle={{ alignContent: "center", top: -17 }}
        /> */}
        <Icon name="person-circle-outline" size={170} color={"#3b5389"} />
        <Text style={styles.welcome}>USER/RIDER</Text>
      </View>
      {userData ? (
        <View style={styles.ctn}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              left: -104,
              top: -45,
            }}
          >
            <MaterialIcons
              name="account-box-outline"
              size={30}
              color={"#1b3f82"}
            />
            <Text style={styles.usrBtn}> Username</Text>
          </View>
          <Text
            style={{
              width: 311,
              paddingBottom: 4,
              marginTop: -39,
              alignSelf: "auto",
              fontSize: 18,
              color: "#4691B9",
              borderBottomWidth: 1,
              borderBottomColor: "#ebe6e6",
            }}
          >
            {userData.username}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              left: -121,
              top: 12,
            }}
          >
            <Icon name="mail-open-outline" size={30} color={"#1b3f82"} />
            <Text style={styles.usrBtn}> Email</Text>
          </View>

          <Text
            style={{
              width: 311,
              paddingBottom: 4,
              marginTop: 15,
              alignSelf: "auto",
              fontSize: 18,
              color: "#4691B9",
              borderBottomWidth: 1,
              borderBottomColor: "#ebe6e6",
            }}
          >
            {userData.email}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              left: -119,
              top: 17,
            }}
          >
            <Icon name="call-outline" size={30} color={"#1b3f82"} />
            <Text style={styles.usrBtn}> Phone</Text>
          </View>

          <Text
            style={{
              width: 311,
              paddingBottom: 4,
              marginTop: 20,
              alignSelf: "auto",
              fontSize: 18,
              color: "#4691B9",
              borderBottomWidth: 1,
              borderBottomColor: "#ebe6e6",
            }}
          >
            number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              left: -105,
              top: 12,
            }}
          >
            <Icon name="person-outline" size={30} color={"#1b3f82"} />
            <Text style={styles.usrBtn}> User Type</Text>
          </View>

          <Text style={styles.usrBtn1}>Rider</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 23,
    fontFamily: "serif",
    textAlign: "center",
    top: -12,
    color: "#1b3f82",
  },
  ctn: {
    marginBottom: 13,
  },
  usrBtn: {
    fontSize: 18,
    alignItems: "center",
    color: "#1b3f82",
  },
  usrBtn1: {
    width: 311,
    paddingBottom: 4,
    marginTop: 20,
    alignSelf: "center",
    fontSize: 18,
    color: "#4691B9",
    borderBottomWidth: 1,
    borderBottomColor: "#ebe6e6",
  },
});

export default userProfile;
