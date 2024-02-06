import { Colors } from '../../constants/colors';

import {
  ButtonInnerContainer,
  ButtonOuterContainer,
  ButtonPressable,
  ButtonText,
} from './styledComponents';

interface Props {
  onPress: () => void;
  isFilledButton: boolean;
  buttonText: string;
}

const CustomButton = (props: Props): React.ReactElement => {
  const { isFilledButton, buttonText, onPress } = props;

  return (
    <ButtonOuterContainer>
      <ButtonPressable
        onPress={onPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          backgroundColor: pressed ? Colors.primary500 : 'transparent',
        })}
        android_ripple={{ color: '#ccc' }}
      >
        <ButtonInnerContainer isFilledButton={isFilledButton}>
          <ButtonText isFilledButton={isFilledButton}>{buttonText}</ButtonText>
        </ButtonInnerContainer>
      </ButtonPressable>
    </ButtonOuterContainer>
  );
};

CustomButton.defaultProps = {
  isFilledButton: false,
};

export default CustomButton;
