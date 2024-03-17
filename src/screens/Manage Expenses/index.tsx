import { ToastAndroid } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ExpenseContext } from '../../stores/context/ExpenseContext';
import { ExpenseType } from '../../stores/types';
import ExpenseForm from '../../components/ExpenseForm';
import IconButton from '../../components/IconButton';
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from '../../utils/networkUtils';
import LoadingOverlay from '../../components/LoadingOverlay';
import ErrorOverlay from '../../components/ErrorOverlay';

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const onDeleteExpense = async () => {
    try {
      setIsLoading(true);
      setError('');
      await deleteExpense(expenseId);
      expenseCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (err) {
      setError('Could not delete expense!');
    }
  };

  const onSubmitForm = async (expenseData: ExpenseType) => {
    if (isEditing) {
      try {
        setIsLoading(true);
        await updateExpense(expenseId, expenseData);
        expenseCtx.updateExpense(expenseId, expenseData);
        navigation.goBack();
      } catch (err) {
        setIsLoading(false);
        ToastAndroid.show('Could not update expense!', ToastAndroid.SHORT);
      }
    } else {
      try {
        setIsLoading(true);
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ id: id, ...expenseData });
        navigation.goBack();
      } catch (err) {
        setIsLoading(false);
        ToastAndroid.show('Could not add expense!', ToastAndroid.SHORT);
      }
    }
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

  if (error) {
    return <ErrorOverlay message={error} onRetry={onCancel} />;
  } else if (isLoading) {
    return <LoadingOverlay />;
  }

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
