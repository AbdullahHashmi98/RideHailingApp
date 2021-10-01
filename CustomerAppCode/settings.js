import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

class settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            //  top: -98,
            bottom: 120,
          }}
        >
          <LottieView
            source={require("../assets/57946-profile-user-card.json")}
            autoPlay
            style={{ height: 300, backgroundColor: "transparent" }}
          />
          <Text style={{ fontSize: 33, color: "#3b5389" }}>PROFILE UPDATE</Text>
          <View style={styles.btnCont}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("UpdateInfo");
              }}
              style={styles.usrBtn}
            >
              <Text style={{ color: "#4691B9" }}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("My Profile");
              }}
              style={styles.usrBtn}
            >
              <Text style={{ color: "#4691B9" }}>Go to Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    left: 16,
    top: 27,
  },
  usrBtn: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 39,
    marginTop: 30,
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
    tintColor: "#4691B9",
  },
});

export default settings;
