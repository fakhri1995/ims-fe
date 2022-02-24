import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Empty,
  Input,
  Progress,
  Select,
  Spin,
  Tree,
  TreeSelect,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import Buttonsys from "../../../components/button";
import DrawerTaskCreate from "../../../components/drawer/tasks/drawerTaskCreate";
import DrawerTaskTypesCreate from "../../../components/drawer/tasks/drawerTaskTypesCreate";
import DrawerTaskTypesUpdate from "../../../components/drawer/tasks/drawerTaskTypesUpdate";
import {
  AlerttriangleIconSvg,
  ArrowsSortIconSvg,
  BackIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  ClipboardcheckIconSvg,
  ClockIconSvg,
  EditIconSvg,
  ListcheckIconSvg,
  LocationIconSvg,
  MappinIconSvg,
  SearchIconSvg,
  SortAscendingIconSvg,
  SortDescendingIconSvg,
  TrashIconSvg,
  UserIconSvg,
} from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import { ModalHapusTipeTask } from "../../../components/modal/modalCustom";
import {
  TableCustomAdminTask,
  TableCustomStaffTask,
  TableCustomTask,
  TableCustomTipeTask,
} from "../../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../../components/typography";
import { createKeyPressHandler } from "../../../lib/helper";
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

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const TaskIndex = ({ initProps, dataProfile, sidemenu }) => {
  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  //useState
  //1.1.STATUS LIST
  const [statustaskdata, setstatustaskdata] = useState([]);
  const [loadingstatustaskdata, setloadingstatustaskdata] = useState(true);
  //1.1.1.status - date
  const [statustaskdatefilter, setstatustaskdatefilter] = useState(false);
  const [statustaskdatestate, setstatustaskdatestate] = useState({
    from: "",
    to: "",
  });
  //1.1.2.status - location
  const [statustaskloc, setstatustaskloc] = useState([]);
  const [statustasklocstate, setstatustasklocstate] = useState("");
  const [statusloctoggle, setstatusloctoggle] = useState(false);
  //1.2.TASK TYPE COUNT
  const [ttccolorbar, setttccolorbar] = useState([
    "#2F80ED",
    "#E5C471",
    "#BF4A40",
    "#6AAA70",
  ]);
  const [ttcdata, setttcdata] = useState([]);
  const [loadingttcdata, setloadingttcdata] = useState(true);
  //1.2.2.task type count - location
  const [ttcloc, setttcloc] = useState([]);
  const [ttloctoggle, setttloctoggle] = useState(false);
  //1.3.DEADLINE TASK
  const [dtdata, setdtdata] = useState({
    deadline: {
      today_deadline: 0,
      tomorrow_deadline: 0,
      first_range_deadline: 0,
      second_range_deadline: 0,
      third_range_deadline: 0,
    },
    date: {
      first_start_date: "",
      first_end_date: "",
      second_start_date: "",
      second_end_date: "",
      third_start_date: "",
      third_end_date: "",
    },
  });
  const [loadingdtdata, setloadingdtdata] = useState(true);
  //1.3.1.deadline task - date
  const [dtdatestate, setdtdatestate] = useState({
    from: "",
    to: "",
  });
  const [dtdatefilter, setdtdatefilter] = useState(false);
  //1.3.2.deadline task - location
  const [dtloc, setdtloc] = useState([]);
  const [dtlocstate, setdtlocstate] = useState("");
  const [dtloctoggle, setdtloctoggle] = useState(false);
  //1.4.STAFF COUNT
  const [scdata, setscdata] = useState({
    total_staff: 0,
    total_staff_without_task: 0,
    percentage: 0,
  });
  const [loadingscdata, setloadingscdata] = useState(true);
  //TASK TYPES
  const [datarawtipetask, setdatarawtipetask] = useState({
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
  const [datatipetasks, setdatatipetasks] = useState([]);
  const [loadingtipetasks, setloadingtipetasks] = useState(false);
  const [viewdetailtipetask, setviewdetailtipetask] = useState(false);
  const [pagetipetask, setpagetipetask] = useState(1);
  const [rowstipetask, setrowstipetask] = useState(10);
  const [sortingtipetask, setsortingtipetask] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [searcingtipetask, setsearcingtipetask] = useState("");
  //create - task type
  const [drawertasktypecreate, setdrawertasktypecreate] = useState(false);
  //update - task type
  const [triggertasktypupdate, settriggertasktypupdate] = useState(-1);
  const [idtasktypupdate, setidtasktypupdate] = useState(-1);
  const [drawertasktypupdate, setdrawertasktypupdate] = useState(false);
  //delete - task type
  const [datatipetaskdelete, setdatatipetaskdelete] = useState({
    id: null,
    name: "",
  });
  const [modaltipetaskdelete, setmodaltipetaskdelete] = useState(false);
  const [loadingtipetaskdelete, setloadingtipetaskdelete] = useState(false);
  //TASKS
  const [datarawtask, setdatarawtask] = useState({
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
  const [datatasks, setdatatasks] = useState([]);
  const [loadingtasks, setloadingtasks] = useState(false);
  const [loadingcreate, setloadingcreate] = useState(false);
  //filter dan sort - tasks
  const [datafiltertipetasks, setdatafiltertipetasks] = useState([]);
  const [datafilterlokasi, setdatafilterlokasi] = useState([]);
  const [searchstate, setsearchstate] = useState("");
  const [sortstate, setsortstate] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [statusfilterstate, setstatusfilterstate] = useState("");
  const [lokasifilterstate, setlokasifilterstate] = useState("");
  const [fromdatefilterstate, setfromdatefilterstate] = useState("");
  const [todatefilterstate, settodatefilterstate] = useState("");
  const [tasktypefilterstate, settasktypefilterstate] = useState("");
  const [fetchingtasktypes, setfetchingtasktypes] = useState(false);
  const [pagetask, setpagetask] = useState(1);
  const [rowstask, setrowstask] = useState(10);
  //create - tasks
  const [drawertaskcreate, setdrawertaskcreate] = useState(false);
  //STAFF
  const [datarawstaff, setdatarawstaff] = useState({
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
  const [datastaff, setdatastaff] = useState([]);
  const [loadingstaff, setloadingstaff] = useState(true);
  const [viewdetailstaff, setviewdetailstaff] = useState(false);
  const [pagestaff, setpagestaff] = useState(1);
  const [rowsstaff, setrowsstaff] = useState(10);
  const [searcingstaff, setsearcingstaff] = useState("");
  const [intervaldatestafffilter, setintervaldatestafffilter] = useState(false);
  const [sortingstaff, setsortingstaff] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [intervaldatestaff, setintervaldatestaff] = useState({
    from: "",
    to: "",
  });

  //2. columns table
  const columnsTipetask = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawtipetask.from + index}</>,
        };
      },
    },
    {
      title: "Tipe Task",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record.name}</>,
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: <>{record.description}</>,
        };
      },
    },
    {
      title: "Jumlah Task",
      dataIndex: "count",
      render: (text, record, index) => {
        return {
          children: <>{record.tasks_count}</>,
        };
      },
      sorter: (a, b) => a.tasks_count < b.tasks_count,
    },
    {
      title: "Opsi",
      dataIndex: "option",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center">
              <div className="mx-1">
                <Buttonsys
                  type="default"
                  onClick={() => {
                    settriggertasktypupdate(record.id);
                    setdrawertasktypupdate(true);
                  }}
                >
                  <EditIconSvg size={15} color={`#35763B`} />
                </Buttonsys>
              </div>
              <div className="mx-1">
                <Buttonsys
                  type="default"
                  color="danger"
                  onClick={() => {
                    setdatatipetaskdelete({ id: record.id, name: record.name });
                    setmodaltipetaskdelete(true);
                  }}
                >
                  <TrashIconSvg size={15} color={`#BF4A40`} />
                </Buttonsys>
              </div>
            </div>
          ),
        };
      },
    },
  ];
  const columnsTask = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawtask.from + index}</>,
        };
      },
    },
    {
      title: "Nomor Task",
      dataIndex: "id",
      render: (text, record, index) => {
        return {
          children: <>T-000{record.id}</>,
        };
      },
      sorter: (a, b) => a.id < b.id,
    },
    {
      title: "Tipe Task",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <>{record.task_type === null ? `-` : record.task_type.name}</>
          ),
        };
      },
      // sorter: (a, b) => a.task_type.name.localeCompare(b.task_type.name),
    },
    {
      title: "Judul Task",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <>{record.name === "" || record.name === "-" ? `-` : record.name}</>
          ),
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.deadline === null
                ? `-`
                : moment(record.deadline).locale("id").format("lll")}
            </>
          ),
        };
      },
      sorter: (a, b) => a.deadline > b.deadline,
    },
    {
      title: "Staff",
      dataIndex: "users",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.users.length === 0
                ? `-`
                : record.users.map((docmap) => docmap.name).join(", ")}
            </>
          ),
        };
      },
    },
    {
      title: "Lokasi",
      dataIndex: "location",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.location === null ? `-` : record.location.full_location}
            </>
          ),
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.status === 1 && (
                <div className="rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">
                  Overdue
                </div>
              )}
              {record.status === 2 && (
                <div className="rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">
                  Open
                </div>
              )}
              {record.status === 3 && (
                <div className="rounded-md h-auto px-3 text-center py-1 bg-onprogress bg-opacity-10 text-onprogress">
                  On-Progress
                </div>
              )}
              {record.status === 4 && (
                <div className="rounded-md h-auto px-3 text-center py-1 bg-onhold bg-opacity-10 text-onhold">
                  On-Hold
                </div>
              )}
              {record.status === 5 && (
                <div className="rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">
                  Completed
                </div>
              )}
              {record.status === 6 && (
                <div className="rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">
                  Closed
                </div>
              )}
            </>
          ),
        };
      },
      sorter: (a, b) => a.status < b.status,
      filters: [
        {
          text: "Overdue",
          value: 1,
        },
        {
          text: "Open",
          value: 2,
        },
        {
          text: "On Progress",
          value: 3,
        },
        {
          text: "On Hold",
          value: 4,
        },
        {
          text: "Completed",
          value: 5,
        },
        {
          text: "Closed",
          value: 6,
        },
      ],
      onFilter: (value, record) => record.status === value,
      filterMultiple: false,
    },
  ];
  const columnsStaffTask = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawstaff.from + index}</>,
        };
      },
    },
    {
      title: "Nama Staff",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className=" flex items-center">
              <div className=" rounded-full w-10 h-10 mr-1">
                <img
                  src={
                    record.profile_image === "-"
                      ? "/image/staffTask.png"
                      : record.profile_image
                  }
                  className=" object-contain"
                  alt=""
                />
              </div>
              <p className=" mb-0 text-sm font-semibold">{record.name}</p>
            </div>
          ),
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Overdue",
      dataIndex: "overdue",
      render: (text, record, index) => {
        return {
          children: <>{record.status_list[0].status_count}</>,
        };
      },
    },
    {
      title: "Open",
      dataIndex: "open",
      render: (text, record, index) => {
        return {
          children: <>{record.status_list[1].status_count}</>,
        };
      },
    },
    {
      title: "On Progess",
      dataIndex: "onprogress",
      render: (text, record, index) => {
        return {
          children: <>{record.status_list[2].status_count}</>,
        };
      },
    },
    {
      title: "On Hold",
      dataIndex: "onhold",
      render: (text, record, index) => {
        return {
          children: <>{record.status_list[3].status_count}</>,
        };
      },
    },
    {
      title: "Completed",
      dataIndex: "completed",
      render: (text, record, index) => {
        return {
          children: <>{record.status_list[4].status_count}</>,
        };
      },
    },
    {
      title: "Closed",
      dataIndex: "closed",
      render: (text, record, index) => {
        return {
          children: <>{record.status_list[5].status_count}</>,
        };
      },
    },
    {
      title: "Jumlah Task",
      dataIndex: "sum_task",
      render: (text, record, index) => {
        return {
          children: <>{record.sum_task}</>,
        };
      },
    },
  ];

  //HANDLER
  const onFilterTask = () => {
    setloadingtasks(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTasks?page=${pagetask}&rows=${rowstask}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawtask(res2.data);
        setdatatasks(res2.data.data);
        setloadingtasks(false);
      });
  };
  const handleDeleteTipeTask = () => {
    setloadingtipetaskdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTaskType`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: datatipetaskdelete.id,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingtipetaskdelete(false);
        if (res2.success) {
          setmodaltipetaskdelete(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterTask, "Enter");

  //USEEFFECT
  useEffect(() => {
    if (viewdetailtipetask === true) {
      setloadingtipetasks(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${pagetipetask}&rows=${rowstipetask}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setdatarawtipetask(res2.data);
          setdatatipetasks(res2.data.data);
          setdatafiltertipetasks(res2.data.data);
          setloadingtipetasks(false);
        });
    }
  }, [viewdetailtipetask, loadingcreate, modaltipetaskdelete]);
  useEffect(() => {
    setloadingtasks(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTasks?page=${pagetask}&rows=${rowstask}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawtask(res2.data);
        setdatatasks(res2.data.data);
        setloadingtasks(false);
      });
  }, [loadingcreate]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatafilterlokasi(res2.data.children);
        setstatustaskloc(res2.data.children);
        setttcloc(res2.data.children);
        setdtloc(res2.data.children);
        setloadingstatustaskdata(false);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getStatusTaskList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setstatustaskdata(res2.data);
        setloadingstatustaskdata(false);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypeCounts`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setttcdata(res2.data);
        setloadingttcdata(false);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdtdata(res2.data);
        setloadingdtdata(false);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskStaffCounts`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setscdata(res2.data);
        setloadingscdata(false);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getStaffTaskStatuses`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatarawstaff(res2.data);
        setdatastaff(res2.data.data);
        setloadingstaff(false);
      });
  }, []);
  useEffect(() => {
    if (triggertasktypupdate !== -1) {
      setidtasktypupdate(triggertasktypupdate);
    }
  }, [triggertasktypupdate]);

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
      prevpath={"admin"}
    >
      <div className="flex flex-col" id="mainWrapper">
        {viewdetailtipetask || viewdetailstaff ? (
          <>
            {viewdetailtipetask && (
              <div className="px-5">
                <div className="flex flex-col shadow-md rounded-lg bg-white p-5 mb-6 mx-3">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex">
                      <div
                        className="mr-2 cursor-pointer"
                        onClick={() => {
                          setviewdetailtipetask(false);
                        }}
                      >
                        <BackIconSvg size={15} color={`#000000`} />
                      </div>
                      <H1>Semua Tipe Task</H1>
                    </div>
                    <div className="w-8/12 flex justify-end">
                      <div className=" mx-2">
                        <Buttonsys
                          type="primary"
                          onClick={() => {
                            setdrawertasktypecreate(true);
                          }}
                        >
                          + Tambah Tipe Task
                        </Buttonsys>
                      </div>
                      <div className="mx-2">
                        <Input
                          style={{ width: `20rem` }}
                          placeholder="Nama tipe task.."
                          allowClear
                          onChange={(e) => {
                            setsearcingtipetask(e.target.value);
                            setloadingtipetasks(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${pagetipetask}&rows=${rowstipetask}&name=${e.target.value}&sort_by=${sortingtipetask.sort_by}&sort_type=${sortingtipetask.sort_type}`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setdatarawtipetask(res2.data);
                                setdatatipetasks(res2.data.data);
                                setloadingtipetasks(false);
                              });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <TableCustomTipeTask
                      dataSource={datatipetasks}
                      setDataSource={setdatatipetasks}
                      columns={columnsTipetask}
                      loading={loadingtipetasks}
                      setpraloading={setloadingtipetasks}
                      pageSize={rowstipetask}
                      total={datarawtipetask.total}
                      initProps={initProps}
                      setpage={setpagetipetask}
                      pagefromsearch={pagetipetask}
                      setdataraw={setdatarawtipetask}
                      setsortingtipetask={setsortingtipetask}
                      sortingtipetask={sortingtipetask}
                      searcingtipetask={searcingtipetask}
                    />
                  </div>
                </div>
                <ModalHapusTipeTask
                  title={"Konfirmasi Hapus Tipe Task"}
                  visible={modaltipetaskdelete}
                  onvisible={setmodaltipetaskdelete}
                  onCancel={() => {
                    setmodaltipetaskdelete(false);
                  }}
                  loading={loadingtipetaskdelete}
                  datadelete={datatipetaskdelete}
                  onOk={handleDeleteTipeTask}
                />
              </div>
            )}
            {viewdetailstaff && (
              <div className="px-5">
                <div className="flex flex-col shadow-md rounded-lg bg-white p-5 mb-6 mx-3">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex">
                      <div
                        className="mr-2 cursor-pointer"
                        onClick={() => {
                          setviewdetailstaff(false);
                        }}
                      >
                        <BackIconSvg size={15} color={`#000000`} />
                      </div>
                      <H1>Semua Staff</H1>
                    </div>
                    <div className="w-8/12 flex justify-end">
                      {intervaldatestafffilter === false && (
                        <div
                          className=" mx-2 cursor-pointer flex items-center"
                          onClick={() => {
                            setintervaldatestafffilter((prev) => !prev);
                          }}
                        >
                          <div className="mr-1">
                            <SortAscendingIconSvg size={15} color={`#35763B`} />
                          </div>
                          <p className="mb-0 font-semibold text-sm text-primary100 hover:text-primary75">
                            Interval Tanggal
                          </p>
                        </div>
                      )}
                      {intervaldatestafffilter && (
                        <DatePicker.RangePicker
                          showTime
                          allowEmpty
                          className="datepickerStatus"
                          onChange={(dates, datestrings) => {
                            setintervaldatestaff({
                              from: datestrings[0],
                              to: datestrings[1],
                            });
                            setloadingstaff(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStaffTaskStatuses?page=${pagestaff}&rows=${rowsstaff}&from=${datestrings[0]}&to=${datestrings[1]}&name=${searcingstaff}`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setdatarawstaff(res2.data);
                                setdatastaff(res2.data.data);
                                setloadingstaff(false);
                                datestrings[0] === "" && datestrings[1] === ""
                                  ? setintervaldatestafffilter(false)
                                  : null;
                              });
                          }}
                        />
                      )}
                      <div className="mx-2">
                        <Input
                          style={{ width: `20rem`, height: `100%` }}
                          placeholder="Nama Staff.."
                          allowClear
                          onChange={(e) => {
                            setsearcingstaff(e.target.value);
                            setloadingstaff(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStaffTaskStatuses?page=${pagestaff}&rows=${rowsstaff}&name=${e.target.value}&from=${intervaldatestaff.from}&to=${intervaldatestaff.to}`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setdatarawstaff(res2.data);
                                setdatastaff(res2.data.data);
                                setloadingstaff(false);
                              });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <TableCustomStaffTask
                      dataSource={datastaff}
                      setDataSource={setdatastaff}
                      columns={columnsStaffTask}
                      loading={loadingstaff}
                      setpraloading={setloadingstaff}
                      pageSize={rowsstaff}
                      total={datarawstaff.total}
                      initProps={initProps}
                      setpage={setpagestaff}
                      pagefromsearch={pagestaff}
                      setdataraw={setdatarawstaff}
                      setsortingstaff={setsortingstaff}
                      searcingstaff={searcingstaff}
                      intervaldatestaff={intervaldatestaff}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-10 px-5" id="wrapper1">
            {/* DEADLINE TASK */}
            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
              <div className="flex items-center justify-between mb-4">
                <H1>Deadline Task</H1>
                <div className="flex items-center">
                  <div className=" dropdown">
                    <div
                      tabIndex={`2`}
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        setdtloctoggle((prev) => !prev);
                      }}
                    >
                      <MappinIconSvg color={`#000000`} size={25} />
                    </div>
                    {dtloctoggle ? (
                      <div
                        tabIndex={`2`}
                        className="p-5 shadow menu dropdown-content bg-white rounded-box w-72 flex flex-col max-h-72 overflow-scroll"
                      >
                        <div
                          className=" flex justify-end mb-1 cursor-pointer"
                          onClick={() => {
                            setdtloctoggle(false);
                            setloadingdtdata(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?location=`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setdtlocstate("");
                                setdtdata(res2.data);
                                setloadingdtdata(false);
                              });
                          }}
                        >
                          <p className=" text-xs text-gray-500 mr-1">Reset</p>
                          <CircleXIconSvg size={15} color={`#BF4A40`} />
                        </div>
                        <Tree
                          className="treeTaskStatusList"
                          defaultExpandAll
                          treeData={dtloc}
                          switcherIcon={<DownOutlined />}
                          showIcon
                          blockNode={true}
                          titleRender={(nodeData) => (
                            <div
                              className="flex items-start w-full py-3 rounded-md px-2"
                              onClick={() => {
                                setdtloctoggle(false);
                                setloadingdtdata(true);
                                fetch(
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?location=${nodeData.key}`,
                                  {
                                    method: `GET`,
                                    headers: {
                                      Authorization: JSON.parse(initProps),
                                    },
                                  }
                                )
                                  .then((res) => res.json())
                                  .then((res2) => {
                                    if (res2.success) {
                                      setdtlocstate(nodeData.key);
                                      setdtdata(res2.data);
                                      setloadingdtdata(false);
                                    } else {
                                      notification["error"]({
                                        message: res2.message,
                                        duration: 3,
                                      });
                                      setloadingdtdata(false);
                                    }
                                  });
                              }}
                            >
                              <div className="mr-3 flex items-start">
                                <LocationIconSvg
                                  id={`icon${nodeData.key}`}
                                  size={15}
                                  color={`#808080`}
                                />
                              </div>
                              <div className="mr-3">
                                <p
                                  className=" text-gray-500 mb-0"
                                  id={`text${nodeData.key}`}
                                >
                                  {nodeData.title}
                                </p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="mx-1 cursor-pointer"
                    onClick={() => {
                      setdtdatefilter((prev) => !prev);
                    }}
                  >
                    <CalendartimeIconSvg color={`#000000`} size={25} />
                  </div>
                  <DatePicker.RangePicker
                    value={
                      dtdatestate.from === ""
                        ? ["", ""]
                        : [moment(dtdatestate.from), moment(dtdatestate.to)]
                    }
                    allowEmpty
                    style={{ visibility: `hidden`, width: `0`, padding: `0` }}
                    className="datepickerStatus"
                    open={dtdatefilter}
                    onChange={(dates, datestrings) => {
                      setdtdatefilter((prev) => !prev);
                      setloadingdtdata(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?from=${datestrings[0]}&to=${datestrings[1]}&location=${dtlocstate}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          if (res2.success) {
                            setdtdatestate({
                              from: datestrings[0],
                              to: datestrings[1],
                            });
                            setdtdata(res2.data);
                            setloadingdtdata(false);
                          } else {
                            notification["error"]({
                              message: res2.message,
                              duration: 3,
                            });
                            setloadingdtdata(false);
                          }
                        });
                    }}
                    renderExtraFooter={() => (
                      <div className=" flex items-center">
                        <p
                          className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                          onClick={() => {
                            setdtdatefilter((prev) => !prev);
                            setloadingdtdata(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?from=&to=&location=${dtlocstate}`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                if (res2.success) {
                                  setdtdatestate({ from: "", to: "" });
                                  setdtdata(res2.data);
                                  setloadingdtdata(false);
                                } else {
                                  notification["error"]({
                                    message: res2.message,
                                    duration: 3,
                                  });
                                  setloadingdtdata(false);
                                }
                              });
                          }}
                        >
                          Reset
                        </p>
                      </div>
                    )}
                  />
                </div>
              </div>
              {loadingdtdata ? (
                <>
                  <Spin />
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-4 h-56">
                    <Line
                      data={{
                        labels: [
                          `${moment(dtdata.date.first_start_date)
                            .locale("id")
                            .format("Do MMM")}-${moment(
                            dtdata.date.first_end_date
                          )
                            .locale("id")
                            .format("Do MMM")}`,
                          `${moment(dtdata.date.second_start_date)
                            .locale("id")
                            .format("Do MMM")}-${moment(
                            dtdata.date.second_end_date
                          )
                            .locale("id")
                            .format("Do MMM")}`,
                          `${moment(dtdata.date.third_start_date)
                            .locale("id")
                            .format("Do MMM")}-${moment(
                            dtdata.date.third_end_date
                          )
                            .locale("id")
                            .format("Do MMM")}`,
                        ],
                        datasets: [
                          {
                            data: [
                              dtdata.deadline.first_range_deadline,
                              dtdata.deadline.second_range_deadline,
                              dtdata.deadline.third_range_deadline,
                            ],
                            borderColor: "#35763B",
                            tension: 0.5,
                            fill: false,
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: false,
                        },
                        legend: {
                          display: false,
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                          y: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex">
                        <Text>Berakhir hari ini</Text>
                      </div>
                      <div className="flex">
                        <H2>{dtdata.deadline.today_deadline}</H2>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex">
                        <Text>Berakhir besok</Text>
                      </div>
                      <div className="flex">
                        <H2>{dtdata.deadline.tomorrow_deadline}</H2>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* STAFF TASK */}
            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
              <div className="flex items-center justify-between mb-4">
                <H1>Staff</H1>
                <div className="flex items-center">
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      setviewdetailstaff(true);
                    }}
                  >
                    <Label color="green" cursor="pointer">
                      Lihat Semua
                    </Label>
                  </div>
                </div>
              </div>
              {loadingscdata ? (
                <>
                  <Spin />
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-4 h-40">
                    <Progress
                      type="dashboard"
                      percent={scdata.percentage}
                      strokeColor={{
                        from: `#65976a`,
                        to: `#35763B`,
                      }}
                      strokeWidth={8}
                      width={170}
                      format={(percent) => (
                        <div className=" flex flex-col items-center">
                          <div>
                            <p className=" mb-0 font-bold text-3xl">
                              {percent}%
                            </p>
                          </div>
                          {/* <div>
                                                                <p className=' mb-0 text-xs text-gray-500'>
                                                                    Persentase staff tidak memiliki task
                                                                </p>
                                                            </div> */}
                        </div>
                      )}
                    />
                  </div>
                  <div className=" mb-4 flex flex-col items-center">
                    <div className=" flex items-center">
                      <div className=" mb-1 mr-1">
                        <UserIconSvg />
                      </div>
                      <div>
                        <H2>
                          {scdata.total_staff_without_task} /{" "}
                          {scdata.total_staff}
                        </H2>
                      </div>
                    </div>
                    <div>
                      <Label>Staff tidak memiliki task</Label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex">
                        <Text>Total Staff</Text>
                      </div>
                      <div className="flex">
                        <H2>{scdata.total_staff}</H2>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex">
                        <Text>Staff tidak memiliki task</Text>
                      </div>
                      <div className="flex">
                        <H2>{scdata.total_staff_without_task}</H2>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* KELOLA TASK */}
            <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
              <div className="flex items-center justify-between mb-4">
                <H1>Kelola Task</H1>
              </div>
              <div className="flex flex-col justify-center h-full">
                <div
                  className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
                  onClick={() => {
                    setdrawertaskcreate(true);
                  }}
                >
                  <div className="flex p-1 bg-primary10 rounded mr-3">
                    <ClipboardcheckIconSvg size={35} color={`#35763B`} />
                  </div>
                  <div className="flex flex-col">
                    <H2>Tambah Task</H2>
                    <Label>
                      Error, PM, Instalasi, Perbaikan, Upgrade Sistem, dll.{" "}
                    </Label>
                  </div>
                </div>
                <div
                  className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
                  onClick={() => {
                    setdrawertasktypecreate(true);
                  }}
                >
                  <div className="flex p-1 bg-primary10 rounded mr-3">
                    <ListcheckIconSvg size={35} color={`#35763B`} />
                  </div>
                  <div className="flex flex-col">
                    <H2>Tambah Tipe Task</H2>
                    <Label>Tambah tipe task baru</Label>
                  </div>
                </div>
                <div
                  className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
                  onClick={() => {
                    rt.push(`/tasks/tasktypes`);
                  }}
                >
                  <div className="flex p-1 bg-primary10 rounded mr-3">
                    <EditIconSvg size={35} color={`#35763B`} />
                  </div>
                  <div className="flex flex-col">
                    <H2>Kelola Tipe Task</H2>
                    <Label>Hapus, ubah, lihat daftar tipe task</Label>
                  </div>
                </div>
              </div>
            </div>
            {/* STATUS TASK */}
            <div className="col-span-5 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
              <div className="flex items-center justify-between mb-4">
                <H1>Status Task</H1>
                <div className="flex items-center">
                  <div className=" dropdown">
                    <div
                      tabIndex={`0`}
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        setstatusloctoggle((prev) => !prev);
                      }}
                    >
                      <MappinIconSvg color={`#000000`} size={25} />
                    </div>
                    {statusloctoggle ? (
                      <div
                        tabIndex={`0`}
                        className="p-5 shadow menu dropdown-content bg-white rounded-box w-72 flex flex-col max-h-72 overflow-scroll"
                      >
                        <div
                          className=" flex justify-end mb-1 cursor-pointer"
                          onClick={() => {
                            setstatusloctoggle(false);
                            setloadingstatustaskdata(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStatusTaskList?from=${statustaskdatestate.from}&to=${statustaskdatestate.to}&location=`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setstatustasklocstate("");
                                setstatustaskdata(res2.data);
                                setloadingstatustaskdata(false);
                              });
                          }}
                        >
                          <p className=" text-xs text-gray-500 mr-1">Reset</p>
                          <CircleXIconSvg size={15} color={`#BF4A40`} />
                        </div>
                        <Tree
                          className="treeTaskStatusList"
                          defaultExpandAll
                          treeData={statustaskloc}
                          switcherIcon={<DownOutlined />}
                          showIcon
                          blockNode={true}
                          titleRender={(nodeData) => (
                            <div
                              className="flex items-start w-full py-3 rounded-md px-2"
                              onClick={() => {
                                setstatusloctoggle(false);
                                setloadingstatustaskdata(true);
                                fetch(
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStatusTaskList?from=${statustaskdatestate.from}&to=${statustaskdatestate.to}&location=${nodeData.key}`,
                                  {
                                    method: `GET`,
                                    headers: {
                                      Authorization: JSON.parse(initProps),
                                    },
                                  }
                                )
                                  .then((res) => res.json())
                                  .then((res2) => {
                                    setstatustasklocstate(nodeData.key);
                                    setstatustaskdata(res2.data);
                                    setloadingstatustaskdata(false);
                                  });
                              }}
                            >
                              <div className="mr-3 flex items-start">
                                <LocationIconSvg
                                  id={`icon${nodeData.key}`}
                                  size={15}
                                  color={`#808080`}
                                />
                              </div>
                              <div className="mr-3">
                                <p
                                  className=" text-gray-500 mb-0"
                                  id={`text${nodeData.key}`}
                                >
                                  {nodeData.title}
                                </p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="mx-1 cursor-pointer"
                    onClick={() => {
                      setstatustaskdatefilter((prev) => !prev);
                    }}
                  >
                    <CalendartimeIconSvg color={`#000000`} size={25} />
                  </div>
                  <DatePicker.RangePicker
                    value={
                      statustaskdatestate.from === ""
                        ? ["", ""]
                        : [
                            moment(statustaskdatestate.from),
                            moment(statustaskdatestate.to),
                          ]
                    }
                    allowEmpty
                    style={{ visibility: `hidden`, width: `0`, padding: `0` }}
                    className="datepickerStatus"
                    open={statustaskdatefilter}
                    onChange={(dates, datestrings) => {
                      setstatustaskdatefilter((prev) => !prev);
                      setloadingstatustaskdata(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStatusTaskList?from=${datestrings[0]}&to=${datestrings[1]}&location=${statustasklocstate}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setstatustaskdatestate({
                            from: datestrings[0],
                            to: datestrings[1],
                          });
                          setstatustaskdata(res2.data);
                          setloadingstatustaskdata(false);
                        });
                    }}
                    renderExtraFooter={() => (
                      <div className=" flex items-center">
                        <p
                          className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                          onClick={() => {
                            setstatustaskdatefilter((prev) => !prev);
                            setloadingstatustaskdata(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStatusTaskList?from=&to=&location=${statustasklocstate}`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setstatustaskdatestate({ from: "", to: "" });
                                setstatustaskdata(res2.data);
                                setloadingstatustaskdata(false);
                              });
                          }}
                        >
                          Reset
                        </p>
                      </div>
                    )}
                  />
                </div>
              </div>
              {loadingstatustaskdata ? (
                <>
                  <Spin />
                </>
              ) : statustaskdata.every(
                  (docevery) => docevery.status_count === 0
                ) ? (
                <>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </>
              ) : (
                <div className=" flex items-center">
                  <div className=" w-6/12 flex justify-center mr-2">
                    <Doughnut
                      data={{
                        labels: statustaskdata.map((doc) => doc.status_name),
                        datasets: [
                          {
                            data: statustaskdata.map((doc) => doc.status_count),
                            backgroundColor: [
                              "#BF4A40",
                              "#2F80ED",
                              "#ED962F",
                              "#E5C471",
                              "#6AAA70",
                              "#808080",
                            ],
                            borderColor: [
                              "#BF4A40",
                              "#2F80ED",
                              "#ED962F",
                              "#E5C471",
                              "#6AAA70",
                              "#808080",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: false,
                        },
                        legend: {
                          display: false,
                        },
                        maintainAspectRatio: false,
                        cutout: 55,
                        spacing: 5,
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-6/12 ml-2">
                    {statustaskdata.map((doc, idx) => {
                      if (doc.status === 1) {
                        return (
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex">
                              <div className=" w-1 bg-overdue mr-1"></div>
                              <div className="mr-1">
                                <Text>{doc.status_name}</Text>
                              </div>
                              <AlerttriangleIconSvg
                                size={15}
                                color={`#BF4A40`}
                              />
                            </div>
                            <div className="flex">
                              <H2>{doc.status_count}</H2>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex">
                              <div
                                className={`w-1 mr-1 ${
                                  doc.status === 1 && `bg-overdue`
                                } ${doc.status === 2 && `bg-open`} ${
                                  doc.status === 3 && `bg-onprogress`
                                } ${doc.status === 4 && `bg-onhold`} ${
                                  doc.status === 5 && `bg-completed`
                                } ${doc.status === 6 && `bg-closed`}`}
                              ></div>
                              <Text>{doc.status_name}</Text>
                            </div>
                            <div className="flex">
                              <H2>{doc.status_count}</H2>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
            {/* TIPE TASK */}
            <div className="col-span-5 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
              <div className="flex items-center justify-between mb-4">
                <H1>Tipe Task Terbanyak</H1>
                <div className="flex items-center">
                  <div className="dropdown dropdown-left">
                    <div
                      tabIndex={`1`}
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        setttloctoggle((prev) => !prev);
                      }}
                    >
                      <MappinIconSvg color={`#000000`} size={25} />
                    </div>
                    {ttloctoggle ? (
                      <div
                        tabIndex={`1`}
                        className="p-5 shadow menu dropdown-content bg-white rounded-box w-72 flex flex-col max-h-72 overflow-scroll"
                      >
                        <div
                          className=" flex justify-end mb-1 cursor-pointer"
                          onClick={() => {
                            setttloctoggle(false);
                            setloadingttcdata(true);
                            fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypeCounts?location=`,
                              {
                                method: `GET`,
                                headers: {
                                  Authorization: JSON.parse(initProps),
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((res2) => {
                                setttcdata(res2.data);
                                setloadingttcdata(false);
                              });
                          }}
                        >
                          <p className=" text-xs text-gray-500 mr-1">Reset</p>
                          <CircleXIconSvg size={15} color={`#BF4A40`} />
                        </div>
                        <Tree
                          className="treeTaskStatusList"
                          defaultExpandAll
                          treeData={ttcloc}
                          switcherIcon={<DownOutlined />}
                          showIcon
                          blockNode={true}
                          titleRender={(nodeData) => (
                            <div
                              className="flex items-start w-full py-3 rounded-md px-2"
                              onClick={() => {
                                setttloctoggle(false);
                                setloadingttcdata(true);
                                fetch(
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypeCounts?location=${nodeData.key}`,
                                  {
                                    method: `GET`,
                                    headers: {
                                      Authorization: JSON.parse(initProps),
                                    },
                                  }
                                )
                                  .then((res) => res.json())
                                  .then((res2) => {
                                    setttcdata(res2.data);
                                    setloadingttcdata(false);
                                  });
                              }}
                            >
                              <div className="mr-3 flex items-start">
                                <LocationIconSvg
                                  id={`icon${nodeData.key}`}
                                  size={15}
                                  color={`#808080`}
                                />
                              </div>
                              <div className="mr-3">
                                <p
                                  className=" text-gray-500 mb-0"
                                  id={`text${nodeData.key}`}
                                >
                                  {nodeData.title}
                                </p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {loadingttcdata ? (
                <>
                  <Spin />
                </>
              ) : (
                <div className=" flex items-center h-full">
                  <div className=" w-7/12 flex justify-center mr-2 h-full">
                    <Bar
                      data={{
                        labels: ttcdata.map((doc) => doc.name),
                        datasets: [
                          {
                            data: ttcdata.map((doc) => doc.tasks_count),
                            backgroundColor: ttcdata.map(
                              (doc, idx) =>
                                ttccolorbar[idx + (1 % ttccolorbar.length) - 1]
                            ),
                            borderColor: ttcdata.map(
                              (doc, idx) =>
                                ttccolorbar[idx + (1 % ttccolorbar.length) - 1]
                            ),
                            barPercentage: 1.0,
                            barThickness: 18,
                            maxBarThickness: 15,
                            minBarLength: 2,
                            borderRadius: 3,
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: false,
                        },
                        legend: {
                          display: false,
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                          y: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-5/12 ml-2">
                    {ttcdata.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center mb-1"
                      >
                        <div className="flex">
                          <div
                            className=" w-1 mr-2"
                            style={{
                              backgroundColor: `${
                                ttccolorbar[idx + (1 % ttccolorbar.length) - 1]
                              }`,
                            }}
                          ></div>
                          <Text>{doc.name}</Text>
                        </div>
                        <div className="flex">
                          <H2>{doc.tasks_count}</H2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* TABLE DAFTAR TASK */}
            <div className="col-span-10 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
              <div className="flex items-center justify-between mb-4">
                <H1>Semua Task</H1>
              </div>
              <div className=" flex items-center mb-4">
                <div className="mx-1 w-2/12">
                  <Input
                    value={searchstate}
                    style={{ width: `100%` }}
                    placeholder="Judul atau ID.."
                    allowClear
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setsearchstate("");
                      } else {
                        setsearchstate(e.target.value);
                      }
                    }}
                    onKeyPress={onKeyPressHandler}
                  />
                </div>
                <div className="mx-1 w-2/12">
                  <Select
                    value={
                      tasktypefilterstate === "" ? null : tasktypefilterstate
                    }
                    placeholder="Semua Tipe Task"
                    style={{ width: `100%` }}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    notFoundContent={
                      fetchingtasktypes ? <Spin size="small" /> : null
                    }
                    onSearch={(value) => {
                      setfetchingtasktypes(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTaskTypes?name=${value}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setdatafiltertipetasks(res2.data);
                          setfetchingtasktypes(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    name={`task_type_id`}
                    onChange={(value) => {
                      typeof value === "undefined"
                        ? settasktypefilterstate("")
                        : settasktypefilterstate(value);
                    }}
                  >
                    {datafiltertipetasks.map((doc, idx) => (
                      <Select.Option key={idx} value={doc.id}>
                        {doc.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className=" w-3/12 mx-1">
                  <DatePicker.RangePicker
                    showTime
                    allowEmpty
                    className="datepickerStatus"
                    value={
                      fromdatefilterstate === ""
                        ? [null, null]
                        : [
                            moment(fromdatefilterstate),
                            moment(todatefilterstate),
                          ]
                    }
                    onChange={(dates, datestrings) => {
                      setfromdatefilterstate(datestrings[0]);
                      settodatefilterstate(datestrings[1]);
                      setloadingstaff(true);
                    }}
                  />
                </div>
                <div className=" mx-1 w-2/12">
                  <TreeSelect
                    style={{ width: `100%` }}
                    allowClear
                    placeholder="Semua Lokasi"
                    showSearch
                    suffixIcon={<SearchOutlined />}
                    showArrow
                    name={`locations_id`}
                    onChange={(value) => {
                      typeof value === "undefined"
                        ? setlokasifilterstate("")
                        : setlokasifilterstate(value);
                    }}
                    treeData={datafilterlokasi}
                    treeDefaultExpandAll
                    value={lokasifilterstate === "" ? null : lokasifilterstate}
                    treeNodeFilterProp="title"
                    filterTreeNode={(search, item) => {
                      /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                      /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                      return (
                        item.title
                          .toLowerCase()
                          .indexOf(search.toLowerCase()) >= 0
                      );
                    }}
                  ></TreeSelect>
                </div>
                <div className=" mx-1 w-2/12">
                  <Select
                    style={{ width: `100%` }}
                    value={statusfilterstate === "" ? null : statusfilterstate}
                    placeholder="Semua Status"
                    allowClear
                    name={`status`}
                    onChange={(value) => {
                      typeof value === "undefined"
                        ? setstatusfilterstate("")
                        : setstatusfilterstate(value);
                    }}
                  >
                    <Select.Option value={1}>
                      <div className=" flex items-center">
                        <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-overdue border border-overdue"></div>
                        Overdue
                      </div>
                    </Select.Option>
                    <Select.Option value={2}>
                      <div className=" flex items-center">
                        <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-open border border-open"></div>
                        Open
                      </div>
                    </Select.Option>
                    <Select.Option value={3}>
                      <div className=" flex items-center">
                        <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-onprogress border border-onprogress"></div>
                        On Progress
                      </div>
                    </Select.Option>
                    <Select.Option value={4}>
                      <div className=" flex items-center">
                        <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-onhold border border-onhold"></div>
                        On Hold
                      </div>
                    </Select.Option>
                    <Select.Option value={5}>
                      <div className=" flex items-center">
                        <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-completed border border-completed"></div>
                        Completed
                      </div>
                    </Select.Option>
                    <Select.Option value={6}>
                      <div className=" flex items-center">
                        <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-closed border border-closed"></div>
                        Closed
                      </div>
                    </Select.Option>
                  </Select>
                </div>
                <div className="mx-1 w-1/12">
                  <Buttonsys type={`primary`} onClick={onFilterTask}>
                    <div className="mr-1">
                      <SearchIconSvg size={15} color={`#ffffff`} />
                    </div>
                    Cari
                  </Buttonsys>
                </div>
              </div>
              <div className="flex flex-col">
                <TableCustomAdminTask
                  dataSource={datatasks}
                  setDataSource={setdatatasks}
                  columns={columnsTask}
                  loading={loadingtasks}
                  setpraloading={setloadingtasks}
                  pageSize={rowstask}
                  total={datarawtask.total}
                  initProps={initProps}
                  setpage={setpagetask}
                  pagefromsearch={pagetask}
                  setdataraw={setdatarawtask}
                  sortstate={sortstate}
                  setsortstate={setsortstate}
                  searchstate={searchstate}
                  tasktypefilterstate={tasktypefilterstate}
                  fromdatefilterstate={fromdatefilterstate}
                  todatefilterstate={todatefilterstate}
                  lokasifilterstate={lokasifilterstate}
                  statusfilterstate={statusfilterstate}
                  prevpath={"admin"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <DrawerTaskTypesCreate
        title={"Tambah Tipe Task"}
        visible={drawertasktypecreate}
        onClose={() => {
          setdrawertasktypecreate(false);
        }}
        buttonOkText={"Simpan Tipe Task"}
        initProps={initProps}
        onvisible={setdrawertasktypecreate}
      />
      {/* <DrawerTaskTypesUpdate
                title={"Ubah Tipe Task"}
                visible={drawertasktypupdate}
                onClose={() => { setdrawertasktypupdate(false) }}
                buttonOkText={"Simpan Tipe Task"}
                initProps={initProps}
                onvisible={setdrawertasktypupdate}
                loading={loadingtipetasks}
                id={idtasktypupdate}
            /> */}
      <DrawerTaskCreate
        title={"Tambah Task"}
        visible={drawertaskcreate}
        onClose={() => {
          setdrawertaskcreate(false);
        }}
        buttonOkText={"Simpan Task"}
        initProps={initProps}
        onvisible={setdrawertaskcreate}
        loadingcreate={loadingcreate}
        setloadingcreate={setloadingcreate}
      />
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
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
      sidemenu: "201",
    },
  };
}

export default TaskIndex;

// setsearchstate("")
// setloadingtasks(true)
// fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=${pagetask}&rows=${rowstask}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=&status=${statusfilterstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}`, {
//     method: `GET`,
//     headers: {
//         'Authorization': JSON.parse(initProps),
//     },
// })
//     .then(res => res.json())
//     .then(res2 => {
//         setdatarawtask(res2.data)
//         setdatatasks(res2.data.data)
//         setloadingtasks(false)
//     })
