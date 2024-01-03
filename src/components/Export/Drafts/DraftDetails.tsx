import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import { Step2 } from "~/components/Import/Requests/RequestOrder";
import LabelId from "~/components/LabelId";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import { RequestFormHeader } from "~/components/Shop/Requests/RequestOrder";
import { useExportContext } from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { Step3, type ExportInputs } from "../Requests/RequestOrder";

const DraftDetails = () => {
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<Step2 />, <Step3 />]);

  const { localDraft, handleLocalDraft } = useExportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const formMethods = useForm<ExportInputs>({
    defaultValues: {
      requestPackage: localDraft?.requestPackage ?? {},
    },
  });

  useEffect(() => {
    formMethods.reset({
      requestPackage: localDraft?.requestPackage ?? {},
    });
  }, [localDraft?.requestPackage]);

  const onSubmit: SubmitHandler<ExportInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    handleLocalDraft(null);
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleSaveAsDraft = () => {
    handleTabChange("drafts");
    handleLocalDraft(formMethods.getValues());
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Requesting For New Export Order" draft />
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
              {!isFirstStep && <BackButton onClick={handleBack} />}
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

export default DraftDetails;
