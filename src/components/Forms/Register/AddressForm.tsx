import { type ICity, type IState } from "country-state-city";
import { useFormContext } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import useStatesCities from "~/hooks/useStatesCities";
import { type RegisterInputs } from "~/pages/register";
import FormHeader from "../FormHeader";
import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";
import {
  SelectCountry,
  SelectCountryPhoneCode,
  type RegisterType,
} from "./AccountForm";

const AddressForm = () => {
  const { isRegistering } = useAuthContext();
  const { register, getValues, setValue, watch } =
    useFormContext<RegisterInputs>();
  const { cities, states } = useStatesCities({ getValues, setValue, watch });

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
        {watch("country") && (
          <SelectState states={states} register={register} />
        )}
        {watch("state") && <SelectCity cities={cities} register={register} />}
        <TextInput
          id={"streetAddress"}
          label={"Street Address"}
          disabled={isRegistering}
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
              disabled={isRegistering}
              {...register("phoneNumber")}
            />
          </div>
        </div>
        <TextInput
          id={"zipPostalCode"}
          label={"Zip/Postal Code"}
          disabled={isRegistering}
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
  const { isRegistering } = useAuthContext();

  return (
    <SelectInput
      id="state"
      label="State"
      {...register("state", { disabled: isRegistering })}
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
  cities: ICity[];
  register: RegisterType;
};

export const SelectCity = ({ cities, register }: SelectCityProps) => {
  const { isRegistering } = useAuthContext();

  return (
    <SelectInput
      id="city"
      label="City"
      {...register("city", { disabled: isRegistering })}
      options={
        <>
          <option value="" disabled hidden>
            Enter your city
          </option>
          {cities.map(({ name }) => {
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
