export const CART_STORAGE_KEY = 'smartweave_ebook_in_cart';
export const CART_UPDATE_EVENT = 'smartweave-cart-update';

export function setEbookCartFlag(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, '1');
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
  } catch {
    // ignore
  }
}
