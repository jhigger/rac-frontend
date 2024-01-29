import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HambergerMenu } from "iconsax-react";
import { useNavContext } from "~/contexts/NavigationContext";
import { NotificationButton } from "../Notifications";
import AccountButtonDropdown from "./AccountButtonDropdown";
import AppBarTabs from "./AppBarTabs";
import BreadCrumbs from "./BreadCrumbs";

dayjs.extend(relativeTime);

type TopAppBarProps = { hasTabs?: boolean; hasBreadcrumbs?: boolean };

const TopAppBar = ({
  hasTabs = true,
  hasBreadcrumbs = true,
}: TopAppBarProps) => {
  const { activeNav } = useNavContext();

  return (
    <div className="sticky top-0 z-40 flex flex-col">
      <div className="flex w-full items-center justify-between gap-[10px] bg-white px-[20px] pb-[10px] pt-[25px] md:h-[120px] md:px-[40px]">
        <div className="md:hidden">
          <MenuButton />
        </div>
        <div className="hidden flex-col gap-[10px] md:flex">
          <h1 className="title-lg md:headline-md text-center text-brand md:text-left">
            {activeNav}
          </h1>
          <div className="flex w-full items-center justify-center gap-[10px] px-[20px] md:justify-start md:gap-4 md:px-0">
            {hasBreadcrumbs && <BreadCrumbs />}
          </div>
        </div>
        <div className="z-50 flex flex-row items-center justify-end">
          <NotificationButton />
          <AccountButtonDropdown />
        </div>
      </div>
      {/* mobile version */}
      <div className="flex w-full flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <h1 className="title-lg md:headline-md text-center text-brand md:text-left">
          {activeNav}
        </h1>
        <div className="flex w-full items-center justify-center gap-[10px] px-[20px] md:justify-start md:gap-4 md:px-0">
          {hasBreadcrumbs && <BreadCrumbs />}
        </div>
      </div>

      {/* tabs */}
      {hasTabs ? (
        <AppBarTabs />
      ) : (
        <div className="h-[20px] overflow-hidden rounded-b-[20px] border-b-[1px] border-b-gray-200 bg-white"></div>
      )}
    </div>
  );
};

const MenuButton = () => {
  return (
    <button
      data-type="dialogs"
      data-target="#sheet_b"
      className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      <HambergerMenu className="text-gray-500" />
    </button>
  );
};

export default TopAppBar;
