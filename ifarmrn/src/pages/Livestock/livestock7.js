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
import * as Print from 'expo-print';
import styles from "./styles";
var imprimir = false;
function livestock(props) {
  const { setFieldValue, handleSubmit, errors, values } = props;


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
      console.log(newValues);
    }
  };


  useEffect(() => {
    if (imprimir) {
      imprimir = false;

      const params = props.navigation.getParam("values") || null;
      const newValues = { ...params, ...values };
      let html = getHtml(newValues);
      Print.printAsync({ html: html, width: 595, height: 842 });

    }
  }, [values["calculopronto"]])

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

    //console.log("calculo var loaded");
    let c1 = Peso_vivo * Consumo_diario * 0.01;
    let c2 = c1 * p2 * 0.01;
    let c3 = c2 / (MateriaSeca * 0.01);
    let c4 = n * Dias_para_tratar * c3 * 1.1 * 0.001;
    let c5 = c4 / Producao;
    let pm = (((ab * vd) / 10) * Producao);
    let dt = (((c4 / pm) * 1.15) / hdt);
    let vl = ((c4 * 1000) / d / s);
    let aa = ((b1 + b2) * a) / 2;
    let ct = (vl / aa);
    let ec = ((c / ((pm * 1000) / d)) * 60);
    let tp = 2 * ((ds / vc) * 60) + 10;
    let nv = ((c2 * n) / d / cv);
    let fd = (((c2 / d) * n) / a);

    //console.log([c1, c2, c3, c4, pm, dt, vl, aa, ct, ec, tp, nv, fd])

    setFieldValue("Numero_viagens", nv.toFixed(2).toString().toString());
    setFieldValue("Fatia_diaria", fd.toFixed(2).toString());
    setFieldValue("Tempo_enchimento_caçamba", ec.toFixed(2).toString());
    setFieldValue("Tempo_percurso", tp.toFixed(2).toString());
    setFieldValue("Quantidade_caminhoes", (tp / ec).toFixed(0).toString());
    setFieldValue("Comprimento", ct.toFixed(2).toString());
    setFieldValue("Area", aa.toFixed(2).toString());
    setFieldValue("Volume_silo", vl.toFixed(2).toString());
    setFieldValue("Dias_de_trabalho", dt.toFixed(2).toString());
    setFieldValue("Producao_maquina", pm.toFixed(2).toString());
    setFieldValue("Consumo_med_massa_seca_por_cabeça_dia", c1.toFixed(2).toString());
    setFieldValue("Consumo_med_massa_seca_de_silagem_por_cabeça_dia", c2.toFixed(2).toString());
    setFieldValue("Consumo_med_massa_verde_por_cabeça_dia", c3.toFixed(2).toString());
    setFieldValue("Quantia_total_massa_verde_ton", c4.toFixed(2).toString());
    setFieldValue("Area_plantada", c5.toFixed(2).toString());
    setFieldValue("calculopronto", (!(values["calculopronto"] == "true")).toString());


  };

  pdfCreate = () => {
    imprimir = true;
    calc();

  }

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
                  pdfCreate();
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Imprimir</Text>
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
  handleSubmit: () => { }
})(livestock);

function getValuesPronto() {
  let values = {
    "Abertura_da_colhedora": "2.2",
    "Altura": "3",
    "Area": "",
    "Base_maior": "8",
    "Base_menor": "6",
    "Capacidade_caminhao": "12",
    "Capacidade_vagao": "10",
    "Comprimento": "",
    "Consumo_diario_porcentagem": 2.4,
    "Cultura_forrageira": "Milho",
    "Densidade": "650",
    "Distancia_silo": "15",
    "Ganho_de_peso": 750,
    "Horas_diaria_trabalho": "8",
    "Numero_de_cabeças": "3000",
    "Numero_de_dias_para_tratar": "100",
    "Percentagem_concentrado": 50,
    "Percentagem_volumoso": 50,
    "Performance_produtiva_animal": "Média performance produtiva",
    "Peso_vivo": 350,
    "Porcentagem_materia_seca": "35",
    "Producao": "40",
    "Quantidade_silo": "7",
    "Velocidade_caminhao": "30",
    "Velocidade_de_deslocamento": "5",
    "Volume_silo": "",
  };
  return values;
}

function getHtml(values) {

  return (
    `<html>

    <head>
      <style>
        body {
          height: 842;
          width: 595;
        }

        #container {
          height: 842;
          width: 595;
          padding-left: 50;
          padding-right: 50;
        }

        .line {
          width: 595;
          margin-right: 0;
          margin-bottom: 0;
          height: 1px;
          border-bottom: 5px solid #00ab44;
          position: relative;
        }

        .space {
          margin-top: 5;
        }

        h1 {
          font-size: 60;
          margin-top: 10;
          margin-bottom: 5;
          letter-spacing: 40;
          font-weight: bolder;
          text-align: center;
          color: #00ab44;
          font-family: "Comfortaa";
        }

        h2 {
          font-size: 16;
          margin-top: 10;
          margin-bottom: 5;
          font-weight: 600;
          text-align: left;
          color: #00ab44;

          font-family: "Comfortaa";
        }

        h3 {
          font-size: 14;
          margin-top: 3;
          margin-bottom: 1;
          font-weight: 600;
          text-align: left;
          color: #202020;
          font-family: "Comfortaa";
        }

        h4 {
          font-size: 12;
          margin-left: 10;
          margin-top: 1;
          margin-bottom: 4;
          font-weight: 600;
          text-align: left;
          color: #707070;
          font-family: "Comfortaa";
        }

        h5 {
          font-size: 12;
          margin-left: 0;
          margin-top: 5;
          margin-bottom: 5;
          font-weight: 600;
          text-align: left;
          color: #707070;
          font-family: "Comfortaa";
        }
      </style>

    </head>

    <body>
      <div id="container">
        <h1>IFARM</h1>
        <div class="line"></div>
        <h5 style="float: right">1 de janeiro de 2020</h5>
        <h2>${values["Nome_fazenda"]}</h2>
        <h5>${values["Proprietario_fazenda"]}</h5>
        <h5>${values["Contato_fazenda"]}</h5>
        <h5>${values["Localizacao_fazenda"]}</h5>
        <div class="space"></div>
        <div style="float: left; width: 45%; border-right: 2px solid #dcf7e6; padding-right: 20">
          <h2>Caracteristicas do confinamento</h2>
          <h3>Número de cabeças:</h3>
          <h4>${values["Numero_de_cabeças"]}</h4>
          <h3>Número de dias para tratar:</h3>
          <h4>${values["Numero_de_dias_para_tratar"]}</h4>
          <h3>Peso vivo (kg):</h3>
          <h4>${values["Peso_vivo"]}</h4>
          <h3>Ganho de peso (g/dia):</h3>
          <h4>${values["Ganho_de_peso"]}</h4>
          <h3>Consumo diário em % do peso vivo:</h3>
          <h4>${values["Consumo_diario_porcentagem"]}</h4>
          <div class="space"></div>
          <h2>Dados da cultura forrageira</h2>
          <h3>Cultura forrageira:</h3>
          <h4>${values["Cultura_forrageira"]}</h4>
          <h3>Produção (ton/ha):</h3>
          <h4>${values["Producao"]}</h4>
          <h3>Densidade (kg/m³):</h3>
          <h4>${values["Densidade"]}</h4>
          <h3>Porcentagem de matéria seca:</h3>
          <h4>${values["Porcentagem_materia_seca"]}</h4>
          <h3>Área plantada (ha):</h3>
          <h4>${values["Area_plantada"]}</h4>
          <div class="space"></div>
          <h2>Performance produtiva animal</h2>
          <h3>Performance:</h3>
          <h4>${values["Performance_produtiva_animal"]}</h4>
          <h3>Volumoso (%):</h3>
          <h4>${values["Percentagem_volumoso"]}</h4>
          <h3>Concentrado (%):</h3>
          <h4>${values["Percentagem_concentrado"]}</h4>
          <div class="space"></div>
          <h2>Necessidade de forragem por cabeça</h2>
          <h3>Consumo médio de massa seca por cabeça por dia (kg):</h3>
          <h4>${values["Consumo_med_massa_seca_por_cabeça_dia"]}</h4>
          <h3>Consumo médio de massa seca de silagem por cabeça por dia (kg):</h3>
          <h4>${values["Consumo_med_massa_seca_de_silagem_por_cabeça_dia"]}</h4>
          <h3>Consumo médio de massa vede por cabeça por dia (kg):</h3>
          <h4>${values["Consumo_med_massa_verde_por_cabeça_dia"]}</h4>
          <h3>Quantidade total de massa verde de silagem (ton):</h3>
          <h4>${values["Quantia_total_massa_verde_ton"]}</h4>
          <div class="space"></div>
        </div>
        <div style="float: right; width: 45%">
          <h2>Dados da colhedora</h2>
          <h3>Abertura da colhedora (m):</h3>
          <h4>${values["Abertura_da_colhedora"]}</h4>
          <h3>Velocidade da colhedora (Km/h):</h3>
          <h4>${values["Velocidade_de_deslocamento"]}</h4>
          <h3>Produção da máquina (ton/h):</h3>
          <h4>${values["Producao_maquina"]}</h4>
          <h3>Horas previstas de trabalho diário (h):</h3>
          <h4>${values["Horas_diaria_trabalho"]}</h4>
          <h3>Dias de trabalho:</h3>
          <h4>${values["Dias_de_trabalho"]}</h4>
          <div class="space"></div>
          <h2>Armazenamento (Silo Trincheira)</h2>
          <h3>Quantidade de silos:</h3>
          <h4>${values["Quantidade_silo"]}</h4>
          <h3>Base maior (m):</h3>
          <h4>${values["Base_maior"]}</h4>
          <h3>Base menor (m):</h3>
          <h4>${values["Base_menor"]}</h4>
          <h3>Altura (m):</h3>
          <h4>${values["Altura"]}</h4>
          <h3>Volume da silagem (m³):</h3>
          <h4>${values["Volume_silo"]}</h4>
          <h3>Comprimento (m):</h3>
          <h4>${values["Comprimento"]}</h4>
          <div class="space"></div>
          <h2>Transporte da massa verde</h2>
          <h3>Capacidade do caminhão (m³):</h3>
          <h4>${values["Capacidade_caminhao"]}</h4>
          <h3>Tempo de enchimento (min):</h3>
          <h4>${values["Tempo_enchimento_caçamba"]}</h4>
          <h3>Velocidade do caminhão (m):</h3>
          <h4>${values["Velocidade_caminhao"]}</h4>
          <h3>Distancia até o silo (km):</h3>
          <h4>${values["Distancia_silo"]}</h4>
          <h3>Tempo de percurso (min):</h3>
          <h4>${values["Tempo_percurso"]}</h4>
          <div class="space"></div>
          <h2>Distribuição de massa seca</h2>
          <h3>Fatia retirada diária (m):</h3>
          <h4>${values["Fatia_diaria"]}</h4>
          <h3>Capacidade do vagão misturador (m³):</h3>
          <h4>${values["Capacidade_vagao"]}</h4>
          <h3>Numero de viagens (m):</h3>
          <h4>${values["Numero_viagens"]}</h4>
        </div>
      </div>
    </body>

    </html>`
  )
}
