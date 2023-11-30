/* eslint-disable @next/next/no-img-element */
type AccordionButtonProps = { open: boolean; toggle: () => void };

const AccordionButton = ({ open, toggle }: AccordionButtonProps) => {
  return (
    <button
      aria-label={open ? "collapse" : "expand"}
      onClick={toggle}
      className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      {open ? (
        <img
          src="/images/arrow_circle_up_icon.svg"
          alt="arrow circle up icon"
        />
      ) : (
        <img
          src="/images/arrow_circle_up_icon.svg"
          alt="arrow circle up icon"
          className="rotate-180"
        />
      )}
    </button>
  );
};

export default AccordionButton;
