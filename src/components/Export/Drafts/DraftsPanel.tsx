import React from "react";
import Balancer from "react-wrap-balancer";
import {
  DraftTableBody,
  DraftTableHead,
  tableHeads,
} from "~/components/Import/Drafts/DraftsPanel";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { TableFooter } from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import SearchBar from "~/components/Shop/SearchBar";
import { useExportContext } from "~/contexts/ExportContext";

const ExportDraftsPanel = () => {
  const { draftItems } = useExportContext();

  if (draftItems) {
    return (
      <TabContentLayout>
        <SearchBar />
        <DraftsTable />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don&apos;t have any export request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const DraftsTable = () => {
  const { draftItems } = useExportContext();

  if (!draftItems) return;

  return (
    <div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-white p-[20px]">
      <div className="flex flex-col gap-[20px]">
        <div className="overflow-x-scroll ">
          <table className="relative w-full min-w-max table-auto text-left">
            <DraftTableHead th={tableHeads} />
            <DraftTableBody draftItems={draftItems} />
          </table>
        </div>
      </div>
      <TableFooter />
    </div>
  );
};

export default ExportDraftsPanel;
