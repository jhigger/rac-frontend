import Link from "next/link";
import LoginForm from "~/components/Forms/Login/LoginForm";
import Logo from "~/components/Logo";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { useAuthContext } from "~/contexts/AuthContext";

const login = () => {
  const { user } = useAuthContext();

  if (user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />

        <LoginForm />

        <Footer />
      </div>
      <NeedHelpFAB />
    </main>
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
