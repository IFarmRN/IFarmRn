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
  const { setFieldValue, values, handleSubmit, errors } = props;

  useEffect(() => {
    global.KEY = 1;
  }, []);

  useEffect(() => {
    global.KEY = 1;
  });

  global.buttonSubmitted1 = async screenName => {
    const valueArray = Object.entries(values);
    const params = props.navigation.getParam("values") || null;

    const empty = valueArray.find(([item, value]) => {
      return value != "";
    });

    //check if the values are empty
    if (empty == undefined) {
      await props.navigation.navigate(screenName);
      const KEY = screenName.slice(
        screenName.indexOf("k") + 1,
        screenName.length
      );

      global.KEY = parseInt(KEY) - 1;
      return;
    }

    handleSubmit();

    if (Object.keys(errors).length == 0) {
      const newValues = { ...params, ...values };

      await props.navigation.navigate(screenName, {
        values: newValues
      });
      const KEY = screenName.slice(
        screenName.indexOf("k") + 1,
        screenName.length
      );

      global.KEY = parseInt(KEY) - 1;
      return;
    }
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
                  global.buttonSubmitted1("Livestock3");
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => global.buttonSubmitted1("Livestock1")}
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
    Cultura_forrageira: Yup.string("Use apenas caracteres").required(
      "Não esqueça de preencher"
    ),
    Producao: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Densidade: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Porcentagem_materia_seca: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),

  handleSubmit: () => {}
})(livestock);
