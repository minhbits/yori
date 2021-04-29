import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipe from '../hooks/useRecipe';
import useUpdateRecipe from '../hooks/useUpdateRecipe';

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

  React.useEffect(() => {
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
      <div>{`Update ${recipe?.id}`}</div>
      <form onSubmit={onUpdateRecipe}>
        <div>Title</div>
        <input
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
        />
        <button type="submit">
          {updateRecipeStatus === 'loading'
            ? 'Updating...'
            : updateRecipeStatus === 'error'
            ? 'Error!'
            : updateRecipeStatus === 'success'
            ? 'Saved!'
            : 'Update Recipe'}
        </button>
      </form>
      <Link to="/recipes">
        <div>Back to Recipes</div>
      </Link>
    </div>
  );
}
