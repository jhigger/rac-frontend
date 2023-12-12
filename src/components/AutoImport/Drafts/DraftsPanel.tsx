import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import DraftDetails from "./DraftDetails";

const AutoImportDraftsPanel = () => {
  const { draftItems } = useAutoImportContext();

  if (draftItems) {
    return (
      <TabContentLayout>
        <DraftDetails />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don&apos;t have any auto import request in your draft folder
            yet, would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default AutoImportDraftsPanel;
