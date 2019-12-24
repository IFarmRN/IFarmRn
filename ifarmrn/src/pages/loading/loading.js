import React, { Component } from "react";
import { View, Text, Animated, Image, Easing, StyleSheet } from "react-native";
import styles from "./styles";
import { PacmanIndicator } from "react-native-indicators";
import { StylesGeneral } from "../../constants/routes";

export default class loading extends Component {
  constructor(props) {
    super(props);

    this.spinValue = new Animated.Value(0);
    this.textValue = new Animated.Value(0.3);
  }

  componentDidMount() {
    this.animatedText();
  }

  animatedText = () => {
    this.textValue.setValue(0.3);
    Animated.timing(this.textValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.ease
    }).start();
  };

  render() {
    const textSize = this.textValue.interpolate({
      inputRange: [0.3, 1],
      outputRange: [80, 80]
    });
    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.text, { fontSize: textSize }]}>
          IFarm
        </Animated.Text>
        <PacmanIndicator color={"#fff"} size={75} />
      </View>
    );
  }
}
