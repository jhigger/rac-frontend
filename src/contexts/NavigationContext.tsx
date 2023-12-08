import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
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

export const navItems: NavItemType[] = [
  { src: "/images/nav/home_icon.svg", title: "Home", href: "/" },
  { src: "/images/nav/billing_icon.svg", title: "Billing", href: "/billing" },
  ...topNavItems,
  ...bottomNavItems,
];

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [activeNav, setActiveNav] =
    useState<NavItemType["title"]>("Shop for me");

  const handleActiveNavChange = (navTitle: NavTitleType) => {
    setActiveNav(navTitle);
  };

  const value: NavContextType = {
    activeNav,
    handleActiveNavChange,
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    const matchedNavItem = navItems.find(
      (navItem) => router.asPath === navItem.href,
    );

    if (matchedNavItem) {
      handleActiveNavChange(matchedNavItem.title);
      redirectTo(router.asPath);
    }
  }, [router.asPath]);

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
