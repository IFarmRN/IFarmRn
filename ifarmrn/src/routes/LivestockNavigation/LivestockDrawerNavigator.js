import { createDrawerNavigator } from "react-navigation-drawer";

import {
  NavigatorLivestock1,
  NavigatorLivestock2,
  NavigatorLivestock3,
  NavigatorLivestock4,
  NavigatorLivestock5,
  NavigatorLivestock6,
  NavigatorLivestock7
} from "./stackNavigators";

import switchLivestock from "./switchLivestock";

import { Color } from "../../constants/routes";

const DrawerNavigator = createDrawerNavigator(
  {
    NavigatorLivestock1: { screen: NavigatorLivestock1 },
    NavigatorLivestock2: { screen: NavigatorLivestock2 },
    NavigatorLivestock3: { screen: NavigatorLivestock3 },
    NavigatorLivestock4: { screen: NavigatorLivestock4 },
    NavigatorLivestock5: { screen: NavigatorLivestock5 },
    NavigatorLivestock6: { screen: NavigatorLivestock6 },
    NavigatorLivestock7: { screen: NavigatorLivestock7 }
  },
  {
    contentOptions: {
      activeTintColor: Color.green
    },
    drawerBackgroundColor: Color.gray,
    mode: "modal",
    headerMode: "none",
    drawerPosition: "right",
    contentComponent: switchLivestock
  }
);

export default DrawerNavigator;
