/* eslint-disable @next/next/no-img-element */
import { useState, type ChangeEvent, type ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import { useTabsContext } from "~/contexts/TabsContext";
import CurrencyInput from "../Forms/Inputs/CurrencyInput";
import FileInput from "../Forms/Inputs/FileInput";
import QuantityInput from "../Forms/Inputs/QuantityInput";
import SelectInput from "../Forms/Inputs/SelectInput";
import TextInput from "../Forms/Inputs/TextInput";
import NeedHelpFAB from "../NeedHelpFAB";
import RequestOrderButton from "./RequestOrderButton";
import TabContentLayout from "./TabContentLayout";
import TextAreaInput from "../Forms/Inputs/TextAreaInput";

const RequestsPanel = () => {
  const { requestOrderClicked } = useTabsContext();

  return (
    <TabContentLayout>
      {!requestOrderClicked ? (
        <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
          <h2 className="title-lg max-w-[462px] text-center">
            <Balancer>
              You have not requested for any shop for me order before, would you
              like to request for a new order?
            </Balancer>
          </h2>
          <RequestOrderButton />
        </div>
      ) : (
        <RequestOrderForm />
      )}
    </TabContentLayout>
  );
};

const RequestOrderForm = () => {
  return (
    <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader />
      <ImportantNotice />
      <SelectWarehouseOriginSection />
      <ItemDetailsSection />
      <div className="w-max">
        <AddButton title="Add Item" />
      </div>
      <div className="hidden gap-[10px] md:flex [&>*]:w-max">
        <BackButton />
        <SaveAsDraftButton />
        <ProceedButton />
      </div>
      <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
        <div className="col-span-1 w-full">
          <BackButton />
        </div>
        <div className="col-span-1">
          <ProceedButton />
        </div>
        <div className="col-span-full">
          <SaveAsDraftButton />
        </div>
      </div>
      <NeedHelpFAB />
    </div>
  );
};

const RequestFormHeader = () => {
  return (
    <div className="rounded-[20px] border-[1px] border-dashed border-primary-600 px-[30px] py-[20px] text-primary-600">
      <h2 className="headline-md">Requesting For New Shop For Me Service</h2>
    </div>
  );
};

const ImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="label-lg text-primary-900">IMPORTANT NOTICE:</span>
      <p className="body-md ml-6 list-item text-gray-700">
        Even though you will be paying for your <b>shipping cost</b> when your
        items arrive our office in Nigeria, you will be required to pay for the{" "}
        <b>procurement/shop for me cost</b> for your items before we process
        your order.
      </p>
    </div>
  );
};

type SectionHeaderProps = { title: string; hr?: boolean };

const SectionHeader = ({ title, hr = false }: SectionHeaderProps) => {
  return (
    <div className="flex items-start gap-[10px]">
      <img
        src="/images/arrow_circle_right_bold_icon.svg"
        alt="arrow circle right bold icon"
        className="w-[20px]"
      />
      <div className="flex w-full flex-col gap-[10px]">
        <h3 className="label-lg text-secondary-900">{title}</h3>
        {hr && <hr className="hidden w-full border-gray-500 md:block" />}
      </div>
    </div>
  );
};

const SelectWarehouseOriginSection = () => {
  return (
    <>
      <SectionHeader
        title="Tell us where your package will be shipped from"
        hr
      />
      <div className="flex items-center gap-[10px] md:pl-[34px]">
        <SelectInput
          id={"originWarehouse"}
          label={"Origin Warehouse"}
          options={
            <>
              <option value="" disabled hidden>
                Select Origin
              </option>
            </>
          }
        />
        <TooltipButton />
      </div>
    </>
  );
};

const TooltipButton = () => {
  return (
    <button className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
      <img src="/images/tooltip_icon.svg" alt="tooltip icon" />
    </button>
  );
};

const ItemDetailsSection = () => {
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState("");

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!files[0]) return;
    setFilename(files[0].name);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Fill in the Items details" />
      <div className="flex items-center gap-[10px]">
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[30px]">
            <div className="col-span-full flex items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Item - <span className="text-primary-600">#1</span>
              </h4>
              <div className="hidden sm:block">
                <PreviewItemButton />
              </div>
              <div className="flex flex-grow justify-end">
                <ExpandCollapseButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
                <div className="col-span-full flex items-center gap-[10px] md:col-span-8">
                  <SelectInput
                    id={"store"}
                    label={"Store"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Select a Store
                        </option>
                      </>
                    }
                  />
                  <TooltipButton />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={"urgentPurchase"}
                    label={"Urgent Purchase"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          No
                        </option>
                      </>
                    }
                  />
                  <TooltipButton />
                </div>

                <div className="col-span-full">
                  <TextInput id={"itemUrl"} label={"Item URL"} />
                </div>

                <div className="col-span-full">
                  <TextInput id={"itemName"} label={"Item Name"} />
                </div>

                <div className="col-span-full md:col-span-8">
                  <CurrencyInput
                    id={"itemOriginalCost"}
                    label={"Item Original Cost"}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <QuantityInput id={"quantity"} label={"Quantity"} />
                </div>

                <div className="col-span-full">
                  <div className="md:hidden">
                    <CurrencyInput
                      id={"totalShippingCost"}
                      label={"T. Sh. cost to your w.h & Sales Tax"}
                    />
                  </div>
                  <div className="hidden md:block">
                    <CurrencyInput
                      id={"totalShippingCost"}
                      label={
                        "Total shipping cost to your warehouse & Sales Tax"
                      }
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <FileInput
                    id={"itemPicture"}
                    label={"Upload Item Picture"}
                    value={filename}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-full">
                  <TextAreaInput
                    id={"additionalItemDescription"}
                    label={"Additional Item Description"}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader
                    title="Describe the item you wish to purchase with further custom properties"
                    hr
                  />
                  <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
                    <div className="w-full md:w-[230px]">
                      <TextInput id={"itemColor"} label={"Item Color"} />
                    </div>
                    <div className="w-full md:w-max">
                      <AddButton title="Add properties" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[10px] border-t-[0.5px] border-dashed border-t-gray-500 p-[10px] md:hidden">
              <PreviewItemButton />
              <DeleteItemButton />
            </div>
          </div>
        </SectionContentLayout>
        <div className="hidden md:block">
          <DeleteButtonIcon />
        </div>
      </div>
    </div>
  );
};

type SectionContentLayoutProps = { children: ReactNode };

const SectionContentLayout = ({ children }: SectionContentLayoutProps) => {
  return (
    <div className="flex w-full items-center gap-[20px] rounded-[20px] border-[1px] border-gray-200 px-[24px] py-[20px] md:px-[34px]">
      {children}
    </div>
  );
};

const DeleteButtonIcon = () => {
  return (
    <button
      aria-label="Delete"
      className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      <img src="/images/delete_icon.svg" alt="delete icon" className="" />
    </button>
  );
};

const DeleteItemButton = () => {
  return (
    <button
      aria-label="Delete Item"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-error-600 md:px-6"
    >
      <img src="/images/delete_icon.svg" alt="delete icon" />
      <span>Delete Item</span>
    </button>
  );
};

const PreviewItemButton = () => {
  return (
    <button
      aria-label="Preview Item"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/eye_bold_icon.svg" alt="eye bold icon" />
      <span>Preview Item</span>
    </button>
  );
};

type ExpandCollapseButtonProps = { open: boolean; toggle: () => void };

const ExpandCollapseButton = ({ open, toggle }: ExpandCollapseButtonProps) => {
  return (
    <button
      aria-label={open ? "collapse" : "expand"}
      onClick={toggle}
      className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      {open ? (
        <img
          src="/images/arrow_circle_up_icon.svg"
          alt="arrow circle up icon"
        />
      ) : (
        <img
          src="/images/arrow_circle_up_icon.svg"
          alt="arrow circle up icon"
          className="rotate-180 transform"
        />
      )}
    </button>
  );
};

type AddButtonProps = { title: string };

const AddButton = ({ title }: AddButtonProps) => {
  return (
    <button
      aria-label={title}
      className="btn relative flex h-14 w-full flex-row items-center justify-center gap-x-2 rounded-[20px] bg-gray-700 px-8 py-2.5 text-sm font-medium tracking-[.00714em] text-white"
    >
      <img src="/images/add_icon.svg" alt="add icon" />
      <span className="body-lg text-neutral-100">{title}</span>
    </button>
  );
};

const BackButton = () => {
  return (
    <button
      aria-label="Preview Item"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/arrow_left_bold_icon.svg" alt="arrow left bold icon" />
      <span className="body-lg text-primary-600">Back</span>
    </button>
  );
};

const SaveAsDraftButton = () => {
  return (
    <button
      aria-label="Back"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-secondary-100 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/save_as_draft_icon.svg" alt="save as draft icon" />
      <span className="body-lg text-secondary-900">Save as Draft</span>
    </button>
  );
};

const ProceedButton = () => {
  return (
    <button
      aria-label="Proceed"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/arrow_right_bold_icon.svg"
        alt="arrow right bold icon"
      />
      <span className="body-lg text-neutral-100">Proceed</span>
    </button>
  );
};

export default RequestsPanel;
