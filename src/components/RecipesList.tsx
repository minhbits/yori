import React from 'react';
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

  return (
    <div>
      <div>Recipes List</div>
      <ul>
        {recipes?.map((recipe: RecipeType) => (
          <li key={recipe.id}>{recipe.attributes.title}</li>
        ))}
      </ul>
      <div>Recipe Show</div>
      <Recipe />
    </div>
  );
}
