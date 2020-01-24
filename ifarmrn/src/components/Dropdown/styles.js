import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    textAlign: "center",
    color: Color.green,
    marginBottom: 10,
    fontSize: 16
  },
  textError: {
    color: "red",
    marginHorizontal: Dimensions.get("screen").width * 0.09,
    fontSize: 13,
    marginBottom: 10
  },
  textAviso: {
    color: Color.greenLight,
    fontSize: 13
  },
  picker: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 3,
    elevation: 3
  },
  itemPicker: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 5
  }
});

export default styles;
