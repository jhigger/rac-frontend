import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import CongratulationImage from "~/components/CongratulationImage";
import {
  Guidelines,
  OfficeDeliverAddress,
  Step1,
  Step2,
  emptyValue,
  type DeliveryStatusMapType,
  type InstructionsMapType,
} from "~/components/Import/Requests/RequestOrder";
import LabelId from "~/components/LabelId";
import { StepDescription } from "~/components/Shop/Orders/OrdersPanel";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import {
  useExportContext,
  type ExportRequestPackageType,
} from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";

export type ExportInputs = {
  requestPackage: ExportRequestPackageType;
};

const RequestOrder = () => {
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<Step1 />, <Step2 />, <Step3 />]);

  const { handleRequests } = useExportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();
  const [, setDraft] = useLocalStorage("Export", {});

  const formMethods = useForm<ExportInputs>({
    defaultValues: {
      requestPackage: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<ExportInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
    formMethods.handleSubmit(onSubmit);
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleSaveAsDraft = () => {
    handleTabChange("drafts");
    setDraft(formMethods.getValues());
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Requesting For New Export Order" />
        {!isLastStep && (
          <HighlightedInfo text="Provide as much Information as possible needed for our staffs to identify your package if it has been delivered. The more Information you provide, the easier we identify your package." />
        )}
        {isLastStep && (
          <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
            <LabelId label="Request" id="R78667" />
          </div>
        )}

        {step}

        {isFirstStep && (
          <>
            <div className="flex w-full flex-col gap-[10px] md:flex-row md:[&>*]:w-max">
              <BackButton onClick={handleBack} />
              <ProceedButton onClick={next} />
            </div>
          </>
        )}
        {!isFirstStep && !isLastStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              <BackButton onClick={handleBack} />
              <SaveAsDraftButton onClick={handleSaveAsDraft} />
              <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <BackButton onClick={handleBack} />
              </div>
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
              </div>
              <div className="col-span-full">
                <SaveAsDraftButton onClick={handleSaveAsDraft} />
              </div>
            </div>
          </>
        )}
        {isLastStep && (
          <div className="w-full md:w-[200px]">
            <DoneButton onClick={handleFinish} />
          </div>
        )}
        <NeedHelpFAB />
      </div>
    </FormProvider>
  );
};

export const Step3 = () => {
  const { draftPackage } = useExportContext();

  if (!draftPackage) return;

  const deliveryStatusMap: DeliveryStatusMapType = {
    "None delivered": {
      imageText: (
        <CongratulationImage
          title="OOPS... You can't request for an Export order yet"
          description={
            <>
              Send your package to our Warehouse in United States (your selected
              <b>&quot;Origin&quot;</b>)
            </>
          }
        />
      ),
      whatNext: (
        <Guidelines>
          <StepDescription
            stepNumber={1}
            description="Once you are sure that this package has gotten to the warehouse address above, attempt requesting for a new export order and provide us information we need to Identify the package as yours."
            backgroundColor="bg-primary-600"
          />

          <StepDescription
            stepNumber={2}
            description={
              <span className="body-lg md:title-lg text-gray-900">
                Here are some tip to help us quickly identify your package
                <ul className="list-item pl-[30px] [&>*]:list-disc">
                  <li>Attach your USER ID on the Package if you can.</li>
                  <li>
                    If you are purchasing the package directly from the seller,
                    provide us the TRACKING ID or any other related ID on the
                    package that is Unique to your order from the seller.
                  </li>
                  <li>
                    If you have the actual picture of the package, provide it
                    while requesting for the Export order on our website
                  </li>
                </ul>
              </span>
            }
            backgroundColor="bg-primary-600"
          />
        </Guidelines>
      ),
    },
    "All delivered": {
      imageText: (
        <CongratulationImage description="You have just successfully requested for Export service." />
      ),
      whatNext: <Instructions />,
    },
    "Some delivered": {
      imageText: (
        <CongratulationImage
          title="OOPS... You can't request for an Export order yet"
          description={
            <>
              Your request has been as <b>&quot;Draft&quot;</b>. To complete
              your request, kindly send the remaining items in your package to
              our Warehouse in United States (your selected{" "}
              <b>&quot;Origin&quot;</b>)
            </>
          }
        />
      ),
      whatNext: (
        <Guidelines>
          <StepDescription
            stepNumber={1}
            description={
              <>
                Once you are sure that all the items yet to be delivered in your
                package have gotten to the warehouse address above, come to the
                <b>'Draft'</b> folder to update the 'Item Delivery Status' of
                these items and submit your request for a new export order
              </>
            }
            backgroundColor="bg-primary-600"
          />

          <StepDescription
            stepNumber={2}
            description={
              <span className="body-lg md:title-lg text-gray-900">
                Here are some tip to help us quickly identify your package
                <ul className="list-item pl-[30px] [&>*]:list-disc">
                  <li>Attach your USER ID on the Package if you can.</li>
                  <li>
                    If you are purchasing the package directly from the seller,
                    provide us the TRACKING ID or any other related ID on the
                    package that is Unique to your order from the seller.
                  </li>
                  <li>
                    If you have the actual picture of the package, provide it
                    while requesting for the Export order on our website
                  </li>
                </ul>
              </span>
            }
            backgroundColor="bg-primary-600"
          />
        </Guidelines>
      ),
    },
  };

  return (
    <div className="flex flex-col gap-[30px]">
      {deliveryStatusMap[draftPackage.deliveryStatus].imageText}
      {draftPackage.deliveryStatus !== "All delivered" && (
        <OfficeDeliverAddress />
      )}
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="What Next?" />
        <SectionContentLayout>
          {deliveryStatusMap[draftPackage.deliveryStatus].whatNext}
        </SectionContentLayout>
      </div>
    </div>
  );
};

const Instructions = () => {
  const instructions: InstructionsMapType[] = [
    {
      content: (
        <>
          Kindly note that we use the package descriptions you provided to
          identify the package you claim to have been delivered to our Warehouse
          (<span className="text-primary-600">Origin warehouse</span> you
          selected) for shipping.
        </>
      ),
    },
    {
      content:
        "After we have been able to Identify your package, you will be notified so you can proceed to Initiate shipping processes for your package.",
    },
    {
      content:
        "After we have confirmed your payment, we will begin your shipment processes and you can track package till it gets delivered.",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium text-neutral-700 md:pl-[14px] md:font-bold">
        Here is how to pick your package up from our office
      </span>
      <ul className="flex flex-col gap-[14px]">
        {instructions.map((item, i) => (
          <StepDescription
            key={i}
            stepNumber={i + 1}
            description={item.content}
            backgroundColor="bg-primary-600"
          />
        ))}
      </ul>
    </div>
  );
};

export default RequestOrder;
