import { createSwitchNavigator } from "react-navigation";

import stackNavigator from "./stackNavigator";
import AgroNavigator from "./AgroNavigation/agroDrawerNavigator";
import LivestockNavigator from "./LivestockNavigation/LivestockDrawerNavigator";

<<<<<<< HEAD
const switchNavigator = createSwitchNavigator({
  stackNavigator,
  AgroNavigator,
  LivestockNavigator
});
=======
const switchNavigator = createSwitchNavigator(
  {
    AgroNavigator: {
      screen: AgroNavigator
    },
    stackNavigator
  },
<<<<<<< HEAD
  stackNavigator
}, {
  initialRouteName: "stackNavigator"
});
=======
  {
    initialRouteName: "AgroNavigator"
  }
);
>>>>>>> c8df4a63aafe3b94747533eaa9dcf327cab31437
>>>>>>> 2cdd5e6f56c1ed76ea9be30d9e99f282e05d5301

export default switchNavigator;
