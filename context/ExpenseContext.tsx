'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Expense, ExpenseFormData } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { STORAGE_KEY } from '@/lib/constants';
import toast from 'react-hot-toast';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (data: ExpenseFormData) => void;
  updateExpense: (id: string, data: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  clearAllExpenses: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(STORAGE_KEY, []);

  const addExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: generateId(),
      date: data.date,
      amount: parseFloat(data.amount),
      category: data.category,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    toast.success('Expense added successfully!');
  };

  const updateExpense = (id: string, data: ExpenseFormData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              date: data.date,
              amount: parseFloat(data.amount),
              category: data.category,
              description: data.description,
              updatedAt: new Date().toISOString(),
            }
          : expense
      )
    );
    toast.success('Expense updated successfully!');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    toast.success('Expense deleted successfully!');
  };

  const clearAllExpenses = () => {
    setExpenses([]);
    toast.success('All expenses cleared!');
  };

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      clearAllExpenses,
    }),
    [expenses]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
