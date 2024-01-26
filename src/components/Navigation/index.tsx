/* eslint-disable @next/next/no-img-element */
import { Home2, Wallet3 } from "iconsax-react";
import Link from "next/link";
import {
  bottomNavItems,
  topNavItems,
  useNavContext,
  type NavItemType,
} from "~/contexts/NavigationContext";

export type NavItemProps = {
  navItem: NavItemType;
};

export const NavItem = ({ navItem }: NavItemProps) => {
  const { activeNav } = useNavContext();

  return (
    <Link href={navItem.href}>
      <div
        data-close="#sheet_b"
        className={`flex w-full items-center bg-opacity-[8%] hover:bg-[url('/images/nav/nav_item_hover_bg.svg')] ${
          navItem.title === activeNav &&
          "bg-[url('/images/nav/nav_item_hover_bg.svg')]"
        }`}
      >
        <span className="p-[16px]">{navItem.src}</span>
        <span className="body-lg text-gray-100">{navItem.title}</span>
      </div>
    </Link>
  );
};

export const TopNav = () => {
  return (
    <div className="flex flex-col gap-[16px] overflow-y-auto">
      <NavItem
        navItem={{
          src: <Home2 className="text-gray-400" />,
          title: "Home",
          href: "/",
        }}
      />
      <div>
        {topNavItems.map((navItem) => {
          return <NavItem key={navItem.href} navItem={navItem} />;
        })}
      </div>
      <NavItem
        navItem={{
          src: <Wallet3 className="text-gray-400" />,
          title: "Payment History",
          href: "/payment",
        }}
      />
    </div>
  );
};

export const BottomNav = () => {
  return (
    <div className="flex flex-1 flex-col justify-end pb-[32px]">
      <div className="px-[20px]">
        <hr className="w-full border-gray-700" />
      </div>
      {bottomNavItems.map((navItem) => {
        return <NavItem key={navItem.href} navItem={navItem} />;
      })}
    </div>
  );
};
