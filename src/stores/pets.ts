import {create} from 'zustand';
import axios from '../axios.config';

type PetType = {
  id: number;
  name: string;
  restLevel: number;
  foodLevel: number;
  funLevel: number;
  life: number;
};

type Pets = {
  pets: PetType[];
  getPets: () => void;
};

const usePetsStore = create<Pets>(set => ({
  pets: [],
  getPets: async () => {
    try {
      const {data} = await axios.get('/pets');

      set({pets: data.pets});
    } catch (error) {
      console.log(error);
    }
  },
}));

export default usePetsStore;
