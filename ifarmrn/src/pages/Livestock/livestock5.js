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
    let c = parseFloat(values["Capacidade_caminhao"]);
    let p = parseFloat(values["Producao_maquina"]);
    let d = parseFloat(values["Densidade"]);

    let t = ((c / ((p * 1000) / d)) * 60).toFixed(2);

    if (!isNaN(t)) setFieldValue("Tempo_enchimento_caçamba", t);
  }, [values["Capacidade_caminhao"]]);

  useEffect(() => {
    if (
      values["Velocidade_caminhao"] !== "" &&
      values["Distancia_silo"] !== ""
    ) {
      let v = parseFloat(values["Velocidade_caminhao"]);
      let d = parseFloat(values["Distancia_silo"]);
      let e = parseFloat(values["Tempo_enchimento_caçamba"]);
      let t = 2 * ((d / v) * 60) + 10;

      setFieldValue("Tempo_percurso", t.toFixed(2));
      setFieldValue("Quantidade_caminhoes", (t / e).toFixed(0));
    }
  }, [values["Velocidade_caminhao"], values["Distancia_silo"]]);

  buttonSubmitted = async () => {
    handleSubmit();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Transporte de massa verde</Text>

          <Input
            value={values["Capacidade_caminhao"]}
            name="Capacidade_caminhao"
            title="Capacidade do caminhão (m³)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Velocidade_caminhao"]}
            name="Velocidade_caminhao"
            title="Velocidade do caminhão (Km/h)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Distancia_silo"]}
            name="Distancia_silo"
            title="Distancia até o silo (Km)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />

          <Text
            style={styles.title}
          >{`Tempo de enchimento da caçamba: ${values["Tempo_enchimento_caçamba"]}`}</Text>

          <Text
            style={styles.title}
          >{`Tempo de percurso (min): ${values["Tempo_percurso"]}`}</Text>
          <Text
            style={styles.title}
          >{`Quantidade de caminhões: ${values["Quantidade_caminhoes"]}`}</Text>

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
                    key: "Livestock4",
                    type: "ReplaceCurrentScreen",
                    routeName: "Livestock4",
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
    Capacidade_caminhao: "",
    Tempo_enchimento_caçamba: "",
    Velocidade_caminhao: "",
    Distancia_silo: "",
    Tempo_percurso: "",
    Quantidade_caminhoes: ""

    /*
    Capacidade_caminhao: "",
    Tempo_enchimento_caçamba: "",
    Velocidade_caminhao: "",
    Distancia_silo: "",
    Tempo_percurso: "",
    Quantidade_caminhoes: "",

    Quantidade_silo: "",
    Base_maior: "",
    Base_menor: "",
    Altura: "",
    Volume_silo: "",
    Comprimento: "",

    Abertura_da_colhedora: "",
    Velocidade_de_deslocamento: "",
    Producao_maquina: "",
    Horas_diaria_trabalho: "",
    Dias_de_trabalho: "",

    Cultura_forrageira: "",
    Producao: "",
    Densidade: "",
    Porcentagem_materia_seca: "",

    Porcentagem_volumoso: "",
    Porcentagem_concentrado: "",
    Performance_produtiva_animal: "",
    Consumo_med_massa_seca_por_cabeça_dia: "",
    Consumo_med_massa_seca_de_silagem_por_cabeça_dia: "",
    Consumo_med_massa_verde_por_cabeça_dia: "",
    Quantia_total_massa_verde_ton: "",
    Area_plantada: "",

    Numero_de_cabeças: "",
    Numero_de_dias_para_tratar: "",
    Peso_vivo: "",
    Ganho_de_peso: "",
    Consumo_diario_porcentagem: "",
    */
  }),

  validationSchema: Yup.object().shape({
    Capacidade_caminhao: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Velocidade_caminhao: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Distancia_silo: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher")
  }),

  handleSubmit: (values, { props }) => {
    props.navigation.dispatch({
      key: "Livestock6",
      type: "ReplaceCurrentScreen",
      routeName: "Livestock6",
      params: { values: values }
    });
  }
})(livestock);
