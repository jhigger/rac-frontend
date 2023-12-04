import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import AccountForm from "~/components/Forms/Register/AccountForm";
import AddressForm from "~/components/Forms/Register/AddressForm";
import Logo from "~/components/Logo";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import useMultiStepForm from "~/hooks/useMultistepForm";

export type RegisterInputs = {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  city: string;
  streetAddress: string;
  countryCode: string;
  phoneNumber: string;
  zipPostalCode: string;
};

const INITIAL_DATA: RegisterInputs = {
  country: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  state: "",
  city: "",
  streetAddress: "",
  countryCode: "",
  phoneNumber: "",
  zipPostalCode: "",
};

const register = () => {
  const { register, handleSubmit, getValues } = useForm<RegisterInputs>({
    defaultValues: INITIAL_DATA,
  });
  const { step, next, isFirstStep, back, isLastStep } = useMultiStepForm([
    <AccountForm register={register} />,
    <AddressForm register={register} getValues={getValues} />,
  ]);
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    // const reqOptions = {
    //   url: "https://rac-backend.onrender.com/api/users/auth",
    //   method: "POST",
    //   data,
    // };

    // const response = await axios.request(reqOptions);
    // console.log(response.data);

    if (!isLastStep) return next();
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-[30px] mt-[100px] flex w-full max-w-[658px] flex-col items-center justify-center gap-[54px] rounded-[20px] bg-white p-[50px]"
        >
          {step}
          <div className="flex gap-4">
            <BackButton {...{ back, isFirstStep }} />
            <ProceedButton {...{ next, isFirstStep }} />
            <CreateAccountButton {...{ next, isLastStep }} />
          </div>
          <TermsAndCondition isLastStep={isLastStep} />
        </form>

        <div className="text-white">
          <span className="label-lg">Already have an account?</span>
          <Link
            href="/login"
            className="label-lg px-[12px] py-[10px] text-primary-200 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
      <NeedHelpFAB />
    </main>
  );
};

type BackButtonProps = { back: () => void; isFirstStep: boolean };

const BackButton = ({ back, isFirstStep }: BackButtonProps) => {
  if (isFirstStep) return;

  return (
    <button
      type="button"
      onClick={back}
      className="btn-outline relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600"
    >
      <span className="material-icons">arrow_back</span>
    </button>
  );
};

type ProceedButtonProps = { next: () => void; isFirstStep: boolean };

const ProceedButton = ({ next, isFirstStep }: ProceedButtonProps) => {
  if (!isFirstStep) return;

  return (
    <button
      type="submit"
      onClick={next}
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      Proceed
    </button>
  );
};

type CreateAccountButtonProps = { next: () => void; isLastStep: boolean };

const CreateAccountButton = ({
  next,
  isLastStep,
}: CreateAccountButtonProps) => {
  if (!isLastStep) return;

  return (
    <button
      type="submit"
      onClick={next}
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      Create My Account
    </button>
  );
};

const TermsAndCondition = ({ isLastStep }: { isLastStep: boolean }) => {
  if (!isLastStep) return;

  return (
    <div className="body-md text-center text-black">
      <Balancer>
        You accept the privacy statement of RAC&nbsp;Logistics by clicking the{" "}
        <span className="label-lg text-primary-600">Create My Account </span>
        button
      </Balancer>
    </div>
  );
};

export default register;
