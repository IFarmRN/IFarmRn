import React, { useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Picker, Dimensions } from "react-native";
import Input from "../../components/Input/Input";
import { Dropdown } from 'react-native-material-dropdown';
import { Color } from "../../constants/routes";

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




  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Caracteristica da cultura</Text>

          <Text style={styles.text}>Numero de cabeças de gado que irá tratar</Text>
          <Input
            name="Numero_de_cabeças"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Text style={styles.text}>Numero de cabeças que irá tratar</Text>
          <Input
            name="Numero_de_dias_para_tratar"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <View style={{ marginBottom: 20, width: Dimensions.get("screen").width, alignItems: "center", justifyContent: "center" }}>
            <View style={styles.picker}>
              <Dropdown
                pickerStyle={styles.itemPicker}
                containerStyle={{ width: (Dimensions.get("screen").width * 0.85) - 40 }}
                textColor={Color.green}
                label='Favorite Fruit'
                data={[{
                  value: 'Banana',
                }, {
                  value: 'Mango',
                }, {
                  value: 'Pear',
                }]}
                onChangeText={(value) =>
                  setFieldValue("animal", value)
                }
              />
            </View>
          </View>
          <Text style={styles.text}>{`Animal : ${values["animal"]}`}</Text>
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
