import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import Input from "../../components/Input/Input";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";

function livestock(props) {
  const { setFieldValue } = props;

  buttonSubmitted = async () => {
    props.handleSubmit();
  };

  useEffect(() => {
    fromValues = props.navigation.getParam("values") || null;
    if (fromValues != null) {
      Object.keys(fromValues).map(function(key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []);

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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: Dimensions.get("screen").width
            }}
          >
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => {
                  buttonSubmitted();
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
            </View>
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
    Consumo_diario_porcentagem: ""
  }),

  validationSchema: Yup.object().shape({
    Numero_de_cabeças: Yup.number("Precisa conter apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Numero_de_dias_para_tratar: Yup.number(
      "Precisa conter apenas numeros"
    ).required("Não esqueça de preencher"),
    Peso_vivo: Yup.number("Precisa conter apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Ganho_de_peso: Yup.number("Precisa conter apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Consumo_diario_porcentagem: Yup.number(
      "Precisa conter apenas numeros"
    ).required("Não esqueça de preencher")
  }),

  handleSubmit: (values, { props }) => {
    props.navigation.dispatch({
      key: "Livestock1",
      type: "ReplaceCurrentScreen",
      routeName: "Livestock1",
      params: { values: values }
    });
  }
})(livestock);
