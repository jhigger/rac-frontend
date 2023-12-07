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
import { orders, requests } from "~/fake data";

export type ShopContextType = {
  orderItems: ShopOrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: ShopRequestItemType[] | null;
  handlePayNowAction: (action: ShopContextType["payNowAction"]) => void;
  handleOrders: () => void;
  handleRequests: () => void;
};

export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType,
);

export const useShopContext = () => useContext(ShopContext);

export type ShopOrderItemType = {
  images: string[];
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shopForMeStatus: (typeof SHOP_FOR_ME_STATUS)[number];
  shopForMeCost: string;
  shippingCost: string;
};

export type ShopRequestItemType = {
  images: string[];
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
};

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<ShopOrderItemType[] | null>(
    null,
  );
  const [payNowAction, setPayNowAction] =
    useState<ShopContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<
    ShopRequestItemType[] | null
  >(null);
  const handleOrders = () => {
    setOrderItems(orders);
  };

  const handlePayNowAction = (action: ShopContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestItems(requests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    // todo: if (user) void useFetchShopRequests(user._id);
    handleOrders();
  }, []);

  const value: ShopContextType = {
    orderItems,
    payNowAction,
    requestItems,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
