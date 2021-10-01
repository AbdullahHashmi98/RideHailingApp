import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";

class GooglePlacesInput extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          minLength={2}
          listViewDisplayed={false}
          currentLocation={true}
          currentLocationLabel="Current Location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyCxMzZpnVqP04Ih7IURQweCrnL23VMmcfI",
            language: "en",
          }}
          debounce={200}
          nearbyPlacesAPI="GooglePlacesSearch"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
});

export default GooglePlacesInput;
