import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import DraftPanel from "~/components/Shop/Drafts/DraftsPanel";
import OrdersPanel from "~/components/Shop/Orders/OrdersPanel";
import RequestsPanel from "~/components/Shop/Requests/RequestsPanel";
import { orders, requests } from "~/fake data";

export type ShopContextType = {
  activeAction: ActionType | null;
  activeTab: TabIdType;
  orderItems: OrderItemType[] | null;
  payNowAction: { action: () => void } | null;
  requestItems: RequestItemType[] | null;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleActiveAction: (action: ActionType | null) => void;
  handleOrders: () => void;
  handlePayNowAction: (action: ShopContextType["payNowAction"]) => void;
  handleRequests: () => void;
  handleTabChange: (tab: TabIdType) => void;
};

export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType,
);

export const useShopContext = () => useContext(ShopContext);

const TAB_IDS = ["orders", "requests", "drafts"] as const;

type TabIdType = (typeof TAB_IDS)[number];

type AppBarTabType = {
  id: TabIdType;
  title: string;
  content: JSX.Element;
};

export const tabs: AppBarTabType[] = [
  { id: "orders", title: "Orders", content: <OrdersPanel /> },
  { id: "requests", title: "Requests", content: <RequestsPanel /> },
  { id: "drafts", title: "Drafts", content: <DraftPanel /> },
];

const ACTION_CONST = [
  "proceed to checkout",
  "order details",
  "request details",
  "draft details",
  "request new order",
  "initiate shipping",
  "clear package",
  "track",
] as const;

type ActionType = (typeof ACTION_CONST)[number];

const ORDER_STATUS = ["responded", "processed", "not responded"] as const;
const SHIPPING_STATUS = [
  "ready for shipping",
  "not started",
  "processing",
  "cancelled",
  "in transit",
  "arrived destination",
  "cleared",
  "delivered",
] as const;
const SHOP_FOR_ME_STATUS = [
  "purchase not started",
  "purchase in progress",
  "purchase completed",
] as const;

export type OrderItemType = {
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

const REQUEST_STATUS = ["responded", "not responded"] as const;

export type RequestItemType = {
  images: string[];
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestDate: string;
};

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [activeTab, setActiveTab] = useState<TabIdType>("orders");
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [payNowAction, setPayNowAction] =
    useState<ShopContextType["payNowAction"]>(null);
  const [requestItems, setRequestItems] = useState<RequestItemType[] | null>(
    null,
  );

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleActiveAction = (action: ActionType | null) => {
    setActiveAction(action);
  };

  const handleOrders = () => {
    setOrderItems(orders);
  };

  const handlePayNowAction = (action: ShopContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    handleOrders();
    setRequestItems(requests);
  };

  const handleTabChange = (tabId: TabIdType) => {
    let clickedTabIndex = 0;
    tabs.forEach((tab, i) => {
      if (tab.id === tabId) {
        clickedTabIndex = i;
      }
    });
    if (!tabsRef.current[clickedTabIndex]) return;
    tabsRef.current[clickedTabIndex]?.click();
    setActiveTab(tabId);
    setActiveAction(null);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ShopContextType = {
    activeAction,
    activeTab,
    orderItems,
    payNowAction,
    requestItems,
    tabs,
    tabsRef,
    handleActiveAction,
    handleOrders,
    handlePayNowAction,
    handleRequests,
    handleTabChange,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
