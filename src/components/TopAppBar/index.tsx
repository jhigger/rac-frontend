/* eslint-disable @next/next/no-img-element */
import { useNavContext } from "~/contexts/NavigationContext";
import { useShopContext } from "~/contexts/ShopContext";
import AppBarTabs from "./AppBarTabs";

const TopAppBar = () => {
  return (
    <div className="sticky top-0 z-50 flex flex-col">
      <div className="flex w-full items-center justify-between gap-1.5 bg-white px-[20px] pb-[10px] pt-[25px] md:h-[120px] md:px-[40px]">
        <div className="md:hidden">
          <button
            data-type="dialogs"
            data-target="#sheet_b"
            className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
          >
            <img src="/images/top app bar/menu_icon.svg" alt="menu icon" />
          </button>
        </div>
        <div className="hidden flex-col gap-[10px] md:flex">
          <TopAppBarHeader />
          <TopAppBarBreadCrumbs />
        </div>

        <div className="flex flex-row items-center justify-end">
          <button className="relative flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
            <img
              src="/images/top app bar/notification_icon.svg"
              alt="notification icon"
            />
            <div className="label-sm absolute right-3 top-3 flex h-[10px] min-w-[10px] items-center justify-center rounded-full bg-error-600 p-1 text-[8px] text-white">
              {/* put notification count here */}
            </div>
          </button>
          <button className="group flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
            <img src="/images/top app bar/user_icon.svg" alt="user icon" />
            <img
              src="/images/top app bar/arrow_down_bold_icon.svg"
              alt="arrow down bold icon"
              className="hidden group-hover:block"
            />
          </button>
        </div>
      </div>
      {/* mobile version */}
      <div className="flex flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <TopAppBarHeader />
        <TopAppBarBreadCrumbs />
      </div>
      {/* tabs */}
      <div className="h-[50px] w-full rounded-b-[20px] border-b-[1px] border-t-[0.5px] border-b-gray-200 border-t-gray-500 bg-white">
        <AppBarTabs />
      </div>
    </div>
  );
};

const TopAppBarHeader = () => {
  const { activeNav } = useNavContext();

  return (
    <h1 className="headline-md text-center text-brand md:text-left">
      {activeNav}
    </h1>
  );
};

const TopAppBarBreadCrumbs = () => {
  const { activeNav } = useNavContext();
  const { activeTab } = useShopContext();

  return (
    <div className="flex gap-4">
      <img
        src="/images/nav/home_icon.svg"
        alt="home icon"
        className="h-[19px] w-[19px]"
      />
      <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
      <span className="title-sm text-secondary-600">
        {activeNav.toLowerCase()}
      </span>
      <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
      <span className="title-sm text-secondary-600">{activeTab}</span>
    </div>
  );
};

export default TopAppBar;
