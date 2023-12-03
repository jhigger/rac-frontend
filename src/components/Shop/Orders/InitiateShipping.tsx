/* eslint-disable @next/next/no-img-element */
import AccordionButton from "~/components/Forms/AccordionButton";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import {
  BackButton,
  ChangeCurrencyButton,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "~/components/Forms/RequestOrderForm";
import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  Cost,
  ImportantNotice,
  NextButton,
  PackageTable,
  PayNowButton,
  StepIndex,
  SubSectionTitle,
  type stepsContentType,
} from "../Requests/RequestCheckout";
import { CongratulationImage, OrderTrackingId } from "./OrdersPanel";

const InitiateShipping = () => {
  const { orderItems, handleRequestAction, handleTabChange } = useShopContext();
  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Address",
      content: <BillingAddressStep />,
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
      {!isLastStep && (
        <CongratulationImage text="Your Package have arrived its Origin warehouse. Proceed to initiate shipping" />
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
        <CongratulationImage text="You have just successfully iInitiated shipment of your items" />
      )}
      {step}
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
        {currentStepIndex === 0 && <NextButton text="Proceed" next={next} />}
        {currentStepIndex === 1 && <NextButton text="Confirm" next={next} />}
      </div>
      {currentStepIndex === 2 && (
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex w-full items-center rounded-[20px] border-[1px] border-gray-200">
            <input
              type="checkbox"
              name="checked-demo"
              className="m-[10px] h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
              checked
              onChange={() => {
                return;
              }}
            />
            <span className="body-lg text-neutral-900">
              I agree to pay for the shipment cost upon arrival/clearing for my
              package
            </span>
          </div>

          <div className="flex flex-col gap-[10px] md:flex-row">
            <div className="w-full md:max-w-[141px]">
              <BackButton onClick={back} />
            </div>
            <div className="w-full md:max-w-[249px]">
              <InitiateShippingButton onClick={next} />
            </div>
          </div>

          <span className="body-md">
            Upon clicking &quot;initiate shipping&quot;, I confirm I have read
            and agreed to{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600"
            >
              all terms and policies
            </a>
          </span>
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

type InitiateShippingButtonProps = { onClick: () => void };

const InitiateShippingButton = ({ onClick }: InitiateShippingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="btn relative flex h-full w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/ship_bold_icon.svg"
        alt="ship bold icon"
      />
      <span className="label-lg text-white">Initiate Shipping</span>
    </button>
  );
};

export const PackageConfirmation = () => {
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
      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
        <span className="body-md max-w-[100px]">Store:</span>
        <span className="title-lg text-neutral-900">Amazon</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
        <span className="body-md max-w-[100px]">Urgent Purchase:</span>
        <span className="title-lg text-neutral-900">No</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-full">
        <span className="body-md max-w-[100px]">Item URL:</span>
        <span className="title-lg text-neutral-900">
          htttp/jjnkkukja.jhgyjayjdjjhcjc
        </span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-2">
        <span className="body-md max-w-[100px]">Item Name:</span>
        <span className="title-lg text-neutral-900">Designer Bags</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
        <span className="body-md max-w-[100px]">Item Cost from Store:</span>
        <span className="title-lg text-neutral-900">$45.00</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
        <span className="body-md max-w-[100px]">Quantity:</span>
        <span className="title-lg text-neutral-900">4</span>
      </div>

      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700 md:col-span-1">
        <span className="body-md max-w-[100px]">Weight:</span>
        <span className="title-lg text-neutral-900">67kg</span>
      </div>

      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700 md:col-span-1">
        <span className="body-md max-w-[100px]">Height:</span>
        <span className="title-lg text-neutral-900">5 inches</span>
      </div>

      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700 md:col-span-1">
        <span className="body-md max-w-[100px]">Length:</span>
        <span className="title-lg text-neutral-900">5 inches</span>
      </div>

      <div className="col-span-2 flex flex-col gap-[20px] text-gray-700 md:col-span-1">
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

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
        <span className="body-md max-w-[100px]">Color:</span>
        <span className="title-lg text-neutral-900">Blue</span>
      </div>

      <div className="col-span-full flex flex-col gap-[20px] text-gray-700 md:col-span-1">
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

const BillingAddressStep = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your billing address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <ShippingImportantNotice />
          <DestinationShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Confirm your Billing Information" />
        <BillingAddress />
      </div>
    </div>
  );
};

export const BillingAddress = () => {
  const { open, toggle } = useAccordion(true);

  return (
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
              <span className="body-md max-w-[100px]">Zip/postal Code:</span>
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

const ShippingImportantNotice = () => {
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
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable />
      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Select the Payment Method You Wish to Use" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Shipment costs" />
      <ShipmentCostsSummary />
    </div>
  );
};

type ShipmentCostsSummaryProps = { payButton?: boolean };

export const ShipmentCostsSummary = ({
  payButton = false,
}: ShipmentCostsSummaryProps) => {
  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary />
      <div className="flex flex-col justify-center gap-[20px] p-[20px]">
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[10px]">
            <img src="/images/arrow_right_red_icon.svg" alt="arrow icon" />
            <span className="label-md font-medium text-secondary-900">
              The total you are paying now includes only the Shipping fees and
              is to be paid upon clearing/arrival of your package
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <img src="/images/arrow_right_purple_icon.svg" alt="arrow icon" />
            <span className="label-md font-medium text-secondary-900">
              Prices and subtotals are displayed including taxes
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <img src="/images/arrow_right_purple_icon.svg" alt="arrow icon" />
            <span className="label-md font-medium text-secondary-900">
              Discounts are calculated based on prices and subtotals taken
              without considering taxes
            </span>
          </div>
        </div>
        {payButton && (
          <div className="w-[500px] self-center">
            <PayNowButton />
          </div>
        )}
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-primary-900 px-[28px] py-[20px] text-white">
      <span className="title-lg">Shipping Costs Summary</span>
      <div className="flex flex-col gap-[10px]">
        <Cost title="Shipping Cost:" value="$126.66" />
        <Cost title="Clearing, Port Handling:" value="$126.66" />
        <Cost title="Other Charges:" value="$126.66" />
        <Cost title="Storage Charge:" value="$126.66" />
        <Cost title="Insurance:" value="$126.66" />
        <Cost title="VAT:" value="$126.66" />
        <Cost title="Payment Method Surcharge:" value="$126.66" />
        <Cost title="Discount:" value={`- ${"$126.66"}`} />
        <div className="mt-[10px] flex items-end justify-between">
          <div className="flex flex-col">
            <span className="label-lg">Total:</span>
            <span className="title-lg">$126.66</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <span className="body-md text-primary-100">
              Default Currency: <b>USD</b>
            </span>
            <ChangeCurrencyButton />
          </div>
        </div>
      </div>
    </div>
  );
};

type ShippingMethodProps = {
  expanded?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

export const ShippingMethod = ({
  expanded = false,
  checked,
  disabled,
  onChange = () => {
    return;
  },
}: ShippingMethodProps) => {
  const { open, toggle } = useAccordion(expanded);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px] py-[10px]">
        <div className="col-span-full flex items-center gap-[30px]">
          <input
            disabled={disabled}
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
            name="radio"
            type="radio"
            value="male"
            aria-label="Custom Billing Address"
            checked={checked}
            onChange={onChange}
          />
          <h4 className="title-md md:title-lg text-black">Basic</h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-[10px] pl-[10px]">
            <div className="label-lg grid w-max grid-cols-2 gap-[20px] font-medium text-neutral-900 ">
              <span className="col-span-1 w-[160px]">Shipping Cost:</span>
              <span className="col-span-1 w-[100px]">$126.66</span>
              <span className="col-span-1 w-[160px]">
                Clearing, Port Handling:
              </span>
              <span className="col-span-1 w-[100px]">$126.66</span>
            </div>
            <div className="body-md flex flex-col gap-[5px] text-gray-700">
              <p>
                This shipping method takes your package 5 working days to arrive
                your destination from the 1st Wednesday after your payment, You
                can call us on +234 700 700 6000 or +1 888 567 8765 or{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 underline"
                >
                  send us a dm
                </a>{" "}
                to get alternative shipping methods with different benefits.
              </p>
              <p>
                The cost paid here covers clearing, documentation and delivery
                to the destination.
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <ImportantNotice />

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Track your package" />
        <SectionContentLayout>
          <div className="flex flex-col gap-[10px]">
            <h3 className="title-lg font-bold text-neutral-900">
              Here are more information on how to track
            </h3>
            <ul className="flex flex-col gap-[14px]">
              <li className="flex items-center gap-[26px]">
                <span className="rounded-[20px] bg-primary-600 p-[10px] text-white">
                  1
                </span>
                <span className="title-lg text-neutral-900">
                  You can start tracking your package in the next 24 hrs using
                  the Tracking ID above or{" "}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
                      this link
                      <img
                        src="/images/export_circle_icon.svg"
                        alt="export circle icon"
                      />
                    </span>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </SectionContentLayout>
      </div>
    </div>
  );
};

export default InitiateShipping;
