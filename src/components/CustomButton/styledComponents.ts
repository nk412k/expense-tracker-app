import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';

type ButtonProps = {
  isFilledButton: boolean;
};

export const ButtonOuterContainer = styled.View`
  border-radius: 8px;
`;

export const ButtonPressable = styled.Pressable`
  overflow: hidden;
`;

export const ButtonInnerContainer = styled.View<ButtonProps>`
  padding: 10px 32px;
  background-color: ${(props) =>
    props.isFilledButton ? Colors.primary500 : 'none'};
  overflow: hidden;
  border-radius: 8px;
  overflow: hidden;
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${(props) =>
    props.isFilledButton ? Colors.primary50 : Colors.primary200};
`;
