import React, { useState } from 'react';
import useCreateRecipe from '../hooks/useCreateRecipe';
import useRecipes from '../hooks/useRecipes';
import useDeleteRecipe from '../hooks/useDeleteRecipe';
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

  const {
    mutate: createRecipe,
    status: createRecipeStatus,
  } = useCreateRecipe();

  const onSubmit = () => {
    createRecipe(values);
  };

  const {
    mutate: deleteRecipe,
    status: deleteRecipeStatus,
  } = useDeleteRecipe();

  const [activeRecipeId, setActiveRecipeId] = useState<number | null>(null);

  console.log('activeRecipeId', activeRecipeId);

  const onDeleteRecipe = (recipeid: number) => {
    deleteRecipe(recipeid);
    setActiveRecipeId(activeRecipeId === recipeid ? null : activeRecipeId);
  };

  return (
    <div>
      <div>Recipes List</div>
      <ul>
        {recipes?.map((recipe: RecipeType) => (
          <li key={recipe.id}>
            <div>
              <input
                type="checkbox"
                id={`${recipe.id}`}
                onChange={() =>
                  setActiveRecipeId(
                    activeRecipeId === recipe.id ? null : recipe.id,
                  )
                }
                checked={activeRecipeId === recipe.id}
              />
              {recipe.attributes.title}
              <button
                type="button"
                onClick={() => {
                  onDeleteRecipe(recipe.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <div>Recipe Show</div>
      {activeRecipeId && <Recipe activeRecipeId={activeRecipeId} />}
      <br />
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
