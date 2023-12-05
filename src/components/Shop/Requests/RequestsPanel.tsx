/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
import { useShopContext, type RequestItemType } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import NeedHelpFAB from "../../NeedHelpFAB";
import { LabelId, MoreButton } from "../Orders";
import {
  CancelButton,
  CloseButton,
  ImageColumn,
  TableFooter,
  type TableHeadType,
} from "../Orders/OrdersPanel";
import RequestOrderButton from "../RequestOrderButton";
import SearchBar from "../SearchBar";
import TabContentLayout from "../TabContentLayout";
import RequestCheckout from "./RequestCheckout";
import RequestDetails from "./RequestDetails";
import RequestOrderForm, { RequestFormHeader } from "./RequestOrder";

const RequestsPanel = () => {
  const { requestItems } = useShopContext();
  const { activeAction } = useTabContext();

  if (activeAction === "request new order") {
    return (
      <TabContentLayout>
        <RequestOrderForm />
      </TabContentLayout>
    );
  }

  if (activeAction === "request details") {
    return (
      <TabContentLayout>
        <RequestDetails />
      </TabContentLayout>
    );
  }

  if (activeAction === "proceed to checkout") {
    return (
      <TabContentLayout>
        <RequestCheckout />
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
  const { requestItems } = useShopContext();

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

const tableHeads: TableHeadType[] = [
  { title: "Package(s) Image", sortIcon: false },
  { title: "Request ID", sortIcon: true },
  { title: "Request Status", sortIcon: false },
  { title: "Request Date", sortIcon: true },
];

type RequestTableHeadProps = { th: TableHeadType[] };

export const RequestTableHead = ({ th }: RequestTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid grid-cols-[50px_repeat(5,1fr)] gap-[10px] p-[10px] font-medium text-neutral-900 md:gap-[20px] md:p-[20px]">
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

type RequestTableBodyProps = { requestItems: RequestItemType[] };

export const RequestTableBody = ({ requestItems }: RequestTableBodyProps) => {
  return (
    <tbody className="flex flex-col border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {requestItems.map(({ images, requestId, requestStatus, requestDate }) => {
        return (
          <tr
            key={requestId}
            className="grid grid-cols-[50px_repeat(5,1fr)] items-center gap-[10px] bg-gray-10 p-[10px] md:gap-[20px] md:p-[20px]"
          >
            <td className="border-0 p-0">
              <input
                type="checkbox"
                name={`check-${requestId}`}
                className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
                checked={undefined}
              />
            </td>
            <td className="border-0 p-0">
              <ImageColumn images={images} />
            </td>
            <td className="border-0 p-0">
              <p className="label-lg md:title-md max-w-[100px] whitespace-nowrap">
                {requestId}
              </p>
            </td>
            <td className="border-0 p-0">
              <RequestStatus id={requestId} status={requestStatus} />
            </td>
            <td className="border-0 p-0">
              <p className="label-lg whitespace-nowrap text-neutral-900">
                {requestDate}
              </p>
            </td>
            <td className="border-0 p-0">
              <MoreButton />
            </td>
          </tr>
        );
      })}
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

export type ModalCloseType = { dataClose: string };

type ProceedToCheckoutButtonProps = ModalCloseType;

const ProceedToCheckoutButton = ({
  dataClose,
}: ProceedToCheckoutButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("proceed to checkout");
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
