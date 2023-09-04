import axios from "axios";

const BASE_URL = "https://reactcourse-2b772-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData, token) {
  const resonse = await axios.post(
    BASE_URL + "/expenses.json?auth=" + token,
    expenseData
  );
  const id = resonse.data.name;
  return id;
}

export async function fetchExpenses(token) {
  const response = await axios.get(BASE_URL + "/expenses.json?auth=" + token);
  const expenses = [];
  for (const key in response.data) {
    const expensObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expensObj);
  }
  return expenses;
}

export async function updateExpense(id, expenseData, token) {
  axios.put(BASE_URL + `/expenses/${id}.json?auth=` + token, expenseData);
}
export async function deleteExpense(id, token) {
  axios.delete(BASE_URL + `/expenses/${id}.json?auth=` + token);
}
