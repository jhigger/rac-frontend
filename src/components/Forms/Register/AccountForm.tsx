import { Country } from "country-state-city";
import { type UseFormRegister } from "react-hook-form";
import { type RegisterInputs } from "~/pages/register";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";

type AccountFormProps = {
  register: UseFormRegister<RegisterInputs>;
};

const AccountForm = ({ register }: AccountFormProps) => {
  return (
    <>
      <FormHeader title="Create your account" />
      <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
        <SelectCountry register={register} />
        <TextInput
          id={"firstName"}
          label={"First Name"}
          {...register("firstName")}
        />
        <TextInput
          id={"lastName"}
          label={"Last Name"}
          {...register("lastName")}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          {...register("email")}
        />
        <PasswordInput
          id="password"
          label="Password"
          {...register("password")}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          {...register("confirmPassword")}
        />
        <div className="grid grid-rows-2 gap-[30px] md:grid-cols-12 md:grid-rows-1 md:gap-[10px]">
          <div className="md col-span-full md:col-span-5">
            <SelectCountryPhoneCode register={register} />
          </div>
          <div className="col-span-full md:col-span-7">
            <TextInput
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              {...register("phoneNumber")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export type RegisterType =
  | UseFormRegister<RegisterInputs>
  | UseFormRegister<Partial<RegisterInputs>>;

type SelectCountryProps = {
  register: RegisterType;
};

export const SelectCountry = ({ register }: SelectCountryProps) => {
  return (
    <SelectInput
      id="country"
      label="Country"
      {...register("country")}
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
  register: RegisterType;
};

export const SelectCountryPhoneCode = ({
  register,
}: SelectCountryPhoneCodeProps) => {
  return (
    <SelectInput
      id="countryCode"
      label="Country Code"
      {...register("countryCode")}
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
