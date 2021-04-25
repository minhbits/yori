import React from 'react';
import useRecipe from '../hooks/useRecipe';

export default function Recipe({ activeRecipeId }: { activeRecipeId: number }) {
  const { data: recipe } = useRecipe(activeRecipeId);

  return (
    <div>
      {recipe?.id && <div>{`${recipe?.id} - ${recipe?.attributes.title}`}</div>}
    </div>
  );
}
