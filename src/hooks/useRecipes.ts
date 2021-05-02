import { useQuery } from 'react-query';
import axios from 'axios';
import RecipeTypes from '../global';

export default function useRecipes() {
  return useQuery<string, void, RecipeTypes.Recipe[], string>('recipes', () =>
    axios.get('/recipes').then((res) => res.data.data),
  );
}
