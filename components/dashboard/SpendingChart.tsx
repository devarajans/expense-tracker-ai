'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailySpending } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface SpendingChartProps {
  data: DailySpending[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spending Trend (Last 30 Days)</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No spending data available</p>
        </div>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    date: formatDate(item.date, 'MMM dd'),
    amount: item.amount,
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Spending Trend (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
