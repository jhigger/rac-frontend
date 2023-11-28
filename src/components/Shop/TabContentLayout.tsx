type TabContentLayoutProps = { children: JSX.Element };

const TabContentLayout = ({ children }: TabContentLayoutProps) => {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default TabContentLayout;
