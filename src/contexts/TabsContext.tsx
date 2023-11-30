import {
  createContext,
  useContext,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import DraftPanel from "~/components/Shop/DraftPanel";
import OrdersPanel from "~/components/Shop/OrdersPanel";
import RequestsPanel from "~/components/Shop/RequestsPanel";

export type TabsContextType = {
  activeTab: string;
  orderItems: OrderItemType[] | null;
  requestedOrders: OrderItemType[] | null;
  requestOrderClicked: boolean;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleTabChange: (tab: string) => void;
  handleOrders: () => void;
  handleRequests: () => void;
  handleRequestOrder: (value: boolean) => void;
};

export const TabsContext = createContext<TabsContextType>(
  {} as TabsContextType,
);

export const useTabsContext = () => useContext(TabsContext);

type AppBarTabType = {
  id: string;
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
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "orders");
  const [requestOrderClicked, setRequestOrderClicked] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);
  const [requestedOrders, setRequestedOrders] = useState<
    OrderItemType[] | null
  >(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleOrders = () => {
    const unprocessedOrders = orders.filter((order) => {
      return order.state === "not responded to";
    });
    setOrderItems(unprocessedOrders);
  };

  const handleRequests = () => {
    handleOrders();
    setRequestedOrders(orders);
    setRequestOrderClicked(false);
  };

  const handleRequestOrder = (value: boolean) => {
    setRequestOrderClicked(value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setRequestOrderClicked(false);
  };

  const value: TabsContextType = {
    activeTab,
    orderItems,
    requestedOrders,
    requestOrderClicked,
    tabs,
    tabsRef,
    handleTabChange,
    handleOrders,
    handleRequests,
    handleRequestOrder,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export default TabsContextProvider;
