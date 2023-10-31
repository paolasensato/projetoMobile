import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import usePetsStore from '../stores/pets';
import ListPets from '../components/ListPets';

const styles = StyleSheet.create({
  addButton: {
    margin: 20,
  },
});

const Home = ({navigation}: any) => {
  const {pets, getPets} = usePetsStore();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <SafeAreaView>
      <Button
        style={styles.addButton}
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
