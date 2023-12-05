import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";
import axios from "axios";

type LoginInputs = {
  email: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = async () => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email: "email@gmail.com",
    password: "password",
  });

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/users/auth",
    method: "POST",
    headers: headersList,
    data: bodyContent,
    withCredentials: true, // <--- it errors when i put this but browser needs this to receive cookie jwt (json web token)
  };
  // CORS error: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
  // user needs jwt after login to use backend
  // jwt is stored in cookie
  // cookie is stored in browser

  const response = await axios.request(reqOptions);
  console.log(response.data);

  // function getCookie(name: string) {
  //   function escape(s: string) {
  //     return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  //   }
  //   const match = document.cookie.match(
  //     RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"),
  //   );
  //   return match ? match[1] : null;
  // }

  // console.log(getCookie("jwt"));

  // const profile = await axios.request({
  //   url: "https://rac-backend.onrender.com/api/users/profile",
  //   method: "GET",
  //   headers: {
  //     Accept: "*/*",
  //   },
  //   withCredentials: true,
  // });
  // console.log(profile.data);
};

const LoginForm = () => {
  const { handleUser } = useAuthContext();

  const { register, handleSubmit } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    alert(JSON.stringify(data, null, 2));
    const userData = {
      _id: "656bcb107c2bc6d6453efc71",
      firstName: "john",
      lastName: "Doe",
      email: "john@example.com",
      isAdmin: false,
    };
    handleUser(userData);
    // await test();
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
