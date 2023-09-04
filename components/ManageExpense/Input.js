import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Input({ label, style, textInputConfig, invalid }) {
  let inputStyle = [styles.inputTextField];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.mainContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLbl]}>{label}</Text>
      <TextInput
        style={[inputStyle, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  inputTextField: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 5,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLbl: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
