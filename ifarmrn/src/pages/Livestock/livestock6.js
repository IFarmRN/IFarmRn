import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import Input from "../../components/Input/Input";
import DropdownList from "../../components/Dropdown/Dropdown";
import { Color } from "../../constants/routes";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
function livestock(props) {
  const { setFieldValue, handleSubmit, errors, values } = props;

  useEffect(() => {
    global.KEY = 6;
  });

  useEffect(() => {
    if (values["Capacidade_vagao"] !== "") {
      let m = parseFloat(
        values["Consumo_med_massa_seca_de_silagem_por_cabeça_dia"]
      );
      let n = parseFloat(values["Numero_de_cabeças"]);
      let d = parseFloat(values["Densidade"]);
      let c = parseFloat(values["Capacidade_vagao"]);
      let a = parseFloat(values["Area"]);

      let nv = ((m * n) / d / c).toFixed(0);
      let fd = (((m / d) * n) / a).toFixed(2);

      setFieldValue("Numero_viagens", nv);
      setFieldValue("Fatia_diaria", fd);
    }
  }, [values["Capacidade_vagao"]]);

  global.buttonSubmitted6 = async screenName => {
    const valueArray = Object.entries(values);
    const params = props.navigation.getParam("values") || null;

    const empty = valueArray.find(([item, value]) => {
      return value != "";
    });

    //check if the values are empty
    if (empty == undefined) {
      await props.navigation.navigate(screenName);

      const KEY = screenName.slice(
        screenName.indexOf("k") + 1,
        screenName.length
      );

      global.KEY = parseInt(KEY) - 1;
      return;
    }

    handleSubmit();

    if (Object.keys(errors).length == 0) {
      const newValues = { ...params, ...values };

      console.log(newValues);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Distribuição de massa verde</Text>

          <Input
            value={values["Capacidade_vagao"]}
            name="Capacidade_vagao"
            title="Capacidade do vagão (m³)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Text
            style={styles.title}
          >{`Fatia retirada diária (m): ${values["Fatia_diaria"]}`}</Text>

          <Text
            style={styles.title}
          >{`Número de viagens: ${values["Numero_viagens"]}`}</Text>

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
                  global.buttonSubmitted6();
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  global.buttonSubmitted6("Livestock6");
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
    Fatia_diaria: "",
    Capacidade_vagao: "",
    Numero_viagens: ""
  }),

  /*   validationSchema: Yup.object().shape({
    Capacidade_caminhao: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Velocidade_caminhao: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Distancia_silo: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher")
  }), */

  handleSubmit: () => {}
})(livestock);
