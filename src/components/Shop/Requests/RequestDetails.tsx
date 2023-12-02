/* eslint-disable @next/next/no-img-element */
import { useShopContext } from "~/contexts/ShopContext";
import useAccordion from "~/hooks/useAccordion";
import AccordionButton from "../../Forms/AccordionButton";
import {
  BackButton,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "../../Forms/RequestOrderForm";
import OrderCheckout from "../Orders/OrderCheckout";
import { LabelId, RespondedStatus } from "../Orders/OrderItem";
import TabContentLayout from "../TabContentLayout";

const RequestDetails = () => {
  const {
    orderItems,
    handleRequestAction,
    requestCheckoutClicked,
    handleCheckoutAction,
  } = useShopContext();

  if (!orderItems) return;

  const handleBack = () => {
    handleRequestAction(false);
  };

  const handleProceed = () => {
    handleCheckoutAction(true);
  };

  if (requestCheckoutClicked) {
    return (
      <TabContentLayout>
        <OrderCheckout />
      </TabContentLayout>
    );
  }

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Shop For Me Order Request Details" />
      <LabelId label="Request ID:" id="R78667" />
      <OrderInformation onClick={handleProceed} />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {orderItems.map((item, i) => {
          return <Item key={item.orderId} index={i} />;
        })}
      </div>
      <BillingDetails />
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
        <ProceedButton onClick={handleProceed} />
      </div>
    </div>
  );
};

type ProceedButtonProps = { onClick: () => void };

const ProceedButton = ({ onClick }: ProceedButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Proceed"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/wallet_icon.svg" alt="wallet icon" />
      <span className="body-lg text-white">Proceed to checkout</span>
    </button>
  );
};

export const BillingDetails = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Billing Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Payments Information
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <>
              <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[14px] py-[10px]">
                <p className="label-lg text-gray-700">
                  The <b className="text-neutral-900">shop for me cost</b> could
                  have been changed/updated by our staffs if they observe
                  differences between the details you provided and the ones we
                  verify from the store, however we will inform you about it.
                </p>
              </div>
              <div className="flex w-max flex-col gap-[15px]">
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Total Shipment Cost:</span>
                  <span className="title-lg text-neutral-900">
                    Not yet allocated
                  </span>
                </div>
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Payment Status:</span>
                  <span className="title-lg text-neutral-900">Unpaid</span>
                </div>
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <LabelWithTooltip label="Total Shop For Me Cost:" />
                  <span className="title-lg text-neutral-900">$234,000.00</span>
                </div>
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Store:</span>
                  <span className="title-lg text-neutral-900">Amazon</span>
                </div>
              </div>
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

type ItemProps = {
  index: number;
};

export const Item = ({ index }: ItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg text-gray-700">
            Item - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && (
          <>
            <HighlightedInfo text="These details could have been changed/updated by our staffs if they observe differences between the ones you provided and the ones we verified from the store, however we will inform you about it." />
            <div className="flex w-max flex-col gap-[15px]">
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <span className="body-md">Store:</span>
                <span className="title-lg text-neutral-900">Amazon</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <span className="body-md">Urgent Purchase:</span>
                <span className="title-lg text-neutral-900">No</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <span className="body-md">Item URL:</span>
                <span className="title-lg text-neutral-900">
                  htttp/jjnkkukja.jhgyjayjdjjhcjc
                </span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Item Name:" />
                <span className="title-lg text-neutral-900">Designer Bags</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Item Cost from Store:" />
                <span className="title-lg text-neutral-900">$45.00</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Quantity:" />
                <span className="title-lg text-neutral-900">4</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Weight:" />
                <span className="title-lg text-neutral-900">67kg</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Height:" />
                <span className="title-lg text-neutral-900">5 inches</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Length:" />
                <span className="title-lg text-neutral-900">5 inches</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Width:" />
                <span className="title-lg text-neutral-900">5 inches</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Item Picture:" />
                <span className="title-lg text-neutral-900">
                  <img
                    src="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
                    alt=""
                    className="w-[220px] rounded-[20px] bg-center object-cover"
                  />
                </span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Color:" />
                <span className="title-lg text-neutral-900">Blue</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] text-gray-700 md:grid-cols-2">
                <LabelWithTooltip label="Stripes:" />
                <span className="title-lg text-neutral-900">5 inches</span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] md:flex-row md:items-center">
              <div className="flex flex-grow items-center gap-[10px]">
                <span className="title-md md:title-lg text-primary-900">
                  Item Related Costs
                </span>
                <hr className="block flex-grow border-dashed border-primary-900" />
              </div>

              <div className="block md:hidden">
                <HighlightedInfo
                  text="These costs could have been changed/updated by our staffs if they
            observed differences between the details you provided and the ones
            we verified from the store."
                />
              </div>

              <div className="flex flex-col items-center gap-[10px] md:flex-row md:gap-[20px]">
                <span className="body-md">
                  Default Currency: <span className="title-sm">USD</span>
                </span>
                <div className="w-full">
                  <ChangeCurrencyButton />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <HighlightedInfo
                text="These costs could have been changed/updated by our staffs if they
            observed differences between the details you provided and the ones
            we verified from the store."
              />
            </div>
            <div className="flex w-max flex-col gap-[15px]">
              <div className="label-lg grid grid-cols-1 gap-[20px] md:grid-cols-2">
                <span className="body-md text-primary-600">
                  Urgent purchase fee:
                </span>
                <span className="text-primary-900">$0.00</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] md:grid-cols-2">
                <span className="body-md text-primary-600">
                  Processing Fee:
                </span>
                <span className="text-primary-900">$87,000.00</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] md:grid-cols-2">
                <span className="body-md text-primary-600">
                  Shipping to Origin Warehouse Cost:
                </span>
                <span className="text-primary-900">$87,000.00</span>
              </div>
              <div className="label-lg grid grid-cols-1 gap-[20px] md:grid-cols-2">
                <span className="body-md text-primary-600">
                  <LabelWithTooltip label="Shop For Me Cost:" />
                </span>
                <span className="text-primary-900">$87,000.00</span>
              </div>
            </div>
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

const ChangeCurrencyButton = () => {
  return (
    <button
      aria-label="change currency"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-400 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600 md:px-6"
    >
      <img
        src="/images/change_currency_dark_icon.svg"
        alt="change currency icon"
      />
      <span className="label-lg">Change Currency</span>
    </button>
  );
};

type LabelWithTooltipProps = { label: string };

const LabelWithTooltip = ({ label }: LabelWithTooltipProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <TooltipButton />
      <span className="body-md">{label}</span>
    </div>
  );
};

export const PackageOrigin = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Package Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Package Origin
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <>
              <HighlightedInfo
                text="Your Items will be delivered here after we help you purchase your them
        and they will be shipped from here to our pickup office in Nigeria"
              />
              <div className="label-lg title-lg flex items-center gap-[20px] text-neutral-900">
                <span className="body-md">Country of Purchase:</span>
                <span className="title-lg text-neutral-900">
                  United States (Houston - warehouse)
                </span>
              </div>
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

type HighlightedInfoProps = { text: string };

export const HighlightedInfo = ({ text }: HighlightedInfoProps) => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[14px] py-[10px]">
      <p className="label-lg text-gray-700">{text}</p>
    </div>
  );
};

const OrderInformation = ({ onClick }: ProceedButtonProps) => {
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
                    <RespondedStatus />
                  </span>
                </div>
                <ProceedToCheckoutButton onClick={onClick} />
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

type ProceedToCheckoutButtonProps = { onClick?: () => void };

const ProceedToCheckoutButton = ({ onClick }: ProceedToCheckoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Take Action Now"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[88px] border border-gray-500 bg-white px-[14px] py-[10px] text-sm font-medium tracking-[.00714em] text-white"
    >
      <img
        src="/images/security_icon.svg"
        alt="security icon"
        className="h-4 w-4"
      />
      <span className="label-lg whitespace-nowrap text-primary-600">
        Proceed to Checkout
      </span>
    </button>
  );
};

export default RequestDetails;
