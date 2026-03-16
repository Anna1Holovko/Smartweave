export const CART_STORAGE_KEY = 'smartweave_ebook_in_cart';
export const CART_UPDATE_EVENT = 'smartweave-cart-update';

function getStoredCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (raw === null) return 0;
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return raw === '1' ? 1 : 0;
    return Math.max(0, n);
  } catch {
    return 0;
  }
}

export function getCartCount(): number {
  return getStoredCount();
}

/** Call when user adds an e-book to cart. Increments count and notifies (e.g. header). */
export function addEbookToCart(): void {
  if (typeof window === 'undefined') return;
  try {
    const count = Math.max(1, getStoredCount() + 1);
    window.localStorage.setItem(CART_STORAGE_KEY, String(count));
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { detail: { count } }));
  } catch {
    // ignore
  }
}

/** @deprecated Use addEbookToCart. Kept for compatibility. */
export function setEbookCartFlag(): void {
  addEbookToCart();
}
