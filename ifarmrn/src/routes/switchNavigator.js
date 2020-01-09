import { createSwitchNavigator } from "react-navigation";

import stackNavigator from "./stackNavigator";
import AgroNavigator from "./AgroNavigation/agroDrawerNavigator";

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

export default switchNavigator;
