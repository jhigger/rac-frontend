import { useFormContext, type FieldError } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import useStatesCities from "~/hooks/useStatesCities";
import { type RegisterInputs } from "~/pages/register";
import { capitalizeWords } from "~/utils";
import FormHeader from "../FormHeader";
import SelectCityInput from "../Inputs/SelectCityInput";
import SelectCountryInput from "../Inputs/SelectCountryInput";
import SelectCountryPhoneCodeInput from "../Inputs/SelectCountryPhoneCodeInput";
import SelectStateInput from "../Inputs/SelectStateInput";
import TextInput from "../Inputs/TextInput";

const AddressForm = () => {
  const { isRegistering } = useAuthContext();
  const {
    formState: { errors },
    register,
    getValues,
    watch,
  } = useFormContext<RegisterInputs>();
  const { cities, states } = useStatesCities({ watch });

  const phoneNumberError = errors.phoneNumber as
    | (FieldError & { message: string })
    | undefined;

  return (
    <>
      <FormHeader
        title="Just one more step"
        subTitle={
          <>
            <span className="font-medium">{`Dear ${capitalizeWords(
              getValues("firstName"),
            )}, `}</span>
            Provide us your contact address
          </>
        }
      />
      <div className="flex w-full flex-col gap-[30px]">
        <SelectCountryInput disabled={isRegistering} {...register("country")} />
        {watch("country") && (
          <SelectStateInput
            states={states}
            disabled={isRegistering}
            {...register("state")}
          />
        )}
        {watch("state") && (
          <SelectCityInput
            cities={cities}
            disabled={isRegistering}
            {...register("city")}
          />
        )}
        <TextInput
          id={"streetAddress"}
          label={"Street Address"}
          disabled={isRegistering}
          {...register("address")}
        />
        <div className="grid grid-rows-2 gap-[30px] md:grid-cols-12 md:grid-rows-1 md:gap-[10px]">
          <div className="md col-span-full md:col-span-5">
            <SelectCountryPhoneCodeInput {...register("countryCode")} />
          </div>
          <div className="col-span-full md:col-span-7">
            <TextInput
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              disabled={isRegistering}
              {...register("phoneNumber")}
              errorMessage={phoneNumberError?.message}
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

export default AddressForm;
