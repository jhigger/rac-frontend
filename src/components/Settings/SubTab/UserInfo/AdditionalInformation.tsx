import { Edit } from "iconsax-react";
import { SectionContentLayout } from "~/components/Shop/Requests/RequestOrder";
import { useAuthContext } from "~/contexts/AuthContext";

const AdditionalInformation = () => {
  const { user } = useAuthContext();

  if (!user) return;

  return (
    <div className="flex items-center gap-[15px]">
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[20px]">
          <span className="title-lg text-gray-700">Business Information</span>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-12">
            <div className="col-span-4 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">
                Business/Company Name:
              </span>
              <span className="title-md text-gray-900">Malibu</span>
            </div>

            <div className="col-span-2 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">Country:</span>
              <span className="title-md text-gray-900">Turkey</span>
            </div>

            <div className="col-span-2 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">State:</span>
              <span className="title-md text-gray-900">Istanbul</span>
            </div>

            <div className="col-span-2 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">City:</span>
              <span className="title-md text-gray-900">Cyprusic</span>
            </div>

            <div className="col-span-2 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">City:</span>
              <span className="title-md text-gray-900">Cyprusic</span>
            </div>

            <div className="col-span-4 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">Phone Number:</span>
              <span className="title-md text-gray-900">+234 803 456 7845</span>
            </div>

            <div className="col-span-4 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">Email:</span>
              <span className="title-md text-gray-900">
                Malibushdrack@gmail.com
              </span>
            </div>

            <div className="col-span-4 flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">Zip/postal Code:</span>
              <span className="title-md text-gray-900">98765</span>
            </div>

            <div className="col-span-full flex flex-col gap-[5px]">
              <span className="body-md text-gray-700">Address:</span>
              <span className="title-md text-gray-900">
                No, 1osolo way, ikeja road, behind scaint merry
              </span>
            </div>
          </div>
        </div>
      </SectionContentLayout>

      <button
        onClick={undefined}
        aria-label="Edit Business Information"
        className="btn relative flex h-[48px] w-[48px] flex-row items-center justify-center gap-x-2 rounded-[6.25rem] px-4 py-2.5 text-sm font-medium tracking-[.00714em] md:px-6"
      >
        <Edit className="flex-shrink-0 text-error-600" />
      </button>
    </div>
  );
};

export default AdditionalInformation;
