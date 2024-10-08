import {
  Calculator,
  Car,
  Celo,
  ExportSquare,
  Home2,
  ImportSquare,
  NotificationBing,
  Routing2,
  Setting3,
  Shop,
  Wallet3,
} from "iconsax-react";
import Error from "next/error";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type NAV_TITLES } from "~/constants";
import { restrictedPaths, useAuthContext } from "./AuthContext";

export type NavContextType = {
  activeNav: NavTitleType;
  previousRoute: string | null;
  handleActiveNavChange: (navTitle: NavTitleType) => void;
};

export const NavContext = createContext<NavContextType>({} as NavContextType);

export const useNavContext = () => useContext(NavContext);

export type NavTitleType = (typeof NAV_TITLES)[number];

export type NavItemType = {
  src: JSX.Element;
  title: NavTitleType;
  href: string;
};

export const topNavItems: NavItemType[] = [
  {
    src: <Shop className="text-gray-400" />,
    title: "Shop For Me",
    href: "/shop",
  },
  {
    src: <ExportSquare className="text-gray-400" />,
    title: "Export",
    href: "/export",
  },
  {
    src: <ImportSquare className="text-gray-400" />,
    title: "Import",
    href: "/import",
  },
  {
    src: <Car className="text-gray-400" />,
    title: "Auto Import",
    href: "/auto-import",
  },
  {
    src: <Routing2 className="text-gray-400" />,
    title: "Tracking",
    href: "/tracking",
  },
];

export const bottomNavItems: NavItemType[] = [
  {
    src: <Calculator className="text-gray-400" />,
    title: "Get a Quote",
    href: "/quote",
  },
  { src: <Celo className="text-gray-400" />, title: "Get Help", href: "/help" },
  {
    src: <Setting3 className="text-gray-400" />,
    title: "Settings",
    href: "/settings",
  },
];

export const navItems: NavItemType[] = [
  { src: <Home2 className="text-gray-400" />, title: "Home", href: "/" },
  {
    src: <Wallet3 className="text-gray-400" />,
    title: "Payment History",
    href: "/payment",
  },
  {
    src: <NotificationBing />,
    title: "Notifications",
    href: "/notifications",
  },
  ...topNavItems,
  ...bottomNavItems,
];

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const previousRouteRef = useRef<string | null>(null);
  const [activeNav, setActiveNav] =
    useState<NavItemType["title"]>("Shop For Me");
  const [notFound, setNotFound] = useState(false);

  const handleActiveNavChange = (navTitle: NavTitleType) => {
    setActiveNav(navTitle);
  };

  useEffect(() => {
    setNotFound(false);

    const pathWithoutQuery = router.asPath.split("?");
    const matchedNavItem = navItems.find(
      (navItem) => pathWithoutQuery[0] === navItem.href,
    );

    if (matchedNavItem) {
      if (!user) return void router.push("/login");
      handleActiveNavChange(matchedNavItem.title);
    } else if (!restrictedPaths.includes(pathWithoutQuery[0] ?? "/login")) {
      setNotFound(true);
    }

    router.events?.on("routeChangeStart", () => {
      previousRouteRef.current = pathWithoutQuery[0] ?? "/login";
    });
  }, [router.asPath]);

  const value: NavContextType = {
    activeNav,
    previousRoute: previousRouteRef.current,
    handleActiveNavChange,
  };

  if (notFound) {
    return <Error statusCode={404} title="This page could not be found" />;
  }

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
