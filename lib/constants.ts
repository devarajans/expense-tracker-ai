import { Category } from './types';

export const CATEGORIES: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#f59e0b',
  Transportation: '#3b82f6',
  Entertainment: '#ec4899',
  Shopping: '#8b5cf6',
  Bills: '#ef4444',
  Other: '#6b7280',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '💳',
  Other: '📦',
};

export const CURRENCY_SYMBOL = '$';
export const LOCALE = 'en-US';

export const DEFAULT_FILTERS = {
  category: 'All' as const,
  startDate: null,
  endDate: null,
  searchQuery: '',
};

export const STORAGE_KEY = 'expense-tracker-data';
