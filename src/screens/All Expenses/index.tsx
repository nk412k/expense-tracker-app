import { useContext } from 'react';

import ExpenseOutput from '../../components/ExpenseOutput';
import { ExpenseContext } from '../../stores/context/ExpenseContext';

const AllExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <ExpenseOutput
      title='Total'
      expenseList={expenseCtx.expenses}
      fallBackText='No registered expenses found!'
    />
  );
};

export default AllExpenses;
