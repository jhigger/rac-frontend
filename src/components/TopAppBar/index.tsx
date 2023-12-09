import {
  ArrowDown2,
  HambergerMenu,
  NotificationBing,
  User,
} from "iconsax-react";
import { useNavContext } from "~/contexts/NavigationContext";
import AppBarTabs from "./AppBarTabs";
import BreadCrumbs from "./BreadCrumbs";

const TopAppBar = () => {
  return (
    <div className="sticky top-0 z-40 flex flex-col bg-neutral-50">
      <div className="flex w-full items-center justify-between gap-1.5 bg-white px-[20px] pb-[10px] pt-[25px] md:h-[120px] md:px-[40px]">
        <div className="md:hidden">
          <button
            data-type="dialogs"
            data-target="#sheet_b"
            className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
          >
            <HambergerMenu className="text-gray-500" />
          </button>
        </div>
        <div className="hidden flex-col gap-[10px] md:flex">
          <TopAppBarHeader />
        </div>

        <div className="flex flex-row items-center justify-end">
          <button className="relative flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
            <NotificationBing className="text-gray-500" />

            <div className="label-sm absolute right-3 top-3 flex h-[10px] min-w-[10px] items-center justify-center rounded-full bg-error-600 p-1 text-[8px] text-white">
              {/* put notification count here */}
            </div>
          </button>
          <button className="group flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
            <User className="text-gray-500" />

            <ArrowDown2
              variant="Bold"
              className="hidden text-gray-500 group-hover:block"
            />
          </button>
        </div>
      </div>
      {/* mobile version */}
      <div className="flex flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <TopAppBarHeader />
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
    <>
      <h1 className="title-lg md:headline-md text-center text-brand md:text-left">
        {activeNav}
      </h1>
      <BreadCrumbs />
    </>
  );
};

export default TopAppBar;
