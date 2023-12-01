/* eslint-disable @next/next/no-img-element */
import { type ChangeEventHandler } from "react";
import Balancer from "react-wrap-balancer";
import { useTabsContext, type OrderItemType } from "~/contexts/TabsContext";
import { orders } from "~/fake data";
import RequestOrderForm from "../Forms/RequestOrderForm";
import NeedHelpFAB from "../NeedHelpFAB";
import OrderDetails from "./OrderDetails";
import { MoreButton } from "./OrderItem";
import RequestOrderButton from "./RequestOrderButton";
import SearchBar from "./SearchBar";
import TabContentLayout from "./TabContentLayout";

const OrdersPanel = () => {
  const { orderItems, orderActionClicked, requestOrderClicked } =
    useTabsContext();

  // request order in search bar
  if (requestOrderClicked) {
    return (
      <TabContentLayout>
        <RequestOrderForm />
      </TabContentLayout>
    );
  }

  if (orderActionClicked) {
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
        <OrdersTable orderItems={orderItems} />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }
  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not placed any shop for me order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

type OrdersTableUnprocessedOrderProps = { orderItems: OrderItemType[] };

const OrdersTable = ({}: OrdersTableUnprocessedOrderProps) => {
  return (
    <div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-white p-[20px]">
      <div className="flex flex-col gap-[20px]">
        <div className="overflow-x-scroll ">
          <table className="relative w-full min-w-max table-auto text-left">
            <TableHead />
            <TableBody />
          </table>
        </div>
      </div>
      <TableFooter />
    </div>
  );
};

type TableHeadType = { title: string; sortIcon: boolean };

const TableHead = () => {
  const tableHeads: TableHeadType[] = [
    { title: "Package(s) Image", sortIcon: false },
    { title: "Order ID", sortIcon: true },
    { title: "Order Status", sortIcon: false },
    { title: "Order Date", sortIcon: true },
    { title: "Tracking ID", sortIcon: true },
    { title: "Shipping Status", sortIcon: false },
    { title: "Shop For Me Status", sortIcon: false },
    { title: "Shop For Me Cost", sortIcon: true },
    { title: "Shipping Cost", sortIcon: true },
  ];

  return (
    <thead className="sticky top-0 z-10 flex gap-[20px] bg-white px-[20px] py-[14px]">
      {tableHeads.map(({ title, sortIcon }) => {
        return (
          <tr key={title} className="flex-grow">
            <th className="flex max-w-[150px] gap-[20px] border-0 p-0">
              <span className="label-lg whitespace-nowrap">{title}</span>
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
      <tr>
        <th className="flex border-0 p-0">
          <span className="label-lg">Action</span>
        </th>
      </tr>
    </thead>
  );
};

const shippingStatuses = [
  "not started",
  "ready for shipping",
  "in transit",
  "processing",
  "cleared",
] as const;

const TableBody = () => {
  return (
    <tbody className="flex flex-col border-y-[0.5px] border-gray-500 [&>tr]:border-b-[0.5px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {orders.map(
        ({
          images,
          orderId,
          orderStatus,
          orderDate,
          shippingCost,
          shippingStatus,
          shopForMeCost,
          shopForMeStatus,
          trackingId,
        }) => {
          return (
            <tr
              key={trackingId}
              className="flex items-center justify-between gap-[20px] bg-gray-10 px-[20px] py-[40px]"
            >
              <td className="w-full max-w-[130px] border-0 p-0">
                <div className="grid max-h-[150px] max-w-[150px] grid-cols-2 grid-rows-2 place-items-center gap-[5px]">
                  {images.length === 1 && (
                    <div className="col-span-full row-span-full overflow-hidden rounded-[10px]">
                      <img src={images[0]} alt="package image" />
                    </div>
                  )}
                  {images.length === 2 && (
                    <>
                      <div className="col-span-full row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[0]} alt="package image" />
                      </div>
                      <div className="col-span-full row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[1]} alt="package image" />
                      </div>
                    </>
                  )}
                  {images.length === 3 && (
                    <>
                      <div className="col-span-2 row-span-2 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[0]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[1]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[2]} alt="package image" />
                      </div>
                    </>
                  )}
                  {images.length === 4 && (
                    <>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[0]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[1]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[2]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[3]} alt="package image" />
                      </div>
                    </>
                  )}
                  {images.length >= 5 && (
                    <>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[0]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[1]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <img src={images[2]} alt="package image" />
                      </div>
                      <div className="col-span-1 row-span-1 flex max-h-[60px] items-center justify-center overflow-hidden rounded-[10px]">
                        <div className="flex w-max items-center gap-[10px] rounded-[10px] bg-surface-100 p-[10px]">
                          {images.length >= 5 && (
                            <>
                              <div className="label-lg hidden items-center p-[10px] text-secondary-600 sm:flex">{`${
                                images.length - 4
                              }+`}</div>
                              {/* for mobile screen */}
                              <div className="label-lg flex items-center p-[10px] text-secondary-600 sm:hidden">{`${
                                images.length - 1
                              }+`}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </td>
              <td className="w-full max-w-[100px] border-0 p-0">
                <p className="title-md whitespace-nowrap">{orderId}</p>
              </td>
              <td className="w-full max-w-[90px] border-0 p-0">
                <p className="title-md whitespace-nowrap">{orderStatus}</p>
              </td>
              <td className="w-full max-w-[130px] border-0 p-0">
                <p className="label-lg whitespace-nowrap text-neutral-900">
                  {orderDate}
                </p>
              </td>
              <td className="w-full max-w-[90px] border-0 p-0">
                <p className="title-md text-primary-900">{trackingId}</p>
              </td>
              <td className="title-sm w-full max-w-[150px] border-0 p-0">
                <ShippingStatus status={shippingStatus} />
              </td>
              <td className="w-full max-w-[150px] border-0 p-0">
                <p className="title-md whitespace-nowrap">{shopForMeStatus}</p>
              </td>
              <td className="flex w-full max-w-[130px] gap-[5px] border-0 p-0">
                <img
                  src="/images/tick_square_bold_icon.svg"
                  alt="tick square bold icon"
                />
                <p className="title-md">{shopForMeCost}</p>
              </td>
              <td className="flex w-full max-w-[130px] gap-[5px] border-0 p-0">
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

type ShippingStatusProps = { status: (typeof shippingStatuses)[number] };

const ShippingStatus = ({ status }: ShippingStatusProps) => {
  const capitalizedWords = status
    .split(" ")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");

  const onClick = () => {
    return;
  };

  if (status === "not started") {
    return (
      <div className="rounded-[10px] bg-gray-200 px-[10px] py-[5px] text-center text-gray-700">
        {capitalizedWords}
      </div>
    );
  }

  if (status === "ready for shipping") {
    return (
      <button
        onClick={onClick}
        aria-label={capitalizedWords}
        className="btn bg-brand-orange relative w-full items-center rounded-[10px] px-[10px] py-[5px] text-center text-white"
      >
        {capitalizedWords}
      </button>
    );
  }

  if (status === "in transit") {
    return (
      <div className="rounded-[10px] bg-primary-600 px-[10px] py-[5px] text-center text-white">
        {capitalizedWords}
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div className="rounded-[10px] bg-gray-500 px-[10px] py-[5px] text-center text-white">
        {capitalizedWords}
      </div>
    );
  }

  if (status === "cleared") {
    return (
      <div className="rounded-[10px] bg-primary-900 px-[10px] py-[5px] text-center text-white">
        {capitalizedWords}
      </div>
    );
  }
};

const TableFooter = () => {
  return (
    <div className="body-lg flex items-center gap-[20px] px-[20px] py-[10px]">
      <span>Items per page:</span>
      <div className="w-max">
        <SelectNumber />
      </div>
      <div className="flex gap-[20px]">
        <span>1-10 of 12</span>
        <div className="flex gap-[10px]">
          <button className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
            <img
              src="/images/arrow_square_disabled_icon.svg"
              alt="arrow square icon"
            />
          </button>
          <button className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
            <img src="/images/arrow_square_icon.svg" alt="arrow square  icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

type SelectNumberProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const SelectNumber = ({ value, onChange }: SelectNumberProps) => {
  return (
    <div className="relative z-0 w-full">
      <select
        name="pageNumber"
        id="pageNumber"
        value={value}
        onChange={onChange}
        className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 pr-[60px] leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default OrdersPanel;
