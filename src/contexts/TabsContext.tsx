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
  requestOrderClicked: boolean;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleTabChange: (tab: tabIdType) => void;
  handleOrderAction: (value: boolean) => void;
  handleOrders: () => void;
  handleRequests: () => void;
  handleRequestAction: (value: boolean) => void;
  handleRequestOrder: (value: boolean) => void;
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

const STATES = ["responded", "processed", "not responded to"] as const;
export type OrderItemType = {
  id: string;
  state: (typeof STATES)[number];
  images: string[];
};

const images = Array(6)
  .fill(null)
  .map((_, i) => {
    return `https://placehold.co/500x500/cac4d0/1d192b?text=Image ${i}`;
  });

const orders: OrderItemType[] = [
  { id: "order1", state: "processed", images },
  { id: "order2", state: "responded", images },
  { id: "order3", state: "not responded to", images },
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

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const resetAllClicked = () => {
    setRequestOrderClicked(false);
    setOrderActionClicked(false);
    setRequestActionClicked(false);
  };

  const handleOrders = () => {
    const unprocessedOrders = orders.filter((order) => {
      return order.state === "not responded to";
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

  // testing purposes
  useEffect(() => {
    // handleRequests();
    // handleOrderAction(true);
  }, [activeTab]);

  const value: TabsContextType = {
    activeTab,
    orderActionClicked,
    orderItems,
    requestActionClicked,
    requestedOrders,
    requestOrderClicked,
    tabs,
    tabsRef,
    handleTabChange,
    handleOrderAction,
    handleOrders,
    handleRequestAction,
    handleRequests,
    handleRequestOrder,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export default TabsContextProvider;
