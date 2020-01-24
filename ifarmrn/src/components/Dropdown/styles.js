import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";
const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  textError: {
    color: "red",
    fontSize: 13,
    marginBottom: 10
  },
  textAviso: {
    color: Color.greenLight,
    fontSize: 13
  },
  textView: {
    flexDirection: "row",
    marginHorizontal: width * 0.075,
    marginBottom: 10,
    justifyContent: "space-between"
  },

  picker: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginVertical: 12,

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
    borderRadius: 20
  }
});

export default styles;
