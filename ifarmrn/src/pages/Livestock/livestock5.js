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
  const { values, handleSubmit, errors } = props;

  global.buttonSubmitted4 = async (screenName, key) => {
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
          <Text style={styles.title}>Armazenamento</Text>

          <Input
            value={values["Quantidade_silo"]}
            name="Quantidade_silo"
            title="Quantidade de silos"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />

          <Input
            value={values["Base_maior"]}
            name="Base_maior"
            title="Base maior (m)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Base_menor"]}
            name="Base_menor"
            title="Base menor (m)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Altura"]}
            name="Altura"
            title="Altura (m)"
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
                  global.buttonSubmitted4("Livestock6", 5);
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  global.buttonSubmitted4("Livestock4", 3);
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
    Quantidade_silo: "",
    Base_maior: "",
    Base_menor: "",
    Altura: "",
    Area: "",
    Volume_silo: "",
    Comprimento: ""
  }),

  validationSchema: Yup.object().shape({
    Quantidade_silo: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Base_maior: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Base_menor: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Altura: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),

  handleSubmit: () => {}
})(livestock);
