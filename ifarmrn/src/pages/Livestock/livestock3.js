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

  global.buttonSubmitted2 = async (screenName, key) => {
    const valueArray = Object.entries(values);
    const params = props.navigation.getParam("values") || null;

    const empty = valueArray.find(([item, value]) => {
      return value != "";
    });

    //check if the values are empty
    if (empty == undefined) {
      global.KEY = key;
      await props.navigation.navigate(screenName);
      return;
    }

    handleSubmit();

    if (Object.keys(errors).length == 0) {
      global.KEY = key;
      const newValues = { ...params, ...values };

      const KEY = screenName.slice(
        screenName.indexOf("k") + 1,
        screenName.length
      );

      global.KEY = parseInt(KEY) - 1;
      await props.navigation.navigate(screenName, {
        values: newValues
      });
      return;
    }
  };

  useEffect(() => {
    switch (values["Performance_produtiva_animal"]) {
      case "Alta performance produtiva":
        setFieldValue("Percentagem_concentrado", 40);
        setFieldValue("Percentagem_volumoso", 60);

        break;
      case "Média performance produtiva":
        setFieldValue("Percentagem_concentrado", 50);
        setFieldValue("Percentagem_volumoso", 50);

        break;
      case "Baixa performance produtiva":
        setFieldValue("Percentagem_concentrado", 30);
        setFieldValue("Percentagem_volumoso", 70);

        break;
    }
  }, [values["Performance_produtiva_animal"]]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Performance produtiva do animal</Text>
          <DropdownList
            value={values["Performance_produtiva_animal"]}
            title="Performance produtiva animal"
            name="Performance_produtiva_animal"
            data={[
              { value: "Alta performance produtiva" },
              { value: "Média performance produtiva" },
              { value: "Baixa performance produtiva" }
            ]}
            props={props}
          />
          <Text
            style={styles.title}
          >{`Volumoso (%): ${values["Percentagem_volumoso"]}`}</Text>
          <Text
            style={styles.title}
          >{`Concentrado (%): ${values["Percentagem_concentrado"]}`}</Text>
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
                  global.buttonSubmitted2("Livestock4", 3);
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => global.buttonSubmitted2("Livestock2", 1)}
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
    Performance_produtiva_animal: "",
    Percentagem_concentrado: "",
    Percentagem_volumoso: ""
  }),
  validationSchema: Yup.object().shape({
    Performance_produtiva_animal: Yup.string().required(
      "Não esqueça de preencher"
    )
  }),

  handleSubmit: () => {}
})(livestock);
