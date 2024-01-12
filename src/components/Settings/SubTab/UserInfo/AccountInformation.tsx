import { Lock, Refresh2, VolumeLow } from "iconsax-react";
import { SectionContentLayout } from "~/components/Shop/Requests/RequestOrder";
import { useAuthContext } from "~/contexts/AuthContext";

const AccountInformation = () => {
  const { user } = useAuthContext();

  if (!user) return;

  return (
    <div className="grid h-full grid-cols-1 gap-[15px] md:grid-cols-2">
      <div className="col-span-1">
        <SectionContentLayout>
          <div className="flex h-full flex-col justify-between gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[10px] text-primary-900">
                <Lock variant="Bold" />
                <span className="title-lg">Login Details</span>
              </div>

              <div className="flex flex-col gap-[5px]">
                <span className="body-md text-gray-700">Email:</span>
                <span className="title-md text-gray-900">{user.email}</span>
              </div>

              <div className="flex flex-col gap-[5px]">
                <span className="body-md text-gray-700">Password:</span>
                <span className="title-md text-gray-900">**********</span>
              </div>
            </div>

            <div className="w-full max-w-[181px]">
              <button
                onClick={undefined}
                aria-label="Change Password"
                className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
              >
                <Refresh2 size={18} variant="Bold" className="flex-shrink-0" />
                <span className="label-lg whitespace-nowrap text-white">
                  Change Password
                </span>
              </button>
            </div>
          </div>
        </SectionContentLayout>
      </div>

      <div className="col-span-1">
        <Pinned />
      </div>
    </div>
  );
};

export const Pinned = () => {
  return (
    <div className="h-full">
      <SectionContentLayout>
        <div className="flex h-full flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] text-error-600">
            <VolumeLow variant="Bold" className="rotate-90" />
            <span className="title-lg">Pinned</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="body-md text-gray-700">Registered on:</span>
            <span className="title-md text-gray-900">22-03-2023 13:05</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="body-md text-gray-700">Last Login:</span>
            <span className="title-md text-gray-900">22-03-2023 13:05</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="body-md text-gray-700">Last Logout:</span>
            <span className="title-md text-gray-900">22-03-2023 13:05</span>
          </div>
        </div>
      </SectionContentLayout>
    </div>
  );
};

export default AccountInformation;
