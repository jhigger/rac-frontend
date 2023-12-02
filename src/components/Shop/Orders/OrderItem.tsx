import { useShopContext, type OrderItemType } from "~/contexts/ShopContext";
/* eslint-disable @next/next/no-img-element */

type OrderItemProps = { order: OrderItemType };

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="flex w-full flex-col gap-[17px] rounded-[20px] bg-white p-[20px]">
      <OrderItemHeader orderStatus={order.orderStatus} action="responded" />
      <OrderItemImages images={order.images} />
      <div className="label-lg flex items-center gap-[20px] py-[10px] text-neutral-900">
        <span className="font-bold">Order Request Date:</span>
        <span className="text-secondary-600">23rd Jan 2023</span>
      </div>
    </div>
  );
};

type OrderItemHeaderProps = OrderStatusProps & {
  action: OrderItemType["orderStatus"];
};

export const OrderItemHeader = ({
  orderStatus: status,
  action,
}: OrderItemHeaderProps) => {
  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center gap-[15px]">
          <LabelId label="Request ID:" id="OD78667" />
          <div className="hidden items-center gap-[10px] md:flex">
            <OrderStatus orderStatus={status} />
            {status === action && <TakeActionNowButton />}
          </div>
        </div>
        <div className="flex flex-grow justify-end">
          <MoreButton />
        </div>
      </div>

      {/* for mobile screen */}
      <div className="flex items-center justify-between md:hidden">
        <OrderStatus orderStatus={status} />
        {status === "responded" && <TakeActionNowButton />}
      </div>
    </>
  );
};

type LabelIdProps = { label: string; id: string };

export const LabelId = ({ label, id }: LabelIdProps) => {
  return (
    <div className="title-lg md:headline-sm flex items-center gap-[5px] text-neutral-900">
      <span>{label}</span>
      <span className="font-bold">{id}</span>
    </div>
  );
};

type OrderItemImagesProps = Pick<OrderItemType, "images">;

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

export const MoreButton = () => {
  return (
    <button className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
      <img src="/images/more_icon.svg" alt="more icon" />
    </button>
  );
};

type OrderStatusProps = Pick<OrderItemType, "orderStatus">;

const OrderStatus = ({ orderStatus: status }: OrderStatusProps) => {
  return (
    <div className="flex w-full items-center gap-[5px]">
      {status === "responded" && <RespondedStatus />}
      {status === "processed" && <ProcessedStatus />}
      {status === "not responded" && <UnprocessedStatus />}
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

const TakeActionNowButton = () => {
  const {
    activeTab,
    handleActiveAction,
    handleOrderAction,
    handleRequestAction,
  } = useShopContext();

  const onClick = {
    orders: () => handleOrderAction(true),
    requests: () => {
      handleRequestAction(true);
      handleActiveAction("order details");
    },
    draft: () => null,
  };

  return (
    <button
      onClick={onClick[activeTab]}
      aria-label="Take Action Now"
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

export default OrderItem;