import axios from 'axios';

import { ExpenseType } from '../stores/types';

const FIREBASE_URL =
  'https://expense-tracker-app-107ba-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const storeExpense = async (data: ExpenseType) => {
  const response = await axios.post(`${FIREBASE_URL}expenses.json`, data);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(`${FIREBASE_URL}expenses.json`);
  const expenses = [];
  for (let key in response.data) {
    expenses.push({
      id: key,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      amount: response.data[key].amount,
    });
  }
  return expenses;
};

export const updateExpense = async (id: string, data: ExpenseType) => {
  return axios.put(`${FIREBASE_URL}expenses/${id}.json`, data);
};

export const deleteExpense = async (id: string) => {
  return axios.delete(`${FIREBASE_URL}expenses/${id}.json`);
};
