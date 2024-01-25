import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-full rounded-[20px] bg-neutral-800 px-[16px] py-[14px] text-neutral-50 md:max-w-[344px]",
        },
      }}
      position="top-center"
      closeButton
    />
  );
};

export default Toaster;
