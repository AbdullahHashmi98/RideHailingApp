import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { db } from "../firebase";
import { Value } from "react-native-reanimated";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Entypo";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

class home extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    usrloc: { latitude: 0, longitude: 0 },
    curr_min: null,
    final_min: null,
    ride_time: null,
    fare: null,
    ride_loc: null,
    time: null,
    startride: false,
    endride: false,
  };

  componentDidMount() {
    this._getLocationAsync();
    this.GetRequest();
  }

  _handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };
  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }
    let location = await Location.getLastKnownPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    this.setState({ locationResult: JSON.stringify(location) });

    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta:
          0.009 *
          (Dimensions.get("window").width / Dimensions.get("window").height),
        longitudeDelta:
          0.009 *
          (Dimensions.get("window").width / Dimensions.get("window").height),
      },
    });
  };

  GetCurrentTime = () => {
    var date = new Date();
    this.setState({ curr_min: date.getMinutes() });
  };

  GetFinalTime = () => {
    var date = new Date();
    this.setState({ final_min: date.getMinutes() });
    this.EndRide();
  };

  GetRequest = () => {
    const doc = db.collection("Ride").doc("AjyOhLbcwWm2VIoSRnfB");
    const observer = doc.onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.data().Request == true) {
          Alert.alert(
            "Alert",
            "You have a ride request.",
            [
              {
                text: "Cancel",
                onPress: () => this.CancelRide(),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  this.setState({ usrloc: docSnapshot.data().userlocation }),
                    this.AcceptRide();
                },
              },
            ],
            { cancelable: true }
          );
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  EndRide = () => {
    const reached_min = this.state.final_min - this.state.curr_min;
    this.setState({ ride_time: reached_min });
    this.setState({ fare: Math.abs(this.state.ride_time * 1) });

    Alert.alert(
      "Payment",
      "Ride payment is : " + this.state.fare,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: true }
    );

    let data = {
      Request: false,
      driverlocation: { latitude: 0, longitude: 0 },
      Accept: false,
      RideFare: this.state.fare,
      EndRide: true,
    };
    const req = db.collection("Ride");
    req.doc("AjyOhLbcwWm2VIoSRnfB").update(data);
    this.setState({ usrloc: { latitude: 0, longitude: 0 } });
    this.AddRide();
    this.setState({ endride: false, startride: false });
  };

  AddRide = () => {
    const date = new Date();
    this.setState({ ride_loc: this.state.locationResult });
    this.setState({ time: date.getDate() });
    fetch("http://192.168.10.10:4000/EndRide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ride_loc: this.state.ride_loc,
        time: this.state.time,
        fare: this.state.fare,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success == true) {
          alert("Ride Complete.");
        } else {
          alert(res.message);
        }
      })
      .done();
  };

  AcceptRide = () => {
    let data = {
      Request: false,
      driverlocation: this.state.mapRegion,
      Accept: true,
      EndRide: false,
    };
    const req = db.collection("Ride");
    req.doc("AjyOhLbcwWm2VIoSRnfB").update(data);
    this.setState({ startride: true });
  };

  CancelRide = () => {
    let data = {
      Request: false,
      driverlocation: { latitude: 0, longitude: 0 },
      Accept: false,
      EndRide: true,
    };
    const req = db.collection("Ride");
    req.doc("AjyOhLbcwWm2VIoSRnfB").update(data);
    this.setState({ usrloc: { latitude: 0, longitude: 0 } });
    LogBox.ignoreAllLogs(["Setting a timer"]);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.mapRegion && (
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
            zoomEnabled={true}
            scrollEnabled={false}
            showsUserLocation={true}
            showsTraffic={true}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            <Marker
              coordinate={this.state.mapRegion}
              title="My Location"
              tracksViewChanges={false}
            >
              <MaterialIcon name="map-marker" size={30} color={"green"} />
            </Marker>
            <Marker
              coordinate={this.state.usrloc}
              title="User Location"
              tracksViewChanges={false}
            >
              {/*  <Image
                source={require("../assets/car_marker.png")}
                style={{ width: 50, height: 50 }}
              /> */}
            </Marker>
          </MapView>
        )}
        <View style={styles.btnCont}>
          {this.state.startride ? (
            <TouchableOpacity
              style={styles.usrbTn}
              onPress={() => {
                this.GetCurrentTime();
                this.setState({ startride: false, endride: true });
              }}
            >
              <Text style={styles.btnTxt}>Start ride</Text>
            </TouchableOpacity>
          ) : this.state.endride ? (
            <TouchableOpacity
              style={styles.usrBtn}
              onPress={() => {
                this.GetFinalTime();
                this.setState({ startride: false, endride: false });
              }}
            >
              <Text style={styles.btnTxt}>End ride</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.usrBtn}>
              <Text style={styles.btnTxt}>No Ride Yet</Text>
            </View>
          )}
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
  usrBtn: {
    backgroundColor: "#a7d455",
    padding: 15,
    width: "40%",
    borderRadius: 39,
    marginTop: "150%",
    position: "relative",
    justifyContent: "flex-end",
    marginRight: "30%",
  },
  usrbTn: {
    backgroundColor: "#a7d455",
    padding: 15,
    width: "40%",
    borderRadius: 39,
    marginTop: "150%",
    position: "relative",
    justifyContent: "flex-end",
    marginLeft: "-15%",
  },
  usrBtn1: {
    alignItems: "center",
    fontSize: 30,
    color: "black",
  },
  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginLeft: 170,
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default home;
