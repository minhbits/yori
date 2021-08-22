import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Recipe from './Recipe';

describe('Recipe', () => {
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
  it('renders the header "Update Recipe"', () => {
    render(withProvider(<Recipe />));

    const headingElement = screen.getByRole('heading', {
      name: /Update Recipe/i,
    });
    expect(headingElement).toBeInTheDocument();
  });
});
