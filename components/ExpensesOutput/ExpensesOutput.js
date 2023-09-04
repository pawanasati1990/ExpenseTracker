import { View, StyleSheet, FlatList, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSymmary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/Styles";

function ExpensesOutput({ expenses, expensesPeriod, fallbacktext }) {
  let content = <Text style={styles.fallbacktext}>{fallbacktext}</Text>;
  if (expenses.length > 0) content = <ExpensesList expenses={expenses} />;
  return (
    <View style={styles.rootContainer}>
      <ExpensesSymmary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbacktext: {
    color: "white",
    fontSize: 17,
    marginTop: 50,
    textAlign: "center",
  },
});
