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
  type SHOP_FOR_ME_STATUS,
} from "~/constants";
import { shopDrafts, shopOrders, shopRequests } from "~/fake data";

export type ShopContextType = {
  draftItems: ShopDraftItemType[] | null;
  orderItems: ShopOrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ShopRequestItemType[] | null;
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
  store: string;
  urgentPurchase: string;
  url: string;
  name: string;
  originalCost: string;
  quantity: number;
  shippingCost: string;
  images: string[];
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
};

export type ShopOrderItemInput = {
  origin: string;
  items: ShopItemType[];
};

export type ShopDraftItemType = ShopOrderItemInput & {
  draftDate: string;
};

export type ShopOrderItemType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shopForMeStatus: (typeof SHOP_FOR_ME_STATUS)[number];
  shopForMeCost: string;
  shippingCost: string;
  items: ShopItemType[];
};

export type ShopRequestItemType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
  items: ShopItemType[];
};

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftItems, setDraftItems] = useState<ShopDraftItemType[] | null>(
    null,
  );
  const [orderItems, setOrderItems] = useState<ShopOrderItemType[] | null>(
    null,
  );
  const [payNowAction, setPayNowAction] =
    useState<ShopContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<
    ShopRequestItemType[] | null
  >(null);

  const handleDrafts = () => {
    setDraftItems(shopDrafts);
  };

  const handleOrders = () => {
    setOrderItems(shopOrders);
  };

  const handlePayNowAction = (action: ShopContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestItems(shopRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    // todo: if (user) void useFetchShopRequests(user._id);
    handleOrders();
    handleDrafts();
  }, []);

  const value: ShopContextType = {
    draftItems,
    orderItems,
    payNowAction,
    requestItems,
    handleDrafts,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
