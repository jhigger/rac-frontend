import { useToggle } from "usehooks-ts";
import { useAuthContext } from "~/contexts/AuthContext";
import { BackButton } from "../Buttons/BackButton";
import TabContentLayout from "../Layouts/TabContentLayout";
import { SubSectionTitle } from "../Shop/Requests/RequestCheckout";
import { SectionContentLayout } from "../Shop/Requests/RequestOrder";
import { type SettingsTabContentProps } from "./ProfileInformation";

export type PreferenceType = {
  title: string;
  description: string | JSX.Element;
};

const CommunicationPreferences = ({
  handleHideTabs,
}: SettingsTabContentProps) => {
  const { user } = useAuthContext();

  if (!user) return;

  const contactNumber = `${user.billingDetails.countryCode} ${user.billingDetails.phoneNumber}`;

  const preferences: PreferenceType[] = [
    {
      title: "Notifications via SMS",
      description: (
        <>
          Opt to receive important updates and alert via SMS through your phone
          number <span className="text-gray-700">{contactNumber}</span>. Keep
          your contact number updated for timely notification
        </>
      ),
    },
    {
      title: "Notifications via WhatsApp",
      description: (
        <>
          Receive timely updates and alert via WhatsApp through your phone
          number <span className="text-gray-700">{contactNumber}</span> for a
          convenient and instant communication experience.
        </>
      ),
    },
    {
      title:
        "Receive latest information on our exclusive deals and offerings via Email",
      description: (
        <>
          Stay informed about exclusive offers and offerings by opting to
          receive updates via your email{" "}
          <span className="text-gray-700">{user.email}</span>
        </>
      ),
    },
  ];

  return (
    <TabContentLayout>
      <div className="flex max-h-[794px] max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <div className="flex flex-col gap-[20px]">
          {preferences.map((item, i) => {
            return (
              <PreferenceItem
                key={i}
                id={`communication-preferences-${i}`}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>

        <div className="w-full md:max-w-[169px]">
          <BackButton text="Back to settings" onClick={handleHideTabs} />
        </div>
      </div>
    </TabContentLayout>
  );
};

type PreferenceItemProps = PreferenceType & {
  id: string;
};

export const PreferenceItem = ({
  title,
  description,
  id,
}: PreferenceItemProps) => {
  const [, toggle] = useToggle();

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex justify-between">
          <SubSectionTitle title={title} />
          <div className="toggle-switch relative inline-flex w-[52px]">
            <input
              id={id}
              className="toggle-checkbox hidden"
              type="checkbox"
              onClick={toggle}
            />
            <label
              htmlFor={id}
              className="toggle-default transition-color relative block h-8 w-12 rounded-full duration-150 ease-out"
            ></label>
          </div>
        </div>
        <div className="body-lg text-gray-900">{description}</div>
      </div>
    </SectionContentLayout>
  );
};

export default CommunicationPreferences;
