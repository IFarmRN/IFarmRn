import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import Home from "../pages/Home/home";
import Property from "../pages/Property/property";
import Register from "../pages/Register/register";
import Loading from "../pages/loading/loading";

import PropertyHeader from "./HeaderProperty";

const stackNavigator = createStackNavigator({
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
});
export default stackNavigator;
