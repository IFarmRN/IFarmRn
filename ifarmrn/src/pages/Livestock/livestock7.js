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

  global.buttonSubmitted6 = async (screenName, key) => {
    const valueArray = Object.entries(values);
    const params = props.navigation.getParam("values") || null;

    const empty = valueArray.find(([item, value]) => {
      return value != "";
    });

    global.KEY = key;
    //check if the values are empty
    if (empty == undefined) {
      await props.navigation.navigate(screenName);
      return;
    }

    handleSubmit();

    if (Object.keys(errors).length == 0) {
      const newValues = { ...params, ...values };
      console.log(newValues);
    }
  };

  calc1 = () => {
    const p1 = parseFloat(values["Porcentagem_concentrado"]);
    const p2 = parseFloat(values["Porcentagem_volumoso"]);
    const Peso_vivo = parseFloat(values["Peso_vivo"]);
    const Consumo_diario = parseFloat(values["Consumo_diario_porcentagem"]);
    const MateriaSeca = parseFloat(values["Porcentagem_materia_seca"]);
    const Numero_de_cabeças = parseFloat(values["Numero_de_cabeças"]);
    const Dias_para_tratar = parseFloat(values["Numero_de_dias_para_tratar"]);
    const Producao = parseFloat(values["Producao"]);

    let c1 = Peso_vivo * Consumo_diario * 0.01;
    let c2 = c1 * p2 * 0.01;
    let c3 = c2 / (MateriaSeca * 0.01);
    let c4 = Numero_de_cabeças * Dias_para_tratar * c3 * 1.1 * 0.001;
    let c5 = c4 / Producao;

    setFieldValue("Consumo_med_massa_seca_por_cabeça_dia", c1.toFixed(2));
    setFieldValue(
      "Consumo_med_massa_seca_de_silagem_por_cabeça_dia",
      c2.toFixed(2)
    );
    setFieldValue("Consumo_med_massa_verde_por_cabeça_dia", c3.toFixed(2));
    setFieldValue("Quantia_total_massa_verde_ton", c4.toFixed(2));
    setFieldValue("Area_plantada", c5.toFixed(2));
  };

  calc2 = () => {
    let h = parseFloat(values["Horas_diaria_trabalho"]);
    let q = parseFloat(values["Quantia_total_massa_verde_ton"]);
    let pm = parseFloat(values["Producao_maquina"]);
    let d = (((q / pm) * 1.15) / h).toFixed(1);

    setFieldValue("Dias_de_trabalho", d);

    let a = parseFloat(values["Abertura_da_colhedora"]);
    let v = parseFloat(values["Velocidade_de_deslocamento"]);
    let p = parseFloat(values["Producao"]);
    let PM = (((a * v) / 10) * p).toFixed(2);

    setFieldValue("Producao_maquina", PM);
  };

  calc3 = () => {
    let q = parseFloat(values["Quantia_total_massa_verde_ton"]);
    let d = parseFloat(values["Densidade"]);
    let s = parseFloat(values["Quantidade_silo"]);
    let v = ((q * 1000) / d / s).toFixed(2);

    if (!isNaN(v)) {
      setFieldValue("Volume_silo", v);
    }

    let b2 = parseFloat(values["Base_maior"]);
    let b1 = parseFloat(values["Base_menor"]);
    let a = parseFloat(values["Altura"]);
    let aa = ((b1 + b2) * a) / 2;
    let c = (v / aa).toFixed(2);
    if (!isNaN(c) && !isNaN(aa)) {
      setFieldValue("Comprimento", c);
      setFieldValue("Area", aa.toFixed(2));
    }
  };

  calc4 = () => {
    let v = parseFloat(values["Volume_silo"]);
    let b2 = parseFloat(values["Base_maior"]);
    let b1 = parseFloat(values["Base_menor"]);
    let a = parseFloat(values["Altura"]);
    let aa = ((b1 + b2) * a) / 2;
    let c = (v / aa).toFixed(2);
    if (!isNaN(c) && !isNaN(aa)) {
      setFieldValue("Comprimento", c);
      setFieldValue("Area", aa.toFixed(2));
    }
  };

  calc5 = () => {
    let c = parseFloat(values["Capacidade_caminhao"]);
    let p = parseFloat(values["Producao_maquina"]);
    let d = parseFloat(values["Densidade"]);

    let t = ((c / ((p * 1000) / d)) * 60).toFixed(2);

    if (!isNaN(t)) setFieldValue("Tempo_enchimento_caçamba", t);
  };

  calc6 = () => {
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
  };

  calc7 = () => {
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
                <Text style={styles.buttonText}>Escolher propriedade</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  global.buttonSubmitted6("Livestock6", 5);
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
    Numero_viagens: "",
    Capacidade_vagao: ""
  }),
  validationSchema: Yup.object().shape({
    Capacidade_vagao: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),
  handleSubmit: () => {}
})(livestock);
