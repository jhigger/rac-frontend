import { Country } from "country-state-city";
import { type UseFormRegister } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import { type RegisterInputs } from "~/pages/register";
import SelectInput from "./SelectInput";

type SelectCountryPhoneCodeProps = {
  register:
    | UseFormRegister<RegisterInputs>
    | UseFormRegister<Partial<RegisterInputs>>;
};

const SelectCountryPhoneCodeInput = ({
  register,
}: SelectCountryPhoneCodeProps) => {
  const { isRegistering } = useAuthContext();

  return (
    <SelectInput
      id="countryCode"
      label="Country Code"
      {...register("countryCode", { disabled: isRegistering })}
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

export default SelectCountryPhoneCodeInput;
