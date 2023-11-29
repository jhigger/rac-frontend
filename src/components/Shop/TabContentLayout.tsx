type TabContentLayoutProps = { children: JSX.Element };

const TabContentLayout = ({ children }: TabContentLayoutProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-170px)] w-full flex-col overflow-y-auto px-[40px] py-[23px]">
      {children}
    </div>
  );
};

export default TabContentLayout;
