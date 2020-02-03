import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert
} from "react-native";
import Input from "../../components/Input/Input";
import DropdownList from "../../components/Dropdown/Dropdown";
import { Color } from "../../constants/routes";
import ReactNativeItemSelect from "react-native-item-select";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { withFormik } from "formik";
import * as Yup from "yup";
import Icon from "@expo/vector-icons/Ionicons";
import * as Print from "expo-print";
import styles from "./styles";
import { useSelector } from "react-redux";

var calculopronto = false;

function livestock(props) {
  const { setFieldValue, handleSubmit, errors, values } = props;
  const [noProperty, setNoProperty] = useState(false);
  const state = useSelector(state => state.userData);

  changeNoPropertyValue = () => setNoProperty(!noProperty);

  makeProperty = () => {
    const params = props.navigation.getParam("values") || null;
    const newValues = { ...params, ...values };

    props.navigation.navigate("Register", { confinamento: newValues });
  };

  global.buttonSubmitted6 = async (screenName, key) => {
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
      await props.navigation.navigate(screenName, {
        values: newValues
      });
      return;
    }
  };

  useEffect(() => {
    if (calculopronto) {
      calculopronto = false;
      const params = props.navigation.getParam("values") || null;
      const newValues = { ...params, ...values };

      props.navigation.navigate("SelectionScreen", { values: newValues });
    }
  }, [values["calculopronto"]]);

  calc = () => {
    const params = props.navigation.getParam("values") || null;
    const newValues = { ...params, ...values };

    var p1 = parseFloat(newValues["Percentagem_concentrado"]);
    var p2 = parseFloat(newValues["Percentagem_volumoso"]);
    var Peso_vivo = parseFloat(newValues["Peso_vivo"]);
    var Consumo_diario = parseFloat(newValues["Consumo_diario_porcentagem"]);
    var MateriaSeca = parseFloat(newValues["Porcentagem_materia_seca"]);
    var n = parseFloat(newValues["Numero_de_cabeças"]);
    var Dias_para_tratar = parseFloat(newValues["Numero_de_dias_para_tratar"]);
    var Producao = parseFloat(newValues["Producao"]);
    var ab = parseFloat(newValues["Abertura_da_colhedora"]);
    var vd = parseFloat(newValues["Velocidade_de_deslocamento"]);
    var hdt = parseFloat(newValues["Horas_diaria_trabalho"]);
    var d = parseFloat(newValues["Densidade"]);
    var s = parseFloat(newValues["Quantidade_silo"]);
    var vc = parseFloat(newValues["Velocidade_caminhao"]);
    var ds = parseFloat(newValues["Distancia_silo"]);
    var b2 = parseFloat(newValues["Base_maior"]);
    var b1 = parseFloat(newValues["Base_menor"]);
    var a = parseFloat(newValues["Altura"]);
    var c = parseFloat(newValues["Capacidade_caminhao"]);
    var cv = parseFloat(newValues["Capacidade_vagao"]);

    var vars = [
      p1,
      p2,
      Peso_vivo,
      Consumo_diario,
      MateriaSeca,
      n,
      Dias_para_tratar,
      Producao,
      ab,
      vd,
      hdt,
      d,
      s,
      vc,
      b2,
      b1,
      a,
      c,
      cv
    ];
    var nan = false;
    vars.forEach((item, index) => {
      if (isNaN(item)) {
        nan = true;
      }
    });

    if (nan) {
      return true;
    }

    let c1 = Peso_vivo * Consumo_diario * 0.01;
    let c2 = c1 * p2 * 0.01;
    let c3 = c2 / (MateriaSeca * 0.01);
    let c4 = n * Dias_para_tratar * c3 * 1.1 * 0.001;
    let c5 = c4 / Producao;
    let pm = ((ab * vd) / 10) * Producao;
    let dt = ((c4 / pm) * 1.15) / hdt;
    let vl = (c4 * 1000) / d / s;
    let aa = ((b1 + b2) * a) / 2;
    let ct = vl / aa;
    let ec = (c / ((pm * 1000) / d)) * 60;
    let tp = 2 * ((ds / vc) * 60) + 10;
    let nv = (c2 * n) / d / cv;
    let fd = ((c2 / d) * n) / aa;

    setFieldValue(
      "Numero_viagens",
      nv
        .toFixed(2)
        .toString()
        .toString()
    );
    setFieldValue("Fatia_diaria", fd.toFixed(2).toString());
    setFieldValue("Tempo_enchimento_caçamba", ec.toFixed(2).toString());
    setFieldValue("Tempo_percurso", tp.toFixed(2).toString());
    setFieldValue("Quantidade_caminhoes", (tp / ec).toFixed(0).toString());
    setFieldValue("Comprimento", ct.toFixed(2).toString());
    setFieldValue("Area", aa.toFixed(2).toString());
    setFieldValue("Volume_silo", vl.toFixed(2).toString());
    setFieldValue("Dias_de_trabalho", dt.toFixed(2).toString());
    setFieldValue("Producao_maquina", pm.toFixed(2).toString());
    setFieldValue(
      "Consumo_med_massa_seca_por_cabeça_dia",
      c1.toFixed(2).toString()
    );
    setFieldValue(
      "Consumo_med_massa_seca_de_silagem_por_cabeça_dia",
      c2.toFixed(2).toString()
    );
    setFieldValue(
      "Consumo_med_massa_verde_por_cabeça_dia",
      c3.toFixed(2).toString()
    );
    setFieldValue("Quantia_total_massa_verde_ton", c4.toFixed(2).toString());
    setFieldValue("Area_plantada", c5.toFixed(2).toString());
    setFieldValue(
      "calculopronto",
      (!(values["calculopronto"] == "true")).toString()
    );
    setFieldValue("calculo_date", new Date().toISOString().slice(0, 10));
    return false;
  };

  pdfCreate = () => {
    calculopronto = true;
    console.log(state.length);

    if (calc()) {
      calculopronto = false;
      return Alert.alert("Preencha todos os campos anteriores.");
    }

    if (state.length == 0) {
      calculopronto = false;
      setNoProperty(true);
      return;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SCLAlert
          onRequestClose={changeNoPropertyValue}
          show={noProperty}
          title="Sem Propriedade"
          theme="info"
          subtitle="Você ainda nao tem uma propriedade, deseja criá-la?"
          headerIconComponent={
            <Icon name="ios-information" size={50} color="#fff" />
          }
        >
          <SCLAlertButton theme="info" onPress={makeProperty}>
            Criar Propriedade
          </SCLAlertButton>

          <SCLAlertButton theme="default" onPress={changeNoPropertyValue}>
            Voltar
          </SCLAlertButton>
        </SCLAlert>

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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: Dimensions.get("screen").width
            }}
          >
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={pdfCreate}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Salvar</Text>
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
    Capacidade_vagao: ""
  }),
  validationSchema: Yup.object().shape({
    Capacidade_vagao: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),
  handleSubmit: () => {}
})(livestock);

function getValuesPronto() {
  let values = {
    Abertura_da_colhedora: "2.2",
    Altura: "3",
    Area: "",
    Base_maior: "8",
    Base_menor: "6",
    Capacidade_caminhao: "12",
    Capacidade_vagao: "10",
    Comprimento: "",
    Consumo_diario_porcentagem: 2.4,
    Cultura_forrageira: "Milho",
    Densidade: "650",
    Distancia_silo: "15",
    Ganho_de_peso: 750,
    Horas_diaria_trabalho: "8",
    Numero_de_cabeças: "3000",
    Numero_de_dias_para_tratar: "100",
    Percentagem_concentrado: 50,
    Percentagem_volumoso: 50,
    Performance_produtiva_animal: "Média performance produtiva",
    Peso_vivo: 350,
    Porcentagem_materia_seca: "35",
    Producao: "40",
    Quantidade_silo: "7",
    Velocidade_caminhao: "30",
    Velocidade_de_deslocamento: "5",
    Volume_silo: ""
  };
  return values;
}
