import { ArrowLeft, Home2 } from "iconsax-react";
import { useNavContext } from "~/contexts/NavigationContext";
import { useTabContext } from "~/contexts/TabContext";

const BreadCrumbs = () => {
  const { activeNav } = useNavContext();
  const { activeTab, activeAction } = useTabContext();

  return (
    <div className="flex w-full items-center justify-center gap-[10px] md:gap-4">
      <Home2 size="19" className="text-secondary-600" />
      <ArrowLeft size={10} color="#292D32" variant="Outline" />
      <span className="title-sm text-secondary-600">
        <div className="hidden [@media(min-width:500px)]:block">
          {activeNav.toLowerCase()}
        </div>
        <div className="[@media(min-width:500px)]:hidden">
          {activeAction ? "..." : activeNav.toLowerCase()}
        </div>
      </span>

      {activeTab && (
        <>
          <ArrowLeft size={10} color="#292D32" variant="Outline" />
          <span className="title-sm text-secondary-600">
            <div className="hidden [@media(min-width:375px)]:block">
              {activeTab}
            </div>
            <div className="[@media(min-width:375px)]:hidden">
              {activeAction ? "..." : activeTab}
            </div>
          </span>
        </>
      )}

      {activeAction && (
        <>
          <ArrowLeft size={10} color="#292D32" variant="Outline" />
          <span className="title-sm text-secondary-600">{activeAction}</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
