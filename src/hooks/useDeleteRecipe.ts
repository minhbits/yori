import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type RecipeType = {
  id: string;
  type: 'recipes';
  attributes: {
    title: string;
  };
};

export default function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<RecipeType>, void, string>(
    (recipeId) => axios.delete(`/recipes/${recipeId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
      },
    },
  );
}
