import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { SearchBar } from "react-native-elements";
import { db } from "../firebase";
import { LogBox } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GooglePlacesInput from "./googleplaces";
import { googleReverseGeocodeAsync } from "expo-location/build/LocationGoogleGeocoding";
LogBox.ignoreAllLogs();

class homeScreen extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    drloc: { latitude: 0, longitude: 0 },
    CancelUserLocation: null,
    Fare: null,
    showView: true,
  };
  componentDidMount() {
    this._getLocationAsync();
    this.AcceptedRequest();
  }

  _handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };
  _getLocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync();
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

    this.setState({
      CancelUserLocation: {
        latitude: 0,
        longitude: 0,
      },
    });
  };

  AcceptedRequest = () => {
    const doc = db.collection("Ride").doc("AjyOhLbcwWm2VIoSRnfB");
    const observer = doc.onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.data().Accept == true) {
          Alert.alert(
            "Alert",
            "Driver accept your ride request.",
            [
              {
                text: "OK",
                onPress: () => {
                  this.setState({ drloc: docSnapshot.data().driverlocation });
                },
              },
            ],
            { cancelable: false }
          );
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  CancelRequest = () => {
    let data = {
      Request: false,
      userlocation: this.state.CancelUserLocation,
      Accept: false,
      EndRide: true,
    };
    const req = db.collection("Ride");
    req.doc("AjyOhLbcwWm2VIoSRnfB").update(data);
    this.setState({ drloc: { latitude: 0, longitude: 0 } });
    this.setState({ showView: true });
  };

  SendRequest = () => {
    let data = {
      Request: true,
      userlocation: this.state.mapRegion,
    };
    const req = db.collection("Ride");
    req.doc("AjyOhLbcwWm2VIoSRnfB").update(data);
    this.setState({ showView: false });
  };

  EndRide = () => {
    const doc = db.collection("Ride").doc("AjyOhLbcwWm2VIoSRnfB");
    const observer = doc.onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.data().EndRide == true) {
          Alert.alert(
            "Alert",
            "Ride Completed.",
            [
              {
                text: "OK",
                onPress: () => {
                  this.setState({ Fare: docSnapshot.data().RideFare });
                  alert("Your Fare: " + this.state.Fare);
                  this.AddRide();
                },
              },
            ],
            { cancelable: false }
          );
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };
  AddRide = () => {
    fetch("http://192.168.10.10:5000/EndRide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
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
  render() {
    return (
      <View style={styles.container}>
        {this.state.mapRegion && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
            liteMode={false}
            pitchEnabled={true}
            zoomEnabled={true}
            minZoomLevel={1}
            showsUserLocation={true}
            showsTraffic={true}
            showsBuildings={true}
            showsMyLocationButton={true}
            scrollEnabled={false}
          >
            <Marker
              coordinate={this.state.mapRegion}
              title="My Location"
              tracksViewChanges={false}
            >
              <MaterialIcon name="map-marker" size={30} color={"green"} />
            </Marker>
            <Marker
              coordinate={this.state.drloc}
              title="Driver Location"
              tracksViewChanges={false}
            >
              <Image
                source={require("../assets/car_marker.png")}
                style={{ width: 50, height: 40 }}
              />
            </Marker>
          </MapView>
        )}
        <GooglePlacesInput />
        <View style={styles.btnCont}>
          {this.state.showView ? (
            <TouchableOpacity onPress={this.SendRequest} style={styles.usrBtn}>
              <Text style={styles.btnTxt}>Request Ride</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.CancelRequest}
              style={styles.usrBtn}
            >
              <Text style={styles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
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
    width: "45%",
    borderRadius: 39,
    marginTop: "150%",
    position: "relative",
    justifyContent: "flex-end",
  },
  usrBtn1: {
    alignItems: "center",
    fontSize: 30,
    color: "black",
  },
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  reqbtn: {
    backgroundColor: "blue",
    padding: 15,
    width: "45%",
    borderRadius: 39,
    marginTop: 30,
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});

export default homeScreen;
