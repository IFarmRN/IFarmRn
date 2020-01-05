import React, { useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Picker, Dimensions } from "react-native";
import Input from "../../components/Input/Input";
import { Dropdown } from 'react-native-material-dropdown';
import { Color } from "../../constants/routes";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
function livestock(props) {
  const { setFieldValue, values, handleSubmit } = props;

  buttonSubmitted = async () => {
    handleSubmit();

    const boll = Object.entries(values).find(([item, value]) => {
      return value == "";
    });
    if (boll == undefined) {
      props.navigation.navigate("Livestock1", { values: values });
    }
  };




  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Caracteristicas do confinamento</Text>
          <Input
            name="Numero_de_cabeças"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Numero_de_dias_para_tratar"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Peso_vivo"
            title="Peso vivo (Kg)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Ganho_de_peso"
            title="Ganho de Peso (g/dia)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Consumo_diario_porcentagem"
            title="Consumo diário em % do peso"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                buttonSubmitted();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );

}

export default withFormik({
  mapPropsToValues: () => ({
    Numero_de_cabeças: "",
    Numero_de_dias_para_tratar: "",
    Peso_vivo: "",
    Ganho_de_peso: "",
    Consumo_diario_porcentagem: "",

  }),

  validationSchema: Yup.object().shape(
    {

      Numero_de_cabeças: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),
      Numero_de_dias_para_tratar: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),
      Peso_vivo: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),
      Ganho_de_peso: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),
      Consumo_diario_porcentagem: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),

    }
  ),

  handleSubmit: (values, { props }) => { }
})(livestock);
