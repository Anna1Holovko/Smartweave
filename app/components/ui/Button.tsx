import { forwardRef } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

const variants = {
  primary:
    'cta-gradient-animated rounded-full',
  secondary:
    'bg-transparent border-2 border-[var(--border-soft)] text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:bg-white/[0.04] rounded-full',
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
