import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../components/InputText';
import {validateEmail, validatePassword} from '../helpers/validation-helper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

type Email = {
  value: string;
  error: string | undefined;
};

type Password = {
  value: string;
  error: string | undefined;
};

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState<Email>({value: '', error: ''});
  const [password, setPassword] = useState<Password>({value: '', error: ''});

  const onSubmit = () => {
    const emailError = validateEmail(email.value);
    const passwordError = validatePassword(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
  };

  return (
    <SafeAreaView>
      <InputText
        label="Email"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        textError={email.error}
      />
      <InputText
        label="Password"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        textError={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onSubmit}>
        Entrar
      </Button>

      <View style={styles.registerContainer}>
        <Text>Não possue conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Criar Conta')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
