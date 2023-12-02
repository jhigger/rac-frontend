/* eslint-disable @next/next/no-img-element */
import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
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
    { title: "Package confirmation", content: <CheckoutStep1 /> },
    { title: "Billing Address", content: <div>Billing Address</div> },
    { title: "Place Order", content: <div>Place Order</div> },
    { title: "Success", content: <div>Success</div> },
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

const CheckoutStep1 = () => {
  const { requestedOrders } = useShopContext();

  if (!requestedOrders) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <PackageOrigin />
      <hr className="block w-full border-dashed border-primary-900" />
      {requestedOrders.map((item, i) => {
        return <Item key={item.requestId} index={i} />;
      })}
    </div>
  );
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
