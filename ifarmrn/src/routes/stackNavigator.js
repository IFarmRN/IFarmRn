import { createStackNavigator } from "react-navigation-stack";
import Home from "../pages/Home/home";
import Property from "../pages/Property/property";
import Register from "../pages/Register/register";
import RegisterOptions from "./HeaderRegister/registerOptions";
import React from "react";
import Loading from "../pages/loading/loading";

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
        header: () => <RegisterOptions />
      }
    },
    Property: {
      screen: Property
    }
  },
  {
    initialRouteName: "Register"
  }
);

export default stackNavigator;
