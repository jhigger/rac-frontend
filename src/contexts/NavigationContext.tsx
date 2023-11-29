import { createContext, useContext, useState, type ReactNode } from "react";
import { useTabsContext } from "./TabsContext";

export type NavContextType = {
  activeNav: string;
  handleActiveNavChange: (navItem: string) => void;
};

export const NavContext = createContext<NavContextType>({} as NavContextType);

export const useNavContext = () => useContext(NavContext);

export type NavItemType = { src: string; title: string };

export const topNavItems: NavItemType[] = [
  { src: "/images/nav/shop_icon.svg", title: "Shop for me" },
  { src: "/images/nav/export_icon.svg", title: "Export" },
  { src: "/images/nav/import_icon.svg", title: "Import" },
  { src: "/images/nav/auto_import_icon.svg", title: "Auto Import" },
  { src: "/images/nav/tracking_icon.svg", title: "Tracking" },
];

export const bottomNavItems: NavItemType[] = [
  { src: "/images/nav/get_a_quote_icon.svg", title: "Get a Quote" },
  { src: "/images/nav/help_icon.svg", title: "Help" },
  { src: "/images/nav/settings_icon.svg", title: "Settings" },
];

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeNav, setActiveNav] = useState("Shop for me");
  const { tabs, tabsRef, handleTabChange } = useTabsContext();

  const handleActiveNavChange = (title: string) => {
    setActiveNav(title);

    if (!tabsRef.current[0]) return;
    tabsRef.current[0].click();
    if (tabs[0]) handleTabChange(tabs[0].id);
  };

  const value: NavContextType = {
    activeNav,
    handleActiveNavChange,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
