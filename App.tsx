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

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    onSurface: colors.text,
    error: colors.error,
  },
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const store = useUserStore();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f3faf9',
            },
          }}>
          {store.token ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Criar Conta" component={Register} />
            </>
          )}
        </Stack.Navigator>
        <Feedback />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
