import { Menu } from "@headlessui/react";
import { More } from "iconsax-react";

type MoreButtonProps = { onClick: () => void };

export const MoreButton = ({ onClick }: MoreButtonProps) => {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
          <More className="text-error-600" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 top-10 z-50 min-w-[200px] flex-col items-center justify-center rounded-[10px] bg-surface-200 shadow-md">
        <Menu.Item>
          <button
            className="w-full rounded-[10px] px-4 py-2 hover:bg-secondary-100 hover:bg-opacity-30"
            onClick={onClick}
          >
            View Details
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
