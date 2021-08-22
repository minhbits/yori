import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipesList from './components/RecipesList/RecipesList';
import Recipe from './components/Recipe/Recipe';
import './App.css';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/recipes/:recipeId" render={() => <Recipe />} />
          <Route path="/recipes" render={() => <RecipesList />} />
          <Route path="/" render={() => <RecipesList />} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
