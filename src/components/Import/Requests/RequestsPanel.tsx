import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { LabelId, MoreButton } from "~/components/Shop/Orders";
import { InitiateShippingButton } from "~/components/Shop/Orders/InitiateShipping";
import {
  CancelButton,
  CloseButton,
  ImageColumn,
  TableFooter,
} from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import { RequestFormHeader } from "~/components/Shop/Requests/RequestOrder";
import {
  RequestTableHead,
  tableHeads,
  type RequestStatusModalProps,
  type RequestStatusProps,
  type RequestTableBodyProps,
} from "~/components/Shop/Requests/RequestsPanel";
import SearchBar from "~/components/Shop/SearchBar";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import RequestOrder from "./RequestOrder";

const ImportRequestsPanel = () => {
  const { activeAction } = useTabContext();
  const { requestItems } = useImportContext();

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
            You have not requested for any import order before, would you like
            to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const RequestsTable = () => {
  const { requestItems } = useImportContext();

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

export const RequestTableBody = ({ requestItems }: RequestTableBodyProps) => {
  return (
    <tbody className="flex flex-col border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {requestItems.map(({ items, requestId, requestStatus, requestDate }) => {
        if (!items[0]?.images) return;

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
              <ImageColumn images={items[0].images} />
            </td>
            <td className="border-0 p-0">
              <p className="label-lg md:title-md max-w-[100px] whitespace-nowrap">
                {requestId}
              </p>
            </td>
            <td className="w-[150px] border-0 p-0">
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

const RequestStatusModal = ({ modalId, status }: RequestStatusModalProps) => {
  const dataClose = `#${modalId}`;

  const content = {
    "not responded":
      "Your request has not be responded to yet. Kindly check back later.",
    responded:
      "Your request has been responded to. Kindly proceed to initiate shipping for your package.",
  };

  const { handleActiveAction, handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("orders");
    handleActiveAction("initiate shipping");
  };

  return (
    <div
      id={modalId}
      className="ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full items-center justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div className="z-50 flex h-max w-full max-w-[700px] flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px]">
        <RequestFormHeader title="Request Status" />

        <LabelId label="Request ID:" id="R78667" />

        <p className="title-lg text-neutral-900">{content[status]}</p>

        <div className="flex flex-row items-end justify-end">
          <div className="w-max whitespace-nowrap">
            {status === "not responded" && (
              <CloseButton dataClose={dataClose} />
            )}
            {status === "responded" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <InitiateShippingButton
                  dataClose={dataClose}
                  onClick={onClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportRequestsPanel;
