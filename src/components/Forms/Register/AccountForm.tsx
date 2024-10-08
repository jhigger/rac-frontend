import { useFormContext, type FieldError } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import { type RegisterInputs } from "~/pages/register";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";

const AccountForm = () => {
  const { isRegistering } = useAuthContext();
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext<RegisterInputs>();

  const firstNameError = errors.firstName as
    | (FieldError & { message: string })
    | undefined;

  const lastNameError = errors.lastName as
    | (FieldError & { message: string })
    | undefined;

  return (
    <>
      <FormHeader title="Create your account" />
      <div className="flex w-full flex-col gap-[30px]">
        <TextInput
          id={"firstName"}
          label={"First Name"}
          disabled={isRegistering}
          {...register("firstName")}
          errorMessage={firstNameError?.message}
        />
        <TextInput
          id={"lastName"}
          label={"Last Name"}
          disabled={isRegistering}
          {...register("lastName")}
          errorMessage={lastNameError?.message}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          disabled={isRegistering}
          {...register("email")}
        />
        <PasswordInput
          id="password"
          label="Password"
          disabled={isRegistering}
          newPassword
          {...register("password")}
          value={watch("password")}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          disabled={isRegistering}
          confirmPassword
          {...register("confirmPassword")}
          value={watch("confirmPassword")}
          compare={watch("password")}
        />
      </div>
    </>
  );
};

export default AccountForm;
