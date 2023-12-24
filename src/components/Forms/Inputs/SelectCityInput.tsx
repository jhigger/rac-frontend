import { type ICity } from "country-state-city";
import { type UseFormRegister } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import { type RegisterInputs } from "~/pages/register";
import SelectInput from "./SelectInput";

type SelectCityProps = {
  cities: ICity[];
  register:
    | UseFormRegister<RegisterInputs>
    | UseFormRegister<Partial<RegisterInputs>>;
};

const SelectCityInput = ({ cities, register }: SelectCityProps) => {
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

export default SelectCityInput;
