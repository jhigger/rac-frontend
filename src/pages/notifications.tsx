import { ArrowCircleLeft2 } from "iconsax-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import PageLayout from "~/components/Layouts/PageLayout";
import NotificationList from "~/components/Notifications/NotificationList";
import TopAppBar from "~/components/TopAppBar";
import { useAuthContext } from "~/contexts/AuthContext";
import { navItems, useNavContext } from "~/contexts/NavigationContext";
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
        <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-140px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
          {notifications.length > 0 ? <NotificationList /> : <Empty />}
        </div>
      </PageLayout>
    </TabContextProvider>
  );
};

const Empty = () => {
  const { previousRoute } = useNavContext();
  const router = useRouter();

  const [route, setRoute] = useState("Shop For Me");
  const [href, setHref] = useState<string | null>(null);

  const handleBack = () => {
    if (href) {
      router.back();
    } else {
      void router.push("/shop");
    }
  };

  useEffect(() => {
    const path = navItems.find(
      (navItem) =>
        navItem.href === previousRoute && navItem.href !== "/notifications",
    );
    setHref(path?.href ?? null);
    if (path) {
      setRoute(path.title);
    }
  }, []);

  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
      <h2 className="title-lg max-w-[462px] text-center">
        <Balancer>You don&apos;t have any notification here yet.</Balancer>
      </h2>
      <div className="w-max">
        <PrimaryBackButton text={`Return to ${route}`} onClick={handleBack} />
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
