/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { useTabsContext, type OrderItemType } from "~/contexts/TabsContext";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import { OrderItemHeader, OrderItemImages } from "./OrderItem";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";
import OrderDetails from "./OrderDetails";

const OrdersPanel = () => {
  const { orderItems, orderActionClicked, requestOrderClicked } =
    useTabsContext();

  // request order in search bar
  if (requestOrderClicked) {
    return (
      <TabContentLayout>
        <RequestOrderForm />
      </TabContentLayout>
    );
  }

  if (orderActionClicked) {
    return (
      <TabContentLayout>
        <OrderDetails />
      </TabContentLayout>
    );
  }

  if (orderItems) {
    return (
      <TabContentLayout>
        <SearchBar />
        <div className="flex flex-col gap-[20px] sm:w-max">
          {orderItems.map((order) => {
            return <UnprocessedOrder key={order.id} order={order} />;
          })}
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
            You have not placed any shop for me order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

type UnprocessedOrderProps = { order: OrderItemType };

const UnprocessedOrder = ({ order }: UnprocessedOrderProps) => {
  return (
    <div className="flex gap-[10px]">
      <div className="flex w-full flex-col gap-[27px] rounded-[20px] bg-white p-[20px]">
        <OrderItemHeader state={order.state} action={"not responded to"} />
        <OrderItemImages images={order.images} />
        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-[15px]">
            <div className="label-lg grid grid-cols-2 gap-[20px] text-neutral-900">
              <span className="font-bold">Order Request Date:</span>
              <span className="text-secondary-600">23rd Jan 2023</span>
            </div>
            <div className="label-lg grid grid-cols-2 gap-[20px] text-neutral-900">
              <span className="font-bold">Shop for me status:</span>
              <span className="text-secondary-600">Purchase In Progress</span>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-[15px]">
            <div className="label-lg grid grid-cols-2 gap-[20px] text-neutral-900">
              <span className="font-bold">Shop For Me Cost:</span>
              <span className="flex items-center gap-[10px] text-secondary-600">
                <img
                  src="/images/tick_square_bold_icon.svg"
                  alt="tick square bold icon"
                />
                <span>$48.00</span>
              </span>
            </div>
            <div className="label-lg grid grid-cols-2 gap-[20px] text-neutral-900">
              <span className="font-bold">Shop For Me Cost:</span>
              <span className="flex items-center gap-[10px] text-secondary-600">
                <img src="/images/more_bold_icon.svg" alt="more bold icon" />
                <span>$48.00</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-max flex-col gap-[17px] rounded-[20px] bg-white p-[20px]">
        <div className="headline-sm flex w-max items-center gap-[5px] text-neutral-900">
          <button
            aria-label="tracking"
            className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[88px] border border-gray-500 bg-white px-[14px] py-[10px] text-sm font-medium tracking-[.00714em] text-white"
          >
            <img src="/images/tracking_icon_purple.svg" alt="tracking icon" />
          </button>
          <span>Tracking ID:</span>
          <span className="font-bold">SH78667</span>
        </div>
        <div className="flex h-[164px] rounded-[20px] bg-primary-900 px-[20px] py-[10px] text-white">
          <hr className="h-[65px] border-r border-solid border-white" />
          <div className="flex flex-col">
            <div className="flex flex-col gap-[1px] pl-[10px]">
              <span className="title-md font-bold">Origin:</span>
              <span className="label-lg">Nigeria</span>
            </div>
            <img
              src="/images/in_transit_image.svg"
              alt="in transit image"
              className="-my-2"
            />
            <div className="flex flex-col gap-[1px] self-end pr-[10px]">
              <span className="title-md font-bold">Origin:</span>
              <span className="label-lg">USA</span>
            </div>
          </div>
          <hr className="h-[65px] self-end border-r border-solid border-secondary-600" />
        </div>
        <div className="flex justify-between">
          <div className="flex w-full items-center gap-[5px]">
            <div className="h-[12px] w-[12px] rounded-full border-4 border-primary-900 bg-white"></div>
            <span className="label-lg font-bold text-primary-600">
              Arrived Destination
            </span>
          </div>
          <span className="w-max">
            <ClearPackageButton />
          </span>
        </div>
      </div>
    </div>
  );
};

const ClearPackageButton = () => {
  return (
    <button
      aria-label="Clear Package"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[88px] border border-gray-500 bg-white px-[14px] py-[10px] text-sm font-medium tracking-[.00714em] text-white"
    >
      <img
        src="/images/clipboard_tick_icon.svg"
        alt="security icon"
        className="h-4 w-4"
      />
      <span className="label-lg whitespace-nowrap text-primary-600">
        Clear Package
      </span>
    </button>
  );
};

export default OrdersPanel;
