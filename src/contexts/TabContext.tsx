import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import ImportOrdersPanel from "~/components/Import/Orders/OrdersPanel";
import ImportRequestsPanel from "~/components/Import/Requests/RequestsPanel";
import ShopDraftsPanel from "~/components/Shop/Drafts/DraftsPanel";
import ShopOrdersPanel from "~/components/Shop/Orders/OrdersPanel";
import ShopRequestsPanel from "~/components/Shop/Requests/RequestsPanel";
import { type NavTitleType } from "./NavigationContext";

export type TabContextType = {
  activeAction: ActionType | null;
  activeTab: TabIdType;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<HTMLButtonElement[]>;
  handleActiveAction: (action: ActionType | null) => void;
  handleTabChange: (tab: TabIdType) => void;
};

export const TabContext = createContext<TabContextType>({} as TabContextType);

export const useTabContext = () => useContext(TabContext);

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

const TAB_IDS = ["orders", "requests", "drafts"] as const;

type TabIdType = (typeof TAB_IDS)[number];

type TabType = {
  id: TabIdType;
  title: string;
  content: JSX.Element;
};

type AppBarTabType = { nav: NavTitleType; tabs: TabType[] };

export const tabs: AppBarTabType[] = [
  {
    nav: "Shop for me",
    tabs: [
      { id: "orders", title: "Orders", content: <ShopOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ShopRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ShopDraftsPanel /> },
    ],
  },
  {
    nav: "Import",
    tabs: [
      { id: "orders", title: "Orders", content: <ImportOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ImportRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <>import drafts</> },
    ],
  },
];

const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [activeTab, setActiveTab] = useState<TabIdType>("orders");
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleActiveAction = (action: ActionType | null) => {
    setActiveAction(action);
  };

  const handleTabChange = (tabId: TabIdType) => {
    let clickedTabIndex = 0;
    tabs.forEach((navTabs) => {
      navTabs.tabs.forEach((tab, i) => {
        if (tab.id === tabId) {
          clickedTabIndex = i;
        }
      });
    });

    if (!tabsRef.current[clickedTabIndex]) return;
    tabsRef.current[clickedTabIndex]?.click();
    setActiveTab(tabId);
    reset();
  };

  const reset = () => {
    setActiveAction(null);
  };

  useEffect(() => {
    tabsRef.current = [];
  }, [router.asPath]);

  const value: TabContextType = {
    activeAction,
    activeTab,
    tabs,
    tabsRef,
    handleActiveAction,
    handleTabChange,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export default TabContextProvider;
