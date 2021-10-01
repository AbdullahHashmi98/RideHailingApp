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

class updateCar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>EV CAR INFO UPDATE</Text>
        <TextInput
          style={styles.input}
          placeholder="Car name"
          onChangeText={(carname) => this.setState({ carname })}
          value={this.state.carname}
        />
        <TextInput
          style={styles.input}
          placeholder="Car Model"
          onChangeText={(carmodel) => this.setState({ carmodel })}
          value={this.state.carmodel}
        />
        <TextInput
          style={styles.input}
          placeholder="Car Color"
          onChangeText={(carcolor) => this.setState({ carcolor })}
          value={this.state.carcolor}
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
    this.state = { carname: "", carmodel: "", carcolor: "" };
  }
  CheckTextInputIsEmptyOrNot = () => {
    const { carname } = this.state;
    const { carmodel } = this.state;
    const { carcolor } = this.state;

    if (carname == "" || carmodel == "" || carcolor == "") {
      alert("Please fill all fields.");
    } else {
      this.update();
    }
  };

  update = () => {
    fetch("http://192.168.10.10:4000/updatecarinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carname: this.state.carname,
        carmodel: this.state.carmodel,
        carcolor: this.state.carcolor,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success == true) {
          alert(res.message);
          this.setState({ carname: "" });
          this.setState({ carmodel: "" });
          this.setState({ carcolor: "" });
        } else {
          alert("Unsuccessful update.");
        }
      })
      .done();
  };
}

export default updateCar;

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
