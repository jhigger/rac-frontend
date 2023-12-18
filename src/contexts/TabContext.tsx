import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import AutoImportDraftsPanel from "~/components/AutoImport/Drafts/DraftsPanel";
import AutoImportOrdersPanel from "~/components/AutoImport/Orders/OrdersPanel";
import AutoImportRequestsPanel from "~/components/AutoImport/Requests/RequestsPanel";
import ExportDraftsPanel from "~/components/Export/Drafts/DraftsPanel";
import ExportOrdersPanel from "~/components/Export/Orders/OrdersPanel";
import ExportRequestsPanel from "~/components/Export/Requests/RequestsPanel";
import ImportDraftsPanel from "~/components/Import/Drafts/DraftsPanel";
import ImportOrdersPanel from "~/components/Import/Orders/OrdersPanel";
import ImportRequestsPanel from "~/components/Import/Requests/RequestsPanel";
import ShopDraftsPanel from "~/components/Shop/Drafts/DraftsPanel";
import ShopOrdersPanel from "~/components/Shop/Orders/OrdersPanel";
import ShopRequestsPanel from "~/components/Shop/Requests/RequestsPanel";
import { type ACTION_CONST, type TAB_IDS } from "~/constants";
import { useNavContext, type NavTitleType } from "./NavigationContext";

export type TabContextType = {
  activeAction: ActionType | null;
  activeTab: AppBarTabType["tabs"][number]["id"] | null;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
  viewIndex: number | null;
  handleActiveAction: (action: ActionType | null) => void;
  handleTabChange: (tab: TabIdType) => void;
  handleViewIndex: (index: number | null) => void;
};

export const TabContext = createContext<TabContextType>({} as TabContextType);

export const useTabContext = () => useContext(TabContext);

type ActionType = (typeof ACTION_CONST)[number];

type TabIdType = (typeof TAB_IDS)[number];

type TabType = {
  id: TabIdType;
  title: string;
  content: JSX.Element;
};

type AppBarTabType = { nav: NavTitleType; tabs: TabType[] };

export const tabs: [AppBarTabType, ...AppBarTabType[]] = [
  {
    nav: "Shop For Me",
    tabs: [
      { id: "orders", title: "Orders", content: <ShopOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ShopRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ShopDraftsPanel /> },
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
  {
    nav: "Import",
    tabs: [
      { id: "orders", title: "Orders", content: <ImportOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ImportRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ImportDraftsPanel /> },
    ],
  },
  {
    nav: "Auto Import",
    tabs: [
      { id: "orders", title: "Orders", content: <AutoImportOrdersPanel /> },
      {
        id: "requests",
        title: "Requests",
        content: <AutoImportRequestsPanel />,
      },
      { id: "drafts", title: "Drafts", content: <AutoImportDraftsPanel /> },
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

  const [viewIndex, setViewIndex] = useState<number | null>(null);

  const handleTabChange = (tabId: TabIdType | null) => {
    let clickedTabIndex = null;
    tabs.forEach(({ nav, tabs }) => {
      if (nav === activeNav)
        tabs.forEach((tab, i) => {
          if (tab.id === tabId) {
            clickedTabIndex = i;
          }
        });
    });

    if (clickedTabIndex) {
      if (!tabsRef.current[clickedTabIndex]) return;
      tabsRef.current[clickedTabIndex]?.click();
    }
    setActiveTab(tabId);
    reset();
  };

  const handleViewIndex = (index: number | null) => {
    setViewIndex(index);
  };

  const reset = () => {
    setActiveAction(null);
    setViewIndex(null);
  };

  useEffect(() => {
    handleTabChange(getFirstTab(activeNav));
  }, [activeNav]);

  const value: TabContextType = {
    viewIndex,
    activeAction,
    activeTab,
    tabs,
    tabsRef,
    handleActiveAction,
    handleTabChange,
    handleViewIndex,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export default TabContextProvider;
