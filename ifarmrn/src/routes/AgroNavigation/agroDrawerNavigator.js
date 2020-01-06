import { createDrawerNavigator } from "react-navigation-drawer";

import {
  NavigatorAgro1,
  NavigatorAgro2,
  NavigatorAgro3
} from "./stackNavigators";

import SwitchAgro from "./switchAgro";

import { Color } from "../../constants/routes";

const DrawerNavigator = createDrawerNavigator(
  {
    NavigatorAgro1: { screen: NavigatorAgro1 },
    NavigatorAgro2: { screen: NavigatorAgro2 },
    NavigatorAgro3: { screen: NavigatorAgro3 }
  },
  {
    contentOptions: {
      activeTintColor: Color.green
    },
    drawerBackgroundColor: Color.gray,
    mode: "modal",
    headerMode: "none",
    drawerPosition: "right",
    contentComponent: SwitchAgro
  }
);

export default DrawerNavigator;
