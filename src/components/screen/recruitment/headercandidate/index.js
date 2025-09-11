import {
  AppstoreOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, notification } from "antd";
import { useRouter } from "next/router";

import ButtonSys from "../../../button";
import {
  DownloadIconSvg,
  SettingsIconSvg,
  UserPlusIconSvg,
} from "../../../icon";

const HeaderCandidate = ({
  isBulk,
  dropdownMenu,
  isAllowedToAddRecruitment,
  setBulk,
  setSelectedRecruitments,
  setSelectedRecruitmentIds,
  setDataUpdateStage,
  setDataUpdateStatus,
  bulkMenu,
  selectedRecruitments,
  onButtonClicked,
  downloadClicked,
}) => {
  const rt = useRouter();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3">
      <h4 className="text-[16px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
        Candidate List
      </h4>
      {isBulk === false ? (
        <div className="flex flex-col lg:flex-row md:space-x-2.5 space-y-2 lg:space-y-0 w-full md:w-fit">
          <div className={"flex flex-col lg:flex-row md:space-x-2.5"}>
            <div
              onClick={onButtonClicked}
              className={
                "bg-[#F3F3F3] rounded-[5px] w-8 h-8 flex justify-center items-center hover:cursor-pointer"
              }
            >
              <SettingsIconSvg size={16} color={"#4D4D4D"} />
            </div>
            <div
              onClick={downloadClicked}
              className={
                "bg-[#F3F3F3] rounded-[5px] w-8 h-8 flex justify-center items-center hover:cursor-pointer"
              }
            >
              <DownloadIconSvg size={16} color={"#4D4D4D"} />
            </div>
            <div
              className={"w-1 h-full border-r border-[rgba(0,0,0,0.06)]"}
            ></div>
          </div>
          <ButtonSys type={"default"} onClick={() => setBulk(true)}>
            <div className="flex flex-row space-x-2.5 items-center">
              <AppstoreOutlined />
              <p>Bulk Action</p>
            </div>
          </ButtonSys>

          {/* Dropdown Tambah Kandidat */}
          <Dropdown
            overlay={dropdownMenu}
            overlayStyle={{ width: "min-content" }}
            trigger={["click"]}
            placement="bottomRight"
            className="z-0"
            disabled={!isAllowedToAddRecruitment}
          >
            <Button
              type={"primary"}
              className="btn btn-sm text-white font-semibold px-6 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
              icon={<UserPlusIconSvg size={16} color="#FFFFFF" />}
            >
              Add Candidate
            </Button>
          </Dropdown>
        </div>
      ) : (
        <div className="flex flex-row md:space-x-6 space-y-2 lg:space-y-0 w-full md:w-fit justify-between md:justify-normal">
          <ButtonSys
            type={"default"}
            color={"danger"}
            onClick={() => {
              setBulk(false);
              setSelectedRecruitments([]);
              setSelectedRecruitmentIds([]);
              setDataUpdateStage([]);
              setDataUpdateStatus([]);
            }}
          >
            <div className="flex flex-row space-x-2.5 items-center">
              <CloseOutlined />
              <p>Batal</p>
            </div>
          </ButtonSys>

          {/* Dropdown Aksi */}
          <Dropdown
            overlay={bulkMenu}
            overlayStyle={{ width: "min-content" }}
            trigger={["click"]}
            placement="bottomRight"
            disabled={selectedRecruitments.length === 0}
          >
            <Button
              type={"default"}
              className="btn btn-sm font-semibold px-4 border border-primary100
                        hover:border-primary75  hover:bg-primary75 focus:bg-white
                        focus:border-primary100 text-primary100 hover:text-white focus:text-primary100"
            >
              <div className="flex flex-row items-center space-x-2.5">
                <p>Aksi</p>
                <DownOutlined />
              </div>
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default HeaderCandidate;
