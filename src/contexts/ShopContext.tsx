import {
  createContext,
  useContext,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  useEffect,
} from "react";
import DraftPanel from "~/components/Shop/Drafts/DraftPanel";
import OrdersPanel from "~/components/Shop/Orders/OrdersPanel";
import RequestsPanel from "~/components/Shop/Requests/RequestsPanel";
import { orders, requests } from "~/fake data";

export type ShopContextType = {
  activeAction: string;
  activeTab: TabIdType;
  orderActionClicked: boolean;
  orderItems: OrderItemType[] | null;
  // todo:  rename
  requestedOrders: RequestItemType[] | null;
  requestActionClicked: boolean;
  requestCheckoutClicked: boolean;
  requestOrderClicked: boolean;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleActiveAction: (action: string) => void;
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

const tabIds = ["orders", "requests", "draft"] as const;

type TabIdType = (typeof tabIds)[number];

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
  const [activeTab, setActiveTab] = useState<TabIdType>("orders");
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [requestedOrders, setRequestedOrders] = useState<
    RequestItemType[] | null
  >(null);
  const [requestOrderClicked, setRequestOrderClicked] = useState(false);
  const [orderActionClicked, setOrderActionClicked] = useState(false);
  const [requestActionClicked, setRequestActionClicked] = useState(false);
  const [requestCheckoutClicked, setRequestCheckoutClicked] = useState(false);
  const [activeAction, setActiveAction] = useState("");

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleActiveAction = (action: string) => {
    setActiveAction(action);
  };

  const resetAllClicked = () => {
    setActiveAction("");
    setOrderActionClicked(false);
    setRequestActionClicked(false);
    setRequestCheckoutClicked(false);
    setRequestOrderClicked(false);
  };

  const handleOrders = () => {
    setOrderItems(orders);
  };

  const handleRequests = () => {
    handleOrders();
    setRequestedOrders(requests);
    resetAllClicked();
  };

  const handleRequestOrder = (value: boolean) => {
    // if (!tabsRef.current[1]) return;
    // tabsRef.current[1].click();
    // resetAllClicked();
    // handleTabChange("requests");
    setRequestOrderClicked(value);
  };

  const handleTabChange = (tab: TabIdType) => {
    setActiveTab(tab);
    resetAllClicked();
  };

  const handleOrderAction = (value: boolean) => {
    resetAllClicked();
    setOrderActionClicked(value);
  };

  const handleRequestAction = (value: boolean) => {
    resetAllClicked();
    setRequestActionClicked(value);
  };

  const handleCheckoutAction = (value: boolean) => {
    resetAllClicked();
    setRequestCheckoutClicked(value);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    // handleRequestAction(true);
  }, [activeTab]);

  const value: ShopContextType = {
    activeAction,
    activeTab,
    orderActionClicked,
    orderItems,
    requestActionClicked,
    requestCheckoutClicked,
    requestedOrders,
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
