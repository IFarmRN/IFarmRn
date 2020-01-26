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
  const { setFieldValue, values, handleSubmit, errors } = props;

  global.buttonSubmitted5 = async (screenName, key) => {
    const valueArray = Object.entries(values);
    const params = props.navigation.getParam("values") || null;

    const empty = valueArray.find(([item, value]) => {
      return value != "";
    });



    //check if the values are empty
    if (empty == undefined) {
      global.KEY = key;

      await props.navigation.navigate(screenName);
      return;
    }

    handleSubmit();

    if (Object.keys(errors).length == 0) {
      global.KEY = key;
      const newValues = { ...params, ...values };
      console.log(newValues);

      const KEY = screenName.slice(
        screenName.indexOf("k") + 1,
        screenName.length
      );

      global.KEY = parseInt(KEY) - 1;
      await props.navigation.navigate(screenName, {
        values: newValues
      });
      return;
    }
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
                  global.buttonSubmitted5("Livestock7", 6);
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  global.buttonSubmitted5("Livestock5", 4);
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
    Velocidade_caminhao: "",
    Distancia_silo: ""
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
    Capacidade_caminhao: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Velocidade_caminhao: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Distancia_silo: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),

  handleSubmit: () => { }
})(livestock);
