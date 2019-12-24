import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  main: {
    width,
    height,
    position: "absolute",
    backgroundColor: Color.greenDark,
    zIndex: 0
  },
  topView: {
    width,
    height,
    marginTop: 50,
    backgroundColor: Color.gray
  },
  container: {
    flex: 1,
    position: "absolute",
    marginTop: 15
  },
  title: {
    fontFamily: "Comfortaa",
    fontSize: 15
  },
  userContainer: {
    alignSelf: "center",
    borderRadius: 10,
    width: width * 0.8,
    height: height * 0.5,
    marginLeft: (width * 0.2) / 2,
    marginBottom: 20,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },

  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  text: {},
  title: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 17,
    fontFamily: "Comfortaa",
    color: "#222",
    marginVertical: 12
  }
});

export default styles;
