import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { handleUser } = useAuthContext();

  const { register, handleSubmit } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    alert(JSON.stringify(data, null, 2));
    const userData = {
      _id: "656bcb107c2bc6d6453efc71",
      country: "Country A",
      countryCode: "+1",
      email: "john@example.com",
      isAdmin: false,
      firstName: "john",
      lastName: "Doe",
    };
    handleUser(userData);

    // const response = await axios.post(
    //   "https://rac-backend.onrender.com/api/users/auth",
    //   {
    //     data: {
    //       email: "email@gmail.com",
    //       password: "password",
    //     },
    //     headers: {
    //       accept: "Accept: */*",
    //     },
    //   },
    // );
    // console.log(response.data);
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
