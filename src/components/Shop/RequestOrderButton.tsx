/* eslint-disable @next/next/no-img-element */
import { useTabsContext } from "~/contexts/TabsContext";

const RequestOrderButton = () => {
  const { handleChange, tabsRef } = useTabsContext();

  return (
    <button
      onClick={() => {
        if (!tabsRef.current[1]) return;
        tabsRef.current[1].click();
        handleChange("requests");
      }}
      aria-label="Request new order"
      className="btn btn-elevated relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white shadow-lg md:px-6"
    >
      <img src="/images/shop_bold_icon.svg" alt="shop bold icon" />
      <span>Request new order</span>
    </button>
  );
};

export default RequestOrderButton;
