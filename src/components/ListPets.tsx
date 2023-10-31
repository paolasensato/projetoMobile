import React from 'react';
import {FlatList, StyleSheet, View, Alert} from 'react-native';
import {Avatar, Card, IconButton, Text} from 'react-native-paper';
import usePetsStore from '../stores/pets';
import {colors} from '../styles/colors';
import useFeedbackStore from '../stores/feedback';
import axios from '../axios.config';
import {useNavigation} from '@react-navigation/native';

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
});

type PetType = {
  id: number;
  name: string;
  funLevel?: number;
  life: number;
};

type Props = {
  pets: PetType[];
};

const ListItem = ({id, name, funLevel, life}: PetType) => {
  const {showMessage} = useFeedbackStore();
  const {getPets} = usePetsStore();
  const {navigate} = useNavigation();

  const left = () => (
    <Image size={80} source={require('../assets/daijin.png')} />
  );

  const right = () => (
    <View>
      <IconButton
        style={styles.icon}
        icon="pencil"
        iconColor={colors.secondary}
        onPress={() => handleEdit()}
      />
      <IconButton
        style={styles.icon}
        icon="delete"
        iconColor={colors.error}
        onPress={() => handleDelete()}
      />
    </View>
  );

  const handleEdit = () => {
    navigate('Criar Pet', {petId: id});
  };

  const handleDelete = () => {
    Alert.alert('Alerta!', 'Tem certeza que deseja excluir esse pet?', [
      {
        text: 'Cancelar',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Excluir',
        onPress: async () => {
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
              message:
                'Houve um erro ao deletar pet, tente novamente mais tarde!',
              visible: true,
            });
          }
        },
      },
    ]);
  };

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

const ListPets = ({pets}: Props) => {
  return (
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
  );
};

export default ListPets;
