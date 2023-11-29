import { tabs, useTabsContext } from "~/contexts/TabsContext";

const AppBarTabs = () => {
  const { activeTab, handleTabChange, tabsRef } = useTabsContext();

  return (
    <div className="tabs flex w-full flex-col">
      <div className="relative flex flex-row items-center">
        {tabs.map(({ id, title }) => {
          return (
            <button
              ref={(el) => {
                if (!el) return;
                tabsRef.current.push(el);
              }}
              key={`tab-${id}`}
              data-type="tabs"
              data-target={`#${id}`}
              className={`flex h-[49px] w-1/3 flex-col items-center justify-end gap-1 px-4 py-2 md:w-[120px] ${
                id === activeTab && "active"
              }`}
              onClick={() => handleTabChange(id)}
            >
              <p className="text-sm tracking-[.00714em]">{title}</p>
            </button>
          );
        })}
        <div
          role="indicator"
          className="absolute bottom-0 left-0 ml-[12%] h-0.5 w-[40px] rounded-t-full bg-primary-600 transition-all duration-200 ease-in-out sm:ml-[14%] md:ml-[40px]"
        ></div>
      </div>

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
    </div>
  );
};

export default AppBarTabs;