import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import { Color, StylesGeneral } from "../../constants/routes";
import styles from "./styles";

export default function home(props) {
  propertyRegistration = () => {
    props.navigation.navigate("Register");
  };

  listOfPropertyes = () => {
    props.navigation.navigate("Property");
  };

  livestock = () => {
    props.navigation.navigate("LivestockNavigator", { id: null });
    global.KEY = 0;
  };

  agriculture = () => {
    props.navigation.navigate("AgroNavigator");
  };
  return (
    <LinearGradient
      colors={[Color.greenDark, Color.green, Color.greenLight]}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text style={[StylesGeneral.text, styles.text]}>IFarm</Text>
        <View style={{ marginBottom: 50 }} />

        <Button
          name="Cadastrar Propriedade"
          onPress={this.propertyRegistration}
        />
        <Button name="Lista de Propriedades" onPress={this.listOfPropertyes} />
        <Button name="Confinamento" onPress={this.livestock} />

        <Button name="Agricultura" onPress={this.agriculture} />
      </ScrollView>
    </LinearGradient>
  );
}
