
import React from 'react';
import { AppTheme } from '../theme/app_theme';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseCard: React.FC<BaseCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`${AppTheme.cardTheme} ${className}`}>
      {children}
    </div>
  );
};
