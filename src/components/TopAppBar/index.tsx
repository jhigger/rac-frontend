import { Menu } from "@headlessui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Activity,
  ArrowDown2,
  ArrowRight2,
  ArrowUp2,
  Celo,
  HambergerMenu,
  Profile,
  SecuritySafe,
  User,
} from "iconsax-react";
import { useAuthContext } from "~/contexts/AuthContext";
import { useNavContext } from "~/contexts/NavigationContext";
import { NotificationButton } from "../Notifications";
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
          {hasBreadcrumbs && <BreadCrumbs />}
        </div>
        <div className="z-50 flex flex-row items-center justify-end">
          <NotificationButton />
          <AccountButtonDropdown />
        </div>
      </div>
      {/* mobile version */}
      <div className="flex flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <h1 className="title-lg md:headline-md text-center text-brand md:text-left">
          {activeNav}
        </h1>
        {hasBreadcrumbs && <BreadCrumbs />}
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

const AccountButtonDropdown = () => {
  const { handleLogout } = useAuthContext();

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] p-3 text-gray-500 hover:bg-surface-300 focus:bg-surface-400">
          {({ open }) => (
            <>
              <User />
              {open ? (
                <ArrowUp2 variant="Bold" />
              ) : (
                <ArrowDown2 variant="Bold" />
              )}
            </>
          )}
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 flex w-[320px] origin-top-right flex-col overflow-hidden rounded-[20px] bg-surface-200 shadow-md ring-1 ring-black/5 focus:outline-none md:top-16">
        <AccountMenuItem
          icon={<Profile color="#292D32" />}
          label="Profile Information"
        />

        <AccountMenuItem
          icon={<Activity color="#292D32" />}
          label="Account Activities"
        />

        <AccountMenuItem
          icon={<SecuritySafe color="#292D32" />}
          label="Account Security"
        />

        <AccountMenuItem icon={<Celo color="#292D32" />} label="Help" />

        <LogoutButton onClick={handleLogout} />
      </Menu.Items>
    </Menu>
  );
};

type LogoutButtonProps = { onClick: () => void };

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <div className="p-[20px]">
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={onClick}
            aria-label="Logout"
            className={`btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] ${
              active ? "bg-primary-900" : "bg-primary-600"
            } px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6`}
          >
            <span className="label-lg text-white">Logout</span>
          </button>
        )}
      </Menu.Item>
    </div>
  );
};

type AccountMenuItemProps = { icon: JSX.Element; label: string };

const AccountMenuItem = ({ icon, label }: AccountMenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`flex items-center justify-between p-[20px] ${
            active ? "bg-surface-500" : ""
          }`}
        >
          <div className="flex gap-[16px]">
            {icon}
            <span className="body-lg text-neutral-900">{label}</span>
          </div>
          <ArrowRight2 size={18} variant="Bold" className="text-neutral-900" />
        </button>
      )}
    </Menu.Item>
  );
};
export default TopAppBar;
