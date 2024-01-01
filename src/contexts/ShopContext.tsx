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
import { shopDrafts } from "~/fake data";
import useFetchShopOrders from "~/hooks/useFetchShopOrders";
import useFetchShopRequests from "~/hooks/useFetchShopRequests";

export type ShopContextType = {
  draftPackages: ShopDraftPackageType[];
  orderPackages: ShopOrderPackageType[];
  requestPackages: ShopRequestPackageType[];
  isFetchingOrderPackages: boolean;
  isFetchingRequestPackages: boolean;
  clearDrafts: () => void;
  handleDrafts: () => void;
  handleOrders: () => void;
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
  orderLocalDate: string;
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
  requestLocalDate: string;
  items: ShopItemType[];
};

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(["jwt"]);
  const token = cookies.jwt as string;

  const [draftPackages, setDraftPackages] = useState<ShopDraftPackageType[]>(
    [],
  );

  const {
    data: orderPackages,
    isFetching: isFetchingOrderPackages,
    refetch: refetchOrderPackages,
  } = useFetchShopOrders(token);

  const {
    data: requestPackages,
    isFetching: isFetchingRequestPackages,
    refetch: refetchRequestPackages,
  } = useFetchShopRequests(token);

  const clearDrafts = () => {
    setDraftPackages([]);
  };

  const handleDrafts = () => {
    setDraftPackages(shopDrafts);
  };

  const handleOrders = () => {
    void refetchOrderPackages();
  };

  const handleRequests = () => {
    void refetchRequestPackages();
  };

  // testing purposes
  useEffect(() => {
    handleDrafts();
  }, []);

  const value: ShopContextType = {
    draftPackages,
    orderPackages,
    requestPackages,
    isFetchingOrderPackages,
    isFetchingRequestPackages,
    clearDrafts,
    handleDrafts,
    handleOrders,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
