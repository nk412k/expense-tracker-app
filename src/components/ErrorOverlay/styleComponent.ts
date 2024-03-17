import styled from 'styled-components/native';

import { Colors } from '../../constants/colors';

export const ErrorOverlayContainer = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary800};
  padding: 24px;
`;

export const ErrorHeading = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: bold;
  color: white;
`;

export const ErrorDescription = styled.Text`
  text-align: center;
  color: white;
  margin-bottom: 10px;
`;
