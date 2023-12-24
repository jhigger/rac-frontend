import { CloseCircle, Wallet } from "iconsax-react";

export type CloseButtonProps = { dataClose: string; onClick?: () => void };

export const CloseButton = ({ dataClose, onClick }: CloseButtonProps) => {
  return (
    <button
      aria-label="Back"
      onClick={onClick}
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <CloseCircle size="18" variant="Bold" />
      <span className="label-lg text-white">Close</span>
    </button>
  );
};

type PayNowButtonProps = { onClick: () => void };

export const PayNowButton = ({ onClick }: PayNowButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Pay Now"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Wallet size={18} variant="Bold" />
      <span className="body-lg text-white">Pay Now</span>
    </button>
  );
};
