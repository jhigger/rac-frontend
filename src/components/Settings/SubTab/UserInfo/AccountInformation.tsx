import { Lock, Refresh2, VolumeLow } from "iconsax-react";
import { useEffect } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { BackModalButton } from "~/components/Buttons/BackModalButton";
import { ConfirmNewPasswordButton } from "~/components/Buttons/ConfirmNewPasswordButton";
import ModalButton from "~/components/Buttons/ModalButton";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import PasswordInput from "~/components/Forms/Inputs/PasswordInput";
import {
  RequestFormHeader,
  SectionContentLayout,
} from "~/components/Shop/Requests/RequestOrder";
import { useAuthContext } from "~/contexts/AuthContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import tailmater from "~/js/tailmater";

const emptyValue = {
  existingPassword: "",
  newPassword: "",
  confirmPassword: "",
};

type AccountInformationInputs = typeof emptyValue;

const AccountInformation = () => {
  const { user } = useAuthContext();

  if (!user) return;

  const { step, next, isLastStep, goTo } = useMultiStepForm([
    <Step1 />,
    <Step2 />,
  ]);

  const formMethods = useForm<AccountInformationInputs>({
    defaultValues: emptyValue,
  });

  const onSubmit: SubmitHandler<AccountInformationInputs> = async (data) => {
    if (isLastStep) {
      console.log(data);
      // todo: add loading state to change password button
    }
    next();
  };

  return (
    <div className="grid h-full grid-cols-1 gap-[15px] md:grid-cols-2">
      <div className="col-span-1">
        <FormProvider {...formMethods}>
          <SectionContentLayout>
            <div className="flex h-full flex-col justify-between gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[10px] text-primary-900">
                  <Lock variant="Bold" />
                  <span className="title-lg">Login Details</span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span className="body-md text-gray-700">Email:</span>
                  <span className="title-md text-gray-900">{user.email}</span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span className="body-md text-gray-700">Password:</span>
                  <span className="title-md text-gray-900">**********</span>
                </div>
              </div>

              <div className="w-full max-w-[181px]">
                <ModalButton
                  modalId="changePassword"
                  label="Change Password"
                  buttonClassName="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
                  buttonContent={
                    <>
                      <Refresh2
                        size={18}
                        variant="Bold"
                        className="flex-shrink-0"
                      />
                      <span className="label-lg whitespace-nowrap text-white">
                        Change Password
                      </span>
                    </>
                  }
                  footerContent={({ dataClose }) => {
                    return (
                      <div className="flex gap-[10px]">
                        <div className="w-full md:max-w-[100px]">
                          <BackModalButton
                            dataClose={dataClose}
                            onClick={() => goTo(0)}
                          />
                        </div>

                        {!isLastStep ? (
                          <div className="w-full md:max-w-[172px]">
                            <ProceedButton
                              label="Proceed"
                              onClick={formMethods.handleSubmit(onSubmit)}
                            />
                          </div>
                        ) : (
                          <div className="w-full md:max-w-[215px]">
                            <ConfirmNewPasswordButton
                              dataClose={dataClose}
                              onClick={formMethods.handleSubmit(onSubmit)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  }}
                >
                  <RequestFormHeader title="Change password" />

                  {step}
                </ModalButton>
              </div>
            </div>
          </SectionContentLayout>
        </FormProvider>
      </div>

      <div className="col-span-1">
        <Pinned />
      </div>
    </div>
  );
};

export const Pinned = () => {
  return (
    <div className="h-full">
      <SectionContentLayout>
        <div className="flex h-full flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] text-error-600">
            <VolumeLow variant="Bold" className="rotate-90" />
            <span className="title-lg">Pinned</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="body-md text-gray-700">Registered on:</span>
            <span className="title-md text-gray-900">22-03-2023 13:05</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="body-md text-gray-700">Last Login:</span>
            <span className="title-md text-gray-900">22-03-2023 13:05</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="body-md text-gray-700">Last Logout:</span>
            <span className="title-md text-gray-900">22-03-2023 13:05</span>
          </div>
        </div>
      </SectionContentLayout>
    </div>
  );
};

const Step1 = () => {
  const { register } = useFormContext<AccountInformationInputs>();

  return (
    <>
      <span className="title-lg text-gray-700">
        To ensure maximum security for your account, type in your existing
        password to continue.
      </span>

      <PasswordInput
        id="existingPassword"
        label="Existing Password"
        bg="bg-surface-300"
        {...register("existingPassword")}
      />
    </>
  );
};

const Step2 = () => {
  const { register } = useFormContext<AccountInformationInputs>();

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <>
      <span className="title-lg text-gray-700">
        Kindly enter your new password
      </span>

      <PasswordInput
        id="newPassword"
        label="New Password"
        bg="bg-surface-300"
        newPassword
        {...register("newPassword")}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        bg="bg-surface-300"
        confirmPassword
        {...register("confirmPassword")}
      />
    </>
  );
};

export default AccountInformation;
