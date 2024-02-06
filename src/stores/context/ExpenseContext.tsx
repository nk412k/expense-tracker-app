import { PropsWithChildren, createContext, useReducer } from 'react';

import { ActionType, ExpenseType } from '../types';

export interface Props extends PropsWithChildren {}

const { ADD, DELETE, UPDATE } = ActionType;

export const ExpenseContext = createContext({
  expenses: [] as ExpenseType[],
  addExpense: (expense: any) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, data: ExpenseType) => {},
});

const expenseReducer = (state: ExpenseType[], action: any) => {
  switch (action.type) {
    case ADD:
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
    case DELETE:
      return state.filter((expense) => expense.id !== action.payload);
    case UPDATE:
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpenseProvider = (props: Props) => {
  const { children } = props;

  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expenseData: ExpenseType) => {
    dispatch({ type: ADD, payload: expenseData });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: DELETE, payload: id });
  };

  const updateExpense = (id: string, data: ExpenseType) => {
    dispatch({ type: UPDATE, payload: { id, data } });
  };

  const value = {
    expenses: expenseState,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
