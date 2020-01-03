import React, { useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import Input from "../../components/Input/Input";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
function livestock(props) {
  const { setFieldValue, values, handleSubmit } = props;

  buttonSubmitted = async () => {
    handleSubmit();

    const boll = Object.entries(values).find(([item, value]) => {
      return value == "";
    });

    if (boll == undefined) {
      const user = AddUser(values);
      dispatch(user);

      props.navigation.navigate("Home");
    }
  };

  useEffect(() => {
    var Nc = values["Numero_de_cabeças"] !== null ? 0 : values["Numero_de_cabeças"];
    var Nd = values["Numero_de_dias_para_tratar"] !== null ? 0 : values["Numero_de_dias_para_tratar"];
    values["total"] = Nc + Nd;
  }, [values]);


  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Caracteristica da cultura</Text>
          <Input
            name="Numero_de_cabeças"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Numero_de_dias_para_tratar"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Text style={styles.text}>{`Soma : ${values["total"]}`}</Text>
          <Text style={styles.text}>{JSON.stringify(values)}</Text>
        </ScrollView>
      </View>
    </>
  );

}

export default withFormik({
  mapPropsToValues: () => ({
    Numero_de_cabeças: "",
    Numero_de_dias_para_tratar: "",
  }),

  validationSchema: Yup.object().shape(
    {

      Numero_de_cabeças: Yup.string(
        "O seu nome deve ser expressado apenas em letras"
      ).required("Não esqueça de preencher")
    }
  ),

  handleSubmit: (values, { props }) => {
    global.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "Dados cadastrados"
    );
  }
})(livestock);
