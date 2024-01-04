import { ArrowRight3 } from "iconsax-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { formatCurrency } from "~/Utils";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
  BillingDetailsConfirmation,
  Success,
} from "~/components/Shop/Orders/ClearPackage";
import {
  DetailSection,
  ShippingMethod,
  Summary,
  type ShipmentCostsSummaryProps,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  PaymentMethods,
  StepIndex,
  SubSectionTitle,
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
  useImportContext,
  type ImportItemType,
} from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { PackageTable } from "./InitiateShipping";

const ClearPackage = () => {
  const [portal, setPortal] = useState<Element | DocumentFragment | null>(null);
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <BillingDetailsConfirmation />,
    },
    { title: "Clear Package", content: <ClearPackageStep /> },
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
        <CongratulationImage description="Your package have arrived its destination. Proceed to clear it." />
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
        <CongratulationImage description='You can now pick up your package from our office in Nigeria (your selected "Destination")' />
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
          <DoneButton text="Proceed" onClick={next} />
        </div>
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
  const { orderPackages } = useImportContext();

  const { viewIndex } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Package Details" />
      <PackageOrigin>
        <HighlightedInfo
          text="Your Items will be delivered here after we help you purchase your them
        and they will be shipped from here to our pickup office in Nigeria"
        />
        <DetailSection
          label="Country of Purchase"
          value={orderPackage.originWarehouse}
        />
      </PackageOrigin>
      <hr className="block w-full border-dashed border-primary-900" />
      {orderPackage.items.map((item, i) => {
        return <ImportOrderItem key={i} item={item} index={i} />;
      })}
    </div>
  );
};

type ImportOrderItemProps = { index: number; item: ImportItemType };

export const ImportOrderItem = ({ index, item }: ImportOrderItemProps) => {
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
    </div>
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
              The total you are paying now includes only the Shipping fees
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

export default ClearPackage;
