import { type IState } from "country-state-city";
import { type UseFormRegister } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import { type RegisterInputs } from "~/pages/register";
import SelectInput from "./SelectInput";

type SelectStateProps = {
  states: IState[];
  register:
    | UseFormRegister<RegisterInputs>
    | UseFormRegister<Partial<RegisterInputs>>;
};

const SelectStateInput = ({ states, register }: SelectStateProps) => {
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

export default SelectStateInput;
