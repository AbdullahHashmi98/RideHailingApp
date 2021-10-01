import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

Car_Details = () => {
  const route = useRoute();
  console.log(route);
  const [CarData, setData] = useState(null);
  useEffect(() => {
    fetch("http://192.168.10.10:4000/car_details")
      .then((response) => response.json())
      .then((CarData) => setData(CarData));
  }, []);
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/speed.png")}
        style={{ width: 200, height: 200 }}
      /> */}
      <LottieView
        source={require("../assets/icons/car.json")}
        autoPlay
        style={styles.lottieView}
      />
      {CarData ? (
        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            top: 20,
            left: 26,
          }}
        >
          <Text style={styles.usrBtn1}>Car Name</Text>
          <Text style={styles.usrBtn}>{CarData.CarName}</Text>
          <Text style={styles.usrBtn1}>Car Model</Text>
          <Text style={styles.usrBtn}>{CarData.CarModel}</Text>
          <Text style={styles.usrBtn1}>Car Color</Text>
          <Text style={styles.usrBtn}>{CarData.CarColor}</Text>
          <Text style={styles.usrBtn1}>Battery Status</Text>
          <Text style={styles.usrBtn}>{CarData.battery_charge + "%"}</Text>
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
    width: "100%",
    backgroundColor: "white",
  },
  lottieView: {
    height: 250,
    backgroundColor: "transparent",
  },
  usrBtn: {
    fontSize: 19,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    width: 311,
    borderBottomColor: "#f4f4f4",
    color: "#4691B9",
    paddingBottom: 4,
  },
  usrBtn1: {
    fontSize: 22,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 3,
    color: "#1b3f82",
    marginTop: 5,
  },
});

export default Car_Details;
