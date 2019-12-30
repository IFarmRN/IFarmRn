import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Home from "../pages/Home/home";
import Property from "../pages/Property/property";
import Register from "../pages/Register/register";
import Loading from "../pages/loading/loading";

import RegisterHeader from "./HeaderRegister";
import PropertyHeader from "./HeaderProperty";

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null
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
  },
  {
    /*  initialRouteName: "Register" */
  }
);

export default stackNavigator;
