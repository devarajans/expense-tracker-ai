'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/lib/constants';
import { ExpenseFormData, Expense } from '@/lib/types';
import { validateExpenseForm } from '@/lib/utils';
import { format } from 'date-fns';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  onCancel: () => void;
  initialData?: Expense;
}

export function ExpenseForm({ onSubmit, onCancel, initialData }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: initialData?.date.split('T')[0] || format(new Date(), 'yyyy-MM-dd'),
    amount: initialData?.amount.toString() || '',
    category: initialData?.category || 'Food',
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateExpenseForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      setTouched({
        date: true,
        amount: true,
        category: true,
        description: true,
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleChange}
        error={touched.date ? errors.date : undefined}
        max={format(new Date(), 'yyyy-MM-dd')}
        required
      />

      <Input
        type="number"
        name="amount"
        label="Amount ($)"
        value={formData.amount}
        onChange={handleChange}
        error={touched.amount ? errors.amount : undefined}
        placeholder="0.00"
        step="0.01"
        min="0.01"
        required
      />

      <Select
        name="category"
        label="Category"
        value={formData.category}
        onChange={handleChange}
        error={touched.category ? errors.category : undefined}
        options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        required
      />

      <div className="w-full">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
            touched.description && errors.description ? 'border-danger' : 'border-gray-300'
          }`}
          rows={3}
          placeholder="Enter expense description"
          required
        />
        {touched.description && errors.description && (
          <p className="mt-1 text-sm text-danger">{errors.description}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {initialData ? 'Update Expense' : 'Add Expense'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
