import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { LabelId } from "~/components/Shop/Orders";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  BackButton,
  DoneButton,
  ProceedButton,
  RequestFormHeader,
  SaveAsDraftButton,
} from "~/components/Shop/Requests/RequestOrder";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  Step2,
  Step3,
  emptyValue,
  type Inputs,
} from "../Requests/RequestOrder";

const DraftDetails = () => {
  const [oops] = useState(false);
  const { step, next, isLastStep, isSecondToLastStep } = useMultiStepForm([
    <Step2 />,
    <Step3 oops={oops} />,
  ]);

  const { clearDrafts } = useImportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const formMethods = useForm<Inputs>({
    defaultValues: {
      requestItems: [emptyValue],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.requestItems);
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    formMethods.handleSubmit(onSubmit);
    clearDrafts();
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Requesting For New Import Order" draft />
        {!isLastStep && (
          <HighlightedInfo text="Provide as much Information as possible needed for our staffs to identify your package if it has been delivered. The more Information you provide, the easier we identify your package." />
        )}
        {isLastStep && (
          <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
            <LabelId label="Request" id="R78667" />
          </div>
        )}

        {step}

        {!isLastStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              <BackButton onClick={handleBack} />
              <SaveAsDraftButton />
              <ProceedButton
                next={
                  isSecondToLastStep ? formMethods.handleSubmit(onSubmit) : next
                }
              />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <BackButton onClick={handleBack} />
              </div>
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <ProceedButton
                  next={
                    isSecondToLastStep
                      ? formMethods.handleSubmit(onSubmit)
                      : next
                  }
                />
              </div>
              <div className="col-span-full">
                <SaveAsDraftButton />
              </div>
            </div>
          </>
        )}
        {isLastStep && (
          <div className="w-full md:w-[200px]">
            <DoneButton handleFinish={handleFinish} />
          </div>
        )}
        <NeedHelpFAB />
      </div>
    </FormProvider>
  );
};

export default DraftDetails;
