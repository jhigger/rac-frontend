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
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleChange: (tab: string) => void;
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
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleChange = (tab: string) => {
    setActiveTab(tab);
  };

  const value: TabsContextType = {
    activeTab,
    tabsRef,
    handleChange,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export default TabsContextProvider;
