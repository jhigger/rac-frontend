import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type CONDITIONS,
  type ORDER_STATUS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
} from "~/constants";
import { autoImportOrders, autoImportRequests } from "~/fake data";

export type AutoImportContextType = {
  draftPackage: AutoImportDraftPackageType | null;
  orderPackages: AutoImportOrderPackageType[];
  requestPackages: AutoImportRequestPackageType[];
  handleDraft: (draftPackage: AutoImportDraftPackageType | null) => void;
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
};

export type PickupDetailsType = {
  contactFirstName: string;
  contactLastName: string;
  countryCode: string;
  phoneNumber: string;
  contactEmail: string;
  contactAddress: string;
  country: string;
  state: string;
  city: string;
  zipPostalCode: string;
  pickUpDate: string;
  locationType: string;
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

export type ShipmentDetailsType = BillingDetailsType;

export type AutoImportDraftPackageType = AutoImportRequestPackageType;

export type AutoImportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: number;
  items: AutoImportItemType[];
};

export type AutoImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestLocalDate: string;
  items: AutoImportItemType[];
  shipmentDetails: ShipmentDetailsType;
  billingDetails: BillingDetailsType;
};

export type PropertyType = { label: string; value: string | undefined };

const AutoImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackage] =
    useState<AutoImportDraftPackageType | null>(null);
  const [orderPackages, setOrderPackages] = useState<
    AutoImportOrderPackageType[]
  >([]);
  const [requestPackages, setRequestPackages] = useState<
    AutoImportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: AutoImportDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleOrders = () => {
    setOrderPackages(autoImportOrders);
  };

  const handleRequests = () => {
    setRequestPackages(autoImportRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: AutoImportContextType = {
    draftPackage,
    orderPackages,
    requestPackages,
    handleDraft,
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
