import { FlatListProps } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';
import { ExpenseType } from '../../stores/types';

export const ScreenContainer = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${Colors.primary700};
  padding: 20px;
  padding-bottom: 5px;
`;

export const ExpenseList = styled.FlatList<FlatListProps<ExpenseType>>``;

export const EmptyExpenseContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyExpenseText = styled.Text`
  color: ${Colors.primary50};
  text-align: center;
  font-size: 16px;
`;
