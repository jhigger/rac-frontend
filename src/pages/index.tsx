import Logo from "~/components/Logo";
import { useAuthContext } from "~/contexts/AuthContext";

export default function Home() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />
      </div>
    </main>
  );
}
