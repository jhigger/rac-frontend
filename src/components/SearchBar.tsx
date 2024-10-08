import { Menu } from "@headlessui/react";
import { FtxToken } from "iconsax-react";
import { navItems, useNavContext } from "~/contexts/NavigationContext";
import { useTabContext } from "~/contexts/TabContext";
import DebounceSearchInput from "./Forms/Inputs/DebounceSearchInput";
import TextInput from "./Forms/Inputs/TextInput";

type SearchBarProps = {
  id: string; // search input label cannot be clickable if id is not unique to page
  filterCategories: FilterCategoriesType[];
  rowCount: number;
  searchValue: string;
  setSearchState: (value: string) => void;
};

const SearchBar = ({
  id,
  filterCategories,
  rowCount,
  searchValue,
  setSearchState,
}: SearchBarProps) => {
  return (
    <>
      <div className="hidden gap-[20px] sm:flex">
        <div className="w-max">
          <FilterButtonDropdown
            filterCategories={filterCategories}
            rowCount={rowCount}
          />
        </div>
        <div className="flex-grow">
          <div className="overflow-x-clip lg:w-max">
            <DebounceSearchInput
              id={`${id}-desktopSearch`}
              label="Search for users with any related keyword"
              initialValue={searchValue}
              onChange={setSearchState}
            />
          </div>
        </div>
        <div className="w-max">
          <RequestNewOrderButton />
        </div>
      </div>
      {/* for mobile version */}
      <div className="flex flex-col items-center gap-[9px] sm:hidden">
        <div className="w-full">
          <DebounceSearchInput
            id={`${id}-mobileSearch`}
            label="Search"
            initialValue={searchValue}
            onChange={setSearchState}
          />
        </div>
        <div className="flex w-full justify-between gap-[20px]">
          <FilterButtonDropdown
            filterCategories={filterCategories}
            rowCount={rowCount}
          />
          <div className="w-full">
            <RequestNewOrderButton />
          </div>
        </div>
      </div>
    </>
  );
};

export type FilterCategoriesType = {
  category: string;
  categoryFilters: {
    label: string | JSX.Element;
  }[];
};

type FilterButtonProps = {
  filterCategories: FilterCategoriesType[];
  rowCount: number;
};

const FilterButtonDropdown = ({
  filterCategories,
  rowCount,
}: FilterButtonProps) => {
  const handleApply = () => {
    console.log("filter applied");
  };

  const handleCancel = () => {
    console.log("filter cancelled");
  };

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button
          aria-label="Filter"
          className="btn relative rounded-[20px] bg-brand text-sm font-medium tracking-[.00714em] text-neutral-100"
        >
          {({ open }) => (
            <div
              className={`flex h-14 w-14 flex-row items-center justify-center gap-x-[12px] rounded-[20px] p-[12px] ${
                open ? "shadow-2xl" : ""
              } sm:p-4 md:w-full`}
            >
              <FtxToken
                variant="Bold"
                className="w-[18px] flex-shrink-0 md:w-6"
              />
              <span className="label-lg hidden text-neutral-100 [@media(min-width:1000px)]:block">
                Filter View
              </span>
              <div className="label-sm absolute right-0 top-0 z-40 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-error-600 p-1 text-[8px] text-white">
                {/* put notification count here */}
              </div>
            </div>
          )}
        </Menu.Button>
      </div>

      <Menu.Items className="absolute left-0 top-2 z-50 flex max-h-[calc(100vh-314px)] w-max origin-top-left flex-col gap-[24px] overflow-y-auto rounded-[20px] bg-surface-200 p-[20px] shadow-md md:top-16 md:max-h-[calc(100vh-274px)]">
        <div className="flex flex-col gap-[10px]">
          <span className="title-md font-medium text-neutral-900">
            Show Orders that fall under the following category
          </span>
          <hr className="-mx-[10px] bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {filterCategories.map((filter) => {
            return <Filters key={filter.category} filterCategory={filter} />;
          })}
        </div>
        <ProcessedDate />
        <div className="flex flex-col items-center gap-[20px] md:flex-row">
          <span className="label-lg whitespace-nowrap text-primary-600">
            Showing {rowCount} results
          </span>

          <Menu.Item>
            {({ close }) => (
              <ApplyFilterButton
                onClick={() => {
                  handleApply();
                  close();
                }}
              />
            )}
          </Menu.Item>
          <Menu.Item>
            {({ close }) => (
              <CancelButton
                onClick={() => {
                  handleCancel();
                  close();
                }}
              />
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

type ApplyFilterButtonProps = { onClick: () => void };

const ApplyFilterButton = ({ onClick }: ApplyFilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="apply filter"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <span className="label-lg text-white">Apply Filter</span>
    </button>
  );
};

type CancelButtonProps = { onClick: () => void };

const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Cancel"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-neutral-50 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <span className="label-lg text-primary-600">Cancel</span>
    </button>
  );
};

type FiltersProps = {
  filterCategory: FilterCategoriesType;
};

const Filters = ({ filterCategory }: FiltersProps) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <label className="flex items-center gap-[20px]">
        <input
          readOnly
          checked
          type="checkbox"
          name="orderStatus"
          className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
        />
        <span className="body-lg text-neutral-900">
          {filterCategory.category}
        </span>
      </label>

      <div className="ml-[40px] flex flex-col gap-[20px]">
        {filterCategory.categoryFilters.map(({ label }, i) => {
          return (
            <label key={i} className="flex items-center gap-[20px]">
              <input
                type="checkbox"
                name="orderStatus"
                className="h-[14px] w-[14px] rounded-[2px] accent-primary-600 before:!h-8 before:!w-8 before:!-translate-x-[.55rem] before:!-translate-y-[.55rem] hover:accent-primary-600"
              />
              <div className="body-sm text-neutral-900">{label}</div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// type ProcessedDateProps = {};

const ProcessedDate = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <label className="flex items-center gap-[20px]">
        <input
          readOnly
          checked
          type="checkbox"
          name="orderStatus"
          className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
        />
        <span className="body-lg text-neutral-900">Processed date</span>
      </label>

      <div className="ml-[40px] flex flex-col justify-center gap-[20px] md:flex-row md:items-center">
        <TextInput
          id="fromDate"
          label="Select from date"
          type="date"
          bg="bg-neutral-50"
        />
        <span className="label-lg  text-gray-500">to</span>
        <TextInput
          id="toDate"
          label="Select to date"
          type="date"
          bg="bg-neutral-50"
        />
      </div>
    </div>
  );
};

const RequestNewOrderButton = () => {
  const { activeNav } = useNavContext();
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
      <span className="[&>*]:text-white">
        {navItems.find((navItem) => activeNav === navItem.title)?.src}
      </span>
      <span className="label-lg text-neutral-100">Request new order</span>
    </button>
  );
};

export default SearchBar;
