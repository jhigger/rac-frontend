import { City, State } from "country-state-city";
import { watch } from "fs";
import { useEffect, useMemo } from "react";
import { type UseFormGetValues, type UseFormSetValue } from "react-hook-form";
import { type RegisterInputs } from "~/pages/register";

type UseStatesCitiesType = {
  getValues: UseFormGetValues<RegisterInputs>;
  setValue: UseFormSetValue<RegisterInputs>;
};

const useStatesCities = ({ getValues, setValue }: UseStatesCitiesType) => {
  const states = useMemo(
    () => State.getStatesOfCountry(getValues("country")),
    [watch("country")],
  );
  const cities = useMemo(
    () => City.getCitiesOfState(getValues("country"), getValues("state")),
    [watch("country"), watch("state")],
  );

  useEffect(() => {
    setValue("state", "");
  }, [states]);

  return { states, cities };
};

export default useStatesCities;
