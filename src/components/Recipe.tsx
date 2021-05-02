import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRecipe from '../hooks/useRecipe';
import useUpdateRecipe from '../hooks/useUpdateRecipe';
import RecipeForm from './RecipeForm';

export default function Recipe() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, status: getRecipeStatus } = useRecipe(recipeId);

  const defaultValues = {
    title: '',
  };

  const [values, setValues] = useState(defaultValues);

  const setValue = (field: string, value: string) => {
    setValues((old) => ({ ...old, [field]: value }));
  };

  useEffect(() => {
    setValues(recipe ? recipe?.attributes : defaultValues);
  }, [getRecipeStatus]);

  const {
    mutate: updateRecipe,
    status: updateRecipeStatus,
  } = useUpdateRecipe();

  const onUpdateRecipe = () => {
    updateRecipe({ recipeId, recipeData: values });
  };

  return (
    <div>
      <RecipeForm
        label="Update Recipe"
        values={values}
        onChange={setValue}
        onSubmit={onUpdateRecipe}
        submitText={
          updateRecipeStatus === 'loading'
            ? 'Updating...'
            : updateRecipeStatus === 'error'
            ? 'Error!'
            : updateRecipeStatus === 'success'
            ? 'Updated!'
            : 'Update Recipe'
        }
      />
    </div>
  );
}
