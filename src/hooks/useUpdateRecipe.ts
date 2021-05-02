import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import RecipeTypes from '../global';

export default function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RecipeTypes.Recipe>,
    void,
    RecipeTypes.UpdateRecipeRequest
  >(
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
