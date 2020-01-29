import { SplashScreen } from "expo";
import * as Font from "expo-font";
import React from "react";
import DropdownAlert from "react-native-dropdownalert";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "./src/configs/statusBarConfig";
import Loading from "./src/pages/loading/loading";
import Router from "./src/routes";
import { persistor, store } from "./src/store";

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

  componentDidMount() {
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
