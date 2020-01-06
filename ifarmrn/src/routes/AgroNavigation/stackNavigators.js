import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import Agro1 from "../../pages/Agriculture/Agro1";
import Agro2 from "../../pages/Agriculture/Agro2";
import Agro3 from "../../pages/Agriculture/Agro3";

import AgroHeader from "./HeaderAgro";

const NavigatorAgro1 = createStackNavigator({
  Agro1: {
    screen: Agro1,
    navigationOptions: {
      header: () => <AgroHeader />
    }
  }
});

const NavigatorAgro2 = createStackNavigator({
  Agro2: {
    screen: Agro2,
    navigationOptions: {
      header: () => <AgroHeader />
    }
  }
});

const NavigatorAgro3 = createStackNavigator({
  Agro3: {
    screen: Agro3,
    navigationOptions: {
      header: () => <AgroHeader />
    }
  }
});

export { NavigatorAgro1, NavigatorAgro2, NavigatorAgro3 };
