'use client';

import React from 'react';
import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const categoryColor = CATEGORY_COLORS[expense.category];
  const categoryIcon = CATEGORY_ICONS[expense.category];

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-1"
              style={{ backgroundColor: categoryColor }}
            >
              <span>{categoryIcon}</span>
              <span>{expense.category}</span>
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(expense.date)}
            </span>
          </div>
          <p className="text-foreground font-medium mb-1 break-words">
            {expense.description}
          </p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(expense.amount)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(expense)}
            className="text-primary hover:bg-primary hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (confirm('Are you sure you want to delete this expense?')) {
                onDelete(expense.id);
              }
            }}
            className="text-danger hover:bg-danger hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
