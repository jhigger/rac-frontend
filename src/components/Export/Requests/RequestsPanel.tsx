import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { TableFooter } from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import {
  RequestTableBody,
  RequestTableHead,
  tableHeads,
} from "~/components/Shop/Requests/RequestsPanel";
import SearchBar from "~/components/Shop/SearchBar";
import { useExportContext } from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import RequestOrder from "./RequestOrder";

const ExportRequestsPanel = () => {
  const { requestItems } = useExportContext();
  const { activeAction } = useTabContext();

  if (activeAction === "request new order") {
    return (
      <TabContentLayout>
        <RequestOrder />
      </TabContentLayout>
    );
  }

  // todo:
  if (activeAction === "request details") {
    return (
      <TabContentLayout>
        <>{/* <RequestDetails /> */}</>
      </TabContentLayout>
    );
  }

  // todo:
  if (activeAction === "proceed to checkout") {
    return (
      <TabContentLayout>
        <>{/* <RequestCheckout /> */}</>
      </TabContentLayout>
    );
  }

  if (requestItems) {
    return (
      <TabContentLayout>
        <SearchBar />
        <RequestsTable />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not requested for any export order before, would you like
            to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const RequestsTable = () => {
  const { requestItems } = useExportContext();

  if (!requestItems) return;

  return (
    <div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-white p-[10px] md:p-[20px]">
      <div className="flex flex-col gap-[20px]">
        <div className="overflow-x-scroll ">
          <table className="relative w-full min-w-max table-auto text-left">
            <RequestTableHead th={tableHeads} />
            <RequestTableBody requestItems={requestItems} />
          </table>
        </div>
      </div>
      <TableFooter />
    </div>
  );
};

export default ExportRequestsPanel;
