export type Category = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;
  date: string; // ISO format
  amount: number;
  category: Category;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFilters {
  category: Category | 'All';
  startDate: string | null;
  endDate: string | null;
  searchQuery: string;
}

export interface ExpenseFormData {
  date: string;
  amount: string;
  category: Category;
  description: string;
}

export interface SummaryStats {
  totalSpending: number;
  monthlySpending: number;
  expenseCount: number;
  averageExpense: number;
  topCategory: { category: Category; amount: number } | null;
}

export interface CategorySummary {
  category: Category;
  amount: number;
  count: number;
  percentage: number;
}

export interface DailySpending {
  date: string;
  amount: number;
}

export type SortField = 'date' | 'amount' | 'category';
export type SortOrder = 'asc' | 'desc';
