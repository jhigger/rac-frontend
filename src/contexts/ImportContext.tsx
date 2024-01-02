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
import { importOrders, importRequests } from "~/fake data";

export type ImportContextType = {
  draftPackage: ImportDraftPackageType | null;
  orderPackages: ImportOrderPackageType[];
  requestPackages: ImportRequestPackageType[];
  handleDraft: (draftPackage: ImportDraftPackageType | null) => void;
  handleOrders: () => void;
  handleRequests: () => void;
};

export const ImportContext = createContext<ImportContextType>(
  {} as ImportContextType,
);

export const useImportContext = () => useContext(ImportContext);

export type ImportItemType = {
  name: string;
  idType: (typeof ID_TYPE)[number];
  idNumber: string;
  deliveryStatus: string;
  deliveredBy: string;
  originalCost: number;
  quantity: number;
  image: string;
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
};

export type ImportDraftPackageType = ImportRequestPackageType;

export type ImportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: number;
  items: ImportItemType[];
};

export type ImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestLocalDate: string;
  items: ImportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const ImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackages] =
    useState<ImportDraftPackageType | null>(null);
  const [orderPackages, setOrderPackages] = useState<ImportOrderPackageType[]>(
    [],
  );
  const [requestPackages, setRequestPackages] = useState<
    ImportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: ImportDraftPackageType | null) => {
    setDraftPackages(draftPackage);
  };

  const handleOrders = () => {
    setOrderPackages(importOrders);
  };

  const handleRequests = () => {
    setRequestPackages(importRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ImportContextType = {
    draftPackage,
    orderPackages,
    requestPackages,
    handleDraft,
    handleOrders,
    handleRequests,
  };

  return (
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};

export default ImportContextProvider;
