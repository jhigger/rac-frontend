import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type ORDER_STATUS,
  type ORIGINS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
  type SHOP_FOR_ME_STATUS,
  type STORES,
} from "~/constants";
import { shopDrafts, shopOrders, shopRequests } from "~/fake data";

export type ShopContextType = {
  clearDrafts: () => void;
  draftItems: ShopDraftPackageType[] | null;
  orderItems: ShopOrderPackageType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ShopRequestPackageType[] | null;
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

export type ShopDraftPackageType = ShopOrderPackageInput & {
  draftDate: string;
};

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
  const [draftPackages, setDraftPackages] = useState<
    ShopDraftPackageType[] | null
  >(null);
  const [orderPackages, setOrderPackages] = useState<
    ShopOrderPackageType[] | null
  >(null);
  const [payNowAction, setPayNowAction] =
    useState<ShopContextType["payNowAction"]>(null);
  const [requestPackages, setRequestPackages] = useState<
    ShopRequestPackageType[] | null
  >(null);

  const clearDrafts = () => {
    setDraftPackages(null);
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
    setRequestPackages(shopRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    // todo: if (user) void useFetchShopRequests(user._id);
    handleOrders();
    handleDrafts();
  }, []);

  const value: ShopContextType = {
    clearDrafts,
    draftItems: draftPackages,
    orderItems: orderPackages,
    payNowAction,
    requestItems: requestPackages,
    handleDrafts,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
