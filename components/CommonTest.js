import { Text, View, StyleSheet } from "react-native";
function CommonTest({ item }) {
  return (
    <View style={styles.rootContainer}>
      <Text>{item}</Text>
    </View>
  );
}

export default CommonTest;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
});
