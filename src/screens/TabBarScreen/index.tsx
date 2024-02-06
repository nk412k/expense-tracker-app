import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import IconButton from '../../components/IconButton';

import RecentExpenses from '../RecentExpenses';
import AllExpenses from '../All Expenses';

const BottomTab = createBottomTabNavigator();

const ExpenseOverViewScreen = (): React.ReactElement => {
  const headerIcon = (tintColor: string | undefined, navigation: any) => {
    return (
      <IconButton
        iconName='add'
        onPressIcon={() => navigation.navigate('ManageExpenses')}
        size={24}
        color={tintColor as string}
      />
    );
  };
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: Colors.accent500,
        tabBarStyle: {
          backgroundColor: Colors.primary500,
        },
        headerRight: ({ tintColor }) => {
          return headerIcon(tintColor, navigation);
        },
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerTintColor: 'white',
      })}
    >
      <BottomTab.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default ExpenseOverViewScreen;
