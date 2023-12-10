import React from "react";
import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import SearchBar from "~/components/Shop/SearchBar";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";

const AutoImportOrdersPanel = () => {
  const { orderItems } = useAutoImportContext();
  const { activeAction } = useTabContext();

  // todo:
  if (activeAction === "clear package") {
    // return (
    //   <TabContentLayout>
    //     <ClearPackage />
    //   </TabContentLayout>
    // );
  }

  // todo:
  if (activeAction === "initiate shipping") {
    // return (
    //   <TabContentLayout>
    //     <InitiateShipping />
    //   </TabContentLayout>
    // );
  }

  // todo:
  if (activeAction === "order details") {
    // return (
    //   <TabContentLayout>
    //     <OrderDetails />
    //   </TabContentLayout>
    // );
  }

  // todo:
  if (orderItems) {
    return (
      <TabContentLayout>
        <SearchBar />
        {/* <OrdersTable /> */}
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not placed any auto import order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default AutoImportOrdersPanel;
