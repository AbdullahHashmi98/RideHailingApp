import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

Earnings = () => {
  const route = useRoute();
  console.log(route);
  const [EarningData, setData] = useState(null);
  useEffect(() => {
    fetch("http://192.168.10.10:4000/myearnings")
      .then((response) => response.json())
      .then((EarningData) => setData(EarningData));
  }, []);
  return (
    <View style={styles.container}>
      {EarningData ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            top: -245,
            left: 40,
          }}
        >
          <Icon name="wallet-outline" size={34} color={"#3b5389"} />
          <Text style={styles.usrBtn}>{"EARNING"}</Text>
          <Text style={styles.EarnText}>{"RS." + EarningData.myearnings}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  usrBtn: {
    fontSize: 25,
    alignItems: "center",
    right: -23,
    color: "#4c669f",
  },
  EarnText: {
    fontSize: 20,
    alignItems: "center",
    flexDirection: "column",
    top: 45,
    left: -102,
    borderBottomColor: "#ebe6e6",
    borderBottomWidth: 1,
    width: 300,
    color: "#4691B9",
  },
});

export default Earnings;
