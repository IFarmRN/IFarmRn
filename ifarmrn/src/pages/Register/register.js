import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
import Input from "../../components/Input/Input";
import Loading from "../loading/loading";
import Modal from "./Modal/Modal";
import { AddUser, updateUser } from "../../store/actions/userActions";

var id = null;

function Register(props) {
  const { setFieldValue, values, handleSubmit } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [allUser, setAllUser] = useState({});

  const [locatization, setLocalization] = useState({
    latitude: 0,
    altitude: 0
  });

  let state = useSelector(state => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    id = props.navigation.getParam("id") || null;

    if (id != null) {
      (async () => {
        await setData();
        await getLocale();
        await setAllFieldValue();
      })();
    }
  }, []);


  setData = () => {
    const New = state.filter(value => {
      return value.id == id;
    });

    setUserData(New[0].usersData);
    setAllUser(New[0]);
  };

  setAllFieldValue = () => {
    setFieldValue("Foto", userData.Foto);
    setFieldValue("Hectares", userData.Hectares);
    setFieldValue("Contato", userData.Contato);
    setFieldValue("Proprietario", userData.Proprietario);
    setFieldValue("Nome_da_Propriedade", userData.Nome_da_Propriedade);
    setFieldValue("Localização", userData.Localização);
  };

  getLocale = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocalization({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setFieldValue("Localização", userData.Localização);
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  buttonSubmitted = () => {
    handleSubmit();

    const boll = Object.entries(values).find(([item, value]) => {
      return value == "";
    });

    if (boll == undefined || boll[0] == "Foto" || boll[0] == "Localização") {
      if (id != null) {
        const ACTION_UPDATE = updateUser(values, allUser);

        dispatch(ACTION_UPDATE);
      } else {
        const user = AddUser(values);
        dispatch(user);
        props.navigation.goBack();
      }

      global.dropDownAlertRef.alertWithType(
        "success",
        "Success",
        "Dados Salvos"
      );

      props.navigation.navigate("Property");
    }
  };

  changeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 40 }} />

      <Input
        value={userData.Proprietario || ""}
        name="Proprietario"
        iconName="user"
        props={props}
      />

      <TouchableOpacity onPress={() => getLocale()} activeOpacity={1}>
        <Input
          name="Localização"
          iconName="location"
          props={props}
          editable={false}
          value={
            locatization.altitude == 0
              ? ""
              : `lat.: ${parseFloat(
                  JSON.stringify(locatization.latitude)
                ).toFixed(4)}...     lon.: ${parseFloat(
                  JSON.stringify(locatization.longitude)
                ).toFixed(4)}...`
          }
        />
      </TouchableOpacity>

      <Input
        value={userData.Hectares}
        name="Hectares"
        iconName="map"
        keyboardType="numeric"
        props={props}
      />

      <Input
        value={userData.Contato || ""}
        name="Contato"
        iconName="mobile"
        keyboardType="phone-pad"
        props={props}
      />

      <Input
        name="Nome_da_Propriedade"
        iconName="home"
        props={props}
        value={userData.Nome_da_Propriedade || ""}
      />

      <TouchableOpacity onPress={() => changeModal()} activeOpacity={1}>
        <Input
          props={props}
          name="Foto"
          iconName="camera"
          keyboardType="numeric"
          editable={false}
          optional
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
        userImage={userData.Foto}
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
    Proprietario: Yup.string("Preencha somente com caracteres").required(
      "Não esqueça de preencher"
    ),
    Contato: Yup.number("o contato deve possuir apenas números").required(
      "Não esqueça de preencher"
    ),
    Hectares: Yup.number("preencha somento com números").required(
      "Não esqueça de preencher"
    ),
    Nome_da_Propriedade: Yup.string("Preencha somente com caracteres").required(
      "Não esqueça de preencher"
    ),
    Localização: Yup.object().required("Aberte o botao e aceite os termos"),
    Foto: Yup.string().nullable("Escolha uma imagem ")
  }),

  handleSubmit: values => {}
})(Register);
