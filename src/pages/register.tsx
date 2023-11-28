import { Country } from "country-state-city";
import Image from "next/image";
import Link from "next/link";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import PasswordInput from "~/components/PasswordInput";
import SelectInput from "~/components/SelectInput";
import TextInput from "~/components/TextInput";
import { EmailInput } from "./login";

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
            <PasswordInput id="password" label="Password" />
            <PasswordInput id="confirm-password" label="Confirm Password" />
            <div className="grid grid-rows-2 gap-[30px] md:grid-cols-3 md:gap-[10px]">
              <div className="md col-span-full md:col-span-1">
                <SelectCountryPhoneCode />
              </div>
              <div className="col-span-full md:col-span-2">
                <TextInput id="phone-number" label="Phone Number" type="tel" />
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
    <SelectInput
      id="country"
      label="Country"
      options={
        <>
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
        </>
      }
    />
  );
};

const SelectCountryPhoneCode = () => {
  return (
    <SelectInput
      id="country-code"
      label="Country Code"
      options={
        <>
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
        </>
      }
    />
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
