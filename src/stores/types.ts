export interface ExpenseType {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

export enum ActionType {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  SET = 'SET',
}
