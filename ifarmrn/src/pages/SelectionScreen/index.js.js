import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReactNativeItemSelect from "react-native-item-select";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../../constants/routes";
import { updateUser } from "../../store/actions/userActions";
import styles from "./styles";

function SelectionScreen(props) {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const onSubmit = item => {
    const params = props.navigation.getParam("values");

    const ACTION_UPDATE = updateUser(item.usersData, item, params);

    dispatch(ACTION_UPDATE);

    props.navigation.navigate("Property");
  };

  return (
    <ScrollView style={styles.container}>
      <ReactNativeItemSelect
        data={userData}
        itemComponent={item => <ItemComponent item={item} />}
        onSubmit={item => onSubmit(item)}
        styles={{
          activeItemBoxHighlight: {
            backgroundColor: "rgba(77,175,80,0.3)",
            borderColor: Color.greenDark
          },
          btn: { backgroundColor: Color.greenDark }
        }}
        submitBtnTitle="Salvar"
        countPerRow={1}
      />
    </ScrollView>
  );
}

const ItemComponent = item => {
  const { Nome_da_Propriedade, Foto } = item.item.usersData;

  return (
    <TouchableOpacity style={styles.viewItem} onPress={() => {}}>
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
    </TouchableOpacity>
  );
};

export default SelectionScreen;
