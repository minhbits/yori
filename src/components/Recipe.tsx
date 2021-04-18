import React from 'react';
import useRecipe from '../hooks/useRecipe';

export default function Recipe() {
  const { data: recipe } = useRecipe(1);

  return (
    <div>
      <div>{`${recipe?.id} - ${recipe?.attributes.title}`}</div>
    </div>
  );
}
