import React from "react";
import Balancer from "react-wrap-balancer";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import TabContentLayout from "~/components/Shop/TabContentLayout";
import { useTabContext } from "~/contexts/TabContext";
import RequestOrder from "./RequestOrder";

const ImportRequestsPanel = () => {
  const { activeAction } = useTabContext();

  if (activeAction === "request new order") {
    return (
      <TabContentLayout>
        <RequestOrder />
      </TabContentLayout>
    );
  }
  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not requested for any import order before, would you like
            to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default ImportRequestsPanel;
