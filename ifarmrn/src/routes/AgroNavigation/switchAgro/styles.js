import { Dimensions, StyleSheet } from "react-native";

import { Color } from "../../../constants/routes";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  drawerHeader: {
    width: "100%",
    height: 200,
    backgroundColor: Color.green,
    marginBottom: 15
  },
  line: {
    width: "100%",
    height: 2,
    marginTop: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginVertical: 20
  },
  sectionTitle: {
    color: "rgb(10,10,10)",
    fontSize: 17
  },
  section: {
    marginLeft: 23
  },
  drawerTitle: {
    alignSelf: "center",
    paddingTop: 75,
    fontSize: 50,
    color: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: Color.gray
  },
  menuItem: {
    flexDirection: "row"
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: "300",
    margin: 15
  },
  menuItem: {
    flexDirection: "row"
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: 15
  }
});

export default styles;
