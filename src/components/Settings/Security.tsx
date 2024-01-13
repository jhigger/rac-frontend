import { useRef, useState, type ReactNode } from "react";
import { BackButton } from "../Buttons/BackButton";
import ModalButton from "../Buttons/ModalButton";
import TabContentLayout from "../Layouts/TabContentLayout";
import { RequestFormHeader } from "../Shop/Requests/RequestOrder";
import {
  PreferenceItem,
  type PreferenceType,
} from "./CommunicationPreferences";
import { type SettingsTabContentProps } from "./ProfileInformation";

type EnabledType = "app" | "email" | null;
type SecurityOptions = PreferenceType & { modalContent: ReactNode };

const Security = ({ handleHideTabs }: SettingsTabContentProps) => {
  const [enabled, setEnabled] = useState<EnabledType>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleEnabled = (enabledOption: EnabledType) => {
    if (enabled === null) setEnabled(enabledOption);
    else setEnabled(null);
  };

  const preferences: SecurityOptions[] = [
    {
      title: "Authentication via App",
      description:
        "Opt for an extra layer of security by using a Time-based One-Time Password (TOTP) authenticator app like Google Authenticator App. Scan the QR code or enter the provided key in your authenticator app to generate codes for login verification",
      onClick: () => {
        toggleEnabled("app");
      },
      disabled: !(enabled === "app"),
      modalContent: (
        <>
          <RequestFormHeader title="Authentication via App Setup" />
        </>
      ),
    },
    {
      title: "Authentication via Email",
      description:
        "Receive a verification code via Email for added security. A code will be sent to your registered email address during the login process",
      onClick: () => {
        toggleEnabled("email");
      },
      disabled: !(enabled === "email"),
      modalContent: (
        <>
          <RequestFormHeader title="Authentication via App Email" />
        </>
      ),
    },
  ];

  const handleRef = (el: HTMLButtonElement) => {
    if (!el) return;
    if (buttonsRef.current.length >= 2) buttonsRef.current.shift();
    buttonsRef.current.push(el);
  };

  return (
    <TabContentLayout>
      <div className="flex max-h-[794px] max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Setup Two-Factor Authentication (2FA)" />

        <div className="flex flex-col gap-[20px]">
          <span className="body-lg text-gray-700">
            Enhance the security of your account with Two-Factor Authentication.
            Choose your preferred method below;
          </span>

          {preferences.map((item, i) => {
            const disabled = item.disabled && enabled !== null;

            return (
              <div key={i}>
                <PreferenceItem
                  id={`security-${i}`}
                  title={item.title}
                  description={item.description}
                  onClick={({ isToggled }) => {
                    item.onClick();
                    if (!isToggled) buttonsRef.current?.[i]?.click();
                  }}
                  disabled={disabled}
                />
                <ModalButton
                  modalId={`security-modal-${i}`}
                  label="Authentication via App Setup"
                  buttonClassName="hidden"
                  footerContent={() => <></>}
                  ref={handleRef}
                >
                  {item.modalContent}
                </ModalButton>
              </div>
            );
          })}

          <span className="body-lg list-item list-inside text-gray-500">
            We recommend using an authenticator app for increased security
          </span>
        </div>

        <div className="w-full md:max-w-[169px]">
          <BackButton text="Back to settings" onClick={handleHideTabs} />
        </div>
      </div>
    </TabContentLayout>
  );
};

export default Security;
