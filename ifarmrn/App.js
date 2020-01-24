import React from "react";
import { StyleSheet } from "react-native";

import * as Font from "expo-font";
import { SplashScreen } from "expo";
import DropdownAlert from "react-native-dropdownalert";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import Router from "./src/routes";
import Loading from "./src/pages/loading/loading";
import { store, persistor } from "./src/store";
import "./src/configs/statusBarConfig";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

global.x = {
  aInternal: 0,

  aListener: function(val) {},

  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },

  get a() {
    return this.aInternal;
  },

  registerListener: function(listener) {
    this.aListener = listener;
  }
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow"
  }
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { fontLoaded: false, isReady: false };
  }

  async componentDidMount() {
    SplashScreen.preventAutoHide(); // Instruct SplashScreen not to hide yet
    this.fontLoad();
  }

  async fontLoad() {
    await Font.loadAsync({
      Comfortaa: require("./assets/fonts/Comfortaa-Medium.ttf"),
      Serif: require("./assets/fonts/InriaSerif-Regular.ttf")
    });

    setTimeout(() => {
      this.setState({ fontLoaded: true });
    }, 200);
  }

  render() {
    const { fontLoaded } = this.state;

    if (!fontLoaded) return <Loading />;

    return (
      <>
        <DropdownAlert
          panResponderEnabled
          closeInterval={1500}
          ref={ref => (global.dropDownAlertRef = ref)}
        />
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <PaperProvider theme={theme}>
              <Router />
            </PaperProvider>
          </PersistGate>
        </Provider>
        {SplashScreen.hide()}
      </>
    );
  }
}
