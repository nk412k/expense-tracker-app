import { ActivityIndicator } from 'react-native';

import { LoadingOverlayContainer } from './styledComponents';

const LoadingOverlay = () => {
  return (
    <LoadingOverlayContainer>
      <ActivityIndicator size={'large'} color={'white'} />
    </LoadingOverlayContainer>
  );
};

export default LoadingOverlay;
