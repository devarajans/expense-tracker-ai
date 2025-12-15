'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/expenses', label: 'Expenses', icon: '💰' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-3xl">💸</span>
            <h1 className="text-xl font-bold text-foreground">Expense Tracker</h1>
          </div>

          <nav className="flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
