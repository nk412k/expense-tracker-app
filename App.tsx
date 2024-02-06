import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManageExpenses from './src/screens/Manage Expenses';
import ExpenseOverViewScreen from './src/screens/TabBarScreen';
import { Colors } from './src/constants/colors';
import ExpenseProvider from './src/stores/context/ExpenseContext';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style='light' />
      <ExpenseProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              animation: 'slide_from_right',
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='ExpenseOverView'
              component={ExpenseOverViewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ManageExpenses'
              component={ManageExpenses}
              options={{ presentation: 'modal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseProvider>
    </>
  );
}
