import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Fumi } from "react-native-textinput-effects";
import styles from "./styles";
import { Color } from "../../constants/routes";
import EntypoIcon from "@expo/vector-icons/Entypo";

function Input(props) {
  const [textValue, setTextValue] = useState("");
  const name1 = typeof props.title !== "undefined" ? props.title : props.name.replace(/_/g, " ");

  return (
    <View pointerEvents={props.editable ? "none" : "auto"}>
      <Fumi
        {...props}
        passiveIconColor={Color.greenLight}
        labelStyle={styles.label}
        style={styles.styleGeneral}
        inputStyle={styles.inputStyle}
        onChangeText={async text => {
          setTextValue(text);
          await props.props.setFieldValue(props.name, text);
        }}
        value={props.value || props.props.values[props.name]
        }
        autoCompleteType={"off"}
        label={name1}
        autoCorrect={false}
        iconClass={EntypoIcon}
        iconColor={Color.green}
        iconSize={25}
        iconWidth={40}
        inputPadding={16}
      />

      <Text style={styles.textError}>
        {props.props.touched[props.name] && props.props.errors[props.name]}
      </Text>
    </View>
  );
}
export default Input;
