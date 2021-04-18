import { useQuery } from 'react-query';
import axios from 'axios';

type RecipeType = {
  id: number;
  type: 'recipes';
  attributes: {
    title: string;
  };
};

export const fetchRecipe = (recipeId: number) =>
  axios.get(`/recipes/${recipeId}`).then((res) => res.data.data);

export default function useRecipe(recipeId: number) {
  return useQuery<any, any, RecipeType, any>(
    recipeId && ['recipe', recipeId],
    () => fetchRecipe(recipeId),
  );
}
