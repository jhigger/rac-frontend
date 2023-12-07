/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  type FieldArrayWithId,
  type SubmitHandler,
} from "react-hook-form";
import { useNavContext } from "~/contexts/NavigationContext";
import { useShopContext, type OrderItemType } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import tailmater from "~/js/tailmater";
import AccordionButton from "../../Forms/AccordionButton";
import CurrencyInput from "../../Forms/Inputs/CurrencyInput";
import FileInput from "../../Forms/Inputs/FileInput";
import QuantityInput from "../../Forms/Inputs/QuantityInput";
import SelectInput from "../../Forms/Inputs/SelectInput";
import TextAreaInput from "../../Forms/Inputs/TextAreaInput";
import TextInput from "../../Forms/Inputs/TextInput";
import NeedHelpFAB from "../../NeedHelpFAB";
import { CancelButton } from "../Orders/OrdersPanel";
import { TotalCost } from "./RequestCheckout";
import { type ModalCloseType } from "./RequestsPanel";

const emptyValue: OrderItemType = {
  images: [],
  orderId: "",
  orderStatus: "not responded",
  orderDate: "",
  trackingId: "",
  shippingStatus: "not started",
  shopForMeStatus: "purchase not started",
  shopForMeCost: "",
  shippingCost: "",
};

type Inputs = {
  requestItems: OrderItemType[];
};

const RequestOrderForm = () => {
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<RequestOrderStep1 />, <RequestOrderStep2 />]);

  const { handleRequests } = useShopContext();
  const { handleTabChange, handleActiveAction } = useTabContext();

  const formMethods = useForm<Inputs>({
    defaultValues: {
      requestItems: [emptyValue],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // handleRequests();
    console.log(data.requestItems);
  };

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <FormProvider {...formMethods}>
      <div
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        {step}
        {isFirstStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              <BackButton onClick={handleBack} />
              <SaveAsDraftButton />
              <ProceedButton
                next={
                  isSecondToLastStep ? formMethods.handleSubmit(onSubmit) : next
                }
              />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <BackButton onClick={handleBack} />
              </div>
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <ProceedButton
                  next={
                    isSecondToLastStep
                      ? formMethods.handleSubmit(onSubmit)
                      : next
                  }
                />
              </div>
              <div className="col-span-full">
                <SaveAsDraftButton />
              </div>
            </div>
          </>
        )}
        {isLastStep && (
          <div className="w-full md:w-[200px]">
            <DoneButton handleFinish={handleFinish} />
          </div>
        )}
        <NeedHelpFAB />
      </div>
    </FormProvider>
  );
};

const RequestOrderStep1 = () => {
  const { control } = useFormContext<Inputs>();
  const { fields, append, remove } = useFieldArray<Inputs>({
    control,
    name: "requestItems",
  });

  const handleAddMore = () => {
    append(emptyValue);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };
  return (
    <>
      <RequestFormHeader title="Requesting For New Shop For Me Service" />
      <ImportantNotice />
      <SelectWarehouseOriginSection />
      <SectionHeader title="Fill in the Items details" />
      <div className="flex flex-col gap-[20px]">
        {fields.map((field, i) => {
          return (
            <ItemDetailsSection
              key={field.id}
              index={i}
              handleRemoveItem={() => handleRemove(i)}
              fields={fields}
              expanded
            />
          );
        })}
      </div>
      <div className="w-max">
        <AddButton title="Add Item" onClick={handleAddMore} />
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

export const RequestFormHeader = ({ title }: RequestFormHeaderProps) => {
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

export const SectionHeader = ({ title, hr = false }: SectionHeaderProps) => {
  return (
    <div className="flex items-start gap-[10px]">
      <img
        src="/images/arrow_circle_right_bold_icon.svg"
        alt="arrow circle right bold icon"
        className="w-[20px]"
      />
      <div className="flex w-full flex-col gap-[10px]">
        <h3 className="label-lg font-medium text-secondary-900">{title}</h3>
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

export const TooltipButton = () => {
  return (
    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
      <img src="/images/tooltip_icon.svg" alt="tooltip icon" />
    </button>
  );
};

type ItemDetailsSectionProps = {
  index: number;
  expanded?: boolean;
  handleRemoveItem: (index: number) => void;
  fields: FieldArrayWithId<Inputs, "requestItems", "id">[];
};

export const ItemDetailsSection = ({
  // fields // todo: register form fields
  index,
  expanded = false,
  handleRemoveItem,
}: ItemDetailsSectionProps) => {
  const { open, toggle } = useAccordion(expanded);
  const [filename, setFilename] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!files[0]) return;
    setFilename(files[0].name);
  };

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[30px]">
            <div className="col-span-full flex items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Item - <span className="text-primary-600">#{index + 1}</span>
              </h4>
              <div className="hidden md:block">
                <PreviewItemButton index={index} />
              </div>
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
                <div className="col-span-full flex items-center gap-[10px] md:col-span-8">
                  <SelectInput
                    id={`store-${index}`}
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
                    id={`urgentPurchase-${index}`}
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
                  <TextInput id={`itemUrl-${index}`} label={"Item URL"} />
                </div>

                <div className="col-span-full">
                  <TextInput id={`itemName-${index}`} label={"Item Name"} />
                </div>

                <div className="col-span-full md:col-span-8">
                  <CurrencyInput
                    id={`itemOriginalCost-${index}`}
                    label={"Item Original Cost"}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <QuantityInput id={`quantity-${index}`} label={"Quantity"} />
                </div>

                <div className="col-span-full">
                  <div className="md:hidden">
                    <CurrencyInput
                      id={`totalShippingCost-${index}`}
                      label={"T. Sh. cost to your w.h & Sales Tax"}
                    />
                  </div>
                  <div className="hidden md:block">
                    <CurrencyInput
                      id={`totalShippingCost-${index}`}
                      label={
                        "Total shipping cost to your warehouse & Sales Tax"
                      }
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <FileInput
                    id={`itemPicture-${index}`}
                    label={"Upload Item Picture"}
                    value={filename}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-full">
                  <TextAreaInput
                    id={`additionalItemDescription-${index}`}
                    label={"Additional Item Description"}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader
                    title="Describe the item you wish to purchase with further custom properties"
                    hr
                  />
                  <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
                    <AddPropertiesSection index={index} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[10px] border-t-[0.5px] border-dashed border-t-gray-500 p-[10px] md:hidden">
              <PreviewItemButton index={index} />
              <DeleteItemButton onClick={() => handleRemoveItem(index)} />
            </div>
          </div>
        </SectionContentLayout>
        <div className="hidden md:block">
          <DeleteButtonIcon onClick={() => handleRemoveItem(index)} />
        </div>
      </div>
      <ItemPreview index={index} />
    </>
  );
};

type PropertyType = { label: string; value: string | undefined };

type AddPropertiesSectionProps = { index: number };

export const AddPropertiesSection = ({
  index = 0,
}: AddPropertiesSectionProps) => {
  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  const handleProperties = (newProperties: PropertyType[]) => {
    if (!properties) return setProperties(newProperties);
    setProperties((prev) => [...prev!, ...newProperties]);
  };

  return (
    <>
      {properties && <PropertyFields properties={properties} />}
      <AddCustomPropertyButton
        id={`${index + 1}`}
        properties={properties}
        handleProperties={handleProperties}
      />
    </>
  );
};

type PropertyFieldsProps = { properties: PropertyType[] };

const PropertyFields = ({ properties }: PropertyFieldsProps) => {
  return (
    <>
      {properties.map((property, i) => {
        return (
          <div key={`${property.label}-${i}`} className="w-full md:w-[230px]">
            <TextInput
              key={`property-${i}`}
              id={`property-${i}`}
              label={property.label}
              defaultValue={property.value}
            />
          </div>
        );
      })}
    </>
  );
};

type AddCustomPropertyButtonProps = {
  id: string;
  properties: PropertyType[] | null;
  handleProperties: (p: PropertyType[]) => void;
};

const AddCustomPropertyButton = ({
  id,
  handleProperties,
}: AddCustomPropertyButtonProps) => {
  const { activeNav } = useNavContext();
  const nav = activeNav.split(" ").join("-").toLowerCase();
  const modalId = `${nav}-request-order-item-${id}`;
  const dataTarget = `#${modalId}`;

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <div className="w-full md:w-max">
      <AddButton title="Add properties" dataTarget={dataTarget} />
      <AddPropertiesModal
        modalId={modalId}
        handleProperties={handleProperties}
      />
    </div>
  );
};

type AddPropertiesModalProps = {
  modalId: string;
  handleProperties: AddCustomPropertyButtonProps["handleProperties"];
};

const AddPropertiesModal = ({
  modalId,
  handleProperties,
}: AddPropertiesModalProps) => {
  const dataClose = `#${modalId}`;
  const maxWidth = "max-w-[456px]";

  const { handleSubmit, control } = useForm<{
    properties: PropertyType[];
  }>({
    defaultValues: {
      properties: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });

  const handleAddMore = () => {
    append({ label: "", value: "" });
  };

  const onSubmit: SubmitHandler<{
    properties: PropertyType[];
  }> = async (data) => {
    const filtered = data.properties.filter(
      (property) => property.label.length !== 0,
    );
    handleProperties(filtered);
    remove();
  };

  return (
    <div
      id={modalId}
      className={
        "ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full items-center justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
      }
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`z-50 flex h-max w-full flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px] ${maxWidth}`}
      >
        <div className="flex flex-col gap-[16px]">
          <span className="headline-sm">Add properties</span>
          <span className="body-md">
            You want more properties for the products to be procured, give it a
            label (name of the property) like size, color, e.t.c, and optionally
            the description of the property.
          </span>
        </div>

        <div className="flex flex-col gap-[10px]">
          {fields.map((_, i) => {
            return (
              <div key={i} className="flex flex-col gap-[30px]">
                {i !== 0 && <hr className="mt-[20px]" />}

                <Controller
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      id={field.name}
                      label="Property Label"
                      bg="bg-surface-300"
                    />
                  )}
                  name={`properties.${i}.label`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <TextAreaInput
                      {...field}
                      id={field.name}
                      label="Property Description"
                      bg="bg-surface-300"
                    />
                  )}
                  name={`properties.${i}.value`}
                  control={control}
                />
              </div>
            );
          })}

          <AddMoreProperties onClick={handleAddMore} />
        </div>

        <div className="flex flex-row items-end justify-end">
          <div className="flex gap-[8px]">
            <CancelButton dataClose={dataClose} onClick={remove} />
            <AddPropertyButton dataClose={dataClose} />
          </div>
        </div>
      </form>
    </div>
  );
};

type AddMoreProperties = { onClick: () => void };

const AddMoreProperties = ({ onClick }: AddMoreProperties) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="title}"
      className="btn relative flex h-[40px] w-max flex-row items-center justify-center gap-x-2 whitespace-nowrap rounded-[20px] px-[16px] py-2.5 text-sm font-medium tracking-[.00714em]"
    >
      <img src="/images/add_more_icon.svg" alt="add more icon" />
      <span className="body-lg text-primary-600">Add more properties</span>
    </button>
  );
};

type AddPropertyButtonProps = ModalCloseType;

const AddPropertyButton = ({ dataClose }: AddPropertyButtonProps) => {
  return (
    <button
      data-close={dataClose}
      type="submit"
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

type SectionContentLayoutProps = { children: ReactNode };

export const SectionContentLayout = ({
  children,
}: SectionContentLayoutProps) => {
  return (
    <div className="flex w-full items-center gap-[20px] rounded-[20px] border-[1px] border-gray-200 px-[24px] py-[20px] md:px-[34px]">
      {children}
    </div>
  );
};
type DeleteButtonIconProps = {
  onClick: () => void;
};
export const DeleteButtonIcon = ({ onClick }: DeleteButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Delete"
      className="flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      <img src="/images/delete_icon.svg" alt="delete icon" className="" />
    </button>
  );
};

type DeleteItemButtonProps = {
  onClick: () => void;
};

export const DeleteItemButton = ({ onClick }: DeleteItemButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Delete Item"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-error-600 md:px-6"
    >
      <img src="/images/delete_icon.svg" alt="delete icon" />
      <span>Delete Item</span>
    </button>
  );
};

type PreviewItemButtonProps = { index: number };

const PreviewItemButton = ({ index }: PreviewItemButtonProps) => {
  const dataTarget = `#preview-item-${index}`;

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <button
      aria-label="Preview Item"
      data-type="dialogs"
      data-target={dataTarget}
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/eye_bold_icon.svg" alt="eye bold icon" />
      <span>Preview Item</span>
    </button>
  );
};

type ItemPreviewProps = PreviewItemButtonProps;

const ItemPreview = ({ index }: ItemPreviewProps) => {
  const id = `preview-item-${index}`;
  const dataClose = `#${id}`;

  return (
    <div
      id={id}
      className="ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center  [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
    >
      <div
        data-close={dataClose}
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
            <ItemPreviewDetails />

            <div className="flex flex-col gap-[20px] rounded-[20px] bg-secondary-600 px-[24px] py-[20px] text-primary-10">
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
              <TotalCost />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-end justify-end">
          <div className="w-1/2">
            <button
              aria-label="Back"
              data-close={dataClose}
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

const ItemPreviewDetails = () => {
  return (
    <div className="flex flex-col gap-[10px] overflow-y-auto rounded-[10px] bg-surface-500 px-[20px] py-[20px] md:max-h-[250px] md:gap-[20px] md:px-[24px] ">
      <div className="flex flex-col gap-[10px] md:flex-row md:justify-between">
        <div className="flex flex-col px-[14px]">
          <label className="body-md text-neutral-700">Item Color:</label>
          <span
            id="item-name"
            className="title-md md:title-lg text-neutral-900"
          >
            Amstel white
          </span>
        </div>
        <div className="flex flex-col px-[14px]">
          <label className="body-md text-neutral-700">Item Quantity:</label>
          <span
            id="item-name"
            className="title-md md:title-lg text-neutral-900"
          >
            2
          </span>
        </div>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">Country Of Purchase:</label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
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

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">
          Cost of item from Store:
        </label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          $567.00
        </span>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">Store</label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          Amamzon
        </span>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">Length:</label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          76in
        </span>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">Width:</label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          89in
        </span>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">Height:</label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          89in
        </span>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">
          Total Shipping Cost to your Warehouse & Sales Tax:
        </label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          $456.00
        </span>
      </div>

      <div className="flex flex-col px-[14px]">
        <label className="body-md text-neutral-700">
          Additional Item Description:
        </label>
        <span id="item-name" className="title-md md:title-lg text-neutral-900">
          $456.00
        </span>
      </div>
    </div>
  );
};

export const ChangeCurrencyButton = () => {
  return (
    <button
      aria-label="change currency"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-400 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-100 md:px-6"
    >
      <img src="/images/change_currency_icon.svg" alt="change currency icon" />
      <span className="label-lg">Change Currency</span>
    </button>
  );
};

type AddButtonProps = {
  title: string;
  dataTarget?: string;
  onClick?: () => void;
};

export const AddButton = ({ title, dataTarget, onClick }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      data-type="dialogs"
      data-target={dataTarget}
      aria-label={title}
      className="btn relative flex h-14 w-full flex-row items-center justify-center gap-x-2 rounded-[20px] bg-gray-700 px-8 py-2.5 text-sm font-medium tracking-[.00714em] text-white"
    >
      <img src="/images/add_icon.svg" alt="add icon" />
      <span className="body-lg text-neutral-100">{title}</span>
    </button>
  );
};

type BackButtonProps = { onClick: () => void };

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/arrow_left_bold_icon.svg" alt="arrow left bold icon" />
      <span className="body-lg text-primary-600">Back</span>
    </button>
  );
};

export const SaveAsDraftButton = () => {
  const { handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("drafts");
  };

  return (
    <button
      onClick={onClick}
      aria-label="Save as Draft"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-secondary-100 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img src="/images/save_as_draft_icon.svg" alt="save as draft icon" />
      <span className="body-lg text-secondary-900">Save as Draft</span>
    </button>
  );
};

type ProceedButtonProps = { next: () => void };

export const ProceedButton = ({ next }: ProceedButtonProps) => {
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

export const DoneButton = ({ handleFinish }: DoneButtonProps) => {
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

export default RequestOrderForm;
