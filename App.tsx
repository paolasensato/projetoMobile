import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import useUserStore from './src/stores/userStore';
import Feedback from './src/components/Feedback';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {colors} from './src/styles/colors';
import CreatePet from './src/screens/CreatePet';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.ternaryContainer,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    onSurface: colors.tertiary,
    error: colors.error,
    surfaceVariant: colors.onTertiary,
  },
};

type StackNavigatorType = {
  Home: undefined;
  CreatePet: {petId: number};
  Login: undefined;
  CreateAccount: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorType>();

function App(): JSX.Element {
  const store = useUserStore();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffd9dc',
            },
            contentStyle: {
              backgroundColor: '#ffd9dc',
            },
          }}>
          {store.token ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="CreatePet" component={CreatePet} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="CreateAccount" component={Register} />
            </>
          )}
        </Stack.Navigator>
        <Feedback />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
