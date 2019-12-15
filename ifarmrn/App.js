import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Platform,
  StatusBar
} from "react-native";
import "./src/configs/statusBarConfig";
import Router from "./src/routes";
import * as Font from "expo-font";
import { SplashScreen } from "expo";
import { Asset } from "expo-asset";
import { Color } from "./src/constants/routes";
import Loading from "./src/pages/loading/loading";
import Constants from "expo-constants";
import DropdownAlert from "react-native-dropdownalert";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { fontLoaded: false, isReady: false };
  }

  async componentDidMount() {
    this.fontLoad();
  }

  async fontLoad() {
    await Font.loadAsync({
      Comfortaa: require("./assets/fonts/Comfortaa-Medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  greenScreen = () => (
    <View style={[styles.container, { backgroundColor: "#4CAF50" }]}></View>
  );

  render() {
    if (this.state.fontLoaded) {
      return (
        <>
          <DropdownAlert
            panResponderEnabled
            closeInterval={1500}
            ref={ref => (global.dropDownAlertRef = ref)}
          />
          <Router />
        </>
      );
    } else {
      return this.greenScreen();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
