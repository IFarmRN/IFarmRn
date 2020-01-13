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

import styles from "./styles";
function livestock(props) {
  const { setFieldValue, values, handleSubmit } = props;

  useEffect(() => {
    fromValues = props.navigation.getParam("values") || null;
    if (fromValues != null) {
      Object.keys(fromValues).map(function(key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []);

  useEffect(() => {
    let q = parseFloat(values["Quantia_total_massa_verde_ton"]);
    let d = parseFloat(values["Densidade"]);
    let s = parseFloat(values["Quantidade_silo"]);
    let v = ((q * 1000) / d / s).toFixed(2);

    if (!isNaN(v)) {
      setFieldValue("Volume_silo", v);
    }
  }, [values["Quantidade_silo"]]);

  useEffect(() => {
    let v = parseFloat(values["Volume_silo"]);
    let b2 = parseFloat(values["Base_maior"]);
    let b1 = parseFloat(values["Base_menor"]);
    let a = parseFloat(values["Altura"]);
    let aa = ((b1 + b2) * a) / 2;
    let c = (v / aa).toFixed(2);
    if (!isNaN(c) && !isNaN(aa)) {
      setFieldValue("Comprimento", c);
      setFieldValue("Area", aa.toFixed(2));
    }
  }, [
    values["Volume_silo"],
    values["Base_maior"],
    values["Base_menor"],
    values["Altura"]
  ]);

  buttonSubmitted = async () => {
    handleSubmit();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Colhedora</Text>

          <Input
            value={values["Quantidade_silo"]}
            name="Quantidade_silo"
            title="Quantidade de silo"
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
          <Text
            style={styles.title}
          >{`Volume da silagem (m³): ${values["Volume_silo"]}`}</Text>
          <Text
            style={styles.title}
          >{`Comprimento (m): ${values["Comprimento"]}`}</Text>
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
                  buttonSubmitted();
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.dispatch({
                    key: "Livestock3",
                    type: "ReplaceCurrentScreen",
                    routeName: "Livestock3",
                    params: { values: values }
                  });
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
    Quantidade_silo: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Base_maior: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Base_menor: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),
    Altura: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher")
  }),

  handleSubmit: (values, { props }) => {
    props.navigation.dispatch({
      key: "Livestock5",
      type: "ReplaceCurrentScreen",
      routeName: "Livestock5",
      params: { values: values }
    });
  }
})(livestock);
