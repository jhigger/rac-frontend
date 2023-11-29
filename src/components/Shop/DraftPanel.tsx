/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { type PanelProps } from "~/pages/shop";
import RequestOrderButton from "./RequestOrderButton";
import TabContentLayout from "./TabContentLayout";

const DraftPanel = ({ handleChange }: PanelProps) => {
  return (
    <TabContentLayout>
      <div className="flex min-h-[calc(100vh-170px)] w-full flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don’t have any shop for me request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton handleChange={handleChange} />
      </div>
    </TabContentLayout>
  );
};

export default DraftPanel;
