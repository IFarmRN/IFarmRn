import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.green
  },
  text: {
    paddingTop: Dimensions.get("screen").height * 0.2,
    color: "#fff"
  }
});

export default styles;
