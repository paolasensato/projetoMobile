import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import useUserStore from './src/stores/userStore';
import Feedback from './src/components/Feedback';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#27868D',
    secondary: '#8C4842',
    tertiary: '#a1b2c3',
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
