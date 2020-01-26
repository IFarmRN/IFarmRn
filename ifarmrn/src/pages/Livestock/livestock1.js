import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import Input from "../../components/Input/Input";
import DropdownList from "../../components/Dropdown/Dropdown";

import { withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";

function livestock(props) {
  const { setFieldValue, values, errors, handleSubmit } = props;

  const [dataPeso, setDataPeso] = useState([]);
  const [count, setCount] = useState(0);

  global.buttonSubmitted0 = async (screenName, key) => {
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

  /*    useEffect(() => {
    const fromValues = props.navigation.getParam("values") || null;

    if (fromValues != null) {
      Object.keys(fromValues).map(function(key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []); */

  useEffect(() => {
    dataPeso.forEach(element => {
      if (element["value"] === values["Ganho_de_peso"])
        setFieldValue("Consumo_diario_porcentagem", element["consumo"]);
    });
    setFieldValue("Ganho_de_peso", values["Ganho_de_peso"]);
  }, [values["Ganho_de_peso"]]);

  useEffect(() => {
    let peso = values["Peso_vivo"];

    if (count < 2) {
      setCount(count + 1);
    } else {
      setFieldValue("Ganho_de_peso", "");
      setFieldValue("Consumo_diario_porcentagem", "");
    }

    switch (peso) {
      case 250:
        setDataPeso([
          { value: 0.0, consumo: 1.8 },
          { value: 500, consumo: 2.5 },
          { value: 750, consumo: 2.6 },
          { value: 1000, consumo: 2.6 }
        ]);
        break;
      case 300:
        setDataPeso([
          { value: 0.0, consumo: 1.7 },
          { value: 500, consumo: 2.3 },
          { value: 750, consumo: 2.5 },
          { value: 1000, consumo: 2.5 }
        ]);
        break;
      case 350:
        setDataPeso([
          { value: 0.0, consumo: 1.6 },
          { value: 500, consumo: 2.3 },
          { value: 750, consumo: 2.4 },
          { value: 1000, consumo: 2.4 },
          { value: 1200, consumo: 2.4 }
        ]);
        break;
      case 400:
        setDataPeso([
          { value: 0.0, consumo: 1.6 },
          { value: 500, consumo: 2.3 },
          { value: 750, consumo: 2.3 },
          { value: 1000, consumo: 2.3 },
          { value: 1300, consumo: 2.3 }
        ]);
        break;
      case 450:
        setDataPeso([
          { value: 0.0, consumo: 1.5 },
          { value: 750, consumo: 2.2 },
          { value: 1000, consumo: 2.3 },
          { value: 1300, consumo: 2.2 }
        ]);
        break;
      case 500:
        setDataPeso([
          { value: 0.0, consumo: 1.5 },
          { value: 750, consumo: 2.2 },
          { value: 1000, consumo: 2.2 },
          { value: 1300, consumo: 2.2 },
          { value: 1400, consumo: 2.1 }
        ]);
        break;
      default:
        setDataPeso([{ value: "Escolha um peso primeiro" }]);
        break;
    }
  }, [values["Peso_vivo"]]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Caracteristicas do confinamento</Text>
          <Input
            value={values["Numero_de_cabeças"]}
            name="Numero_de_cabeças"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            value={values["Numero_de_dias_para_tratar"]}
            name="Numero_de_dias_para_tratar"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <DropdownList
            value={values["Peso_vivo"]}
            name="Peso_vivo"
            title="Peso vivo (Kg)"
            data={[
              { value: 250 },
              { value: 300 },
              { value: 350 },
              { value: 400 },
              { value: 450 },
              { value: 500 }
            ]}
            props={props}
          />
          <DropdownList
            value={values["Ganho_de_peso"]}
            title="Ganho de peso"
            name="Ganho_de_peso"
            data={dataPeso}
            props={props}
          />
          <Text
            style={styles.title}
          >{`Porcentagem de comsumo diario: ${values["Consumo_diario_porcentagem"]}`}</Text>
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
                  global.buttonSubmitted0("Livestock2", 1);
                }}
                style={[styles.button, { marginRight: 0 }]}
              >
                <Text style={styles.buttonText}>Próximo</Text>
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
    Numero_de_cabeças: "",
    Numero_de_dias_para_tratar: "",
    Peso_vivo: "",
    Ganho_de_peso: "",
    Consumo_diario_porcentagem: ""
  }),

  validationSchema: Yup.object().shape({
    Numero_de_cabeças: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Numero_de_dias_para_tratar: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Peso_vivo: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    ),
    Ganho_de_peso: Yup.number("Use apenas numeros").required(
      "Não esqueça de preencher"
    )
  }),
  handleSubmit: () => {}
})(livestock);
