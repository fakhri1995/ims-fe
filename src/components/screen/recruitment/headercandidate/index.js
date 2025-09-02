import {
  AppstoreOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, notification } from "antd";
import { useRouter } from "next/router";

import ButtonSys from "../../../button";
import { UserPlusIconSvg } from "../../../icon";

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
}) => {
  const rt = useRouter();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-6">
      <h4 className="mig-heading--4 mb-2 md:mb-0">Semua Kandidat</h4>
      {isBulk === false ? (
        <div className="flex flex-col lg:flex-row md:space-x-6 space-y-2 lg:space-y-0 w-full md:w-fit">
          <ButtonSys type={"default"} onClick={() => setBulk(true)}>
            <div className="flex flex-row space-x-2.5 items-center">
              <AppstoreOutlined />
              <p>Bulk Action</p>
            </div>
          </ButtonSys>

          {/* Dropdown Tambah Kandidat */}
          <Dropdown
            overlay={dropdownMenu}
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
              Tambah Kandidat
            </Button>
          </Dropdown>
        </div>
      ) : (
        <div className="flex flex-row space-x-6 w-full md:w-fit justify-between md:justify-normal">
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
            <div className="flex flex-row space-x-1 items-center">
              <CloseOutlined />
              <p>Batal</p>
            </div>
          </ButtonSys>

          {/* Dropdown Aksi */}
          <Dropdown
            overlay={bulkMenu}
            trigger={["click"]}
            placement="bottomRight"
            disabled={selectedRecruitments.length === 0}
          >
            <Button
              type={"default"}
              className="btn btn-sm font-semibold px-6 border border-primary100
                        hover:border-primary75  hover:bg-primary75 focus:bg-white
                        focus:border-primary100 text-primary100 hover:text-white focus:text-primary100"
            >
              <div className="flex flex-row items-center space-x-3.5">
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
