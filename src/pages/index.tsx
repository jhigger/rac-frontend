"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "~/components/Logo";
import { useAuthContext } from "~/contexts/AuthContext";

type route = { href: string; title: string };
const routes: route[] = [
  { href: "/login", title: "Login" },
  { href: "/register", title: "Register" },
  { href: "/shop", title: "Shop" },
];

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.replace("/login").catch((e) => console.log(e));
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />
        <nav className="m-4 flex gap-4 rounded-lg bg-surfacedark-500 px-4 py-2 text-white">
          {routes.map(({ href, title }) => {
            return (
              <Link key={href} href={href} className="hover:underline">
                {title}
              </Link>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
