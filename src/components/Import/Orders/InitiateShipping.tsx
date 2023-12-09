/* eslint-disable @next/next/no-img-element */
import { ArrowRight3, ExportCircle, Wallet } from "iconsax-react";
import AccordionButton from "~/components/Forms/AccordionButton";
import { LabelId } from "~/components/Shop/Orders";
import {
  DestinationShippingAddress,
  DetailSection,
  InitiateShippingButton,
  ShippingImportantNotice,
  ShippingMethod,
  Summary,
  type OrderItemProps,
  type ShipmentCostsSummaryProps,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  CongratulationImage,
  OrderTrackingId,
} from "~/components/Shop/Orders/OrdersPanel";
import {
  CustomBillingAddress,
  DefaultBillingAddress,
  NextButton,
  StepIndex,
  SubSectionTitle,
  SuccessImportantNotice,
  type PackageTableHeadProps,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import { PackageOrigin } from "~/components/Shop/Requests/RequestDetails";
import {
  BackButton,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";

const InitiateShipping = () => {
  const { handleActiveAction, handleTabChange } = useTabContext();

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

  const handleBack = () => {
    handleActiveAction(null);
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
        <div className="w-full md:w-max">
          <LabelId label="Request ID" id="R78667" />
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
          <div className="flex w-full items-center gap-[10px] rounded-[20px] border-[1px] border-gray-200 p-[10px]">
            <input
              type="checkbox"
              name="checked-demo"
              className="h-[24px] w-[24px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
              checked={undefined}
              onChange={() => {
                return;
              }}
            />
            <span className="body-md md:body-lg text-neutral-900">
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

          <span className="body-md text-center md:text-start">
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

const PackageConfirmation = () => {
  const { orderItems } = useImportContext();

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

const OrderItem = ({ index }: OrderItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg font-medium text-gray-700">
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
    <div className="grid w-fit grid-cols-4 gap-[15px]">
      <DetailSection
        label="Item Name"
        value="Designer Bags"
        colSpanMobile="full"
        colSpanDesktop={2}
      />
      <DetailSection
        label="Item Original Cost"
        value="$45.00"
        colSpanMobile="full"
        colSpanDesktop={1}
      />
      <DetailSection
        label="Quantity"
        value="4"
        colSpanMobile="full"
        colSpanDesktop={1}
      />
      <DetailSection
        label="Weight"
        value="67kg"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Height"
        value="5 inches"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Length"
        value="5 inches"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Width"
        value="5 inches"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Product/Item Picture"
        value="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
        image
      />
      <DetailSection
        label="Product Description"
        value="Additonvnv ghss jgsjvsn"
      />
      <DetailSection label="Color" value="Blue" />
      <DetailSection label="Stripes" value="5 inches" />
    </div>
  );
};

export const BillingAddressStep = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your shipping address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <ShippingImportantNotice />
          <DestinationShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Confirm your Billing Information" />
        <DefaultBillingAddress />
        <CustomBillingAddress />
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
        <SubSectionTitle title="Select Shipping Method" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Shipment costs" />
      <ShipmentCostsSummary />
    </div>
  );
};

const ShipmentCostsSummary = ({
  payButton = false,
}: ShipmentCostsSummaryProps) => {
  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary />
      <div className="flex flex-col justify-center gap-[20px] p-[20px]">
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-error-600" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              The total you are paying now includes only the Shipping fees and
              is to be paid upon clearing/arrival of your package
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-primary-900" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              Prices and subtotals are displayed including taxes
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-primary-900" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              Discounts are calculated based on prices and subtotals taken
              without considering taxes
            </span>
          </div>
        </div>
        {payButton && (
          <div className="w-full self-center md:max-w-[500px]">
            <PayNowButton />
          </div>
        )}
      </div>
    </div>
  );
};

const PayNowButton = () => {
  const { payNowAction } = useImportContext();

  if (!payNowAction) return;

  return (
    <button
      onClick={payNowAction.action}
      aria-label="Pay Now"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Wallet size={18} variant="Bold" />
      <span className="body-lg text-white">Pay Now</span>
    </button>
  );
};

export const PackageTable = () => {
  const th = [
    "Item",
    "Value Per Item",
    "Quantity of items",
    "Total value of item",
  ];

  return (
    <div className="overflow-x-auto ">
      <table className="relative w-max table-auto text-left">
        <PackageTableHead th={th} />
        <PackageTableBody />
        <Totals />
      </table>
    </div>
  );
};

const PackageTableHead = ({ th }: PackageTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid grid-cols-4 gap-[20px] rounded-t-[20px] border border-b-0 border-gray-200 bg-neutral-50 p-[30px] font-medium text-secondary-900">
      {th.map((title) => {
        return (
          <tr key={title} className="col-span-1">
            <th className="max-w-[150px] border-0 p-0">
              <span className="label-lg">{title}</span>
            </th>
          </tr>
        );
      })}
    </thead>
  );
};

const Totals = () => {
  return (
    <tfoot className="grid  grid-cols-3 gap-y-[20px] rounded-b-[20px] border border-t-0 border-gray-200 bg-neutral-50 px-[30px] py-[10px] [&>tr>td]:border-0 [&>tr>td]:p-0">
      <tr className="col-span-1 flex flex-col gap-[5px]">
        <td className="body-md h-[40px] w-[100px] text-gray-700">
          Total number of items:
        </td>
        <td className="title-lg text-neutral-900">6</td>
      </tr>
      <tr className="col-span-1 flex h-[40px] w-[100px] flex-col gap-[5px]">
        <td className="body-md text-gray-700">Total Gross weight:</td>
        <td className="title-lg text-neutral-900">30lbs</td>
      </tr>
      <tr className="col-span-1 flex h-[40px] w-[100px] flex-col gap-[5px]">
        <td className="body-md text-gray-700">Total Declared Value:</td>
        <td className="title-lg text-neutral-900">$345.00</td>
      </tr>
    </tfoot>
  );
};

const PackageTableBody = () => {
  const limitChars = (text: string, limit: number) => {
    return `${text.slice(0, limit - 3)}...`;
  };

  const fakeData = {
    image: "https://placehold.co/500x500/cac4d0/1d192b?text=Image",
    name: "SteelSeries Rival 5 Gaming Laptop with PrismSync RGB...",
    valuePerItem: "$88.99",
    quantity: "3",
    totalValue: "$112.49",
  };

  return (
    <tbody className="flex flex-col border-x border-gray-200 bg-white px-[20px] [&>tr]:border-b-[0.5px] [&>tr]:border-gray-500">
      {Array<typeof fakeData>(2)
        .fill(fakeData)
        .map(({ image, name, valuePerItem, quantity, totalValue }, i) => {
          return (
            <tr
              key={i}
              className="label-lg grid grid-cols-4 items-center gap-[20px] font-medium [&>td]:border-0 [&>td]:px-0 [&>td]:py-[20px]"
            >
              <td className="col-span-1 flex items-center gap-[10px]">
                <div className="w-[62px] overflow-hidden rounded-[10px]">
                  <img src={image} alt="item image" />
                </div>
                <div className="max-w-[160px] text-secondary-900">
                  {limitChars(name, 80)}
                </div>
              </td>
              <td className="col-span-1">{valuePerItem}</td>
              <td className="col-span-1">{quantity}</td>
              <td className="col-span-1">{totalValue}</td>
            </tr>
          );
        })}
    </tbody>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SuccessImportantNotice />

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Track your package" />
        <SectionContentLayout>
          <div className="flex flex-col gap-[10px]">
            <span className="title-md md:title-lg font-medium text-neutral-700 md:pl-[14px] md:font-bold">
              Here are more information on how to track
            </span>
            <ul className="flex flex-col gap-[14px]">
              <li>
                <div className="flex items-center gap-[20px]">
                  <span
                    className={`title-lg rounded-[20px] bg-primary-600 p-[10px] text-white`}
                  >
                    1
                  </span>
                  <span className="body-lg md:title-lg text-neutral-900">
                    You can start tracking your package in the next 24 hrs using
                    the <b>Tracking ID</b> above or{" "}
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
                        this link
                        <ExportCircle color="#292D32" size={18} />
                      </span>
                    </a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </SectionContentLayout>
      </div>
    </div>
  );
};

export default InitiateShipping;
