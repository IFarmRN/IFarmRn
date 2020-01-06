import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { withNavigation } from "react-navigation";
import Ionicons from "@expo/vector-icons/AntDesign";
import Icon from "@expo/vector-icons/Feather";

class headerOptions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
            style={styles.button}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name={"left"} size={32} color="green" />
              <Text style={styles.textHome}>Home</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.text}> Cadastro </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={styles.button}
          >
            <Icon name={"menu"} size={32} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(headerOptions);
