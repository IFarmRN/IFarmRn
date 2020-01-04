import React, { useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Picker, Dimensions } from "react-native";
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
      Object.keys(fromValues).map(function (key, index) {
        setFieldValue(key, fromValues[key]);
      });
    }
  }, []);

  buttonSubmitted = async () => {
    handleSubmit();

    const boll = Object.entries(values).find(([item, value]) => {
      return value == "";
    });


    if (boll == undefined) {
      console.log("novo values: ");
      console.log(values);
      //props.navigation.navigate("Livestock1", [values]);
    }
  };




  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Dados da cultura forrageira</Text>
          <DropdownList
            title="Cultura forrageira"
            name="Cultura_forrageira"
            data={[
              { value: "Milho" },
              { value: "Sorgo Forrageiro" },
              { value: "Capim Elefante" },
            ]}
            props={props}
          />
          <Input
            name="Producao"
            title="Produção (ton/ha)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Densidade"
            title="Densidade (Kg/m³)"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <Input
            name="Porcentagem_materia_seca"
            title="% de matéria seca"
            iconName="calculator"
            keyboardType="numeric"
            props={props}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                buttonSubmitted();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
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
    Consumo_diario_porcentagem: "",
    Cultura_forrageira: "",
    Producao: "",
    Densidade: "",
    Porcentagem_materia_seca: "",
  }),

  validationSchema: Yup.object().shape(
    {

      Cultura_forrageira: Yup.string("Erro").required("Não esqueça de preencher"),

      Producao: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),

      Densidade: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),

      Porcentagem_materia_seca: Yup.number(
        "Precisa conter apenas numeros"
      ).required("Não esqueça de preencher"),

    }
  ),

  handleSubmit: (values, { props }) => { }
})(livestock);
