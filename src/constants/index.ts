export const ORDER_STATUS = [
  "responded",
  "processed",
  "not responded",
] as const;

export const SHIPPING_STATUS = [
  "ready for shipping",
  "not started",
  "processing",
  "cancelled",
  "in transit",
  "arrived destination",
  "cleared",
  "delivered",
] as const;

export const REQUEST_STATUS = ["Responded", "Not Responded"] as const;

export const ID_TYPE = ["Order ID", "Tracking ID", "Shipping ID"] as const;

export const SHOP_FOR_ME_STATUS = [
  "Arrived Origin Warehouse",
  "Not Arrived Origin Warehouse",
  "Sorted Out",
] as const;

export const ACTION_CONST = [
  "proceed to checkout",
  "order details",
  "request details",
  "draft details",
  "request new order",
  "initiate shipping",
  "clear package",
  "track",
] as const;

export const TAB_IDS = ["orders", "requests", "drafts"] as const;

export const ORIGINS = [
  "Nigeria Warehouse (Lagos)",
  "US Warehouse (Richmond Texas)",
  "UK Warehouse (London)",
  "Dubai Warehouse",
  "China Warehouse (Guangzhou city)",
] as const;

export const STORES = [
  "Amazon",
  "Ebay",
  "Aliexpress",
  "Walmart",
  "Others",
] as const;

export const CONDITIONS = ["Drivable", "Not Drivable"] as const;
