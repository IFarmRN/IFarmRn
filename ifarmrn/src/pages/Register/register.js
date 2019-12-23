import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";

import { useSelector, useDispatch, useStore } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
import Input from "../../components/Input/Input";
import Loading from "../loading/loading";
import Modal from "./Modal/Modal";
import AddUser from "../../store/actions/userActions";

function Register(props) {
  const { setFieldValue, values, handleSubmit } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [locatization, setLocalization] = useState({
    latitude: 0,
    altitude: 0
  });

  getLocale = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLocalization({
          latitude: position.coords.latitude,
          altitude: position.coords.longitude
        });
        setFieldValue("Localização", {
          latitude: position.coords.latitude,
          altitude: position.coords.longitude
        });
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const dispatch = useDispatch();
  const data = useSelector(state => state);

  buttonSubmitted = async () => {
    const user = AddUser(values);
    dispatch(user);
    console.log(data);

    handleSubmit;
  };
  changeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 40 }} />

      <Input name="Proprietario" iconName="user" props={props} />

      <TouchableOpacity onPress={() => getLocale()} activeOpacity={1}>
        <Input
          name="Localização"
          iconName="location"
          props={props}
          editable={false}
          value={
            locatization.altitude == 0
              ? ""
              : `alt.: ${parseFloat(
                  JSON.stringify(locatization.altitude)
                ).toFixed(4)}...     lat.: ${parseFloat(
                  JSON.stringify(locatization.latitude)
                ).toFixed(4)}...`
          }
        />
      </TouchableOpacity>

      <Input
        name="Hectares"
        iconName="map"
        keyboardType="numeric"
        props={props}
      />

      <Input
        name="Contato"
        iconName="mobile"
        keyboardType="numeric"
        props={props}
      />

      <Input name="Nome_da_Propriedade" iconName="home" props={props} />

      <TouchableOpacity onPress={() => changeModal()} activeOpacity={1}>
        <Input
          props={props}
          name="Foto"
          iconName="camera"
          keyboardType="numeric"
          editable={false}
        />
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => {
            buttonSubmitted();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        changeModal={changeModal}
        props={props}
        modalVisible={modalVisible}
      />
    </ScrollView>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    Proprietario: "",
    Nome_da_Propriedade: "",
    Localização: "",
    Hectares: "",
    Contato: "",
    Foto: ""
  }),

  validationSchema: Yup.object().shape({
    Proprietario: Yup.string(
      "O seu nome deve ser expressado apenas em letras"
    ).required("Não esqueça de preencher"),
    Contato: Yup.number("o contato deve possuir apenas números").required(
      "Não esqueça de preencher"
    ),
    Hectares: Yup.number("preencha somento com números").required(
      "Não esqueça de preencher"
    ),
    Nome_da_Propriedade: Yup.string(
      "O nome de sua propriedade deve ser expressado apenas em letras"
    ).required("Não esqueça de preencher"),
    Localização: Yup.object().required(
      "Aberte o botao de localizacao e aceite os termos"
    ),
    Foto: Yup.string()
      .required("Escolha uma imagem ")
      .nullable("Escolha uma imagem ")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    global.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "Dados cadastrados"
    );

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  }
})(Register);
