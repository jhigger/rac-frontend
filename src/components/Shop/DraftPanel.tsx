/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import TabContentLayout from "./TabContentLayout";

const DraftPanel = () => {
  return (
    <TabContentLayout>
      <div className="flex min-h-[calc(100vh-170px)] w-full flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don’t have any shop for me request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <button
          aria-label="Request new order"
          className="btn btn-elevated relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white shadow-lg md:px-6"
        >
          <img src="/images/shop_bold_icon.svg" alt="shop bold icon" />
          <span>Request new order</span>
        </button>
      </div>
    </TabContentLayout>
  );
};

export default DraftPanel;
