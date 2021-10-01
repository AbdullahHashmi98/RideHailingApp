import React, { setState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.container}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Image
            source={require("../assets/account.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.welcome}>ACCOUNT</Text>
          <TextInput
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.btnCont}>
            <TouchableOpacity
              onPress={this.CheckTextInputIsEmptyOrNot}
              style={styles.usrBtn}
            >
              <Text style={styles.btnTxt}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Signup");
              }}
              style={styles.usrBtn}
            >
              <Text style={styles.btnTxt}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
      this.login();
    }
  };

  login = () => {
    fetch("http://192.168.10.10:4000/login", {
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
          global.CurrentDriver_id = res.driver_id;
          this.props.navigation.navigate("Home");
        } else {
          alert(res.message);
        }
      })
      .done();
  };
}
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
    color: "white",
  },
  signupTextcon: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    flexDirection: "row",
    marginBottom: 17,
  },
  signupText: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  signupBtn: {
    color: "#12799f",
    fontSize: 20,
    alignItems: "center",
    padding: 15,
    width: "90%",
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 15,
    borderRadius: 30,
  },
  usrBtn: {
    backgroundColor: "white",
    padding: 15,
    width: "45%",
    borderRadius: 39,
    marginTop: 30,
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Login;
