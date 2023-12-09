import { ExportSquare, FtxToken, ImportSquare } from "iconsax-react";
import { useEffect } from "react";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import SearchInput from "../Forms/Inputs/SearchInput";

const SearchBar = () => {
  return (
    <>
      <div className="mb-[59px] hidden gap-[20px] sm:flex">
        <div className="w-max">
          <FilterButton modalId="desktopFilter" />
        </div>
        <div className="w-max sm:w-full md:w-max">
          <SearchInput
            id="search_input"
            label="Search for users with any related keyword"
          />
        </div>
        <div className="flex flex-grow justify-end">
          <div className="w-max">
            <RequestNewOrderButton />
          </div>
        </div>
      </div>
      {/* for mobile version */}
      <div className="mb-[20px] flex flex-col items-center gap-[9px] sm:hidden">
        <div className="w-full">
          <SearchInput
            id="search_input"
            label="Search for users with any related keyword"
          />
        </div>
        <div className="flex w-full justify-between gap-[20px]">
          <FilterButton modalId="mobileFilter" />
          <div className="w-full">
            <RequestNewOrderButton />
          </div>
        </div>
      </div>
    </>
  );
};

type FilterButtonProps = { modalId: string };

const FilterButton = ({ modalId }: FilterButtonProps) => {
  const dataTarget = `#${modalId}`;

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <div className="relative inline-block">
      <button
        data-type="dropdown"
        data-target={dataTarget}
        aria-label="Filter"
        className="btn relative flex h-14 w-14 flex-row items-center justify-center gap-x-[12px] rounded-[20px] bg-brand p-[12px] text-sm font-medium tracking-[.00714em] text-neutral-100 sm:p-4 md:w-full"
      >
        <FtxToken variant="Bold" className="w-[18px] md:w-6" />
        <span className="label-lg hidden text-neutral-100 [@media(min-width:1000px)]:block">
          Filter View
        </span>
        <div className="label-sm absolute right-0 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-error-600 p-1 text-[8px] text-white">
          {/* put notification count here */}
        </div>
      </button>

      <div
        id={modalId}
        role="dropdownmenu"
        className="duration-400 invisible absolute left-0 top-2 z-[100] h-40 w-40 flex-col rounded-[20px] bg-surface-200 p-2 opacity-0 shadow-md transition ease-in-out md:top-16 [&.show]:!visible [&.show]:!opacity-100"
      >
        TODO: Filter
      </div>
    </div>
  );
};

const RequestNewOrderButton = () => {
  const { handleActiveAction, handleTabChange } = useTabContext();

  const handleNewOrder = () => {
    handleTabChange("requests");
    handleActiveAction("request new order");
  };

  return (
    <button
      onClick={handleNewOrder}
      aria-label="Filter"
      className="btn relative flex h-14 w-full flex-row items-center justify-center gap-[9px] rounded-[20px] bg-brand px-[8px] py-[12px] text-sm font-medium tracking-[.00714em] text-neutral-100 md:gap-x-[12px] md:p-4"
    >
      <ImportSquare
        variant="Bold"
        className="hidden w-[18px] md:block md:w-6"
      />
      <ExportSquare
        variant="Bold"
        className="block w-[18px] md:hidden md:w-6"
      />
      <span className="label-lg text-neutral-100">Request new order</span>
    </button>
  );
};

export default SearchBar;
