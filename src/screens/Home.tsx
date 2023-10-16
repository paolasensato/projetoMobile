import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, IconButton, Text} from 'react-native-paper';
import usePetsStore from '../stores/pets';
import {colors} from '../styles/colors';
import axios from '../axios.config';
import useFeedbackStore, {FeedbackMessage} from '../stores/feedback';

const {Title} = Card;
const {Image} = Avatar;

const styles = StyleSheet.create({
  icon: {
    margin: 0,
  },
  title: {
    marginLeft: 50,
  },
  cardContent: {
    margin: 20,
    padding: 20,
  },
  addButton: {
    margin: 20,
  },
});

type PetType = {
  id: number;
  name: string;
  funLevel?: number;
  life: number;
};

const ListItem = ({id, name, funLevel, life}: PetType) => {
  const {showMessage} = useFeedbackStore();
  const {getPets} = usePetsStore();

  const left = () => (
    <Image size={80} source={require('../assets/daijin.png')} />
  );

  const right = () => (
    <View>
      <IconButton
        style={styles.icon}
        icon="pencil"
        iconColor={colors.secondary}
        onPress={() => handleEdit(id)}
      />
      <IconButton
        style={styles.icon}
        icon="delete"
        iconColor={colors.error}
        onPress={() => handleDelete(id, showMessage, getPets)}
      />
    </View>
  );

  return (
    <Card mode="contained" style={styles.cardContent}>
      <Title
        title={name}
        titleVariant="titleLarge"
        subtitle={
          <View>
            <Text>Vida: {life}</Text>
            <Text>Diversão: {funLevel}</Text>
          </View>
        }
        subtitleNumberOfLines={2}
        subtitleStyle={styles.title}
        titleStyle={styles.title}
        left={left}
        right={right}
      />
    </Card>
  );
};

const handleEdit = (id: number) => {
  console.log(id);
};

const handleDelete = async (
  id: number,
  showMessage: (state: FeedbackMessage) => void,
  getPets: () => void,
) => {
  try {
    await axios.delete(`/pet/${id}`);
    showMessage({
      type: 'success',
      message: 'Pet deletado com sucesso',
      visible: true,
    });
    getPets();
  } catch (error) {
    console.log(error);
    showMessage({
      type: 'success',
      message: 'Houve um erro ao deletar pet, tente novamente mais tarde!',
      visible: true,
    });
  }
};

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
        onPress={() => navigation.navigate('Criar Pet')}>
        Adicionar
      </Button>
      <FlatList
        data={pets}
        renderItem={({item}) => (
          <ListItem
            id={item.id}
            name={item.name}
            funLevel={item.funLevel}
            life={item.life}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
