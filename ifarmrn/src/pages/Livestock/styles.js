import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.gray,
    flex: 1
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Comfortaa",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  button: {
    padding: 10,
    backgroundColor: Color.green,
    borderRadius: 30,
    width: 150,
    marginRight: 26,
    marginBottom: 20
  },
  buttonView: {
    flexDirection: "row-reverse",
    width: "100%"
  },
  title: {
    justifyContent: "center",
    textAlign: "center",
    color: Color.green,
    margin: 20,
    fontSize: 20,
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    color: Color.green,
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
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
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Comfortaa",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  button: {
    padding: 10,
    backgroundColor: Color.green,
    borderRadius: 30,
    width: 150,
    marginRight: 26,
    marginBottom: 20
  },
  buttonView: {
    flexDirection: "row-reverse",
    width: Dimensions.get("screen").width * 0.85,
    justifyContent: "space-between"
  },
});

export default styles;
