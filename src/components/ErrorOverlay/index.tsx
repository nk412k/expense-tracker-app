import CustomButton from '../CustomButton';

import {
  ErrorDescription,
  ErrorHeading,
  ErrorOverlayContainer,
} from './styleComponent';

interface Props {
  message: string;
  onRetry: () => void;
}

const ErrorOverlay = (props: Props) => {
  const { message, onRetry } = props;

  return (
    <ErrorOverlayContainer>
      <ErrorHeading>An Error occurred!</ErrorHeading>
      <ErrorDescription>{message}</ErrorDescription>
      <CustomButton
        onPress={onRetry}
        buttonText='Retry'
        isFilledButton={true}
      />
    </ErrorOverlayContainer>
  );
};

export default ErrorOverlay;
