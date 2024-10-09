import {
  DeleteFilled,
  LoadingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
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
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import DrawerLeaveQuota from "components/drawer/attendance/drawerLeaveQuota";
import DrawerRecapitulation from "components/drawer/attendance/drawerRecapitulation";
import {
  CirclePlusIconSvg,
  CloseIconSvg,
  DownloadIcon2Svg,
  DownloadIconSvg,
  EditSquareIconSvg,
  TableExportIconSvg,
  TrashIconSvg,
  WarningIconSvg,
} from "components/icon";
import LayoutDashboard from "components/layout-dashboard";

import { useAccessControl } from "contexts/access-control";

import {
  ATTENDANCE_RECAP_GET,
  COMPANY_CLIENTS_GET,
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

import DrawerLeaveDetail from "../../../components/drawer/attendance/drawerLeaveDetail";
import st from "../../../components/layout-dashboard-management.module.css";
import ModalSetujuiCuti from "../../../components/modal/attendance/modalSetujuiCuti";
import ModalTipeCuti from "../../../components/modal/attendance/modalTipeCuti";
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
import clsx from "clsx";
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

const { RangePicker } = DatePicker;

const RecapitulationIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  //1.Init
  // Breadcrumb title
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Recapitulation",
    },
  ];

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"status"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    keyword: withDefault(StringParam, ""),
    role_ids: withDefault(StringParam, undefined),
    company_id: withDefault(StringParam, undefined),
    start_date: withDefault(StringParam, undefined),
    end_date: withDefault(StringParam, undefined),
  });

  const [theForm] = Form.useForm();
  const [dataCompanyList, setDataCompanyList] = useState([]);
  const isAllowedToGetRecapitulation = hasPermission(ATTENDANCE_RECAP_GET);
  const isAllowedToAddLeaveQuota = hasPermission(EMPLOYEE_LEAVE_QUOTA_ADD);
  const isAllowedToUpdateLeaveQuota = hasPermission(
    EMPLOYEE_LEAVE_QUOTA_UPDATE
  );
  const isAllowedToDeleteLeaveQuota = hasPermission(
    EMPLOYEE_LEAVE_QUOTA_DELETE
  );
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  let timer: NodeJS.Timeout; // use for delay time in table's search

  const leaveStatuses = [
    {
      label: "Pending",
      value: LeaveStatus.PENDING,
    },
    {
      label: "Accepted",
      value: LeaveStatus.ACCEPTED,
    },
    {
      label: "Rejected",
      value: LeaveStatus.REJECTED,
    },
  ];

  const [loadingAnualLeave, setLoadingAnnualLeave] = useState(true);
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
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const [roleList, setDataRoleList] = useState([]);
  const [dataAnnualLeave, setDataAnnualLeave] = useState([]);
  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
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
    queryParams.company_id,
    queryParams.start_date,
    queryParams.end_date,
  ]);

  useEffect(() => {
    fetchDataRole();
    fetchDataCompany();
  }, []);

  const fetchDataCompany = async () => {
    if (!isAllowedToGetCompanyClients) {
      permissionWarningNotification("Mendapatkan", "Data Company");
    } else {
      setLoadingCompanyList(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=true`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataCompanyList(res2.data);
          setLoadingCompanyList(false);
        });
    }
  };

  const fetchData = async () => {
    if (!isAllowedToGetRecapitulation) {
      permissionWarningNotification("Mendapatkan", "Data Recapitulation");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendaceRecap${params}`,
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
          setDataAnnualLeave(res2?.data?.data);
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
      dataIndex: "num",
      align: "center",
      render: (text, record, index) => {
        return {
          children: <>{index + 1}</>,
        };
      },
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 100,
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate w-32" title={text}>
          {text}
        </p>
      ),
    },
    {
      title: "Role",
      dataIndex: "position",
      key: "position",
      align: "center",
      sorter: true,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      align: "center",
      sorter: true,
    },
    {
      title: "Jumlah Kerja",
      dataIndex: "total_work_day",
      key: "total_work_day",
    },
    {
      title: "WFO",
      dataIndex: "wfo_count",
      key: "wfo_count",
      align: "center",
      sorter: true,
    },
    {
      title: "WFH",
      dataIndex: "wfh_count",
      key: "wfh_count",
      align: "center",
      sorter: true,
    },
    {
      title: "Telat",
      dataIndex: "late_count",
      key: "late_count",
      align: "center",
      sorter: true,
    },
    {
      title: "Alpha",
      dataIndex: "alpha_count",
      key: "alpha_count",
      align: "center",
      sorter: true,
    },
    {
      title: "Cuti",
      dataIndex: "leave_count",
      key: "leave_count",
      align: "center",
      sorter: true,
    },
    {
      title: "lembur",
      dataIndex: "overtime_count",
      key: "overtime_count",
      align: "center",
      sorter: true,
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
                disabled={!isAllowedToDeleteLeaveQuota}
                className="bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteButtonClicked(record);
                }}
                //   disabled={!isAllowedToDeleteFormDetail}
              >
                <DownloadIconSvg color={"#808080"} size={20} />
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
      start_date: undefined,
      end_date: undefined,
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

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      setQueryParams({
        start_date: dateStrings[0],
        end_date: dateStrings[1],
        page: 1,
      });
    } else {
      setQueryParams({
        start_date: moment().format("YYYY-MM-DD"),
        page: 1,
        end_date: moment().format("YYYY-MM-DD"),
      });
    }
  };

  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="grid grid-cols-1 gap-5" id="mainWrapper">
        <div className={"mig-platform--p-0 flex flex-col"}>
          <div
            className={
              "flex w-full justify-between items-center py-3 px-4 border-b"
            }
          >
            <p className="mig-body--bold ">
              Employee Attendance Recapitulation
            </p>
            {isAllowedToAddLeaveQuota && (
              <div className={"flex flex-col sm:flex-row gap-4 items-end"}>
                <ButtonSys
                  type="primary"
                  onClick={() => setShowDrawerLeaveQuota(true)}
                  disabled={!isAllowedToAddLeave}
                >
                  <div className="flex items-center gap-2 text-white whitespace-nowrap">
                    <TableExportIconSvg size={20} />
                    <p>Export</p>
                  </div>
                </ButtonSys>
              </div>
            )}
          </div>
          {/* Table's filter */}
          <div className="px-4 py-3">
            <Form
              // form={theForm}
              className="flex flex-col sm:flex-row w-full sm:justify-between sm:items-center gap-2"
              onFinish={(values) => {
                setQueryParams({ keyword: values.search, page: 1 });
              }}
            >
              <div className="sm:w-[30%]">
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
                    placeholder="Role"
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
              <div className={"w-[20%]"}>
                <Form.Item noStyle>
                  <Select
                    allowClear
                    showSearch
                    mode="multiple"
                    className="w-full"
                    defaultValue={queryParams.company_id}
                    disabled={
                      !isAllowedToGetCompanyClients || loadingCompanyList
                    }
                    placeholder="Company"
                    onChange={(value) => {
                      setQueryParams({ company_id: value, page: 1 });
                    }}
                    filterOption={(input, option) =>
                      (String(option?.children) ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    loading={loadingCompanyList}
                    optionFilterProp="children"
                  >
                    {dataCompanyList?.map((company) => (
                      <Select.Option key={company.id} value={company.id}>
                        {company.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <RangePicker onChange={onRangeChange} />
            </Form>
          </div>
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
            <DrawerRecapitulation
              dataToken={initProps}
              resetParams={resetParams}
              fetchData={fetchData}
              visible={showDrawerLeaveQuota}
              onCancel={() => {
                setShowDrawerLeaveQuota(false);
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
      sidemenu: "attendance/leavequota",
    },
  };
}

export default RecapitulationIndex;
