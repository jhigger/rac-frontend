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
import { exportOrders, exportRequests } from "~/fake data";

export type ExportContextType = {
  draftPackage: ExportDraftPackageType | null;
  orderPackages: ExportOrderPackageType[];
  requestPackages: ExportRequestPackageType[];
  handleDraft: (draftPackage: ExportDraftPackageType | null) => void;
  handleOrders: () => void;
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
  originalCost: number;
  quantity: number;
  image: string;
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
};

export type ExportDraftPackageType = ExportRequestPackageType;

export type ExportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: number;
  items: ExportItemType[];
};

export type ExportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestLocalDate: string;
  items: ExportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackage] =
    useState<ExportDraftPackageType | null>(null);
  const [orderPackages, setOrderPackages] = useState<ExportOrderPackageType[]>(
    [],
  );
  const [requestPackages, setRequestPackages] = useState<
    ExportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: ExportDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleOrders = () => {
    setOrderPackages(exportOrders);
  };

  const handleRequests = () => {
    setRequestPackages(exportRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ExportContextType = {
    draftPackage,
    orderPackages,
    requestPackages,
    handleDraft,
    handleOrders,
    handleRequests,
  };

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};

export default ExportContextProvider;
