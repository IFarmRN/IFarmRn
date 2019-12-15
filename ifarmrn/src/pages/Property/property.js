import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

class Property extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> Property </Text>
      </View>
    );
  }
}

export default Property;
