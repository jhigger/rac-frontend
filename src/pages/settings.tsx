/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { useState } from "react";
import NoTabsContentLayout from "~/components/Layouts/NoTabsContentLayout";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import ProfileInformation from "~/components/Settings/ProfileInformation";
import SettingsContent from "~/components/Settings/SettingsContent";
import { useAuthContext } from "~/contexts/AuthContext";
import TabContextProvider, { type TabType } from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const settings = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  const [showTabs, setShowTabs] = useState(false);
  const [defaultTabId, setDefaultTabId] = useState<TabType["id"] | null>(null);

  const handleShowTabs = (tabId: TabType["id"]) => {
    setShowTabs(true);
    setDefaultTabId(tabId);
  };

  const handleHideTabs = () => {
    setShowTabs(false);
    setDefaultTabId(null);
  };

  const tabs: [TabType, ...TabType[]] = [
    {
      id: "profile information",
      title: "Profile information",
      content: <ProfileInformation handleHideTabs={handleHideTabs} />,
    },
    {
      id: "communication preferences",
      title: "Communication preferences",
      content: <>Communication preferences</>,
    },
    { id: "security", title: "Security", content: <>Security</> },
  ];

  return (
    <TabContextProvider tabs={tabs} defaultTabId={defaultTabId}>
      <PageLayout>
        <TopAppBar hasTabs={showTabs} />
        {!showTabs && (
          <NoTabsContentLayout>
            <SettingsContent handleShowTabs={handleShowTabs} />
          </NoTabsContentLayout>
        )}
      </PageLayout>
    </TabContextProvider>
  );
};

export default settings;
