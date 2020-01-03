import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import styles from "./styles";
import { StylesGeneral, Color } from "../../constants/routes";
import Button from "../../components/Button";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  propertyRegistration = () => {
    this.props.navigation.navigate("Register");
  };

  listOfPropertyes = () => {
    this.props.navigation.navigate("Property");
  };

  livestock = () => {
    this.props.navigation.navigate("Livestock", {id: null});
  };

  agriculture = () => {
    alert("a");
  };

  render() {
    return (
      <LinearGradient
        colors={[Color.greenDark, Color.green, Color.greenLight]}
        style={{ flex: 1 }}
      >
        <ImageBackground style={styles.container}>
          <Text style={[StylesGeneral.text, styles.text]}>IFarm</Text>
          <View style={{ marginBottom: 50 }} />

          <Button
            name="Cadastrar Propriedade"
            onPress={this.propertyRegistration}
          />
          <Button
            name="Lista de Propriedades"
            onPress={this.listOfPropertyes}
          />
          <Button name="Confinamento" onPress={this.livestock} />
          <Button name="Agricultura" onPress={this.agriculture} />
        </ImageBackground>
      </LinearGradient>
    );
  }
}
