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
    console.log("entrou no useEffect");
    if (values["Capacidade_vagao"] !== "") {
      let m = parseFloat(values["Consumo_med_massa_seca_de_silagem_por_cabeça_dia"]);
      let n = parseFloat(values["Numero_de_cabeças"]);
      let d = parseFloat(values["Densidade"]);
      let c = parseFloat(values["Capacidade_vagao"]);
      let a = parseFloat(values["Area"]);

      let nv = ((m * n / d) / c).toFixed(0);
      let fd = (((m / d) * n) / a).toFixed(2);

      setFieldValue("Numero_viagens", nv);
      setFieldValue("Fatia_diaria", fd);
    }
  }, [values["Capacidade_vagao"]]);

  buttonSubmitted = async () => {
    handleSubmit();
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
                  buttonSubmitted();
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.dispatch({
                    key: "Livestock5",
                    type: "ReplaceCurrentScreen",
                    routeName: "Livestock5",
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
    Fatia_diaria: "",
    Capacidade_vagao: "",
    Numero_viagens: "",

    /*
    Fatia_diaria: "",
    Capacidade_vagao: "",
    Numero_viagens: "",

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
    Capacidade_caminhao: Yup.number("Use apenas numeros e ponto no lugar de virgula").required(
      "Não esqueça de preencher"
    ),
    Velocidade_caminhao: Yup.number("Use apenas numeros e ponto no lugar de virgula").required(
      "Não esqueça de preencher"
    ),
    Distancia_silo: Yup.number("Use apenas numeros e ponto no lugar de virgula").required(
      "Não esqueça de preencher"
    ),
  }),

  handleSubmit: (values, { props }) => {
    console.log(values);
    alert("agora temos que fazer o pdf");
  }
})(livestock);
