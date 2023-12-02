import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import AccordionButton from "../../Forms/AccordionButton";
import {
  BackButton,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "../../Forms/RequestOrderForm";
import { LabelId, UnprocessedStatus } from "../Orders/OrderItem";
import { BillingDetails, Item, PackageOrigin } from "./RequestDetails";

const OrderDetails = () => {
  const { orderItems, handleRequestAction } = useShopContext();

  if (!orderItems) return;

  const handleBack = () => {
    handleRequestAction(false);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Shop For Me Order Request Details" />
      <LabelId label="Request ID:" id="R78667" />
      <OrderInformation />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {orderItems.map((item, i) => {
          return <Item key={item.orderId} index={i} />;
        })}
      </div>
      <BillingDetails />
      <div className="w-max">
        <BackButton onClick={handleBack} />
      </div>
    </div>
  );
};

const OrderInformation = () => {
  const { open, toggle } = useAccordion(true);

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
            <div className="flex w-max flex-col gap-[15px]">
              <div className="col-span-1 flex flex-col gap-[15px]">
                <div className="label-lg grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Order Request Date:</span>
                  <span className="title-lg text-neutral-900">12/02/2023</span>
                </div>
                <div className="label-lg grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Shop for me status:</span>
                  <span className="title-lg text-neutral-900">
                    <UnprocessedStatus />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export default OrderDetails;
