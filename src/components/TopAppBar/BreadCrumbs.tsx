/* eslint-disable @next/next/no-img-element */
import { useNavContext } from "~/contexts/NavigationContext";
import { useShopContext } from "~/contexts/ShopContext";

const BreadCrumbs = () => {
  const { activeNav } = useNavContext();
  const { activeTab } = useShopContext();

  return (
    <div className="flex w-full items-center justify-center gap-[10px] md:gap-4">
      <img
        src="/images/nav/home_icon.svg"
        alt="home icon"
        className="h-[19px] w-[19px]"
      />
      <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
      <span className="title-sm text-secondary-600">
        {activeNav.toLowerCase()}
      </span>
      <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
      <span className="title-sm text-secondary-600">{activeTab}</span>
      {/* {activeAction !== "request new order" && activeAction && (
        <>
          <img src="/images/arrow_left_icon.svg" alt="arrow icon" />
          <span className="title-sm text-secondary-600">{activeAction}</span>
        </>
      )} */}
    </div>
  );
};

export default BreadCrumbs;
