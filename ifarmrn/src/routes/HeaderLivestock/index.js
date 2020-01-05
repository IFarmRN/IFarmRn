import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { withNavigation } from "react-navigation";
import Ionicons from "@expo/vector-icons/AntDesign";

class livestockOptions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={styles.button}
          >
            <Ionicons name="left" size={32} color="green" />
          </TouchableOpacity>
          <Text style={styles.text}> Confinamento </Text>
        </View>
        <View style={styles.margin} />
      </View>
    );
  }
}

export default withNavigation(livestockOptions);
