import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { type AutoImportInputs } from "~/components/AutoImport/Requests/RequestOrder";
import {
  type CONDITIONS,
  type ORDER_STATUS,
  type ORIGINS,
  type PAYMENT_STATUS,
  type REQUEST_STATUS,
  type SHIPPING_METHODS,
  type SHIPPING_STATUS,
} from "~/constants";
import { type DraftImageType } from "~/hooks/useImageHandler";
import { type PackageCostsType } from "./ShopContext";

export type AutoImportContextType = {
  draftPackage: AutoImportDraftPackageType | null;
  localDraft: AutoImportLocalDraftType;
  orderPackages: AutoImportOrderPackageType[];
  requestPackages: AutoImportRequestPackageType[];
  handleDraft: (draftPackage: AutoImportDraftPackageType | null) => void;
  handleLocalDraft: (localDraft: AutoImportLocalDraftType) => void;
  handleOrders: () => void;
  handleRequests: () => void;
};

export const AutoImportContext = createContext<AutoImportContextType>(
  {} as AutoImportContextType,
);

export const useAutoImportContext = () => useContext(AutoImportContext);

export type AutoImportItemType = {
  brand: string;
  model: string;
  productionYear: string;
  value: number;
  condition: (typeof CONDITIONS)[number];
  color: string;
  mileage: number;
  vin: string;
  url: string;
  image: string;
  carTitleCopy: string;
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
  pickupDetails?: PickupDetailsType;
  draftCarImage?: DraftImageType;
  draftCarTitleImage?: DraftImageType;
};

export type PickupDetailsType = BillingDetailsType & {
  pickUpDate: string;
  locationType: string;
  pickupCost: number;
};

export type BillingDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipPostalCode: string;
};

export type AutoImportDraftPackageType = AutoImportInputs;

export type AutoImportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  originWarehouse: (typeof ORIGINS)[number];
  items: AutoImportItemType[];
  destinationDetails: BillingDetailsType;
  billingDetails: BillingDetailsType;
  shippingMethod: (typeof SHIPPING_METHODS)[number];
  shippingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  clearingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  packageCosts: PackageCostsType;
};

export type AutoImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestLocalDate: string;
  originWarehouse: (typeof ORIGINS)[number];
  items: AutoImportItemType[];
  destinationDetails: BillingDetailsType;
  billingDetails: BillingDetailsType;
  shippingMethod: (typeof SHIPPING_METHODS)[number];
  shippingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  clearingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  packageCosts: PackageCostsType;
};

type AutoImportLocalDraftType = AutoImportDraftPackageType | null;

export type PropertyType = { label: string; value: string | undefined };

const AutoImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackage] =
    useState<AutoImportDraftPackageType | null>(null);

  const [localDraft, setLocalDraft] = useLocalStorage<AutoImportLocalDraftType>(
    "AutoImport",
    draftPackage,
  );

  const [orderPackages, setOrderPackages] = useState<
    AutoImportOrderPackageType[]
  >([]);
  const [requestPackages, setRequestPackages] = useState<
    AutoImportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: AutoImportDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleLocalDraft = (localDraft: AutoImportLocalDraftType) => {
    setLocalDraft(localDraft);
  };

  const handleOrders = () => {
    setOrderPackages([]); // todo: get real data
  };

  const handleRequests = () => {
    setRequestPackages([]); // todo: get real data
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: AutoImportContextType = {
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
    <AutoImportContext.Provider value={value}>
      {children}
    </AutoImportContext.Provider>
  );
};

export default AutoImportContextProvider;
