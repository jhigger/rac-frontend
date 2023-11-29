import { City, State } from "country-state-city";
import { type FormData } from "~/pages/register";
import FormHeader from "./FormHeader";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { SelectCountry, SelectCountryPhoneCode } from "./AccountForm";

type AddressFormProps = FormData & {
  updateFields: (update: Partial<FormData>) => void;
};

const AddressForm = ({
  firstName,
  country,
  state,
  city,
  streetAddress,
  countryCode,
  phoneNumber,
  zipPostalCode,
  updateFields,
}: AddressFormProps) => {
  return (
    <>
      <FormHeader
        title="Just one more step"
        body={
          <>
            <span className="font-medium">{`Dear ${firstName}, `}</span>
            Provide us your contact address
          </>
        }
      />
      <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
        <SelectCountry value={country} updateFields={updateFields} />
        <SelectState
          country={country}
          value={state}
          updateFields={updateFields}
        />
        <SelectCity
          country={country}
          state={state}
          value={city}
          updateFields={updateFields}
        />
        <TextInput
          id={"street-address"}
          label={"Street Address"}
          value={streetAddress}
          onChange={(e) => updateFields({ streetAddress: e.target.value })}
        />
        <div className="grid grid-rows-2 gap-[30px] md:grid-cols-12 md:grid-rows-1 md:gap-[10px]">
          <div className="md col-span-full md:col-span-5">
            <SelectCountryPhoneCode
              value={countryCode}
              onChange={(e) => updateFields({ state: e.target.value })}
            />
          </div>
          <div className="col-span-full md:col-span-7">
            <TextInput
              id="phone-number"
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => updateFields({ phoneNumber: e.target.value })}
            />
          </div>
        </div>
        <TextInput
          id={"zip-postal-code"}
          label={"Zip/Postal Code"}
          value={zipPostalCode}
          onChange={(e) => updateFields({ zipPostalCode: e.target.value })}
        />
      </div>
    </>
  );
};

type SelectStateProps = {
  country: string;
  value: string;
  updateFields: (update: Partial<FormData>) => void;
};

const SelectState = ({ country, value, updateFields }: SelectStateProps) => {
  return (
    <SelectInput
      id="state"
      label="State"
      value={value}
      onChange={(e) => updateFields({ state: e.target.value })}
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
  country: string;
  state: string;
  value: string;
  updateFields: (update: Partial<FormData>) => void;
};

const SelectCity = ({
  country,
  state,
  value,
  updateFields,
}: SelectCityProps) => {
  return (
    <SelectInput
      id="city"
      label="City"
      value={value}
      onChange={(e) => updateFields({ city: e.target.value })}
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
