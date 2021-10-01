import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

user_Payment = () => {
  const route = useRoute();
  console.log(route);
  const [PaymentData, setData] = useState(null);
  useEffect(() => {
    fetch("http://192.168.10.10:5000/myrides")
      .then((response) => response.json())
      .then((PaymentData) => setData(PaymentData));
  }, []);

  const Item = ({ Ride_Id, Fare }) => (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          left: -32,
          top: 10,
        }}
      >
        <MaterialIcon name="car-side" size={28} color={"#1b3f82"} />
        <Text style={styles.title}> {"Ride Id: " + Ride_Id}</Text>
      </View>
      <Text
        style={{
          flexDirection: "row",
          fontSize: 25,
          color: "#4691B9",
          alignItems: "center",
          left: 55,
        }}
      >
        {"Fare: PKR " + Fare}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item Ride_Id={item.Ride_Id} Fare={item.Fare} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.MainContainer}>
        <FlatList
          data={PaymentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.Ride_Id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
  },
  item: {
    marginBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#ebe6e6",
    paddingBottom: 4,
    width: 320,
    padding: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },

  title: {
    fontSize: 28,
    color: "#1b3f82",
    alignItems: "center",
    left: 21,
    top: -11,
    paddingBottom: 7,
    right: 12,
  },
});

export default user_Payment;
