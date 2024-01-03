import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
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
  const { step, next, isLastStep, isSecondToLastStep } = useMultiStepForm([
    <RequestOrderStep1 />,
    <RequestOrderStep2 />,
  ]);

  const { localDraft, handleLocalDraft } = useShopContext();
  const { handleTabChange } = useTabContext();

  const formMethods = useForm<ShopInputs>({
    defaultValues: {
      requestPackage: localDraft?.requestPackage ?? {},
    },
  });

  useEffect(() => {
    formMethods.reset({
      requestPackage: localDraft?.requestPackage ?? {},
    });
  }, [localDraft?.requestPackage]);

  const onSubmit: SubmitHandler<ShopInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    handleLocalDraft(null);
  };

  const handleSaveAsDraft = () => {
    handleTabChange("drafts");
    handleLocalDraft(formMethods.getValues());
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader
          title="Requesting For New Shop For Me Service"
          draft
        />
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
