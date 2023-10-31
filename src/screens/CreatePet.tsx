import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import InputText from '../components/InputText';
import axios from '../axios.config';
import {validatePetName} from '../helpers/validation-helper';
import useFeedbackStore from '../stores/feedback';
import {Button} from 'react-native-paper';
import usePetsStore from '../stores/pets';

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
});

type Input = {
  value: string;
  error: string | undefined;
};

const CreatePet = ({route, navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {params} = route;
  const petId = params?.petId;

  const [name, setName] = useState<Input>({value: '', error: ''});

  const {showMessage} = useFeedbackStore();
  const {getPets} = usePetsStore();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const nameError = validatePetName(name.value);

      if (nameError) {
        setName({...name, error: nameError});
        return;
      }

      const body = {
        name: name.value,
      };

      if (petId) {
        await axios.put(`/pet/${petId}`, body);
        showMessage({
          type: 'success',
          message: 'Pet atualizado com sucesso!',
          visible: true,
        });
      } else {
        await axios.post('/pet', body);
        showMessage({
          type: 'success',
          message: 'Pet adicionado com sucesso!',
          visible: true,
        });
      }
      getPets();
      navigation.goBack();
    } catch (error: any) {
      showMessage({
        type: 'success',
        message: error?.response?.data?.message,
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPet = useCallback(async () => {
    try {
      setLoading(true);
      if (!petId) {
        return;
      }

      const {data} = await axios.get(`/pet/${petId}`);

      setName({value: data.name, error: ''});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    loadPet();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <InputText
          label="Nome"
          mode="outlined"
          value={name?.value}
          error={!!name?.error}
          textError={name?.error}
          onChangeText={text => setName({value: text, error: ''})}
          disabled={loading}
        />
        <View style={styles.actionsContainer}>
          <Button disabled={loading} mode="contained" onPress={handleSubmit}>
            Salvar
          </Button>
          <Button disabled={loading} onPress={() => navigation.goBack()}>
            Cancelar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePet;
