import { AmountText, TitleContainer, TitleText } from './styledComponents';

interface Props {
  title: string;
  amount: number;
}

export const Title = (props: Props) => {
  const { title, amount } = props;

  return (
    <TitleContainer>
      <TitleText>{title}</TitleText>
      <AmountText>Rs {amount}</AmountText>
    </TitleContainer>
  );
};

export default Title;
