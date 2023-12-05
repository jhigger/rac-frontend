import SelectInput from "~/components/Forms/Inputs/SelectInput";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  BackButton,
  ProceedButton,
  RequestFormHeader,
  SectionHeader,
  TooltipButton,
} from "~/components/Shop/Requests/RequestOrder";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";

const RequestOrder = () => {
  const { step, next, isFirstStep } = useMultiStepForm([<Step1 />, <Step2 />]);
  const { handleActiveAction } = useTabContext();

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      {step}
      {isFirstStep && (
        <>
          <div className="hidden gap-[10px] md:flex [&>*]:w-max">
            <BackButton onClick={handleBack} />
            <ProceedButton next={next} />
          </div>
          {/* for mobile screen */}
          <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
            <div className="col-span-full [@media(min-width:320px)]:col-span-1">
              <BackButton onClick={handleBack} />
            </div>
            <div className="col-span-full [@media(min-width:320px)]:col-span-1">
              <ProceedButton next={next} />
            </div>
          </div>
        </>
      )}
      <NeedHelpFAB />
    </div>
  );
};

const Step1 = () => {
  return (
    <>
      <RequestFormHeader title="Requesting For New Import Order" />
      <HighlightedInfo text="Provide as much Information as possible needed for our staffs to identify your package if it has been delivered. The more Information you provide, the easier we identify your package." />
      <SectionHeader
        title="Tell us where your package will be shipped from"
        hr
      />
      <div className="grid grid-cols-2 gap-[30px] md:pl-[34px]">
        <SelectOrigin />
        <SelectPackageDeliveryStatus />
      </div>
    </>
  );
};

const Step2 = () => {
  return <></>;
};

const SelectOrigin = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <SelectInput
        id={"origin"}
        label={"Origin"}
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

const SelectPackageDeliveryStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <SelectInput
        id={"packageDeliveryStatus"}
        label={"Package Delivery Status"}
        options={
          <>
            <option value="" disabled hidden>
              Select a Delivery Status
            </option>
          </>
        }
      />
      <TooltipButton />
    </div>
  );
};

export default RequestOrder;
