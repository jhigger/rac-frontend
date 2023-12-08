/* eslint-disable @next/next/no-img-element */
import { useEffect, type ChangeEventHandler } from "react";
import Balancer from "react-wrap-balancer";
import {
  useShopContext,
  type ShopOrderItemType as ShopOrderItemType,
} from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import { LabelId, MoreButton } from ".";
import TabContentLayout from "../../Layouts/TabContentLayout";
import NeedHelpFAB from "../../NeedHelpFAB";
import RequestOrderButton from "../RequestOrderButton";
import { RequestFormHeader, SectionHeader } from "../Requests/RequestOrder";
import { type ModalCloseType } from "../Requests/RequestsPanel";
import SearchBar from "../SearchBar";
import ClearPackage from "./ClearPackage";
import InitiateShipping, { DetailSection } from "./InitiateShipping";
import OrderDetails from "./OrderDetails";

const OrdersPanel = () => {
  const { orderItems } = useShopContext();
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
            You have not placed any shop for me order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const OrdersTable = () => {
  const { orderItems } = useShopContext();

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

export type TableHeadType = { title: string; sortIcon: boolean };

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

type OrderTableHeadProps = { th: TableHeadType[] };

const OrderTableHead = ({ th }: OrderTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid grid-cols-[50px_repeat(10,1fr)] gap-[20px] p-[20px] font-medium text-neutral-900">
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
  orderItems: ShopOrderItemType[];
};

const OrderTableBody = ({ orderItems }: OrderTableBodyProps) => {
  return (
    <tbody className="flex flex-col border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {orderItems.map(
        (
          {
            items,
            orderId,
            orderStatus,
            orderDate,
            shippingCost,
            shippingStatus,
            trackingId,
            shopForMeStatus,
            shopForMeCost,
          },
          i,
        ) => {
          if (items.length <= 0) return;

          return (
            <tr
              key={orderId}
              className="grid grid-cols-[50px_repeat(10,1fr)] items-center gap-[20px] bg-gray-10 px-[20px] py-[20px]"
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
                <ImageColumn images={items[i]!.images} />
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
                <ShippingStatus
                  id={orderId}
                  status={shippingStatus as ShippingStatusProps["status"]}
                />
              </td>
              <td className="border-0 p-0">
                <p className="title-md whitespace-nowrap">{shopForMeStatus}</p>
              </td>
              <td className="flex gap-[5px] border-0 p-0">
                <img
                  src="/images/tick_square_bold_icon.svg"
                  alt="tick square bold icon"
                />
                <p className="title-md">{shopForMeCost}</p>
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

type ImageColumnProps = { images: string[] };

export const ImageColumn = ({ images }: ImageColumnProps) => {
  return (
    <div className="w-full max-w-[130px] border-0 p-0">
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
    </div>
  );
};

export type ShippingStatusProps = {
  id: string;
  status: ShopOrderItemType["shippingStatus"];
};

export const ShippingStatus = ({ id, status }: ShippingStatusProps) => {
  const capitalizedWords = status
    .split(" ")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");

  useEffect(() => {
    tailmater();
  }, []);

  const modalId = `shipping-status-modal-${id}`;
  const dataTarget = `#${modalId}`;

  const buttonStyles = {
    "not started": "bg-gray-200 text-gray-700",
    "ready for shipping": "bg-brand-orange text-white",
    "arrived destination": "bg-brand-orange text-white",
    "in transit": "bg-primary-600 text-white",
    processing: "bg-gray-500 text-white",
    cleared: "bg-primary-900 text-white",
    delivered: "bg-primary-900 text-white",
    cancelled: "bg-error-600 text-white",
  };

  const buttonStyle = buttonStyles[status];

  return (
    <>
      <button
        data-type="dialogs"
        data-target={dataTarget}
        aria-label={capitalizedWords}
        className={`btn relative w-full rounded-[10px] px-[10px] py-[5px] text-center ${buttonStyle}`}
      >
        {capitalizedWords}
      </button>
      <ShippingStatusModal {...{ modalId, status }} />
    </>
  );
};

type ShippingStatusModalProps = {
  modalId: string;
  status: ShippingStatusProps["status"];
};

const excluded = [
  "not started",
  "cancelled",
  "cleared",
  "arrived destination",
  "delivered",
];

const EXCLUDED_CONST = [...excluded] as const;

type SomeStatusType = Exclude<
  ShippingStatusProps["status"],
  (typeof EXCLUDED_CONST)[number]
>;

const ShippingStatusModal = ({ modalId, status }: ShippingStatusModalProps) => {
  const dataClose = `#${modalId}`;

  const content = {
    cancelled:
      "Kindly note that the shipping for your package has been cancelled.",
    "not started":
      "The purchase of the item(s) in your package has not started or under process. We will notify you your package is ready for shipping.",
    "ready for shipping":
      "Your package is ready to be shipped, kindly proceed to initiate shipping for your package.",
    processing:
      "Your shipment is under processing, would you like to track it?",
    "in transit": "Your package is in transit, would you like to track it?",
    "arrived destination":
      "Your package has arrived its destination, you are required to clear it now before you can pick it up.",
  };

  const statusToImageMap = {
    "ready for shipping": "/images/shipping status modal/roadmap1_image.svg",
    processing: "/images/shipping status modal/roadmap1_image.svg",
    "in transit": "/images/shipping status modal/roadmap2_image.svg",
    "arrived destination": "/images/shipping status modal/roadmap3_image.svg",
  };

  const imagePath = statusToImageMap[status as SomeStatusType];

  const maxWidth =
    status === "cleared" ? "max-w-[1000px] mt-60" : "max-w-[700px]";

  const marginTop = status === "cleared" && "mt-[400px] md:mt-[300px]";

  return (
    <div
      id={modalId}
      className={
        "ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full items-center  justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
      }
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div
        className={`z-50 flex h-max w-full flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px] ${maxWidth} ${marginTop}`}
      >
        <RequestFormHeader title="Shipping Status" />

        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 bg-surface-200 p-[20px]">
          <OrderTrackingId />
        </div>

        {!excluded.includes(status) && (
          <div className="flex h-[164px] rounded-[20px] bg-primary-900 px-[20px] py-[10px] text-white">
            <hr className="h-[65px] border-r border-solid border-white" />
            <div className="flex flex-col">
              <div className="flex flex-col gap-[1px] pl-[10px]">
                <span className="title-md font-bold">Origin:</span>
                <span className="label-lg">Nigeria</span>
              </div>
              {imagePath && (
                <img
                  src={imagePath}
                  alt={`roadmap ${status} image`}
                  className="my-4 md:-my-2"
                />
              )}
              <div className="flex flex-col gap-[1px] self-end pr-[10px]">
                <span className="title-md font-bold">Origin:</span>
                <span className="label-lg">USA</span>
              </div>
            </div>
            <hr className="h-[65px] self-end border-r border-solid border-secondary-600" />
          </div>
        )}

        {status === "delivered" && (
          <CongratulationImage text="Your package has been delivered." />
        )}
        {status === "cleared" && (
          <>
            <CongratulationImage text="you can now pick up your package from our office in Nigeria (your selected “Destination”)" />

            <div className="rounded-[20px] border border-gray-200 bg-surface-200 px-[28px] py-[20px]">
              <div className="grid w-fit grid-cols-1 gap-[15px] md:grid-cols-4">
                <DetailSection
                  label="Pick up Address"
                  value="No, 1osolo way, ikeja road, behind scaint merry"
                />
                <DetailSection
                  label="Country"
                  value="Nigeria"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
                <DetailSection
                  label="State"
                  value="Lagos"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
                <DetailSection
                  label="City"
                  value="Ikeja"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
                <DetailSection
                  label="Zip/postal Code"
                  value="98765"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
              </div>
            </div>
            <SectionHeader title="What next?" />
            <PickUpInstructions />
          </>
        )}

        <p className="title-lg text-neutral-900">
          {content[status as SomeStatusType]}
        </p>

        <div className="flex flex-row items-end justify-end">
          <div className="w-max whitespace-nowrap">
            {["cancelled", "not started", "cleared", "delivered"].includes(
              status,
            ) && <CloseButton dataClose={dataClose} />}
            {status === "ready for shipping" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <InitiateShippingButton dataClose={dataClose} />
              </div>
            )}
            {(status === "processing" || status === "in transit") && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <TrackButton dataClose={dataClose} />
              </div>
            )}
            {status === "arrived destination" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <ClearPackageButton dataClose={dataClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PickUpInstructions = () => {
  return (
    <div className="flex w-full flex-col gap-[20px] rounded-[20px] border border-gray-200 px-[14px] py-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium md:pl-[14px] md:font-bold">
        Here is how to pick your package up from our office
      </span>
      <hr className="w-full border-gray-500 md:hidden" />
      <StepDescription
        stepNumber={1}
        description={
          <>
            When you come to pick up your package from our office, you will
            provide us the <b>Order ID</b> to ensure that we give you the
            package that rightly belongs to you.
          </>
        }
      />
      <hr className="w-full border-gray-500 md:hidden" />
      <StepDescription
        stepNumber={2}
        description={
          <>
            If you won&apos;t be able to come pick up your package up from our
            office, you can request for a doorstep delivery from us{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="title-md md:title-lg inline-flex items-center gap-[5px] text-primary-600"
            >
              <b>here</b>
              <img src="/images/export_circle_icon.svg" alt="external icon" />
            </a>
          </>
        }
        backgroundColor="bg-secondary-900"
      />
    </div>
  );
};

type StepDescriptionProps = {
  stepNumber: number;
  description: string | JSX.Element;
  backgroundColor?: "bg-primary-600" | "bg-secondary-900";
};

export const StepDescription = ({
  stepNumber,
  description,
  backgroundColor,
}: StepDescriptionProps) => {
  const bg = backgroundColor ?? "bg-primary-600";

  return (
    <div className="flex items-center gap-[20px]">
      <span className={`title-lg rounded-[20px] ${bg} p-[10px] text-white`}>
        {stepNumber}
      </span>
      <span className="body-lg md:title-lg text-gray-900">{description}</span>
    </div>
  );
};

export const OrderTrackingId = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[10px] md:flex-row">
      <div className="flex items-center gap-[10px]">
        <LabelId label="Order ID:" id="OD78667" />
        <img
          src="/images/shipping status modal/order_tracking_icon.svg"
          alt="order tracking icon"
          className="w-min rotate-90 md:hidden"
        />
      </div>
      <img
        src="/images/shipping status modal/order_tracking_icon.svg"
        alt="order tracking icon"
        className="hidden w-min md:block"
      />
      <LabelId label="Tracking ID:" id="SH78667" />
    </div>
  );
};

type CongratulationImageProps = { text: string };

export const CongratulationImage = ({ text }: CongratulationImageProps) => {
  return (
    <div className="flex flex-col-reverse gap-[10px] rounded-[20px] bg-primary-600 px-[21px] py-[15px] md:flex-row md:px-[14px] md:py-[10px]">
      <img
        src="/images/drone_flying_with_package.png"
        alt="drone flying with package"
        className="md:w-1/2"
      />
      <div className="flex flex-col justify-center gap-[10px] text-white">
        <span className="title-lg md:headline-md font-bold">
          Congratulations!
        </span>
        <span className="title-lg md:headline-md">{text}</span>
      </div>
    </div>
  );
};

type ClearPackageButtonProps = ModalCloseType;

const ClearPackageButton = ({ dataClose }: ClearPackageButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("clear package");
  };

  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/clipboard_tick_bold_icon.svg"
        alt="clipboard tick bold icon"
      />
      <span className="label-lg text-white">Clear Package</span>
    </button>
  );
};

type TrackButtonProps = ModalCloseType;

const TrackButton = ({ dataClose }: TrackButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("track");
  };
  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/track_icon.svg"
        alt="track icon"
      />
      <span className="label-lg text-white">Track</span>
    </button>
  );
};

type InitiateShippingButtonProps = ModalCloseType;

const InitiateShippingButton = ({ dataClose }: InitiateShippingButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("initiate shipping");
  };

  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/ship_bold_icon.svg"
        alt="ship bold icon"
      />
      <span className="label-lg text-white">Initiate Shipping</span>
    </button>
  );
};

type CloseButtonProps = { dataClose: string; onClick?: () => void };

export const CloseButton = ({ dataClose, onClick }: CloseButtonProps) => {
  return (
    <button
      aria-label="Back"
      onClick={onClick}
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/close_icon.svg"
        alt="close icon"
      />
      <span className="label-lg text-white">close</span>
    </button>
  );
};

export const CancelButton = ({ dataClose, onClick }: CloseButtonProps) => {
  return (
    <button
      aria-label="Back"
      onClick={onClick}
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600 md:px-6"
    >
      <span className="label-lg">Cancel</span>
    </button>
  );
};

export const TableFooter = () => {
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
