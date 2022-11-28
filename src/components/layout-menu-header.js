import { Dropdown } from "antd";
import { useRouter } from "next/router";

import { Notification } from "components/features/Notification";

import { generateStaticAssetUrl } from "lib/helper";

import {
  LogoutIconSvg,
  NotifIconSvg,
  SearchIconSvg,
  UsercircleIconSvg,
} from "./icon";

function LayoutMenuHeader({ dataProfile, Linkheader, handleLogout, st }) {
  const rt = useRouter();

  const menuProfile2 = () => {
    return (
      <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
            <img
              src={generateStaticAssetUrl(dataProfile.data.profile_image?.link)}
              alt={dataProfile.data.profile_image?.description}
              className="object-cover w-full h-full"
            />
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
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={() => rt.push("/employeeProfile")}
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
      className={`hidden md:flex md:w-auto w-full ${st.menu} md:justify-end`}
    >
      <div className="md:mr-8 mr-4 cursor-pointer">
        <SearchIconSvg size={28} color={`#000000`} />
      </div>
      <div className="md:mr-8 mr-4 flex items-center">
        {/* <NotifIconSvg /> */}
        <Notification />
      </div>
      <div className=" md:mr-12 mr-4 mt-2 flex items-center">
        <Dropdown overlay={menuProfile2} trigger={["click"]}>
          <img
            src={generateStaticAssetUrl(dataProfile.data.profile_image?.link)}
            alt={dataProfile.data.profile_image?.description}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </Dropdown>
        <div className="flex flex-col ml-1">
          <h1 className="font-semibold text-sm mb-0">
            {dataProfile.data.name}
          </h1>
          <p className="mb-0 text-xs">{dataProfile.data.nip}</p>
        </div>
      </div>
    </div>
  );
}

export default LayoutMenuHeader;
