declare namespace RecipeTypes {
  type Recipe = {
    id: string;
    type: 'recipes';
    attributes: {
      title: string;
    };
  };

  type CreateRecipeRequest = {
    title: string;
  };

  type DeleteRecipeRequest = string;

  type UpdateRecipeRequest = {
    recipeId: string;
    recipeData: {
      title: string;
    };
  };
}

export default RecipeTypes;
