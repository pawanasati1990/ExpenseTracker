import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getFormatedDate } from "../../utils/date";

function ExpenseForm({ submitBtnLbl, onCancel, onSubmit, defaultValue }) {
  const [inputs, setInputs] = useState({
    uid: {
      value: defaultValue ? defaultValue.uid.toString() : "",
      isValid: true,
    },
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormatedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enterValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enterValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      uid: +inputs.uid.value,
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    //Check data
    const uidIsValid = !isNaN(expenseData.uid);
    const amoutIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const desIsValid = expenseData.description.trim().length > 0;

    if (!uidIsValid || !amoutIsValid || !dateIsValid || !desIsValid) {
      setInputs((curreInput) => {
        return {
          uid: { value: curreInput.uid.value, isValid: uidIsValid },
          amount: { value: curreInput.amount.value, isValid: amoutIsValid },
          date: { value: curreInput.date.value, isValid: dateIsValid },
          description: {
            value: curreInput.description.value,
            isValid: desIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInValid =
    !inputs.uid.isValid ||
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.mainCotainer}>
      <Text style={styles.titleText}>Your Expennse</Text>
      <View style={styles.amoutnAndDateContainer}>
        <Input
          style={styles.inputRow}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            placeholder: "",
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.inputRow}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "date"),
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "description"),
          autoCorrect: false,
          multiline: true,
          placeholder: "",
          value: inputs.description.value,
          // autoCapitalize : "words"  //sentances is default
        }}
      />
      {formIsInValid && (
        <Text style={styles.textError}>
          Invalid input values - Please entered correct values
        </Text>
      )}
      <View style={styles.buttonMainContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitBtnLbl}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  mainCotainer: {
    marginBottom: 30,
    marginTop: 40,
  },
  buttonMainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  amoutnAndDateContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  inputRow: {
    flex: 1,
  },
  textError: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
  },
  textInput: {
    flexWrap: "wrap",
    width: 300,
    height: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderColor: GlobalStyles.colors.gray500,
    borderRadius: 6,
  },
});
