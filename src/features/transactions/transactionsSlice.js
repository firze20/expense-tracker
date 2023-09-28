import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES = [
  "housing",
  "food",
  "transportation",
  "utilities",
  "clothing",
  "healthcare",
  "personal",
  "education",
  "entertainment",
];
const initialState = Object.fromEntries(
  CATEGORIES.map((category) => [category, []])
);

//my slice

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { category } = action.payload;

      // Create a copy of the transactions array for the specified category
      const categoryTransactions = [...(state[category] || [])];

      // Add the new transaction to the categoryTransactions array
      categoryTransactions.push(action.payload);

      // Update the state with the new categoryTransactions array
      state[category] = categoryTransactions;
    },
    deleteTransaction: (state, action) => {
      const { category, id } = action.payload;

      // Find the index of the transaction to delete
      const deletedIndex = state[category]?.findIndex(
        (transaction) => transaction.id === id
      );

      if (deletedIndex !== -1) {
        // Create a new array without the deleted transaction
        const newTransactionsForCategory = state[category]?.filter(
          (item, index) => index !== deletedIndex
        );

        // Update the state with the new array
        state[category] = newTransactionsForCategory;
      }
    },
  },
});

export const addTransaction = (transaction) => {
  return {
    type: "transactions/addTransaction",
    payload: transaction,
  };
};

export const deleteTransaction = (transaction) => {
  return {
    type: "transactions/deleteTransaction",
    payload: transaction,
  };
};

export const selectTransactions = (state) => state.transactions;
export const selectFlattenedTransactions = (state) =>
  Object.values(state.transactions).reduce((a, b) => [...a, ...b], []);

export default transactionSlice.reducer;
