import { StyleSheet } from "react-native";
import { Color } from "../../constants/routes";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.gray },
  viewItem: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  iconNoPhoto: {
    alignSelf: "center",
    marginTop: 60 - 35 / 2
  },
  text: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    color: Color.black,
    justifyContent: "center",
    height: 30,
    fontSize: 17
  },
  viewText: {
    justifyContent: "flex-end",
    flex: 1
  }
});

export default styles;
