import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import { StylesGeneral } from "../../constants/routes";
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
    alert("a");
  };

  agriculture = () => {
    alert("a");
  };

  render() {
    return (
      <ImageBackground style={styles.container}>
        <Text style={[StylesGeneral.text, styles.text]}>IFarm</Text>
        <View style={{ marginBottom: 50 }} />

        <Button
          name="Cadastrar Propriedade"
          onPress={this.propertyRegistration}
        />
        <Button name="Lista de Propriedades" onPress={this.listOfPropertyes} />
        <Button name="Pecuaria" onPress={this.livestock} />
        <Button name="Agricultura" onPress={this.agriculture} />
      </ImageBackground>
    );
  }
}
