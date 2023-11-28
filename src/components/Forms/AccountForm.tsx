import { Country } from "country-state-city";
import { type ChangeEvent } from "react";
import { EmailInput } from "~/pages/login";
import { type FormData } from "~/pages/register";
import FormHeader from "../FormHeader";
import PasswordInput from "../PasswordInput";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";

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
          name={"first-name"}
          label={"First Name"}
          value={firstName}
          onChange={(e) => updateFields({ firstName: e.target.value })}
        />
        <TextInput
          name={"last-name"}
          label={"Last Name"}
          value={lastName}
          onChange={(e) => updateFields({ lastName: e.target.value })}
        />
        <EmailInput
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
              name="phone-number"
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
  value: string;
  updateFields: (update: Partial<FormData>) => void;
};

export const SelectCountry = ({ value, updateFields }: SelectCountryProps) => {
  return (
    <SelectInput
      id="country"
      label="Country"
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
  value: string;
  onChange: (update: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectCountryPhoneCode = ({
  value,
  onChange,
}: SelectCountryPhoneCodeProps) => {
  return (
    <SelectInput
      id="country-code"
      label="Country Code"
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
