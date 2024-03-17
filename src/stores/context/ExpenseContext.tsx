import { PropsWithChildren, createContext, useReducer } from 'react';

import { ActionType, ExpenseType } from '../types';

export interface Props extends PropsWithChildren {}

const { ADD, DELETE, UPDATE, SET } = ActionType;

export const ExpenseContext = createContext({
  expenses: [] as ExpenseType[],
  addExpense: (expense: ExpenseType) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, data: ExpenseType) => {},
  setExpenses: (expenses: ExpenseType[]) => {},
});

const expenseReducer = (state: ExpenseType[], action: any) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case ADD:
      return [{ ...action.payload }, ...state];
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

  const setExpenses = (expenses: ExpenseType[]) => {
    dispatch({ type: SET, payload: expenses });
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
    setExpenses,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
