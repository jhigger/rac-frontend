import { BottomNav, TopNav, type NavProps } from ".";
import Welcome, { type WelcomeProps } from "./Welcome";

type SlideSheetProps = NavProps & WelcomeProps;

// mobile nav
const SlideSheet = ({ active, onClick, id, name, src }: SlideSheetProps) => {
  return (
    <div id="sheet_b" className="group md:hidden">
      <div
        data-close="#sheet_b"
        className="fixed -top-full z-40 bg-neutral-900 opacity-0 group-[&.show]:inset-0 group-[&.show]:opacity-60"
      ></div>
      <nav className="fixed bottom-0 left-0 top-0 z-50 flex h-full min-h-screen w-[266px] -translate-x-full flex-col overflow-y-auto bg-brand py-[40px] transition-transform duration-[400ms] group-[&.show]:translate-x-0">
        <Welcome
          {...{
            id,
            name,
            src,
          }}
        />
        <TopNav {...{ active, onClick }} />
        <BottomNav {...{ active, onClick }} />
      </nav>
    </div>
  );
};

export default SlideSheet;
