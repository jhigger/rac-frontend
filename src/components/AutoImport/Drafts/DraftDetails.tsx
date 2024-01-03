import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import {
  StepIndex,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import { RequestFormHeader } from "~/components/Shop/Requests/RequestOrder";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  type AutoImportInputs,
} from "../Requests/RequestOrder";

const DraftDetails = () => {
  const { localDraft, handleLocalDraft, handleDraft } = useAutoImportContext();
  const { handleTabChange, handleActiveAction } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Details", content: <Step1 /> },
    {
      title: "Shipping & Billing Address",
      content: <Step2 />,
    },
    { title: "Order Summary", content: <Step3 /> },
    { title: "Success", content: <Step4 /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const {
    step,
    currentStepIndex,
    next,
    isFirstStep,
    isSecondToLastStep,
    isLastStep,
    back,
  } = useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  const formMethods = useForm<AutoImportInputs>({
    defaultValues: {
      requestPackage: localDraft?.requestPackage ?? {},
    },
  });

  useEffect(() => {
    formMethods.reset({
      requestPackage: localDraft?.requestPackage ?? {},
    });
  }, [localDraft?.requestPackage]);

  const onSubmit: SubmitHandler<AutoImportInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
    } else if (currentStepIndex === 1) {
      handleDraft(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    handleDraft(null);
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
        <RequestFormHeader title="Requesting For New Auto Import Order" draft />
        <StepIndex
          currentIndex={currentStepIndex}
          length={steps.length}
          title={currentTitle}
        />

        {step}

        {!isLastStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              {!isFirstStep && <BackButton onClick={handleBack} />}
              {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
              <SaveAsDraftButton onClick={handleSaveAsDraft} />
              <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                {isFirstStep && <BackButton onClick={handleBack} />}
                {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
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
