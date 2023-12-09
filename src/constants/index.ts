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

export const REQUEST_STATUS = ["responded", "not responded"] as const;

export const ID_TYPE = ["Order ID", "Tracking ID", "Shipping ID"] as const;

export const SHOP_FOR_ME_STATUS = [
  "purchase not started",
  "purchase in progress",
  "purchase completed",
] as const;