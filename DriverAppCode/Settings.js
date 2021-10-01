import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

class Settings extends Component {
  /* const route = useRoute();
  console.log(route);
  const [Data, setData] = useState(null);
  useEffect(() => {
    fetch("http://192.168.0.8:4000/myinfo")
      .then((response) => response.json())
      .then((Data) => setData(Data));
  }, []); */
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            top: -78,
            left: -123,
            // borderBottomColor: "black",
            // borderBottomWidth: 1,
            // width: 699,
          }}
        >
          {/* <Icon name="person-circle-outline" size={120} color={"#3b5389"} /> */}
        </View>
        {/*  {Data ? (
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.usrBtn1}>{Data.Username}</Text>
          <Text style={styles.usrBtn1}>{Data.phoneno}</Text>
          <Text style={styles.usrBtn1}>{Data.Emailid}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )} */}
        <TouchableOpacity
          style={styles.usrBtn}
          onPress={() => {
            this.props.navigation.navigate("UpdateInfo");
          }}
        >
          <Text style={styles.btnTxt}>Update Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.usrBtn}
          onPress={() => {
            this.props.navigation.navigate("UpdateCar");
          }}
        >
          <Text style={styles.btnTxt}>Update Car Info</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  welcome: {
    fontSize: 23,
    fontFamily: "serif",
    textAlign: "center",
    top: -12,
    color: "#1b3f82",
  },
  btnCont: {
    flexDirection: "column",
    width: "90%",
    padding: 35,
    borderRadius: 34,
    marginBottom: 15,
    borderRadius: 30,
  },
  usrBtn: {
    fontSize: 25,
    alignItems: "center",
    padding: 29,
    color: "blue",
    alignContent: "center",
    marginTop: 10,
    justifyContent: "center",
    top: -150,
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#4691B9",
    width: 300,
  },
  btnTxt: {
    fontSize: 23,
    textAlign: "center",
  },
  usrBtn1: {
    fontSize: 23,
    left: 57,
    top: -194,
  },
});

export default Settings;
