import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import DraftPanel from "~/components/Shop/Drafts/DraftPanel";
import OrdersPanel from "~/components/Shop/Orders/OrdersPanel";
import RequestsPanel from "~/components/Shop/Requests/RequestsPanel";
import { orders, requests } from "~/fake data";

export type ShopContextType = {
  activeAction: ActionType | null;
  activeTab: TabIdType;
  orderActionClicked: boolean;
  orderItems: OrderItemType[] | null;
  requestItems: RequestItemType[] | null;
  requestActionClicked: boolean;
  requestCheckoutClicked: boolean;
  requestOrderClicked: boolean;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleActiveAction: (action: ActionType | null) => void;
  handleCheckoutAction: (value: boolean) => void;
  handleOrderAction: (value: boolean) => void;
  handleOrders: () => void;
  handleRequests: () => void;
  handleRequestAction: (value: boolean) => void;
  handleRequestOrder: (value: boolean) => void;
  handleTabChange: (tab: TabIdType) => void;
};

export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType,
);

export const useShopContext = () => useContext(ShopContext);

const TAB_IDS = ["orders", "requests", "draft"] as const;

type TabIdType = (typeof TAB_IDS)[number];

type AppBarTabType = {
  id: TabIdType;
  title: string;
  content: JSX.Element;
};

export const tabs: AppBarTabType[] = [
  { id: "orders", title: "Orders", content: <OrdersPanel /> },
  { id: "requests", title: "Requests", content: <RequestsPanel /> },
  { id: "draft", title: "Draft", content: <DraftPanel /> },
];

const ACTION_CONST = [
  "proceed to checkout",
  "order details",
  "request new order",
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
  const [orderActionClicked, setOrderActionClicked] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [requestActionClicked, setRequestActionClicked] = useState(false);
  const [requestCheckoutClicked, setRequestCheckoutClicked] = useState(false);
  const [requestItems, setRequestItems] = useState<RequestItemType[] | null>(
    null,
  );
  const [requestOrderClicked, setRequestOrderClicked] = useState(false);

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleActiveAction = (action: ActionType | null) => {
    setActiveAction(action);
  };

  const handleCheckoutAction = (value: boolean) => {
    resetAllClicked();
    setRequestCheckoutClicked(value);
  };

  const handleOrders = () => {
    setOrderItems(orders);
  };

  const handleOrderAction = (value: boolean) => {
    resetAllClicked();
    setOrderActionClicked(value);
  };

  const handleRequests = () => {
    handleOrders();
    setRequestItems(requests);
    resetAllClicked();
  };

  const handleRequestAction = (value: boolean) => {
    resetAllClicked();
    setRequestActionClicked(value);
  };

  const handleRequestOrder = (value: boolean) => {
    if (!tabsRef.current[1]) return;
    tabsRef.current[1].click();
    setActiveAction("request new order");
    setActiveTab("requests");
    setRequestOrderClicked(value);
  };

  const handleTabChange = (tab: TabIdType) => {
    setActiveTab(tab);
    resetAllClicked();
  };

  const resetAllClicked = () => {
    setActiveAction(null);
    setOrderActionClicked(false);
    setRequestActionClicked(false);
    setRequestCheckoutClicked(false);
    setRequestOrderClicked(false);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ShopContextType = {
    activeAction,
    activeTab,
    orderActionClicked,
    orderItems,
    requestActionClicked,
    requestCheckoutClicked,
    requestItems,
    requestOrderClicked,
    tabs,
    tabsRef,
    handleActiveAction,
    handleCheckoutAction,
    handleOrderAction,
    handleOrders,
    handleRequestAction,
    handleRequests,
    handleRequestOrder,
    handleTabChange,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
