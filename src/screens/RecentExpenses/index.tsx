import { useContext, useEffect, useState } from 'react';

import { ExpenseContext } from '../../stores/context/ExpenseContext';
import ExpenseOutput from '../../components/ExpenseOutput';
import { ExpenseType } from '../../stores/types';
import { getDateMinusDays } from '../../utils/dateUtils';
import { getExpenses } from '../../utils/networkUtils';
import ErrorOverlay from '../../components/ErrorOverlay';
import LoadingOverlay from '../../components/LoadingOverlay';

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getExpensesData();
  }, []);

  const getExpensesData = async () => {
    try {
      setError('');
      setIsLoading(true);
      const expenses = await getExpenses();
      expenseCtx.setExpenses(expenses);
    } catch (err) {
      setError('Could not fetch expenses!');
    }
    setIsLoading(false);
  };

  const getRecentExpenses = (): ExpenseType[] => {
    return expenseCtx.expenses.filter((eachExpense) => {
      const todayDate = new Date();
      const date7DaysAgo = getDateMinusDays(todayDate, 7);

      return eachExpense.date >= date7DaysAgo && eachExpense.date <= todayDate;
    });
  };

  if (error) {
    return <ErrorOverlay onRetry={getExpensesData} message={error} />;
  } else if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpenseOutput
      title='Last 7 Days'
      expenseList={getRecentExpenses()}
      fallBackText='No expenses registered for the last 7 days.'
    />
  );
};

export default RecentExpenses;
