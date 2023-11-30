/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import { useTabsContext } from "~/contexts/TabsContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import tailmater from "~/js/tailmater";
import CurrencyInput from "../Forms/Inputs/CurrencyInput";
import FileInput from "../Forms/Inputs/FileInput";
import QuantityInput from "../Forms/Inputs/QuantityInput";
import SelectInput from "../Forms/Inputs/SelectInput";
import TextAreaInput from "../Forms/Inputs/TextAreaInput";
import TextInput from "../Forms/Inputs/TextInput";
import NeedHelpFAB from "../NeedHelpFAB";
import RequestOrderButton from "./RequestOrderButton";
import TabContentLayout from "./TabContentLayout";
import SearchInput from "../Forms/Inputs/SearchInput";

const RequestsPanel = () => {
  const {
    hasRequests,
    requestOrderClicked,
    handleTabChange,
    handleRequests,
    handleRequestOrder,
  } = useTabsContext();

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
  };

  const handleBack = () => {
    handleTabChange("requests");
  };

  if (requestOrderClicked) {
    return (
      <TabContentLayout>
        <RequestOrderForm {...{ handleBack, handleFinish }} />
      </TabContentLayout>
    );
  }

  if (hasRequests) {
    return (
      <TabContentLayout>
        <div className="hidden gap-[20px] sm:flex">
          <div className="w-max">
            <FilterButton />
          </div>
          <div className="w-max sm:w-full md:w-max">
            <SearchInput
              id="search_input"
              label="Search for users with any related keyword"
            />
          </div>
          <div className="flex flex-grow justify-end">
            <div className="w-max">
              <RequestNewOrderButton onClick={() => handleRequestOrder(true)} />
            </div>
          </div>
        </div>
        {/* for mobile version */}
        <div className="flex flex-col items-center gap-[9px] sm:hidden">
          <div className="w-full">
            <SearchInput
              id="search_input"
              label="Search for users with any related keyword"
            />
          </div>
          <div className="flex w-full justify-between gap-[20px]">
            <div className="min-w-max">
              <FilterButton />
            </div>
            <div className="w-full">
              <RequestNewOrderButton onClick={() => handleRequestOrder(true)} />
            </div>
          </div>
        </div>
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

type RequestOrderFormProps = {
  handleBack: () => void;
  handleFinish: () => void;
};

const RequestOrderForm = ({
  handleBack,
  handleFinish,
}: RequestOrderFormProps) => {
  const { step, next, isFirstStep, isLastStep } = useMultiStepForm([
    <RequestOrderStep1 />,
    <RequestOrderStep2 />,
  ]);

  return (
    <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      {step}
      {isFirstStep && (
        <>
          <div className="hidden gap-[10px] md:flex [&>*]:w-max">
            <BackButton handleBack={handleBack} />
            <SaveAsDraftButton />
            <ProceedButton next={next} />
          </div>
          <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
            <div className="col-span-1 w-full">
              <BackButton handleBack={handleBack} />
            </div>
            <div className="col-span-1">
              <ProceedButton next={next} />
            </div>
            <div className="col-span-full">
              <SaveAsDraftButton />
            </div>
          </div>
        </>
      )}
      {isLastStep && (
        <div className="w-1/3">
          <DoneButton handleFinish={handleFinish} />
        </div>
      )}
      <NeedHelpFAB />
    </div>
  );
};

const RequestOrderStep1 = () => {
  return (
    <>
      <RequestFormHeader title="Requesting For New Shop For Me Service" />
      <ImportantNotice />
      <SelectWarehouseOriginSection />
      <ItemDetailsSection />
      <div className="w-max">
        <AddButton title="Add Item" />
      </div>
    </>
  );
};

const RequestOrderStep2 = () => {
  return (
    <>
      <RequestFormHeader title="Requesting For New Shop For Me Service" />
      <SectionContentLayout>
        <div className="flex w-full items-center justify-center gap-[5px] p-[10px]">
          <span className="headline-md">Request ID:</span>
          <span className="headline-md font-bold">R78667</span>
        </div>
      </SectionContentLayout>
      <div className="flex flex-col-reverse gap-[10px] rounded-[20px] bg-primary-600 px-[14px] py-[10px] md:flex-row">
        <img
          src="/images/drone_flying_with_package.png"
          alt="drone flying with package"
        />
        <div className="flex flex-col justify-center gap-[10px] text-white">
          <span className="headline-md font-bold">Congratulations!</span>
          <span className="headline-md">
            You have just successfully requested for shop for me service.
          </span>
        </div>
      </div>
      <SectionHeader title="What next?" />
      <SectionContentLayout>
        <div className="flex flex-col gap-[10px]">
          <h3 className="title-lg font-bold text-neutral-900">
            Do the following to process your Order
          </h3>
          <ul className="flex flex-col gap-[13px]">
            <li className="flex items-center gap-[26px]">
              <span className="rounded-[20px] bg-primary-600 p-[10px] text-white">
                1
              </span>
              <span className="title-lg text-neutral-900">
                Kindly note that we will review the details of the items that
                you provided and make changes to the them if they don&apos;t
                tally with the ones we verify from store.
              </span>
            </li>
            <hr className="block w-full border-gray-500 md:hidden" />
            <li className="flex items-center gap-[26px]">
              <span className="rounded-[20px] bg-primary-600 p-[10px] text-white">
                2
              </span>
              <span className="title-lg text-neutral-900">
                You will then be requested to confirm and pay for the
                procurement cost only to place an order.
              </span>
            </li>
            <hr className="block w-full border-gray-500 md:hidden" />
            <li className="flex items-center gap-[26px]">
              <span className="rounded-[20px] bg-primary-600 p-[10px] text-white">
                3
              </span>
              <span className="title-lg text-neutral-900">
                To begin import processing for your procured items, you will be
                sent a quote containing the shipping cost to Nigeria only when
                we have purchased and brought the procured items to the Origin
                warehouse You selected.
              </span>
            </li>
            <hr className="block w-full border-gray-500 md:hidden" />
            <li className="flex items-center gap-[26px]">
              <span className="rounded-[20px] bg-primary-600 p-[10px] text-white">
                4
              </span>
              <span className="title-lg text-neutral-900">
                And finally, you will be paying for the shipping cost when the
                package gets to our office in Nigeria (you could inform us about
                the one closest to you)
              </span>
            </li>
          </ul>
        </div>
      </SectionContentLayout>
    </>
  );
};

type RequestFormHeaderProps = { title: string };

const RequestFormHeader = ({ title }: RequestFormHeaderProps) => {
  return (
    <div className="rounded-[20px] border-[1px] border-dashed border-primary-600 px-[30px] py-[20px] text-primary-600">
      <h2 className="headline-md">{title}</h2>
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
              <div className="hidden md:block">
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
      <ItemPreview />
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
  useEffect(() => {
    tailmater();
  }, []);

  return (
    <button
      aria-label="Preview Item"
      data-type="dialogs"
      data-target="#item_preview"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/eye_bold_icon.svg" alt="eye bold icon" />
      <span>Preview Item</span>
    </button>
  );
};

const ItemPreview = () => {
  return (
    <div
      id="item_preview"
      className="ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center md:overflow-hidden [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
    >
      <div
        data-close="#item_preview"
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div className="z-50 flex h-max w-full max-w-[900px] flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px]">
        <RequestFormHeader title="Item Preview" />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-[30px] text-2xl font-normal text-gray-900">
            <img
              src="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
              alt=""
              className="aspect-square rounded-[20px] bg-center object-cover"
            />
            <div className="flex flex-col px-[14px]">
              <label htmlFor="item-name" className="body-md text-neutral-700">
                Item Name:
              </label>
              <span id="item-name" className="title-lg text-neutral-900">
                SteelSeries Rival 5 Gaming Mouse with PrismSync RGB Lighting and
                9.....
              </span>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-[10px] text-sm leading-5 tracking-[0.25px]">
            <div className="flex flex-col gap-[10px] overflow-y-auto rounded-[10px] bg-surface-500 px-[20px] py-[20px] md:max-h-[250px] md:gap-[20px] md:px-[24px] ">
              <div className="flex flex-col gap-[10px] md:flex-row md:justify-between">
                <div className="flex flex-col px-[14px]">
                  <label className="body-md text-neutral-700">
                    Item Color:
                  </label>
                  <span
                    id="item-name"
                    className="title-md md:title-lg text-neutral-900"
                  >
                    Amstel white
                  </span>
                </div>
                <div className="flex flex-col px-[14px]">
                  <label className="body-md text-neutral-700">
                    Item Quantity:
                  </label>
                  <span
                    id="item-name"
                    className="title-md md:title-lg text-neutral-900"
                  >
                    2
                  </span>
                </div>
              </div>

              <div className="flex flex-col px-[14px]">
                <label className="body-md text-neutral-700">
                  Country Of Purchase:
                </label>
                <span
                  id="item-name"
                  className="title-md md:title-lg text-neutral-900"
                >
                  United States (Houston - warehouse)
                </span>
              </div>

              <div className="flex flex-col px-[14px]">
                <label className="body-md text-neutral-700">Item Link:</label>
                <span
                  id="item-name"
                  className="title-md md:title-lg text-error-600 underline"
                >
                  https://a.co/d/gNEGYFM
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] rounded-[10px] bg-secondary-600 px-[24px] py-[20px] text-primary-10">
              <span className="title-lg">Shop For Me Costs</span>
              <div className="flex flex-col gap-[10px]">
                <div className="label-lg flex justify-between">
                  <span>Urgent Purchase Cost:</span>
                  <span>₦0.00</span>
                </div>
                <hr className="bg-gray-200" />
                <div className="flex justify-between">
                  <span>Cost of Item from Store</span>
                  <span>₦189,000.00</span>
                </div>
                <hr className="bg-gray-200" />
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>₦28,000.00</span>
                </div>
                <hr className="bg-gray-200" />
              </div>
              <div className="">
                <div className="flex justify-between">
                  <div className="flex flex-col justify-end gap-[5px]">
                    <span className="label-lg">Total:</span>
                    <span className="title-lg">₦28,000.00</span>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <span className="body-md">
                      Default Currency: <span className="title-sm">USD</span>
                    </span>

                    <button
                      aria-label="change currency"
                      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-400 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-100 md:px-6"
                    >
                      <img
                        src="/images/change_currency_icon.svg"
                        alt="change currency icon"
                      />
                      <span className="label-lg">Change Currency</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-end justify-end">
          <div className="w-1/2">
            <button
              aria-label="Back"
              data-close="#item_preview"
              className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
            >
              <img
                src="/images/arrow_right_bold_icon.svg"
                alt="arrow left bold icon"
                className="rotate-180"
              />
              <span className="label-lg text-white">Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
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

type BackButtonProps = { handleBack: () => void };

const BackButton = ({ handleBack }: BackButtonProps) => {
  return (
    <button
      onClick={handleBack}
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

type ProceedButtonProps = { next: () => void };

const ProceedButton = ({ next }: ProceedButtonProps) => {
  return (
    <button
      onClick={next}
      aria-label="Proceed"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/arrow_right_bold_icon.svg"
        alt="arrow right bold icon"
      />
      <span className="body-lg text-white">Proceed</span>
    </button>
  );
};

type DoneButtonProps = { handleFinish: () => void };

const DoneButton = ({ handleFinish }: DoneButtonProps) => {
  return (
    <button
      onClick={handleFinish}
      aria-label="Done"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/tick_circle_bold_icon.svg"
        alt="tick circle bold icon"
      />
      <span className="body-lg text-white">Done</span>
    </button>
  );
};

const FilterButton = () => {
  return (
    <button
      aria-label="Filter"
      className="btn relative flex h-14 w-14 flex-row items-center justify-center gap-x-[12px] rounded-[20px] bg-brand p-[12px] text-sm font-medium tracking-[.00714em] text-neutral-100 sm:p-4 md:w-full"
    >
      <img src="/images/filter_icon.svg" alt="filter icon" />
      <span className="label-lg hidden text-neutral-100 [@media(min-width:1000px)]:block">
        Filter View
      </span>
      <div className="label-sm absolute right-0 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-error-600 p-1 text-[8px] text-white">
        {/* put notification count here */}
      </div>
    </button>
  );
};

type RequestNewOrderButton = { onClick: () => void };

const RequestNewOrderButton = ({ onClick }: RequestNewOrderButton) => {
  return (
    <button
      onClick={onClick}
      aria-label="Filter"
      className="btn relative flex h-14 w-full flex-row items-center justify-center gap-[9px] rounded-[20px] bg-brand px-[8px] py-[12px] text-sm font-medium tracking-[.00714em] text-neutral-100 md:gap-x-[12px] md:p-4"
    >
      <img
        src="/images/import_bold_icon.svg"
        alt="import bold icon"
        className="hidden h-6 w-6 md:block"
      />
      <img
        src="/images/export_bold_icon.svg"
        alt="export bold icon"
        className="block h-6 w-6 md:hidden"
      />
      <span className="label-lg text-neutral-100">Request new order</span>
    </button>
  );
};

export default RequestsPanel;
