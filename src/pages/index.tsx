import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Image
            src="/images/brand_logo.svg"
            width={240}
            height={76}
            alt="Logo"
          />
          <h1 className="display-lg text-white">
            Display Large - Roboto 57/64 . 0
          </h1>
          <h1 className="display-md text-white">
            Display Large - Roboto 45/52 . 0
          </h1>
          <h1 className="display-sm text-white">
            Display Large - Roboto 36/44 . 0
          </h1>
        </div>
      </main>
    </>
  );
}
