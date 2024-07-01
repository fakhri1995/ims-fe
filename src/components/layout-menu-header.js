import { Dropdown } from "antd";
import { useRouter } from "next/router";

import { Notification } from "components/features/Notification";

import { generateStaticAssetUrl } from "lib/helper";

import { LogoutIconSvg, RightIconSvg, UsercircleIconSvg } from "./icon";

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
      <div className="w-auto h-auto flex flex-col shadow-md rounded-xl bg-white space-y-4 p-4">
        <button
          className="bg-transparent hover:bg-neutrals50 rounded-md shadow-md"
          onClick={() => rt.push("/employeeProfile?tab=2")}
        >
          <div className="flex items-center justify-between space-x-3 p-3 ">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full flex text-white items-center">
                {dataProfile.data?.profile_image?.link ? (
                  <img
                    src={generateStaticAssetUrl(
                      dataProfile.data.profile_image.link
                    )}
                    alt={dataProfile.data?.profile_image?.description}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UsercircleIconSvg size={32} color={"black"} />
                )}
              </div>
              <div className="flex flex-col text-neutrals100">
                <h2 className="text-sm font-medium mb-1">
                  {dataProfile.data.name}
                </h2>
                <h2 className="text-xs font-normal text-mono50">
                  {dataProfile.data.email}
                </h2>
              </div>
            </div>
            <div className="text-neutrals90">
              <RightIconSvg />
            </div>
          </div>
        </button>
        <div className="space-y-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLogout}
            className="flex flex-row items-center space-x-2 hover:opacity-70 
            py-2 px-3 bg-warning bg-opacity-5 hover:bg-opacity-20 rounded-md"
          >
            <LogoutIconSvg size={20} color={"#BF4A40"} />
            <p className="text-warning font-medium">Logout</p>
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
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
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
