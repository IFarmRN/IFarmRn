import { Dropdown } from 'react-native-material-dropdown';
import { View, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from "react";
import { Color } from "../../constants/routes";
import styles from "./styles";

function DropdownList(props) {
  const [textValue, setTextValue] = useState("");
  const label = typeof props.title !== "undefined" ? props.title : props.name.replace(/_/g, " ");

  return (
    <View pointerEvents={props.editable ? "none" : "auto"}>
      <View style={{ alignItems: "center", justifyContent: "center", width: Dimensions.get("screen").width }}>
        <View style={styles.picker}>
          <Dropdown
            value={props.value}
            itemTextStyle={{ fontWeight: 'bold', }}
            baseColor={Color.greenLight}
            pickerStyle={styles.itemPicker}
            containerStyle={{ width: (Dimensions.get("screen").width * 0.85) - 40 }}
            textColor={Color.green}
            label={label}
            data={props.data}
            onChangeText={async value => {
              setTextValue(value);
              await props.props.setFieldValue(props.name, value);
            }}
          />
        </View>
      </View>
      <Text style={styles.textError}>
        {props.props.touched[props.name] && props.props.errors[props.name]}
      </Text>
    </View>
  );
}
export default DropdownList;
