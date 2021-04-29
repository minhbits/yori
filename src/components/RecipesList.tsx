import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCreateRecipe from '../hooks/useCreateRecipe';
import useRecipes from '../hooks/useRecipes';
import useDeleteRecipe from '../hooks/useDeleteRecipe';

type RecipeType = {
  id: string;
  type: 'recipes';
  attributes: {
    title: string;
  };
};

export default function RecipesList() {
  const { data: recipes } = useRecipes();

  const defaultValues = {
    title: '',
  };

  const [values, setValues] = useState(defaultValues);

  const setValue = (field: string, value: string) => {
    setValues((old) => ({ ...old, [field]: value }));
  };

  const {
    mutate: createRecipe,
    status: createRecipeStatus,
  } = useCreateRecipe();

  const onSubmit = () => {
    createRecipe(values);
  };

  const { mutate: deleteRecipe } = useDeleteRecipe();

  const onDeleteRecipe = (recipeid: string) => {
    deleteRecipe(recipeid);
  };

  return (
    <div>
      <h5>Recipes List</h5>
      {recipes?.map((recipe: RecipeType) => (
        <div key={recipe.id} style={{ display: 'flex' }}>
          <Link to={`/recipes/${recipe.id}`}>
            <div>{recipe.attributes.title}</div>
          </Link>
          <button
            type="button"
            onClick={() => {
              onDeleteRecipe(recipe.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <div>Create Recipe</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={values.title}
            onChange={(e) => setValue('title', e.target.value)}
          />
          <button type="submit">
            {createRecipeStatus === 'loading'
              ? 'Saving...'
              : createRecipeStatus === 'error'
              ? 'Error!'
              : createRecipeStatus === 'success'
              ? 'Saved!'
              : 'Create Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
}
