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
  hasRequests: boolean;
  requestOrderClicked: boolean;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleTabChange: (tab: string) => void;
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

const TabsContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "orders");
  const [requestOrderClicked, setRequestOrderClicked] = useState(false);
  const [hasRequests, setHasRequests] = useState(false);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setRequestOrderClicked(false);
  };

  const handleRequestOrder = (value: boolean) => {
    setRequestOrderClicked(value);
  };

  const handleRequests = () => {
    setHasRequests(true);
    setRequestOrderClicked(false);
  };

  const value: TabsContextType = {
    activeTab,
    hasRequests,
    requestOrderClicked,
    tabs,
    tabsRef,
    handleTabChange,
    handleRequests,
    handleRequestOrder,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export default TabsContextProvider;
