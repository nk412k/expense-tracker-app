import { RouteProp } from '@react-navigation/native';
import React, { useContext, useLayoutEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ExpenseContext } from '../../stores/context/ExpenseContext';
import { ExpenseType } from '../../stores/types';
import ExpenseForm from '../../components/ExpenseForm';
import IconButton from '../../components/IconButton';

import { ScreenContainer } from './styledComponents';

type ManageExpenseScreenRouteProp = RouteProp<
  { params: { expenseId: string } },
  'params'
>;

type ManageExpenseScreenNavigationProp = NativeStackNavigationProp<any>;

const ManageExpenses = ({
  navigation,
  route,
}: {
  navigation: ManageExpenseScreenNavigationProp;
  route: ManageExpenseScreenRouteProp;
}) => {
  const expenseCtx = useContext(ExpenseContext);

  const isEditing = !!route.params?.expenseId;

  const expenseId = route.params?.expenseId;

  const expenseData = expenseCtx.expenses.find(
    (eachExpense) => eachExpense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, []);

  const onDeleteExpense = (): void => {
    expenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  };

  const onSubmitForm = (expenseData: ExpenseType): void => {
    if (isEditing) {
      expenseCtx.updateExpense(expenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  const onCancel = (): void => {
    navigation.goBack();
  };

  const renderDeleteButton = (): React.ReactElement => {
    return (
      <IconButton
        iconName={'trash'}
        onPressIcon={onDeleteExpense}
        size={24}
        color={'red'}
      />
    );
  };

  return (
    <ScreenContainer>
      <ExpenseForm
        onSubmit={onSubmitForm}
        onCancel={onCancel}
        isEditing={isEditing}
        expenseData={expenseData}
      />
      {isEditing && renderDeleteButton()}
    </ScreenContainer>
  );
};

export default ManageExpenses;
