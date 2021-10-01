import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Linking,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  Drawer,
} from "@react-navigation/drawer";
import { useRoute } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

menuBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Title" subtitle={"Subtitle"} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  );
};

export default menuBar;
