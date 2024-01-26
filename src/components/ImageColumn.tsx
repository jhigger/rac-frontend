/* eslint-disable @next/next/no-img-element */
type ImageColumnProps = { images: string[] };

const ImageColumn = ({ images }: ImageColumnProps) => {
  return (
    <div className="h-full w-full max-w-[130px] overflow-hidden rounded-[10px] border-0 bg-surface-100 p-0">
      <div className="m-[5px] grid h-full max-h-[50px] max-w-[150px] grid-cols-2 grid-rows-2 place-items-center gap-x-[10px] gap-y-[5px]">
        {images.length === 1 && (
          <div className="col-span-full row-span-full flex h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
            <img
              src={images[0]}
              alt="package image"
              className="min-h-full min-w-full flex-shrink-0 object-cover"
            />
          </div>
        )}
        {images.length === 2 && (
          <>
            <div className="col-span-1 row-span-full flex h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
              <img
                src={images[0]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-full flex h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
              <img
                src={images[1]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
          </>
        )}
        {images.length === 3 && (
          <>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[0]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-2 flex h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
              <img
                src={images[1]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[2]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
          </>
        )}
        {images.length === 4 && (
          <>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[0]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[1]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[2]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[3]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
          </>
        )}
        {images.length >= 5 && (
          <>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[0]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[1]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img
                src={images[2]}
                alt="package image"
                className="min-h-full min-w-full flex-shrink-0 object-cover"
              />
            </div>
            <div className="col-span-1 row-span-1 flex h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <div className="label-lg flex items-center p-[10px] text-secondary-600">{`${
                images.length - 4
              }+`}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageColumn;
