import React from 'react';
import useRecipes from '../hooks/useRecipes';

type Recipe = {
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
        {recipes?.map((recipe: Recipe) => (
          <li key={recipe.id}>{recipe.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
}
