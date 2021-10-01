import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class updateInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>EV USER</Text>
        <TextInput
          style={styles.input}
          placeholder=" Username"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder=" Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
        <View style={styles.btnCont}>
          <TouchableOpacity style={styles.usrBtn}>
            <Text
              style={styles.btnTxt}
              onPress={this.CheckTextInputIsEmptyOrNot}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  CheckTextInputIsEmptyOrNot = () => {
    const { username } = this.state;
    const { password } = this.state;

    if (username == "" || password == "") {
      alert("Please enter Username or Password");
    } else {
      this.update();
    }
  };
  update = () => {
    fetch("http://192.168.10.10:5000/Updatepersonalinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success == true) {
          alert(res.message);
        } else {
          alert("Unsuccessful update.");
        }
      })
      .done();
  };
}

export default updateInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  welcome: {
    fontSize: 20,
    fontFamily: "serif",
    padding: 15,
    color: "#3b5389",
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 30,
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    padding: 20,
    marginTop: 10,
    borderRadius: 30,
    left: 115,
  },
  usrBtn: {
    backgroundColor: "white",
    padding: 13,
    width: "90%",
    borderRadius: 30,
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
    color: "#3b5389",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
});
