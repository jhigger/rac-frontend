import { City, State, type IState } from "country-state-city";
import { useEffect, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type RegisterInputs } from "~/pages/register";
import FormHeader from "../FormHeader";
import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";
import {
  SelectCountry,
  SelectCountryPhoneCode,
  type RegisterType,
} from "./AccountForm";

type AddressFormProps = Omit<UseFormReturn<RegisterInputs>, "handleSubmit">;

const AddressForm = ({ register, getValues }: AddressFormProps) => {
  const [states, setStates] = useState<IState[]>();

  const handleStates = (country: string) => {
    setStates(State.getStatesOfCountry(country));
  };

  useEffect(() => {
    handleStates(getValues("country"));
  }, [getValues("country")]);

  if (!states)
    return (
      <div className="relative flex flex-col items-center justify-center">
        <svg className="circular-loader relative h-[100px] w-[100px]">
          <circle
            className="path stroke-primary-600"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="5"
            strokeMiterlimit="10"
          ></circle>
        </svg>
      </div>
    );

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
        <SelectCountry register={register} handleStates={handleStates} />
        {states && <SelectState states={states} register={register} />}
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
  states: IState[];
  register: RegisterType;
};

export const SelectState = ({ states, register }: SelectStateProps) => {
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
          {states.map(({ name, isoCode }) => {
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
