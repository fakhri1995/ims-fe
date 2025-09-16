import { CalendarOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import { SorterResult } from "antd/lib/table/interface";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import QueryString from "qs";
import { useEffect, useState } from "react";

import ButtonSys from "components/button";
import DrawerLeaveQuota from "components/drawer/attendance/drawerLeaveQuota";
import {
  ArrowRightIconSvg,
  CloseIconSvg,
  DownloadIconSvg,
  EditSquareIconSvg,
  PlusIconSvg,
  TrashIconSvg,
  WarningIconSvg,
} from "components/icon";
import LayoutDashboard from "components/layout-dashboard";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_LEAVE_QUOTAS_GET,
  EMPLOYEE_LEAVE_QUOTA_ADD,
  EMPLOYEE_LEAVE_QUOTA_DELETE,
  EMPLOYEE_LEAVE_QUOTA_UPDATE,
  LEAVES_GET,
  LEAVE_ADD,
  LEAVE_STATISTICS_GET,
  LEAVE_STATUSES_GET,
  LEAVE_TYPES_GET,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";

import { LeaveStatus } from "apis/attendance";

import { permissionWarningNotification } from "../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import httpcookie from "cookie";

import { PageBreadcrumbValue } from "types/common";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const AttendanceReportIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const { RangePicker } = DatePicker;
  //1.Init
  // Breadcrumb title
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Attendance Report",
    },
  ];

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"status"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    keyword: withDefault(StringParam, ""),
    role_ids: withDefault(StringParam, undefined),
  });

  const [theForm] = Form.useForm();

  const isAllowedToGetLeaveQuota = hasPermission(EMPLOYEE_LEAVE_QUOTAS_GET);
  const isAllowedToAddLeaveQuota = hasPermission(EMPLOYEE_LEAVE_QUOTA_ADD);
  const isAllowedToUpdateLeaveQuota = hasPermission(
    EMPLOYEE_LEAVE_QUOTA_UPDATE
  );
  const isAllowedToDeleteLeaveQuota = hasPermission(
    EMPLOYEE_LEAVE_QUOTA_DELETE
  );
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  let timer: NodeJS.Timeout; // use for delay time in table's search

  const [showDrawerLeaveQuota, setShowDrawerLeaveQuota] = useState(false);
  const [displayDataLeaves, setDisplayDataLeaves] = useState({
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
  const [roleList, setDataRoleList] = useState([]);
  const [dataAnnualLeave, setDataAnnualLeave] = useState([]);
  const [dataStatusCuti, setDataStatusCuti] = useState([]);
  const [dataStatusPengajuan, setDataStatusPengajuan] = useState([]);
  const isAllowedToManageLeaveTypes = hasPermission(LEAVE_TYPES_GET);
  const isAllowedToAddLeave = hasPermission(LEAVE_ADD);
  const isAllowedToGetLeave = hasPermission(LEAVES_GET);
  const isAllowedToGetLeaveStatus = hasPermission(LEAVE_STATUSES_GET);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [recordDelete, setRecordDelete] = useState({
    name: null,
    totalLeave: null,
    id: null,
  });

  const [dataDefault, setDataDefault] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    fetchData();
  }, [
    queryParams.page,
    queryParams.rows,
    queryParams.role_ids,
    queryParams.keyword,
  ]);

  useEffect(() => {
    fetchDataRole();
  }, []);

  const fetchData = async () => {
    if (!isAllowedToGetLeaveQuota) {
      permissionWarningNotification("Mendapatkan", "Data Cuti");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeLeaveQuotas${params}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDisplayDataLeaves(res2.data); // table-related data source
          setDataAnnualLeave([
            {
              no: 1,
              date: "08-09-2025",
              from: "09:00",
              to: "17:00",
              working_mode: "wfo",
              activity: "Daily Meeting",
            },
            {
              no: 2,
              date: "08-09-2025",
              from: "09:00",
              to: "17:00",
              working_mode: "wfh",
              activity: "Daily Meeting",
            },
            {
              no: 3,
              date: "08-09-2025",
              from: "09:00",
              to: "17:00",
              working_mode: "wfo",
              activity: "Daily Meeting",
            },
          ]);
        });
    }
  };

  const fetchDataRole = async () => {
    if (!isAllowedToGetRoleList) {
      permissionWarningNotification("Mendapatkan", "Data Role");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataRoleList(res2.data);
        });
    }
  };

  const detailCuti = (record) => {
    setShowDrawer(true);
    setDataDefault(record);
  };

  const onDeleteButtonClicked = (record) => {
    setShowModalDelete(true);
    setRecordDelete({
      ...recordDelete,
      totalLeave: record.leave_quota.leave_total,
      name: record.name,
      id: record.leave_quota.id,
    });
  };

  const onEditButtonClicked = (record) => {
    setShowEdit(true);
    setDataDefault({
      leave_quota: record.leave_quota.leave_total,
      employee_id: record.leave_quota.employee_id,
      id: record.leave_quota.id,
      start_date: record.start_period,
      end_date: record.end_period,
    });
  };

  const columns: typeof dataAnnualLeave = [
    {
      title: "No.",
      dataIndex: "no",
      align: "center",
      render: (text, record, index) => {
        return {
          children: <>{Number(text)}</>,
        };
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      width: 100,
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate w-32" title={text}>
          {text}
        </p>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      align: "center",
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate">{text}</p>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate">{text}</p>
      ),
    },
    {
      title: "Working Mode",
      dataIndex: "working_mode",
      key: "working_mode",
      sorter: true,
      render: (text, record, index) =>
        text == "wfo" ? (
          <div
            className={"bg-[#35763B1A] rounded-[100px] px-2.5 py-[2px] w-max"}
          >
            <p className={"text-xs/5 text-[#35763B] font-bold font-inter"}>
              {text.toUpperCase()}
            </p>
          </div>
        ) : (
          <div
            className={"bg-[#00589F1A] rounded-[100px] px-2.5 py-[2px] w-max"}
          >
            <p className={"text-[#00589F] text-xs/5 font-bold font-inter"}>
              {text.toUpperCase()}
            </p>
          </div>
        ),
    },
    {
      title: "Log Activities",
      dataIndex: "activity",
      key: "activity",
      render: (text, record, index) => <p>{text}</p>,
    },
    {
      title: "Actions",
      dataIndex: "action",
      align: "center",
      render: (status, record, index) => {
        return {
          children: (
            <div className="flex items-center gap-2 justify-center">
              <button
                disabled={!isAllowedToUpdateLeaveQuota}
                className="bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditButtonClicked(record);
                }}
                //   disabled={!canOpenUpdateDrawer}
              >
                <EditSquareIconSvg color={"#808080"} size={20} />
              </button>
              <button
                disabled={!isAllowedToDeleteLeaveQuota}
                className="bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteButtonClicked(record);
                }}
                //   disabled={!isAllowedToDeleteFormDetail}
              >
                <TrashIconSvg color={"#BF4A40"} size={20} />
              </button>
            </div>
          ),
        };
      },
    },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalTipeCuti, setModalTipeCuti] = useState(false);

  const resetParams = () => {
    theForm.setFieldsValue({
      role: undefined,
    });
    setQueryParams({
      ...queryParams,
      page: 1,
      rows: 10,
      role_ids: undefined,
      sort_by: undefined,
      sort_type: undefined,
      keyword: undefined,
    });
  };

  const cancelDelete = () => {
    setShowModalDelete(false);
    setRecordDelete({
      ...recordDelete,
      totalLeave: null,
      name: null,
      id: null,
    });
  };

  const handleDeleteLeaveQuota = () => {
    setLoadingDelete(true);
    let params = {
      id: recordDelete.id,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployeeLeaveQuota`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: response2.message,
            duration: 3,
          });
          cancelDelete();
          resetParams();
          fetchData();
        } else {
          notification.error({
            message: `Delete Leave Quota Failed. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Delete Leave Quota Failed. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const dataRoleList = [
    {
      id: 1,
      role: "Frontend",
    },
  ];

  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="grid grid-cols-1 gap-5" id="mainWrapper">
        <div className={"mig-platform--p-0 flex flex-col"}>
          <div className={"flex w-full justify-between items-center py-3 px-4"}>
            <p className="mig-body--bold ">Generate Timesheet</p>
          </div>
          {/* Table's filter */}
          <div className="px-4 py-3 border-b flex gap-3">
            <div className={"flex flex-col gap-1 w-[20%]"}>
              <p className={"text-xs/5 font-medium font-inter text-mono30"}>
                Company Name
              </p>
              <Select
                allowClear
                //   name={`role`}
                placeholder="Select Company"
                style={{ width: `100%`, height: "32px" }}
                onChange={(value) => {
                  // setQueryParams({ recruitment_role_id: value, page: 1 });
                  // setSelectedRoleId(value);
                }}
              >
                {dataRoleList.map((roles) => (
                  <Select.Option key={roles.id} value={roles.id}>
                    {roles.role}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className={"flex flex-col gap-1 w-[20%]"}>
              <p className={"text-xs/5 font-medium font-inter text-mono30"}>
                Employee’s Name
              </p>
              <Select
                allowClear
                //   name={`role`}
                placeholder="Select Employee"
                style={{ width: `100%`, height: "32px" }}
                onChange={(value) => {
                  // setQueryParams({ recruitment_role_id: value, page: 1 });
                  // setSelectedRoleId(value);
                }}
              >
                {dataRoleList.map((roles) => (
                  <Select.Option key={roles.id} value={roles.id}>
                    {roles.role}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className={"flex flex-col gap-1 w-[50%]"}>
              <p className={"text-xs/5 font-medium font-inter text-mono30"}>
                Time Range
              </p>
              <RangePicker
                style={{ height: "32px" }}
                separator={<ArrowRightIconSvg size={16} color={"#4D4D4D"} />}
                suffixIcon={
                  <CalendarOutlined
                    style={{ fontSize: 16, color: "#4D4D4D" }}
                  />
                }
              />
            </div>
            <div className={"flex flex-col gap-1 w-[10%] justify-between"}>
              <div></div>
              <div
                className={
                  "h-8 hover:cursor-pointer flex flex-row space-x-2.5 items-center justify-center w-full bg-[#CCCCCC] border-[#CCCCCC] rounded-[5px]"
                }
              >
                <p className={"text-sm/4 text-mono30 font-medium font-roboto"}>
                  Show Result
                </p>
              </div>
            </div>
          </div>
          <div className={"px-4 py-5 flex justify-center border-b mb-3"}>
            <div className={"flex flex-col gap-2"}>
              <div className={"flex flex-row items-center gap-2"}>
                <p
                  className={
                    "text-[16px]/6 text-mono30 font-semibold font-inter"
                  }
                >
                  MOCHAMAD BAKHTIAR
                </p>
                <div
                  className={"w-[3px] h-[3px] rounded-full bg-[#808080]"}
                ></div>
                <p
                  className={
                    "text-[16px]/6 text-mono30 font-semibold font-inter"
                  }
                >
                  FRONTEND DEVELOPER
                </p>
                <div
                  className={"w-[3px] h-[3px] rounded-full bg-[#808080]"}
                ></div>
                <p
                  className={
                    "text-[16px]/6 text-mono30 font-semibold font-inter"
                  }
                >
                  DURIAN PAY
                </p>
              </div>
              <div className={"flex justify-center items-center"}>
                <p className={"text-sm/6 font-inter text-mono30"}>
                  08 September 2025 - 8 Oktober 2025
                </p>
              </div>
              <div
                className={"flex justify-center items-center flex-row gap-3"}
              >
                <Button
                  type={"primary"}
                  className="btn btn-sm text-white font-semibold px-2 border 
                                                        bg-primary100 hover:bg-primary75 border-primary100 
                                                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                                                        flex-nowrap w-full md:w-fit"
                  icon={<DownloadIconSvg size={16} color="#FFFFFF" />}
                >
                  Generate Timesheet
                </Button>
                <ButtonSys type={"default"}>
                  <div className="flex flex-row gap-2 items-center">
                    <PlusIconSvg size={16} color={"#35763B"} />
                    <p>Add Activity</p>
                  </div>
                </ButtonSys>
              </div>
            </div>
          </div>
          {/* <div className="px-4 py-3 border-b">
            <Form
              form={theForm}
              className="flex flex-col sm:flex-row w-full sm:justify-between sm:items-center gap-2"
              onFinish={(values) => {
                setQueryParams({ keyword: values.search, page: 1 });
              }}
            >
              <div className="sm:w-2/4">
                <Form.Item noStyle name="search">
                  <Input
                    placeholder="Search employee's name..."
                    disabled={!isAllowedToGetLeave}
                    allowClear
                    className="w-full"
                    onChange={(event) => {
                      if (
                        event.target.value.length === 0 ||
                        event.target.value === ""
                      ) {
                        setQueryParams({ keyword: "" });
                      } else {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                          setQueryParams({ keyword: event.target.value });
                        }, 500);
                      }
                    }}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-1 ">
                <Form.Item name={"role"} noStyle>
                  <Select
                    allowClear
                    mode="tags"
                    tokenSeparators={[","]}
                    showSearch
                    disabled={!isAllowedToGetRoleList}
                    placeholder="Select Role"
                    style={{ width: `100%` }}
                    onChange={(value) => {
                      setQueryParams({ role_ids: value, page: 1 });
                    }}
                    optionFilterProp="children"
                    filterOption={(
                      input,
                      option: { label: string; value: string }
                    ) =>
                      option?.label?.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {roleList?.map((item) => (
                      <Select.Option
                        key={item.id}
                        value={item.id}
                        label={item.name}
                      >
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </div> */}
          <div className={"px-4 "}>
            <Table
              columns={columns}
              dataSource={dataAnnualLeave}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: displayDataLeaves?.total,
                showSizeChanger: true,
              }}
              scroll={{ x: "max-content" }}
              onChange={(pagination, _, sorter: SorterResult<any>) => {
                const sortTypePayload =
                  sorter.order === "ascend"
                    ? "asc"
                    : sorter.order === "descend"
                    ? "desc"
                    : undefined;

                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                  sort_type: sortTypePayload,
                  sort_by:
                    sortTypePayload === undefined ? undefined : sorter.field,
                });
              }}
              onRow={(datum, rowIndex) => {
                return {
                  className: "hover:cursor-pointer",
                  onClick: () => detailCuti(datum),
                };
              }}
            />
          </div>
          {showDrawerLeaveQuota && (
            <DrawerLeaveQuota
              dataToken={initProps}
              resetParams={resetParams}
              fetchData={fetchData}
              visible={showDrawerLeaveQuota}
              onCancel={() => {
                setShowDrawerLeaveQuota(false);
              }}
            />
          )}

          {showEdit && (
            <DrawerLeaveQuota
              dataToken={initProps}
              resetParams={resetParams}
              fetchData={fetchData}
              visible={showEdit}
              onCancel={() => {
                setShowEdit(false);
              }}
              dataDefault={dataDefault}
            />
          )}

          <Modal
            closeIcon={<CloseIconSvg size={24} color={"#4D4D4D"} />}
            title={
              <div className={"flex gap-2"}>
                <WarningIconSvg />
                <p className={"font-semibold text-sm leading-6 text-[#BF4A40]"}>
                  Confirm Delete
                </p>
              </div>
            }
            open={showModalDelete}
            onCancel={() => {
              // setmodaldelete(false);
              cancelDelete();
            }}
            footer={
              <div className={"flex gap-4 justify-end"}>
                <div
                  onClick={() => cancelDelete()}
                  className={
                    "bg-white border border-solid border-[#808080] py-2 px-4 rounded-md hover:cursor-pointer"
                  }
                >
                  <p className={"text-xs leading-5 text-[#808080] font-bold"}>
                    Cancel
                  </p>
                </div>
                <div
                  onClick={() => handleDeleteLeaveQuota()}
                  className={
                    "bg-[#BF4A40] flex items-center gap-1.5 py-2 px-4 rounded-md hover:cursor-pointer"
                  }
                >
                  {loadingDelete ? (
                    <Spin
                      spinning={loadingDelete}
                      indicator={<LoadingOutlined />}
                      size={"default"}
                    />
                  ) : (
                    <TrashIconSvg color={"white"} size={16} />
                  )}
                  <p className="text-white text-xs leading-5 font-bold">
                    Delete
                  </p>
                </div>
              </div>
            }
            // onOk={handleDelete}

            maskClosable={true}
            style={{ top: `3rem` }}
            width={440}
            destroyOnClose={true}
          >
            <p className={"text-[#4D4D4D] "}>
              Are you sure you want to delete{" "}
              <span className={"font-bold"}>{recordDelete?.name}</span> with{" "}
              <span className={"font-bold"}>
                {recordDelete?.totalLeave} total leave quota
              </span>
              ?
            </p>
          </Modal>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = "";
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "attendance/report",
    },
  };
}

export default AttendanceReportIndex;
