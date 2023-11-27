import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Image
          src="/images/brand_logo.svg"
          width={240}
          height={76}
          alt="Logo"
        />
      </div>
    </main>
  );
}
