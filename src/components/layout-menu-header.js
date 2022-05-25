import ExportOutlined from "@ant-design/icons/ExportOutlined";
import { Dropdown } from "antd";

import { generateStaticAssetUrl } from "lib/helper";

import { NotifIconSvg, SearchIconSvg } from "./icon";

function LayoutMenuHeader({ dataProfile, Linkheader, handleLogout, st }) {
  const menuProfile2 = () => {
    return (
      <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5">
        <div className="flex justify-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
            <img
              src={generateStaticAssetUrl(dataProfile.data.profile_image?.link)}
              alt={dataProfile.data.profile_image?.description}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              {dataProfile.data.name}
            </h2>
            <h2 className="text-sm font-normal mb-1">
              {dataProfile.data.email}
            </h2>
            {/* <Linkheader href={`/profile`} ref="noreferrer">
              Profile Settings
            </Linkheader> */}
          </div>
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
            <ExportOutlined /> Logout
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
      <div className="md:mr-8 mr-4 cursor-pointer">
        <NotifIconSvg />
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
