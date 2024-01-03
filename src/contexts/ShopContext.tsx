import { createContext, useContext, useState, type ReactNode } from "react";
import { useCookies } from "react-cookie";
import { useLocalStorage } from "usehooks-ts";
import {
  type ORDER_STATUS,
  type ORIGINS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
  type SHOP_FOR_ME_STATUS,
  type STORES,
} from "~/constants";
import useFetchShopOrders from "~/hooks/useFetchShopOrders";
import useFetchShopRequests from "~/hooks/useFetchShopRequests";

export type ShopContextType = {
  draftPackage: ShopDraftPackageType | null;
  localDraft: ShopLocalDraftType;
  orderPackages: ShopOrderPackageType[];
  requestPackages: ShopRequestPackageType[];
  handleDraft: (draftPackage: ShopDraftPackageType | null) => void;
  handleLocalDraft: (localDraft: ShopLocalDraftType) => void;
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

export type ShopDraftPackageType = ShopRequestPackageType;

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
  originWarehouse: (typeof ORIGINS)[number];
  items: ShopItemType[];
};

type ShopLocalDraftType = {
  requestPackage: ShopDraftPackageType | null | undefined;
} | null;

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(["jwt"]);
  const token = cookies.jwt as string;

  const [draftPackage, setDraftPackage] = useState<ShopDraftPackageType | null>(
    null,
  );

  const [localDraft, setLocalDraft] = useLocalStorage<ShopLocalDraftType>(
    "Shop",
    {
      requestPackage: draftPackage,
    },
  );

  const { data: orderPackages, refetch: refetchOrderPackages } =
    useFetchShopOrders(token);

  const { data: requestPackages, refetch: refetchRequestPackages } =
    useFetchShopRequests(token);

  const handleDraft = (draftPackage: ShopDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleLocalDraft = (localDraft: ShopLocalDraftType) => {
    setLocalDraft(localDraft);
  };

  const handleOrders = () => {
    void refetchOrderPackages();
  };

  const handleRequests = () => {
    void refetchRequestPackages();
  };

  const value: ShopContextType = {
    draftPackage,
    localDraft,
    orderPackages,
    requestPackages,
    handleDraft,
    handleLocalDraft,
    handleOrders,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
