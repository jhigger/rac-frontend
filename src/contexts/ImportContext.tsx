import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type ID_TYPE,
  type ORDER_STATUS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
} from "~/constants";
import { importDrafts, importOrders, importRequests } from "~/fake data";

export type ImportContextType = {
  draftItems: ImportDraftItemType[] | null;
  orderItems: ImportOrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ImportRequestItemType[] | null;
  handleDrafts: () => void;
  handleOrders: () => void;
  handlePayNowAction: (action: ImportContextType["payNowAction"]) => void;
  handleRequests: () => void;
};

export const ImportContext = createContext<ImportContextType>(
  {} as ImportContextType,
);

export const useImportContext = () => useContext(ImportContext);

type ImportItemType = {
  name: string;
  idType: (typeof ID_TYPE)[number];
  idNumber: string;
  deliveryStatus: string;
  deliveredBy: string;
  originalCost: string;
  quantity: number;
  images: string[];
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
};

export type ImportOrderItemInput = {
  origin: string;
  packageDeliveryStatus: string;
  items: ImportItemType[];
};

export type ImportDraftItemType = ImportOrderItemInput & {
  draftDate: string;
};

export type ImportOrderItemType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: string;
  items: ImportItemType[];
};

export type ImportRequestItemType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: ImportItemType[];
}

export type PropertyType = { label: string; value: string | undefined };

const ImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftItems, setDraftItems] = useState<ImportDraftItemType[] | null>(
    null,
  );
  const [orderItems, setOrderItems] = useState<ImportOrderItemType[] | null>(
    null,
  );
  const [payNowAction, setPayNowAction] =
    useState<ImportContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<
    ImportRequestItemType[] | null
  >(null);

  const handleDrafts = () => {
    setDraftItems(importDrafts);
  };

  const handleOrders = () => {
    setOrderItems(importOrders);
  };

  const handlePayNowAction = (action: ImportContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestItems(importRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ImportContextType = {
    draftItems,
    orderItems,
    payNowAction,
    requestItems,
    handleDrafts,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return (
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};

export default ImportContextProvider;
