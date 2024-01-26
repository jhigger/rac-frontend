import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ArrowCircleRight2,
  ArrowLeft,
  Eye,
  NotificationBing,
} from "iconsax-react";
import Link from "next/link";
import { useEffect } from "react";
import { useToggle } from "usehooks-ts";
import {
  useNotificationContext,
  type NotificationItemType,
} from "~/contexts/NotificationContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import { DeleteButtonIcon } from "../Buttons/DeleteButtonIcon";
import { DeleteItemButton } from "../Buttons/DeleteItemButton";
import ModalButton from "../Buttons/ModalButton";
import { PrimaryBackButton } from "../Buttons/PrimaryBackButton";
import { PrimaryCloseModalButton } from "../Buttons/PrimaryCloseModalButton";
import AccordionButton from "../Forms/AccordionButton";
import PaymentConfirmedContent from "../Modals/PaymentConfirmedContent";
import { RequestFormHeader } from "../Shop/Requests/RequestOrder";
import {
  notificationMessageCategories,
  type NotificationListItemProps,
} from "./NotificationList";

dayjs.extend(relativeTime);

export const NotificationButton = () => {
  const {
    notifications,
    selectedNotification,
    clearAll,
    handleSelectedNotification,
  } = useNotificationContext();
  const { customText, handleCustomText } = useTabContext();

  useEffect(() => {
    tailmater();
  }, []);

  useEffect(() => {
    if (selectedNotification) {
      handleCustomText(
        notificationMessageCategories[selectedNotification.type].getCustomText(
          selectedNotification.order,
        ),
      );
    } else {
      handleCustomText(null);
    }
  }, [selectedNotification]);

  return (
    <ModalButton
      modalId="notifications"
      label="Notification"
      buttonClassName="btn relative flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
      buttonContent={
        <>
          <NotificationBing className="text-gray-500" />
          {notifications.length > 0 && (
            <div className="label-sm absolute right-3 top-3 flex h-[10px] min-w-[10px] items-center justify-center rounded-full bg-error-600 p-1 text-[8px] text-white">
              {/* put notification count here */}
            </div>
          )}
        </>
      }
      footerContent={({ dataClose }) =>
        !selectedNotification ? (
          <>
            <div className="hidden flex-col items-center justify-center gap-[10px] md:flex md:flex-row md:[&>*]:w-max">
              <ClearAllButton onClick={clearAll} />
              <ViewAllButton dataClose={dataClose} />
              <PrimaryCloseModalButton dataClose={dataClose} />
            </div>
            {/* for mobile */}
            <div className="flex flex-col items-center justify-center gap-[10px] md:hidden md:flex-row">
              <div className="w-full">
                <ViewAllButton dataClose={dataClose} />
              </div>
              <div className="flex w-full gap-[10px]">
                <ClearAllButton onClick={clearAll} />
                <PrimaryCloseModalButton dataClose={dataClose} />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full self-center md:max-w-[300px]">
            <PrimaryBackButton
              onClick={() => handleSelectedNotification(null)}
            />
          </div>
        )
      }
    >
      <RequestFormHeader title="Notifications" />

      {selectedNotification ? (
        <>
          <div className="flex items-center gap-[15px] rounded-[20px] bg-surface-200 p-[20px] text-secondary-600">
            <span className="title-sm">Notifications</span>
            <ArrowLeft size={10} variant="Outline" />
            <span className="title-sm">{customText}</span>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex w-full flex-col gap-[30px] rounded-[20px] bg-surface-100 p-[20px]">
              {/* //todo: replace with real content based on notificationMessageCategories in context */}
              <PaymentConfirmedContent order={selectedNotification.order} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[30px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col gap-[10px]">
              {notifications.map((notification, i) => {
                return (
                  <NotificationItem
                    key={i}
                    index={i}
                    notification={notification}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">Empty</div>
          )}
        </div>
      )}
    </ModalButton>
  );
};

type ViewAllButtonProps = { dataClose: string };

export const ViewAllButton = ({ dataClose }: ViewAllButtonProps) => {
  const { handleSelectedNotification } = useNotificationContext();

  return (
    <Link href="/notifications" data-close={dataClose}>
      <div
        aria-label="View All"
        onClick={() => handleSelectedNotification(null)}
        className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
      >
        <ArrowCircleRight2
          size={18}
          variant="Bold"
          className="text-primary-600"
        />
        <span className="label-lg text-primary-600">View All</span>
      </div>
    </Link>
  );
};

type ClearAllButtonProps = { onClick: () => void };

export const ClearAllButton = ({ onClick }: ClearAllButtonProps) => {
  return (
    <button
      type="button"
      aria-label="clear all"
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600 md:px-6"
    >
      <span className="label-lg">Clear All</span>
    </button>
  );
};

type NotificationItemProps = NotificationListItemProps;

export const NotificationItem = ({ index }: NotificationItemProps) => {
  const [open, toggle] = useToggle(false);
  const { notifications, handleDelete } = useNotificationContext();
  const notification = notifications[index];

  if (notification === undefined) return;

  return (
    <div className="flex items-center gap-[20px]">
      <div className="flex flex-grow flex-col gap-[20px] rounded-[20px] bg-surface-100 p-[20px] md:flex-row md:items-center">
        <span className="body-lg flex-grow text-start">
          {notificationMessageCategories[notification.type].getMessage(
            notification.order,
          )}
        </span>
        <span className="title-sm flex justify-between font-medium text-black">
          {dayjs(notification.localDate).fromNow()}
          <div className="md:hidden">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </span>
        <div className="hidden md:block">
          <PreviewNotificationButton notification={notification} />
        </div>
        {/* for mobile */}
        {open && (
          <div className="flex flex-col gap-[10px] border-t-[0.5px] border-dashed border-t-gray-500 pt-[10px] md:hidden">
            <PreviewNotificationButton notification={notification} />
            <DeleteItemButton onClick={() => handleDelete(index)} />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <DeleteButtonIcon onClick={() => handleDelete(index)} />
      </div>
    </div>
  );
};

type PreviewNotificationButtonProps = {
  notification: NotificationItemType;
};

export const PreviewNotificationButton = ({
  notification,
}: PreviewNotificationButtonProps) => {
  const { handleSelectedNotification } = useNotificationContext();

  const handleClick = () => {
    handleSelectedNotification(notification);
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Preview Notification"
        className="btn relative hidden flex-row items-center justify-center rounded-[6.25rem] md:flex"
      >
        <Eye />
      </button>
      {/* mobile version */}
      <button
        onClick={handleClick}
        aria-label="Preview Notification"
        className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:hidden md:px-6"
      >
        <Eye size={18} variant="Bold" />
        <span>Preview</span>
      </button>
    </>
  );
};
