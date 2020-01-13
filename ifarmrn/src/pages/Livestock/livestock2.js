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
import LivestockHeader from "../../routes/HeaderLivestock/index";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
function livestock(props) {
  const { setFieldValue, values, handleSubmit } = props;

  useEffect(() => {
    fromValues = props.navigation.getParam("values") || null;
    if (fromValues != null) {
      Object.keys(fromValues).map(function (key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []);

  useEffect(() => {
    p1 = 0, p2 = 0;
    switch (values["Performance_produtiva_animal"]) {
      case "Alta performance produtiva":
        setFieldValue("Porcentagem_concentrado", 40);
        setFieldValue("Porcentagem_volumoso", 60);
        p1 = 40;
        p2 = 60;
        break;
      case "Média performance produtiva":
        setFieldValue("Porcentagem_concentrado", 50);
        setFieldValue("Porcentagem_volumoso", 50);
        p1 = 50;
        p2 = 50;
        break;
      case "Baixa performance produtiva":
        setFieldValue("Porcentagem_concentrado", 30);
        setFieldValue("Porcentagem_volumoso", 70);
        p1 = 30;
        p2 = 70;
        break;
    }
    let c1 = parseFloat(values["Peso_vivo"]) * parseFloat(values["Consumo_diario_porcentagem"]) * 0.01;
    let c2 = c1 * p2 * 0.01;
    let c3 = c2 / (parseFloat(values["Porcentagem_materia_seca"]) * 0.01);
    let c4 =
      parseFloat(values["Numero_de_cabeças"]) *
      parseFloat(values["Numero_de_dias_para_tratar"]) *
      c3 *
      1.1 *
      0.001;
    let c5 = c4 / parseFloat(values["Producao"]);

    setFieldValue("Consumo_med_massa_seca_por_cabeça_dia", c1.toFixed(2));
    setFieldValue("Consumo_med_massa_seca_de_silagem_por_cabeça_dia", c2.toFixed(2));
    setFieldValue("Consumo_med_massa_verde_por_cabeça_dia", c3.toFixed(2));
    setFieldValue("Quantia_total_massa_verde_ton", c4.toFixed(2));
    setFieldValue("Area_plantada", c5.toFixed(2));
  }, [values["Performance_produtiva_animal"]]);

  buttonSubmitted = () => {
    handleSubmit();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Performance produtiva do animal</Text>
          <DropdownList
            value={values["Performance_produtiva_animal"]}
            title="Performance produtiva animal"
            name="Performance_produtiva_animal"
            data={[
              { value: "Alta performance produtiva" },
              { value: "Média performance produtiva" },
              { value: "Baixa performance produtiva" }
            ]}
            props={props}
          />
          <Text
            style={styles.title}
          >{`Volumoso (%): ${values["Porcentagem_volumoso"]}`}</Text>
          <Text
            style={styles.title}
          >{`Concentrado (%): ${values["Porcentagem_concentrado"]}`}</Text>
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
                    key: "Livestock1",
                    type: "ReplaceCurrentScreen",
                    routeName: "Livestock1",
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
    Performance_produtiva_animal: "",
    Porcentagem_concentrado: "",
    Porcentagem_volumoso: "",
  }),

  validationSchema: Yup.object().shape({
    Performance_produtiva_animal: Yup.string("Erro").required(
      "Não esqueça de preencher"
    )
  }),

  handleSubmit: (values, { props }) => {
    props.navigation.dispatch({
      key: "Livestock3",
      type: "ReplaceCurrentScreen",
      routeName: "Livestock3",
      params: { values: values }
    });

  }
})(livestock);
