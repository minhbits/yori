import React, { useState } from 'react';
import useCreateRecipe from '../hooks/useCreateRecipe';
import useRecipes from '../hooks/useRecipes';
import Recipe from './Recipe';

type RecipeType = {
  id: number;
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

  const { mutate: createRecipe, status } = useCreateRecipe();

  const onSubmit = () => {
    createRecipe(values);
  };

  return (
    <div>
      <div>Recipes List</div>
      <ul>
        {recipes?.map((recipe: RecipeType) => (
          <li key={recipe.id}>{recipe.attributes.title}</li>
        ))}
      </ul>
      <br />
      <div>Recipe Show</div>
      <Recipe />
      <br />
      <div>Create Recipe</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={values.title}
            onChange={(e) => setValue('title', e.target.value)}
          />
          <button type="submit">
            {status === 'loading'
              ? 'Saving...'
              : status === 'error'
              ? 'Error!'
              : status === 'success'
              ? 'Saved!'
              : 'Create Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
}
