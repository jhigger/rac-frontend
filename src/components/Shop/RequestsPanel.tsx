/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { useTabsContext } from "~/contexts/TabsContext";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";
import OrderItem from "./OrderItem";

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

export default RequestsPanel;
