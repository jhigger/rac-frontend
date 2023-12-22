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
  clearDrafts: () => void;
  draftItems: AutoImportDraftPackageType[];
  orderPackages: AutoImportOrderPackageType[];
  payNowAction: { action: () => void } | null;
  requestPackages: AutoImportRequestPackageType[];
  handleDrafts: () => void;
  handleOrders: () => void;
  handlePayNowAction: (action: AutoImportContextType["payNowAction"]) => void;
  handleRequests: () => void;
};

export const AutoImportContext = createContext<AutoImportContextType>(
  {} as AutoImportContextType,
);

export const useAutoImportContext = () => useContext(AutoImportContext);

type AutoImportItemType = {
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
  additionalDetails?: AdditionalDetails;
};

type AdditionalDetails = {
  contactName: string;
  countryCode: string;
  phoneNumber: string;
  contactEmail: string;
  contactAddress: string;
  carCountry: string;
  carState: string;
  carCity: string;
  pickUpData: string;
  locationType: string;
};

export type AutoImportOrderPackageInput = {
  origin: string;
  items: AutoImportItemType[];
};

export type AutoImportDraftPackageType = AutoImportOrderPackageInput;

export type AutoImportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: Date;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: number;
  items: AutoImportItemType[];
};

export type AutoImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: Date;
  items: AutoImportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const AutoImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackages, setDraftPackages] = useState<
    AutoImportDraftPackageType[]
  >([]);
  const [orderPackages, setOrderPackages] = useState<
    AutoImportOrderPackageType[]
  >([]);
  const [payNowAction, setPayNowAction] =
    useState<AutoImportContextType["payNowAction"]>(null);
  const [requestPackages, setRequestPackages] = useState<
    AutoImportRequestPackageType[]
  >([]);

  const clearDrafts = () => {
    setDraftPackages([]);
  };

  const handleDrafts = () => {
    setDraftPackages([]);
  };

  const handleOrders = () => {
    setOrderPackages(autoImportOrders);
  };

  const handlePayNowAction = (
    action: AutoImportContextType["payNowAction"],
  ) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestPackages(autoImportRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
    handleDrafts();
  }, []);

  const value: AutoImportContextType = {
    clearDrafts,
    draftItems: draftPackages,
    orderPackages: orderPackages,
    payNowAction,
    requestPackages: requestPackages,
    handleDrafts,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return (
    <AutoImportContext.Provider value={value}>
      {children}
    </AutoImportContext.Provider>
  );
};

export default AutoImportContextProvider;
