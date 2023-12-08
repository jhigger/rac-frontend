/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { type ShopDraftItemType, useShopContext } from "~/contexts/ShopContext";
import TabContentLayout from "../../Layouts/TabContentLayout";
import { MoreButton } from "../Orders";
import { TableFooter, type TableHeadType } from "../Orders/OrdersPanel";
import RequestOrderButton from "../RequestOrderButton";
import SearchBar from "../SearchBar";

const DraftsPanel = () => {
  const { draftItems } = useShopContext();

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
            You don&apos;t have any shop for me request in your draft folder
            yet, would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const tableHeads: TableHeadType[] = [
  { title: "Draft Date", sortIcon: true },
  { title: "Item", sortIcon: true },
  { title: "Item URL", sortIcon: true },
  { title: "Item Cost from Store", sortIcon: true },
  { title: "Urgent Purchase", sortIcon: true },
  { title: "Quantity of items", sortIcon: true },
  { title: "Total value of item", sortIcon: true },
];

const DraftsTable = () => {
  const { draftItems } = useShopContext();

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
    <thead className="title-sm sticky top-0 z-10 grid w-full grid-cols-8 items-center gap-[20px] p-[20px] font-medium text-neutral-900">
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
  draftItems: ShopDraftItemType[];
};

const DraftTableBody = ({ draftItems }: DraftTableBody) => {
  return (
    <tbody className="flex flex-col bg-white px-[20px] [&>tr]:border-b-[1px] [&>tr]:border-gray-500 first:[&>tr]:border-t-[1px]">
      {draftItems.map(({ draftDate, origin, items }, i) => {
        if (items.length <= 0) return;

        return (
          <tr
            key={i}
            className="label-lg grid w-full grid-cols-8 items-center gap-[20px] font-medium [&>td]:border-0 [&>td]:px-0 [&>td]:py-[20px]"
          >
            <td className="col-span-1">{draftDate}</td>
            <td className="col-span-1 flex gap-[10px]">
              <div className="w-[62px] overflow-hidden rounded-[10px]">
                <img src={items[i]!.images[i]} alt="item image" />
              </div>
            </td>
            <td className="col-span-1">{origin}</td>

            <td className="border-0 p-0">
              <MoreButton />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default DraftsPanel;
