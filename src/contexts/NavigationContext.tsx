import { createContext, useContext, useState, type ReactNode } from "react";
import { useShopContext } from "./ShopContext";

export type NavContextType = {
  activeNav: string;
  handleActiveNavChange: (navTitle: TitleType) => void;
};

export const NavContext = createContext<NavContextType>({} as NavContextType);

export const useNavContext = () => useContext(NavContext);

const NAV_TITLES = [
  "Home",
  "Shop for me",
  "Export",
  "Import",
  "Auto Import",
  "Tracking",
  "Billing",
  "Get a Quote",
  "Help",
  "Settings",
  "Logout",
] as const;

type TitleType = (typeof NAV_TITLES)[number];

export type NavItemType = { src: string; title: TitleType; href: string };

export const topNavItems: NavItemType[] = [
  { src: "/images/nav/shop_icon.svg", title: "Shop for me", href: "/shop" },
  { src: "/images/nav/export_icon.svg", title: "Export", href: "/export" },
  { src: "/images/nav/import_icon.svg", title: "Import", href: "/import" },
  {
    src: "/images/nav/auto_import_icon.svg",
    title: "Auto Import",
    href: "/auto-import",
  },
  {
    src: "/images/nav/tracking_icon.svg",
    title: "Tracking",
    href: "/tracking",
  },
];

export const bottomNavItems: NavItemType[] = [
  {
    src: "/images/nav/get_a_quote_icon.svg",
    title: "Get a Quote",
    href: "/quote",
  },
  { src: "/images/nav/help_icon.svg", title: "Help", href: "/help" },
  {
    src: "/images/nav/settings_icon.svg",
    title: "Settings",
    href: "/settings",
  },
];

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeNav, setActiveNav] =
    useState<NavItemType["title"]>("Shop for me");
  const { tabs, handleTabChange } = useShopContext();

  const handleActiveNavChange = (navTitle: TitleType) => {
    setActiveNav(navTitle);

    if (tabs[0]) handleTabChange(tabs[0].id);
  };

  const value: NavContextType = {
    activeNav,
    handleActiveNavChange,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
