import {
  AppstoreOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Select, notification } from "antd";
import { useRouter } from "next/router";

import ButtonSys from "../../../button";
import { SearchIconSvg, UserPlusIconSvg } from "../../../icon";

const SearchCandidate = ({
  searchingFilterRecruitments,
  setSearchingFilterRecruitments,
  setQueryParams,
  onKeyPressHandler,
  isAllowedToGetRecruitments,
  queryParams,
  isAllowedToGetRecruitmentRolesList,
  setSelectedRoleId,
  dataRoleList,
  isAllowedToGetRecruitmentStagesList,
  setSelectedStage,
  dataStageList,
  isAllowedToGetRecruitmentStatusesList,
  setSelectedStatus,
  dataStatusList,
  onFilterRecruitments,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4">
      {/* Search by keyword (kata kunci) */}
      <div className="w-full md:w-6/12">
        <Input
          defaultValue={searchingFilterRecruitments}
          style={{ width: `100%` }}
          placeholder="Kata Kunci.."
          allowClear
          onChange={(e) => {
            setSearchingFilterRecruitments(e.target.value);
            setQueryParams({ page: 1 });
          }}
          onKeyPress={onKeyPressHandler}
          disabled={!isAllowedToGetRecruitments}
        />
      </div>

      {/* Filter by role (dropdown) */}
      <div className="w-full md:w-2/12">
        <Select
          defaultValue={queryParams.recruitment_role_id}
          allowClear
          name={`role`}
          disabled={!isAllowedToGetRecruitmentRolesList}
          placeholder="Semua Role"
          style={{ width: `100%` }}
          onChange={(value) => {
            setQueryParams({ recruitment_role_id: value, page: 1 });
            setSelectedRoleId(value);
          }}
        >
          {dataRoleList.map((roles) => (
            <Select.Option key={roles.id} value={roles.id}>
              {roles.role}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Filter by stage */}
      <div className="w-full md:w-2/12">
        <Select
          defaultValue={queryParams.recruitment_stage_id}
          allowClear
          name={`stage`}
          disabled={!isAllowedToGetRecruitmentStagesList}
          placeholder="Semua Stage"
          style={{ width: `100%` }}
          onChange={(value) => {
            setQueryParams({ recruitment_stage_id: value, page: 1 });
            setSelectedStage(value);
          }}
        >
          {dataStageList.map((stage) => (
            <Select.Option key={stage.id} value={stage.id}>
              {stage.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Search by status (dropdown) */}
      <div className="w-full md:w-2/12">
        <Select
          defaultValue={queryParams.recruitment_status_id}
          allowClear
          name={`status`}
          disabled={!isAllowedToGetRecruitmentStatusesList}
          placeholder="Semua Status"
          style={{ width: `100%` }}
          onChange={(value) => {
            setQueryParams({ recruitment_status_id: value, page: 1 });
            setSelectedStatus(value);
          }}
        >
          {dataStatusList.map((status) => (
            <Select.Option key={status.id} value={status.id}>
              <div className="flex items-center">
                <div
                  className="rounded-full w-4 h-4 mr-2"
                  style={{ backgroundColor: `${status.color}` }}
                />
                <p className="truncate">{status.name}</p>
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* <div className="flex justify-end">
        <ButtonSys
          type={`primary`}
          onClick={onFilterRecruitments}
          disabled={!isAllowedToGetRecruitments}
        >
          <div className="flex flex-row space-x-2.5 w-full items-center">
            <SearchIconSvg size={15} color={`#ffffff`} />
            <p>Cari</p>
          </div>
        </ButtonSys>
      </div> */}
    </div>
  );
};

export default SearchCandidate;
