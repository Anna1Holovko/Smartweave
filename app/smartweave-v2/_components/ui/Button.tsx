import { forwardRef } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

const variants = {
  primary:
    'v2-cta-gradient text-white hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]',
  secondary:
    'bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30 rounded-full',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      type={props.type ?? 'button'}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';
