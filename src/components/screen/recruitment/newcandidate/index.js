import { DownOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Dropdown,
  Input,
  Select,
  Spin,
  Switch,
  Table,
  notification,
} from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { AccessControl } from "../../../../components/features/AccessControl";
import { permissionWarningNotification } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import DrawerDetailPelamar from "../../../drawer/career/DrawerDetailPelamar";
import {
  DownIconSvg,
  DownloadIconSvg,
  EyeIconSvg,
  SearchIconSvg,
  UserPlusIconSvg,
} from "../../../icon";
import ModalCore from "../../../modal/modalCore";
import { TableCustomRecruitmentCandidate } from "../../../table/tableCustom";
import ResumePDFTemplate from "../../resume/ResumePDFTemplate";

const RecruitmentNewCandidate = ({
  setSelectedStatus,
  onFilterRecruitments,
  handleCreateRecruitments,
  refresh,
  setSelectedRoleId,
  dataRoleList,
  isAllowedToGetRecruitmentRolesList,
  isAllowedToGetRecruitmentStagesList,
  setSelectedStage,
  dataStageList,
  isAllowedToGetRecruitmentStatusesList,
  dataStatusList,
  isAllowedToGetRecruitments,
  isBulk,
  setSelectedRecruitments,
  setSelectedRecruitmentIds,
  setPreviewDrawerShown,
  tempIdClicked,
  setTriggerRowClicked,
  dataRoleOptions,
  dataJalurDaftarOptions,
  dataStageOptions,
  dataStatusOptions,
  onKeyPressHandler,
  setDataUpdateStatus,
  dataUpdateStatus,
  setModalUpdateStatus,
  setModalUpdateStage,
  setDataUpdateStage,
  dataUpdateStage,
  initProps,
}) => {
  const rt = useRouter();
  const [modalSheetImport, setModalSheetImport] = useState(false);
  const columnRecruitmentNew = [
    {
      title: "No",
      key: "number",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawRecruitments?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Nama",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (text, record, index) => {
        return {
          children: <>{record.role?.role}</>,
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) =>
            a.role?.name.toLowerCase().localeCompare(b.role?.name.toLowerCase())
        : false,
    },
    {
      title: "Stage",
      key: "stage",
      dataIndex: "stage",
      render: (text, record, index) => {
        return {
          children: (
            <div>
              <select
                disabled={!isAllowedToGetRecruitmentStagesList || isBulk}
                className="rounded-md py-1 hover:cursor-pointer"
                value={record.recruitment_stage_id}
                style={{ width: `100%` }}
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  setDataUpdateStage({
                    ...dataUpdateStage,
                    id: record.id,
                    name: record.name,
                    prev_recruitment_stage_name: record.stage?.name,
                    recruitment_stage_name:
                      event.target?.selectedOptions[0]?.text,
                    recruitment_stage_id: Number(event.target?.value),
                  });
                  setModalUpdateStage(true);
                }}
              >
                {dataStageList.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
          ),
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) =>
            a.stage?.name
              .toLowerCase()
              .localeCompare(b.stage?.name.toLowerCase())
        : false,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <select
                disabled={!isAllowedToGetRecruitmentStatusesList || isBulk}
                value={record.recruitment_status_id}
                className="rounded-md py-1 hover:cursor-pointer"
                style={{
                  width: `100%`,
                  backgroundColor: `${record.status?.color}10`,
                  color: `${record.status?.color}`,
                }}
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  setDataUpdateStatus({
                    ...dataUpdateStatus,
                    id: record.id,
                    name: record.name,
                    prev_recruitment_status_name: record.status?.name,
                    recruitment_status_name:
                      event.target?.selectedOptions[0]?.text,
                    recruitment_status_id: Number(event.target?.value),
                  });
                  setModalUpdateStatus(true);
                }}
              >
                {dataStatusList.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    style={{
                      backgroundColor: `${status?.color}20`,
                      color: `${status?.color}`,
                    }}
                  >
                    {status?.name}
                  </option>
                ))}
              </select>
            </>
          ),
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) =>
            a.status?.name
              .toLowerCase()
              .localeCompare(b.status?.name.toLowerCase())
        : false,
    },
    {
      title: "Aksi",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className="grid grid-rows-3 xl:grid-rows-1 grid-cols-1 xl:grid-cols-3 gap-2">
              {/* <div
                className={
                  "hover:cursor-pointer flex justify-center items-center"
                }
              >
                <DownloadIconSvg size={20} color={"#808080"} />
              </div> */}
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  rt.push(`/admin/recruitment/cv`);
                }}
                className={
                  "hover:cursor-pointer flex justify-center items-center"
                }
              >
                <EyeIconSvg size={20} color={"#808080"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];
  // const [refresh, setRefresh] = useState(-1);
  // table data
  const [loadingRecruitments, setLoadingRecruitments] = useState(true);
  const [dataRecruitments, setDataRecruitments] = useState([]);
  const [dataRawRecruitments, setDataRawRecruitments] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });
  const [searchingFilterRecruitments, setSearchingFilterRecruitments] =
    useState("");
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    recruitment_role_id: withDefault(NumberParam, undefined),
    recruitment_stage_id: withDefault(NumberParam, undefined),
    recruitment_status_id: withDefault(NumberParam, undefined),
  });
  // 3.3. Get Recruitments
  useEffect(() => {
    if (!isAllowedToGetRecruitments) {
      permissionWarningNotification("Mendapatkan", "Daftar Recruitment");
      setLoadingRecruitments(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      setLoadingRecruitments(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentsAI${payload}&keyword=${searchingFilterRecruitments}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          console.log("get api ai bro ", res2);
          if (res2.success) {
            setDataRawRecruitments(res2.data);
            setDataRecruitments(res2.data.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
          setLoadingRecruitments(false);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingRecruitments(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    isAllowedToGetRecruitments,
    refresh,
    searchingFilterRecruitments,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.recruitment_role_id,
    queryParams.recruitment_stage_id,
    queryParams.recruitment_status_id,
  ]);
  return (
    <div className="lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-6">
        <h4 className="mig-heading--4 mb-2 md:mb-0">Semua Kandidat</h4>
        {/* <div
          className={
            "flex flex-col lg:flex-row md:space-x-6 space-y-2 lg:space-y-0 w-full md:w-fit"
          }
        >
          <ButtonSys
            type={"default"}
            onClick={() => setCreateDrawerShown(true)}
            //  disabled={!isAllowedToAddRole}
          >
            <div className="flex flex-row space-x-2.5 items-center">
              <UserPlusIconSvg />
              <p>Add Candidate</p>
            </div>
          </ButtonSys>
          <Dropdown.Button
            type="primary"
            menu={menuProps}
            placement="bottom"
            icon={<DownOutlined />}
          >
            Input CV
          </Dropdown.Button>
        </div> */}
      </div>

      {/* Import excel */}
      <ReactSpreadsheetImport
        isOpen={modalSheetImport}
        onClose={() => setModalSheetImport(false)}
        onSubmit={(data) => {
          setTimeout(() => {
            handleCreateRecruitments(data?.validData);
          }, 1000);
        }}
        allowInvalidSubmit={false}
        translations={{
          uploadStep: {
            manifestTitle: "Data yang diharapkan:",
            manifestDescription:
              "(Anda dapat mengubah data pada langkah selanjutnya)",
          },
        }}
        autoMapDistance={3}
        fields={[
          {
            label: "Nama",
            key: "name",
            alternateMatches: ["Nama", "nama"],
            fieldType: {
              type: "input",
            },
            example: "John Doe",
            validations: [
              {
                rule: "required",
                errorMessage: "Nama wajib diisi",
                level: "error",
              },
            ],
          },
          {
            label: "Email",
            key: "email",
            alternateMatches: ["email", "Email"],
            fieldType: {
              type: "input",
            },
            example: "someone@example-mail.com",
            validations: [
              {
                rule: "required",
                errorMessage: "Email wajib diisi",
                level: "error",
              },
              {
                rule: "regex",
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}",
                errorMessage: "Email belum terisi dengan benar",
                level: "warning",
              },
            ],
          },
          {
            label: "Universitas",
            key: "university",
            alternateMatches: ["Universitas", "universitas"],
            fieldType: {
              type: "input",
            },
            example: "Institut Teknologi Bandung",
            validations: [
              {
                rule: "required",
                errorMessage: "Universitas wajib diisi",
                level: "error",
              },
            ],
          },
          {
            label: "Role",
            key: "recruitment_role_id",
            alternateMatches: ["Role", "role"],
            fieldType: {
              type: "select",
              options: dataRoleOptions,
            },
            example: "Product Manager",
            validations: [
              {
                rule: "required",
                errorMessage: "Role wajib diisi",
                level: "error",
              },
            ],
          },
          {
            label: "Jalur Daftar",
            key: "recruitment_jalur_daftar_id",
            alternateMatches: ["jalur daftar", "Jalur Daftar"],
            fieldType: {
              type: "select",
              options: dataJalurDaftarOptions,
            },
            example: "Glints",
            validations: [
              {
                rule: "required",
                errorMessage: "Jalur Daftar wajib diisi",
                level: "error",
              },
            ],
          },
          {
            label: "Stage",
            key: "recruitment_stage_id",
            alternateMatches: ["Stage", "stage"],
            fieldType: {
              type: "select",
              options: dataStageOptions,
            },
            example: "Behavior Interview",
            validations: [
              {
                rule: "required",
                errorMessage: "Stage wajib diisi",
                level: "error",
              },
            ],
          },
          {
            label: "Status",
            key: "recruitment_status_id",
            alternateMatches: ["Status", "status"],
            fieldType: {
              type: "select",
              options: dataStatusOptions,
            },
            example: "On Hold",
            validations: [
              {
                rule: "required",
                errorMessage: "Status wajib diisi",
                level: "error",
              },
            ],
          },
        ]}
      />

      {/* Start: Search criteria */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full md:items-center mb-4">
        {/* Search by keyword (kata kunci) */}
        <div className="w-full md:w-4/12">
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
            {dataRoleList.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
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

        <div className="flex justify-end">
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
        </div>
      </div>
      {/* End: Search criteria */}

      <div>
        <TableCustomRecruitmentCandidate
          dataSource={dataRecruitments}
          columns={columnRecruitmentNew}
          loading={loadingRecruitments}
          total={dataRawRecruitments?.total}
          isBulk={isBulk}
          setSelectedRecruitments={setSelectedRecruitments}
          setSelectedRecruitmentIds={setSelectedRecruitmentIds}
          setDrawerShown={setPreviewDrawerShown}
          tempIdClicked={tempIdClicked}
          setTriggerRowClicked={setTriggerRowClicked}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>
    </div>
  );
};

export default RecruitmentNewCandidate;
