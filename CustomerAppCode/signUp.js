import React, { setState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeProvider } from "@react-navigation/native";

export default class signUp extends Component {
  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      alert("Email is Not Correct");
      this.setState({ email: text });
      return false;
    } else {
      this.setState({ email: text });
      return true;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#3b5389", "#3b5998", "#192f6a"]}
          style={styles.container}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Text style={styles.welcome}>SIGN UP</Text>
          <TextInput
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.f_name}
            placeholder="  UserName"
          />
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            placeholder="  Email"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            placeholder="  Password"
            secureTextEntry
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={(confirm_pass) => this.setState({ confirm_pass })}
            value={this.state.confirm_pass}
            placeholder="Confirm Password"
            secureTextEntry
          /> */}
          <TextInput
            style={styles.input}
            onChangeText={(phono_no) => this.setState({ phono_no })}
            value={this.state.phono_no}
            placeholder="  Phone No"
            keyboardType="numeric"
          />
          <View style={styles.btnCont}>
            <TouchableOpacity
              onPress={this.CheckTextInputIsEmptyOrNot}
              style={styles.usrBtn}
            >
              <Text style={styles.btnTxt}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      phono_no: "",
      email: "",
    };
  }

  CheckTextInputIsEmptyOrNot = () => {
    const { username } = this.state;
    const { password } = this.state;
    const { phone_no } = this.state;
    const { email } = this.state;

    if (username == "" || password == "" || phone_no == "" || email == "") {
      alert("Required field is empty.");
    } else {
      let validation = this.validate(this.state.email);
      if (validation === true) {
        this.signup();
      } else {
        console.log("Invalid Syntax");
      }
    }
  };

  signup = () => {
    fetch("http://192.168.10.10:5000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        phone_no: this.state.phone_no,
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success == true) {
          this.props.navigation.navigate("Login");
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
    fontSize: 28,
    fontFamily: "serif",
    padding: 15,
    color: "white",
  },
  signupTextcon: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "#12799f",
    fontSize: 16,
  },
  signupBtn: {
    color: "#12799f",
    fontSize: 16,
    fontWeight: "500",
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
    color: "black",
  },
});
