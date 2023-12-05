import React from "react";
import Balancer from "react-wrap-balancer";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import TabContentLayout from "~/components/Shop/TabContentLayout";

const ImportDraftsPanel = () => {
  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don&apos;t have any import request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default ImportDraftsPanel;
