/* eslint-disable @next/next/no-img-element */
import { Call, Edit, Google, Location } from "iconsax-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { PrimaryButton } from "~/components/Buttons/PrimaryButton";
import LabelId from "~/components/LabelId";
import NoTabsContentLayout from "~/components/Layouts/NoTabsContentLayout";
import PageLayout from "~/components/Layouts/PageLayout";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { DetailSection } from "~/components/Shop/Orders/InitiateShipping";
import {
  RequestFormHeader,
  SectionContentLayout,
} from "~/components/Shop/Requests/RequestOrder";
import { useAuthContext } from "~/contexts/AuthContext";
import TabContextProvider, { type TabType } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

type SettingItemsType = {
  title: string;
  description: string;
  button: { label: string; onClick: () => void };
};

const settings = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  const [showTabs, setShowTabs] = useState(false);
  const [defaultTabId, setDefaultTabId] = useState<TabType["id"] | null>(null);

  const tabs: [TabType, ...TabType[]] = [
    {
      id: "profile information",
      title: "Profile information",
      content: <ProfileInformation />,
    },
    {
      id: "communication preferences",
      title: "Communication preferences",
      content: <>Communication preferences</>,
    },
    { id: "security", title: "Security", content: <>Security</> },
  ] as const;

  const handleShowTabs = (tabId: TabType["id"]) => {
    setShowTabs(true);
    setDefaultTabId(tabId);
  };

  useEffect(() => {
    tailmater();
  }, [showTabs]);

  return (
    <TabContextProvider tabs={tabs} defaultTabId={defaultTabId}>
      <PageLayout>
        <TopAppBar hasTabs={showTabs} />
        {!showTabs && (
          <NoTabsContentLayout>
            <SettingContents handleShowTabs={handleShowTabs} />
          </NoTabsContentLayout>
        )}
      </PageLayout>
    </TabContextProvider>
  );
};

type SettingContentsProps = {
  handleShowTabs: (tabId: TabType["id"]) => void;
};

const SettingContents = ({ handleShowTabs }: SettingContentsProps) => {
  const settingItems: SettingItemsType[] = [
    {
      title: "Profile Information",
      description:
        "We know you through your profile information and it reflects on your invoices",
      button: {
        label: "View Profile",
        onClick: () => handleShowTabs("profile information"),
      },
    },
    {
      title: "Communication preferences",
      description:
        "You can customize your notification preferences for order or shipping updates, promotions, etc.",
      button: {
        label: "Modify permissions",
        onClick: () => handleShowTabs("communication preferences"),
      },
    },
    {
      title: "Security",
      description: "You can update your security settings easily here.",
      button: {
        label: "Modify security settings",
        onClick: () => handleShowTabs("security"),
      },
    },
  ];

  return (
    <div className="flex max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="My Account" />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
        {settingItems.map((item) => {
          return (
            <SectionContentLayout key={item.title}>
              <div className="col-span-1 -mx-[14px] flex h-full flex-col gap-[10px]">
                <h4 className="title-md md:title-lg text-gray-700">
                  {item.title}
                </h4>
                <p className="body-lg h-full">{item.description}</p>
                <hr className="border-t-[1px] border-dashed border-t-gray-500" />
                <PrimaryButton
                  text={item.button.label}
                  onClick={item.button.onClick}
                />
              </div>
            </SectionContentLayout>
          );
        })}
      </div>
    </div>
  );
};

const ProfileInformation = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <TabContentLayout>
      <div className="flex max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <SectionContentLayout>
          <div className="-mx-[35px] flex w-full flex-grow flex-col gap-[20px]">
            <div className="-mt-[21px] w-full flex-grow">
              <SectionContentLayout>
                <div className="-m-[10px] w-full flex-grow">
                  <LabelId label="User ID" id="RACS1234567" center />
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
                  <span className="body-lg text-white">
                    Edit personal information
                  </span>
                </button>
              </div>
            </div>
          </div>
        </SectionContentLayout>
      </div>
    </TabContentLayout>
  );
};

export default settings;
