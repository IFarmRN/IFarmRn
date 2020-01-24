import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import Input from "../../components/Input/Input";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
function livestock(props) {
  const { setFieldValue, values, handleSubmit, errors } = props;

  global.buttonSubmitted3 = async (screenName, key) => {
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
      await props.navigation.navigate(screenName, {
        values: newValues
      });

      return;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Colhedora</Text>

          <Input
            value={values["Abertura_da_colhedora"]}
            name="Abertura_da_colhedora (m)"
            title="Abertura da colhedora"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Velocidade_de_deslocamento"]}
            name="Velocidade_de_deslocamento"
            title="Velocidade da colhedora (Km/h)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Horas_diaria_trabalho"]}
            name="Horas_diaria_trabalho"
            title="Horas de trabalho diario (h)"
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
                  global.buttonSubmitted3("Livestock5", 4);
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  global.buttonSubmitted3("Livestock3", 2);
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
    Abertura_da_colhedora: "",
    Velocidade_de_deslocamento: "",
    Horas_diaria_trabalho: ""
  }),

  validationSchema: Yup.object().shape({
    Abertura_da_colhedora: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Velocidade_de_deslocamento: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Horas_diaria_trabalho: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),

  handleSubmit: () => {}
})(livestock);
