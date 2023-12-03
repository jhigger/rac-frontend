/* eslint-disable @next/next/no-img-element */
import AccordionButton from "~/components/Forms/AccordionButton";
import {
  BackButton,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "~/components/Forms/RequestOrderForm";
import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  NextButton,
  StepIndex,
  type stepsContentType,
} from "../Requests/RequestCheckout";
import { CongratulationImage, OrderTrackingId } from "./OrdersPanel";
import SelectInput from "~/components/Forms/Inputs/SelectInput";

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
        return <OrderItem key={item.orderId} index={i} />;
      })}
    </div>
  );
};

type OrderItemProps = {
  index: number;
};

const OrderItem = ({ index }: OrderItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg text-gray-700">
            Item - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && <OrderItemDetails />}
      </div>
    </SectionContentLayout>
  );
};

const OrderItemDetails = () => {
  return (
    <div className="grid w-max grid-cols-4 gap-[15px]">
      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Store:</span>
        <span className="title-lg text-neutral-900">Amazon</span>
      </div>

      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Urgent Purchase:</span>
        <span className="title-lg text-neutral-900">No</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Item URL:</span>
        <span className="title-lg text-neutral-900">
          htttp/jjnkkukja.jhgyjayjdjjhcjc
        </span>
      </div>

      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Item Name:</span>
        <span className="title-lg text-neutral-900">Designer Bags</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Item Cost from Store:</span>
        <span className="title-lg text-neutral-900">$45.00</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Quantity:</span>
        <span className="title-lg text-neutral-900">4</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Weight:</span>
        <span className="title-lg text-neutral-900">67kg</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Height:</span>
        <span className="title-lg text-neutral-900">5 inches</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Length:</span>
        <span className="title-lg text-neutral-900">5 inches</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Width:</span>
        <span className="title-lg text-neutral-900">5 inches</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Product/Item Picture:</span>
        <span className="title-lg text-neutral-900">
          <img
            src="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
            alt=""
            className="w-[220px] rounded-[20px] bg-center object-cover"
          />
        </span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Product Description:</span>
        <span className="title-lg text-neutral-900">
          Additonvnv ghss jgsjvsn
        </span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Color:</span>
        <span className="title-lg text-neutral-900">Blue</span>
      </div>

      <div className="col-span-1 flex flex-col gap-[20px] text-gray-700">
        <span className="body-md max-w-[100px]">Stripes:</span>
        <span className="title-lg text-neutral-900">5 inches</span>
      </div>
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
  const { open, toggle } = useAccordion(false);

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your billing address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <ImportantNotice />
          <DestinationShippingAddress />
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Confirm your Billing Information" />
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[20px] py-[10px]">
            <div className="flex w-full items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Default Billing Address
              </h4>
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid grid-cols-4 gap-[20px]">
                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
                  <span className="body-md max-w-[100px]">First Name:</span>
                  <span className="title-lg text-neutral-900">Malibu</span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
                  <span className="body-md max-w-[100px]">Last Name:</span>
                  <span className="title-lg text-neutral-900">SHedrack</span>
                </div>
                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
                  <span className="body-md max-w-[100px]">Contact Number:</span>
                  <span className="title-lg text-neutral-900">
                    +234 803 456 7845
                  </span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
                  <span className="body-md max-w-[100px]">Email:</span>
                  <span className="title-lg text-neutral-900">
                    Malibushdrack@gmail.com
                  </span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
                  <span className="body-md max-w-[100px]">Country:</span>
                  <span className="title-lg text-neutral-900">Turkey</span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
                  <span className="body-md max-w-[100px]">State:</span>
                  <span className="title-lg text-neutral-900">Istanbul</span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
                  <span className="body-md max-w-[100px]">City:</span>
                  <span className="title-lg text-neutral-900">Cyprusic</span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
                  <span className="body-md max-w-[100px]">
                    Zip/postal Code:
                  </span>
                  <span className="title-lg text-neutral-900">98765</span>
                </div>

                <div className="col-span-full flex flex-col gap-[20px] text-gray-700">
                  <span className="body-md max-w-[100px]">Address:</span>
                  <span className="title-lg text-neutral-900">
                    No, 1osolo way, ikeja road, behind scaint merry
                  </span>
                </div>
              </div>
            )}
          </div>
        </SectionContentLayout>
      </div>
    </div>
  );
};

const DestinationShippingAddress = () => {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <SelectInput
        id={"destinationShippingAddress"}
        label={"Select destination"}
        options={
          <>
            <option value="" disabled hidden>
              Select Origin
            </option>
          </>
        }
      />
      <TooltipButton />
    </div>
  );
};

const ImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="label-lg text-primary-900">IMPORTANT NOTICE:</span>
      <div>
        <p className="title-sm ml-6 list-item text-gray-700">
          The{" "}
          <b>
            &quot;Destination/Shipping Address&quot; (which is our available
            pickup office in Nigeria)
          </b>{" "}
          you will select below is where your package will be delivered to,
          kindly select the one nearest to you.
        </p>
        <p className="title-sm ml-6 list-item text-gray-700">
          And if you want doorstep delivery, we will help you make provisions
          for that when it arrives the
          <b>
            &quot;Destination/Shipping Address&quot; (which is our office in
            Nigeria)
          </b>
          you selected, just inform us.
        </p>
      </div>
    </div>
  );
};

const InitiateShippingStep = () => {
  return <></>;
};

const Success = () => {
  return <></>;
};

export default InitiateShipping;
