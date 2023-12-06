/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";

export type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { handleUser } = useAuthContext();
  const { register, handleSubmit } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    handleUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-[30px] mt-[100px] flex w-full max-w-[658px] flex-col items-center justify-center gap-[54px] rounded-[20px] bg-white p-[50px]"
    >
      <FormHeader title="Login" />
      <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
        <TextInput
          id="email"
          label="Email"
          type="email"
          {...register("email")}
        />
        <PasswordInput
          id="password"
          label="Password"
          {...register("password")}
        />
      </div>
      <LoginButton />
    </form>
  );
};

const LoginButton = () => {
  return (
    <button className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md">
      Login to your account
    </button>
  );
};

export default LoginForm;
