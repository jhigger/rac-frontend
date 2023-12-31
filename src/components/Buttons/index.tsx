import {
  ArrowCircleLeft2,
  ArrowCircleRight2,
  Bag,
  CloseCircle,
  SaveAdd,
  TickCircle,
  Wallet,
} from "iconsax-react";
import { useTabContext } from "~/contexts/TabContext";

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

type BackButtonProps = { onClick: () => void };

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ArrowCircleLeft2 size={18} variant="Bold" className="text-primary-600" />
      <span className="body-lg text-primary-600">Back</span>
    </button>
  );
};

export const SaveAsDraftButton = () => {
  const { handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("drafts");
  };

  return (
    <button
      onClick={onClick}
      aria-label="Save as Draft"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-secondary-100 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <SaveAdd size={18} variant="Bold" className="text-primary-600" />
      <span className="body-lg text-secondary-900">Save as Draft</span>
    </button>
  );
};

type ProceedButtonProps = { label?: string; onClick: () => void };

export const ProceedButton = ({
  label = "Proceed",
  onClick,
}: ProceedButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Proceed"
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ArrowCircleRight2 size={18} variant="Bold" />
      <span className="body-lg text-white">{label}</span>
    </button>
  );
};

type DoneButtonProps = { handleFinish: () => void };

export const DoneButton = ({ handleFinish }: DoneButtonProps) => {
  return (
    <button
      onClick={handleFinish}
      aria-label="Done"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <TickCircle size={18} variant="Bold" />
      <span className="body-lg text-white">Done</span>
    </button>
  );
};

type DeleteButtonIconProps = {
  onClick: () => void;
};

export const DeleteButtonIcon = ({ onClick }: DeleteButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Delete"
      className="btn relative flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      <Bag variant="Bold" className="text-error-600" />
    </button>
  );
};

type DeleteItemButtonProps = {
  onClick: () => void;
};

export const DeleteItemButton = ({ onClick }: DeleteItemButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Delete Item"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-error-600 md:px-6"
    >
      <Bag size={18} variant="Bold" className="text-error-600" />
      <span>Delete Item</span>
    </button>
  );
};
