/* eslint-disable @next/next/no-img-element */
import { More } from "iconsax-react";
import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
import { CloseButton } from "~/components/Buttons";
import CongratulationImage from "~/components/CongratulationImage";
import {
  OrderTableHead,
  tableHeads,
  type OrderTableBodyProps,
} from "~/components/Import/Orders/OrdersPanel";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import OrderTrackingId from "~/components/OrderTrackingId";
import { MoreButton } from "~/components/Shop/Orders";
import {
  DetailSection,
  InitiateShippingButton,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  CancelButton,
  ImageColumn,
  PickUpInstructions,
  TableFooter,
  TrackButton,
  excluded,
  type ShippingStatusModalProps,
  type ShippingStatusProps,
  type SomeStatusType,
} from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import {
  RequestFormHeader,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import SearchBar from "~/components/Shop/SearchBar";
import { useExportContext } from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import InitiateShipping from "./InitiateShipping";
import OrderDetails from "./OrderDetails";

const ExportOrdersPanel = () => {
  const { orderItems } = useExportContext();
  const { activeAction } = useTabContext();

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

  if (Array.isArray(orderItems) && orderItems.length > 0) {
    return (
      <TabContentLayout>
        <SearchBar id="orders" />
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

const OrderTableBody = ({ orderItems }: OrderTableBodyProps) => {
  const { handleActiveAction, handleViewIndex } = useTabContext();

  const handleViewDetails = (index: number) => {
    handleViewIndex(index);
    handleActiveAction("order details");
  };

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
          },
          i,
        ) => {
          const images = items.map((item) => item.image);

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
                  {orderDate.toLocaleString()}
                </p>
              </td>
              <td className="border-0 p-0">
                <p className="title-md text-primary-900">{trackingId}</p>
              </td>
              <td className="title-sm max-w-[150px] border-0 p-0">
                <ShippingStatus id={orderId} status={shippingStatus} />
              </td>
              <td className="flex gap-[5px] border-0 p-0">
                <More size="20" variant="Bold" className="text-error-600" />

                <p className="title-md">{shippingCost}</p>
              </td>
              <td className="border-0 p-0">
                <MoreButton handleViewDetails={() => handleViewDetails(i)} />
              </td>
            </tr>
          );
        },
      )}
    </tbody>
  );
};

const ShippingStatus = ({ id, status }: ShippingStatusProps) => {
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
    "arrived destination": "bg-primary-900 text-white",
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
    "arrived destination": "Your package has arrived its destination.",
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
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>

        {!excluded.includes(status) && (
          <div className="flex rounded-[20px] bg-primary-900 px-[20px] py-[10px] text-white">
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
            {[
              "cancelled",
              "not started",
              "cleared",
              "delivered",
              "arrived destination",
            ].includes(status) && <CloseButton dataClose={dataClose} />}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOrdersPanel;
