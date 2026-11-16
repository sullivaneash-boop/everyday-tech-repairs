/**
 * Analytics events. Safe to call anywhere on the client: it does nothing when
 * Google Analytics isn't loaded. NEVER pass personal information (names,
 * emails, phone numbers, addresses, free-text answers) as event parameters.
 */
export type AnalyticsEvent =
  | "repair_request_submitted"
  | "sell_device_submitted"
  | "phone_click"
  | "email_click"
  | "cta_click";

type Params = Record<string, string | number | boolean>;

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}
