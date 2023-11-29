/* eslint-disable @next/next/no-img-element */
import { type ChangeEventHandler, type HTMLInputTypeAttribute } from "react";

type FileInputProps = {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const FileInput = ({ id, label, value, onChange }: FileInputProps) => {
  let filename;
  if (value) {
    if (value.length > 0) {
      filename = value;
    }
  }

  return (
    <div className="relative flex w-full flex-col">
      <label
        htmlFor={id}
        className="body-sm mb-1 pl-[11px] tracking-[.03125em] text-gray-500"
      >
        {label}
      </label>
      <div className="btn-segmented inline-flex w-full flex-row items-center">
        <div className="segmented-item active btn-outline relative inline-flex h-10 w-1/2 flex-row items-center justify-center gap-x-2 !rounded-l-[4px] border border-gray-500 py-2.5 [&.active]:bg-secondary-100">
          <input
            type="file"
            aria-label={label}
            name={id}
            id={id}
            onChange={onChange}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <div className="label-lg flex items-center gap-[8px] text-secondary-900">
            <img src="/images/upload_icon.svg" alt="menu icon" />
            <span>Choose file</span>
          </div>
        </div>
        <div className="segmented-item label-lg relative inline-flex h-10 w-1/2 flex-row items-center justify-center gap-x-2 border border-gray-500 py-2.5 text-neutral-900">
          {filename ?? "No file chosen"}
        </div>
      </div>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default FileInput;
