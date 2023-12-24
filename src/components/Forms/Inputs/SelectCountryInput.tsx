import { Country } from "country-state-city";
import { type UseFormRegister } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import { type RegisterInputs } from "~/pages/register";
import SelectInput from "./SelectInput";

type SelectCountryProps = {
  register:
    | UseFormRegister<RegisterInputs>
    | UseFormRegister<Partial<RegisterInputs>>;
};

const SelectCountryInput = ({ register }: SelectCountryProps) => {
  const { isRegistering } = useAuthContext();

  return (
    <SelectInput
      id="country"
      label="Country"
      {...register("country", { disabled: isRegistering })}
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

export default SelectCountryInput;
