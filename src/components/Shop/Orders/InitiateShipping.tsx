import AccordionButton from "~/components/Forms/AccordionButton";
import {
  BackButton,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Forms/RequestOrderForm";
import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  NextButton,
  StepIndex,
  type stepsContentType,
} from "../Requests/RequestCheckout";
import { Item } from "../Requests/RequestDetails";
import { CongratulationImage, OrderTrackingId } from "./OrdersPanel";

const InitiateShipping = () => {
  const { orderItems, handleRequestAction, handleTabChange } = useShopContext();
  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Address",
      content: <BillingAddress />,
    },
    { title: "Initiate Shipping", content: <InitiateShippingStep /> },
    { title: "Success", content: <Success /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const { step, currentStepIndex, next, isFirstStep, back, isLastStep } =
    useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  if (!orderItems) return;

  const handleBack = () => {
    handleRequestAction(false);
  };

  const handleFinish = () => {
    handleTabChange("orders");
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <CongratulationImage text="Your Package have arrived its Origin warehouse. Proceed to initiate shipping" />
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />

      <div className="flex w-full items-center gap-[10px] rounded-[20px]">
        <OrderTrackingId />
      </div>
      {step}
      <div className="flex w-full flex-col items-center justify-center gap-[10px] md:w-max md:flex-row">
        {isFirstStep && (
          <div className="w-full md:max-w-[210px]">
            <BackButton onClick={handleBack} />
          </div>
        )}
        {!isFirstStep && !isLastStep && (
          <div className="w-full md:max-w-[210px]">
            <BackButton onClick={back} />
          </div>
        )}
        {currentStepIndex === 0 && <NextButton text="Proceed" next={next} />}
        {currentStepIndex === 1 && <NextButton text="Confirm" next={next} />}
        {currentStepIndex === 3 && (
          <div className="w-[200px]">
            <NextButton text="Done" next={handleFinish} />
          </div>
        )}
      </div>
    </div>
  );
};

const PackageConfirmation = () => {
  const { orderItems } = useShopContext();

  if (!orderItems) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <PackageOrigin />
      <hr className="block w-full border-dashed border-primary-900" />
      {orderItems.map((item, i) => {
        return <Item key={item.orderId} index={i} />;
      })}
    </div>
  );
};

const PackageOrigin = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Package Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Package Origin
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <div className="flex flex-col gap-[5px]">
              <span className="body-md max-w-[100px] text-gray-700">
                Country of Purchase:
              </span>
              <span className="title-lg text-neutral-900">
                United States (Houston - warehouse)
              </span>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

const BillingAddress = () => {
  return <></>;
};

const InitiateShippingStep = () => {
  return <></>;
};

const Success = () => {
  return <></>;
};

export default InitiateShipping;
