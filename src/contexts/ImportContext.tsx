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
  draftItems: ImportDraftPackageType[] | null;
  orderItems: ImportOrderPackageType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ImportRequestPackageType[] | null;
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

export type ImportOrderPackageInput = {
  origin: string;
  packageDeliveryStatus: (typeof SHIPPING_STATUS)[number];
  items: ImportItemType[];
};

export type ImportDraftPackageType = ImportOrderPackageInput & {
  draftDate: string;
};

export type ImportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: string;
  items: ImportItemType[];
};

export type ImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: ImportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const ImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackages, setDraftPackages] = useState<
    ImportDraftPackageType[] | null
  >(null);
  const [orderPackages, setOrderPackages] = useState<
    ImportOrderPackageType[] | null
  >(null);
  const [payNowAction, setPayNowAction] =
    useState<ImportContextType["payNowAction"]>(null);
  const [requestPackages, setRequestPackages] = useState<
    ImportRequestPackageType[] | null
  >(null);

  const handleDrafts = () => {
    setDraftPackages(importDrafts);
  };

  const handleOrders = () => {
    setOrderPackages(importOrders);
  };

  const handlePayNowAction = (action: ImportContextType["payNowAction"]) => {
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

  const value: ImportContextType = {
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
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};

export default ImportContextProvider;
