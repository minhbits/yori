import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeForm({
  label,
  values,
  onChange,
  onSubmit,
  submitText,
}: {
  label: string;
  values: {
    title: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  submitText: string;
}) {
  return (
    <div>
      <h5>{label}</h5>
      <form onSubmit={onSubmit}>
        <div>Title</div>
        <input
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <button type="submit">{submitText}</button>
      </form>
      <Link to="/recipes">
        <div>Back to Recipes</div>
      </Link>
    </div>
  );
}
