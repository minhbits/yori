import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecipesList from './components/RecipesList';
import './App.css';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipesList />
    </QueryClientProvider>
  );
}
