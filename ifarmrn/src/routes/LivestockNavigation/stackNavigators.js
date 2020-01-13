import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import Livestock1 from "../../pages/Livestock/livestock";
import Livestock2 from "../../pages/Livestock/livestock1";
import Livestock3 from "../../pages/Livestock/livestock2";
import Livestock4 from "../../pages/Livestock/livestock3";
import Livestock5 from "../../pages/Livestock/livestock4";
import Livestock6 from "../../pages/Livestock/livestock5";
import Livestock7 from "../../pages/Livestock/livestock6";

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

const NavigatorLivestock4 = createStackNavigator({
  Livestock4: {
    screen: Livestock4,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

const NavigatorLivestock5 = createStackNavigator({
  Livestock5: {
    screen: Livestock5,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

const NavigatorLivestock6 = createStackNavigator({
  Livestock6: {
    screen: Livestock6,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

const NavigatorLivestock7 = createStackNavigator({
  Livestock6: {
    screen: Livestock7,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  }
});

export {
  NavigatorLivestock1,
  NavigatorLivestock2,
  NavigatorLivestock3,
  NavigatorLivestock4,
  NavigatorLivestock5,
  NavigatorLivestock6,
  NavigatorLivestock7
};
