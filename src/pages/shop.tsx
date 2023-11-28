/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type NavItemType = { src: string; title: string };

const topNavItems: NavItemType[] = [
  { src: "/images/nav/shop_icon.svg", title: "Shop for me" },
  { src: "/images/nav/shop_icon.svg", title: "Export" },
  { src: "/images/nav/shop_icon.svg", title: "Import" },
  { src: "/images/nav/shop_icon.svg", title: "Auto Import" },
  { src: "/images/nav/shop_icon.svg", title: "Tracking" },
];

const bottomNavItems: NavItemType[] = [
  { src: "/images/nav/shop_icon.svg", title: "Get a Quote" },
  { src: "/images/nav/shop_icon.svg", title: "Help" },
  { src: "/images/nav/shop_icon.svg", title: "Settings" },
];

const shop = () => {
  const [active, setActive] = useState("Shop for me");

  const handleChangeActive = (title: string) => {
    setActive(title);
  };

  return (
    <div className="relative flex min-h-screen bg-neutral-50">
      <nav className="fixed hidden h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px] md:flex">
        <Welcome />
        <TopNav {...{ active, onClick: handleChangeActive }} />
        <BottomNav {...{ active, onClick: handleChangeActive }} />
      </nav>
      <main className="w-full md:ml-[266px]">
        <SideSheet {...{ active, onClick: handleChangeActive }} />
        <TopAppBar />
      </main>
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

const TopAppBar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between gap-1.5 bg-white pb-[10px] pt-[25px] md:h-[120px] md:px-[40px]">
        <div className="md:hidden">
          <button
            data-type="dialogs"
            data-target="#sheet_b"
            className="material-icons-outlined relative !inline-flex h-12 w-12 !items-center justify-center gap-x-2 rounded-[6.25rem] px-6 py-2.5 text-center text-sm font-medium tracking-[.00714em] text-secondary-600 hover:bg-surface-300 focus:bg-surface-400"
          >
            menu
          </button>
        </div>
        <div className="hidden flex-col gap-[10px] md:flex">
          <h1 className="headline-md text-center text-brand md:text-left">
            Shop for me
          </h1>
          <div className="flex gap-4">
            <img
              src="/images/nav/home_icon.svg"
              alt="home icon"
              className="h-[19px] w-[19px]"
            />
            <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
            <span className="title-sm text-secondary-600">
              shop for me - orders
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end">
          <button className="relative !inline-flex h-12 w-12 !items-center justify-center gap-x-2 rounded-[6.25rem] px-6 py-2.5 text-center text-sm font-medium tracking-[.00714em] hover:bg-surface-300 focus:bg-surface-400">
            <span className="material-icons-outlined text-gray-500">
              notifications
            </span>
            <div className="absolute right-3 top-3 flex h-[10px] w-[10px] items-center justify-center rounded-full bg-error-600 text-[11px] font-medium leading-none tracking-[.045em] text-white">
              {/* put notification count here */}
            </div>
          </button>
          <button className="material-icons-outlined relative !inline-flex h-12 w-12 !items-center justify-center gap-x-2 rounded-[6.25rem] px-6 py-2.5 text-center text-sm font-medium tracking-[.00714em] text-gray-500 hover:bg-surface-300 focus:bg-surface-400">
            person
          </button>
        </div>
      </div>
      {/* mobile version */}
      <div className="flex flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <h1 className="headline-md text-center text-brand md:text-left">
          Shop for me
        </h1>
        <div className="flex gap-4">
          <img
            src="/images/nav/home_icon.svg"
            alt="home icon"
            className="h-[19px] w-[19px]"
          />
          <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
          <span className="title-sm text-secondary-600">
            shop for me - orders
          </span>
        </div>
      </div>
      {/* tabs */}
      <div className="h-[50px] w-full rounded-b-[20px] border-b-[1px] border-t-[0.5px] border-b-gray-200 border-t-gray-500 bg-white">
        <AppBarTabs />
      </div>
    </div>
  );
};

const SideSheet = ({ active, onClick }: NavProps) => {
  // mobile nav
  return (
    <div id="sheet_b" className="group md:hidden">
      <div
        data-close="#sheet_b"
        className="fixed -top-full z-40 bg-neutral-900 opacity-0 group-[&.show]:inset-0 group-[&.show]:opacity-60"
      ></div>
      <nav className="fixed bottom-0 left-0 top-0 z-50 flex h-full min-h-screen w-[266px] -translate-x-full flex-col overflow-y-auto bg-brand py-[40px] transition-transform duration-[400ms] group-[&.show]:translate-x-0">
        <Welcome />
        <TopNav {...{ active, onClick }} />
        <BottomNav {...{ active, onClick }} />
      </nav>
    </div>
  );
};

type AppBarTabType = {
  id: string;
  title: string;
  content: JSX.Element;
};

const tabs: AppBarTabType[] = [
  { id: "tab-1", title: "Orders", content: <h3>Tabs content 1</h3> },
  { id: "tab-2", title: "Requests", content: <h3>Tabs content 2</h3> },
  { id: "tab-3", title: "Draft", content: <h3>Tabs content 3</h3> },
];

const AppBarTabs = () => {
  return (
    <div className="tabs flex w-full flex-col">
      <div className="relative flex flex-row items-center">
        {tabs.map(({ id: dataTarget, title }) => {
          return (
            <button
              key={`tab-${dataTarget}`}
              data-type="tabs"
              data-target={`#${dataTarget}`}
              className="active flex h-[49px] w-1/3 flex-col items-center justify-end gap-1 px-4 py-2 md:w-[120px]"
            >
              <p className="text-sm tracking-[.00714em]">{title}</p>
            </button>
          );
        })}
        <div
          role="indicator"
          className="absolute bottom-0 left-0 ml-[12%] h-0.5 w-[40px] rounded-t-full bg-primary-600 transition-all duration-200 ease-in-out sm:ml-[14%] md:ml-[40px]"
        ></div>
      </div>

      <div className="flex flex-col">
        {tabs.map(({ id: dataTarget, content }, i) => {
          return (
            <div
              key={`panel-${dataTarget}`}
              id={dataTarget}
              role="tabpanel"
              className={`duration-400 hidden py-4 transition ease-in-out [&.active]:block ${
                i === 0 && "active"
              }`}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default shop;
