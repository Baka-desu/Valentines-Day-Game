import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import clsx from 'clsx';

interface CringeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CringeButton({ children, variant = 'primary', size = 'md', className, onClick, disabled }: CringeButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-hot-pink to-neon-purple text-white',
    secondary: 'bg-gradient-to-r from-warning-yellow to-orange-400 text-black',
    danger: 'bg-gradient-to-r from-red-500 to-hot-pink-dark text-white',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={clsx(
        'font-bold rounded-lg shadow-lg cursor-pointer',
        'border-2 border-white/30',
        'hover:shadow-xl hover:brightness-110',
        'active:brightness-90',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      style={{ fontFamily: '"Comic Sans MS", cursive' }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
