import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image
} from "react-native";
import { Color } from "../../../constants/routes";

import Input from "../../../components/Input/Input";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import styles from "./styles";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function InputImage(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {}, []);

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const responseImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
    });

    const { uri, cancelled } = responseImage;
    if (!cancelled) {
      setImage(uri);
    }
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync();

    if (!cancelled) {
      setImage(uri);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.changeModal();
        }}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.imageBorder}>
              <Image style={styles.image} source={{ uri: image }} />
              {image != null && (
                <Icon
                  name="close-circle-outline"
                  color={Color.greenDark}
                  size={35}
                  style={styles.icon}
                  onPress={() => setImage(null)}
                />
              )}
            </View>

            <View style={styles.viewRow}>
              <TouchableOpacity
                onPress={this.takePicture}
                style={[styles.buttonPhoto, { marginRight: 5 }]}
              >
                <Text style={styles.textButton}>Abrir Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonPhoto}
                onPress={this.selectPicture}
              >
                <Text style={styles.textButton}>Abrir Galeria</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                props.changeModal();
                props.props.setFieldValue("Foto", image);
              }}
              style={[styles.buttonSave]}
            >
              <Text style={styles.textButtonSave}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
