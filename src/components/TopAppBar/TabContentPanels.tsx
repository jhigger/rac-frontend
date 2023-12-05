import { useNavContext } from "~/contexts/NavigationContext";
import { tabs, useTabContext } from "~/contexts/TabContext";

const TabContentPanels = () => {
  const { activeTab } = useTabContext();
  const { activeNav } = useNavContext();

  return (
    <div className="flex flex-col">
      {tabs.map(({ nav, tabs: navTabs }) => {
        if (nav !== activeNav) return false;

        return navTabs.map(({ id, content }) => {
          return (
            <div
              key={`${nav}-panel-${id}`}
              id={`${nav}-tab-${id}`}
              role="tabpanel"
              className={`duration-400 hidden transition ease-in-out [&.active]:block ${
                id === activeTab && "active"
              }`}
            >
              {content}
            </div>
          );
        });
      })}
    </div>
  );
};

export default TabContentPanels;
