/* eslint-disable @next/next/no-img-element */
import { useTabContext } from "~/contexts/TabContext";

type TrackButtonProps = { dataClose: string };

const TrackButton = ({ dataClose }: TrackButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("track");
  };
  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/track_icon.svg"
        alt="track icon"
      />
      <span className="label-lg text-white">Track</span>
    </button>
  );
};

export default TrackButton;
