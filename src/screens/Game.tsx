import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {colors} from '../styles/colors';
import axios from '../axios.config';
import useFeedbackStore from '../stores/feedback';

const {Content} = Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onTertiary,
    margin: 10,
    borderRadius: 5,
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  col: {
    margin: 5,
  },
  card: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type CardProp = {
  id: number;
  name: string;
  url?: string;
  isOpen: boolean;
  isSelected: boolean;
};

const Game = ({navigation, route}: any) => {
  const initialCards = [
    {
      id: 1,
      name: '1',
      isOpen: false,
      isSelected: false,
    },
    {
      id: 2,
      name: '1',
      isOpen: false,
      isSelected: false,
    },
    {
      id: 3,
      name: '2',
      isOpen: false,
      isSelected: false,
    },
    {
      id: 4,
      name: '2',
      isOpen: false,
      isSelected: false,
    },
    {
      id: 5,
      name: '3',
      isOpen: false,
      isSelected: false,
    },
    {
      id: 6,
      name: '3',
      isOpen: false,
      isSelected: false,
    },
  ];

  const shuffledCards = initialCards.sort(() => 0.5 - Math.random());

  const [cards, setCards] = useState<CardProp[]>(shuffledCards);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);

  const {params} = route;
  const petId = params.petId;

  const {showMessage} = useFeedbackStore();

  const openCloseCards = useCallback(() => {
    const selectedCards = cards.filter(card => card.isOpen && !card.isSelected);

    if (selectedCards.length < 2) {
      return;
    }

    if (selectedCards[0].name === selectedCards[1].name) {
      setCards(
        cards.map(card =>
          selectedCards.includes(card) ? {...card, isSelected: true} : card,
        ),
      );
    } else {
      setTimeout(() => {
        setCards(
          cards.map(card =>
            selectedCards.includes(card) ? {...card, isOpen: false} : card,
          ),
        );
      }, 1000);
    }
  }, [cards]);

  useEffect(() => {
    openCloseCards();

    if (cards.every(card => card.isSelected)) {
      handleFun();
      setButtonVisible(true);
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
    navigation.navigate('ViewPet', {petId: petId});
  };

  const handleFun = async () => {
    try {
      await axios.post(`/pet/${petId}/play`);
    } catch (error: any) {
      showMessage({
        type: 'success',
        message: error.response.data.message,
        visible: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        {cards.map(card => (
          <View style={styles.col}>
            <Card style={styles.card} onPress={() => handleOnPress(card)}>
              <Content>
                <Text>{card.isOpen ? card.name : '?'}</Text>
              </Content>
            </Card>
          </View>
        ))}
      </View>
      {buttonVisible ? (
        <Button onPress={() => handleOnPressButton()} mode="contained">
          Concluir
        </Button>
      ) : null}
    </SafeAreaView>
  );
};

export default Game;
