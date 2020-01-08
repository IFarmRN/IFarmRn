import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import styles from "./styles";

function Index(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{global.currentScreenIndex}</Text>
    </View>
  );
}

export default Index;
