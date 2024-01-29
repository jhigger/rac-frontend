import { Menu } from "@headlessui/react";
import {
  Activity,
  ArrowDown2,
  ArrowRight2,
  ArrowUp2,
  Celo,
  Profile,
  SecuritySafe,
  User,
} from "iconsax-react";
import { useRouter } from "next/router";
import { useAuthContext } from "~/contexts/AuthContext";

const AccountButtonDropdown = () => {
  const { handleLogout } = useAuthContext();
  const router = useRouter();

  const handleProfileInformation = async () => {
    await router.push("/settings?tab=1");
  };

  const handleAccountActivities = async () => {
    await router.push("/settings?tab=1&subTab=3");
  };

  const handleAccountSecurity = async () => {
    await router.push("/settings?tab=3");
  };

  const handleHelp = async () => {
    await router.push("/help");
  };

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
          onClick={handleProfileInformation}
        />

        <AccountMenuItem
          icon={<Activity color="#292D32" />}
          label="Account Activities"
          onClick={handleAccountActivities}
        />

        <AccountMenuItem
          icon={<SecuritySafe color="#292D32" />}
          label="Account Security"
          onClick={handleAccountSecurity}
        />

        <AccountMenuItem
          icon={<Celo color="#292D32" />}
          label="Help"
          onClick={handleHelp}
        />

        <LogoutButton onClick={handleLogout} />
      </Menu.Items>
    </Menu>
  );
};

type AccountMenuItemProps = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
};

const AccountMenuItem = ({ icon, label, onClick }: AccountMenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
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

export default AccountButtonDropdown;
