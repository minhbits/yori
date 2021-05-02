import { useQuery } from 'react-query';
import axios from 'axios';
import RecipeTypes from '../global';

export default function useRecipe(recipeId: string) {
  return useQuery<string, void, RecipeTypes.Recipe, '' | string[]>(
    recipeId && ['recipe', recipeId],
    () => axios.get(`/recipes/${recipeId}`).then((res) => res.data.data),
  );
}
