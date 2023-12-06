import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type NavContextType = {
  activeNav: NavTitleType;
  handleActiveNavChange: (navTitle: NavTitleType) => void;
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

export type NavTitleType = (typeof NAV_TITLES)[number];

export type NavItemType = { src: string; title: NavTitleType; href: string };

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

export const navItems = [...topNavItems, ...bottomNavItems];

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeNav, setActiveNav] =
    useState<NavItemType["title"]>("Shop for me");

  const handleActiveNavChange = (navTitle: NavTitleType) => {
    setActiveNav(navTitle);
  };

  useEffect(() => {
    const matchedNavItem = navItems.find(
      (navItem) => router.asPath === navItem.href,
    );
    if (matchedNavItem && activeNav !== matchedNavItem.title) {
      setActiveNav(matchedNavItem.title);
    }
  }, [router.asPath, navItems, activeNav]);

  const value: NavContextType = {
    activeNav,
    handleActiveNavChange,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
