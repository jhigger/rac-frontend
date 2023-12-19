import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
import { CloseButton } from "~/components/Buttons";
import LabelId from "~/components/LabelId";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import { MoreButton } from "~/components/Shop/Orders";
import { InitiateShippingButton } from "~/components/Shop/Orders/InitiateShipping";
import {
  CancelButton,
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
} from "~/components/Shop/Requests/RequestsPanel";
import SearchBar from "~/components/Shop/SearchBar";
import {
  useAutoImportContext,
  type AutoImportRequestPackageType,
} from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import RequestDetails from "./RequestDetails";
import RequestOrder from "./RequestOrder";

const AutoImportRequestsPanel = () => {
  const { requestItems } = useAutoImportContext();
  const { activeAction } = useTabContext();

  if (activeAction === "request new order") {
    return (
      <TabContentLayout>
        <RequestOrder />
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

  if (Array.isArray(requestItems) && requestItems.length > 0) {
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
            You have not requested for any auto import order before, would you
            like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const RequestsTable = () => {
  const { requestItems } = useAutoImportContext();

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

type RequestTableBodyProps = { requestItems: AutoImportRequestPackageType[] };

const RequestTableBody = ({ requestItems }: RequestTableBodyProps) => {
  const { handleActiveAction, handleViewIndex } = useTabContext();

  const handleViewDetails = (index: number) => {
    handleViewIndex(index);
    handleActiveAction("request details");
  };

  return (
    <tbody className="flex flex-col border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
      {requestItems.map(
        ({ items, requestId, requestStatus, requestDate }, i) => {
          const images = items.map((item) => item.image);

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
              <td className="w-[150px] border-0 p-0">
                <RequestStatus id={requestId} status={requestStatus} />
              </td>
              <td className="border-0 p-0">
                <p className="label-lg whitespace-nowrap text-neutral-900">
                  {requestDate.toLocaleString()}
                </p>
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
    "Not Responded": "bg-gray-200 text-gray-700",
    Responded: "bg-brand-orange text-white",
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
    "Not Responded":
      "Your request has not be responded to yet. Kindly check back later.",
    Responded:
      "Your request has been responded to. Kindly proceed to checkout.",
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

        <LabelId label="Request ID" id="R78667" />

        <p className="title-lg text-neutral-900">{content[status]}</p>

        <div className="flex flex-row items-end justify-end">
          <div className="w-max whitespace-nowrap">
            {status === "Not Responded" && (
              <CloseButton dataClose={dataClose} />
            )}
            {status === "Responded" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <InitiateShippingButton dataClose={dataClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoImportRequestsPanel;
