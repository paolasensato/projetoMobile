import React, {useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import axios from '../axios.config';
import InputText from '../components/InputText';
import {Button} from 'react-native-paper';
import {validateEmail, validatePassword} from '../helpers/validation-helper';

type Input = {
  value: string;
  error: string | undefined;
};

const Register = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<Input>({value: '', error: ''});
  const [password, setPassword] = useState<Input>({value: '', error: ''});
  const [passwordConfirm, setPasswordConfirm] = useState<Input>({
    value: '',
    error: '',
  });

  const handleRegister = async () => {
    try {
      setLoading(true);
      const emailError = validateEmail(email.value);
      const passwordError = validatePassword(password.value);
      const passwordConfirmError = validatePassword(passwordConfirm.value);

      if (emailError || passwordError || passwordConfirmError) {
        setEmail({...email, error: emailError});
        setPassword({...password, error: passwordError});
        setPasswordConfirm({...passwordConfirm, error: passwordConfirmError});
        return;
      }

      if (passwordConfirm.value !== password.value) {
        const message = 'Senhas precisam ser idênticas';
        setPasswordConfirm({...passwordConfirm, error: message});
        setPassword({...password, error: message});
        return;
      }
      const body = {
        email: email.value,
        password: password.value,
      };
      const {data} = await axios.post('/register', body);
      Alert.alert('Sucesso', data.message, [
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro',
        'Houve um erro ao tentar cadastrar, tente novamente mais tarde!',
        [{text: 'OK'}],
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <InputText
        label="E-mail"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        textError={email.error}
      />
      <InputText
        label="Senha"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        textError={password.error}
        secureTextEntry
      />
      <InputText
        label="Confirmação de Senha"
        value={passwordConfirm.value}
        onChangeText={text => setPasswordConfirm({value: text, error: ''})}
        error={!!passwordConfirm.error}
        textError={passwordConfirm.error}
        secureTextEntry
      />
      <Button loading={loading} mode="contained" onPress={handleRegister}>
        Cadastrar
      </Button>
    </SafeAreaView>
  );
};

export default Register;
