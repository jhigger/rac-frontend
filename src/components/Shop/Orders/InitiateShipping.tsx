/* eslint-disable @next/next/no-img-element */
import { ArrowRight3, ExportCircle } from "iconsax-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { formatCurrency } from "~/Utils";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import OrderTrackingId from "~/components/OrderTrackingId";
import PackageTable from "~/components/PackageTable";
import {
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "~/components/Shop/Requests/RequestOrder";
import SuccessImportantNotice from "~/components/SuccessImportantNotice";
import { DESTINATIONS } from "~/constants";
import { type BillingDetailsType } from "~/contexts/AutoImportContext";
import { useShopContext, type ShopItemType } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { InitiateShippingButton } from "../../Buttons/InitiateShippingButton";
import {
  AndLastly,
  CostDetailSection,
  ShopPackageTableFooter,
  StepIndex,
  SubSectionTitle,
  TotalCost,
  shopPackageItemColumns,
  type stepsContentType,
} from "../Requests/RequestCheckout";
import { LabelWithTooltip, PackageOrigin } from "../Requests/RequestDetails";
import { PurpleDetailSection } from "./ClearPackage";

const InitiateShipping = () => {
  const [portal, setPortal] = useState<Element | DocumentFragment | null>(null);
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

  useEffect(() => {
    setPortal(document.getElementById("payNowButton"));
  }, [step]);

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      {!isLastStep && (
        <CongratulationImage description="Your Package have arrived its Origin warehouse. Proceed to initiate shipping" />
      )}
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />

      {!isLastStep && (
        <div className="w-full md:w-max">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>
      )}
      {isLastStep && (
        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>
      )}

      {isLastStep && (
        <CongratulationImage description="You have just successfully iInitiated shipment of your items" />
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
        {currentStepIndex === 0 && <DoneButton text="Proceed" onClick={next} />}
        {currentStepIndex === 1 && <DoneButton text="Confirm" onClick={next} />}
      </div>
      {currentStepIndex === 2 && (
        <InitiateShippingAgreement back={back} next={next} />
      )}
      {currentStepIndex === 3 && (
        <div className="w-[200px]">
          <DoneButton text="Done" onClick={handleFinish} />
        </div>
      )}
      {portal && createPortal(<PayNowButton onClick={next} />, portal)}
    </div>
  );
};

type InitiateShippingAgreement = { back: () => void; next: () => void };

export const InitiateShippingAgreement = ({
  back,
  next,
}: InitiateShippingAgreement) => {
  return (
    <div className="flex w-full flex-col gap-[10px]">
      <div className="flex w-full items-center gap-[10px] rounded-[20px] border-[1px] border-gray-200 px-[15px] py-[10px]">
        <input
          type="checkbox"
          name="checked-demo"
          className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
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
        Upon clicking &quot;initiate shipping&quot;, I confirm I have read and
        agreed to{" "}
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
  );
};

export const PackageConfirmation = () => {
  const { orderPackages } = useShopContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Package Details" />
      <PackageOrigin>
        <DetailSection
          label="Country of Purchase"
          value={orderPackage.originWarehouse}
        />
      </PackageOrigin>
      <hr className="block w-full border-dashed border-primary-900" />
      {orderPackage.items.map((item, i) => {
        return <ShopOrderItem key={i} item={item} index={i} />;
      })}
    </div>
  );
};

type ShopOrderItemProps = {
  item: ShopItemType;
  index: number;
};

export const ShopOrderItem = ({ item, index }: ShopOrderItemProps) => {
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
        {open && (
          <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-10">
            <ShopOrderItemDetails item={item} />
            <ShopOrderItemRelatedCosts relatedCosts={item.relatedCosts} />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

type ShopOrderItemRelatedCostsProps = {
  relatedCosts: ShopItemType["relatedCosts"];
};

const ShopOrderItemRelatedCosts = ({
  relatedCosts,
}: ShopOrderItemRelatedCostsProps) => {
  return (
    <>
      <div className="col-span-full">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center">
            <span className="title-md md:title-lg text-primary-900">
              Item Related Costs
            </span>

            <hr className="mx-[10px] flex-grow border-dashed border-primary-900" />
          </div>
        </div>
      </div>

      <PurpleDetailSection
        label="Urgent purchase fee"
        value={formatCurrency(relatedCosts.urgentPurchaseFee)}
        colSpanDesktop={4}
      />

      <PurpleDetailSection
        label="Processing Fee"
        value={formatCurrency(relatedCosts.processingFee)}
        colSpanDesktop={4}
      />

      <PurpleDetailSection
        label="Shipping to Origin Warehouse Cost"
        value={formatCurrency(relatedCosts.shippingToOriginWarehouseCost)}
        colSpanDesktop={4}
      />

      <PurpleDetailSection
        label="Shop For Me Cost"
        value={formatCurrency(relatedCosts.shopForMeCost)}
        colSpanDesktop={4}
      />
    </>
  );
};

export type DetailSectionProps = {
  label: string;
  value: string | number | JSX.Element;
  colSpanMobile?: "full" | number;
  colSpanDesktop?: "full" | number;
  image?: boolean;
  tooltip?: ReactNode;
};

export const DetailSection = ({
  label,
  value,
  colSpanMobile = "full",
  colSpanDesktop = "full",
  image,
  tooltip,
}: DetailSectionProps) => (
  <div
    className={`col-span-${colSpanMobile} flex flex-col justify-between gap-[5px] text-gray-700 md:col-span-${colSpanDesktop}`}
  >
    {tooltip ? (
      <LabelWithTooltip label={label} tooltip={tooltip} />
    ) : (
      <span className="body-md h-[40px] max-w-[128px]">{label}:</span>
    )}
    {image ? (
      <span className="title-lg text-neutral-900">
        <img
          src={image && (value as string)}
          alt=""
          className="w-[220px] rounded-[20px] bg-center object-cover"
        />
      </span>
    ) : (
      <span className="title-md md:title-lg break-words font-medium text-neutral-900">
        {value}
      </span>
    )}
  </div>
);

type ShopOrderItemDetailsProps = { item: ShopItemType };

const ShopOrderItemDetails = ({ item }: ShopOrderItemDetailsProps) => {
  return (
    <>
      <DetailSection label="Store" value={item.store} colSpanDesktop={4} />
      <DetailSection
        label="Urgent Purchase"
        value={item.urgent ? "Yes" : "No"}
        colSpanDesktop={4}
      />
      <DetailSection label="Item URL" value={item.url} />
      <DetailSection label="Item Name" value={item.name} colSpanDesktop={4} />
      <DetailSection
        label="Item Original Cost"
        value={formatCurrency(item.originalCost)}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Quantity"
        value={item.quantity}
        colSpanDesktop={3}
      />
      <DetailSection label="Weight" value="67kg" colSpanDesktop={2} />
      <DetailSection label="Height" value="5 inches" colSpanDesktop={2} />
      <DetailSection label="Length" value="5 inches" colSpanDesktop={2} />
      <DetailSection label="Width" value="5 inches" colSpanDesktop={2} />
      <DetailSection label="Product/Item Picture" value={item.image} image />
      <DetailSection label="Product Description" value={item.description} />

      {item.properties?.map((property) => {
        return (
          <DetailSection
            label={property.label}
            value={property.value}
            colSpanDesktop={3}
          />
        );
      })}
    </>
  );
};

const BillingAddressStep = () => {
  const { orderPackages } = useShopContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your shipping address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <ShippingImportantNotice />
          <SelectDestinationShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Confirm your Billing Information" />
        <BillingAddress billingDetails={orderPackage.billingDetails} />
      </div>
    </div>
  );
};

type BillingAddressProps = { billingDetails: BillingDetailsType };

export const BillingAddress = ({ billingDetails }: BillingAddressProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px]">
        <div className="flex w-full items-center gap-[30px]">
          <h4 className="title-md md:title-lg text-gray-700">
            Billing Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
            <DetailSection
              label="First Name"
              value={billingDetails.firstName}
              colSpanDesktop={4}
            />
            <DetailSection
              label="Last Name"
              value={billingDetails.lastName}
              colSpanDesktop={4}
            />
            <DetailSection
              label="Contact Number"
              value={`${billingDetails.countryCode} ${billingDetails.phoneNumber}`}
              colSpanDesktop={4}
            />
            <DetailSection
              label="Email"
              value={billingDetails.email}
              colSpanDesktop={5}
            />
            <DetailSection
              label="Country"
              value={billingDetails.country}
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="State"
              value={billingDetails.state}
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="City"
              value={billingDetails.city}
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Zip/postal Code"
              value={billingDetails.zipPostalCode}
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection label="Address" value={billingDetails.address} />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const SelectDestinationShippingAddress = () => {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <SelectInput
        id={"destinationShippingAddress"}
        label={"Destination/Shipping Address"}
        options={
          <>
            <option value="" disabled hidden>
              Select Destination
            </option>

            {DESTINATIONS.map((destination) => {
              return (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              );
            })}
          </>
        }
      />
      <TooltipButton label="" position="left-start" />
    </div>
  );
};

export const ShippingImportantNotice = () => {
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
  const { orderPackages } = useShopContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  const defaultColumns = useMemo(shopPackageItemColumns, []);

  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />

      <PackageTable
        columns={defaultColumns}
        data={orderPackage.items}
        tableFooter={<ShopPackageTableFooter />}
      />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Shipping Method Used" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Shipment costs" />
      <ShipmentCostsSummary
        footer={
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
        }
      />
    </div>
  );
};

export type ShipmentCostsSummaryProps = {
  footer: JSX.Element;
  payButton?: boolean;
};

export const ShipmentCostsSummary = ({
  footer,
  payButton = false,
}: ShipmentCostsSummaryProps) => {
  const { orderPackages } = useShopContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  const total = [
    orderPackage.totalShippingCost,
    orderPackage.clearingPortHandlingCost,
    orderPackage.otherCharges,
    orderPackage.storageCharge,
    orderPackage.insurance,
    orderPackage.valueAddedTax,
    orderPackage.paymentMethodSurcharge,
  ].reduce((total, cost) => (total += cost));

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary>
        <CostDetailSection
          label="Shipping Cost"
          value={formatCurrency(orderPackage.totalShippingCost)}
        />
        <CostDetailSection
          label="Clearing, Port Handling"
          value={formatCurrency(orderPackage.clearingPortHandlingCost)}
        />
        <CostDetailSection
          label="Other Charges"
          value={formatCurrency(orderPackage.otherCharges)}
        />
        <CostDetailSection
          label="Storage Charge"
          value={formatCurrency(orderPackage.storageCharge)}
        />
        <CostDetailSection
          label="Insurance"
          value={formatCurrency(orderPackage.insurance)}
        />
        <CostDetailSection
          label="VAT"
          value={formatCurrency(orderPackage.valueAddedTax)}
        />
        <CostDetailSection
          label="Payment Method Surcharge"
          value={formatCurrency(orderPackage.paymentMethodSurcharge)}
        />
        <CostDetailSection
          label="Discount"
          value={`- ${formatCurrency(orderPackage.discount)}`}
        />
        <TotalCost total={total - orderPackage.discount} />
      </Summary>
      <div className="flex flex-col justify-center gap-[20px] p-[20px]">
        {footer}
        {payButton && (
          <div
            className="w-full self-center md:max-w-[500px]"
            id="payNowButton"
          >
            {/* portal for pay now button */}
          </div>
        )}
      </div>
    </div>
  );
};

type SummaryProps = {
  children: ReactNode;
  title?: string;
};

export const Summary = ({
  children,
  title = "Shipment Cost Summary",
}: SummaryProps) => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-primary-900 px-[28px] py-[20px] text-white">
      <span className="title-lg">{title}</span>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  );
};

export type ShippingMethodProps = {
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
          <form>
            <fieldset id="shippingMethods" className="flex items-center">
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
            </fieldset>
          </form>
          <h4 className="title-md md:title-lg text-black">Basic</h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-[10px] pl-[10px]">
            <div className="label-lg grid w-full grid-cols-2 gap-[20px] font-medium text-neutral-900 md:w-max">
              <span className="col-span-1">Shipping Cost:</span>
              <span className="col-span-1 place-self-end">$126.66</span>
              <span className="col-span-1">Clearing, Port Handling:</span>
              <span className="col-span-1 place-self-end">$126.66</span>
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

      <AndLastly />
    </div>
  );
};

export default InitiateShipping;
