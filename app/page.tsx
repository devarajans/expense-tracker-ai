'use client';

import { useState } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Expense, ExpenseFormData } from '@/lib/types';
import {
  calculateSummaryStats,
  calculateCategorySummary,
  calculateDailySpending,
  sortExpenses,
} from '@/lib/utils';

export default function Dashboard() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

  const stats = calculateSummaryStats(expenses);
  const categoryData = calculateCategorySummary(expenses);
  const dailySpending = calculateDailySpending(expenses);
  const recentExpenses = sortExpenses(expenses, 'date', 'desc').slice(0, 5);

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your spending and manage your finances</p>
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

      <SummaryCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={dailySpending} />
        <CategoryBreakdown data={categoryData} />
      </div>

      {recentExpenses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Recent Expenses</h2>
          <ExpenseList
            expenses={recentExpenses}
            onEdit={handleEdit}
            onDelete={deleteExpense}
          />
        </div>
      )}

      {expenses.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">💸</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Welcome to Your Expense Tracker!
          </h2>
          <p className="text-gray-500 mb-6">
            Start tracking your expenses by adding your first one
          </p>
          <Button onClick={() => setIsModalOpen(true)} size="lg">
            Add Your First Expense
          </Button>
        </div>
      )}

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
