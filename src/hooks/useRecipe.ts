import { useQuery } from 'react-query';
import axios from 'axios';

type RecipeType = {
  id: string;
  type: 'recipes';
  attributes: {
    title: string;
  };
};

export const fetchRecipe = (recipeId: string) =>
  axios.get(`/recipes/${recipeId}`).then((res) => res.data.data);

export default function useRecipe(recipeId: string) {
  return useQuery<any, any, RecipeType, any>(
    recipeId && ['recipe', recipeId],
    () => fetchRecipe(recipeId),
  );
}
