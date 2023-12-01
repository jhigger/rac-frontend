import {
  createContext,
  useContext,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  useEffect,
} from "react";
import DraftPanel from "~/components/Shop/DraftPanel";
import OrdersPanel from "~/components/Shop/OrdersPanel";
import RequestsPanel from "~/components/Shop/RequestsPanel";

export type TabsContextType = {
  activeTab: tabIdType;
  orderActionClicked: boolean;
  orderItems: OrderItemType[] | null;
  requestedOrders: OrderItemType[] | null;
  requestActionClicked: boolean;
  requestCheckoutClicked: boolean;
  requestOrderClicked: boolean;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleCheckoutAction: (value: boolean) => void;
  handleOrderAction: (value: boolean) => void;
  handleOrders: () => void;
  handleRequests: () => void;
  handleRequestAction: (value: boolean) => void;
  handleRequestOrder: (value: boolean) => void;
  handleTabChange: (tab: tabIdType) => void;
};

export const TabsContext = createContext<TabsContextType>(
  {} as TabsContextType,
);

export const useTabsContext = () => useContext(TabsContext);

const tabIds = ["orders", "requests", "draft"] as const;

type tabIdType = (typeof tabIds)[number];

type AppBarTabType = {
  id: tabIdType;
  title: string;
  content: JSX.Element;
};

export const tabs: AppBarTabType[] = [
  { id: "orders", title: "Orders", content: <OrdersPanel /> },
  { id: "requests", title: "Requests", content: <RequestsPanel /> },
  { id: "draft", title: "Draft", content: <DraftPanel /> },
];

const ORDER_STATUS = ["responded", "processed", "not responded to"] as const;
const SHIPPING_STATUS = [
  "not started",
  "ready for shipping",
  "cleared",
  "processing",
  "in transit",
] as const;

export type OrderItemType = {
  id: string;
  images: string[];
  orderStatus: (typeof ORDER_STATUS)[number];
  shippingStatus: (typeof SHIPPING_STATUS)[number];
};

const images = Array(6)
  .fill(null)
  .map((_, i) => {
    return `https://placehold.co/500x500/cac4d0/1d192b?text=Image ${i}`;
  });

const orders: OrderItemType[] = [
  {
    id: "order1",
    orderStatus: "processed",
    shippingStatus: "not started",
    images,
  },
  {
    id: "order2",
    orderStatus: "responded",
    shippingStatus: "ready for shipping",
    images,
  },
  {
    id: "order3",
    orderStatus: "not responded to",
    shippingStatus: "cleared",
    images,
  },
  {
    id: "order4",
    orderStatus: "not responded to",
    shippingStatus: "processing",
    images,
  },
  {
    id: "order5",
    orderStatus: "not responded to",
    shippingStatus: "in transit",
    images,
  },
];

const TabsContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<tabIdType>(
    tabs[0]?.id ?? "orders",
  );
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [requestedOrders, setRequestedOrders] = useState<
    OrderItemType[] | null
  >(null);
  const [requestOrderClicked, setRequestOrderClicked] = useState(false);
  const [orderActionClicked, setOrderActionClicked] = useState(false);
  const [requestActionClicked, setRequestActionClicked] = useState(false);
  const [requestCheckoutClicked, setRequestCheckoutClicked] = useState(false);

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const resetAllClicked = () => {
    setRequestOrderClicked(false);
    setOrderActionClicked(false);
    setRequestActionClicked(false);
  };

  const handleOrders = () => {
    const unprocessedOrders = orders.filter((order) => {
      return order.orderStatus === "not responded to";
    });
    setOrderItems(unprocessedOrders);
  };

  const handleRequests = () => {
    handleOrders();
    setRequestedOrders(orders);
    resetAllClicked();
  };

  const handleRequestOrder = (value: boolean) => {
    if (!tabsRef.current[1]) return;
    tabsRef.current[1].click();
    resetAllClicked();
    handleTabChange("requests");
    setRequestOrderClicked(value);
  };

  const handleTabChange = (tab: tabIdType) => {
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
    handleRequestAction(true);
  }, [activeTab]);

  const value: TabsContextType = {
    activeTab,
    orderActionClicked,
    orderItems,
    requestActionClicked,
    requestCheckoutClicked,
    requestedOrders,
    requestOrderClicked,
    tabs,
    tabsRef,
    handleCheckoutAction,
    handleOrderAction,
    handleOrders,
    handleRequestAction,
    handleRequests,
    handleRequestOrder,
    handleTabChange,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export default TabsContextProvider;
