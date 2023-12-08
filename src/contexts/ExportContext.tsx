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

export type ExportContextType = {
  draftItems: ExportDraftItemType[] | null;
  orderItems: ExportOrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ExportRequestItemType[] | null;
  handleDrafts: () => void;
  handleOrders: () => void;
  handlePayNowAction: (action: ExportContextType["payNowAction"]) => void;
  handleRequests: () => void;
};

export const ExportContext = createContext<ExportContextType>(
  {} as ExportContextType,
);

export const useExportContext = () => useContext(ExportContext);

type ExportItemType = {
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

export type ExportOrderItemInput = {
  origin: string;
  packageDeliveryStatus: (typeof SHIPPING_STATUS)[number];
  items: ExportItemType[];
};

export type ExportDraftItemType = ExportOrderItemInput & {
  draftDate: string;
};

export type ExportOrderItemType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: string;
  items: ExportItemType[];
};

export type ExportRequestItemType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: ExportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftItems, setDraftItems] = useState<
    ExportDraftItemType[] | null
  >(null);
  const [orderItems, setOrderItems] = useState<
    ExportOrderItemType[] | null
  >(null);
  const [payNowAction, setPayNowAction] =
    useState<ExportContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<
    ExportRequestItemType[] | null
  >(null);

  const handleDrafts = () => {
    setDraftItems(importDrafts);
  };

  const handleOrders = () => {
    setOrderItems(importOrders);
  };

  const handlePayNowAction = (action: ExportContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestItems(importRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
    handleDrafts();
  }, []);

  const value: ExportContextType = {
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
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};

export default ExportContextProvider;
