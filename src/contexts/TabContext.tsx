import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import ImportDraftsPanel from "~/components/Import/Drafts/DraftsPanel";
import ImportOrdersPanel from "~/components/Import/Orders/OrdersPanel";
import ImportRequestsPanel from "~/components/Import/Requests/RequestsPanel";
import ShopDraftsPanel from "~/components/Shop/Drafts/DraftsPanel";
import ShopOrdersPanel from "~/components/Shop/Orders/OrdersPanel";
import ShopRequestsPanel from "~/components/Shop/Requests/RequestsPanel";
import { useNavContext, type NavTitleType } from "./NavigationContext";
import ExportOrdersPanel from "~/components/Export/Orders/OrdersPanel";
import ExportRequestsPanel from "~/components/Export/Requests/RequestsPanel";
import ExportDraftsPanel from "~/components/Export/Drafts/DraftsPanel";

export type TabContextType = {
  activeAction: ActionType | null;
  activeTab: AppBarTabType["tabs"][number]["id"] | null;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
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

export const tabs: [AppBarTabType, ...AppBarTabType[]] = [
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
      { id: "drafts", title: "Drafts", content: <ImportDraftsPanel /> },
    ],
  },
  {
    nav: "Export",
    tabs: [
      { id: "orders", title: "Orders", content: <ExportOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ExportRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ExportDraftsPanel /> },
    ],
  },
];

const getFirstTab = (activeNav: NavTitleType) => {
  const activeTabs = tabs.find((tab) => tab.nav === activeNav);

  if (activeTabs && activeTabs.tabs.length > 0 && activeTabs.tabs[0]) {
    return activeTabs.tabs[0].id;
  }

  return null;
};

const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const { activeNav } = useNavContext();

  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [activeTab, setActiveTab] = useState<
    AppBarTabType["tabs"][number]["id"] | null
  >(getFirstTab(activeNav));
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const handleActiveAction = (action: ActionType | null) => {
    setActiveAction(action);
  };

  const handleTabChange = (tabId: TabIdType | null) => {
    let clickedTabIndex = 0;
    tabs.forEach(({ nav, tabs }) => {
      if (nav === activeNav)
        tabs.forEach((tab, i) => {
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
    handleTabChange(getFirstTab(activeNav));
  }, [activeNav]);

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
