import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type ORDER_STATUS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
} from "~/constants";

export type AutoImportContextType = {
  draftItems: AutoImportDraftPackageType[] | null;
  orderItems: AutoImportOrderPackageType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: AutoImportRequestPackageType[] | null;
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
  value: string;
  condition: "Drivable";
  color: string;
  millage: number;
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

export type AutoImportDraftPackageType = AutoImportOrderPackageInput & {
  draftDate: string;
};

export type AutoImportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: string;
  items: AutoImportItemType[];
};

export type AutoImportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: AutoImportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const AutoImportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackages, setDraftPackages] = useState<
    AutoImportDraftPackageType[] | null
  >(null);
  const [orderPackages, setOrderPackages] = useState<
    AutoImportOrderPackageType[] | null
  >(null);
  const [payNowAction, setPayNowAction] =
    useState<AutoImportContextType["payNowAction"]>(null);
  const [requestPackages, setRequestPackages] = useState<
    AutoImportRequestPackageType[] | null
  >(null);

  const handleDrafts = () => {
    setDraftPackages(null);
  };

  const handleOrders = () => {
    setOrderPackages(null);
  };

  const handlePayNowAction = (
    action: AutoImportContextType["payNowAction"],
  ) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestPackages(null);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
    handleDrafts();
  }, []);

  const value: AutoImportContextType = {
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
    <AutoImportContext.Provider value={value}>
      {children}
    </AutoImportContext.Provider>
  );
};

export default AutoImportContextProvider;