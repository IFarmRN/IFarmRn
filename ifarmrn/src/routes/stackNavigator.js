import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import Home from "../pages/Home/home";
import Property from "../pages/Property/property";
import Register from "../pages/Register/register";
import Loading from "../pages/loading/loading";

import { Color, FontSize } from "../constants/routes";

import PropertyHeader from "./HeaderProperty";
import RegisterHeader from "./HeaderRegister";
import SelectionScreen from "../pages/SelectionScreen/index.js";

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null
      }
    },
    SelectionScreen: {
      screen: SelectionScreen,
      navigationOptions: {
        header: () => (
          <PropertyHeader
            name={"Choose Your Property"}
            styleText={{ fontSize: 25 }}
          />
        )
      }
    },
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: () => null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: () => <RegisterHeader />
      }
    },
    Property: {
      screen: Property,
      navigationOptions: {
        header: () => <PropertyHeader />
      }
    }
  }
  /* {
    initialRouteName: "SelectionScreen"
  } */
);
export default stackNavigator;
