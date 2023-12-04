/* eslint-disable @next/next/no-img-element */
import { type ChangeEventHandler, type HTMLInputTypeAttribute } from "react";

type SearchInputProps = {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
const SearchInput = ({ id, label, value, onChange }: SearchInputProps) => {
  return (
    <div className="relative flex w-full">
      <div className="relative z-0 w-full">
        <div className="absolute left-4 top-4 z-10">
          <img src="/images/search_icon.svg" alt="search icon" />
        </div>

        <input
          type="search"
          aria-label={label}
          name={id}
          id={id}
          className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-transparent py-2 pl-14 pr-4 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0 lg:min-w-[410px]"
          placeholder=" "
          value={value}
          onChange={onChange}
        />

        <label
          htmlFor={id}
          className="absolute left-12 top-4 z-10 hidden w-max origin-[0] -translate-y-7 scale-75 transform whitespace-nowrap px-1 tracking-[.03125em] text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-12 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-50 peer-focus:px-1 peer-focus:text-primary-600 lg:block"
        >
          Search for users with any related keyword
        </label>
        {/* for mobile screen */}
        <label
          htmlFor={id}
          className="absolute left-12 top-4 z-10 block w-max origin-[0] -translate-y-7 scale-75 transform whitespace-nowrap px-1 tracking-[.03125em] text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-12 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-50 peer-focus:px-1 peer-focus:text-primary-600 lg:hidden"
        >
          Search
        </label>
      </div>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default SearchInput;
