import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Home from "../pages/Home/home";
import Property from "../pages/Property/property";
import Register from "../pages/Register/register";
import Loading from "../pages/loading/loading";
import Livestock from "../pages/Livestock/livestock";

import LivestockHeader from "./HeaderLivestock";
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
    },
    Livestock: {
      screen: Livestock,
      navigationOptions: {
        header: () => <LivestockHeader />
      }
    }
  },
  {
    initialRouteName: "Livestock"
  }
);

export default stackNavigator;
