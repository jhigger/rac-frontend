import { AddSquare, MinusSquare } from "iconsax-react";
import {
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
  type Ref,
} from "react";
import { type UseFormGetValues, type UseFormSetValue } from "react-hook-form";
import { type Inputs } from "~/components/Shop/Requests/RequestOrder";

type QuantityInputProps = {
  id: string;
  index: number;
  label: string;
  setValue: UseFormSetValue<Inputs>;
  getValues: UseFormGetValues<Inputs>;
  value?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const QuantityInput = (
  { id, index, label, setValue, getValues, ...props }: QuantityInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  const handleSubtract = () => {
    const prev = getValues(`requestItems.items.${index}.quantity`) ?? 0;
    if (prev <= 1) return;
    const value = prev - 1;
    setValue(`requestItems.items.${index}.quantity`, value);
  };

  const handleAdd = () => {
    const prev = getValues(`requestItems.items.${index}.quantity`) ?? 0;
    const value = prev + 1;
    setValue(`requestItems.items.${index}.quantity`, value);
  };

  return (
    <div className="relative flex w-full flex-col">
      <div className="relative z-0">
        <button
          type="button"
          onClick={handleSubtract}
          className="absolute left-2 top-2 z-10 flex items-center justify-center rounded-[6.25rem] p-2 hover:bg-surface-300 focus:bg-surface-400"
        >
          <MinusSquare size="24" color="#292d32" variant="Outline" />
        </button>

        <button
          type="button"
          onClick={handleAdd}
          className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-[6.25rem] p-2 hover:bg-surface-300 focus:bg-surface-400"
        >
          <AddSquare size="24" color="#292d32" variant="Outline" />
        </button>

        <input
          ref={ref}
          type="number"
          step="1"
          aria-label={label}
          name={id}
          id={id}
          className="relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-14 py-2 text-center leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
          placeholder=" "
          {...props}
          readOnly
        />

        <label className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300">
          {label}
        </label>
      </div>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
