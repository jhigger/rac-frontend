import Balancer from "react-wrap-balancer";
import {
  OrderTableBody,
  OrderTableHead,
  tableHeads,
} from "~/components/Import/Orders/OrdersPanel";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { TableFooter } from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import SearchBar from "~/components/Shop/SearchBar";
import { useExportContext } from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import InitiateShipping from "./InitiateShipping";

const ExportOrdersPanel = () => {
  const { orderItems } = useExportContext();
  const { activeAction } = useTabContext();

  if (activeAction === "clear package") {
    return (
      <>No UI</>
      // <TabContentLayout>
      //   <ClearPackage />
      // </TabContentLayout>
    );
  }

  if (activeAction === "initiate shipping") {
    return (
      <TabContentLayout>
        <InitiateShipping />
      </TabContentLayout>
    );
  }

  if (activeAction === "order details") {
    return (
      <>No UI</>
      // <TabContentLayout>
      //   <OrderDetails />
      // </TabContentLayout>
    );
  }

  if (orderItems) {
    return (
      <TabContentLayout>
        <SearchBar />
        <OrdersTable />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not placed any export order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const OrdersTable = () => {
  const { orderItems } = useExportContext();
  if (!orderItems) return;

  return (
    <div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-white p-[20px]">
      <div className="flex flex-col gap-[20px]">
        <div className="overflow-x-scroll ">
          <table className="relative w-full min-w-max table-auto text-left">
            <OrderTableHead th={tableHeads} />
            <OrderTableBody orderItems={orderItems} />
          </table>
        </div>
      </div>
      <TableFooter />
    </div>
  );
};

export default ExportOrdersPanel;
