/* eslint-disable @next/next/no-img-element */
import { Call, Edit, Google, Location } from "iconsax-react";
import { useEffect } from "react";
import { useAuthContext } from "~/contexts/AuthContext";
import TabContextProvider, {
  useTabContext,
  type TabType,
} from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import { BackButton } from "../Buttons/BackButton";
import LabelId from "../LabelId";
import TabContentLayout from "../Layouts/TabContentLayout";
import { DetailSection } from "../Shop/Orders/InitiateShipping";
import { SectionContentLayout } from "../Shop/Requests/RequestOrder";

type ProfileInformationProps = {
  handleHideTabs: () => void;
};

const ProfileInformation = ({ handleHideTabs }: ProfileInformationProps) => {
  const { user } = useAuthContext();

  if (!user) return null;

  const tabs: [TabType, ...TabType[]] = [
    {
      id: "account information",
      title: "Account information",
      content: <>Account information</>,
    },
    {
      id: "additional information",
      title: "Additional information",
      content: <>Additional information</>,
    },
    { id: "activities", title: "Activities", content: <>Activities</> },
  ];

  return (
    <TabContentLayout>
      <div className="flex max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <SectionContentLayout>
          <div className="-mx-[35px] flex w-full flex-grow flex-col gap-[20px]">
            <div className="-mt-[21px] w-full flex-grow">
              <SectionContentLayout>
                <div className="-m-[10px] w-full flex-grow">
                  <LabelId label="User ID" id={user.racId} center />
                </div>
              </SectionContentLayout>
            </div>

            <div className="mx-[35px] grid grid-cols-1 items-center gap-[20px] md:grid-cols-12">
              <img
                src="https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto"
                alt="user image"
                className="col-span-2 h-[138px] w-[138px] rounded-full border-[12px] border-surface-100"
              />

              <div className="col-span-4 flex flex-col gap-[10px]">
                <DetailSection
                  label="First Name"
                  labelHeight="h-[20px]"
                  value={user.firstName}
                />
                <DetailSection
                  label="Last Name"
                  labelHeight="h-[20px]"
                  value={user.lastName}
                />
              </div>

              <div className="col-span-6 flex flex-col">
                <div className="flex items-center gap-[10px]">
                  <Call color="#292d32" className="m-[12px]" />
                  <span className="title-md md:title-lg break-words !font-medium text-neutral-900 md:!font-normal">
                    {`${user.billingDetails.countryCode} ${user.billingDetails.phoneNumber}`}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <Google color="#292d32" className="m-[12px]" />
                  <span className="title-md md:title-lg break-words !font-medium text-neutral-900 md:!font-normal">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <Location color="#292d32" className="m-[12px]" />
                  <span className="title-md md:title-lg break-words !font-medium text-neutral-900 md:!font-normal">
                    {user.billingDetails.address}
                  </span>
                </div>
              </div>

              <div className="col-span-full w-full md:max-w-[302px]">
                <button
                  onClick={undefined}
                  aria-label="Edit personal information"
                  className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
                >
                  <Edit size={18} variant="Bold" />
                  <span className="label-lg text-white">
                    Edit personal information
                  </span>
                </button>
              </div>
            </div>
          </div>
        </SectionContentLayout>

        <TabContextProvider tabs={tabs} defaultTabId={"account information"}>
          <SubTabs />
        </TabContextProvider>

        <div className="w-full md:max-w-[169px]">
          <BackButton text="Back to settings" onClick={handleHideTabs} />
        </div>
      </div>
    </TabContentLayout>
  );
};

const SubTabs = () => {
  const { activeTab, tabsRef, handleTabChange, tabs } = useTabContext();

  if (!tabs) return;

  const handleRef = (el: HTMLButtonElement) => {
    if (!el) return;
    if (tabsRef.current.length >= 3) tabsRef.current.shift();
    tabsRef.current.push(el);
  };

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-grow flex-col gap-[20px]">
        <div className="tabs relative -mx-[34px] -mt-[20px] flex flex-col">
          <div className="absolute h-[50px] w-full overflow-x-auto overflow-y-hidden rounded-b-[20px] border-b border-b-gray-200 "></div>
          <div className="relative grid h-[50px] w-max grid-cols-3 items-center">
            {tabs.map(({ id, title }) => {
              return (
                <button
                  ref={handleRef}
                  key={`sub-tab-${id.replace(" ", "-")}`}
                  data-type="tabs"
                  data-target={`#sub-panel-${id.replace(" ", "-")}`}
                  className={`flex h-[49px] flex-col items-center justify-end gap-1 whitespace-nowrap px-4 py-2 ${
                    activeTab === id && "active text-primary-600"
                  }`}
                  onClick={() => handleTabChange(id)}
                >
                  <p className="text-sm font-medium tracking-[.00714em]">
                    {title}
                  </p>
                </button>
              );
            })}

            <div
              role="indicator"
              className="absolute bottom-0 left-0 ml-[calc(33.3%-25%)] h-0.5 w-[17%] rounded-t-full bg-primary-600 transition-all duration-200 ease-in-out"
            ></div>
          </div>
          <SubTabContentPanels />
        </div>
      </div>
    </SectionContentLayout>
  );
};

const SubTabContentPanels = () => {
  const { activeTab, tabs } = useTabContext();

  if (!tabs) return;

  return (
    <div className="flex w-full flex-col items-center justify-center p-[20px]">
      {tabs.map(({ id, content }) => {
        return (
          <div
            key={`sub-panel-${id.replace(" ", "-")}`}
            id={`sub-panel-${id.replace(" ", "-")}`}
            role="tabpanel"
            className={`duration-400 hidden w-full transition ease-in-out [&.active]:block ${
              id === activeTab && "active"
            }`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileInformation;
