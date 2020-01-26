import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, ScrollView } from "react-native";
import ReactNativeItemSelect from "react-native-item-select";
import styles from "./styles";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Color } from "../../constants/routes";

import { useSelector } from "react-redux";

function SelectionScreen() {
  const userData = useSelector(state => state.userData);

  return (
    <ScrollView style={styles.container}>
      <ReactNativeItemSelect
        data={userData}
        itemComponent={item => <ItemComponent item={item.usersData} />}
        onSubmit={item => console.log(item)}
        styles={{
          activeItemBoxHighlight: {
            backgroundColor: "rgba(77,175,80,0.3)",
            borderColor: Color.greenDark
          },
          btn: { backgroundColor: Color.greenDark }
        }}
        btnTxt="Salvar"
        countPerRow={1}
      />
    </ScrollView>
  );
}

const ItemComponent = item => {
  const { Nome_da_Propriedade, Foto } = item["item"];

  return (
    <View style={styles.viewItem}>
      {Foto == "" ? (
        <Icon
          name="image-off"
          color={"rgba(0,0,0,0.4)"}
          size={35}
          style={styles.iconNoPhoto}
        />
      ) : (
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={{ uri: Foto }}
        />
      )}
      <View style={styles.viewText}>
        <Text style={styles.text}>{Nome_da_Propriedade}</Text>
      </View>
    </View>
  );
};

export default SelectionScreen;
