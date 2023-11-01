import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import axios from '../axios.config';
import {PetType} from '../stores/pets';
import {colors} from '../styles/colors';

const {Image} = Avatar;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.onTertiary,
    justifyContent: 'space-evenly',
  },
  cardHead: {
    display: 'flex',
    alignItems: 'center',
  },
  cardContent: {
    marginHorizontal: 20,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
});

const ViewPet = ({route}: any) => {
  const {params} = route;
  const petId = params.petId;
  const [pet, setPet] = useState<PetType>();
  const [loading, setLoading] = useState<boolean>(false);

  const getPet = useCallback(async () => {
    try {
      const {data} = await axios.get(`/pet/${petId}`);
      setPet(data);
    } catch (error) {
      console.log(error);
    }
  }, [petId]);

  useEffect(() => {
    getPet();
  }, [petId]);

  const handleFood = async () => {
    try {
      setLoading(true);
      await axios.post(`/pet/${pet!.id}/food`);
      getPet();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSleep = async () => {
    try {
      setLoading(true);
      await axios.post(`/pet/${pet!.id}/rest`);
      getPet();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFun = async () => {
    try {
      setLoading(true);
      await axios.post(`/pet/${pet!.id}/play`);
      getPet();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.cardHead}>
        <Image size={120} source={require('../assets/daijin.png')} />
        <Text variant="headlineMedium">{pet?.name}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text variant="bodyLarge">Vida: {pet?.life}</Text>
        <Text variant="bodyLarge">Nível de Diversão: {pet?.funLevel}</Text>
        <Text variant="bodyLarge">Nível de Comida: {pet?.foodLevel}</Text>
        <Text variant="bodyLarge">Nível de Descanso: {pet?.restLevel}</Text>
      </View>
      <View style={styles.cardActions}>
        <Button
          loading={loading}
          icon="silverware"
          mode="contained"
          onPress={handleFood}>
          Alimentar
        </Button>
        <Button
          loading={loading}
          icon="sleep"
          mode="contained"
          onPress={handleSleep}>
          Dormir
        </Button>
        <Button
          loading={loading}
          icon="teddy-bear"
          mode="contained"
          onPress={handleFun}>
          Brincar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ViewPet;
