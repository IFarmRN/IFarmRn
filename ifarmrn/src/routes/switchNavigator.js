import { createSwitchNavigator } from "react-navigation";

import stackNavigator from "./stackNavigator";
import AgroNavigator from "./AgroNavigation/agroDrawerNavigator";
import LivestockNavigator from "./LivestockNavigation/LivestockDrawerNavigator";

const switchNavigator = createSwitchNavigator({
  stackNavigator,
  AgroNavigator,
  LivestockNavigator
});

export default switchNavigator;
