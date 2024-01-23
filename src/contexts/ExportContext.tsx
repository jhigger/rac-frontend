import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { useLocalStorage } from "usehooks-ts";
import { type ExportInputs } from "~/components/Export/Requests/RequestOrder";
import {
  type ORDER_STATUS,
  type ORIGINS,
  type PAYMENT_STATUS,
  type SHIPPING_METHODS,
  type SHIPPING_STATUS,
} from "~/constants";
import useFetchExportRequests from "~/hooks/useFetchExportRequests";
import { type BillingDetailsType } from "./AutoImportContext";
import {
  type ImportItemType,
  type ImportRequestPackageType,
} from "./ImportContext";
import { type PackageCostsType } from "./ShopContext";

export type ExportContextType = {
  draftPackage: ExportDraftPackageType | null;
  fetchingRequestPackages: boolean;
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

export type ExportItemType = ImportItemType;

export type ExportDraftPackageType = ExportInputs;

export type ExportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  originWarehouse: (typeof ORIGINS)[number];
  destinationDetails: BillingDetailsType;
  items: ExportItemType[];
  billingDetails: BillingDetailsType;
  shippingMethod: (typeof SHIPPING_METHODS)[number];
  shippingPaymentStatus: (typeof PAYMENT_STATUS)[number];
  packageCosts: PackageCostsType;
};

export type ExportRequestPackageType = ImportRequestPackageType;

export type PropertyType = { label: string; value: string | undefined };

type ExportLocalDraftType = ExportDraftPackageType | null;

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(["jwt"]);
  const token = cookies.jwt as string;

  const [draftPackage, setDraftPackage] =
    useState<ExportDraftPackageType | null>(null);

  const [localDraft, setLocalDraft] = useLocalStorage<ExportLocalDraftType>(
    "Export",
    draftPackage,
  );

  const [orderPackages, setOrderPackages] = useState<ExportOrderPackageType[]>(
    [],
  );

  const {
    data: requestPackages,
    refetch: refetchRequestPackages,
    isFetching: fetchingRequestPackages,
  } = useFetchExportRequests(token);

  const handleDraft = (draftPackage: ExportDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleLocalDraft = (localDraft: ExportLocalDraftType) => {
    setLocalDraft(localDraft);
  };

  const handleOrders = () => {
    setOrderPackages([]); // todo: get real data
  };

  const handleRequests = () => {
    void refetchRequestPackages();
  };

  // testing purposes
  useEffect(() => {
    handleOrders();
  }, []);

  const value: ExportContextType = {
    draftPackage,
    fetchingRequestPackages,
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
