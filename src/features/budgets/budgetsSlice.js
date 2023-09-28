import { createSlice } from "@reduxjs/toolkit";
import {produce} from "immer";


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
  const initialState = CATEGORIES.map((category) => ({
    category: category,
    amount: 0,
  }));

  //my slice
  const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
      editBudget: (state, action) => {
        const { category, amount } = action.payload;
  
        // Use immer's produce function to update the state immutably
        produce(state, (draftState) => {
          const budgetToEdit = draftState.find((budget) => budget.category === category);
          if (budgetToEdit) {
            budgetToEdit.amount = amount;
          }
        });
      },
    },
  });
  
  
  export const selectBudgets = (state) => state.budgets;
  export const {editBudget} = budgetSlice.actions;
  export default budgetSlice.reducer;
  