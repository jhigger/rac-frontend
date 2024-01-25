import { CloseCircle } from "iconsax-react";
import { useEffect } from "react";
import tailmater from "~/js/tailmater";

type PrimaryCloseModalButtonProps = {
  dataClose: string;
};

export const PrimaryCloseModalButton = ({
  dataClose,
}: PrimaryCloseModalButtonProps) => {
  useEffect(() => {
    tailmater();
  }, []);

  return (
    <button
      type="button"
      aria-label={"Close"}
      data-close={dataClose}
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <CloseCircle size={18} variant="Bold" className="flex-shrink-0" />
      <span className="label-lg whitespace-nowrap text-white">Close</span>
    </button>
  );
};
