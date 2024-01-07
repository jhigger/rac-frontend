import { Calculator, Whatsapp } from "iconsax-react";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { formatCurrency } from "~/Utils";
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
import SelectCityInput from "~/components/Forms/Inputs/SelectCityInput";
import SelectCountryInput from "~/components/Forms/Inputs/SelectCountryInput";
import SelectCountryPhoneCodeInput from "~/components/Forms/Inputs/SelectCountryPhoneCodeInput";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import SelectStateInput from "~/components/Forms/Inputs/SelectStateInput";
import TextAreaInput from "~/components/Forms/Inputs/TextAreaInput";
import TextInput from "~/components/Forms/Inputs/TextInput";
import LabelId from "~/components/LabelId";
import { PurpleDetailSection } from "~/components/Shop/Orders/ClearPackage";
import {
  BillingAddress,
  DetailSection,
} from "~/components/Shop/Orders/InitiateShipping";
import { StepDescription } from "~/components/Shop/Orders/OrdersPanel";
import {
  DefaultBillingAddressRadio,
  StepIndex,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import {
  HighlightedInfo,
  PackageOrigin,
} from "~/components/Shop/Requests/RequestDetails";
import {
  AddButton,
  AddPropertiesSection,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
  type ItemDetailsSectionProps,
} from "~/components/Shop/Requests/RequestOrder";
import { CAR_CONDITIONS, ORIGINS } from "~/constants";
import {
  useAutoImportContext,
  type AutoImportItemType,
  type AutoImportRequestPackageType,
  type PickupDetailsType,
} from "~/contexts/AutoImportContext";
import { type DraftImageType } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import useStatesCities from "~/hooks/useStatesCities";
import { type AutoImportOrderItemProps } from "../Orders/InitiateShipping";

export const emptyValue: AutoImportRequestPackageType = {
  requestId: "",
  requestStatus: "Not Responded",
  requestLocalDate: new Date().toLocaleString(),
  originWarehouse: "US Warehouse (Richmond Texas)",
  items: [
    {
      brand: "",
      model: "",
      productionYear: "",
      value: 0,
      condition: "Drivable",
      color: "",
      mileage: 0,
      vin: "",
      url: "",
      image: "",
      carTitleCopy: "",
      description: "",
    },
  ],
  shipmentDetails: {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipPostalCode: "",
  },
  billingDetails: {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipPostalCode: "",
  },
  shippingPaymentStatus: "Unpaid",
  clearingPaymentStatus: "Unpaid",
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

export type AutoImportInputs = {
  requestPackage: AutoImportRequestPackageType;
};

const RequestOrder = () => {
  const { handleRequests, handleDraft, handleLocalDraft } =
    useAutoImportContext();
  const { handleTabChange, handleActiveAction } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Details", content: <Step1 /> },
    {
      title: "Shipping & Billing Address",
      content: <Step2 />,
    },
    { title: "Order Summary", content: <Step3 /> },
    { title: "Success", content: <Step4 /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const {
    step,
    currentStepIndex,
    next,
    isFirstStep,
    isSecondToLastStep,
    isLastStep,
    back,
  } = useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  const formMethods = useForm<AutoImportInputs>({
    defaultValues: {
      requestPackage: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<AutoImportInputs> = async (data) => {
    if (isSecondToLastStep) {
      console.log(data.requestPackage);
    } else if (currentStepIndex === 1) {
      handleDraft(data.requestPackage);
    }
    next();
  };

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
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
        <RequestFormHeader title="Requesting For New Auto Import Order" />

        <StepIndex
          currentIndex={currentStepIndex}
          length={steps.length}
          title={currentTitle}
        />

        {isLastStep && (
          // todo: submit response should have requestId
          <>
            <SectionContentLayout>
              <LabelId label="Request ID" id="R78667" center />
            </SectionContentLayout>
            <CongratulationImage description="You have just successfully requested an order for Auto Import service." />
          </>
        )}

        {step}

        {!isLastStep ? (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              {isFirstStep && <BackButton onClick={handleBack} />}
              {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
              <SaveAsDraftButton onClick={handleSaveAsDraft} />
              <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                {isFirstStep && <BackButton onClick={handleBack} />}
                {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
              </div>
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <ProceedButton onClick={formMethods.handleSubmit(onSubmit)} />
              </div>
              <div className="col-span-full">
                <SaveAsDraftButton onClick={handleSaveAsDraft} />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full md:w-[200px]">
            <DoneButton onClick={handleFinish} />
          </div>
        )}

        <NeedHelpFAB />
      </div>
    </FormProvider>
  );
};

type Step1Props = { isDraft?: boolean };

export const Step1 = ({ isDraft = false }: Step1Props) => {
  const { control } = useFormContext<AutoImportInputs>();
  const { fields, append, remove } = useFieldArray<AutoImportInputs>({
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
      <SelectWarehouseOriginSection />
      <SectionHeader title="Fill in the Car(s) details" />
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

const SelectWarehouseOriginSection = () => {
  const { register } = useFormContext<AutoImportInputs>();

  return (
    <>
      <SectionHeader
        title="Tell us where your Car(s) will be shipped from"
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
    </>
  );
};

const ItemDetailsSection = ({
  index,
  isDraft,
  expanded = false,
  handleRemoveItem,
}: ItemDetailsSectionProps) => {
  const { register, getValues, setValue } = useFormContext<AutoImportInputs>();
  const { open, toggle } = useAccordion(expanded);

  const emptyImage = {
    name: "No file chosen",
    base64: "https://placehold.co/500x500/cac4d0/1d192b?text=Image",
  };
  const draftImage: DraftImageType =
    getValues(`requestPackage.items.${index}.draftCarImage`) ?? emptyImage;
  const initialCarImage = isDraft ? draftImage : emptyImage;
  const initialCarTitleImage = isDraft ? draftImage : emptyImage;

  const [carImage, setCarImage] = useState<DraftImageType>(initialCarImage);
  const [carTitleImage, setCarTitleImage] =
    useState<DraftImageType>(initialCarTitleImage);

  const handleCarImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!(files instanceof FileList)) return;
    if (!(files[0] instanceof Blob)) return;

    const name = files[0].name;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      const base64String = base64Data?.toString() ?? emptyImage.base64;
      setCarImage({ name, base64: base64String });
    };
    reader.readAsDataURL(files[0] as Blob);
  };

  const handleCarTitleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!(files instanceof FileList)) return;
    if (!(files[0] instanceof Blob)) return;

    const name = files[0].name;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      const base64String = base64Data?.toString() ?? emptyImage.base64;
      setCarTitleImage({ name, base64: base64String });
    };
    reader.readAsDataURL(files[0] as Blob);
  };

  useEffect(() => {
    setValue(`requestPackage.items.${index}.draftCarImage`, carImage);
    setValue(`requestPackage.items.${index}.draftCarTitleImage`, carTitleImage);
  }, [carImage, carTitleImage]);

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[30px]">
            <div className="col-span-full flex items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Car - <span className="text-primary-600">#{index + 1}</span>
              </h4>
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`brand-${index}`}
                    label={"Brand"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Car Brand
                        </option>
                      </>
                    }
                    {...register(`requestPackage.items.${index}.brand`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`model-${index}`}
                    label={"Model"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Car Model
                        </option>
                      </>
                    }
                    {...register(`requestPackage.items.${index}.model`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`productionYear-${index}`}
                    label={"Production Year"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Car production year
                        </option>
                      </>
                    }
                    {...register(
                      `requestPackage.items.${index}.productionYear`,
                    )}
                  />
                </div>

                <div className="col-span-full md:col-span-5">
                  <CurrencyInput
                    id={`carValue-${index}`}
                    label={"Car Value"}
                    {...register(`requestPackage.items.${index}.value`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`carCondition-${index}`}
                    label={"Car Condition"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Select Condition
                        </option>

                        {CAR_CONDITIONS.map((condition) => {
                          return (
                            <option key={condition} value={condition}>
                              {condition}
                            </option>
                          );
                        })}
                      </>
                    }
                    {...register(`requestPackage.items.${index}.condition`)}
                  />
                </div>

                <div className="col-span-full md:col-span-3">
                  <TextInput
                    id={`carColor-${index}`}
                    label={"Car Color"}
                    {...register(`requestPackage.items.${index}.color`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <TextInput
                    id={`mileage-${index}`}
                    label={"Mileage"}
                    type="number"
                    {...register(`requestPackage.items.${index}.mileage`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <TextInput
                    id={`vin-${index}`}
                    label={"Vehicle Identification Number"}
                    {...register(`requestPackage.items.${index}.vin`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <TextInput
                    id={`url-${index}`}
                    label={"Car's Website Link"}
                    {...register(`requestPackage.items.${index}.url`)}
                  />
                </div>

                <div className="col-span-full md:col-span-6">
                  <FileInput
                    id={`carPicture-${index}`}
                    label={"Upload Car Picture"}
                    fileName={carImage.name}
                    {...register(`requestPackage.items.${index}.image`, {
                      onChange: handleCarImageChange,
                    })}
                  />
                </div>

                <div className="col-span-full md:col-span-6">
                  <FileInput
                    id={`carTitle-${index}`}
                    label={"Upload Copy of Car Title"}
                    fileName={carTitleImage.name}
                    {...register(`requestPackage.items.${index}.image`, {
                      onChange: handleCarTitleImageChange,
                    })}
                  />
                </div>

                <div className="col-span-full flex flex-col rounded-[20px] bg-error-200 px-[20px] py-[15px]">
                  <b>Note: </b>
                  <p className="body-md md:label-lg text-gray-700">
                    We need the details of the car title before we can schedule
                    a pick up. Be sure sure that our driver can collect it
                    during pick up, as we can&apos;t ship a car without the
                    title.
                  </p>
                </div>

                <div className="col-span-full">
                  <TextAreaInput
                    id={`additionalCarDescription-${index}`}
                    label={"Additional Car Description"}
                    {...register(`requestPackage.items.${index}.description`)}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader
                    title="Describe this car further with the following properties (optional)"
                    hr
                  />
                  <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
                    <AddPropertiesSection index={index} />
                  </div>
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader title="Additional details" hr />
                  <DropOffAddress index={index} />
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

type DropOffAddressProps = { index: number };

const DropOffAddress = ({ index }: DropOffAddressProps) => {
  const { open, toggle } = useAccordion(false);
  const { register } = useFormContext<NonNullable<AutoImportInputs>>();
  const { getValues, setValue, watch } =
    useFormContext<
      Pick<
        NonNullable<
          AutoImportInputs["requestPackage"]["items"][number]["pickupDetails"]
        >,
        "country" | "state" | "city"
      >
    >();
  const { states, cities } = useStatesCities({ getValues, setValue, watch });

  return (
    <>
      <div className="flex items-center gap-[60px]">
        <span className="title-lg text-neutral-900">Drop Off</span>
        <div className="flex items-center gap-[15px]">
          <div className="toggle-switch relative inline-flex w-[52px]">
            <input
              id={`dropOffSwitch-${index}`}
              className="toggle-checkbox hidden"
              type="checkbox"
              onClick={toggle}
            />
            <label
              htmlFor={`dropOffSwitch-${index}`}
              className="toggle-default transition-color relative block h-8 w-12 rounded-full duration-150 ease-out"
            ></label>
          </div>
          <TooltipButton label="" position="left-start" />
        </div>
      </div>
      {open && (
        <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
          <div className="flex w-full flex-col gap-[40px] py-[10px]">
            <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-full md:col-span-6">
                <TextInput
                  id={"contactFirstName"}
                  label={"Pick up Contact First Name"}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.firstName`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-6">
                <TextInput
                  id={"contactLastName"}
                  label={"Pick up Contact Last Name"}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.lastName`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-5">
                <TextInput
                  id={`pickUpEmail-${index}`}
                  label="Pick up Contact Email Address"
                  type="email"
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.email`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-3">
                <SelectCountryPhoneCodeInput
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.countryCode`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <TextInput
                  id={`contactPhoneNumber-${index}`}
                  label="Contact's Phone Number"
                  type="tel"
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.phoneNumber`,
                  )}
                />
              </div>

              <div className="col-span-full">
                <TextInput
                  id={`pickUpAddress-${index}`}
                  label={"Pick up Address"}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.address`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectCountryInput
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.country`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectStateInput
                  states={states}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.state`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectCityInput
                  cities={cities}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.city`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-6">
                <TextInput
                  id={`pickUpDate-${index}`}
                  label={"Pick up date"}
                  type="date"
                  min={new Date().toLocaleDateString()}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.pickUpDate`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-6">
                <TextInput
                  id={"locationType"}
                  label={"Pickup Location Type"}
                  {...register(
                    `requestPackage.items.${index}.pickupDetails.locationType`,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Step2 = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Fill in the Shipment Address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <FillInShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your Billing Information" />
        <DefaultBillingAddressRadio />
        <CustomBillingAddress />
      </div>
    </div>
  );
};

const CustomBillingAddress = () => {
  const { open, toggle } = useAccordion(true);
  const { register } = useFormContext<AutoImportInputs>();
  const { getValues, setValue, watch } =
    useFormContext<
      Pick<
        NonNullable<
          AutoImportInputs["requestPackage"]["items"][number]["pickupDetails"]
        >,
        "country" | "state" | "city"
      >
    >();
  const { states, cities } = useStatesCities({ getValues, setValue, watch });

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[40px] py-[10px]">
        <div className="col-span-full flex items-center gap-[10px] md:gap-[30px]">
          <input
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
            name="radio"
            type="radio"
            value="female"
            aria-label="Custom Billing Address"
          />
          <h4 className="title-md md:title-lg text-gray-700">
            Custom Billing Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[30px]">
              <div className="col-span-1">
                <TextInput
                  id={"firstName"}
                  label={"First Name"}
                  {...register("requestPackage.shipmentDetails.firstName")}
                />
              </div>

              <div className="col-span-1">
                <TextInput
                  id={"lastName"}
                  label={"Last Name"}
                  {...register("requestPackage.shipmentDetails.lastName")}
                />
              </div>
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-full md:col-span-5">
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  {...register("requestPackage.shipmentDetails.email")}
                />
              </div>
              <div className="col-span-full md:col-span-3">
                <SelectCountryPhoneCodeInput
                  {...register("requestPackage.shipmentDetails.countryCode")}
                />
              </div>
              <div className="col-span-full md:col-span-4">
                <TextInput
                  id="phone-number"
                  label="Phone Number"
                  type="tel"
                  {...register("requestPackage.shipmentDetails.phoneNumber")}
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"street-address"}
                label={"Street Address"}
                {...register("requestPackage.shipmentDetails.address")}
              />
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-4">
                <SelectCountryInput
                  {...register("requestPackage.billingDetails.country")}
                />
              </div>
              <div className="col-span-4">
                <SelectStateInput
                  states={states}
                  {...register("requestPackage.billingDetails.state")}
                />
              </div>
              <div className="col-span-4">
                <SelectCityInput
                  cities={cities}
                  {...register("requestPackage.billingDetails.city")}
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"zipPostalCode"}
                label={"Zip Postal Code"}
                {...register("requestPackage.billingDetails.zipPostalCode")}
              />
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const FillInShippingAddress = () => {
  const { register } = useFormContext<AutoImportInputs>();
  const { getValues, setValue, watch } =
    useFormContext<
      Pick<
        NonNullable<
          AutoImportInputs["requestPackage"]["items"][number]["pickupDetails"]
        >,
        "country" | "state" | "city"
      >
    >();
  const { states, cities } = useStatesCities({ getValues, setValue, watch });

  return (
    <div className="flex w-full flex-col gap-[40px] py-[10px]">
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
        <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[30px]">
          <div className="col-span-1">
            <TextInput
              id={"firstName"}
              label={"Receiver's First Name"}
              {...register("requestPackage.shipmentDetails.firstName")}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              id={"lastName"}
              label={"Receiver's Last Name"}
              {...register("requestPackage.shipmentDetails.lastName")}
            />
          </div>
        </div>

        <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
          <div className="col-span-full md:col-span-5">
            <TextInput
              id="email"
              label="Receiver's Email"
              type="email"
              {...register("requestPackage.shipmentDetails.email")}
            />
          </div>
          <div className="col-span-full md:col-span-3">
            <SelectCountryPhoneCodeInput
              {...register("requestPackage.shipmentDetails.countryCode")}
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <TextInput
              id="phone-number"
              label="Receiver's Phone Number"
              type="tel"
              {...register("requestPackage.shipmentDetails.phoneNumber")}
            />
          </div>
        </div>

        <div className="col-span-full">
          <TextInput
            id={"street-address"}
            label={"Receiver's Address"}
            {...register("requestPackage.shipmentDetails.address")}
          />
        </div>

        <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
          <div className="col-span-4">
            <SelectCountryInput
              {...register("requestPackage.shipmentDetails.country")}
            />
          </div>
          <div className="col-span-4">
            <SelectStateInput
              states={states}
              {...register("requestPackage.shipmentDetails.state")}
            />
          </div>
          <div className="col-span-4">
            <SelectCityInput
              cities={cities}
              {...register("requestPackage.shipmentDetails.city")}
            />
          </div>
        </div>

        <div className="col-span-full">
          <TextInput
            id={"zipPostalCode"}
            label={"Zip Postal Code"}
            {...register("requestPackage.billingDetails.zipPostalCode")}
          />
        </div>
      </div>
    </div>
  );
};

export const Step3 = () => {
  const { draftPackage } = useAutoImportContext();

  if (!draftPackage) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Package Details" />
      <PackageOrigin>
        <HighlightedInfo text="From the details you provided, your car(s) will be delivered and shipped from here to our your selected 'destination' in Nigeria" />
        <DetailSection
          label="Origin warehouse"
          value={draftPackage.originWarehouse}
        />
        <OriginWarehouseAddress />
      </PackageOrigin>
      <hr className="block w-full border-dashed border-primary-900" />
      {draftPackage.items.map((item, i) => {
        return <AutoImportOrderItem key={i} item={item} index={i} />;
      })}
      <SectionHeader title="Confirm your Shipping Details" />
      <DestinationAddressDetails />
      <SectionHeader title="Confirm your Billing Details" />
      <BillingAddress billingDetails={draftPackage.billingDetails} />
    </div>
  );
};

export const DestinationAddressDetails = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px]">
        <div className="flex w-full items-center gap-[30px]">
          <h4 className="title-md md:title-lg text-gray-700">
            Destination/Shipping Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
            <DetailSection
              label="Receiver's First Name"
              value="Malibu"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Receiver's Last Name"
              value="SHedrack"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Contact Number"
              value="+234 803 456 7845"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Receiver's Email"
              value="Malibushdrack@gmail.com"
              colSpanDesktop={4}
            />
            <div className="col-span-2"></div>
            <DetailSection
              label="Destination Country"
              value="Turkey"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Destination State"
              value="Istanbul"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Destination City"
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
            <DetailSection
              label="Receiver's Address"
              value="No, 1osolo way, ikeja road, behind scaint merry"
            />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

type PickupDetailsProps = {
  pickupDetails: PickupDetailsType;
  highlightedInfo?: boolean;
};

export const PickupDetails = ({
  pickupDetails,
  highlightedInfo = false,
}: PickupDetailsProps) => {
  return (
    <>
      <span className="title-md md:title-lg text-primary-900">
        Pickup Details
      </span>
      {highlightedInfo && (
        <HighlightedInfo text="Your Car will be picked up from this address" />
      )}
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10 [&>*]:text-primary-900">
        <PurpleDetailSection
          label="Contact's First Name"
          value={pickupDetails.firstName}
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Contact's Last Name"
          value={pickupDetails.lastName}
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Contact Number"
          value={`${pickupDetails.countryCode} ${pickupDetails.phoneNumber}`}
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Contact Email"
          value={pickupDetails.email}
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Street Address"
          value={pickupDetails.address}
        />
        <PurpleDetailSection
          label="Location of the Car (Country)"
          value={pickupDetails.country}
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <PurpleDetailSection
          label="Location of the Car (State)"
          value={pickupDetails.state}
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <PurpleDetailSection
          label="Location of the Car (City)"
          value={pickupDetails.city}
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <PurpleDetailSection
          label="Zip/postal Code"
          value={pickupDetails.zipPostalCode}
          colSpanMobile={1}
          colSpanDesktop={2}
        />

        <PurpleDetailSection
          label="Pick up Date"
          value={pickupDetails.pickUpDate}
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Location Type"
          value={pickupDetails.locationType}
          colSpanDesktop={4}
        />
      </div>
    </>
  );
};

export const AutoImportOrderItem = ({
  index,
  item,
}: AutoImportOrderItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg font-medium text-gray-700">
            Car - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && <AutoImportOrderItemDetails item={item} />}
        {item.pickupDetails && (
          <>
            <hr className="block w-full border-dashed border-primary-600" />
            <PickupDetails pickupDetails={item.pickupDetails} highlightedInfo />
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

type AutoImportOrderItemDetailsProps = { item: AutoImportItemType };

export const AutoImportOrderItemDetails = ({
  item,
}: AutoImportOrderItemDetailsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-12">
      <DetailSection label="Car Brand" value={item.brand} colSpanDesktop={5} />
      <DetailSection label="Model" value={item.model} colSpanDesktop={5} />
      <DetailSection
        label="Production Year"
        value={item.productionYear}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Car Value"
        value={formatCurrency(item.value)}
        colSpanDesktop={5}
      />
      <DetailSection
        label="Car Condition"
        value={item.condition}
        colSpanDesktop={3}
      />
      <DetailSection
        label="Car Color"
        value={item.color}
        colSpanMobile={1}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Mileage"
        value={`${item.mileage}km`}
        colSpanMobile={1}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Car Picture"
        value={item.image}
        image
        colSpanDesktop={5}
      />
      <DetailSection
        label="Copy of the Car Title"
        value={item.carTitleCopy}
        image
        colSpanDesktop={5}
      />
      <DetailSection label="Car Description" value={item.description} />

      {item.properties?.map((property) => {
        return (
          <DetailSection
            label={property.label}
            value={property.value}
            colSpanDesktop={3}
          />
        );
      })}
    </div>
  );
};

export const OriginWarehouseAddress = () => {
  return (
    <>
      <div className="flex items-center">
        <span className="title-md md:title-lg text-primary-900">
          Origin warehouse address
        </span>

        <hr className="mx-[10px] flex-grow border-dashed border-primary-900" />
      </div>
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
        <PurpleDetailSection
          label="First Name"
          value="Malibu"
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Last Name"
          value="SHedrack"
          colSpanDesktop={4}
        />
        <PurpleDetailSection
          label="Street Address"
          value="No, 1osolo way, ikeja road, behind scaint merry"
        />
        <PurpleDetailSection
          label="State"
          value="Istanbul"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <PurpleDetailSection
          label="City"
          value="Cyprusic"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <PurpleDetailSection
          label="Zip/postal Code"
          value="98765"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
      </div>
    </>
  );
};

export const Step4 = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="You have 4 more steps to take" />
        <SectionContentLayout>
          <div className="flex flex-col gap-[10px]">
            <span className="title-md md:title-lg font-medium text-neutral-700 md:pl-[14px] md:font-bold">
              Here are more information on how to track
            </span>
            <StepDescription
              stepNumber={1}
              description="We will review the details in your request and get back to you
                  with the shipping quote."
            />
            <StepDescription
              stepNumber={2}
              description={
                <>
                  To complete your order and initiate shipment of your car(s),
                  you are required to make payment for{" "}
                  <i>shipping and/or pick up only</i> a immediately we send you
                  the shipping quote while you delay the payment for port
                  handling & clearing fees upon their arrival to the port in
                  Nigeria.
                </>
              }
            />

            <StepDescription
              stepNumber={3}
              description="If your shipping address is Lagos, you will come to pick it up in our office otherwise we send it to your city"
            />
          </div>
        </SectionContentLayout>
      </div>

      <HaveAConcern />
    </div>
  );
};

const HaveAConcern = () => {
  return (
    <>
      <SectionHeader title="Have A Concern?" />
      <div className="flex flex-col flex-wrap gap-[30px] px-[10px] md:flex-row md:items-center md:pl-[34px]">
        <div className="flex max-w-[219px] flex-col gap-[10px]">
          <span className="body-md w-[219px]">
            Would you like to know the shipping cost of your package before
            hand?
          </span>
          <span className="w-fit">
            <GetAQuoteButton />
          </span>
        </div>
        <div className="flex max-w-[227px] flex-col gap-[10px]">
          <span className="body-md w-[219px]">
            Would you like to learn more about the port handling and clearing
            fee?
          </span>
          <span className="w-max">
            <CustomerSupportButton />
          </span>
        </div>
      </div>
    </>
  );
};

const GetAQuoteButton = () => {
  const onClick = () => {
    return;
  };

  return (
    <button
      onClick={onClick}
      aria-label="Get a quote"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Calculator size={18} className="text-primary-900" />
      <span className="label-lg font-medium text-primary-600">Get a quote</span>
    </button>
  );
};

export const CustomerSupportButton = () => {
  const onClick = () => {
    return;
  };
  return (
    <button
      onClick={onClick}
      aria-label="Speak to a Customer Rep"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Whatsapp size={18} className="text-primary-900" />
      <span className="label-lg font-medium text-primary-600">
        Speak to a Customer Rep
      </span>
    </button>
  );
};

export default RequestOrder;
