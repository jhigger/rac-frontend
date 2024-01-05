/* eslint-disable @next/next/no-img-element */
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { ArrowRight3, ExportCircle } from "iconsax-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { formatCurrency } from "~/Utils";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import LabelId from "~/components/LabelId";
import OrderTrackingId from "~/components/OrderTrackingId";
import PackageTable from "~/components/PackageTable";
import {
  BillingAddress,
  DetailSection,
  Summary,
  type ShippingMethodProps,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  AndLastly,
  CostDetailSection,
  ImportantNotice,
  PaymentMethods,
  StepIndex,
  SubSectionTitle,
  TotalCost,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import {
  HighlightedInfo,
  PackageOrigin,
} from "~/components/Shop/Requests/RequestDetails";
import {
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import {
  useAutoImportContext,
  type AutoImportItemType,
} from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  AutoImportOrderItemDetails,
  DestinationAddressDetails,
  OriginWarehouseAddress,
  PickupDetails,
} from "../Requests/RequestOrder";

const InitiateShipping = () => {
  const [portal, setPortal] = useState<Element | DocumentFragment | null>(null);
  const { requestPackages } = useAutoImportContext();
  const { viewIndex, handleActiveAction, handleTabChange } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <Step1 /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <Step2 />,
    },
    { title: "Place Order", content: <Step3 /> },
    { title: "Success", content: <Step4 /> },
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
          <CongratulationImage description="You have just successfully placed an Auto-Import order." />
        </>
      )}

      {step}

      {currentStepIndex <= 1 && (
        <div className="flex w-full flex-col items-center justify-center gap-[10px] md:w-max md:flex-row">
          {isFirstStep && (
            <div className="w-full md:max-w-[210px]">
              <BackButton onClick={handleBack} />
            </div>
          )}
          {!isFirstStep && (
            <div className="w-full md:max-w-[210px]">
              <BackButton onClick={back} />
            </div>
          )}
          {currentStepIndex === 0 && (
            <DoneButton text="Proceed" onClick={next} />
          )}
          {currentStepIndex === 1 && (
            <DoneButton text="Confirm" onClick={next} />
          )}
        </div>
      )}

      {isLastStep && (
        <div className="w-[200px]">
          <DoneButton text="Done" onClick={handleFinish} />
        </div>
      )}

      {portal && createPortal(<PayNowButton onClick={next} />, portal)}
    </div>
  );
};

const Step1 = () => {
  const { requestPackages } = useAutoImportContext();

  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Package Details" />
      <PackageOrigin>
        <HighlightedInfo text="From the details you provided, your car(s) will be delivered and shipped from here to our your selected 'destination' in Nigeria" />
        <DetailSection
          label="Origin warehouse"
          value={requestPackage.originWarehouse}
        />
        <OriginWarehouseAddress />
      </PackageOrigin>
      <hr className="block w-full border-dashed border-primary-900" />
      {requestPackage.items.map((item, i) => {
        return <AutoImportOrderItem key={i} item={item} index={i} />;
      })}
    </div>
  );
};

export type AutoImportOrderItemProps = {
  index: number;
  item: AutoImportItemType;
};

export const AutoImportOrderItem = ({
  index,
  item,
}: AutoImportOrderItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg font-medium text-gray-700">
            Car - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && <AutoImportOrderItemDetails item={item} />}
        {item.pickupDetails && (
          <>
            <hr className="block w-full border-gray-500" />
            <PickupDetails pickupDetails={item.pickupDetails} />
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

const Step2 = () => {
  const { requestPackages } = useAutoImportContext();

  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Confirm your Shipping Details" />
      <DestinationAddressDetails />
      <SectionHeader title="Confirm your Billing Information" />
      <BillingAddress billingDetails={requestPackage.billingDetails} />
    </div>
  );
};

const Step3 = () => {
  const { requestPackages } = useAutoImportContext();

  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const defaultColumns = useMemo(autoImportPackageItemColumns, []);

  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable
        columns={defaultColumns}
        data={requestPackage.items}
        tableFooter={<AutoImportPackageTableFooter />}
      />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Select The Shipping Method That Suites Your Need" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Payment Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Select the Payment Method You Wish to Use" />
      </div>
      <PaymentMethods />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-12">
        <div className="flex flex-col gap-[15px] md:col-span-4 md:max-w-[300px]">
          <SectionHeader title="Take Note" />
          <ImportantNotice />
        </div>
        <div className="flex flex-col gap-[15px] md:col-span-8">
          <SectionHeader title="Order costs" />
          <CostsSummary />
        </div>
      </div>
    </div>
  );
};

const CostsSummary = () => {
  const { requestPackages } = useAutoImportContext();

  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const items = requestPackage.items;

  const totalPickupCost = items.reduce(
    (acc, item) => (acc += item.pickupDetails?.pickupCost ?? 0),
    0,
  );

  const total = [
    totalPickupCost,
    requestPackage.totalShippingCost,
    requestPackage.otherCharges,
    requestPackage.storageCharge,
    requestPackage.insurance,
    requestPackage.valueAddedTax,
    requestPackage.paymentMethodSurcharge,
  ].reduce((total, cost) => (total += cost));

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary>
        {totalPickupCost > 0 && (
          <CostDetailSection
            label="Pickup Cost"
            value={formatCurrency(totalPickupCost)}
          />
        )}
        <CostDetailSection
          label="Shipping Cost"
          value={formatCurrency(requestPackage.totalShippingCost)}
        />
        <CostDetailSection
          label="Other Charges"
          value={formatCurrency(requestPackage.otherCharges)}
        />
        <CostDetailSection
          label="Storage Charge"
          value={formatCurrency(requestPackage.storageCharge)}
        />
        <CostDetailSection
          label="Insurance"
          value={formatCurrency(requestPackage.insurance)}
        />
        <CostDetailSection
          label="VAT"
          value={formatCurrency(requestPackage.valueAddedTax)}
        />
        <CostDetailSection
          label="Payment Method Surcharge"
          value={formatCurrency(requestPackage.paymentMethodSurcharge)}
        />
        <CostDetailSection
          label="Discount"
          value={`- ${formatCurrency(requestPackage.discount)}`}
        />
        <TotalCost total={total - requestPackage.discount} />
      </Summary>
      <div className="flex flex-col items-center justify-center gap-[20px] p-[20px]">
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-error-600" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              The total you are paying now includes Shipping fees but excludes
              port handling and clearing fees (would be paid upon arrival of
              car(s) to the Port in Nigeria)
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
        <div className="w-[168px]" id="payNowButton">
          {/* portal for pay now button */}
        </div>
      </div>
    </div>
  );
};

const ShippingMethod = ({
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
          <h4 className="title-md md:title-lg text-black">Custom</h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-[10px] pl-[10px]">
            <div className="label-lg grid w-full grid-cols-2 gap-[20px] font-medium text-neutral-900 md:w-max">
              <span className="col-span-1">Shipping Cost:</span>
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
              <p className="text-error-900">
                The cost paid here only covers shipping to the Port in Nigeria.
                Additional clearing cost has to be paid to get it out of the
                ports. You can call us on +234 700 700 6000 or +1 888 567 8765
                to get a clearance estimate
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const autoImportPackageItemColumns = () => {
  const columnHelper = createColumnHelper<AutoImportItemType>();

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
            {`${row.original.brand} ${row.original.model}`}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("color", {
      header: "Car(s) color",
      cell: ({ row }) => row.original.color,
    }),
    columnHelper.accessor("value", {
      header: "Car(s) value",
      cell: ({ row }) => formatCurrency(row.original.value),
    }),
    columnHelper.accessor("pickupDetails.pickupCost", {
      header: "Pick up Cost",
      cell: ({ row }) =>
        row.original.pickupDetails
          ? formatCurrency(row.original.pickupDetails.pickupCost)
          : "---",
    }),
  ] as Array<ColumnDef<AutoImportItemType, unknown>>;
};

export const AutoImportPackageTableFooter = () => {
  return (
    <>
      <div className="col-span-1 col-start-3 flex w-[100px] flex-col gap-[5px]">
        <span className="body-md h-[40px] text-gray-700">
          Total Declared value:
        </span>
        <span className="title-lg text-neutral-900">$345.00</span>
      </div>
      <div className="col-span-1 flex w-[100px] flex-col gap-[5px]">
        <span className="body-md h-[40px] text-gray-700">
          Total pick up cost:
        </span>
        <span className="title-lg text-neutral-900">$340.00</span>
      </div>
    </>
  );
};

const Step4 = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <SuccessImportantNotice />
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
                  the <b>Tracking ID</b> above or{" "}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
                      this link
                      <ExportCircle color="#292D32" size={18} />
                    </span>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </SectionContentLayout>
      </div>
      <AndLastly />
    </div>
  );
};

const SuccessImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="title-lg font-bold text-primary-900">
        IMPORTANT NOTICE:
      </span>
      <p className="title-lg text-gray-700">
        The cost paid here only covers shipping to the Port in Nigeria.
        Additional clearing cost has to be paid to get it out of the ports. You
        can call us on +234 700 700 6000{" "}
        <span className="title-lg">
          or +1 888 567 8765 to get a clearance estimate or{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
              send us a dm
              <ExportCircle color="#292D32" size={18} />
            </span>
          </a>
        </span>
      </p>
    </div>
  );
};

export default InitiateShipping;
