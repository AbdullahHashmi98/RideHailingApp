import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import * as Font from "expo-font";
import { useRoute } from "@react-navigation/native";

class splashScreen extends Component {
  state = {
    fontsLoaded: false,
  };
  async loadFonts() {
    await Font.loadAsync({
      ArchitectsDaughter: require("../assets/fonts/ArchitectsDaughter-Regular.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.loadFonts();
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 5000);
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <LinearGradient
            colors={["#3b5389", "#3b5998", "#192f6a"]}
            style={styles.container}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <LottieView
              source={require("../assets/icons/electric-car.json")}
              autoPlay
              style={styles.lottieView}
            />
            <Text style={styles.input}>EV DRIVER</Text>
          </LinearGradient>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default splashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  lottieView: {
    height: 300,
    backgroundColor: "transparent",
  },
  input: {
    top: -45,
    fontSize: 69,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textShadowRadius: 9.0,
    textShadowColor: "white",
    fontFamily: "ArchitectsDaughter",
  },
});
