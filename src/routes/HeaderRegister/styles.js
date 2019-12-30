import { Color } from "../../constants/routes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20
  },
  container: {
    backgroundColor:  Color.gray ,
    height: 80,
  },
  text: {
    marginTop: 15,
    marginRight: 32,
    flex: 1,
    color: Color.green,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Comfortaa",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10
  },
  margin: {
    borderBottomWidth: 2,
    borderBottomColor: Color.green,
    marginHorizontal: 60,
    marginBottom:20,
  },
  row: { flexDirection: "row", backgroundColor: Color.gray }
});

export default styles;
