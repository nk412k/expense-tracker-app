import { Ionicons } from '@expo/vector-icons';
import { IconPressableContainer } from './styledComponents';

interface Props {
  iconName: any;
  onPressIcon: () => void;
  size: number;
  color: string;
}

const IconButton = (props: Props) => {
  const { iconName, onPressIcon, size, color } = props;
  return (
    <IconPressableContainer
      onPress={onPressIcon}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      android_ripple={{ color: '#ccc' }}
    >
      <Ionicons name={iconName} size={size} color={color} />
    </IconPressableContainer>
  );
};

export default IconButton;
