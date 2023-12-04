import axios from "axios";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormHeader from "~/components/Forms/FormHeader";
import PasswordInput from "~/components/Forms/Inputs/PasswordInput";
import TextInput from "~/components/Forms/Inputs/TextInput";
import Logo from "~/components/Logo";
import NeedHelpFAB from "~/components/NeedHelpFAB";

type Inputs = {
  email: string;
  password: string;
};

const login = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/users/auth",
      method: "POST",
      data,
    };

    const response = await axios.request(reqOptions);
    console.log(response.data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />

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

        <Footer />
      </div>
      <NeedHelpFAB />
    </main>
  );
};

const LoginButton = () => {
  return (
    <button className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md">
      Login to your account
    </button>
  );
};

const Footer = () => {
  return (
    <>
      <div className="text-white">
        <span className="label-lg">New to RAC Logistics? </span>
        <Link
          href="/register"
          className="label-lg px-[12px] py-[10px] text-primary-200 hover:underline"
        >
          Sign up
        </Link>
      </div>
      <a
        href="#"
        className="label-lg relative px-[12px] py-[10px] text-primary-200 hover:underline"
      >
        Forgot your password?
      </a>
    </>
  );
};

export default login;
