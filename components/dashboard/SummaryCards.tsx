'use client';

import React from 'react';
import { SummaryStats } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';

interface SummaryCardsProps {
  stats: SummaryStats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Spending',
      value: formatCurrency(stats.totalSpending),
      icon: '💰',
      color: 'bg-primary',
    },
    {
      title: 'This Month',
      value: formatCurrency(stats.monthlySpending),
      icon: '📅',
      color: 'bg-secondary',
    },
    {
      title: 'Total Expenses',
      value: stats.expenseCount.toString(),
      icon: '📊',
      color: 'bg-success',
    },
    {
      title: 'Average Expense',
      value: formatCurrency(stats.averageExpense),
      icon: '📈',
      color: 'bg-warning',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{card.value}</p>
          {card.title === 'Total Expenses' && stats.topCategory && (
            <p className="text-sm text-gray-500 mt-2">
              Top: {CATEGORY_ICONS[stats.topCategory.category]}{' '}
              {stats.topCategory.category}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
