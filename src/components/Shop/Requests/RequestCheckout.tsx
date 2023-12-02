/* eslint-disable @next/next/no-img-element */
import {
  SelectCountry,
  SelectCountryPhoneCode,
} from "~/components/Forms/AccountForm";
import { SelectCity, SelectState } from "~/components/Forms/AddressForm";
import TextInput from "~/components/Forms/Inputs/TextInput";
import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { EmailInput } from "~/pages/login";
import AccordionButton from "../../Forms/AccordionButton";
import {
  BackButton,
  ProceedButton,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "../../Forms/RequestOrderForm";
import { LabelId } from "../Orders/OrderItem";
import { HighlightedInfo, Item } from "./RequestDetails";

type stepsContentType = { title: string; content: JSX.Element };

const RequestCheckout = () => {
  const { orderItems, handleRequestAction } = useShopContext();
  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package confirmation", content: <PackageConfirmation /> },
    { title: "Billing Address", content: <BillingAddressStep /> },
    { title: "Place Order", content: <PlaceOrder /> },
    { title: "Success", content: <Success /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const { step, currentStepIndex, next, isFirstStep, back } =
    useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  if (!orderItems) return;

  const handleBack = () => {
    handleRequestAction(false);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Confirm and Place your Order" />
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />
      <LabelId label="Request ID:" id="R78667" />
      {step}
      <div className="flex w-max gap-[10px]">
        {isFirstStep && <BackButton onClick={handleBack} />}
        {!isFirstStep && <BackButton onClick={back} />}
        <ProceedButton next={next} />
      </div>
    </div>
  );
};

const PackageConfirmation = () => {
  const { requestItems } = useShopContext();

  if (!requestItems) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <PackageOrigin />
      <hr className="block w-full border-dashed border-primary-900" />
      {requestItems.map((item, i) => {
        return <Item key={item.requestId} index={i} />;
      })}
    </div>
  );
};

const BillingAddressStep = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Provide your billing address" hr />
      <BillingAddress title="Your Default Address" disabledInputs />
      <BillingAddress title="Custom Billing Address" expanded />
    </div>
  );
};

type BillingAddressProps = {
  title: string;
  expanded?: boolean;
  disabledInputs?: boolean;
};

const BillingAddress = ({
  title,
  expanded = false,
  disabledInputs,
}: BillingAddressProps) => {
  const { open, toggle } = useAccordion(expanded);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[40px] py-[10px]">
        <div className="col-span-full flex items-center gap-[30px]">
          <input
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
            name="radio"
            type="radio"
            value="male"
            aria-label="Custom Billing Address"
          />
          <h4 className="title-md md:title-lg text-gray-700">{title}</h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
            <div className="col-span-full grid grid-cols-1 gap-[10px] md:grid-cols-2">
              <div className="col-span-1">
                <TextInput
                  id={"firstName"}
                  label={"First Name"}
                  disabled={disabledInputs}
                />
              </div>

              <div className="col-span-1">
                <TextInput
                  id={"lastName"}
                  label={"Last Name"}
                  disabled={disabledInputs}
                />
              </div>
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[10px] md:grid-cols-12">
              <div className="col-span-5">
                <EmailInput />
              </div>
              <div className="col-span-3">
                <SelectCountryPhoneCode
                  value=""
                  disabled={disabledInputs}
                  onChange={() => {
                    return;
                  }}
                  // value={countryCode}
                  // onChange={(e) => updateFields({ state: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <TextInput
                  id="phone-number"
                  label="Phone Number"
                  type="tel"
                  disabled={disabledInputs}
                  value=""
                  onChange={() => {
                    return;
                  }}
                  // value={phoneNumber}
                  // onChange={(e) =>
                  //   updateFields({ phoneNumber: e.target.value })
                  // }
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"street-address"}
                label={"Street Address"}
                disabled={disabledInputs}
                // value={streetAddress}
                // onChange={(e) =>
                //   updateFields({ streetAddress: e.target.value })
                // }
              />
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[10px] md:grid-cols-12">
              <div className="col-span-4">
                <SelectCountry
                  disabled={disabledInputs}
                  value=""
                  updateFields={() => {
                    return;
                  }}
                  // value={country} updateFields={updateFields}
                />
              </div>
              <div className="col-span-4">
                <SelectState
                  country=""
                  disabled={disabledInputs}
                  value=""
                  updateFields={() => {
                    return;
                  }}
                  // country={country}
                  // value={state}
                  // updateFields={updateFields}
                />
              </div>
              <div className="col-span-4">
                <SelectCity
                  country=""
                  state=""
                  disabled={disabledInputs}
                  value=""
                  updateFields={() => {
                    return;
                  }}
                  // country={country}
                  // state={state}
                  // value={city}
                  // updateFields={updateFields}
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"zipPostalCode"}
                label={"Zip Postal Code"}
                disabled={disabledInputs}
              />
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const PlaceOrder = () => {
  return <>Place Order</>;
};

const Success = () => {
  return <>Success</>;
};

const PackageOrigin = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Confirm that the items below are the items in your package" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Package Origin
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <>
              <HighlightedInfo
                text="Your Items will be delivered here after we help you purchase your them
        and they will be shipped from here to our pickup office in Nigeria"
              />
              <div className="label-lg title-lg flex items-center gap-[20px] text-neutral-900">
                <span className="body-md">Country of Purchase:</span>
                <span className="title-lg text-neutral-900">
                  United States (Houston - warehouse)
                </span>
              </div>
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

type StepIndexProps = { currentIndex: number; length: number; title: string };

const StepIndex = ({ currentIndex, length, title }: StepIndexProps) => {
  return (
    <div className="flex gap-[39px]">
      {Array(length)
        .fill(null)
        .map((_, i) => {
          if (currentIndex + 1 === length && i === currentIndex) {
            return (
              <div
                key={`checkout-step-${i}`}
                className="flex items-center gap-[10px]"
              >
                <img
                  src="/images/tick_circle_bold_icon.svg"
                  alt="tick circle bold icon.svg"
                  className="title-lg h-full rounded-[20px] bg-primary-900 px-[10px] py-[12px] text-white"
                />
                <span className="headline-md">{title}</span>
              </div>
            );
          }
          if (i + 1 === length) {
            return (
              <div
                key={`checkout-step-${i}`}
                className="flex items-center gap-[10px] rounded-[20px] bg-gray-500 px-[10px] py-[12px]"
              >
                <img
                  src="/images/tick_circle_bold_icon.svg"
                  alt="tick circle bold icon.svg"
                />
              </div>
            );
          }

          if (i === currentIndex) {
            return (
              <div
                key={`checkout-step-${i}`}
                className="flex items-center gap-[10px]"
              >
                <span className="title-lg rounded-[20px] bg-primary-900 p-[10px] text-white">
                  {currentIndex + 1}
                </span>
                <span className="headline-md">{title}</span>
              </div>
            );
          }

          if (i !== currentIndex) {
            return (
              <div
                key={`checkout-step-${i}`}
                className="flex items-center gap-[10px]"
              >
                <span className="title-lg rounded-[20px] bg-gray-500 p-[10px] text-white">
                  {i + 1}
                </span>
              </div>
            );
          }
        })}
    </div>
  );
};

export default RequestCheckout;
