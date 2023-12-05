import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { orders, requests } from "~/fake data";

export type ShopContextType = {
  orderItems: OrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  properties: PropertyType[] | null;
  requestItems: RequestItemType[] | null;
  handlePayNowAction: (action: ShopContextType["payNowAction"]) => void;
  handleOrders: () => void;
  handleProperties: (p: PropertyType[] | null) => void;
  handleRequests: () => void;
};

export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType,
);

export const useShopContext = () => useContext(ShopContext);

const ORDER_STATUS = ["responded", "processed", "not responded"] as const;
const SHIPPING_STATUS = [
  "ready for shipping",
  "not started",
  "processing",
  "cancelled",
  "in transit",
  "arrived destination",
  "cleared",
  "delivered",
] as const;
const SHOP_FOR_ME_STATUS = [
  "purchase not started",
  "purchase in progress",
  "purchase completed",
] as const;

export type OrderItemType = {
  images: string[];
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shopForMeStatus: (typeof SHOP_FOR_ME_STATUS)[number];
  shopForMeCost: string;
  shippingCost: string;
};

const REQUEST_STATUS = ["responded", "not responded"] as const;

export type RequestItemType = {
  images: string[];
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
};

export type PropertyType = { label: string; value: string | undefined };

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [payNowAction, setPayNowAction] =
    useState<ShopContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<RequestItemType[] | null>(
    null,
  );
  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  const handleOrders = () => {
    setOrderItems(orders);
  };

  const handlePayNowAction = (action: ShopContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleProperties = (p: PropertyType[] | null) => {
    setProperties(p);
  };

  const handleRequests = () => {
    handleOrders();
    setRequestItems(requests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ShopContextType = {
    orderItems,
    payNowAction,
    properties,
    requestItems,
    handleOrders,
    handlePayNowAction,
    handleProperties,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
