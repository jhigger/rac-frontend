import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type REQUEST_STATUS,
  type ORDER_STATUS,
  type SHIPPING_STATUS,
  type ID_TYPE,
} from "~/constants";
import { orders, requests } from "~/fake data";

export type ImportContextType = {
  orderItems: ImportOrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ImportRequestItemType[] | null;
  handlePayNowAction: (action: ImportContextType["payNowAction"]) => void;
  handleOrders: () => void;
  handleRequests: () => void;
};

export const ImportContext = createContext<ImportContextType>(
  {} as ImportContextType,
);

export const useImportContext = () => useContext(ImportContext);

export type ImportOrderItemType = {
  images: string[];
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: string;
};

export type ImportRequestItemType = {
  images: string[];
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  itemName: string;
  idType: (typeof ID_TYPE)[number];
  idNumber: string;
  itemDeliveryStatus: string; // todo: update types
  deliveredBy: string;
  itemOriginalCost: string;
  quantity: number;
  additionalItemDescription: string;
};

export type PropertyType = { label: string; value: string | undefined };

const ImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<ImportOrderItemType[] | null>(
    null,
  );
  const [payNowAction, setPayNowAction] =
    useState<ImportContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<
    ImportRequestItemType[] | null
  >(null);

  const handleOrders = () => {
    setOrderItems(orders as ImportOrderItemType[]);
  };

  const handlePayNowAction = (action: ImportContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestItems(requests as ImportRequestItemType[]);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ImportContextType = {
    orderItems,
    payNowAction,
    requestItems,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return (
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};

export default ImportContextProvider;
