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
    const fromValues = props.navigation.getParam("values") || null;

    if (fromValues != null) {
      Object.keys(fromValues).map(function(key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []);

  buttonSubmitted = () => {
    handleSubmit();
  };

  useEffect(() => {
    switch (values["Cultura_forrageira"]) {
      case "Milho":
        setFieldValue("Producao", "40");
        setFieldValue("Densidade", "650");
        setFieldValue("Porcentagem_materia_seca", "35");
        break;
      case "Sorgo Forrageiro":
        setFieldValue("Producao", "55");
        setFieldValue("Densidade", "600");
        setFieldValue("Porcentagem_materia_seca", "33");
        break;
      case "Capim Elefante":
        setFieldValue("Producao", "70");
        setFieldValue("Densidade", "420");
        setFieldValue("Porcentagem_materia_seca", "");
        break;
      default:
        setFieldValue("Producao", "");
        setFieldValue("Densidade", "");
        setFieldValue("Porcentagem_materia_seca", "");
        break;
    }
  }, [values["Cultura_forrageira"]]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Dados da cultura forrageira</Text>

          <DropdownList
            value={values["Cultura_forrageira"]}
            title="Cultura forrageira"
            name="Cultura_forrageira"
            data={[
              { value: "Milho" },
              { value: "Sorgo Forrageiro" },
              { value: "Capim Elefante" },
              { value: "Mombamça" },
              { value: "Tanzânia" },
              { value: "Branquiária" },
              { value: "Cana-de-açucar" }
            ]}
            props={props}
          />
          <Input
            value={values["Producao"]}
            name="Producao"
            title="Produção (ton/ha)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Densidade"]}
            name="Densidade"
            title="Densidade (Kg/m³)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Porcentagem_materia_seca"]}
            name="Porcentagem_materia_seca"
            title="% de matéria seca"
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
                  buttonSubmitted();
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Livestock2", { values })
                }
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
    Cultura_forrageira: "",
    Producao: "",
    Densidade: "",
    Porcentagem_materia_seca: ""
  }),

  validationSchema: Yup.object().shape({
    Cultura_forrageira: Yup.string("Erro").required("Não esqueça de preencher"),

    Producao: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),

    Densidade: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher"),

    Porcentagem_materia_seca: Yup.number(
      "Use apenas numeros e ponto no lugar de virgula"
    ).required("Não esqueça de preencher")
  }),

  handleSubmit: (values, { props }) => {
    props.navigation.navigate("Livestock2", { values });
  }
})(livestock);
