import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  type COURIERS,
  type ID_TYPE,
  type ITEM_DELIVERY_STATUS,
  type ORDER_STATUS,
  type ORIGINS,
  type PACKAGE_DELIVERY_STATUS,
  type PAYMENT_STATUS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
} from "~/constants";
import { importOrders, importRequests } from "~/fake data";
import {
  type BillingDetailsType,
  type ShipmentDetailsType,
} from "./AutoImportContext";
import { type PackageCostsType } from "./ShopContext";

export type ImportContextType = {
  draftPackage: ImportDraftPackageType | null;
  localDraft: ImportLocalDraftType;
  orderPackages: ImportOrderPackageType[];
  requestPackages: ImportRequestPackageType[];
  handleDraft: (draftPackage: ImportDraftPackageType | null) => void;
  handleLocalDraft: (localDraft: ImportLocalDraftType) => void;
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
  deliveryStatus: (typeof ITEM_DELIVERY_STATUS)[number];
  deliveredBy: (typeof COURIERS)[number];
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
  originWarehouse: (typeof ORIGINS)[number];
  items: ImportItemType[];
  shipmentDetails: ShipmentDetailsType;
  billingDetails: BillingDetailsType;
  shippingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  packageCosts: PackageCostsType;
};

export type ImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestLocalDate: string;
  originWarehouse: (typeof ORIGINS)[number];
  deliveryStatus: (typeof PACKAGE_DELIVERY_STATUS)[number];
  items: ImportItemType[];
  packageCosts: PackageCostsType;
};

export type PropertyType = { label: string; value: string | undefined };

type ImportLocalDraftType = {
  requestPackage: ImportDraftPackageType | null | undefined;
} | null;

const ImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackages] =
    useState<ImportDraftPackageType | null>(null);

  const [localDraft, setLocalDraft] = useLocalStorage<ImportLocalDraftType>(
    "Import",
    {
      requestPackage: draftPackage,
    },
  );

  const [orderPackages, setOrderPackages] = useState<ImportOrderPackageType[]>(
    [],
  );
  const [requestPackages, setRequestPackages] = useState<
    ImportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: ImportDraftPackageType | null) => {
    setDraftPackages(draftPackage);
  };

  const handleLocalDraft = (localDraft: ImportLocalDraftType) => {
    setLocalDraft(localDraft);
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
    localDraft,
    orderPackages,
    requestPackages,
    handleDraft,
    handleLocalDraft,
    handleOrders,
    handleRequests,
  };

  return (
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};

export default ImportContextProvider;
