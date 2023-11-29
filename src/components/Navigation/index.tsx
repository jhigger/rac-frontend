/* eslint-disable @next/next/no-img-element */
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
  const { activeNav, handleActiveNavChange } = useNavContext();

  return (
    <button
      onClick={() => handleActiveNavChange(navItem.title)}
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
      <NavItem navItem={{ src: "/images/nav/home_icon.svg", title: "Home" }} />
      <div>
        {topNavItems.map((navItem) => {
          return <NavItem key={navItem.title} navItem={navItem} />;
        })}
      </div>
      <NavItem
        navItem={{ src: "/images/nav/billing_icon.svg", title: "Billing" }}
      />
    </div>
  );
};

export const BottomNav = () => {
  return (
    <div className="flex flex-1 flex-col justify-end pb-[44px]">
      <div className="px-[20px]">
        <hr className="w-full border-gray-700" />
      </div>
      {bottomNavItems.map((navItem) => {
        return <NavItem key={navItem.title} navItem={navItem} />;
      })}
    </div>
  );
};
