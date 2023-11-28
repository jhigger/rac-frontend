/* eslint-disable @next/next/no-img-element */
export type NavItemType = { src: string; title: string };

export type NavItemProps = {
  navItem: NavItemType;
  active: string;
  onClick: (title: string) => void;
};

export const NavItem = ({ navItem, active, onClick }: NavItemProps) => {
  return (
    <button
      onClick={() => onClick(navItem.title)}
      type="button"
      className={`flex w-full items-center bg-opacity-[8%] hover:bg-[url('/images/nav/nav_item_hover_bg.svg')] ${
        navItem.title === active &&
        "bg-[url('/images/nav/nav_item_hover_bg.svg')]"
      }`}
    >
      <img src={navItem.src} alt="nav item icon" className="p-[16px]" />
      <span className="body-lg text-gray-100">{navItem.title}</span>
    </button>
  );
};

export type NavProps = Pick<NavItemProps, "active" | "onClick">;

const topNavItems: NavItemType[] = [
  { src: "/images/nav/shop_icon.svg", title: "Shop for me" },
  { src: "/images/nav/shop_icon.svg", title: "Export" },
  { src: "/images/nav/shop_icon.svg", title: "Import" },
  { src: "/images/nav/shop_icon.svg", title: "Auto Import" },
  { src: "/images/nav/shop_icon.svg", title: "Tracking" },
];

export const TopNav = ({ active, onClick }: NavProps) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <NavItem
        navItem={{ src: "/images/nav/home_icon.svg", title: "Home" }}
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
        navItem={{ src: "/images/nav/shop_icon.svg", title: "Billing" }}
        active={active}
        onClick={onClick}
      />
    </div>
  );
};

const bottomNavItems: NavItemType[] = [
  { src: "/images/nav/shop_icon.svg", title: "Get a Quote" },
  { src: "/images/nav/shop_icon.svg", title: "Help" },
  { src: "/images/nav/shop_icon.svg", title: "Settings" },
];

export const BottomNav = ({ active, onClick }: NavProps) => {
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
