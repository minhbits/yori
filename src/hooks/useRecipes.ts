import { useQuery } from 'react-query';
import axios from 'axios';

export default function useRecipes() {
  return useQuery('recipes', () =>
    axios.get('/recipes').then((res) => res.data.data),
  );
}
