import { ExportSquare, FtxToken, ImportSquare } from "iconsax-react";
import { useNavContext } from "~/contexts/NavigationContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import SearchInput from "../Forms/Inputs/SearchInput";

const SearchBar = () => {
  const { activeTab } = useTabContext();
  const { activeNav } = useNavContext();
  const page = activeNav.split(" ").join("-").toLowerCase();

  return (
    <>
      <div className="mb-[59px] hidden gap-[20px] sm:flex">
        <div className="w-max">
          <FilterButton />
        </div>
        <div className="w-max sm:w-full md:w-max">
          <SearchInput id={`${page}-${activeTab}-desktopSearch`} />
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
          <SearchInput id={`${page}-${activeTab}-mobileSearch`} />
        </div>
        <div className="flex w-full justify-between gap-[20px]">
          <FilterButton />
          <div className="w-full">
            <RequestNewOrderButton />
          </div>
        </div>
      </div>
    </>
  );
};

const FilterButton = () => {
  const { open, toggle } = useAccordion(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggle}
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

      {open && (
        <div className="absolute left-0 top-2 z-50 h-40 w-40 flex-col rounded-[20px] bg-surface-200 p-2 shadow-md md:top-16">
          {/* <div className="mb-6">
            <label className="flex items-center gap-[16px]">
              <input
                type="checkbox"
                name="orderStatus"
                className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
              />
              <span className="body-lg text-neutral900">Order Status</span>
            </label>
          </div>
          <button
            onClick={toggle}
            aria-label="apply filter"
            className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
          >
            <span className="body-lg text-white">Apply Filter</span>
          </button> */}
          TODO:
        </div>
      )}
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
