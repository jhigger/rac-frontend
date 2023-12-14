import AccordionButton from "~/components/Forms/AccordionButton";
import { LabelId } from "~/components/Shop/Orders";
import {
  DetailSection,
  InitiateShippingButton,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  HighlightedInfo,
  requestStatuses,
  type RequestInformationProps,
} from "~/components/Shop/Requests/RequestDetails";
import {
  BackButton,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import { OrderItem } from "../Orders/ClearPackage";

const RequestDetails = () => {
  const { requestItems } = useImportContext();
  const { viewIndex, handleActiveAction, handleTabChange } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestItems?.[viewIndex];

  if (!requestPackage) return;

  const status = requestPackage.requestStatus ?? "Not Responded";

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleProceed = () => {
    handleTabChange("orders");
    handleActiveAction("initiate shipping");
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Import Order Request Details" />
      <LabelId label="Request ID" id={requestPackage.requestId} />
      <OrderInformation
        info={{ date: requestPackage.requestDate.toLocaleString(), status }}
        onClick={handleProceed}
      />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {requestPackage.items.map((item, i) => {
          return <OrderItem key={i} index={i} />;
        })}
      </div>
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
        {status === "Responded" && (
          <InitiateShippingButton onClick={handleProceed} />
        )}
      </div>
    </div>
  );
};

const OrderInformation = ({ info, onClick }: RequestInformationProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Order Information" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Order Information
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <div className="flex w-max flex-col gap-[15px]">
              <div className="col-span-1 flex flex-col gap-[15px]">
                <div className="label-lg grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Order Request Date:</span>
                  <span className="title-lg text-neutral-900">{info.date}</span>
                </div>
                <div className="label-lg grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Shop for me status:</span>
                  <span className="title-lg text-neutral-900">
                    {requestStatuses[info.status]}
                  </span>
                </div>
                {info.status === "Responded" && (
                  <InitiateShippingButton onClick={onClick} />
                )}
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export const PackageOrigin = () => {
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
            <>
              <HighlightedInfo text="This is RAC Facility you claim to have dropped the package to" />
              <div className="flex flex-col gap-[5px]">
                <DetailSection
                  label="Origin warehouse"
                  value="Nigeria (Lagos - warehouse)"
                />
              </div>
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

export default RequestDetails;
