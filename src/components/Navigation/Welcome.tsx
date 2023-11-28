/* eslint-disable @next/next/no-img-element */
export type WelcomeProps = { src: string; name: string; id: string };

const Welcome = ({ id, name, src }: WelcomeProps) => {
  return (
    <div className="mb-[28px] h-[80px] w-[253px] rounded-r-[20px] bg-neutral-100 bg-opacity-[8%]">
      <div className="flex items-center gap-[10px] px-[10px] py-[18px]">
        <img
          src={src}
          alt="user image"
          className="h-[40px] w-[40px] rounded-full bg-red-500"
        />
        <div className="flex flex-col gap-0 text-gray-100">
          <span className="body-md">Welcome back</span>
          <div className="body-lg flex gap-[10px]">
            <span>{name}</span>
            <span className="font-bold text-white">ID: {id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
