import Logo from "~/components/Logo";

const LoadingScreen = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />
        <LoadingSpinner />
      </div>
    </main>
  );
};

const LoadingSpinner = () => {
  return (
    <svg className="circular-loader relative h-[100px] w-[100px]">
      <circle
        className="path stroke-primary-600 dark:stroke-primary-200"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeMiterlimit="10"
      ></circle>
    </svg>
  );
};

export default LoadingScreen;
