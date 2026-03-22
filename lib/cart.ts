/**
 * E-book cart (koszyk) — persisted in localStorage as JSON.
 * Cleared on each full document load via `app/layout.tsx` (beforeInteractive script).
 *
 * Events:
 * - `CART_UPDATE_EVENT` — cart data changed (badge / drawer refresh).
 * - `CART_OPEN_DRAWER_EVENT` — open cart drawer (e.g. after „Dodaj do koszyka”).
 */

import { EBOOKS, type Ebook } from '@/lib/ebooks';

export const CART_STORAGE_KEY = 'smartweave_ebook_in_cart';
export const CART_UPDATE_EVENT = 'smartweave-cart-update';
export const CART_OPEN_DRAWER_EVENT = 'smartweave-cart-open-drawer';

/** Ask the Header to open the cart drawer (must run in browser). */
export function requestOpenCartDrawer(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CART_OPEN_DRAWER_EVENT));
}

const CART_VERSION = 2 as const;

export type CartStoredItem = {
  id: string;
  quantity: number;
};

type CartPayload = {
  v: typeof CART_VERSION;
  items: CartStoredItem[];
};

/** Parsed unit price in PLN from label like "89 zł". */
export function parsePricePln(priceLabel: string): number {
  const m = priceLabel.replace(/\s/g, '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function emptyPayload(): CartPayload {
  return { v: CART_VERSION, items: [] };
}

function readPayload(): CartPayload {
  if (typeof window === 'undefined') return emptyPayload();
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return emptyPayload();
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      (parsed as CartPayload).v === CART_VERSION &&
      Array.isArray((parsed as CartPayload).items)
    ) {
      const items = (parsed as CartPayload).items
        .filter((i) => i && typeof i.id === 'string' && typeof i.quantity === 'number')
        .map((i) => ({ id: i.id, quantity: Math.max(0, Math.floor(i.quantity)) }))
        .filter((i) => i.quantity > 0);
      return { v: CART_VERSION, items };
    }
    // Legacy: plain number — do not migrate into unknown SKU; start clean.
    return emptyPayload();
  } catch {
    return emptyPayload();
  }
}

function writePayload(payload: CartPayload): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(
      new CustomEvent(CART_UPDATE_EVENT, { detail: { count: getTotalQuantityFromPayload(payload) } })
    );
  } catch {
    // ignore
  }
}

function getTotalQuantityFromPayload(p: CartPayload): number {
  return p.items.reduce((sum, i) => sum + i.quantity, 0);
}

export type CartLine = {
  id: string;
  title: string;
  image?: string;
  priceLabel: string;
  unitPln: number;
  quantity: number;
  lineTotalPln: number;
};

function ebookById(id: string): Ebook | undefined {
  return EBOOKS.find((b) => b.id === id);
}

/** All cart lines with catalog metadata; unknown ids are dropped. */
export function getCartLines(): CartLine[] {
  const { items } = readPayload();
  const lines: CartLine[] = [];
  for (const row of items) {
    const book = ebookById(row.id);
    if (!book) continue;
    const unitPln = parsePricePln(book.price);
    lines.push({
      id: book.id,
      title: book.title,
      image: book.image,
      priceLabel: book.price,
      unitPln,
      quantity: row.quantity,
      lineTotalPln: unitPln * row.quantity,
    });
  }
  return lines;
}

export function getCartSubtotalPln(): number {
  return getCartLines().reduce((s, l) => s + l.lineTotalPln, 0);
}

/** Sum of line quantities (badge). */
export function getCartCount(): number {
  return getTotalQuantityFromPayload(readPayload());
}

/** Add one unit (or merge qty) of an e-book by catalog id. */
export function addEbookToCart(ebookId: string, addQty = 1): void {
  if (typeof window === 'undefined') return;
  if (!ebookById(ebookId)) return;
  const qty = Math.max(1, Math.floor(addQty));
  const payload = readPayload();
  const idx = payload.items.findIndex((i) => i.id === ebookId);
  if (idx >= 0) payload.items[idx]!.quantity += qty;
  else payload.items.push({ id: ebookId, quantity: qty });
  writePayload(payload);
}

export function setLineQuantity(ebookId: string, quantity: number): void {
  const payload = readPayload();
  const q = Math.floor(quantity);
  if (q <= 0) {
    payload.items = payload.items.filter((i) => i.id !== ebookId);
  } else {
    const idx = payload.items.findIndex((i) => i.id === ebookId);
    if (idx >= 0) payload.items[idx]!.quantity = q;
    else if (ebookById(ebookId)) payload.items.push({ id: ebookId, quantity: q });
  }
  writePayload(payload);
}

export function incrementLine(ebookId: string): void {
  const payload = readPayload();
  const idx = payload.items.findIndex((i) => i.id === ebookId);
  if (idx >= 0) payload.items[idx]!.quantity += 1;
  else if (ebookById(ebookId)) payload.items.push({ id: ebookId, quantity: 1 });
  writePayload(payload);
}

export function decrementLine(ebookId: string): void {
  const payload = readPayload();
  const idx = payload.items.findIndex((i) => i.id === ebookId);
  if (idx < 0) return;
  const next = payload.items[idx]!.quantity - 1;
  if (next <= 0) payload.items.splice(idx, 1);
  else payload.items[idx]!.quantity = next;
  writePayload(payload);
}

export function removeLine(ebookId: string): void {
  const payload = readPayload();
  payload.items = payload.items.filter((i) => i.id !== ebookId);
  writePayload(payload);
}

/** @deprecated Use addEbookToCart(id). */
export function setEbookCartFlag(): void {
  const first = EBOOKS[0];
  if (first) addEbookToCart(first.id, 1);
}
