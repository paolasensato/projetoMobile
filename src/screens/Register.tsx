import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import axios from '../axios.config';
import InputText from '../components/InputText';
import {Button} from 'react-native-paper';
import {validateEmail, validatePassword} from '../helpers/validation-helper';
import useFeedbackStore from '../stores/feedback';

const styles = StyleSheet.create({
  card: {
    width: 250,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f6f4',
  },
  image: {
    maxWidth: 100,
    maxHeight: 160,
    marginBottom: 15,
  },
});

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
  const {showMessage} = useFeedbackStore();

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

      showMessage({
        type: 'success',
        message: data.message,
        visible: true,
      });

      navigation.navigate('Login');
    } catch (error) {
      console.log(error);

      showMessage({
        type: 'error',
        message:
          'Houve um erro ao realizar operação, tente novamente mais tarde!',
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/totoroSóoPó.png')}
        />
      </View>
      <View style={styles.card}>
        <InputText
          label="E-mail"
          mode="outlined"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          textError={email.error}
        />
        <InputText
          label="Senha"
          mode="outlined"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          textError={password.error}
          secureTextEntry
        />
        <InputText
          label="Confirmação de Senha"
          mode="outlined"
          value={passwordConfirm.value}
          onChangeText={text => setPasswordConfirm({value: text, error: ''})}
          error={!!passwordConfirm.error}
          textError={passwordConfirm.error}
          secureTextEntry
        />
        <Button loading={loading} mode="contained" onPress={handleRegister}>
          Cadastrar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Register;
