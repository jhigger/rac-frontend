/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { MoreButton } from "~/components/Shop/Orders";
import ClearPackage from "~/components/Shop/Orders/ClearPackage";
import OrderDetails from "~/components/Shop/Orders/OrderDetails";
import {
  ImageColumn,
  ShippingStatus,
  TableFooter,
  type TableHeadType,
} from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import SearchBar from "~/components/Shop/SearchBar";
import {
  useImportContext,
  type ImportOrderItemType,
} from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import InitiateShipping from "./InitiateShipping";

const ImportOrdersPanel = () => {
  const { orderItems } = useImportContext();
  const { activeAction } = useTabContext();

  if (activeAction === "clear package") {
    return (
      <TabContentLayout>
        <ClearPackage />
      </TabContentLayout>
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
      <TabContentLayout>
        <OrderDetails />
      </TabContentLayout>
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
            You have not placed any import order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const tableHeads: TableHeadType[] = [
  { title: "Package(s) Image", sortIcon: false },
  { title: "Order ID", sortIcon: true },
  { title: "Order Status", sortIcon: false },
  { title: "Order Date", sortIcon: true },
  { title: "Tracking ID", sortIcon: true },
  { title: "Shipping Status", sortIcon: false },
  { title: "Shipping Cost", sortIcon: true },
];

const OrdersTable = () => {
  const { orderItems } = useImportContext();

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

type OrderTableHeadProps = { th: TableHeadType[] };

const OrderTableHead = ({ th }: OrderTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid grid-cols-[50px_repeat(8,1fr)] gap-[20px] p-[20px] font-medium text-neutral-900">
      <tr className="col-span-1 w-max">
        <th className="border-0 p-0">
          <input
            type="checkbox"
            name="check-all"
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
            checked={undefined}
          />
        </th>
      </tr>

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

type OrderTableBodyProps = {
  orderItems: ImportOrderItemType[];
};

const OrderTableBody = ({ orderItems }: OrderTableBodyProps) => {
  return (
    <tbody className="flex flex-col border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {orderItems.map(
        ({
          images,
          orderId,
          orderStatus,
          orderDate,
          shippingCost,
          shippingStatus,
          trackingId,
        }) => {
          return (
            <tr
              key={orderId}
              className="grid grid-cols-[50px_repeat(8,1fr)] items-center gap-[20px] bg-gray-10 px-[20px] py-[20px]"
            >
              <td className="border-0 p-0">
                <input
                  type="checkbox"
                  name={`check-${orderId}`}
                  className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
                  checked={undefined}
                />
              </td>
              <td className="border-0 p-0">
                <ImageColumn images={images} />
              </td>
              <td className="border-0 p-0">
                <p className="title-md whitespace-nowrap">{orderId}</p>
              </td>
              <td className="border-0 p-0">
                <p className="title-md whitespace-nowrap">{orderStatus}</p>
              </td>
              <td className="border-0 p-0">
                <p className="label-lg whitespace-nowrap text-neutral-900">
                  {orderDate}
                </p>
              </td>
              <td className="border-0 p-0">
                <p className="title-md text-primary-900">{trackingId}</p>
              </td>
              <td className="title-sm max-w-[150px] border-0 p-0">
                <ShippingStatus id={orderId} status={shippingStatus} />
              </td>
              <td className="flex gap-[5px] border-0 p-0">
                <img src="/images/more_bold_icon.svg" alt="more bold icon" />

                <p className="title-md">{shippingCost}</p>
              </td>
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

export default ImportOrdersPanel;
