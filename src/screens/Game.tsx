import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Text, Avatar} from 'react-native-paper';
import {colors} from '../styles/colors';
import axios from '../axios.config';
import useFeedbackStore from '../stores/feedback';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onTertiary,
    margin: 10,
    borderRadius: 5,
    paddingTop: 20,
  },
  box: {
    alignItems: 'center',
    height: 50,
  },
  life: {
    fontSize: 20,
  },
  row: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  col: {
    margin: 5,
  },
  card: {
    width: 90,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  button: {
    marginHorizontal: 50,
    marginTop: 20,
  },
});

type CardProp = {
  id: number;
  name: string;
  image: any;
  isOpen: boolean;
  isSelected: boolean;
};

const Game = ({navigation, route}: any) => {
  const initialCards = [
    {
      id: 1,
      name: 'Daijin',
      image: require('../assets/memory/daijin.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 2,
      name: 'Daijin',
      image: require('../assets/memory/daijin.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 3,
      name: 'Sadaijin',
      image: require('../assets/memory/sadaijin.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 4,
      name: 'Sadaijin',
      image: require('../assets/memory/sadaijin.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 5,
      name: 'Souta',
      image: require('../assets/memory/souta.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 6,
      name: 'Souta',
      image: require('../assets/memory/souta.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 7,
      name: 'Suzume',
      image: require('../assets/memory/suzume.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 8,
      name: 'Suzume',
      image: require('../assets/memory/suzume.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 9,
      name: 'Porta',
      image: require('../assets/memory/porta.png'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 10,
      name: 'Porta',
      image: require('../assets/memory/porta.png'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 11,
      name: 'Serizawa',
      image: require('../assets/memory/serizawa.jpg'),
      isOpen: true,
      isSelected: false,
    },
    {
      id: 12,
      name: 'Serizawa',
      image: require('../assets/memory/serizawa.jpg'),
      isOpen: true,
      isSelected: false,
    },
  ];

  const shuffledCards = initialCards.sort(() => 0.5 - Math.random());

  const [cards, setCards] = useState<CardProp[]>(shuffledCards);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [chance, setChance] = useState<number>(5);
  const [state, setState] = useState<string>();

  const [hasShownCards, setHasShownCards] = useState<boolean>(false);

  const {params} = route;
  const petId = params.petId;

  const {showMessage} = useFeedbackStore();

  const openCloseCards = useCallback(() => {
    if (!hasShownCards) {
      return;
    }
    const selectedCards = cards.filter(card => card.isOpen && !card.isSelected);

    if (selectedCards.length < 2) {
      return;
    } else if (selectedCards.length === 2) {
      setDisabled(true);
    }

    if (selectedCards[0].name === selectedCards[1].name) {
      setCards(
        cards.map(card =>
          selectedCards.includes(card) ? {...card, isSelected: true} : card,
        ),
      );
      setDisabled(false);
    } else {
      setChance(chance - 1);
      setTimeout(() => {
        setCards(
          cards.map(card =>
            selectedCards.includes(card) ? {...card, isOpen: false} : card,
          ),
        );
        setDisabled(false);
      }, 1000);
    }
  }, [cards]);

  useEffect(() => {
    openCloseCards();

    if (cards.every(card => card.isSelected)) {
      setState('Você Ganhou!');
      handleFun();
      setButtonVisible(true);
    }
    if (chance === 0) {
      handleFun();
      setState('Você Perdeu!');
      setButtonVisible(true);
      setDisabled(true);
    }
  }, [cards]);

  const handleOnPress = (cardOpen: CardProp) => {
    if (cardOpen.isOpen || cardOpen.isSelected) {
      return;
    }

    setCards(
      cards.map(card =>
        card.id === cardOpen.id ? {...card, isOpen: true} : card,
      ),
    );
  };

  const handleOnPressButton = () => {
    navigation.navigate('ViewPet', {id: petId});
  };

  const handleFun = async () => {
    try {
      await axios.post(`/pet/${petId}/play`);
    } catch (error: any) {
      showMessage({
        type: 'error',
        message: error.response.data.message,
        visible: true,
      });
    }
  };

  useEffect(() => {
    if (hasShownCards) {
      return;
    }

    setDisabled(true);

    setTimeout(() => {
      setCards(cards.map(card => ({...card, isOpen: false})));
      setDisabled(false);
    }, 4000);

    setHasShownCards(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        {state ? (
          <Text style={styles.life}>{state}</Text>
        ) : (
          <Text style={styles.life}>{`Vidas: ${chance}`}</Text>
        )}
      </View>

      <View style={styles.row}>
        {cards.map(card => (
          <View key={card.id} style={styles.col}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => handleOnPress(card)}
              style={styles.card}>
              {!card.isOpen ? (
                <Text>?</Text>
              ) : (
                <View style={styles.cardContent}>
                  <Avatar.Image size={80} source={card.image} />
                  <Text>{card.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {buttonVisible ? (
        <Button
          style={styles.button}
          onPress={() => handleOnPressButton()}
          mode="contained">
          Concluir
        </Button>
      ) : null}
    </SafeAreaView>
  );
};

export default Game;
