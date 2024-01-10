import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  type ORDER_STATUS,
  type ORIGINS,
  type PAYMENT_STATUS,
  type SHIPPING_METHODS,
  type SHIPPING_STATUS,
} from "~/constants";
import { exportOrders, exportRequests } from "~/fake data";
import { type BillingDetailsType } from "./AutoImportContext";
import {
  type ImportItemType,
  type ImportRequestPackageType,
} from "./ImportContext";
import { type PackageCostsType } from "./ShopContext";

export type ExportContextType = {
  draftPackage: ExportDraftPackageType | null;
  localDraft: ExportLocalDraftType;
  orderPackages: ExportOrderPackageType[];
  requestPackages: ExportRequestPackageType[];
  handleDraft: (draftPackage: ExportDraftPackageType | null) => void;
  handleLocalDraft: (localDraft: ExportLocalDraftType) => void;
  handleOrders: () => void;
  handleRequests: () => void;
};

export const ExportContext = createContext<ExportContextType>(
  {} as ExportContextType,
);

export const useExportContext = () => useContext(ExportContext);

export type ExportDraftPackageType = ExportRequestPackageType;

export type ExportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  originWarehouse: (typeof ORIGINS)[number];
  destinationDetails: BillingDetailsType;
  items: ImportItemType[];
  billingDetails: BillingDetailsType;
  shippingMethod: (typeof SHIPPING_METHODS)[number];
  shippingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  packageCosts: PackageCostsType;
};

export type ExportRequestPackageType = ImportRequestPackageType;

export type PropertyType = { label: string; value: string | undefined };

type ExportLocalDraftType = {
  requestPackage: ExportDraftPackageType | null | undefined;
} | null;

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackage] =
    useState<ExportDraftPackageType | null>(null);

  const [localDraft, setLocalDraft] = useLocalStorage<ExportLocalDraftType>(
    "Export",
    {
      requestPackage: draftPackage,
    },
  );

  const [orderPackages, setOrderPackages] = useState<ExportOrderPackageType[]>(
    [],
  );
  const [requestPackages, setRequestPackages] = useState<
    ExportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: ExportDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleLocalDraft = (localDraft: ExportLocalDraftType) => {
    setLocalDraft(localDraft);
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
    localDraft,
    orderPackages,
    requestPackages,
    handleDraft,
    handleLocalDraft,
    handleOrders,
    handleRequests,
  };

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};

export default ExportContextProvider;
