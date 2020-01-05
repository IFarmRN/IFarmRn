import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

import styles from "./styles";

export default function property(props) {
  const usersData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [nomeDaPropriedade, setNomeDaPropriedade] = useState(null);
  const [id, setId] = useState(null);

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
        <View style={styles.main} />
        <View style={styles.topView} />
        <ScrollView style={styles.scrollView}>
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
