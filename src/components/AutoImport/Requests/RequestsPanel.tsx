import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import SearchBar from "~/components/Shop/SearchBar";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";

const AutoImportRequestsPanel = () => {
  const { requestItems } = useAutoImportContext();
  const { activeAction } = useTabContext();

  // todo:
  if (activeAction === "request new order") {
    // return (
    //   <TabContentLayout>
    //     <RequestOrder />
    //   </TabContentLayout>
    // );
  }

  // todo:
  if (activeAction === "request details") {
    return (
      <TabContentLayout>
        <>{/* <RequestDetails /> */}</>
      </TabContentLayout>
    );
  }

  // todo:
  if (requestItems) {
    return (
      <TabContentLayout>
        <SearchBar />
        {/* <RequestsTable /> */}
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not requested for any auto import order before, would you
            like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default AutoImportRequestsPanel;
