import { format, startOfMonth, endOfMonth, subDays, isWithinInterval, parseISO } from 'date-fns';
import { Expense, Category, CategorySummary, SummaryStats, DailySpending, ExpenseFilters } from './types';
import { CURRENCY_SYMBOL, LOCALE } from './constants';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    return dateString;
  }
}

export function getCurrentMonth(): { start: string; end: string } {
  const now = new Date();
  return {
    start: startOfMonth(now).toISOString(),
    end: endOfMonth(now).toISOString(),
  };
}

export function getLast30Days(): { start: string; end: string } {
  const now = new Date();
  return {
    start: subDays(now, 30).toISOString(),
    end: now.toISOString(),
  };
}

export function filterExpenses(expenses: Expense[], filters: ExpenseFilters): Expense[] {
  return expenses.filter((expense) => {
    if (filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }

    if (filters.startDate && expense.date < filters.startDate) {
      return false;
    }

    if (filters.endDate && expense.date > filters.endDate) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        expense.description.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        expense.amount.toString().includes(query)
      );
    }

    return true;
  });
}

export function calculateSummaryStats(expenses: Expense[]): SummaryStats {
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expenseCount = expenses.length;
  const averageExpense = expenseCount > 0 ? totalSpending / expenseCount : 0;

  const { start, end } = getCurrentMonth();
  const monthlyExpenses = expenses.filter((expense) =>
    isWithinInterval(parseISO(expense.date), { start: parseISO(start), end: parseISO(end) })
  );
  const monthlySpending = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = calculateCategorySummary(expenses);
  const topCategory = categoryTotals.length > 0 ? categoryTotals[0] : null;

  return {
    totalSpending,
    monthlySpending,
    expenseCount,
    averageExpense,
    topCategory: topCategory
      ? { category: topCategory.category, amount: topCategory.amount }
      : null,
  };
}

export function calculateCategorySummary(expenses: Expense[]): CategorySummary[] {
  const categoryMap = new Map<Category, { amount: number; count: number }>();

  expenses.forEach((expense) => {
    const current = categoryMap.get(expense.category) || { amount: 0, count: 0 };
    categoryMap.set(expense.category, {
      amount: current.amount + expense.amount,
      count: current.count + 1,
    });
  });

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const summaries: CategorySummary[] = Array.from(categoryMap.entries()).map(
    ([category, data]) => ({
      category,
      amount: data.amount,
      count: data.count,
      percentage: totalAmount > 0 ? (data.amount / totalAmount) * 100 : 0,
    })
  );

  return summaries.sort((a, b) => b.amount - a.amount);
}

export function calculateDailySpending(expenses: Expense[], days: number = 30): DailySpending[] {
  const { start, end } = getLast30Days();
  const filteredExpenses = expenses.filter((expense) =>
    isWithinInterval(parseISO(expense.date), { start: parseISO(start), end: parseISO(end) })
  );

  const dailyMap = new Map<string, number>();

  filteredExpenses.forEach((expense) => {
    const dateKey = format(parseISO(expense.date), 'yyyy-MM-dd');
    const current = dailyMap.get(dateKey) || 0;
    dailyMap.set(dateKey, current + expense.amount);
  });

  const dailySpending: DailySpending[] = Array.from(dailyMap.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return dailySpending;
}

export function exportToCSV(expenses: Expense[]): void {
  const headers = ['Date', 'Category', 'Amount', 'Description'];
  const rows = expenses.map((expense) => [
    formatDate(expense.date),
    expense.category,
    expense.amount.toFixed(2),
    expense.description.replace(/,/g, ';'), // Replace commas to avoid CSV issues
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function sortExpenses(
  expenses: Expense[],
  field: 'date' | 'amount' | 'category',
  order: 'asc' | 'desc'
): Expense[] {
  return [...expenses].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'date':
        comparison = a.date.localeCompare(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });
}

export function validateExpenseForm(data: {
  date: string;
  amount: string;
  category: string;
  description: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.amount || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
