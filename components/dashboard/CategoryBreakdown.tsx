'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategorySummary } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/constants';

interface CategoryBreakdownProps {
  data: CategorySummary[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spending by Category</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No category data available</p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
    count: item.count,
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Spending by Category</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                />
                <span className="text-sm font-medium">
                  {CATEGORY_ICONS[item.category]} {item.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(item.amount)}
                </p>
                <p className="text-xs text-gray-500">{item.count} expenses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
