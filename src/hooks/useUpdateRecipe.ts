import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type RecipeType = {
  id: string;
  type: 'recipes';
  attributes: {
    title: string;
  };
};

type UpdateRecipeRequest = {
  recipeId: string;
  recipeData: {
    title: string;
  };
};

export default function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<RecipeType>, void, UpdateRecipeRequest>(
    ({ recipeId, recipeData }) =>
      axios
        .put(`/recipes/${recipeId}`, { data: { attributes: recipeData } })
        .then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
      },
    },
  );
}
