import { Dimensions, StyleSheet } from "react-native";

/* import { Color } from `../../constants/routes`; */

const { width, height } = Dimensions.get(`screen`);

const styles = StyleSheet.create({
  container: {
    justifyContent: `center`,
    alignItems: `center`
  }
});

export default styles;
