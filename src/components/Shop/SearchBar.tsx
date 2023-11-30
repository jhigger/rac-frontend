/* eslint-disable @next/next/no-img-element */
import { useTabsContext } from "~/contexts/TabsContext";
import SearchInput from "../Forms/Inputs/SearchInput";

const SearchBar = () => {
  const { handleRequestOrder } = useTabsContext();

  const handleNewOrder = () => {
    handleRequestOrder(true);
  };

  return (
    <>
      <div className="mb-[59px] hidden gap-[20px] sm:flex">
        <div className="w-max">
          <FilterButton />
        </div>
        <div className="w-max sm:w-full md:w-max">
          <SearchInput
            id="search_input"
            label="Search for users with any related keyword"
          />
        </div>
        <div className="flex flex-grow justify-end">
          <div className="w-max">
            <RequestNewOrderButton onClick={handleNewOrder} />
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
          <div className="min-w-max">
            <FilterButton />
          </div>
          <div className="w-full">
            <RequestNewOrderButton onClick={handleNewOrder} />
          </div>
        </div>
      </div>
    </>
  );
};

const FilterButton = () => {
  return (
    <button
      aria-label="Filter"
      className="btn relative flex h-14 w-14 flex-row items-center justify-center gap-x-[12px] rounded-[20px] bg-brand p-[12px] text-sm font-medium tracking-[.00714em] text-neutral-100 sm:p-4 md:w-full"
    >
      <img src="/images/filter_icon.svg" alt="filter icon" />
      <span className="label-lg hidden text-neutral-100 [@media(min-width:1000px)]:block">
        Filter View
      </span>
      <div className="label-sm absolute right-0 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-error-600 p-1 text-[8px] text-white">
        {/* put notification count here */}
      </div>
    </button>
  );
};

type RequestNewOrderButton = { onClick: () => void };

const RequestNewOrderButton = ({ onClick }: RequestNewOrderButton) => {
  return (
    <button
      onClick={onClick}
      aria-label="Filter"
      className="btn relative flex h-14 w-full flex-row items-center justify-center gap-[9px] rounded-[20px] bg-brand px-[8px] py-[12px] text-sm font-medium tracking-[.00714em] text-neutral-100 md:gap-x-[12px] md:p-4"
    >
      <img
        src="/images/import_bold_icon.svg"
        alt="import bold icon"
        className="hidden h-6 w-6 md:block"
      />
      <img
        src="/images/export_bold_icon.svg"
        alt="export bold icon"
        className="block h-6 w-6 md:hidden"
      />
      <span className="label-lg text-neutral-100">Request new order</span>
    </button>
  );
};

export default SearchBar;
