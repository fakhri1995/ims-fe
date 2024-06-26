import { Dropdown } from "antd";
import { useRouter } from "next/router";

import { Notification } from "components/features/Notification";

import { generateStaticAssetUrl } from "lib/helper";

import { LogoutIconSvg, UsercircleIconSvg } from "./icon";

function LayoutMenuHeader({
  dataProfile,
  Linkheader,
  handleLogout,
  st,
  isPublic,
}) {
  const rt = useRouter();

  const menuProfile2 = () => {
    return (
      <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
            {dataProfile.data?.profile_image?.link ? (
              <img
                src={generateStaticAssetUrl(
                  dataProfile.data.profile_image.link
                )}
                alt={dataProfile.data?.profile_image?.description}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UsercircleIconSvg size={20} color={"black"} />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold mb-1">{dataProfile.data.name}</h2>
            <h2 className="text-xs font-normal text-mono50">
              {dataProfile.data.email}
            </h2>
            {/* <Linkheader href={`/profile`} ref="noreferrer">
              Profile Settings
            </Linkheader> */}
          </div>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => rt.push("/employeeProfile?tab=2")}
            className="flex flex-row items-center space-x-2 bg-transparent hover:opacity-70"
          >
            <UsercircleIconSvg size={20} color={"black"} />
            <p>Profil</p>
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLogout}
            className="flex flex-row items-center space-x-2 hover:opacity-70"
          >
            <LogoutIconSvg size={20} color={"#BF4A40"} />
            <p className="text-warning">Logout</p>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex md:w-auto items-center ${st.menu} justify-end md:py-2`}
    >
      {!isPublic && (
        <div className="md:mr-5 pr-4 md:flex items-center md:border-r ">
          <div
            className="hover:bg-neutrals50 bg-neutrals50 md:bg-transparent
           p-1 rounded-full"
          >
            <Notification />
          </div>
        </div>
      )}

      <div className="md:mr-6 mr-4 flex items-center md:p-1">
        <Dropdown overlay={menuProfile2} trigger={["click"]}>
          {dataProfile.data?.profile_image?.link ? (
            <img
              src={generateStaticAssetUrl(
                dataProfile.data?.profile_image?.link
              )}
              alt={dataProfile.data?.profile_image?.description}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <UsercircleIconSvg size={32} color={"black"} />
          )}
        </Dropdown>
        <div className="hidden md:flex flex-col ml-2">
          <h1 className="font-bold text-xs mb-0">{dataProfile.data.name}</h1>
          <p className="mb-0 text-xs text-mono50">{dataProfile.data.nip}</p>
        </div>
      </div>
    </div>
  );
}

export default LayoutMenuHeader;
