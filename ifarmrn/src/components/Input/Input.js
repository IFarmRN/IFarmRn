import React from "react";
import { Text } from "react-native";
import { Fumi } from "react-native-textinput-effects";
import styles from "./styles";
import { Color } from "../../constants/routes";
import EntypoIcon from "@expo/vector-icons/Entypo";

function Input(
  props,
  name = "default",
  iconName = "home",
  numeric = false,
  TextInputValue = ""
) {
  const name1 = name.replace(/_/g, " ");
  return (
    <>
      <Fumi
        passiveIconColor={Color.greenLight}
        labelStyle={styles.label}
        style={styles.styleGeneral}
        inputStyle={styles.inputStyle}
        onChangeText={text => {
          props.setFieldValue(name, text);
        }}
        keyboardType={numeric ? "numeric" : "email-address"}
        autoCompleteType={"off"}
        label={name1}
        value={TextInputValue || props.values[`${name}`]}
        autoCorrect={false}
        iconClass={EntypoIcon}
        iconName={iconName}
        iconColor={Color.green}
        iconSize={25}
        iconWidth={40}
        editable={name == "Localização" ? false : true}
        inputPadding={16}
      />
      <Text style={styles.textError}>
        {props.touched[`${name}`] && props.errors[`${name}`]}{" "}
      </Text>
    </>
  );
}
export default Input;
