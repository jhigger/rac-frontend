/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import RequestOrderButton from "./RequestOrderButton";
import TabContentLayout from "./TabContentLayout";

const DraftPanel = () => {
  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don’t have any shop for me request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default DraftPanel;
