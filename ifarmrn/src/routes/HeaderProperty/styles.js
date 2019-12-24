import { Color } from "../../constants/routes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20
  },
  container: {
    backgroundColor: Color.green
  },
  text: {
    marginTop: 20,
    marginRight: 32,
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Comfortaa",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  row: { flexDirection: "row", backgroundColor: Color.greenDark }
});

export default styles;
