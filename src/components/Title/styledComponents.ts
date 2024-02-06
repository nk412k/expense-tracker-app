import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';

export const TitleContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  background-color: ${Colors.primary50};
  padding: 8px 10px;
  border-radius: 6px;
  elavation: 4px;
  shadow_offset: 4px 4px;
  shadow_opacity: 0.3;
  shadow_radius: 4px;
  align-items: center;
  margin-bottom: 16px;
`;

export const TitleText = styled.Text`
  color: ${Colors.primary500};
`;

export const AmountText = styled.Text`
  font-size: 18px;
  color: ${Colors.primary500};
  font-weight: 700;
`;
