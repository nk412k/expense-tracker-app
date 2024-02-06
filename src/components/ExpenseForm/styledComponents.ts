import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';

export const ExpenseFormContainer = styled.View`
  margin-top: 50px;
  width: 100%;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 10px 0px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const ErrorMessage = styled.Text`
  color: ${Colors.error500};
`;

export const FormTitle = styled.Text`
  text-align: center;
  color: ${Colors.primary50};
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 30px;
`;
