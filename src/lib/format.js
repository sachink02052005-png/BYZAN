/**
 * Formatting helpers. Currency/locale are fixed for the Indian market;
 * change them here if the store ever localises.
 */

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/**
 * Format a rupee amount for display.
 *   formatPrice(8000)  -> "₹8,000"
 *   formatPrice(25000) -> "₹25,000"
 *
 * Store prices as integers (whole rupees, or paise in the commerce
 * backend) and format only at the edge, in the UI.
 */
export function formatPrice(amount) {
  return priceFormatter.format(amount)
}
