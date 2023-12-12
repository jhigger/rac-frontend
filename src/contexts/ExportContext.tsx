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
  clearDrafts: () => void;
  draftItems: ExportDraftPackageType[] | null;
  orderItems: ExportOrderPackageType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ExportRequestPackageType[] | null;
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

export type ExportOrderPackageInput = {
  origin: string;
  packageDeliveryStatus: (typeof SHIPPING_STATUS)[number];
  items: ExportItemType[];
};

export type ExportDraftPackageType = ExportOrderPackageInput & {
  draftDate: string;
};

export type ExportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: string;
  items: ExportItemType[];
};

export type ExportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: ExportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackages, setDraftPackages] = useState<
    ExportDraftPackageType[] | null
  >(null);
  const [orderPackages, setOrderPackages] = useState<
    ExportOrderPackageType[] | null
  >(null);
  const [payNowAction, setPayNowAction] =
    useState<ExportContextType["payNowAction"]>(null);
  const [requestPackages, setRequestPackages] = useState<
    ExportRequestPackageType[] | null
  >(null);

  const clearDrafts = () => {
    setDraftPackages(null);
  };

  const handleDrafts = () => {
    setDraftPackages(importDrafts);
  };

  const handleOrders = () => {
    setOrderPackages(importOrders);
  };

  const handlePayNowAction = (action: ExportContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestPackages(importRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
    handleDrafts();
  }, []);

  const value: ExportContextType = {
    clearDrafts,
    draftItems: draftPackages,
    orderItems: orderPackages,
    payNowAction,
    requestItems: requestPackages,
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
