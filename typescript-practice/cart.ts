interface CartItem {
  price: number;
  qty: number;
}

interface CartSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export function formatCartTotal(
  items: CartItem[],
  taxRate: number
): CartSummary {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const tax = subtotal * taxRate;

  return {
    subtotal,
    tax,
    total: subtotal + tax
  };
}