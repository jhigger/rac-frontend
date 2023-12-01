/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { useTabsContext } from "~/contexts/TabsContext";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import OrderItem from "./OrderItem";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";
import RequestDetails from "./RequestDetails";

const RequestsPanel = () => {
  const { requestedOrders, requestOrderClicked, requestActionClicked } =
    useTabsContext();

  if (requestActionClicked) {
    return (
      <TabContentLayout>
        <RequestDetails />
      </TabContentLayout>
    );
  }

  if (requestOrderClicked) {
    return (
      <TabContentLayout>
        <RequestOrderForm />
      </TabContentLayout>
    );
  }

  if (requestedOrders) {
    return (
      <TabContentLayout>
        <SearchBar />
        <div className="flex flex-col gap-[20px] sm:w-max">
          {requestedOrders.map((order) => {
            return <OrderItem key={order.id} order={order} />;
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
            You have not requested for any shop for me order before, would you
            like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default RequestsPanel;
