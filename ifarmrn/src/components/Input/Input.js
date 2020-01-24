import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Fumi } from "react-native-textinput-effects";
import styles from "./styles";
import { Color } from "../../constants/routes";
import EntypoIcon from "@expo/vector-icons/Entypo";

function Input(props) {
  const [textValue, setTextValue] = useState("");
  const name1 =
    typeof props.title !== "undefined"
      ? props.title
      : props.name.replace(/_/g, " ");

  useEffect(() => {
    setTextValue(props.value);
  }, [props.value]);

  return (
    <View pointerEvents={props.editable ? "none" : "auto"}>
      <Fumi
        {...props}
        passiveIconColor={Color.greenLight}
        labelStyle={styles.label}
        style={styles.styleGeneral}
        inputStyle={styles.inputStyle}
        onChangeText={text => {
          text = text.replace(",", ".");
          setTextValue(text);
          props.props.setFieldValue(props.name, text);
        }}
        value={textValue}
        autoCompleteType={"off"}
        label={name1}
        autoCorrect={false}
        iconClass={EntypoIcon}
        iconColor={Color.green}
        iconSize={25}
        iconWidth={40}
        inputPadding={16}
      />

      <View style={styles.textView}>
        <Text style={styles.textAviso}>
          {props.optional ? "Opcional" : "Obrigatorio"}
        </Text>
        <Text style={styles.textError}>
          {props.props.touched[props.name] && props.props.errors[props.name]}
        </Text>
      </View>
    </View>
  );
}
export default Input;
