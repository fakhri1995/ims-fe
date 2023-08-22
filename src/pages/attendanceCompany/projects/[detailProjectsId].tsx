import {
  DatePicker,
  Empty,
  Input,
  Progress,
  Select,
  Spin,
  Table,
  Tree,
  TreeSelect,
  notification,
} from "antd";
import { GetServerSideProps, NextPage } from "next";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";

import {
  CalendartimeIconSvg,
  SearchIconSvg,
  TautanIconSvg,
} from "components/icon";
import LayoutDashboard from "components/layout-dashboard-company";
import {
  AttendanceDetailCompanySection,
  AttendanceDetailEvidenceSection,
  AttendanceDetailFormAttendanceSection,
  AttendanceDetailMetaCard,
  AttendanceStaffStatisticCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCE_USER_ADMIN_GET, ATTENDANCE_USER_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import styles from "./projects.module.scss";
import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const DetailProjectCompanyPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const [displaydata, setdisplaydata] = useState([]);
  const [displayentiredata, setdisplayentiredata] = useState({
    success: false,
    message: "",
    data: {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      next_page_url: null,
      path: "",
      per_page: "",
      prev_page_url: "",
      to: 0,
      total: 0,
    },
  });
  const [loadingTasks, setLoadingTasks] = useState(true);

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAsAdmin = hasPermission(ATTENDANCE_USER_ADMIN_GET);
  const isAllowedToGetAsUser = hasPermission(ATTENDANCE_USER_GET);
  const isAllowedToGet = isAllowedToGetAsAdmin || isAllowedToGetAsUser;
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    user_id: withDefault(NumberParam, 35),
    project_id: withDefault(NumberParam, undefined),
    has_project: withDefault(NumberParam, undefined),
    status_ids: withDefault(NumberParam, undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const [showButtonFilter, setShowButtonFilter] = useState(true);

  const [dataTasks, setDataTasks] = useState([]);
  // const [dataTasks, setDataTasks] = useState([
  //   {
  //     id: 1,
  //     project_name: "Proyek Redesain Alur Rekrutmen",
  //     tgl_selesai: "6 Juni 2023",
  //     status: 2,
  //   },
  //   {
  //     id: 2,
  //     project_name: "Proyek Mobile Apps Dashboard",
  //     tgl_selesai: "8 Juli 2023",
  //     status: 1,
  //   },
  //   {
  //     id: 3,
  //     project_name: "Proyek Pengembangan Absensi",
  //     tgl_selesai: "6 Juni 2023",
  //     status: 2,
  //   },
  //   {
  //     id: 4,
  //     project_name: "Proyek Integrasi Pengembangan Absensi dengan Proyek",
  //     tgl_selesai: "6 Juni 2023",
  //     status: 2,
  //   },
  //   {
  //     id: 5,
  //     project_name: "Proyek Pembuatan Prototyping Mobile",
  //     tgl_selesai: "6 Juni 2023",
  //     status: 0,
  //   },
  //   {
  //     id: 6,
  //     project_name: "Proyek Pengembangan Modul Rekrutmen",
  //     tgl_selesai: "2 Oktober 2023",
  //     status: 1,
  //   },
  // ]);
  const [statusSelected, setStatusSelected] = useState(null);
  const [datafiltertipetasks, setDatafiltertipetasks] = useState([
    {
      id: 1,
      name: "Proyek 1",
    },
    {
      id: 2,
      name: "Proyek 2",
    },
    {
      id: 3,
      name: "Proyek 3",
    },
  ]);
  const [dataStatusList, setDataStatusList] = useState([]);
  // const [dataStatusList, setDataStatusList] = useState([
  //   {
  //     id: 1,
  //     name: "On Going",
  //   },
  //   {
  //     id: 2,
  //     name: "Preparation",
  //   },
  //   {
  //     id: 3,
  //     name: "Need Review",
  //   },
  //   {
  //     id: 4,
  //     name: "Need Revision",
  //   },
  //   {
  //     id: 5,
  //     name: "Done",
  //   },
  // ]);

  const [dataProjects, setDataProjects] = useState([
    {
      id: 1,
      name: "Pembuatan Desain Form Integrasi Absensi",
      project_name: "Proyek Integrasi Pengembangan Absensi dengan Proyek",
      status: 1,
    },
    {
      id: 2,
      name: "Diskusi PRD Attendance",
      project_name: "Proyek Pengembangan Absensi",
      status: 2,
    },
    {
      id: 3,
      name: "Pembahasan Sprint Dashboard Mobile",
      project_name: "Proyek Mobile Apps Dashboard",
      status: 2,
    },
    {
      id: 4,
      name: "Pembuatan Konsep Invoice SafariQu",
      project_name: "",
      status: 2,
    },
    {
      id: 5,
      name: "Pembuatan Konsep Invoice SafariQu",
      project_name: "",
      status: 2,
    },
    {
      id: 6,
      name: "Pembuatan Desain Landing Page Company Profile",
      project_name: "Proyek Website Development",
      status: 2,
    },
    {
      id: 7,
      name: "Pembuatan Tampilan Task Submission",
      project_name: "Proyek Rekrutmen Internal",
      status: 2,
    },
    {
      id: 8,
      name: "User Testing Alur Absensi Flow Baru",
      project_name: "Proyek Pengembangan Absensi",
      status: 2,
    },
    {
      id: 9,
      name: "Prototyping Mobile Task Technician",
      project_name: "Proyek Pembuatan Prototyping Mobile",
      status: 2,
    },
    {
      id: 10,
      name: "Pembuatan Konsep Desain Rekrutmen Terbaru",
      project_name: "",
      status: 3,
    },
  ]);
  const router = useRouter();
  const userId = router.query.detailProjectsId as unknown as number;
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Dashboard Kehadiran",
      hrefValue: "back",
    },
    {
      name: "Detail Kehadiran Karyawan",
    },
  ];

  useEffect(() => {
    if (!isAllowedToGet) {
      permissionWarningNotification("Mendapatkan", "Detail Kehadiran Karyawan");
    }
  }, [isAllowedToGet]);
  useEffect(() => {
    getProjects();
    getProjectStatus();
  }, []);

  useEffect(() => {
    getProjectsTask();
  }, [
    queryParams.project_id,
    queryParams.has_project,
    queryParams.page,
    queryParams.rows,
    queryParams.status_ids,
  ]);

  const getProjectsTask = () => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasks${payload}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setdisplayentiredata(res2);
          setdisplaydata(res2.data.data);
          setLoadingTasks(false);
        }
      });
  };
  const getProjects = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjects?user_id=${userId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          console.log("get project tasks ", res2);
          setDataTasks(res2.data.data);
        }
      });
  };

  const getProjectStatus = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectStatuses`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          console.log("get project status ", res2);
          // let dataTemp=[];
          // for(let a=0;a<res2.data.data.length;a++) {
          //   dataTemp.push({
          //     id:res2.data.data[a].id,
          //     name:res2.data.data.name
          //   })
          // }
          setDataStatusList(res2.data);
        }
      });
  };

  const onClickTasks = (id) => {
    setStatusSelected(id);
    setShowButtonFilter(false);
    setQueryParams({
      project_id: id,
      has_project: undefined,
    });
  };

  const onCLickAllTask = () => {
    setStatusSelected(null);
    setShowButtonFilter(true);
    setQueryParams({
      project_id: undefined,
      has_project: undefined,
    });
  };

  const onClikButtonFilter = (value) => {
    setQueryParams({
      has_project: value,
    });
  };
  const onChangeStatus = (value) => {
    setQueryParams({
      status_ids: value === undefined ? undefined : Number(Boolean(value)),
    });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      sidemenu={"1"}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="px-5 flex space-y-6 lg:space-y-0 lg:space-x-10 flex-col lg:flex-row bg-white">
        {/* First column */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-2/5 py-6 space-y-6">
          {/* Detail attendance meta */}
          <h3 className="mig-heading--4">Proyek & Tugas [Nama_Karyawan]</h3>
          <div
            onClick={() => onCLickAllTask()}
            className={
              statusSelected == null
                ? "mt-8 px-4 py-3 bg-backdrop rounded-[5px] hover:cursor-pointer"
                : "mt-8 px-4 py-3 bg-white rounded-[5px] hover:cursor-pointer"
            }
          >
            <p className={"text-xs leading-5 font-bold text-primary100"}>
              Semua Tugas
            </p>
            <p className={"text-[10px] leading-4 font-normal text-mono50"}>
              Menampilkan seluruh tugas karyawan.
            </p>
          </div>
          {dataTasks.length > 0 &&
            dataTasks.map((task, index) => (
              <div
                onClick={() => onClickTasks(task.id)}
                className={
                  statusSelected == task.id
                    ? "px-4 py-3 bg-backdrop rounded-[5px]"
                    : "px-4 py-3 bg-white rounded-[5px]"
                }
              >
                <div className={"flex justify-between"}>
                  <div>
                    <p className={"text-xs leading-5 font-medium text-mono50"}>
                      Proyek {task?.name}
                    </p>
                    <div className={"flex"}>
                      <CalendartimeIconSvg size={16} color={"#808080"} />
                      <p
                        className={
                          "text-[10px] ml-1.5 leading-4 font-normal text-mono50"
                        }
                      >
                        Estimasi selesai 6 Juni 2023
                      </p>
                    </div>
                  </div>
                  <div className={"self-center"}>
                    {/* <div
                        className={
                          task.status == 1
                            ? "bg-secondary100 flex justify-center  py-1 rounded-[2px] w-[62px]"
                            : task.status == 2
                            ? "bg-primary100 flex justify-center  py-1 rounded-[2px] w-[62px]"
                            : "bg-warning flex justify-center rounded-[2px] py-1 w-[62px]"
                        }
                      >
                        <p className={"text-white text-[10px] font-bold leading-4"}>
                          {task.status == 1
                            ? "On Going"
                            : task.status == 2
                            ? "Selesai"
                            : "Batal"}
                        </p>
                      </div> */}
                    <div
                      style={{
                        backgroundColor: task.status
                          ? task.status.color
                          : "#00589F",
                      }}
                      className={
                        "flex justify-center py-1 rounded-[2px] w-[62px]"
                      }
                    >
                      <p
                        className={"text-white text-[10px] font-bold leading-4"}
                      >
                        {task.status ? task.status.name : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Second column */}
        <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-3/5 py-6">
          <div className="flex flex-row">
            <div className="w-3/12">
              <Select
                placeholder="Proyek"
                style={{ width: `100%` }}
                allowClear
                showSearch
                optionFilterProp="children"
              >
                {datafiltertipetasks.map((doc, idx) => (
                  <Select.Option key={idx} value={doc.id}>
                    {doc.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-3/12">
              <Select
                allowClear
                showSearch
                onChange={onChangeStatus}
                // defaultValue={queryParams.status_ids}
                // disabled={!isAllowedToGetProjects}
                placeholder="Semua Status"
                style={{ width: `100%` }}
                optionFilterProp="children"
              >
                {dataStatusList?.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    {status.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-6/12">
              <Input
                prefix={<SearchIconSvg size={16} color={"#CCCCCC"} />}
                style={{ width: `100%` }}
                placeholder="Cari proyek ...."
                allowClear
              />
            </div>
          </div>
          {showButtonFilter && (
            <div className={"mt-6 flex flex-row gap-4"}>
              <div
                className={
                  "rounded-[48px] px-4 py-2 border border-mono50 hover:cursor-pointer"
                }
                onClick={() => onClikButtonFilter(1)}
              >
                <p className={"text-[10px] text-mono50 font-normal leading-4"}>
                  Tugas Proyek
                </p>
              </div>
              <div
                className={
                  "rounded-[48px] px-4 py-2 border border-mono50 hover:cursor-pointer"
                }
                onClick={() => onClikButtonFilter(0)}
              >
                <p className={"text-[10px] text-mono50 font-normal leading-4"}>
                  Tugas Bebas
                </p>
              </div>
            </div>
          )}
          <div className={"mt-6"}>
            <Table
              className={styles.customTable}
              pagination={{
                showSizeChanger: true,
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: displayentiredata.data
                  ? displayentiredata.data.total
                  : 0,
              }}
              showHeader={false}
              scroll={{ x: 200 }}
              dataSource={displaydata}
              columns={[
                {
                  title: "Task",
                  dataIndex: "activity",
                  key: "activity",
                  render: (_, task) => {
                    return (
                      <div
                        key={task.id}
                        className={
                          "flex flex-row px-4 py-2 border-inputkategori border bg-white rounded-[5px] h-[59px]"
                        }
                      >
                        <div className={"self-center w-1/6"}>
                          <p
                            className={
                              "text-sm leading-6 font-bold text-mono30"
                            }
                          >
                            {task.ticket_number}
                          </p>
                        </div>
                        <div className={"self-center w-3/6"}>
                          <p
                            className={
                              "text-xs font-bold leading-5 text-mono30"
                            }
                          >
                            {task.name}
                          </p>
                          {task.project && (
                            <div className={"flex flex-row items-center"}>
                              <TautanIconSvg />
                              <p
                                className={"leading-4 text-xs text-mono30 ml-1"}
                              >
                                Terkait dengan{" "}
                                <span className={"font-bold leading-5"}>
                                  {task.project.name}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                        {task.status && (
                          <div className={"self-center flex justify-end w-2/6"}>
                            <div
                              style={{ backgroundColor: task.status.color }}
                              className={
                                "rounded-[5px] py-1 w-[109px] flex justify-center items-center"
                              }
                            >
                              <p
                                className={
                                  "text-[10px] font-medium leading-4 text-secondary100"
                                }
                              >
                                {task.status.name}
                              </p>
                            </div>
                          </div>
                        )}
                        {/* <div className={"self-center flex justify-end w-2/6"}>
                            {task.status == 1 ? (
                              <div
                                className={
                                  "rounded-[5px] py-1 bg-bgstatustaskongoing w-[109px] flex justify-center items-center"
                                }
                              >
                                <p
                                  className={
                                    "text-[10px] font-medium leading-4 text-secondary100"
                                  }
                                >
                                  Berlangsung
                                </p>
                              </div>
                            ) : task.status == 2 ? (
                              <div
                                className={
                                  "rounded-[5px] py-1 bg-bgstatustaskfinish w-[109px] flex justify-center items-center"
                                }
                              >
                                <p
                                  className={
                                    "text-[10px] font-medium leading-4 text-secondary100"
                                  }
                                >
                                  Selesai
                                </p>
                              </div>
                            ) : (
                              <div
                                className={
                                  "rounded-[5px] py-1 bg-bgstatustasklate w-[109px] flex justify-center items-center"
                                }
                              >
                                <p
                                  className={
                                    "text-[10px] font-medium leading-4 text-secondary100"
                                  }
                                >
                                  Terlambat
                                </p>
                              </div>
                            )}
                          </div> */}
                      </div>
                    );
                  },
                },
              ]}
              loading={loadingTasks}
              // onChange={(pagination, _, sorter) => {
              //   const sortTypePayload =
              //     sorter.order === "ascend"
              //       ? "asc"
              //       : sorter.order === "descend"
              //       ? "desc"
              //       : undefined;

              //   setQueryParams({
              //     sort_type: sortTypePayload,
              //     sort_by:
              //       sortTypePayload === undefined ? undefined : sorter.field,
              //     page: pagination.current,
              //     rows: pagination.pageSize,
              //   });
              // }}
            ></Table>
            {/* {
                              dataProjects.map((project, index) => (
                                  <div className={'mb-3 flex flex-row px-4 py-2 border-inputkategori border bg-white rounded-[5px] h-[59px]'}>
                              <div className={'self-center w-1/6'}>
                                  <p className={'text-sm leading-6 font-bold text-mono30'}>T-1225</p>
                              </div>
                              <div className={'self-center w-3/6'}>
                                  <p className={'text-xs font-bold leading-5 text-mono30'}>{project.name}</p>
                                  {
                                      project.project_name &&
                                      <div className={'flex flex-row items-center'}>
                                      <TautanIconSvg/>
                                      <p className={'leading-4 text-xs text-mono30 ml-1'}>Terkait dengan <span className={'font-bold leading-5'}>{project.project_name}</span></p>
                                  </div>
                                  }
                              </div>
                              <div className={'self-center flex justify-end w-2/6'}>
                                    {
                                      project.status==1 ?
                                      <div className={'rounded-[5px] py-1 bg-bgstatustaskongoing w-[109px] flex justify-center items-center'}>
                                      <p className={'text-[10px] font-medium leading-4 text-secondary100'}>Berlangsung</p>
                                    </div>
                                    :
                                    project.status==2 ?
                                    <div className={'rounded-[5px] py-1 bg-bgstatustaskfinish w-[109px] flex justify-center items-center'}>
                                      <p className={'text-[10px] font-medium leading-4 text-secondary100'}>Selesai</p>
                                    </div>
                                    :
                                    <div className={'rounded-[5px] py-1 bg-bgstatustasklate w-[109px] flex justify-center items-center'}>
                                      <p className={'text-[10px] font-medium leading-4 text-secondary100'}>Terlambat</p>
                                    </div>
                                    }
                              </div>
                          </div>  
                              ))
                          } */}
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps<
  ProtectedPageProps
> = async (ctx) => {
  var initProps = "";
  if (!ctx.req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(ctx.req.headers.cookie);
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
      dataProfile,
      token: initProps,
    },
  };
};

export default DetailProjectCompanyPage;
