import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type CreateRecipeRequest = {
  title: string;
};

export default function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation<void, void, CreateRecipeRequest>(
    (recipeData) =>
      axios.post('/recipes', {
        data: { attributes: recipeData },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
      },
    },
  );
}
