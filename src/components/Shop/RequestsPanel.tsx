/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { useTabsContext } from "~/contexts/TabsContext";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";

const RequestsPanel = () => {
  const { hasRequests, requestOrderClicked, handleTabChange, handleRequests } =
    useTabsContext();

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
  };

  const handleBack = () => {
    handleTabChange("requests");
  };

  if (requestOrderClicked) {
    return (
      <TabContentLayout>
        <RequestOrderForm {...{ handleBack, handleFinish }} />
      </TabContentLayout>
    );
  }

  if (hasRequests) {
    return (
      <TabContentLayout>
        <SearchBar />
        <div className="flex flex-col gap-[20px] sm:w-max">
          <OrderItem state="responded" />
          <OrderItem state="processed" />
          <OrderItem state="not responded to" />
        </div>
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not requested for any shop for me order before, would you
            like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const STATES = ["responded", "processed", "not responded to"] as const;

type OrderItemProps = {
  state: (typeof STATES)[number];
};

const OrderItem = ({ state }: OrderItemProps) => {
  const images = Array(6)
    .fill(null)
    .map((_, i) => {
      return `https://placehold.co/500x500/cac4d0/1d192b?text=Image ${i}`;
    });

  return (
    <div className="flex w-full flex-col gap-[17px] rounded-[20px] bg-white p-[20px]">
      <OrderItemHeader state={state} />
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
      <div className="label-lg flex items-center gap-[20px] py-[10px] text-neutral-900">
        <span className="font-bold">Order Request Date:</span>
        <span className="text-secondary-600">23rd Jan 2023</span>
      </div>
    </div>
  );
};

type OrderItemHeaderProps = OrderItemProps;

const OrderItemHeader = ({ state }: OrderItemHeaderProps) => {
  const handleTakeAction = () => {
    return;
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center gap-[15px]">
          <div className="headline-sm flex items-center gap-[5px] text-neutral-900">
            <span>Order ID:</span>
            <span className="font-bold">OD78667</span>
          </div>
          <div className="hidden items-center gap-[10px] md:flex">
            <OrderState state={state} />
            {state === "responded" && (
              <TakeActionNowButton handleTakeAction={handleTakeAction} />
            )}
          </div>
        </div>
        <div className="flex flex-grow justify-end">
          <MoreButton />
        </div>
      </div>

      {/* for mobile screen */}
      <div className="flex items-center justify-between md:hidden">
        <OrderState state={state} />
        {state === "responded" && (
          <TakeActionNowButton handleTakeAction={handleTakeAction} />
        )}
      </div>
    </>
  );
};

const MoreButton = () => {
  return (
    <button className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
      <img src="/images/more_icon.svg" alt="more icon" />
    </button>
  );
};

type OrderStateProps = OrderItemHeaderProps;

const OrderState = ({ state }: OrderStateProps) => {
  return (
    <div className="flex w-full items-center gap-[5px]">
      {state === "responded" && (
        <>
          <div className="h-[12px] w-[12px] rounded-full border-2 border-error-600 bg-white"></div>

          <span className="label-lg font-bold text-primary-600">Responded</span>
        </>
      )}
      {state === "processed" && (
        <>
          <div className="h-[12px] w-[12px] rounded-full border-2 border-primary-900 bg-primary-900"></div>

          <span className="label-lg font-bold text-primary-600">Processed</span>
        </>
      )}
      {state === "not responded to" && (
        <>
          <div className="h-[12px] w-[12px] rounded-full border-2 border-error-600 bg-white"></div>

          <span className="label-lg font-bold text-primary-600">
            Not Responded to
          </span>
        </>
      )}
    </div>
  );
};

type TakeActionNowButtonProps = { handleTakeAction: () => void };

const TakeActionNowButton = ({
  handleTakeAction,
}: TakeActionNowButtonProps) => {
  return (
    <button
      onClick={handleTakeAction}
      aria-label="Preview Item"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[88px] border border-gray-500 bg-white px-[14px] py-[10px] text-sm font-medium tracking-[.00714em] text-white"
    >
      <img
        src="/images/security_icon.svg"
        alt="security icon"
        className="h-4 w-4"
      />
      <span className="label-lg whitespace-nowrap text-primary-600">
        Take Action Now
      </span>
    </button>
  );
};

export default RequestsPanel;
