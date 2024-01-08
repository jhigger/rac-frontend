/* eslint-disable @next/next/no-img-element */
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { ArrowRight3, ExportCircle } from "iconsax-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useFormContext } from "react-hook-form";
import {
  formatCurrency,
  formatDimension,
  formatWeight,
  limitChars,
} from "~/Utils";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import LabelId from "~/components/LabelId";
import OrderTrackingId from "~/components/OrderTrackingId";
import PackageTable from "~/components/PackageTable";
import {
  DetailSection,
  InitiateShippingAgreement,
  ShippingImportantNotice,
  ShippingMethod,
  Summary,
  type ShipmentCostsSummaryProps,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  CostDetailSection,
  CustomBillingAddress,
  DefaultBillingAddressRadio,
  StepIndex,
  SubSectionTitle,
  TotalCost,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import { PackageOrigin } from "~/components/Shop/Requests/RequestDetails";
import {
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "~/components/Shop/Requests/RequestOrder";
import SuccessImportantNotice from "~/components/SuccessImportantNotice";
import { ORIGINS } from "~/constants";
import {
  useImportContext,
  type ImportItemType,
} from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { type ImportInputs } from "../Requests/RequestOrder";

const InitiateShipping = () => {
  const [portal, setPortal] = useState<Element | DocumentFragment | null>(null);
  const { requestPackages } = useImportContext(); // todo: add viewType because order/request can be shipped
  const { viewIndex, handleActiveAction, handleTabChange } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

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
    handleActiveAction(null);
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

      {!isLastStep ? (
        <div className="w-full md:w-max">
          <LabelId label="Request ID" id={requestPackage.requestId} />
        </div>
      ) : (
        // todo: fetch orderPackage of the requestPackage.requestId to get orderId and trackingId
        <>
          <SectionContentLayout>
            <OrderTrackingId orderId="OD78667" trackingId="SH78667" center />
          </SectionContentLayout>
          <CongratulationImage description="You have just successfully initiated shipment of your Package" />
        </>
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

const PackageConfirmation = () => {
  const { requestPackages } = useImportContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Package Details" />
      <PackageOrigin>
        <DetailSection
          label="Origin warehouse"
          value={requestPackage.originWarehouse}
        />
      </PackageOrigin>
      <hr className="block w-full border-dashed border-primary-900" />
      {requestPackage.items.map((item, i) => {
        return <ImportOrderItem key={i} item={item} index={i} />;
      })}
    </div>
  );
};

type ImportOrderItemProps = { index: number; item: ImportItemType };

const ImportOrderItem = ({ index, item }: ImportOrderItemProps) => {
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
        {open && <ImportOrderItemDetails item={item} />}
      </div>
    </SectionContentLayout>
  );
};

type ImportOrderItemDetailsProps = { item: ImportItemType };

const ImportOrderItemDetails = ({ item }: ImportOrderItemDetailsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-10">
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
      <DetailSection
        label="Weight"
        value={formatWeight(item.width)}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Height"
        value={formatDimension(item.height)}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Length"
        value={formatDimension(item.length)}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Width"
        value={formatDimension(item.width)}
        colSpanDesktop={2}
      />
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
    </div>
  );
};

export const BillingAddressStep = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Fill in the Shipping Address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <ShippingImportantNotice />
          <SelectDestinationShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Confirm your Billing Information" />
        <DefaultBillingAddressRadio />
        <CustomBillingAddress />
      </div>
    </div>
  );
};

const SelectDestinationShippingAddress = () => {
  const { register } = useFormContext<ImportInputs>();

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

            {ORIGINS.map((origins) => {
              return (
                <option key={origins} value={origins}>
                  {origins}
                </option>
              );
            })}
          </>
        }
        {...register("requestPackage.destinationWarehouse")}
      />
      <TooltipButton
        label="This is your shipping address, it is the location your package will be delivered to. You can then request for doorstep delivery upon arrival."
        position="left-start"
      />
    </div>
  );
};

const InitiateShippingStep = () => {
  const { requestPackages } = useImportContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const defaultColumns = useMemo(importPackageItemColumns, []);

  const totals = {
    numberOfItems: requestPackage.items.length,
    grossWeight: requestPackage.items.reduce(
      (acc, item) => (acc += item.weight),
      0,
    ),
    declaredValue: requestPackage.items.reduce(
      (acc, item) => (acc += item.originalCost),
      0,
    ),
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable
        columns={defaultColumns}
        data={requestPackage.items}
        tableFooter={<ImportPackageTableFooter totals={totals} />}
      />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Select Shipping Method" />
      </div>
      <ShippingMethod
        packageCosts={requestPackage.packageCosts}
        checked
        disabled
        expanded
      />

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

const ShipmentCostsSummary = ({
  payButton = false,
  footer,
}: ShipmentCostsSummaryProps) => {
  const { requestPackages } = useImportContext();
  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const {
    shippingCost,
    clearingPortHandlingCost,
    otherCharges,
    storageCharge,
    insurance,
    valueAddedTax,
    paymentMethodSurcharge,
    discount,
  } = requestPackage.packageCosts;

  const total = [
    shippingCost,
    clearingPortHandlingCost,
    otherCharges,
    storageCharge,
    insurance,
    valueAddedTax,
    paymentMethodSurcharge,
  ].reduce((total, cost) => (total += cost));

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary>
        <CostDetailSection
          label="Shipping Cost"
          value={formatCurrency(shippingCost)}
        />
        <CostDetailSection
          label="Clearing, Port Handling"
          value={formatCurrency(clearingPortHandlingCost)}
        />
        <CostDetailSection
          label="Other Charges"
          value={formatCurrency(otherCharges)}
        />
        <CostDetailSection
          label="Storage Charge"
          value={formatCurrency(storageCharge)}
        />
        <CostDetailSection
          label="Insurance"
          value={formatCurrency(insurance)}
        />
        <CostDetailSection label="VAT" value={formatCurrency(valueAddedTax)} />
        <CostDetailSection
          label="Payment Method Surcharge"
          value={formatCurrency(paymentMethodSurcharge)}
        />
        <CostDetailSection
          label="Discount"
          value={`- ${formatCurrency(discount)}`}
        />
        <TotalCost total={total - discount} />
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

export const importPackageItemColumns = () => {
  const columnHelper = createColumnHelper<ImportItemType>();

  return [
    columnHelper.display({
      id: "item",
      header: "Item",
      cell: ({ row }) => (
        <div className="flex items-center gap-[10px]">
          <div className="w-[62px] items-center overflow-hidden rounded-[10px]">
            <img src={row.original.image} alt="item image" />
          </div>
          <div className="max-w-[160px] text-secondary-900">
            {limitChars(row.original.name, 80)}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("originalCost", {
      header: "Value Per Item",
      cell: ({ row }) => formatCurrency(row.original.originalCost),
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity of items",
      cell: ({ row }) => row.original.quantity,
    }),
    columnHelper.display({
      id: "itemTotalValue",
      header: "Total value of item",
      cell: ({ row }) =>
        formatCurrency(row.original.quantity * row.original.originalCost),
    }),
  ] as Array<ColumnDef<ImportItemType, unknown>>;
};

type ImportPackageTableFooterProps = {
  totals: {
    numberOfItems: number;
    grossWeight: number;
    declaredValue: number;
  };
};

export const ImportPackageTableFooter = ({
  totals,
}: ImportPackageTableFooterProps) => {
  const { numberOfItems, grossWeight, declaredValue } = totals;

  return (
    <>
      <div className="col-span-1 col-start-2">
        <DetailSection label="Total number of items" value={numberOfItems} />
      </div>
      <div className="col-span-1">
        <DetailSection
          label="Total Gross weight"
          value={formatWeight(grossWeight)}
        />
      </div>
      <div className="col-span-1">
        <DetailSection
          label="Total Declared Value"
          value={formatCurrency(declaredValue)}
        />
      </div>
    </>
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
