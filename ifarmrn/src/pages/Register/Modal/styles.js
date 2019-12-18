import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../../constants/routes";

const styles = StyleSheet.create({
  modalView: {
    alignSelf: "center",
    flex: 1,
    backgroundColor: "#Fff",
    width: "90%",
    marginVertical: Dimensions.get("screen").height * 0.17,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Color.green,
    justifyContent: "center"
  },
  image: {
    flex: 1,
    borderRadius: 30
  },
  imageBorder: {
    borderWidth: 2,
    borderColor: Color.green,
    borderRadius: 30,
    borderStyle: "dotted",
    height: "55%",
    width: "85%",
    alignSelf: "center"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    opacity: 0.75
  },
  viewRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20
  },
  buttonPhoto: {
    backgroundColor: Color.greenDark,
    alignSelf: "center",
    borderRadius: 8,
    width: "46.5%",
    padding: 15
  },
  buttonSave: {
    backgroundColor: Color.greenDark,
    alignSelf: "center",
    width: "95%",
    borderRadius: 8,
    padding: 15,
    margin: 7
  },
  textButton: {
    fontSize: 15,
    fontFamily: "Comfortaa",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  textButtonSave: {
    fontSize: 20,
    fontFamily: "Comfortaa",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  icon: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 10,
    paddingTop: 10
  }
});

export default styles;
