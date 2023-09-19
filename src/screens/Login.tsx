import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import InputText from '../components/InputText';
import {validateEmail, validatePassword} from '../helpers/validation-helper';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from '../axios.config';
import useUserStore from '../stores/userStore';

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 5,
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
      console.log(response?.data?.message);
      Alert.alert(
        'Erro',
        response?.data?.message ||
          'Houve um problema ao realizar operação, tente novamente mais tarde!',
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
      <Button loading={loading} mode="contained" onPress={onSubmit}>
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
