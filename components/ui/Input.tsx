import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  const inputId = props.id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          error ? 'border-danger' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}
