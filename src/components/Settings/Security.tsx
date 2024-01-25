import { useRef, useState } from "react";
import {
  useAuthContext,
  type TwoFactorAuthenticationType,
} from "~/contexts/AuthContext";
import { BackButton } from "../Buttons/BackButton";
import ModalButton, { type ModalButtonProps } from "../Buttons/ModalButton";
import TabContentLayout from "../Layouts/TabContentLayout";
import { RequestFormHeader } from "../Shop/Requests/RequestOrder";
import {
  PreferenceItem,
  type PreferenceType,
} from "./CommunicationPreferences";
import { type SettingsTabContentProps } from "./ProfileInformation";
import { useAppOption } from "./useAppOption";
import useEmailOption from "./useEmailOption";

type SecurityOptions = PreferenceType & {
  modalContent: () => JSX.Element;
  footerContent: ModalButtonProps["footerContent"];
  value: TwoFactorAuthenticationType;
};

const Security = ({ handleHideTabs }: SettingsTabContentProps) => {
  const { authType } = useAuthContext();

  const [enabled, setEnabled] = useState<TwoFactorAuthenticationType | null>(
    authType,
  );
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleEnabled = (enabledOption: TwoFactorAuthenticationType | null) => {
    if (enabled === null) setEnabled(enabledOption);
    else setEnabled(null);
  };

  const appOption: Pick<SecurityOptions, "modalContent" | "footerContent"> =
    useAppOption();

  const emailOption: Pick<SecurityOptions, "modalContent" | "footerContent"> =
    useEmailOption();

  const preferences: SecurityOptions[] = [
    {
      title: "Authentication via App",
      description:
        "Opt for an extra layer of security by using a Time-based One-Time Password (TOTP) authenticator app like Google Authenticator App. Scan the QR code or enter the provided key in your authenticator app to generate codes for login verification",
      onClick: () => {
        toggleEnabled("TOTP");
      },
      disabled: enabled !== "TOTP",
      modalContent: appOption.modalContent,
      footerContent: appOption.footerContent,
      value: "TOTP",
    },
    {
      title: "Authentication via Email",
      description:
        "Receive a verification code via Email for added security. A code will be sent to your registered email address during the login process",
      onClick: () => {
        toggleEnabled("email");
      },
      disabled: enabled !== "email",
      modalContent: emailOption.modalContent,
      footerContent: emailOption.footerContent,
      value: "email",
    },
  ];

  const handleRef = (el: HTMLButtonElement) => {
    if (!el) return;
    if (buttonsRef.current.length >= 2) buttonsRef.current.shift();
    buttonsRef.current.push(el);
  };

  return (
    <TabContentLayout>
      <div className="flex max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Setup Two-Factor Authentication (2FA)" />

        <div className="flex flex-col gap-[20px]">
          <span className="body-lg text-gray-700">
            {enabled === "TOTP" ? (
              <>
                Your preferred method below is{" "}
                <span className="text-primary-900">Authentication via App</span>
              </>
            ) : enabled === "email" ? (
              <>
                Your preferred method below is{" "}
                <span className="text-primary-900">
                  Authentication via Email
                </span>
              </>
            ) : (
              "Enhance the security of your account with Two-Factor Authentication. Choose your preferred method below;"
            )}
          </span>

          {preferences.map((item, i) => {
            const disabled = enabled !== item.value && enabled !== null;

            return (
              <div key={i}>
                <PreferenceItem
                  id={`security-${i}`}
                  title={item.title}
                  description={item.description}
                  onClick={({ isToggled }) => {
                    item.onClick();
                    if (!isToggled) buttonsRef.current?.[i]?.click(); // programmatically click on hidden button to show modal on enable switch
                  }}
                  disabled={disabled}
                  enabled={enabled === item.value}
                />
                <ModalButton
                  modalId={`security-modal-${i}`}
                  label="modal button"
                  buttonClassName="hidden"
                  footerContent={item.footerContent}
                  ref={handleRef}
                >
                  {item.modalContent()}
                </ModalButton>
              </div>
            );
          })}

          <span className="body-lg ml-6 list-item text-gray-500">
            {enabled === null
              ? "We recommend using an authenticator app for increased security"
              : "You can only use one authentication method at a time. If you wish to switch to another one, kindly disable the current method first."}
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
