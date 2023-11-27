import Image from "next/image";

const login = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Image
          src="/images/brand_logo.svg"
          width={240}
          height={76}
          alt="Logo"
        />

        <form className="mb-[30px] mt-[100px] flex w-full max-w-[658px] flex-col items-center justify-center gap-[54px] rounded-[20px] bg-white p-[50px]">
          <h1 className="title-lg uppercase text-gray-500">Login</h1>
          <div className="flex w-full max-w-[500px] flex-col gap-[30px]">
            <EmailInput />
            <PasswordInput />
          </div>
          <LoginButton />
        </form>

        <div className="text-white">
          <span className="label-lg">New to RAC Logistics? </span>
          <a href="#" className="label-lg px-[12px] py-[10px] text-primary-200">
            Sign up
          </a>
        </div>
        <a
          href="#"
          className="label-lg relative px-[12px] py-[10px] text-primary-200"
        >
          Forgot your password?
        </a>
      </div>
    </main>
  );
};

const EmailInput = () => {
  return (
    <div className="relative flex flex-col">
      <input
        type="email"
        aria-label="Email"
        name="email"
        id="email"
        className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
        placeholder=""
      />

      <label
        htmlFor="email"
        className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:px-1 peer-focus:text-primary-600"
      >
        Email
      </label>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

const PasswordInput = () => {
  return (
    <div className="relative flex flex-col">
      <div className="relative z-0">
        <button className="absolute right-4 top-4 z-10" type="button">
          <span className="material-icons-outlined">visibility_off</span>
        </button>

        <input
          type="password"
          aria-label="Password"
          name="password"
          id="password"
          className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 py-2 pl-4 pr-14 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
          placeholder=" "
        />

        <label
          htmlFor="password"
          className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:text-primary-600"
        >
          Password
        </label>
      </div>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

const LoginButton = () => {
  return (
    <button className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md">
      Login to your account
    </button>
  );
};

export default login;
