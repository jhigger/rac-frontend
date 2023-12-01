/* eslint-disable @next/next/no-img-element */
import { useTabsContext } from "~/contexts/TabsContext";

const RequestOrderButton = () => {
  const { handleRequestOrder } = useTabsContext();

  return (
    <button
      onClick={() => {
        handleRequestOrder(true);
      }}
      aria-label="Request new order"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/shop_bold_icon.svg" alt="shop bold icon" />
      <span>Request new order</span>
    </button>
  );
};

export default RequestOrderButton;
