import { type ChangeEventHandler } from "react";

type TextAreaInputProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

const TextAreaInput = ({ id, label, value, onChange }: TextAreaInputProps) => {
  return (
    <div className="relative flex w-full flex-col">
      <textarea
        aria-label={label}
        name={id}
        id={id}
        className="peer relative block h-[144px] w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
        placeholder=" "
        value={value}
        onChange={onChange}
      />

      <label className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:px-1 peer-focus:text-primary-600">
        {label}
      </label>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default TextAreaInput;
