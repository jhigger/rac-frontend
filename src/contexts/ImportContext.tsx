import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { orders, requests } from "~/fake data";

export type ImportContextType = {
  orderItems: OrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  properties: PropertyType[] | null;
  requestItems: RequestItemType[] | null;
  handlePayNowAction: (action: ImportContextType["payNowAction"]) => void;
  handleOrders: () => void;
  handleProperties: (p: PropertyType[] | null) => void;
  handleRequests: () => void;
};

export const ImportContext = createContext<ImportContextType>(
  {} as ImportContextType,
);

export const useImportContext = () => useContext(ImportContext);

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

const ImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [payNowAction, setPayNowAction] =
    useState<ImportContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<RequestItemType[] | null>(
    null,
  );
  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  const handleOrders = () => {
    setOrderItems(orders);
  };

  const handlePayNowAction = (action: ImportContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleProperties = (p: PropertyType[] | null) => {
    setProperties(p);
  };

  const handleRequests = () => {
    setRequestItems(requests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ImportContextType = {
    orderItems,
    payNowAction,
    properties,
    requestItems,
    handleOrders,
    handlePayNowAction,
    handleProperties,
    handleRequests,
  };

  return (
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};

export default ImportContextProvider;
