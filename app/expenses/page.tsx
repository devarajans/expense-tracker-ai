'use client';

import { useState } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Expense, ExpenseFormData, ExpenseFilters as Filters } from '@/lib/types';
import { filterExpenses } from '@/lib/utils';
import { DEFAULT_FILTERS } from '@/lib/constants';

export default function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filteredExpenses = filterExpenses(expenses, filters);

  const handleAddExpense = (data: ExpenseFormData) => {
    addExpense(data);
    setIsModalOpen(false);
  };

  const handleEditExpense = (data: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
      setEditingExpense(undefined);
      setIsModalOpen(false);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Expenses</h1>
          <p className="text-gray-500 mt-1">
            View and manage all your expenses ({expenses.length} total)
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Expense
        </Button>
      </div>

      <ExpenseFilters
        filters={filters}
        onFilterChange={setFilters}
        expenses={filteredExpenses}
      />

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={deleteExpense}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <ExpenseForm
          onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
          onCancel={handleCloseModal}
          initialData={editingExpense}
        />
      </Modal>
    </div>
  );
}
