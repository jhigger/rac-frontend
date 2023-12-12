import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import {
  StepIndex,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import {
  BackButton,
  DoneButton,
  ProceedButton,
  RequestFormHeader,
  SaveAsDraftButton,
} from "~/components/Shop/Requests/RequestOrder";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  emptyValue,
  type Inputs,
} from "../Requests/RequestOrder";

const DraftDetails = () => {
  const { clearDrafts } = useAutoImportContext();
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
      <div
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
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
              {isFirstStep && <BackButton onClick={handleBack} />}
              {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
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
                {isFirstStep && <BackButton onClick={handleBack} />}
                {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
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
