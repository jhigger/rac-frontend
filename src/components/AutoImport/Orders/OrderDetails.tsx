import { useToggle } from "usehooks-ts";
import { formatCurrency } from "~/utils";
import { BackButton } from "~/components/Buttons/BackButton";
import AccordionButton from "~/components/Forms/AccordionButton";
import { type OrderInformationProps } from "~/components/Import/Orders/OrderDetails";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
  DetailsClearPackageButton,
  DetailsClearedButton,
  DetailsDeliveredButton,
  DetailsInitiateShippingButton,
  ProcessedStatus,
  shippingStatuses,
} from "~/components/Shop/Orders";
import {
  BillingAddress,
  DetailSection,
} from "~/components/Shop/Orders/InitiateShipping";
import { PackageOrigin } from "~/components/Shop/Requests/RequestDetails";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { WAREHOUSE_LOCATIONS } from "~/constants";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import { PaymentsInformation } from "../Requests/RequestDetails";
import {
  DestinationAddressDetails,
  OriginWarehouseAddress,
} from "../Requests/RequestOrder";
import { AutoImportOrderItem } from "./InitiateShipping";

const OrderDetails = () => {
  const { orderPackages } = useAutoImportContext();
  const { viewIndex, handleActiveAction } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Auto Import Order Details" />

      <div className="w-full md:w-max">
        <OrderTrackingId
          orderId={orderPackage.orderId}
          trackingId={orderPackage.trackingId}
        />
      </div>

      <OrderInformation
        info={{
          date: orderPackage.orderLocalDate.toLocaleString(),
          status: orderPackage.shippingStatus,
        }}
      />

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Package Details" />
        <PackageOrigin>
          <DetailSection
            label="Origin warehouse"
            value={orderPackage.originWarehouse}
          />
          <OriginWarehouseAddress
            officeLocation={WAREHOUSE_LOCATIONS[orderPackage.originWarehouse]}
          />
        </PackageOrigin>
        <hr className="block w-full border-dashed border-primary-900" />
        {orderPackage.items.map((item, i) => {
          return <AutoImportOrderItem key={i} item={item} index={i} />;
        })}
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Shipping Details" />
        <DestinationAddressDetails
          destinationDetails={orderPackage.destinationDetails}
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Billing Details" />
        <BillingAddress billingDetails={orderPackage.billingDetails} />
        <PaymentsInformation>
          <DetailSection
            label="Total Shipment Cost"
            value={
              orderPackage.packageCosts.shippingCost > 0
                ? formatCurrency(orderPackage.packageCosts.shippingCost)
                : "Not allocated yet"
            }
            colSpanDesktop={4}
          />
          <DetailSection
            label="Payment Status"
            value={orderPackage.shippingPaymentStatus}
            colSpanDesktop={4}
          />
          <DetailSection
            label="Total Clearing Cost"
            value={
              orderPackage.packageCosts.clearingPortHandlingCost > 0
                ? formatCurrency(
                    orderPackage.packageCosts.clearingPortHandlingCost,
                  )
                : "Not allocated yet"
            }
            colSpanDesktop={4}
          />
          <DetailSection
            label="Payment Status"
            value={orderPackage.clearingPaymentStatus}
            colSpanDesktop={4}
          />
        </PaymentsInformation>
      </div>

      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
      </div>
    </div>
  );
};

const OrderInformation = ({ info }: OrderInformationProps) => {
  const [open, toggle] = useToggle(true);

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Order Information" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Order Information
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-10">
              <div className="md:col-span-2">
                <DetailSection label="Order Request Date" value={info.date} />
              </div>
              <div className="md:col-span-2">
                <DetailSection
                  label="Order Status"
                  value={<ProcessedStatus />}
                />
              </div>
              <div className="md:col-span-2">
                <DetailSection
                  label="Shipping Status"
                  value={shippingStatuses[info.status]}
                />
              </div>
              <div className="flex w-max items-center md:col-span-4">
                {info.status === "ready for shipping" && (
                  <DetailsInitiateShippingButton />
                )}
                {info.status === "arrived destination" && (
                  <DetailsClearPackageButton />
                )}
                {info.status === "cleared" && <DetailsClearedButton />}
                {info.status === "delivered" && <DetailsDeliveredButton />}
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export default OrderDetails;
