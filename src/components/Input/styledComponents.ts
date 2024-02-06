import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';

type InputProps = {
  isValid: boolean;
  isMultiline?: boolean;
};

export const InputContainer = styled.View<{
  style?: React.CSSProperties;
  isMultiline?: boolean;
}>`
  margin: 8px 0px;
  width: 100%;
  box-sizing: border-box;
  flex: ${(props) => (props.isMultiline ? 'none' : 1)};
`;

export const InputElement = styled.TextInput<InputProps>`
  background-color: ${(props) =>
    props.isValid ? Colors.primary100 : Colors.error50};
  color: ${Colors.primary700};
  border-radius: 6px;
  padding: 3px 6px;
  width: 100%;
  min-height: ${(props) => (props.isMultiline ? '100px' : 'auto')};
  text-align-vertical: ${(props) => (props.isMultiline ? 'top' : 'center')};
`;

export const Label = styled.Text<InputProps>`
  color: ${(props) => (props.isValid ? Colors.primary50 : Colors.error500)};
  margin-bottom: 4px;
`;
