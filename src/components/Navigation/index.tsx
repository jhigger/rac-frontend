/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuthContext } from "~/contexts/AuthContext";
import {
  bottomNavItems,
  topNavItems,
  useNavContext,
  type NavItemType,
} from "~/contexts/NavigationContext";

export type NavItemProps = {
  navItem: NavItemType;
  onClick?: () => void;
};

export const NavItem = ({ navItem, onClick }: NavItemProps) => {
  const { activeNav, handleActiveNavChange } = useNavContext();

  const handleClick = () => {
    if (onClick) return onClick();

    handleActiveNavChange(navItem.title);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`flex w-full items-center bg-opacity-[8%] hover:bg-[url('/images/nav/nav_item_hover_bg.svg')] ${
        navItem.title === activeNav &&
        "bg-[url('/images/nav/nav_item_hover_bg.svg')]"
      }`}
    >
      <img src={navItem.src} alt="nav item icon" className="p-[16px]" />
      <span className="body-lg text-gray-100">{navItem.title}</span>
    </button>
  );
};

export const TopNav = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <Link href="/">
        <NavItem
          navItem={{
            src: "/images/nav/home_icon.svg",
            title: "Home",
            href: "/",
          }}
        />
      </Link>
      <div>
        {topNavItems.map((navItem) => {
          return (
            <Link key={navItem.href} href={navItem.href}>
              <NavItem navItem={navItem} />
            </Link>
          );
        })}
      </div>
      <Link href="/billing">
        <NavItem
          navItem={{
            src: "/images/nav/billing_icon.svg",
            title: "Billing",
            href: "/billing",
          }}
        />
      </Link>
    </div>
  );
};

export const BottomNav = () => {
  const { handleLogout } = useAuthContext();

  return (
    <div className="flex flex-1 flex-col justify-end pb-[44px]">
      <div className="px-[20px]">
        <hr className="w-full border-gray-700" />
      </div>
      {bottomNavItems.map((navItem) => {
        return (
          <Link key={navItem.href} href={navItem.href}>
            <NavItem navItem={navItem} />
          </Link>
        );
      })}
      <NavItem
        navItem={{
          src: "/images/top app bar/user_icon.svg",
          title: "Logout",
          href: "/",
        }}
        onClick={handleLogout}
      />
      ;
    </div>
  );
};
