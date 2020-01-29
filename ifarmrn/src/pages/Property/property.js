import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import * as Print from "expo-print";

import styles from "./styles";

export default function property(props) {
  const usersData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [nomeDaPropriedade, setNomeDaPropriedade] = useState(null);
  const [id, setId] = useState(null);
  const [scrollY] = useState(new Animated.Value(0));

  changeDelete = (nomeDaPropriedade = null, id = null) => {
    setConfirmDelete(!confirmDelete);
    setNomeDaPropriedade(nomeDaPropriedade);
    setId(id);
  };

  buttonPressed = () => {
    changeDelete();
  };

  doneButton = async id => {
    dispatch({ type: "REMOVE_DATA", id });

    changeDelete();
  };

  if (usersData.length > 0)
    return (
      <>
        <View style={[styles.main]} />
        <Animated.View
          style={[
            styles.topView,
            {
              marginTop: scrollY.interpolate({
                inputRange: [0, 80],
                outputRange: [80, 0],
                extrapolate: "clamp"
              })
            }
          ]}
        />
        <ScrollView
          scrollEventThrottle={20}
          style={styles.scrollView}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
        >
          <SCLAlert
            onRequestClose={() => changeDelete()}
            show={confirmDelete}
            title="Excluir Propriedade"
            theme="danger"
            subtitle="Tem certeza que deseja excluir a propriedade?"
            headerIconComponent={
              <Icon name="trash-can-outline" size={32} color="#fff" />
            }
          >
            <SCLAlertButton theme="danger" onPress={() => doneButton(id)}>
              {`Excluir ${nomeDaPropriedade}`}
            </SCLAlertButton>

            <SCLAlertButton theme="default" onPress={() => changeDelete()}>
              Cancelar
            </SCLAlertButton>
          </SCLAlert>
          {usersData.map((data, index) => {
            const {
              Contato,
              Foto,
              Proprietario,
              Nome_da_Propriedade
            } = data.usersData;
            const { day, month, year, time } = data.Date;

            return (
              <View key={index} style={styles.userContainer}>
                <View style={styles.viewImage}>
                  {Foto != "" ? (
                    <>
                      <Image
                        source={{ uri: Foto }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      <Icon
                        name="close-circle-outline"
                        color={"#F34336"}
                        size={35}
                        style={styles.icon}
                        onPress={() =>
                          changeDelete(Nome_da_Propriedade, data.id)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Icon
                        name="close-circle-outline"
                        color={"#F34336"}
                        size={35}
                        style={styles.icon}
                        onPress={() =>
                          changeDelete(Nome_da_Propriedade, data.id)
                        }
                      />
                      <Icon
                        name="image-off"
                        color={"rgba(0,0,0,0.4)"}
                        size={35}
                        style={styles.iconNoPhoto}
                      />
                    </>
                  )}
                </View>
                <Text style={styles.title}>{Nome_da_Propriedade}</Text>
                <Text style={styles.text}>{Proprietario}</Text>

                <View style={styles.row}>
                  <Text style={styles.text}>{Contato}</Text>
                  <Text
                    style={styles.text}
                  >{`${day}/${month}/${year}, ${time}`}</Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    props.navigation.navigate("Register", { id: data.id })
                  }
                >
                  <Text style={styles.buttonText}>EDITAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    values = data.confinamento || null;
                    if (values != null) {
                      values = { ...values, ...data.usersData };

                      let html = getHtml(values);

                      Print.printAsync({ html: html, width: 595, height: 842 });
                    } else {
                      global.dropDownAlertRef.alertWithType(
                        "error",
                        "error",
                        "Salve os dados na Tela de Confinamento para poder imprimir"
                      );
                    }
                  }}
                >
                  <Text style={styles.buttonText}>IMPRIMIR</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </>
    );

  return (
    <>
      <Text style={styles.textNoData}>
        Nenhuma propriedade adicionada ainda
      </Text>
      <View style={styles.viewNoData}>
        <Icon
          name="weather-night"
          size={Dimensions.get("screen").width * 0.4}
          color="rgba(0,0,0,0.2)"
        />
      </View>
    </>
  );
}

function getHtml(values) {
  return `<html>

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
        <h5 style="float: right">${values["calculo_date"]}</h5>
        <h2>Fazenda: ${values["Nome_da_Propriedade"]}</h2>
        <h5>Proprietario: ${values["Proprietario"]}</h5>
        <h5>Contato: ${values["Contato"]}</h5>
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
          <h3>Quantiade de caminhões:</h3>
          <h4>${values["Quantidade_caminhoes"]}</h4>
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

    </html>`;
}
