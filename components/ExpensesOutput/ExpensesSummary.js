import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function ExpensesSymmary({ expenses, periodName }) {
  const totalExpeenses = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0); //0 is starting value
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.priod}>{periodName}</Text>
      <Text style={styles.sum}>Rs: {totalExpeenses.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSymmary;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    alignItems: "center",
  },
  priod: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
