import { useState } from 'react';
import { Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [shouldShowDatePicker, setShouldShowDatePicker] = useState(false);

  const getInitialDate = (): Date => {
    if (isEditing && expenseData) {
      return expenseData.date;
    }
    return new Date();
  };

  const [formData, setFormData] = useState({
    amount: { value: expenseData?.amount?.toString() || '', isValid: true },
    date: {
      value: getInitialDate(),
      isValid: true,
    },
    description: { value: expenseData?.description || '', isValid: true },
  });

  const isFormInValid = (): boolean => {
    return !formData.amount.isValid || !formData.description.isValid;
  };

  const onChangeInput = (inputField: string, inputValue: string | Date) => {
    setShouldShowDatePicker(false);
    setFormData((prevState) => {
      return {
        ...prevState,
        [inputField]: { value: inputValue, isValid: true },
      };
    });
  };

  const onChangeDatePicker = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setFormData((prevState) => {
        return {
          ...prevState,
          date: { value: selectedDate, isValid: true },
        };
      });
    }
  };

  const onSubmitForm = (): void => {
    const expenseData = {
      amount: +formData.amount.value,
      date: new Date(formData.date.value),
      description: formData.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !descriptionIsValid) {
      setFormData((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: true },
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
        <Pressable
          onPress={() => setShouldShowDatePicker(true)}
          style={{ flex: 1 }}
        >
          <Input
            label='Date'
            inputConfig={{
              value: formData.date.value.toISOString().slice(0, 10),
              editable: false,
            }}
            isValid={formData.date.isValid}
          />
        </Pressable>
      </InputContainer>
      {shouldShowDatePicker && (
        <DateTimePicker
          value={formData.date.value}
          onChange={onChangeDatePicker}
        />
      )}

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
