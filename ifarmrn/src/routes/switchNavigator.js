import { createSwitchNavigator } from "react-navigation";

import stackNavigator from "./stackNavigator";
import AgroNavigator from "./AgroNavigation/agroDrawerNavigator";

const switchNavigator = createSwitchNavigator({
  AgroNavigator: {
    screen: AgroNavigator
  },
  stackNavigator
});

export default switchNavigator;
