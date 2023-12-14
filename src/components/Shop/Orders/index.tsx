/* eslint-disable @next/next/no-img-element */
import { More } from "iconsax-react";
import useAccordion from "~/hooks/useAccordion";

type LabelIdProps = { label: string; id: string };

export const LabelId = ({ label, id }: LabelIdProps) => {
  return (
    <div className="title-lg md:headline-sm flex items-center gap-[5px] text-neutral-900">
      <span>{label}:</span>
      <span className="font-bold">{id}</span>
    </div>
  );
};

type OrderItemImagesProps = { images: string[] };

export const OrderItemImages = ({ images }: OrderItemImagesProps) => {
  return (
    <div className="flex w-max items-center gap-[10px] rounded-[20px] bg-surface-100 p-[10px]">
      <div className="hidden gap-[10px] sm:flex">
        {images.slice(0, 4).map((src) => {
          return (
            <img
              key={src}
              src={src}
              alt={src}
              className="w-[84px] rounded-[13px]"
            />
          );
        })}
      </div>
      <div className="flex sm:hidden">
        {images.slice(0, 1).map((src) => {
          return (
            <img
              key={src}
              src={src}
              alt={src}
              className="w-[84px] rounded-[13px]"
            />
          );
        })}
      </div>
      {images.length >= 5 && (
        <>
          <div className="label-lg hidden h-[84px] w-[84px] items-center p-[10px] text-secondary-600 sm:flex">{`${
            images.length - 4
          }+ more`}</div>
          {/* for mobile screen */}
          <div className="label-lg flex h-[84px] w-[84px] items-center p-[10px] text-secondary-600 sm:hidden">{`${
            images.length - 1
          }+ more`}</div>
        </>
      )}
    </div>
  );
};

type MoreButtonProps = { handleViewDetails: () => void };

export const MoreButton = ({ handleViewDetails }: MoreButtonProps) => {
  const { open, toggle } = useAccordion(false);

  const onClick = () => {
    toggle();
    handleViewDetails();
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggle}
        className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
      >
        <More className="text-error-600" />
      </button>

      {open && (
        <ul className="absolute right-0 top-12 z-50 inline-flex min-w-[200px] flex-col items-center justify-center rounded-[10px] bg-surface-200 shadow-md">
          <li className="w-full">
            <button className="w-full px-4 py-2" onClick={onClick}>
              View Details
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export const UnprocessedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="h-[12px] w-[12px] rounded-full border-2 border-error-600 bg-white"></div>

      <span className="label-lg font-bold text-primary-600">Not Responded</span>
    </div>
  );
};

export const ProcessedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="h-[12px] w-[12px] rounded-full border-2 border-primary-900 bg-primary-900"></div>

      <span className="label-lg font-bold text-primary-600">Processed</span>
    </div>
  );
};

export const RespondedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="h-[12px] w-[12px] rounded-full border-2 border-error-600 bg-white"></div>

      <span className="label-lg font-bold text-primary-600">Responded</span>
    </div>
  );
};
