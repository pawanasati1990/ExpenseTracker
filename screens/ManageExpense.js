import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import IconButton from "../components/ui/IconButtons";
import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/expenses_context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

function ManageExpenses({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitted] = useState(false);
  const [error, setError] = useState();
  const appCtx = useContext(AuthContext);
  const token = appCtx.token;

  const editExpeseId = route.params?.expenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editExpeseId
  );
  const isEditting = !!editExpeseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  async function deleteExpenseHandler() {
    setIsSubmitted(true);
    try {
      await deleteExpense(editExpeseId, token);
      expensesCtx.deleteExpense(editExpeseId);
      navigation.goBack();
    } catch (error) {
      setIsSubmitted(false);
      setError("could not delete");
    }
  }
  async function submitHandler(expenseData) {
    try {
      if (isEditting) {
        setIsSubmitted(true);
        expensesCtx.updateExpense(editExpeseId, expenseData);
        await updateExpense(editExpeseId, expenseData, token);
      } else {
        setIsSubmitted(true);
        const id = await storeExpense(expenseData, token);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setIsSubmitted(false);
      setError("Could not fetch data please try again");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  if (error && !isSubmitting) {
    <ErrorOverlay msg={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitBtnLbl={isEditting ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        defaultValue={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deletContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },

  deletContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
