import { useEffect } from "react";
import AccordionButton from "~/components/Forms/AccordionButton";
import {
  BackButton,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  AndLastly,
  NextButton,
  PackageTable,
  PaymentMethods,
  StepIndex,
  SubSectionTitle,
  type stepsContentType,
} from "../Requests/RequestCheckout";
import { HighlightedInfo } from "../Requests/RequestDetails";
import {
  DefaultBillingAddress,
  DetailSection,
  PackageConfirmation,
  ShipmentCostsSummary,
  ShippingMethod,
} from "./InitiateShipping";
import {
  CongratulationImage,
  OrderTrackingId,
  PickUpInstructions,
} from "./OrdersPanel";

const ClearPackage = () => {
  const { orderItems, handlePayNowAction } = useShopContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <BillingDetailsConfirmation />,
    },
    { title: "Initiate Shipping", content: <ClearPackageStep /> },
    { title: "Success", content: <Success /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const { step, currentStepIndex, next, isFirstStep, back, isLastStep } =
    useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  if (!orderItems) return;

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleFinish = () => {
    handleTabChange("orders");
  };

  useEffect(() => {
    handlePayNowAction({ action: next }); // todo: move to context
  }, []);

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      {!isLastStep && (
        <CongratulationImage text="Your package have arrived its destination. Proceed to clear it." />
      )}
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />

      {!isLastStep && (
        <div className="flex w-full items-center gap-[10px] rounded-[20px]">
          <OrderTrackingId />
        </div>
      )}
      {isLastStep && (
        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
          <OrderTrackingId />
        </div>
      )}

      {isLastStep && (
        <CongratulationImage text='You can now pick up your package from our office in Nigeria (your selected "Destination")' />
      )}

      {step}

      {currentStepIndex <= 1 && (
        <div className="flex w-full flex-col items-center justify-center gap-[10px] md:w-max md:flex-row">
          {isFirstStep && (
            <div className="w-full md:max-w-[210px]">
              <BackButton onClick={handleBack} />
            </div>
          )}
          {!isFirstStep && currentStepIndex <= 1 && (
            <div className="w-full md:max-w-[210px]">
              <BackButton onClick={back} />
            </div>
          )}
          <NextButton text="Proceed" next={next} />
        </div>
      )}
      {currentStepIndex === 3 && (
        <div className="w-[200px]">
          <NextButton text="Done" next={handleFinish} />
        </div>
      )}
    </div>
  );
};

const BillingDetailsConfirmation = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DestinationShippingAddress />
      <DefaultBillingAddress />
    </div>
  );
};

const DestinationShippingAddress = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg text-gray-700">
            Destination/Shipping Address
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && (
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <HighlightedInfo text="Your Items have been delivered to this RAC Logistics warehouse in Nigeria where you can pickup from when it arrives Nigeria." />
              <span className="body-md max-w-[100px] text-gray-700">
                Destination:
              </span>
              <span className="title-md md:title-lg font-medium text-neutral-900">
                Nigeria (Lagos - warehouse)
              </span>
            </div>
            <DestinationAddressDetails />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

type AddressDetail = {
  label: string;
  value: string;
  colSpan?: number | "full";
};

const AddressDetail = ({ label, value, colSpan = "full" }: AddressDetail) => (
  <div
    className={`col-span-${colSpan} flex flex-col gap-[20px] ${
      colSpan === "full" ? "md:col-span-2" : "justify-between"
    }`}
  >
    <span className="body-md max-w-[100px] text-primary-600">{label}:</span>
    <span className="title-md md:title-lg font-medium text-primary-900">
      {value}
    </span>
  </div>
);

const DestinationAddressDetails = () => {
  return (
    <>
      <div className="flex items-center">
        <span className="title-md md:title-lg text-primary-900">
          Destination address
        </span>

        <hr className="mx-[10px] flex-grow border-dashed border-primary-900" />
      </div>
      <div className="grid w-fit grid-cols-4 gap-[15px]">
        <AddressDetail label="First Name" value="Malibu" />
        <AddressDetail label="Last Name" value="SHedrack" />
        <AddressDetail
          label="Street Address"
          value="No, 1osolo way, ikeja road, behind scaint merry"
        />
        <AddressDetail label="Country" value="Nigeria" />
        <AddressDetail label="State" value="Lagos" />
        <AddressDetail label="City" value="Ikeja" />
        <AddressDetail label="Zip/postal Code" value="98765" />
      </div>
    </>
  );
};

const ClearPackageStep = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Shipping Method Used" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Payment Methods" />
      <PaymentMethods />

      <SectionHeader title="Shipment costs" />
      <ShipmentCostsSummary payButton />
    </div>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <PickUpAddress />
      <SectionHeader title="How to pick up" />
      <PickUpInstructions />
      <AndLastly />
    </div>
  );
};

const PickUpAddress = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg text-gray-700">
            Our office address to pick up your package
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>

        {open && (
          <div className="grid w-fit grid-cols-4 gap-[15px]">
            <DetailSection
              label="Pick up Address"
              value="No, 1osolo way, ikeja road, behind scaint merry"
            />
            <DetailSection label="Country" value="Nigeria" />
            <DetailSection label="State" value="Lagos" />
            <DetailSection label="City" value="Ikeja" />
            <DetailSection label="Zip/postal Code" value="98765" />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export default ClearPackage;
