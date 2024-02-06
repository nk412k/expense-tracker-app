import { ExpenseType } from '../../stores/types';

import ExpenseItem from '../ExpenseItem';
import Title from '../Title';

import {
  EmptyExpenseContainer,
  EmptyExpenseText,
  ExpenseList,
  ScreenContainer,
} from './styledComponents';

interface Props {
  title: string;
  expenseList: ExpenseType[];
  fallBackText: string;
}

const ExpenseOutput = (props: Props) => {
  const { title, expenseList, fallBackText } = props;

  const renderExpenseItem = ({
    item,
  }: {
    item: ExpenseType;
  }): React.ReactElement => {
    return <ExpenseItem expenseItem={item} />;
  };

  const getTotalExpenses = (): number => {
    return expenseList.reduce(
      (total: number, expense: ExpenseType) => total + expense.amount,
      0
    );
  };

  const renderEmptyExpenseList = (): React.ReactElement => {
    return (
      <EmptyExpenseContainer>
        <EmptyExpenseText>{fallBackText}</EmptyExpenseText>
      </EmptyExpenseContainer>
    );
  };

  const renderExpenseList = (): React.ReactElement => {
    return expenseList.length > 0 ? (
      <ExpenseList data={expenseList} renderItem={renderExpenseItem} />
    ) : (
      renderEmptyExpenseList()
    );
  };

  return (
    <ScreenContainer>
      <Title title={title} amount={getTotalExpenses()} />
      {renderExpenseList()}
    </ScreenContainer>
  );
};

export default ExpenseOutput;
