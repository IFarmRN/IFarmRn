import { Color } from "../../../constants/routes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    backgroundColor: Color.gray,
    height: 80
  },
  text: {
    flex: 1,
    color: Color.green,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Comfortaa",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  row: {
    flexDirection: "row",
    backgroundColor: Color.gray,
    justifyContent: "space-between",
    marginTop: 20,
    marginRight: 15,
    marginLeft: 5
  },
  textHome: { alignSelf: "center", color: Color.green, fontSize: 15 }
});

export default styles;
