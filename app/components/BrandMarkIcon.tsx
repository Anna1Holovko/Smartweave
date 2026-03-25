/** Brand mark path - shared with CustomCursor */
export const BRAND_MARK_PATH =
  'M14.2509 18.8437C21.2528 16.4365 56.9052 27.7512 74.9489 26.6485C113.516 24.2891 131.767 17.0105 167.386 0C138.021 52.9757 129.684 99.1127 151.876 148.939C147.406 153.756 114.732 140.343 102.77 139.874C59.2492 138.17 39.8345 147.683 0 167.282C1.02967 165.483 2.01572 163.664 2.95746 161.831C32.2596 105.284 30.0287 70.1915 14.2509 18.8437Z';

type BrandMarkIconProps = {
  className?: string;
  title?: string;
};

export function BrandMarkIcon({ className = 'w-3 h-3', title }: BrandMarkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 168 168"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d={BRAND_MARK_PATH} fill="currentColor" />
    </svg>
  );
}
