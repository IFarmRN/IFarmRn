import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import Home from "../pages/Home/home";
import Property from "../pages/Property/property";
import Register from "../pages/Register/register";
import Loading from "../pages/loading/loading";

<<<<<<< HEAD
=======
import Livestock from "../pages/Livestock/livestock";
import Livestock1 from "../pages/Livestock/livestock1";
import Livestock2 from "../pages/Livestock/livestock2";
import Livestock3 from "../pages/Livestock/livestock3";
import Livestock4 from "../pages/Livestock/livestock4";
import Livestock5 from "../pages/Livestock/livestock5";
import Livestock6 from "../pages/Livestock/livestock6";

import LivestockHeader from "./HeaderLivestock";
>>>>>>> 2cdd5e6f56c1ed76ea9be30d9e99f282e05d5301
import RegisterHeader from "./HeaderRegister";
import PropertyHeader from "./HeaderProperty";

const stackNavigator = createStackNavigator({
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
<<<<<<< HEAD
=======
  },
  Livestock: {
    screen: Livestock,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  },
  Livestock1: {
    screen: Livestock1,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  },
  Livestock2: {
    screen: Livestock2,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  },
  Livestock3: {
    screen: Livestock3,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  },
  Livestock4: {
    screen: Livestock4,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  },
  Livestock5: {
    screen: Livestock5,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
  },
  Livestock6: {
    screen: Livestock6,
    navigationOptions: {
      header: () => <LivestockHeader />
    }
>>>>>>> 2cdd5e6f56c1ed76ea9be30d9e99f282e05d5301
  }
}, {
  // initialRouteName: "Livestock3"
});
/*
const prevGetStateForActionHomeStack = stackNavigator.router.getStateForAction;
stackNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === "ReplaceCurrentScreen") {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};
 */
export default stackNavigator;
