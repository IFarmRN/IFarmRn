import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import Livestock1 from "../../pages/Livestock/livestock";
import Livestock2 from "../../pages/Livestock/livestock1";
import Livestock3 from "../../pages/Livestock/livestock2";

import LivestockHeader from "./HeaderLivestock";

const NavigatorLivestock1 = createStackNavigator({
  Livestock1: {
    screen: Livestock1,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

const NavigatorLivestock2 = createStackNavigator({
  Livestock2: {
    screen: Livestock2,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

const NavigatorLivestock3 = createStackNavigator({
  Livestock3: {
    screen: Livestock3,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

export { NavigatorLivestock1, NavigatorLivestock2, NavigatorLivestock3 };
