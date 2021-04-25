import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type RecipeType = {
  id: number;
  type: 'recipes';
  attributes: {
    title: string;
  };
};

export default function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<RecipeType>, void, number>(
    (recipeId) => axios.delete(`/recipes/${recipeId}`),
    {
      onSuccess: (recipeId) => {
        queryClient.invalidateQueries('recipes');
        queryClient.invalidateQueries(`recipes/${recipeId}`);
      },
    },
  );
}
