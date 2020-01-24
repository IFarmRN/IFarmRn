import React, { Component, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Icon from "@expo/vector-icons/FontAwesome";
import Icon2 from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import { Color } from "../../../constants/routes";

const menuData = [
  {
    icon: "cow",
    name: "Caracteristicas",
    screenName: "Livestock1"
  },
  {
    icon: "database",
    name: "Dados da Cultura",
    screenName: "Livestock2"
  },
  {
    icon: "pie-chart",
    name: "Performace",
    screenName: "Livestock3"
  },
  {
    icon: "tractor",
    name: "Colhedora",
    screenName: "Livestock4"
  },
  {
    icon: "dropbox",
    name: "Armazenamento",
    screenName: "Livestock5"
  },
  {
    icon: "truck",
    name: "Transporte",
    screenName: "Livestock6"
  },
  {
    icon: "washing-machine",
    name: "Distribuição de Massa",
    screenName: "Livestock7"
  }
];

function DrawerMenu(props) {
  return (
    <View style={styles.container}>
      <Menu />
      <Line Title={"Rotas"} />

      {menuData.map((item, index) => (
        <DrawerItem
          key={index}
          navigation={props.navigation}
          screenName={item.screenName}
          icon={item.icon}
          name={item.name}
          KEY={index}
        />
      ))}

      <Line />
      <View style={{ flex: 1 }}>
        <DrawerItem
          screenName={"Home"}
          navigation={props.navigation}
          icon={"home"}
          name={"Home"}
          KEY={12}
        />
      </View>
    </View>
  );
}

const Menu = () => (
  <View style={styles.drawerHeader}>
    <Text style={styles.drawerTitle}>IFarm</Text>
  </View>
);

const Line = () => <View style={styles.line} />;

function DrawerItem({ navigation, KEY, icon, name, screenName }) {
  actualScreen = () => {
    const pathAndParams =
      navigation.router.getPathAndParamsForState(navigation.state) || {};
    let activePath = pathAndParams.path;
    activePath = activePath.slice(
      activePath.indexOf("k") + 1,
      activePath.lenght
    );

    activePath = Number(parseInt(activePath));
    return activePath - 1;
  };

  buttonPressed = async () => {
    global.KEY = KEY;

    const currentScreen = actualScreen();

    switch (currentScreen) {
      case 0:
        global.buttonSubmitted0(screenName);
        break;

      case 1:
        global.buttonSubmitted1(screenName);
        break;

      case 2:
        global.buttonSubmitted2(screenName);
        break;

      case 3:
        global.buttonSubmitted3(screenName);
        break;

      case 4:
        global.buttonSubmitted4(screenName);
        break;

      case 5:
        global.buttonSubmitted5(screenName);
        break;

      case 6:
        global.buttonSubmitted6(screenName);
        break;

      default:
        return;
        break;
    }
  };

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: global.KEY == KEY ? Color.grayDark : Color.gray,
          margin: 5,
          borderRadius: 10
        },
        styles.menuItem
      ]}
      onPress={buttonPressed}
    >
      {KEY == 0 || KEY == 3 || KEY == 6 ? (
        <Icon2
          name={icon}
          size={35}
          color={global.KEY == KEY ? Color.green : Color.defaultColor}
          style={{ margin: 7 }}
        />
      ) : (
        <Icon
          name={icon}
          size={25}
          color={global.KEY == KEY ? Color.green : Color.defaultColor}
          style={{ margin: 15 }}
        />
      )}
      <Text
        style={[
          styles.menuItemText,
          {
            color: global.KEY === KEY ? Color.green : Color.defaultColor
          }
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export default DrawerMenu;
