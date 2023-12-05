import { type ReactNode } from "react";
import { BottomNav, TopNav } from "../Navigation";
import SlideSheet from "../Navigation/SlideSheet";
import Welcome from "../Navigation/Welcome";

type PageLayoutProps = { children: ReactNode };

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="relative flex">
      <nav className="fixed hidden h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px] md:flex">
        <Welcome
          {...{
            id: "RAC45678",
            name: "Rex",
            src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
          }}
        />
        <TopNav />
        <BottomNav />
      </nav>
      <SlideSheet
        {...{
          id: "RAC45678",
          name: "Rex",
          src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
        }}
      />
      <main className="w-full md:ml-[266px]">{children}</main>
    </div>
  );
};

export default PageLayout;
