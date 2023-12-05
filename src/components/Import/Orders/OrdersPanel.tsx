import Balancer from "react-wrap-balancer";
import RequestOrderButton from "~/components/Shop/RequestOrderButton";
import TabContentLayout from "~/components/Shop/TabContentLayout";

const ImportOrdersPanel = () => {
  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not placed any import order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default ImportOrdersPanel;
