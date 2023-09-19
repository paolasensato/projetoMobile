import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import InputText from '../components/InputText';
import {validateEmail, validatePassword} from '../helpers/validation-helper';
import axios from '../axios.config';
import useUserStore from '../stores/userStore';
import useFeedbackStore from '../stores/feedback';

const styles = StyleSheet.create({
  link: {
    color: '#18759F',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
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
    maxWidth: 300,
    maxHeight: 168,
    marginBottom: 50,
  },
});

type Input = {
  value: string;
  error: string | undefined;
};

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState<Input>({value: '', error: ''});
  const [password, setPassword] = useState<Input>({value: '', error: ''});
  const [loading, setLoading] = useState<boolean>(false);
  const {showMessage} = useFeedbackStore();

  const store = useUserStore();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const emailError = validateEmail(email.value);
      const passwordError = validatePassword(password.value);

      if (emailError || passwordError) {
        setEmail({...email, error: emailError});
        setPassword({...password, error: passwordError});
        return;
      }

      const body = {
        email: email.value,
        password: password.value,
      };

      const {data} = await axios.post('/login', body);

      store.setToken(data.token);
      navigation.navigate('Home');
    } catch (error: any) {
      const {response} = error;
      showMessage({
        type: 'error',
        message: response?.data?.message,
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
          source={require('../assets/fila_indiana.png')}
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
        <Button loading={loading} mode="contained" onPress={onSubmit}>
          Entrar
        </Button>

        <View style={styles.registerContainer}>
          <Text>Não possue conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Criar Conta')}>
            <Text style={styles.link}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
