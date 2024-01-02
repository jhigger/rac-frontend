import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { BackButton } from "~/components/Buttons/BackButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  RequestFormHeader,
  RequestOrderStep1,
  RequestOrderStep2,
  type ShopInputs,
} from "../Requests/RequestOrder";

const DraftDetails = () => {
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<RequestOrderStep1 />, <RequestOrderStep2 />]);

  const { draftPackage, handleDraft } = useShopContext();
  const { handleTabChange, handleActiveAction } = useTabContext();
  const [, setDraft] = useLocalStorage("Shop", {});

  const formMethods = useForm<ShopInputs>({
    defaultValues: {
      requestPackage: draftPackage ?? {},
    },
  });

  const onSubmit: SubmitHandler<ShopInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
      handleDraft(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    formMethods.handleSubmit(onSubmit);
    handleDraft(null);
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
      <div
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        <RequestFormHeader
          title="Requesting For New Shop For Me Service"
          draft
        />

        {step}

        {isFirstStep && (
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

export default DraftDetails;
