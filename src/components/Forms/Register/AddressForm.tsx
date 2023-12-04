import { City, State } from "country-state-city";
import { type UseFormGetValues, type UseFormRegister } from "react-hook-form";
import { type RegisterInputs } from "~/pages/register";
import {
  SelectCountry,
  SelectCountryPhoneCode,
  type RegisterType,
} from "./AccountForm";
import FormHeader from "../FormHeader";
import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";

type AddressFormProps = {
  register: UseFormRegister<RegisterInputs>;
  getValues: UseFormGetValues<RegisterInputs>;
};

const AddressForm = ({ register, getValues }: AddressFormProps) => {
  return (
    <>
      <FormHeader
        title="Just one more step"
        body={
          <>
            <span className="font-medium">{`Dear ${getValues(
              "firstName",
            )}, `}</span>
            Provide us your contact address
          </>
        }
      />
      <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
        <SelectCountry register={register} />
        <SelectState country={getValues("country")} register={register} />
        <SelectCity
          country={getValues("country")}
          state={getValues("state")}
          register={register}
        />
        <TextInput
          id={"streetAddress"}
          label={"Street Address"}
          {...register("streetAddress")}
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
        <TextInput
          id={"zipPostalCode"}
          label={"Zip/Postal Code"}
          {...register("zipPostalCode")}
        />
      </div>
    </>
  );
};

type SelectStateProps = {
  country: string;
  register: RegisterType;
};

export const SelectState = ({ country, register }: SelectStateProps) => {
  return (
    <SelectInput
      id="state"
      label="State"
      {...register("state")}
      options={
        <>
          <option value="" disabled hidden>
            Enter your state
          </option>
          {State.getStatesOfCountry(country).map(({ name, isoCode }) => {
            return (
              <option key={`state-${name}`} value={isoCode}>
                {name}
              </option>
            );
          })}
        </>
      }
    />
  );
};

type SelectCityProps = {
  state: string;
  country: string;
  register: RegisterType;
};

export const SelectCity = ({ country, state, register }: SelectCityProps) => {
  return (
    <SelectInput
      id="city"
      label="City"
      {...register("city")}
      options={
        <>
          <option value="" disabled hidden>
            Enter your city
          </option>
          {City.getCitiesOfState(country, state).map(({ name }) => {
            return (
              <option key={`city-${name}`} value={name}>
                {name}
              </option>
            );
          })}
        </>
      }
    />
  );
};

export default AddressForm;
