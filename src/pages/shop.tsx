/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type NavItemType = { src: string; title: string };

const topNavItems: NavItemType[] = [
  { src: "/images/shop_icon.svg", title: "Shop for me" },
  { src: "/images/shop_icon.svg", title: "Export" },
  { src: "/images/shop_icon.svg", title: "Import" },
  { src: "/images/shop_icon.svg", title: "Auto Import" },
  { src: "/images/shop_icon.svg", title: "Tracking" },
];

const bottomNavItems: NavItemType[] = [
  { src: "/images/shop_icon.svg", title: "Get a Quote" },
  { src: "/images/shop_icon.svg", title: "Help" },
  { src: "/images/shop_icon.svg", title: "Settings" },
];

const shop = () => {
  const [active, setActive] = useState("Shop for me");

  const handleChangeActive = (title: string) => {
    setActive(title);
  };

  return (
    <div className="relative min-h-screen bg-neutral-50">
      <nav className="fixed flex h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px]">
        <Welcome />
        <TopNav {...{ active, onClick: handleChangeActive }} />
        <BottomNav {...{ active, onClick: handleChangeActive }} />
      </nav>
    </div>
  );
};

const Welcome = () => {
  return (
    <div className="mb-[28px] h-[80px] w-[253px] rounded-r-[20px] bg-neutral-100 bg-opacity-[8%]">
      <div className="flex items-center gap-[10px] px-[10px] py-[18px]">
        <img
          src="https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto"
          alt="user image"
          className="h-[40px] w-[40px] rounded-full bg-red-500"
        />
        <div className="flex flex-col gap-0 text-gray-100">
          <span className="body-md">Welcome back</span>
          <div className="body-lg flex gap-[10px]">
            <span>Rex</span>
            <span className="font-bold text-white">ID: RAC45678</span>
          </div>
        </div>
      </div>
    </div>
  );
};

type NavItemProps = {
  navItem: NavItemType;
  active: string;
  onClick: (title: string) => void;
};

const NavItem = ({ navItem, active, onClick }: NavItemProps) => {
  return (
    <button
      onClick={() => onClick(navItem.title)}
      type="button"
      className={`flex w-full items-center bg-opacity-[8%] hover:bg-[url('/images/nav_item_hover_bg.svg')] ${
        navItem.title === active && "bg-[url('/images/nav_item_hover_bg.svg')]"
      }`}
    >
      <img src={navItem.src} alt="nav item icon" className="p-[16px]" />
      <span className="body-lg text-gray-100">{navItem.title}</span>
    </button>
  );
};

type NavProps = Pick<NavItemProps, "active" | "onClick">;

const TopNav = ({ active, onClick }: NavProps) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <NavItem
        navItem={{ src: "/images/shop_icon.svg", title: "Home" }}
        active={active}
        onClick={onClick}
      />
      <div>
        {topNavItems.map((navItem) => {
          return (
            <NavItem
              key={navItem.title}
              navItem={navItem}
              active={active}
              onClick={onClick}
            />
          );
        })}
      </div>
      <NavItem
        navItem={{ src: "/images/shop_icon.svg", title: "Billing" }}
        active={active}
        onClick={onClick}
      />
    </div>
  );
};

const BottomNav = ({ active, onClick }: NavProps) => {
  return (
    <div className="flex flex-1 flex-col justify-end pb-[44px]">
      <div className="px-[20px]">
        <hr className="w-full border-gray-700" />
      </div>
      {bottomNavItems.map((navItem) => {
        return (
          <NavItem
            key={navItem.title}
            navItem={navItem}
            active={active}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};

export default shop;
