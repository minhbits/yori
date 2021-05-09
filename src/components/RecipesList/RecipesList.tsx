import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCreateRecipe from '../../hooks/useCreateRecipe';
import useRecipes from '../../hooks/useRecipes';
import useDeleteRecipe from '../../hooks/useDeleteRecipe';
import RecipeForm from '../RecipeForm';
import RecipeTypes from '../../global';

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

  const onCreateRecipe = () => {
    createRecipe(values);
  };

  const { mutate: deleteRecipe } = useDeleteRecipe();

  const onDeleteRecipe = (recipeId: string) => {
    deleteRecipe(recipeId);
  };

  return (
    <div>
      <h5>Recipes List</h5>
      {recipes?.map((recipe: RecipeTypes.Recipe) => (
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
      <div>
        <RecipeForm
          label="Create Recipe"
          values={values}
          onChange={setValue}
          onSubmit={onCreateRecipe}
          submitText={
            createRecipeStatus === 'loading'
              ? 'Saving...'
              : createRecipeStatus === 'error'
              ? 'Error!'
              : createRecipeStatus === 'success'
              ? 'Saved!'
              : 'Create Recipe'
          }
        />
      </div>
    </div>
  );
}
