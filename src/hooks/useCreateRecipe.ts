import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import RecipeTypes from '../global';

export default function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RecipeTypes.Recipe>,
    void,
    RecipeTypes.CreateRecipeRequest,
    RecipeTypes.Recipe
  >(
    (recipeData) =>
      axios
        .post('/recipes', {
          data: { attributes: recipeData },
        })
        .then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
      },
    },
  );
}
