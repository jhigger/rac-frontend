import {
  forwardRef,
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
  type Ref,
} from "react";

type PasswordInputProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const PasswordInput = (
  { id, label, ...props }: PasswordInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col">
      <div className="relative z-0">
        <button
          className="absolute right-4 top-4 z-10"
          type="button"
          onClick={toggleVisibility}
        >
          <span className="material-icons-outlined">
            {show ? "visibility" : "visibility_off"}
          </span>
        </button>

        <input
          ref={ref}
          type={show ? "text" : "password"}
          aria-label={label}
          name={id}
          id={id}
          className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 py-2 pl-4 pr-14 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
          placeholder=" "
          {...props}
        />

        <label
          htmlFor={id}
          className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:text-primary-600"
        >
          {label}
        </label>
      </div>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default forwardRef(PasswordInput);
