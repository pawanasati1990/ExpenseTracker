import { Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses_context";
import { getDateMinusDays } from "../utils/date";
import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetcheing] = useState(true);
  const [error, setError] = useState();
  const appCtx = useContext(AuthContext);
  const token = appCtx.token;

  useEffect(() => {
    async function getExpense() {
      setIsFetcheing(true);
      try {
        const expenses = await fetchExpenses(token);
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        console.log(error);
        setError("could not fetch data");
      }
      setIsFetcheing(false);
    }
    getExpense();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay msg={error} />;
  } else if (isFetching) {
    return <LoadingOverlay />;
  }

  const resentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={resentExpenses}
      expensesPeriod="Last 7 Days"
      fallbacktext="There is no expenses registred in last 7 days"
    />
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({});
