import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import LabelId from "~/components/LabelId";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import { RequestFormHeader } from "~/components/Shop/Requests/RequestOrder";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { Step2, Step3, type ImportInputs } from "../Requests/RequestOrder";

const DraftDetails = () => {
  const { step, next, isLastStep, isSecondToLastStep } = useMultiStepForm([
    <Step2 />,
    <Step3 />,
  ]);

  const { localDraft, handleDraft, handleLocalDraft } = useImportContext();
  const { handleTabChange } = useTabContext();

  const formMethods = useForm<ImportInputs>({
    defaultValues: {
      requestPackage: localDraft?.requestPackage ?? {},
    },
  });

  useEffect(() => {
    formMethods.reset({
      requestPackage: localDraft?.requestPackage ?? {},
    });
  }, [localDraft?.requestPackage]);

  const onSubmit: SubmitHandler<ImportInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
      handleDraft(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    handleDraft(null);
    handleLocalDraft(null);
  };

  const handleSaveAsDraft = () => {
    handleTabChange("drafts");
    handleDraft(formMethods.getValues().requestPackage);
    handleLocalDraft(formMethods.getValues());
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
          <div className="flex flex-col gap-[10px] md:flex md:flex-row md:[&>*]:w-max">
            <SaveAsDraftButton onClick={handleSaveAsDraft} />
            <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
          </div>
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
