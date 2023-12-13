import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import {
  type ORDER_STATUS,
  type ORIGINS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
  type SHOP_FOR_ME_STATUS,
  type STORES,
} from "~/constants";
import { shopDrafts, shopOrders } from "~/fake data";
import useFetchShopRequests from "~/hooks/useFetchShopRequests";

export type ShopContextType = {
  clearDrafts: () => void;
  draftPackages: ShopDraftPackageType[];
  orderPackages: ShopOrderPackageType[];
  payNowAction: { action: () => void } | null;
  requestPackages: ShopRequestPackageType[];
  handleDrafts: () => void;
  handleOrders: () => void;
  handlePayNowAction: (action: ShopContextType["payNowAction"]) => void;
  handleRequests: () => void;
};

export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType,
);

export const useShopContext = () => useContext(ShopContext);

export type ShopItemType = {
  store: (typeof STORES)[number];
  urgent: boolean;
  url: string;
  name: string;
  originalCost: number;
  quantity: number;
  shippingCost: number;
  image: string;
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
};

export type ShopOrderPackageInput = {
  origin: string;
  items: ShopItemType[];
};

export type ShopDraftPackageType = ShopOrderPackageInput;

export type ShopOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shopForMeStatus: (typeof SHOP_FOR_ME_STATUS)[number];
  shopForMeCost: number;
  shippingCost: number;
  originWarehouse: (typeof ORIGINS)[number];
  items: ShopItemType[];
};

export type ShopRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: ShopItemType[];
};

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(["jwt"]);
  const token = cookies.jwt as string;

  const [draftPackages, setDraftPackages] = useState<ShopDraftPackageType[]>(
    [],
  );

  const [orderPackages, setOrderPackages] = useState<ShopOrderPackageType[]>(
    [],
  );

  const [payNowAction, setPayNowAction] =
    useState<ShopContextType["payNowAction"]>(null);

  const { data: requestPackages, refetch: refetchOrderPackages } =
    useFetchShopRequests(token);

  const clearDrafts = () => {
    setDraftPackages([]);
  };

  const handleDrafts = () => {
    setDraftPackages(shopDrafts);
  };

  const handleOrders = () => {
    setOrderPackages(shopOrders);
  };

  const handlePayNowAction = (action: ShopContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    void refetchOrderPackages();
  };

  // testing purposes
  useEffect(() => {
    handleOrders();
    handleDrafts();
  }, []);

  const value: ShopContextType = {
    clearDrafts,
    draftPackages,
    orderPackages,
    payNowAction,
    requestPackages,
    handleDrafts,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
