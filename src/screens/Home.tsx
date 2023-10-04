import React, {useCallback, useEffect, useState} from 'react';
import axios from '../axios.config';
import {FlatList, SafeAreaView, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type PetType = {
  id: number;
  name: string;
};

const ListItem = ({id, name}: PetType) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{id}</Text>
    </View>
  );
};

const Home = () => {
  const [pets, setPets] = useState<PetType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPets = useCallback(async () => {
    try {
      setLoading(true);

      const {data} = await axios.get('/pets');

      setPets(data.pets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPets();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <FlatList
          data={pets}
          renderItem={({item}) => <ListItem id={item.id} name={item.name} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
