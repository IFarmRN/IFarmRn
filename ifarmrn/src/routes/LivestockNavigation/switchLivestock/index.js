import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

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
          navigate={props.navigation.navigate}
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
          navigate={props.navigation.navigate}
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

function DrawerItem({ navigate, KEY, icon, name, screenName }) {
  buttonPressed = () => {
    global.currentScreenIndex = KEY;

    navigate(screenName);
  };

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor:
            global.currentScreenIndex == KEY ? Color.grayDark : Color.gray,
          margin: 5,
          borderRadius: 10
        },
        styles.menuItem
      ]}
      onPress={buttonPressed}
    >
      {KEY == 0 ? (
        <Icon2
          name={icon}
          size={35}
          color={
            global.currentScreenIndex == KEY ? Color.green : Color.defaultColor
          }
          style={{ margin: 7 }}
        />
      ) : (
        <Icon
          name={icon}
          size={25}
          color={
            global.currentScreenIndex == KEY ? Color.green : Color.defaultColor
          }
          style={{ margin: 15 }}
        />
      )}
      <Text
        style={[
          styles.menuItemText,
          {
            color:
              global.currentScreenIndex === KEY
                ? Color.green
                : Color.defaultColor
          }
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export default DrawerMenu;
