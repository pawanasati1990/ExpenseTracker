import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function ErrorOverlay({ msg, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}> An error occured</Text>
      <Text style={[styles.text, styles.msg]}> {msg}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  msg: {
    fontSize: 14,
  },
});
