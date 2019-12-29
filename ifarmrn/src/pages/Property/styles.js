import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../constants/routes";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  main: {
    width,
    height,
    position: "absolute",
    backgroundColor: Color.green
  },
  topView: {
    width,
    height,
    marginTop: 120,
    backgroundColor: Color.gray,
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  scrollView: {
    flex: 1
  },
  title: {
    fontFamily: "Comfortaa",
    fontSize: 15
  },
  userContainer: {
    alignSelf: "center",
    borderRadius: 20,
    flex: 1,
    /*   width: width * 0.8,
    height: height * 0.4, */
    marginVertical: 20,
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
  viewImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    width: width * 0.8,
    height: height * 0.2
  },
  icon: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 10,
    paddingTop: 10,
    padding: 40
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    opacity: 0.5
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 17,
    fontFamily: "Comfortaa",
    color: "#222",
    marginVertical: 12
  },

  button: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Color.green,
    alignItems: "center"
  },
  buttonText: {
    color: Color.green
  },

  textNoData: {
    textAlign: "center",
    color: "rgba(0,0,0,0.5)",
    marginTop: 70,
    fontSize: 23,
    marginHorizontal: 40,
    fontFamily: "Serif"
  },
  viewNoData: { alignItems: "center", justifyContent: "center", flex: 1 }
});

export default styles;
