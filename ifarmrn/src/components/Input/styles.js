import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";
const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.gray,
    flex: 1
  },
  textError: {
    color: "red",
    fontSize: 13
  },
  styleGeneral: {
    color: "red",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 3,
    elevation: 3,
    width: width * 0.85,
    marginVertical: 12,
    borderRadius: 20,
    alignSelf: "center"
  },

  label: {
    color: Color.greenLight,
    marginLeft: 7
  },
  textAviso: {
    color: Color.greenLight,
    fontSize: 13
  },
  textView: {
    flexDirection: "row-reverse",
    marginHorizontal: width * 0.09,
    marginBottom: 10,
    justifyContent: "space-between"
  }
});

export default styles;
