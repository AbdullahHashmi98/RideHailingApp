import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

myRides = () => {
  const route = useRoute();
  console.log(route);
  const [RideData, setData] = useState(null);
  useEffect(() => {
    fetch("http://192.168.10.10:5000/myrides")
      .then((response) => response.json())
      .then((RideData) => setData(RideData));
  }, []);
  const Item = ({ Fare, Time, Location }) => (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          width: 320,
          paddingBottom: 4,
        }}
      >
        <Text style={styles.title}>{"Date/Time: " + Time}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: 320,
          paddingBottom: 4,
          marginTop: 20,
        }}
      >
        <Text style={styles.title}>{"Fare:  PKR " + Fare}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>{"Location: " + Location}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item Fare={item.Fare} Time={item.Time} Location={item.Location} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.MainContainer}>
        <FlatList
          data={RideData}
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
    borderBottomWidth: 1,
    borderBottomColor: "#ebe6e6",
    paddingBottom: 4,
  },

  title: {
    fontSize: 25,
    color: "#4691B9",
    left: 5,
  },
});

export default myRides;
