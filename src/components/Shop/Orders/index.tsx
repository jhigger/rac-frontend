import { ClipboardTick, Ship } from "iconsax-react";
import { useTabContext } from "~/contexts/TabContext";

export const RespondedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-error-600 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">Responded</span>
    </div>
  );
};

export const NotRespondedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-error-600 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">Not Responded</span>
    </div>
  );
};

export const ProcessedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-primary-900 bg-primary-900"></div>

      <span className="label-lg font-bold text-primary-600">Processed</span>
    </div>
  );
};

export const ProcessingStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-4 border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">Processed</span>
    </div>
  );
};

export const UnprocessedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-error-600 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">Unprocessed</span>
    </div>
  );
};

export const ArrivedClearStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-4 border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">
        Arrived Destination
      </span>
    </div>
  );
};

export const ArrivedClearedDeliveredStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-primary-900 bg-primary-900"></div>

      <span className="label-lg font-bold text-primary-600">
        Arrived Destination
      </span>
    </div>
  );
};

export const CancelledStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-error-600 bg-error-600"></div>

      <span className="label-lg font-bold text-primary-600">Cancelled</span>
    </div>
  );
};

export const SixDaysStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="border-3 min-h-[12px] min-w-[12px] rounded-full border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">
        6 days to arrive destination
      </span>
    </div>
  );
};

export const ShipmentProcessingStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">
        Shipment Processing
      </span>
    </div>
  );
};

export const ShipmentNotStartedStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-[1px] border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-gray-500">
        Shipment Not Started
      </span>
    </div>
  );
};

export const SortedOutStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-2 border-primary-900 bg-primary-900"></div>

      <span className="label-lg font-bold text-primary-600">Sorted Out</span>
    </div>
  );
};

export const NotArrivedOriginWarehouseStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-[3px] border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">
        Not Arrived Origin Warehouse
      </span>
    </div>
  );
};

export const ArrivedOriginWarehouseStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="min-h-[12px] min-w-[12px] rounded-full border-4 border-primary-900 bg-transparent"></div>

      <span className="label-lg font-bold text-primary-600">
        Arrived Origin Warehouse
      </span>
    </div>
  );
};

export const DetailsClearPackageButton = () => {
  const { handleActiveAction, handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("orders");
    handleActiveAction("clear package");
  };

  return (
    <button
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] md:px-6"
    >
      <ClipboardTick className="text-primary-900" />
      <span className="label-lg text-primary-600">Clear Package</span>
    </button>
  );
};

export const DetailsInitiateShippingButton = () => {
  const { handleActiveAction, handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("orders");
    handleActiveAction("initiate shipping");
  };

  return (
    <button
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] md:px-6"
    >
      <Ship className="text-primary-900" />
      <span className="label-lg text-primary-600">Initiate shipping</span>
    </button>
  );
};

export const DetailsClearedButton = () => {
  return (
    <button
      disabled
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] md:px-6"
    >
      <ClipboardTick />
      <span className="label-lg">Cleared</span>
    </button>
  );
};

export const DetailsDeliveredButton = () => {
  return (
    <button
      disabled
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] md:px-6"
    >
      <ClipboardTick />
      <span className="label-lg">Delivered</span>
    </button>
  );
};

export const shopForMeStatuses = {
  "Purchase in progress": <ArrivedOriginWarehouseStatus />,
  "Purchase not started": <NotArrivedOriginWarehouseStatus />,
  "Purchase completed": <SortedOutStatus />,
};

export const shippingStatuses = {
  "ready for shipping": <ShipmentNotStartedStatus />,
  "not started": <ShipmentNotStartedStatus />,
  processing: <ShipmentProcessingStatus />,
  cancelled: <CancelledStatus />,
  "in transit": <ShipmentProcessingStatus />,
  "arrived destination": <ArrivedClearStatus />,
  cleared: <ArrivedClearedDeliveredStatus />,
  delivered: <ArrivedClearedDeliveredStatus />,
};

export const requestStatuses = {
  Responded: <RespondedStatus />,
  "Not Responded": <NotRespondedStatus />,
};
