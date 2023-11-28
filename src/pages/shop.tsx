/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { BottomNav, TopNav } from "~/components/Navigation";
import SlideSheet from "~/components/Navigation/SlideSheet";
import Welcome from "~/components/Navigation/Welcome";
import DraftPanel from "~/components/Shop/DraftPanel";
import OrdersPanel from "~/components/Shop/OrdersPanel";
import RequestsPanel from "~/components/Shop/RequestsPanel";

const shop = () => {
  const [active, setActive] = useState("Shop for me");

  const handleChangeActive = (title: string) => {
    setActive(title);
  };

  return (
    <div className="relative flex min-h-screen bg-neutral-50">
      <nav className="fixed hidden h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px] md:flex">
        <Welcome
          {...{
            id: "RAC45678",
            name: "Rex",
            src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
          }}
        />
        <TopNav {...{ active, onClick: handleChangeActive }} />
        <BottomNav {...{ active, onClick: handleChangeActive }} />
      </nav>
      <main className="w-full md:ml-[266px]">
        <SlideSheet
          {...{
            active,
            onClick: handleChangeActive,
            id: "RAC45678",
            name: "Rex",
            src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
          }}
        />
        <TopAppBar />
      </main>
    </div>
  );
};

type AppBarTabType = {
  id: string;
  title: string;
  content: JSX.Element;
};

const tabs: AppBarTabType[] = [
  { id: "orders", title: "Orders", content: <OrdersPanel /> },
  { id: "requests", title: "Requests", content: <RequestsPanel /> },
  { id: "draft", title: "Draft", content: <DraftPanel /> },
];

type AppBarTabsProps = { handleChange: (tab: string) => void };

const AppBarTabs = ({ handleChange }: AppBarTabsProps) => {
  return (
    <div className="tabs flex w-full flex-col">
      <div className="relative flex flex-row items-center">
        {tabs.map(({ id, title }) => {
          return (
            <button
              key={`tab-${id}`}
              data-type="tabs"
              data-target={`#${id}`}
              className="active flex h-[49px] w-1/3 flex-col items-center justify-end gap-1 px-4 py-2 md:w-[120px]"
              onClick={() => handleChange(id)}
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
        {tabs.map(({ id, content }, i) => {
          return (
            <div
              key={`panel-${id}`}
              id={id}
              role="tabpanel"
              className={`duration-400 hidden transition ease-in-out [&.active]:block ${
                i === 0 && "active"
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

const TopAppBar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const handleChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between gap-1.5 bg-white px-[20px] pb-[10px] pt-[25px] md:h-[120px] md:px-[40px]">
        <div className="md:hidden">
          <button
            data-type="dialogs"
            data-target="#sheet_b"
            className="material-icons-outlined relative !inline-flex h-12 w-12 !items-center justify-center gap-x-2 rounded-[6.25rem] px-6 py-2.5 text-center text-sm font-medium tracking-[.00714em] text-secondary-600 hover:bg-surface-300 focus:bg-surface-400"
          >
            menu
          </button>
        </div>
        <div className="hidden flex-col gap-[10px] md:flex">
          <h1 className="headline-md text-center text-brand md:text-left">
            Shop for me
          </h1>
          <div className="flex gap-4">
            <img
              src="/images/nav/home_icon.svg"
              alt="home icon"
              className="h-[19px] w-[19px]"
            />
            <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
            <span className="title-sm text-secondary-600">
              {`shop for me - ${activeTab}`}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end">
          <button className="relative !inline-flex h-12 w-12 !items-center justify-center gap-x-2 rounded-[6.25rem] px-6 py-2.5 text-center text-sm font-medium tracking-[.00714em] hover:bg-surface-300 focus:bg-surface-400">
            <span className="material-icons-outlined text-gray-500">
              notifications
            </span>
            <div className="absolute right-3 top-3 flex h-[10px] w-[10px] items-center justify-center rounded-full bg-error-600 text-[11px] font-medium leading-none tracking-[.045em] text-white">
              {/* put notification count here */}
            </div>
          </button>
          <button className="material-icons-outlined relative !inline-flex h-12 w-12 !items-center justify-center gap-x-2 rounded-[6.25rem] px-6 py-2.5 text-center text-sm font-medium tracking-[.00714em] text-gray-500 hover:bg-surface-300 focus:bg-surface-400">
            person
          </button>
        </div>
      </div>
      {/* mobile version */}
      <div className="flex flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <h1 className="headline-md text-center text-brand md:text-left">
          Shop for me
        </h1>
        <div className="flex gap-4">
          <img
            src="/images/nav/home_icon.svg"
            alt="home icon"
            className="h-[19px] w-[19px]"
          />
          <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
          <span className="title-sm text-secondary-600">
            shop for me - orders
          </span>
        </div>
      </div>
      {/* tabs */}
      <div className="h-[50px] w-full rounded-b-[20px] border-b-[1px] border-t-[0.5px] border-b-gray-200 border-t-gray-500 bg-white">
        <AppBarTabs handleChange={handleChange} />
      </div>
    </div>
  );
};

export default shop;
