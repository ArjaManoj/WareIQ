'use client';

import React from 'react';
import { cn, getStatusColor } from '@/lib/utils';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'neutral' | 'blue' | 'emerald' | 'amber' | 'rose' | 'purple';
  status?: string;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  status,
  className,
  dot = true,
}) => {
  if (status) {
    const { bg, text, dot: dotColor } = getStatusColor(status);
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
          bg,
          text,
          className
        )}
      >
        {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColor)} />}
        {children || status}
      </span>
    );
  }

  const variants: Record<string, string> = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant] || variants.neutral,
        className
      )}
    >
      {children}
    </span>
  );
};
