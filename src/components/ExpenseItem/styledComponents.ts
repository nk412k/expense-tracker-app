import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';

export const ExpenseItemContainer = styled.View`
  margin: 0px 10px 20px;
`;

export const TitleAndDateContainer = styled.View``;

export const ExpenseTitle = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${Colors.primary50};
  border-radius: 6px;
`;

export const ExpenseDate = styled.Text`
  color: ${Colors.primary50};
`;

export const ExpenseAmount = styled.Text`
  color: ${Colors.primary500};
  background-color: white;
  padding: 10px;
  font-size: 16px;
  width: 65px;
  text-align: center;
  font-weight: 700;
  border-radius: 6px;
`;

export const ExpenseItemPressable = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  background-color: ${Colors.primary500};
`;
