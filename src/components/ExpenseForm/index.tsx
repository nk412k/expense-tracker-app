import { useState } from 'react';

import { ExpenseType } from '../../stores/types';

import Input from '../Input';
import CustomButton from '../CustomButton';

import {
  ButtonContainer,
  ErrorMessage,
  ExpenseFormContainer,
  FormTitle,
  InputContainer,
} from './styledComponents';

interface Props {
  onSubmit: (expenseData: ExpenseType) => void;
  onCancel: () => void;
  isEditing: boolean;
  expenseData?: ExpenseType;
}

const ExpenseForm = (props: Props): React.ReactElement => {
  const { onCancel, onSubmit, isEditing, expenseData } = props;

  const [formData, setFormData] = useState({
    amount: { value: expenseData?.amount?.toString() || '', isValid: true },
    date: {
      value: expenseData?.date?.toISOString().slice(0, 10) || '',
      isValid: true,
    },
    description: { value: expenseData?.description || '', isValid: true },
  });

  const isFormInValid = (): boolean => {
    return (
      !formData.amount.isValid ||
      !formData.date.isValid ||
      !formData.description.isValid
    );
  };

  const onChangeInput = (inputField: string, inputValue: string) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [inputField]: { value: inputValue, isValid: true },
      };
    });
  };

  const onSubmitForm = (): void => {
    const expenseData = {
      amount: +formData.amount.value,
      date: new Date(formData.date.value),
      description: formData.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setFormData((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <ExpenseFormContainer>
      <FormTitle>{isEditing ? 'Your Expense' : 'Add Expense'}</FormTitle>
      <InputContainer>
        <Input
          label='Amount'
          inputConfig={{
            onChangeText: (value: string) => onChangeInput('amount', value),
            value: formData.amount.value,
            keyborderType: 'number-pad',
          }}
          isValid={formData.amount.isValid}
          inputStyles={{ marginRight: 10, flex: 1 }}
        />
        <Input
          label='Date'
          inputConfig={{
            onChangeText: (value: string) => onChangeInput('date', value),
            value: formData.date.value,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
          }}
          isValid={formData.date.isValid}
          inputStyles={{ flex: 1 }}
        />
      </InputContainer>
      <Input
        label='Description'
        inputConfig={{
          multiline: true,
          onChangeText: (value: string) => onChangeInput('description', value),
          value: formData.description.value,
        }}
        isValid={formData.description.isValid}
      />
      {isFormInValid() ? (
        <ErrorMessage>
          Invalid input, Please check your input values
        </ErrorMessage>
      ) : null}
      <ButtonContainer>
        <CustomButton onPress={onCancel} buttonText='Cancel' />
        <CustomButton
          onPress={onSubmitForm}
          isFilledButton={true}
          buttonText={isEditing ? 'Update' : 'Add'}
        />
      </ButtonContainer>
    </ExpenseFormContainer>
  );
};

export default ExpenseForm;
