/**
 * Polar API Client
 *
 * Official Polar API documentation: https://api.polar.sh/docs
 *
 * This client handles all interactions with Polar's payment/subscription API
 */

import type {
  PolarProduct,
  PolarPrice,
  PolarCheckoutSession,
  PolarSubscription,
} from '@/types';

const POLAR_API_BASE = 'https://api.polar.sh/v1';
const POLAR_ACCESS_TOKEN = import.meta.env.VITE_POLAR_ACCESS_TOKEN;

if (!POLAR_ACCESS_TOKEN) {
  console.warn('⚠️  Polar Access Token not configured. Billing features will not work.');
}

/**
 * Generic API request helper
 */
async function polarRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${POLAR_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Polar API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get all products (subscription plans)
 */
export async function getProducts(): Promise<PolarProduct[]> {
  const response = await polarRequest<{ items: PolarProduct[] }>('/products');
  return response.items || [];
}

/**
 * Get a specific product by ID
 */
export async function getProduct(productId: string): Promise<PolarProduct> {
  return polarRequest<PolarProduct>(`/products/${productId}`);
}

/**
 * Create a checkout session for a product/price
 */
export interface CreateCheckoutOptions {
  productId: string;
  priceId: string;
  customerEmail?: string;
  successUrl?: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession(
  options: CreateCheckoutOptions
): Promise<PolarCheckoutSession> {
  const { productId, priceId, customerEmail, successUrl, metadata } = options;

  return polarRequest<PolarCheckoutSession>('/checkouts', {
    method: 'POST',
    body: JSON.stringify({
      product_id: productId,
      price_id: priceId,
      customer_email: customerEmail,
      success_url: successUrl || `${window.location.origin}/checkout/success`,
      customer_metadata: metadata,
    }),
  });
}

/**
 * Get checkout session by ID
 */
export async function getCheckoutSession(
  checkoutId: string
): Promise<PolarCheckoutSession> {
  return polarRequest<PolarCheckoutSession>(`/checkouts/${checkoutId}`);
}

/**
 * Get all subscriptions for an organization
 * Note: This requires proper API scoping and authentication
 */
export async function getSubscriptions(): Promise<PolarSubscription[]> {
  const response = await polarRequest<{ items: PolarSubscription[] }>('/subscriptions');
  return response.items || [];
}

/**
 * Get a specific subscription
 */
export async function getSubscription(
  subscriptionId: string
): Promise<PolarSubscription> {
  return polarRequest<PolarSubscription>(`/subscriptions/${subscriptionId}`);
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<PolarSubscription> {
  return polarRequest<PolarSubscription>(`/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
  });
}

/**
 * Reactivate a canceled subscription
 */
export async function reactivateSubscription(
  subscriptionId: string
): Promise<PolarSubscription> {
  return polarRequest<PolarSubscription>(`/subscriptions/${subscriptionId}/reactivate`, {
    method: 'POST',
  });
}

/**
 * Get the customer portal URL (for managing subscriptions)
 */
export async function getCustomerPortalUrl(customerId: string): Promise<string> {
  const response = await polarRequest<{ url: string }>(`/customers/${customerId}/portal`);
  return response.url;
}

/**
 * Helper: Format price for display
 */
export function formatPrice(price: PolarPrice): string {
  const amount = price.price_amount / 100; // Convert cents to dollars
  const currency = price.price_currency.toUpperCase();

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.price_currency,
  }).format(amount);

  if (price.recurring_interval) {
    return `${formatted}/${price.recurring_interval}`;
  }

  return formatted;
}

/**
 * Helper: Get the monthly/yearly price from a product
 */
export function getPriceByInterval(
  product: PolarProduct,
  interval: 'month' | 'year'
): PolarPrice | undefined {
  return product.prices.find(
    (price) => price.type === 'recurring' && price.recurring_interval === interval
  );
}

/**
 * Helper: Check if subscription is active
 */
export function isSubscriptionActive(subscription: PolarSubscription): boolean {
  return subscription.status === 'active';
}

/**
 * Helper: Check if subscription is past due
 */
export function isSubscriptionPastDue(subscription: PolarSubscription): boolean {
  return subscription.status === 'past_due';
}

/**
 * Helper: Check if subscription will cancel at period end
 */
export function willCancelAtPeriodEnd(subscription: PolarSubscription): boolean {
  return subscription.cancel_at_period_end;
}

// Export client configuration for debugging
export const polarConfig = {
  apiBase: POLAR_API_BASE,
  hasToken: !!POLAR_ACCESS_TOKEN,
};
