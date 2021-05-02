import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import RecipeTypes from '../global';

export default function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RecipeTypes.Recipe>,
    void,
    RecipeTypes.DeleteRecipeRequest,
    RecipeTypes.Recipe
  >(
    (recipeId) =>
      axios.delete(`/recipes/${recipeId}`).then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
      },
    },
  );
}
