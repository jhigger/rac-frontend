/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { MoreButton } from "~/components/Shop/Orders";
import {
  TableFooter,
  type TableHeadType,
} from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import SearchBar from "~/components/Shop/SearchBar";
import {
  useImportContext,
  type ImportDraftItemType,
} from "~/contexts/ImportContext";

const ImportDraftsPanel = () => {
  const { draftItems } = useImportContext();

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
            You don&apos;t have any import request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const tableHeads: TableHeadType[] = [
  { title: "Draft Date", sortIcon: true },
  { title: "Item", sortIcon: false },
  { title: "Origin", sortIcon: true },
];

const DraftsTable = () => {
  const { draftItems } = useImportContext();

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

type DraftTableHeadProps = { th: TableHeadType[] };

const DraftTableHead = ({ th }: DraftTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid w-full grid-cols-3 items-center gap-[20px] p-[20px] font-medium text-neutral-900">
      {th.map(({ title, sortIcon }) => {
        return (
          <tr key={title} className="col-span-1">
            <th className="flex items-center gap-[20px] whitespace-nowrap border-0 p-0">
              {title}
              {sortIcon && (
                <img
                  src="/images/arrow_swap_icon.svg"
                  alt="arrow swap icon"
                  className="self-end"
                />
              )}
            </th>
          </tr>
        );
      })}

      <tr className="col-span-1">
        <th className="border-0 p-0">Action</th>
      </tr>
    </thead>
  );
};

type DraftTableBody = {
  draftItems: ImportDraftItemType[];
};

const DraftTableBody = ({ draftItems }: DraftTableBody) => {
  return (
    <tbody className="flex flex-col bg-white px-[20px] [&>tr]:border-b-[1px] [&>tr]:border-gray-500 first:[&>tr]:border-t-[1px]">
      {draftItems.map(
        ({ draftDate, origin, packageDeliveryStatus, items }, i) => {
          return (
            <tr
              key={i}
              className="label-lg grid w-full grid-cols-3 items-center gap-[20px] font-medium [&>td]:border-0 [&>td]:px-0 [&>td]:py-[20px]"
            >
              <td className="col-span-1">{draftDate}</td>
              <td className="col-span-1 flex gap-[10px]">
                <div className="w-[62px] overflow-hidden rounded-[10px]">
                  <img src={items[0]?.images[0]} alt="item image" />
                </div>
              </td>
              <td className="col-span-1">{origin}</td>
              <td className="col-span-1">{packageDeliveryStatus}</td>

              <td className="border-0 p-0">
                <MoreButton />
              </td>
            </tr>
          );
        },
      )}
    </tbody>
  );
};

export default ImportDraftsPanel;
