import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "~/components/Logo";
import { useAuthContext } from "~/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    router.push("/shop");
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />
      </div>
    </main>
  );
}
