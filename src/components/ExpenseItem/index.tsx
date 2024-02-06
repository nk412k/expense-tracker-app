import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ExpenseType } from '../../stores/types';

import {
  ExpenseAmount,
  ExpenseDate,
  ExpenseItemContainer,
  ExpenseItemPressable,
  ExpenseTitle,
  TitleAndDateContainer,
} from './styledComponents';

interface Props {
  expenseItem: ExpenseType;
}

type RootStackParamList = {
  ManageExpenses: { expenseId: string };
};

const ExpenseItem = (props: Props): React.ReactElement => {
  const {
    expenseItem: { id, description, amount, date },
  } = props;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onClickExpenseItem = () => {
    navigation.navigate('ManageExpenses', { expenseId: id as string });
  };

  return (
    <ExpenseItemContainer>
      <ExpenseItemPressable
        onPress={onClickExpenseItem}
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      >
        <TitleAndDateContainer>
          <ExpenseTitle>{description}</ExpenseTitle>
          <ExpenseDate>
            {date.toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </ExpenseDate>
        </TitleAndDateContainer>
        <ExpenseAmount>{amount}</ExpenseAmount>
      </ExpenseItemPressable>
    </ExpenseItemContainer>
  );
};

export default ExpenseItem;
