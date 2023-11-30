import { type ReactNode } from "react";

type TabContentLayoutProps = { children: ReactNode };

const TabContentLayout = ({ children }: TabContentLayoutProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-210px)] w-full flex-col overflow-y-auto px-[20px] py-[23px] md:min-h-[calc(100vh-170px)] md:px-[40px]">
      {children}
    </div>
  );
};

export default TabContentLayout;
