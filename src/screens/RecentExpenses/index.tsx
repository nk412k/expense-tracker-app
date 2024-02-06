import { useContext } from 'react';

import { ExpenseContext } from '../../stores/context/ExpenseContext';
import ExpenseOutput from '../../components/ExpenseOutput';
import { ExpenseType } from '../../stores/types';
import { getDateMinusDays } from '../../utils/dateUtils';

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);

  const getRecentExpenses = (): ExpenseType[] => {
    return expenseCtx.expenses.filter((eachExpense) => {
      const todayDate = new Date();
      const date7DaysAgo = getDateMinusDays(todayDate, 7);

      return eachExpense.date >= date7DaysAgo && eachExpense.date <= todayDate;
    });
  };
  return (
    <ExpenseOutput
      title='Last 7 Days'
      expenseList={getRecentExpenses()}
      fallBackText='No expenses registered for the last 7 days.'
    />
  );
};

export default RecentExpenses;
