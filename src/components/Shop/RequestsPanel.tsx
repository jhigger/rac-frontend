/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import RequestOrderButton from "./RequestOrderButton";
import TabContentLayout from "./TabContentLayout";

const RequestsPanel = () => {
  return (
    <TabContentLayout>
      <div className="flex flex-grow w-full flex-col items-center justify-center gap-[30px]">
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
