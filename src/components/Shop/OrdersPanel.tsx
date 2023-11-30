/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { useTabsContext } from "~/contexts/TabsContext";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";

const OrdersPanel = () => {
  const { hasOrders, requestOrderClicked, handleTabChange, handleRequests } =
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

  if (hasOrders) {
    return (
      <TabContentLayout>
        <SearchBar />
        <div className="flex flex-col gap-[20px] sm:w-max">{/* todo */}</div>
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

export default OrdersPanel;
