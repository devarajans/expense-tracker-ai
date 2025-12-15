'use client';

import React, { useState } from 'react';
import { Expense, SortField, SortOrder } from '@/lib/types';
import { ExpenseItem } from './ExpenseItem';
import { sortExpenses } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedExpenses = sortExpenses(expenses, sortField, sortOrder);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💸</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No expenses yet</h3>
        <p className="text-gray-500">Start tracking your expenses by adding your first one!</p>
      </div>
    );
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant={sortField === 'date' ? 'primary' : 'outline'}
          onClick={() => handleSort('date')}
          className="flex items-center gap-1"
        >
          <span>Date</span>
          <SortIcon field="date" />
        </Button>
        <Button
          size="sm"
          variant={sortField === 'amount' ? 'primary' : 'outline'}
          onClick={() => handleSort('amount')}
          className="flex items-center gap-1"
        >
          <span>Amount</span>
          <SortIcon field="amount" />
        </Button>
        <Button
          size="sm"
          variant={sortField === 'category' ? 'primary' : 'outline'}
          onClick={() => handleSort('category')}
          className="flex items-center gap-1"
        >
          <span>Category</span>
          <SortIcon field="category" />
        </Button>
      </div>

      <div className="space-y-3">
        {sortedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="text-sm text-gray-500 text-center pt-4">
        Showing {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
      </div>
    </div>
  );
}
