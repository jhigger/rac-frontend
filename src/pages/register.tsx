import { Country } from "country-state-city";
import Image from "next/image";
import { EmailInput, PasswordInput } from "./login";
import Link from "next/link";
import NeedHelpFAB from "~/components/NeedHelpFAB";

const register = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Image
          src="/images/brand_logo.svg"
          width={240}
          height={76}
          alt="Logo"
        />

        <form className="mb-[30px] mt-[100px] flex w-full max-w-[658px] flex-col items-center justify-center gap-[54px] rounded-[20px] bg-white p-[50px]">
          <h1 className="title-lg uppercase text-gray-500">
            Create your account
          </h1>
          <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
            <SelectCountry />
            <TextInput id={"first-name"} label={"First Name"} />
            <TextInput id={"last-name"} label={"Last Name"} />
            <EmailInput />
            <PasswordInput />
            <div className="grid grid-rows-2 gap-[30px] md:grid-cols-3 md:gap-[10px]">
              <div className="md col-span-full md:col-span-1">
                <SelectCountryPhoneCode />
              </div>
              <div className="col-span-full md:col-span-2">
                <PhoneNumberInput />
              </div>
            </div>
          </div>
          <ProceedButton />
        </form>

        <div className="text-white">
          <span className="label-lg">Already have an account?</span>
          <Link
            href="/login"
            className="label-lg px-[12px] py-[10px] text-primary-200 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
      <NeedHelpFAB />
    </main>
  );
};

const SelectCountry = () => {
  return (
    <div className="relative z-0">
      <select
        name="country"
        id="country"
        className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
      >
        <option value="" disabled selected hidden>
          Enter your country
        </option>
        {Country.getAllCountries().map(({ name, isoCode }) => {
          return (
            <option key={name} value={isoCode}>
              {name}
            </option>
          );
        })}
      </select>
      <label
        htmlFor="country"
        className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:px-1 peer-focus:text-primary-600"
      >
        Country
      </label>
    </div>
  );
};

type TextInputProps = {
  id: string;
  label: string;
};

const TextInput = ({ id, label }: TextInputProps) => {
  return (
    <div className="relative flex flex-col">
      <input
        type="text"
        aria-label={label}
        name={id}
        id={id}
        className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
        placeholder=""
      />

      <label
        htmlFor={id}
        className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:px-1 peer-focus:text-primary-600"
      >
        {label}
      </label>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

const SelectCountryPhoneCode = () => {
  return (
    <div className="relative z-0">
      <select
        name="country-code"
        id="country-code"
        className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
      >
        <option value="" disabled selected hidden>
          Country code
        </option>
        {Country.getAllCountries().map(({ name, phonecode }) => {
          return (
            <option key={phonecode} value={phonecode}>
              {`${name} ${
                phonecode.startsWith("+") ? phonecode : "+" + phonecode
              }`}
            </option>
          );
        })}
      </select>
      <label
        htmlFor="country-code"
        className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:px-1 peer-focus:text-primary-600"
      >
        Country Code
      </label>
    </div>
  );
};

const PhoneNumberInput = () => {
  return (
    <div className="relative flex flex-col">
      <input
        type="tel"
        aria-label="Phone Number"
        name="phone-number"
        id="phone-number"
        className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
        placeholder=""
      />

      <label
        htmlFor="phone-number"
        className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:px-1 peer-focus:text-primary-600"
      >
        Phone Number
      </label>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

const ProceedButton = () => {
  return (
    <button className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md">
      Proceed
    </button>
  );
};

export default register;
