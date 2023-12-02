/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import { type RequestItemType, useShopContext } from "~/contexts/ShopContext";
import RequestOrderForm, {
  RequestFormHeader,
} from "../../Forms/RequestOrderForm";
import NeedHelpFAB from "../../NeedHelpFAB";
import {
  CancelButton,
  CloseButton,
  ImageColumn,
  TableFooter,
  TableHead,
} from "../Orders/OrdersPanel";
import SearchBar from "../SearchBar";
import TabContentLayout from "../TabContentLayout";
import RequestDetails from "./RequestDetails";
import RequestOrderButton from "./RequestOrderButton";
import { LabelId, MoreButton } from "../Orders/OrderItem";
import { useEffect } from "react";
import tailmater from "~/js/tailmater";
import RequestCheckout from "./RequestCheckout";

const RequestsPanel = () => {
  const {
    requestCheckoutClicked,
    requestedOrders,
    requestOrderClicked,
    requestActionClicked,
  } = useShopContext();

  if (requestOrderClicked) {
    return (
      <TabContentLayout>
        <RequestOrderForm />
      </TabContentLayout>
    );
  }

  if (requestActionClicked) {
    return (
      <TabContentLayout>
        <RequestDetails />
      </TabContentLayout>
    );
  }

  if (requestCheckoutClicked) {
    return (
      <TabContentLayout>
        <RequestCheckout />
      </TabContentLayout>
    );
  }

  if (requestedOrders) {
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
            You have not requested for any shop for me order before, would you
            like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const RequestsTable = () => {
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

export const TableBody = () => {
  const { requestedOrders } = useShopContext();

  if (!requestedOrders) return;

  return (
    <tbody className="flex flex-col border-y-[0.5px] border-gray-500 [&>tr]:border-b-[0.5px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {requestedOrders.map(
        ({ images, requestId, requestStatus, requestDate }) => {
          return (
            <tr
              key={requestId}
              className="flex items-center justify-between gap-[20px] bg-gray-10 px-[20px] py-[40px]"
            >
              <td className="w-max border-0 p-0">
                <input
                  type="checkbox"
                  name={`check-${requestId}`}
                  className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
                  checked={undefined}
                />
              </td>
              <ImageColumn images={images} />
              <td className="w-full max-w-[100px] border-0 p-0">
                <p className="title-md whitespace-nowrap">{requestId}</p>
              </td>
              <td className="w-full max-w-[150px] border-0 p-0">
                <RequestStatus id={requestId} status={requestStatus} />
              </td>
              <td className="w-full max-w-[130px] border-0 p-0">
                <p className="label-lg whitespace-nowrap text-neutral-900">
                  {requestDate}
                </p>
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

type RequestStatusProps = {
  id: string;
  status: RequestItemType["requestStatus"];
};

const RequestStatus = ({ id, status }: RequestStatusProps) => {
  const capitalizedWords = status
    .split(" ")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");

  useEffect(() => {
    tailmater();
  }, []);

  const modalId = `request-status-modal-${id}`;
  const dataTarget = `#${modalId}`;

  const buttonStyles = {
    "not responded": "bg-gray-200 text-gray-700",
    responded: "bg-brand-orange text-white",
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
      <RequestStatusModal {...{ modalId, status }} />
    </>
  );
};

type RequestStatusModalProps = {
  modalId: string;
  status: RequestStatusProps["status"];
};

const RequestStatusModal = ({ modalId, status }: RequestStatusModalProps) => {
  const dataClose = `#${modalId}`;

  const content = {
    "not responded":
      "Your request has not be responded to yet. Kindly check back later.",
    responded:
      "Your request has been responded to. Kindly proceed to checkout.",
  };

  return (
    <div
      id={modalId}
      className="ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div className="z-50 flex h-max w-full max-w-[700px] flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px]">
        <RequestFormHeader title="Shipping Status" />

        <LabelId label="Request ID:" id="OD78667" />

        <p className="title-lg text-neutral-900">{content[status]}</p>

        <div className="flex flex-row items-end justify-end">
          <div className="w-max whitespace-nowrap">
            {status === "not responded" && (
              <CloseButton dataClose={dataClose} />
            )}
            {status === "responded" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <ProceedToCheckoutButton dataClose={dataClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
type ProceedToCheckoutButtonProps = { dataClose: string };

const ProceedToCheckoutButton = ({
  dataClose,
}: ProceedToCheckoutButtonProps) => {
  const { handleActiveAction, handleCheckoutAction } = useShopContext();

  const onClick = () => {
    handleCheckoutAction(true);
    handleActiveAction("checkout");
  };

  return (
    <button
      onClick={onClick}
      aria-label="Proceed to checkout"
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/checkout_icon.svg" alt="checkout icon" />
      <span className="label-lg text-white">Proceed to checkout</span>
    </button>
  );
};

export default RequestsPanel;
