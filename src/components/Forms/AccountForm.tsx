import { Country } from "country-state-city";
import { type ChangeEvent } from "react";
import { type FormData } from "~/pages/register";
import FormHeader from "./FormHeader";
import PasswordInput from "./Inputs/PasswordInput";
import SelectInput from "./Inputs/SelectInput";
import TextInput from "./Inputs/TextInput";

type AccountFormProps = FormData & {
  updateFields: (update: Partial<FormData>) => void;
};

const AccountForm = ({
  country,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  countryCode,
  phoneNumber,
  updateFields,
}: AccountFormProps) => {
  return (
    <>
      <FormHeader title="Create your account" />
      <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
        <SelectCountry value={country} updateFields={updateFields} />
        <TextInput
          id={"first-name"}
          label={"First Name"}
          value={firstName}
          onChange={(e) => updateFields({ firstName: e.target.value })}
        />
        <TextInput
          id={"last-name"}
          label={"Last Name"}
          value={lastName}
          onChange={(e) => updateFields({ lastName: e.target.value })}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => updateFields({ confirmPassword: e.target.value })}
        />
        <div className="grid grid-rows-2 gap-[30px] md:grid-cols-12 md:grid-rows-1 md:gap-[10px]">
          <div className="md col-span-full md:col-span-5">
            <SelectCountryPhoneCode
              value={countryCode}
              onChange={(e) => updateFields({ countryCode: e.target.value })}
            />
          </div>
          <div className="col-span-full md:col-span-7">
            <TextInput
              id="phone-number"
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => updateFields({ phoneNumber: e.target.value })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

type SelectCountryProps = {
  disabled?: boolean;
  value: string;
  updateFields: (update: Partial<FormData>) => void;
};

export const SelectCountry = ({
  disabled,
  value,
  updateFields,
}: SelectCountryProps) => {
  return (
    <SelectInput
      id="country"
      label="Country"
      disabled={disabled}
      value={value}
      onChange={(e) => updateFields?.({ country: e.target.value })}
      options={
        <>
          <option value="" disabled hidden>
            Enter your country
          </option>
          {Country.getAllCountries().map(({ name, isoCode }) => {
            return (
              <option key={`country-${name}`} value={isoCode}>
                {name}
              </option>
            );
          })}
        </>
      }
    />
  );
};

type SelectCountryPhoneCodeProps = {
  disabled?: boolean;
  value: string;
  onChange: (update: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectCountryPhoneCode = ({
  disabled,
  value,
  onChange,
}: SelectCountryPhoneCodeProps) => {
  return (
    <SelectInput
      id="country-code"
      label="Country Code"
      disabled={disabled}
      value={value}
      onChange={onChange}
      options={
        <>
          <option value="" disabled hidden>
            Country code
          </option>
          {Country.getAllCountries().map(({ name, phonecode }) => {
            return (
              <option key={`country-code-${name}`} value={phonecode}>
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

export default AccountForm;
