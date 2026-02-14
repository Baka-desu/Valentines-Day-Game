import { type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface PinkInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function PinkInput({ label, className, ...props }: PinkInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold text-hot-pink-dark mb-1">
          💕 {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-3 py-2 rounded-lg',
          'border-2 border-hot-pink',
          'bg-white text-gray-800',
          'placeholder:text-soft-pink',
          'focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30',
          'focus:animate-wiggle',
          'transition-colors duration-200',
          className
        )}
        style={{ fontFamily: '"Comic Sans MS", cursive' }}
        {...props}
      />
    </div>
  );
}
