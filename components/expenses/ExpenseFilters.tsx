'use client';

import React from 'react';
import { ExpenseFilters as Filters, Category } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CATEGORIES, DEFAULT_FILTERS } from '@/lib/constants';
import { exportToCSV } from '@/lib/utils';
import { Expense } from '@/lib/types';

interface ExpenseFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  expenses: Expense[];
}

export function ExpenseFilters({ filters, onFilterChange, expenses }: ExpenseFiltersProps) {
  const handleChange = (field: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [field]: value || null });
  };

  const handleReset = () => {
    onFilterChange(DEFAULT_FILTERS);
  };

  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }
    exportToCSV(expenses);
  };

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...CATEGORIES.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="text"
          placeholder="Search expenses..."
          value={filters.searchQuery}
          onChange={(e) => handleChange('searchQuery', e.target.value)}
          className="w-full"
        />

        <Select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          options={categoryOptions}
        />

        <Input
          type="date"
          placeholder="Start date"
          value={filters.startDate || ''}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />

        <Input
          type="date"
          placeholder="End date"
          value={filters.endDate || ''}
          onChange={(e) => handleChange('endDate', e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Reset Filters</span>
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleExport}
          className="flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Export CSV</span>
        </Button>
      </div>
    </div>
  );
}
