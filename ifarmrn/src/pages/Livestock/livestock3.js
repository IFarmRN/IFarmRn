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
  const { setFieldValue, values, handleSubmit } = props;

  useEffect(() => {
    fromValues = props.navigation.getParam("values") || null;
    if (fromValues != null) {
      Object.keys(fromValues).map(function(key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []);

  useEffect(() => {
    if (
      values["Velocidade_de_deslocamento"] !== "" &&
      values["Abertura_da_colhedora"] !== ""
    ) {
      let a = parseFloat(values["Abertura_da_colhedora"]);
      let v = parseFloat(values["Velocidade_de_deslocamento"]);
      let p = parseFloat(values["Producao"]);

      setFieldValue("Producao_maquina", (((a * v) / 10) * p).toFixed(2));
    }
  }, [values["Abertura_da_colhedora"], values["Velocidade_de_deslocamento"]]);

  useEffect(() => {
    if (
      values["Producao_maquina"] !== "" &&
      values["Horas_diaria_trabalho"] !== ""
    ) {
      let h = parseFloat(values["Horas_diaria_trabalho"]);
      let q = parseFloat(values["Quantia_total_massa_verde_ton"]);
      let p = parseFloat(values["Producao_maquina"]);
      let d = (((q / p) * 1.15) / h).toFixed(1);
      setFieldValue("Dias_de_trabalho", d);
    }
  }, [values["Horas_diaria_trabalho"]]);

  buttonSubmitted = async () => {
    handleSubmit();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Colhedora</Text>

          <Input
            value={values["Abertura_da_colhedora"]}
            name="Abertura_da_colhedora"
            title="Abertura da colhedora"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Velocidade_de_deslocamento"]}
            name="Velocidade_de_deslocamento"
            title="Velocidade de deslocamento da colhedora (Km/h)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Horas_diaria_trabalho"]}
            name="Horas_diaria_trabalho"
            title="Horas de trabalho diario (h)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Text
            style={styles.title}
          >{`Dias de trabalho: ${values["Dias_de_trabalho"]}`}</Text>
         <Text
            style={styles.title}
          >{`Produção da maquina (ton/h): ${values["Producao_maquina"]}`}</Text>

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
              <TouchableOpacity
                onPress={() => {
                  props.navigation.dispatch({
                    key: "Livestock2",
                    type: "ReplaceCurrentScreen",
                    routeName: "Livestock2",
                    params: { values: values }
                  });
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Anterior</Text>
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
    Abertura_da_colhedora: "",
    Producao_maquina: "",
    Velocidade_de_deslocamento: "",
    Horas_diaria_trabalho: "",
    Dias_de_trabalho: ""
  }),

  validationSchema: Yup.object().shape({
    Abertura_da_colhedora: Yup.string(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Velocidade_de_deslocamento: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Horas_diaria_trabalho: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher")
  }),

  handleSubmit: (values, { props }) => {
    props.navigation.dispatch({
      key: "Livestock4",
      type: "ReplaceCurrentScreen",
      routeName: "Livestock4",
      params: { values: values }
    });
  }
})(livestock);
