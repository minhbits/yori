import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import RecipesList from './RecipesList';

describe('RecipesList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const withProvider = (children: ReactElement) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );

  it('renders the header "Recipes List"', () => {
    render(withProvider(<RecipesList />));
    const headingElement = screen.getByRole('heading', {
      name: /Recipes List/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the recipes fetched', () => {
    const mockRecipes = [
      {
        attributes: { title: 'Awesome recipe' },
        id: '129',
        type: 'recipe',
      },
    ];
    queryClient.setQueryData('recipes', mockRecipes);

    render(withProvider(<RecipesList />));

    mockRecipes.map((mockRecipe) =>
      expect(screen.getByText(mockRecipe.attributes.title)).toBeInTheDocument(),
    );
  });

  it('renders as many "Delete" buttons as there are recipes', () => {
    const mockRecipes = [
      {
        attributes: { title: 'Awesome recipe' },
        id: '129',
        type: 'recipe',
      },
    ];
    queryClient.setQueryData('recipes', mockRecipes);

    render(withProvider(<RecipesList />));

    const deleteButtons = screen.getAllByRole('button', {
      name: /Delete/i,
    });
    expect(deleteButtons.length).toBe(mockRecipes.length);
  });

  it('renders the header "Create Recipe"', () => {
    render(withProvider(<RecipesList />));
    const headingElement = screen.getByRole('heading', {
      name: /Create Recipe/i,
    });
    expect(headingElement).toBeInTheDocument();
  });
});
