import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import usePetsStore from '../stores/pets';
import ListPets from '../components/ListPets';
import useUserStore from '../stores/userStore';

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
});

const Home = ({navigation}: any) => {
  const {pets, getPets} = usePetsStore();
  const store = useUserStore();

  useEffect(() => {
    getPets();
  }, []);

  const handleLogout = () => {
    store.resetToken();
  };

  return (
    <SafeAreaView>
      <Button
        style={styles.button}
        icon="logout"
        mode="contained"
        onPress={handleLogout}>
        Sair
      </Button>
      <Button
        style={styles.button}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('CreatePet')}>
        Adicionar
      </Button>
      <ListPets pets={pets} />
    </SafeAreaView>
  );
};

export default Home;
