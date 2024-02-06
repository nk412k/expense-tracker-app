import React from 'react';

import { Colors } from '../../constants/colors';

import { InputContainer, InputElement, Label } from './styledComponents';

interface Props {
  label: string;
  inputConfig: any;
  inputStyles?: React.CSSProperties;
  isValid: boolean;
}

const Input = (props: Props) => {
  const { label, inputConfig, inputStyles, isValid } = props;
  return (
    <InputContainer
      style={inputStyles}
      isMultiline={inputConfig.multiline || false}
    >
      <Label isValid={isValid}>{label}</Label>
      <InputElement
        {...inputConfig}
        isValid={isValid}
        placeholderTextColor={Colors.primary200}
        isMultiline={inputConfig.multiline || false}
      />
    </InputContainer>
  );
};

export default Input;
