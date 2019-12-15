import React, { Component } from "react";
import { Color } from "../constants/routes";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}
        {...this.props}
      >
        <Text
          style={[
            styles.textButton,
            { textAlign: this.props.left ? "left" : "center" }
          ]}
        >
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 12,
    width: Dimensions.get("screen").width * 0.85,
    marginVertical: 12,
    borderRadius: 20,
    //SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 3,
    elevation: 3
  },
  textButton: {
    fontFamily: "Comfortaa",
    fontSize: 17
  }
});
