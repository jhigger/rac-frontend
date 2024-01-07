import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { BackButton } from "~/components/Buttons/BackButton";
import { DeleteButtonIcon } from "~/components/Buttons/DeleteButtonIcon";
import { DeleteItemButton } from "~/components/Buttons/DeleteItemButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import CurrencyInput from "~/components/Forms/Inputs/CurrencyInput";
import FileInput from "~/components/Forms/Inputs/FileInput";
import QuantityInput from "~/components/Forms/Inputs/QuantityInput";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import TextAreaInput from "~/components/Forms/Inputs/TextAreaInput";
import TextInput from "~/components/Forms/Inputs/TextInput";
import LabelId from "~/components/LabelId";
import { DetailSection } from "~/components/Shop/Orders/InitiateShipping";
import { StepDescription } from "~/components/Shop/Orders/OrdersPanel";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  AddButton,
  AddPropertiesSection,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
  type ItemDetailsSectionProps,
} from "~/components/Shop/Requests/RequestOrder";
import {
  COURIERS,
  ID_TYPE,
  ITEM_DELIVERY_STATUS,
  ORIGINS,
  PACKAGE_DELIVERY_STATUS,
} from "~/constants";
import {
  useImportContext,
  type ImportRequestPackageType,
} from "~/contexts/ImportContext";
import { type DraftImageType } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";

export const emptyValue: ImportRequestPackageType = {
  requestId: "",
  requestStatus: "Not Responded",
  requestLocalDate: new Date().toLocaleString(),
  originWarehouse: "China Warehouse (Guangzhou city)",
  deliveryStatus: "All delivered",
  items: [
    {
      image: "",
      name: "",
      idType: "Tracking ID",
      idNumber: "",
      deliveryStatus: "Not yet delivered",
      deliveredBy: "Seller",
      originalCost: 1,
      quantity: 1,
      description: "",
    },
  ],
  packageCosts: {
    shippingCost: 0,
    clearingPortHandlingCost: 0,
    otherCharges: 0,
    storageCharge: 0,
    insurance: 0,
    valueAddedTax: 0,
    paymentMethodSurcharge: 0,
    discount: 0,
  },
};

export type ImportInputs = {
  requestPackage: ImportRequestPackageType;
};

const RequestOrder = () => {
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<Step1 />, <Step2 />, <Step3 />]);

  const { handleRequests, handleLocalDraft, handleDraft } = useImportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const formMethods = useForm<ImportInputs>({
    defaultValues: {
      requestPackage: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<ImportInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
      handleDraft(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
    handleDraft(null);
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleSaveAsDraft = () => {
    handleTabChange("drafts");
    handleLocalDraft(formMethods.getValues());
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Requesting For New Import Order" />

        {!isLastStep ? (
          <HighlightedInfo text="Provide as much Information as possible needed for our staffs to identify your package if it has been delivered. The more Information you provide, the easier we identify your package." />
        ) : (
          // todo: submit response should have requestId
          <SectionContentLayout>
            <LabelId label="Request ID" id="R78667" center={true} />
          </SectionContentLayout>
        )}

        {step}

        {isFirstStep && (
          <>
            <div className="flex w-full flex-col gap-[10px] md:flex-row md:[&>*]:w-max">
              <BackButton onClick={handleBack} />
              <ProceedButton onClick={next} />
            </div>
          </>
        )}

        {!isFirstStep && !isLastStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              <BackButton onClick={handleBack} />
              <SaveAsDraftButton onClick={handleSaveAsDraft} />
              <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <BackButton onClick={handleBack} />
              </div>
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
              </div>
              <div className="col-span-full">
                <SaveAsDraftButton onClick={handleSaveAsDraft} />
              </div>
            </div>
          </>
        )}

        {isLastStep && (
          <div className="w-full md:w-[200px]">
            <DoneButton onClick={handleFinish} />
          </div>
        )}

        <NeedHelpFAB />
      </div>
    </FormProvider>
  );
};

export const Step1 = () => {
  return (
    <>
      <SectionHeader
        title="Tell us where your package will be shipped from"
        hr
      />
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 md:pl-[34px]">
        <SelectOrigin />
        <SelectPackageDeliveryStatus />
      </div>
    </>
  );
};

type Step2Props = { isDraft?: boolean };

export const Step2 = ({ isDraft = false }: Step2Props) => {
  const { control } = useFormContext<ImportInputs>();
  const { fields, append, remove } = useFieldArray<ImportInputs>({
    control,
    name: "requestPackage.items",
  });

  const handleAddMore = () => {
    append(emptyValue.items);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Step1 />

      <SectionHeader title="describe your package" />
      <div className="flex flex-col gap-[20px]">
        {fields.map((field, i) => {
          return (
            <ItemDetailsSection
              key={field.id}
              index={i}
              handleRemoveItem={() => handleRemove(i)}
              isDraft={isDraft}
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

const ItemDetailsSection = ({
  index,
  isDraft,
  expanded = false,
  handleRemoveItem,
}: ItemDetailsSectionProps) => {
  const { register, getValues, setValue } = useFormContext<ImportInputs>();
  const { open, toggle } = useAccordion(expanded);

  const emptyImage = {
    name: "No file chosen",
    base64: "https://placehold.co/500x500/cac4d0/1d192b?text=Image",
  };
  const draftImage: DraftImageType =
    getValues(`requestPackage.items.${index}.draftImage`) ?? emptyImage;
  const initialImage = isDraft ? draftImage : emptyImage;

  const [image, setImage] = useState<DraftImageType>(initialImage);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!(files instanceof FileList)) return;
    if (!(files[0] instanceof Blob)) return;

    const name = files[0].name;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      const base64String = base64Data?.toString() ?? emptyImage.base64;
      setImage({ name, base64: base64String });
    };
    reader.readAsDataURL(files[0] as Blob);
  };

  useEffect(() => {
    setValue(`requestPackage.items.${index}.draftImage`, image);
  }, [image]);

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[30px]">
            <div className="col-span-full flex items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Item - <span className="text-primary-600">#{index + 1}</span>
              </h4>
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
                <div className="col-span-full">
                  <TextInput
                    id={`itemName-${index}`}
                    label={"Item Name"}
                    {...register(`requestPackage.items.${index}.name`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-6">
                  <SelectInput
                    id={`idType-${index}`}
                    label={"ID Type"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Select type of ID
                        </option>

                        {ID_TYPE.map((idType) => {
                          return (
                            <option key={idType} value={idType}>
                              {idType}
                            </option>
                          );
                        })}
                      </>
                    }
                    {...register(`requestPackage.items.${index}.idType`)}
                  />
                  <TooltipButton label="" position="left-start" />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-6 ">
                  <TextInput
                    id={`idNumber-${index}`}
                    label={"ID Number"}
                    {...register(`requestPackage.items.${index}.idNumber`)}
                  />
                  <TooltipButton label="" position="left-start" />
                </div>

                <div className="col-span-full flex items-center gap-[10px]">
                  <SelectInput
                    id={`itemDeliveryStatus-${index}`}
                    label={"Item Delivery Status"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          No
                        </option>

                        {ITEM_DELIVERY_STATUS.map((itemDeliveryStatus) => {
                          return (
                            <option
                              key={itemDeliveryStatus}
                              value={itemDeliveryStatus}
                            >
                              {itemDeliveryStatus}
                            </option>
                          );
                        })}
                      </>
                    }
                    {...register(
                      `requestPackage.items.${index}.deliveryStatus`,
                    )}
                  />
                  <TooltipButton label="" position="left-start" />
                </div>

                <div className="col-span-full flex items-center gap-[10px]">
                  <SelectInput
                    id={`deliveredBy-${index}`}
                    label={"Delivered By"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Select Courier
                        </option>

                        {COURIERS.map((courier) => {
                          return (
                            <option key={courier} value={courier}>
                              {courier}
                            </option>
                          );
                        })}
                      </>
                    }
                  />
                  <TooltipButton label="" position="left-start" />
                </div>

                <div className="col-span-full md:col-span-8">
                  <CurrencyInput
                    id={`itemOriginalCost-${index}`}
                    label={"Item Original Cost"}
                    {...register(`requestPackage.items.${index}.originalCost`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <QuantityInput
                    id={`quantity-${index}`}
                    label={"Quantity"}
                    {...register(`requestPackage.items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    handleAdd={() => {
                      const prev =
                        getValues(`requestPackage.items.${index}.quantity`) ??
                        0;
                      const value = prev + 1;
                      setValue(`requestPackage.items.${index}.quantity`, value);
                    }}
                    handleSubtract={() => {
                      const prev =
                        getValues(`requestPackage.items.${index}.quantity`) ??
                        0;
                      if (prev <= 1) return;
                      const value = prev - 1;
                      setValue(`requestPackage.items.${index}.quantity`, value);
                    }}
                  />
                </div>

                <div className="col-span-full">
                  <FileInput
                    id={`itemPicture-${index}`}
                    label={"Upload Item Picture"}
                    fileName={image.name}
                    {...register(`requestPackage.items.${index}.image`, {
                      onChange: handleImageChange,
                    })}
                  />
                </div>

                <div className="col-span-full">
                  <TextAreaInput
                    id={`additionalItemDescription-${index}`}
                    label={"Additional Item Description"}
                    {...register(`requestPackage.items.${index}.description`)}
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
              <DeleteItemButton onClick={handleRemoveItem} />
            </div>
          </div>
        </SectionContentLayout>
        <div className="hidden md:block">
          <DeleteButtonIcon onClick={handleRemoveItem} />
        </div>
      </div>
    </>
  );
};

export type DeliveryStatusMapType = Record<
  (typeof PACKAGE_DELIVERY_STATUS)[number],
  { imageText: JSX.Element; whatNext: JSX.Element }
>;

export const Step3 = () => {
  const { draftPackage } = useImportContext();

  if (!draftPackage) return;

  const deliveryStatusMap: DeliveryStatusMapType = {
    "None delivered": {
      imageText: (
        <CongratulationImage
          title="OOPS... You can't request for an Import order yet"
          description={
            <>
              Send your package to our Warehouse in United States (your selected
              <b>&quot;Origin&quot;</b>)
            </>
          }
        />
      ),
      whatNext: (
        <Guidelines>
          <StepDescription
            stepNumber={1}
            description="Once you are sure that this package has gotten to the warehouse address above, attempt requesting for a new import order and provide us information we need to Identify the package as yours."
            backgroundColor="bg-primary-600"
          />

          <StepDescription
            stepNumber={2}
            description={
              <span className="body-lg md:title-lg text-gray-900">
                Here are some tip to help us quickly identify your package
                <ul className="list-item pl-[30px] [&>*]:list-disc">
                  <li>Attach your USER ID on the Package if you can.</li>
                  <li>
                    If you are purchasing the package directly from the seller,
                    provide us the TRACKING ID or any other related ID on the
                    package that is Unique to your order from the seller.
                  </li>
                  <li>
                    If you have the actual picture of the package, provide it
                    while requesting for the Import order on our website
                  </li>
                </ul>
              </span>
            }
            backgroundColor="bg-primary-600"
          />
        </Guidelines>
      ),
    },
    "All delivered": {
      imageText: (
        <CongratulationImage description="You have just successfully requested for Import service." />
      ),
      whatNext: <Instructions />,
    },
    "Some delivered": {
      imageText: (
        <CongratulationImage
          title="OOPS... You can't request for an Import order yet"
          description={
            <>
              Your request has been as <b>&quot;Draft&quot;</b>. To complete
              your request, kindly send the remaining items in your package to
              our Warehouse in United States (your selected{" "}
              <b>&quot;Origin&quot;</b>)
            </>
          }
        />
      ),
      whatNext: (
        <Guidelines>
          <StepDescription
            stepNumber={1}
            description={
              <>
                Once you are sure that all the items yet to be delivered in your
                package have gotten to the warehouse address above, come to the
                <b>'Draft'</b> folder to update the 'Item Delivery Status' of
                these items and submit your request for a new import order
              </>
            }
            backgroundColor="bg-primary-600"
          />

          <StepDescription
            stepNumber={2}
            description={
              <span className="body-lg md:title-lg text-gray-900">
                Here are some tip to help us quickly identify your package
                <ul className="list-item pl-[30px] [&>*]:list-disc">
                  <li>Attach your USER ID on the Package if you can.</li>
                  <li>
                    If you are purchasing the package directly from the seller,
                    provide us the TRACKING ID or any other related ID on the
                    package that is Unique to your order from the seller.
                  </li>
                  <li>
                    If you have the actual picture of the package, provide it
                    while requesting for the Import order on our website
                  </li>
                </ul>
              </span>
            }
            backgroundColor="bg-primary-600"
          />
        </Guidelines>
      ),
    },
  };

  return (
    <div className="flex flex-col gap-[30px]">
      {deliveryStatusMap[draftPackage.deliveryStatus].imageText}
      {draftPackage.deliveryStatus !== "All delivered" && (
        <OfficeDeliverAddress />
      )}
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="What Next?" />
        <SectionContentLayout>
          {deliveryStatusMap[draftPackage.deliveryStatus].whatNext}
        </SectionContentLayout>
      </div>
    </div>
  );
};

export const OfficeDeliverAddress = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px]">
        <div className="flex w-full items-center gap-[30px]">
          <h4 className="title-md md:title-lg text-gray-700">
            Our office address to deliver your package
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
            <DetailSection
              label="Address"
              value="No, 1osolo way, ikeja road, behind scaint merry"
            />
            <DetailSection
              label="Country"
              value="Turkey"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="State"
              value="Istanbul"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="City"
              value="Cyprusic"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Zip/postal Code"
              value="98765"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export type InstructionsMapType = { content: string | JSX.Element };

const Instructions = () => {
  const instructionsMap: InstructionsMapType[] = [
    {
      content: (
        <>
          Kindly note that we use the package descriptions you provided to
          identify the package you claim to have been delivered to our Warehouse
          (<span className="text-primary-600">Origin warehouse</span> you
          selected) for shipping.
        </>
      ),
    },
    {
      content:
        "After we have been able to Identify your package, you will be notified so you can proceed to Initiate shipping processes for your package.",
    },
    {
      content:
        "Additionally, you will just agree with the shipping cost to allow us process your Order, You will be paying for the shipment Cost when upon arrival/clearing of your package.",
    },
    {
      content:
        "And finally, you will be paying for the shipping cost when the package gets to our office in Nigeria (you would inform us about the one closest to you in the coming shipping stages",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium text-neutral-700 md:pl-[14px] md:font-bold">
        Here is how to pick your package up from our office
      </span>
      <ul className="flex flex-col gap-[14px]">
        {instructionsMap.map((item, i) => (
          <StepDescription
            key={i}
            stepNumber={i + 1}
            description={item.content}
            backgroundColor="bg-primary-600"
          />
        ))}
      </ul>
    </div>
  );
};

type GuidelinesProps = { children: ReactNode };

export const Guidelines = ({ children }: GuidelinesProps) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium text-neutral-700 md:pl-[14px] md:font-bold">
        Here are some guidelines for you
      </span>
      <ul className="flex flex-col gap-[14px]">{children}</ul>
    </div>
  );
};

const SelectOrigin = () => {
  const { register } = useFormContext<ImportInputs>();

  return (
    <div className="flex items-center gap-[10px]">
      <SelectInput
        id={"origin"}
        label={"Origin"}
        options={
          <>
            <option value="" disabled hidden>
              Select Origin
            </option>

            {ORIGINS.map((origin) => {
              return (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              );
            })}
          </>
        }
        {...register("requestPackage.originWarehouse")}
      />
      <TooltipButton label="" position="left-start" />
    </div>
  );
};

const SelectPackageDeliveryStatus = () => {
  const { register } = useFormContext<ImportInputs>();

  return (
    <div className="flex items-center gap-[10px]">
      <SelectInput
        id={"packageDeliveryStatus"}
        label={"Package Delivery Status"}
        options={
          <>
            <option value="" disabled hidden>
              Select a Delivery Status
            </option>

            {PACKAGE_DELIVERY_STATUS.map((deliveryStatus) => {
              return (
                <option key={deliveryStatus} value={deliveryStatus}>
                  {deliveryStatus}
                </option>
              );
            })}
          </>
        }
        {...register("requestPackage.deliveryStatus")}
      />
      <TooltipButton label="" position="left-start" />
    </div>
  );
};

export default RequestOrder;
