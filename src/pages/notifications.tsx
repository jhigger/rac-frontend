import { ArrowCircleLeft2 } from "iconsax-react";
import { useRouter } from "next/router";
import Balancer from "react-wrap-balancer";
import PageLayout from "~/components/Layouts/PageLayout";
import NotificationList from "~/components/Notifications/NotificationList";
import TopAppBar from "~/components/TopAppBar";
import { useAuthContext } from "~/contexts/AuthContext";
import { navItems } from "~/contexts/NavigationContext";
import { useNotificationContext } from "~/contexts/NotificationContext";
import TabContextProvider from "~/contexts/TabContext";

const notifications = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  const { notifications } = useNotificationContext();

  return (
    <TabContextProvider>
      <PageLayout>
        <TopAppBar tabs={false} />
        <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-121px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
          {notifications.length > 0 ? <NotificationList /> : <Empty />}
        </div>
      </PageLayout>
    </TabContextProvider>
  );
};

const Empty = () => {
  const router = useRouter();

  const handleBack = () => {
    const path = navItems.find((navItem) => navItem.href === router.asPath);
    if (path) {
      router.back();
    }
  };

  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
      <h2 className="title-lg max-w-[462px] text-center">
        <Balancer>You don&apos;t have any notification here yet.</Balancer>
      </h2>
      <div className="w-max">
        <PrimaryBackButton text="Return to ..." onClick={handleBack} />
      </div>
    </div>
  );
};

type PrimaryBackButtonProps = { text?: string; onClick: () => void };

export const PrimaryBackButton = ({
  text = "Back",
  onClick,
}: PrimaryBackButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ArrowCircleLeft2 size={18} variant="Bold" />
      <span className="label-lg text-white">{text}</span>
    </button>
  );
};

export default notifications;
