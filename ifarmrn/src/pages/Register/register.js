import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { withFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import Input from "../../components/Input/Input";
import DropdownAlert from "react-native-dropdownalert";
import ImagerPicker from "./Image/ImagerPicker";
import Loading from "../loading/loading";

function Register(props) {
  const [locatization, setLocalization] = useState({
    latitude: 0,
    altitude: 0
  });

  useEffect(() => {}, []);

  getLocale = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLocalization({
          latitude: position.coords.latitude,
          altitude: position.coords.longitude
        });
        props.setFieldValue("Localização", {
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

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 40 }} />
      {Input(props, "Nome_da_Propriedade")}
      {Input(props, "Proprietario", "user")}
      <TouchableOpacity onPress={() => getLocale()} activeOpacity={1}>
        {Input(
          props,
          "Localização",
          "user",
          false,
          locatization.altitude == 0
            ? ""
            : `alt.: ${parseFloat(
                JSON.stringify(locatization.altitude)
              ).toFixed(2)}     lat.: ${parseFloat(
                JSON.stringify(locatization.latitude)
              ).toFixed(2)}`
        )}
      </TouchableOpacity>
      {Input(props, "Hectares", "map", true)}
      {Input(props, "Contato", "mobile", true)}

      <ImagerPicker />
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    Nome_da_Propriedade: "",
    Proprietario: "",
    Localização: "",
    Hectares: "",
    Contato: ""
  }),
  /*
  validationSchema: Yup.object().shape({
    Contato: Yup.number("o contato deve possuir apenas números").required(
      "Não esqueça de preencher"
    ),
    Hectares: Yup.number("preencha somento com números").required(
      "Não esqueça de preencher"
    ),
    Nome_da_Propriedade: Yup.string(
      "O nome de sua propriedade deve ser expressado apenas em letras"
    ).required("Não esqueça de preencher"),
    Proprietario: Yup.string(
      "O seu nome deve ser expressado apenas em letras"
    ).required("Não esqueça de preencher"),
    Localização: Yup.object().required(
      "Aberte o botao de localizacao e aceite os termos"
    )
  }), */

  handleSubmit: values => {
    console.log(values);
    global.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "Dados cadastrados"
    );
  }
})(Register);
