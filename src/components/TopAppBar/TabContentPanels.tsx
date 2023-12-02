import { tabs, useShopContext } from "~/contexts/ShopContext";

const TabContentPanels = () => {
  const { activeTab } = useShopContext();

  return (
    <div className="flex flex-col">
      {tabs.map(({ id, content }) => {
        return (
          <div
            key={`panel-${id}`}
            id={id}
            role="tabpanel"
            className={`duration-400 hidden transition ease-in-out [&.active]:block ${
              id === activeTab && "active"
            }`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default TabContentPanels;
