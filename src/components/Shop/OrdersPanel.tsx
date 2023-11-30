/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { useTabsContext, type OrderItemType } from "~/contexts/TabsContext";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import { OrderItemHeader, OrderItemImages } from "./OrderItem";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";

const OrdersPanel = () => {
  const { orderItems, requestOrderClicked, handleRequests, handleTabChange } =
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
    <div className="flex w-full flex-col gap-[17px] rounded-[20px] bg-white p-[20px]">
      <OrderItemHeader state={order.state} />
      <OrderItemImages images={order.images} />
      <div className="grid grid-cols-2 gap-[15px]">
        <div className="col-span-1 flex flex-col gap-[20px]">
          <div className="label-lg grid grid-cols-2 gap-[20px] py-[10px] text-neutral-900">
            <span className="font-bold">Order Request Date:</span>
            <span className="text-secondary-600">23rd Jan 2023</span>
          </div>
          <div className="label-lg grid grid-cols-2 gap-[20px] py-[10px] text-neutral-900">
            <span className="font-bold">Shop for me status:</span>
            <span className="text-secondary-600">Purchase In Progress</span>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-[20px]">
          <div className="label-lg grid grid-cols-2 gap-[20px] py-[10px] text-neutral-900">
            <span className="font-bold">Shop For Me Cost:</span>
            <span className="flex items-center gap-[10px] text-secondary-600">
              <img
                src="/images/tick_square_bold_icon.svg"
                alt="tick square bold icon"
              />
              <span>$48.00</span>
            </span>
          </div>
          <div className="label-lg grid grid-cols-2 gap-[20px] py-[10px] text-neutral-900">
            <span className="font-bold">Shop For Me Cost:</span>
            <span className="flex items-center gap-[10px] text-secondary-600">
              <img src="/images/more_bold_icon.svg" alt="more bold icon" />
              <span>$48.00</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPanel;
