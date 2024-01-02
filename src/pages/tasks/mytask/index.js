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
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  TASKS_USER_GET,
  TASKS_USER_LAST_TWO_GET,
  TASK_ASSIGN_SELF,
  TASK_PICK_LIST_GET,
  TASK_TYPES_GET,
  TASK_TYPE_USER_COUNTS_GET,
  TASK_USER_STATUSES_GET,
} from "lib/features";
import { isValidDate, permissionWarningNotification } from "lib/helper";

import Buttonsys from "../../../components/button";
import {
  AlerttriangleIconSvg,
  BackIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  ClipboardcheckIconSvg,
  ClockIconSvg,
  LayoutGridAddSvg,
  LocationIconSvg,
  MappinIconSvg,
  SearchIconSvg,
} from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import {
  TableCustomTask,
  TableCustomTaskPick,
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
import clsx from "clsx";
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
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetUserTasks = hasPermission(TASKS_USER_GET);
  const isAllowedToGetTaskPickList = hasPermission(TASK_PICK_LIST_GET);
  const isAllowedToAssignSelfTask = hasPermission(TASK_ASSIGN_SELF);
  const isAllowedToGetTaskTypes = hasPermission(TASK_TYPES_GET);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetLastTwoTasks = hasPermission(TASKS_USER_LAST_TWO_GET);
  const isAllowedToGetTaskStatuses = hasPermission(TASK_USER_STATUSES_GET);
  const isAllowedToGetTaskCount = hasPermission(TASK_TYPE_USER_COUNTS_GET);

  const canViewOpenTaskSection =
    isAllowedToAssignSelfTask && isAllowedToGetTaskPickList;

  // conditional guard when the User clicking "MappinIconSvg" icon to change data source's comany location
  const canOpenLocationTreeDropdown = useCallback(() => {
    if (!isAllowedToGetCompanyList) {
      permissionWarningNotification("Memperbarui", "Lokasi Company");
    }

    return isAllowedToGetCompanyList;
  }, [isAllowedToGetCompanyList]);

  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = `My Task`;

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });

  //useState
  //1.0.SEGERA BERAKHIR
  const [userlasttwo, setuserlasttwo] = useState([]);
  const [loadinguserlasttwo, setloadinguserlasttwo] = useState(true);
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
  //update - task type
  // const [triggertasktypupdate, settriggertasktypupdate] = useState(-1);
  // const [idtasktypupdate, setidtasktypupdate] = useState(-1);
  // const [drawertasktypupdate, setdrawertasktypupdate] = useState(false);
  //TASK TYPES
  // const [searcingtipetask, setsearcingtipetask] = useState("");
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
  //filter dan sort - tasks
  const [datafiltertipetasks, setdatafiltertipetasks] = useState([]);
  const [datafilterlokasi, setdatafilterlokasi] = useState([]);
  const [searchstate, setsearchstate] = useState("");

  const [statusfilterstate, setstatusfilterstate] = useState("");
  const [lokasifilterstate, setlokasifilterstate] = useState("");
  const [fromdatefilterstate, setfromdatefilterstate] = useState("");
  const [todatefilterstate, settodatefilterstate] = useState("");
  const [tasktypefilterstate, settasktypefilterstate] = useState("");
  const [fetchingtasktypes, setfetchingtasktypes] = useState(false);

  //create - tasks
  // const [drawertaskcreate, setdrawertaskcreate] = useState(false);
  //TASK PICK
  const [datarawtaskpick, setdatarawtaskpick] = useState({
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
  const [viewtaskpick, setviewtaskpick] = useState(false);
  const [datataskpick, setdatataskpick] = useState([]);
  const [pagetaskpick, setpagetaskpick] = useState(1);
  const [rowstaskpick, setrowstaskpick] = useState(10);
  const [loadingtaskpick, setloadingtaskpick] = useState(false);
  const [reloadpick, setreloadpick] = useState(-1);
  //filter sort -task pick
  const [sortstatetaskpick, setsortstatetaskpick] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [loadingfiltertaskpick, setloadingfiltertaskpick] = useState(false);
  const [datafilterlokasitaskpick, setdatafilterlokasitaskpick] = useState([]);
  const [datafiltertipetaskstaskpick, setdatafiltertipetaskstaskpick] =
    useState([]);
  const [searchfilterstatetaskpick, setsearchfilterstatetaskpick] =
    useState("");
  const [lokasifilterstatetaskpick, setlokasifilterstatetaskpick] =
    useState("");
  const [fromdatefilterstatetaskpick, setfromdatefilterstatetaskpick] =
    useState("");
  const [todatefilterstatetaskpick, settodatefilterstatetaskpick] =
    useState("");
  const [tasktypefilterstatetaskpick, settasktypefilterstatetaskpick] =
    useState("");

  //2. columns table
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
        const hasTicket = record.reference !== null;
        let ticketIdContent = null;
        if (hasTicket) {
          ticketIdContent = ` / ${record.reference?.type?.code}-${record.reference?.ticketable_id}`;
        }

        return {
          children: (
            <>
              T-000{record.id}
              {ticketIdContent}
            </>
          ),
        };
      },
      sorter: isAllowedToGetUserTasks ? (a, b) => a.id < b.id : false,
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
      sorter: isAllowedToGetUserTasks
        ? (a, b) => a.name.localeCompare(b.name)
        : false,
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
      sorter: isAllowedToGetUserTasks
        ? (a, b) => a.deadline > b.deadline
        : false,
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
      sorter: isAllowedToGetUserTasks ? (a, b) => a.status < b.status : false,
      filters: isAllowedToGetUserTasks
        ? [
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
          ]
        : undefined,
      onFilter: (value, record) => record.status === value,
      filterMultiple: false,
    },
  ];

  const columnsTaskPick = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawtaskpick.from + index}</>,
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
      sorter: isAllowedToGetTaskPickList ? (a, b) => a.id > b.id : false,
    },
    {
      title: "Tipe Task",
      dataIndex: "task_type",
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
      sorter: isAllowedToGetTaskPickList
        ? (a, b) => a.name.localeCompare(b.name)
        : false,
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
      sorter: isAllowedToGetTaskPickList
        ? (a, b) => a.name.localeCompare(b.name)
        : false,
    },
    {
      title: "Lokasi",
      dataIndex: "location",
      render: (text, record, index) => {
        return {
          children: (
            <p className=" truncate">
              {record.location === null ? `-` : record.location.full_location}
            </p>
          ),
        };
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: (
            <p className=" line-clamp-3">
              {record.description === "" || record.description === "-"
                ? `-`
                : record.description}
            </p>
          ),
        };
      },
      sorter: isAllowedToGetTaskPickList
        ? (a, b) => a.name.localeCompare(b.name)
        : false,
    },
    {
      title:
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
      dataIndex: "actions",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <>
              <Buttonsys
                type={`primary`}
                disabled={!isAllowedToAssignSelfTask}
                onClick={() => {
                  handlePickTask(record.id);
                }}
              >
                <div className="mr-1">
                  <LayoutGridAddSvg size={18} color={`#ffffff`} />
                </div>
                Ambil
              </Buttonsys>
            </>
          ),
        };
      },
    },
  ];

  //HANDLER
  const onFilterTask = () => {
    setloadingtasks(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=1&rows=${queryParams.rows}&sort_by=${queryParams.sort_by}&sort_type=${queryParams.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
        setQueryParams({ page: 1 });
        setloadingtasks(false);
      });
  };
  const onFilterTaskPick = () => {
    setloadingfiltertaskpick(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskPickList?rows=${rowstaskpick}&page=1&keyword=${searchfilterstatetaskpick}&task_type=${tasktypefilterstatetaskpick}&location=${lokasifilterstatetaskpick}&from=${fromdatefilterstatetaskpick}&to=${todatefilterstatetaskpick}&sort_by=${sortstatetaskpick.sort_by}&sort_type=${sortstatetaskpick.sort_type}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setpagetaskpick(1);
        setdatarawtaskpick(res2.data);
        setdatataskpick(res2.data.data);
        setloadingfiltertaskpick(false);
      });
  };
  const handlePickTask = (idtask) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignSelfTask`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(idtask),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setreloadpick((prev) => prev + 1);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });

          rt.push(`/tasks/detail/${idtask}?prevpath=mytask`);
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
    if (viewtaskpick && !isAllowedToGetTaskPickList) {
      permissionWarningNotification("Mendapatkan", "Daftar Task");
    }
  }, [viewtaskpick, isAllowedToGetTaskPickList]);

  useEffect(() => {
    if (!isAllowedToGetUserTasks) {
      permissionWarningNotification("Mendapatkan", "Daftar Task");
    }
  }, [isAllowedToGetUserTasks]);

  // Input field "Semua Tipe Task" data source
  useEffect(() => {
    if (!isAllowedToGetTaskTypes) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTaskTypes?name=${tasktypefilterstate}`,
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
        setdatafiltertipetaskstaskpick(res2.data);
      });
  }, [isAllowedToGetTaskTypes]);

  // Table "Semua Task" data source
  useEffect(() => {
    if (!isAllowedToGetUserTasks) {
      setloadingtasks(false);
      return;
    }

    const fetchData = async () => {
      setloadingtasks(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=${queryParams.page}&rows=${queryParams.rows}&sort_by=${queryParams.sort_by}&sort_type=${queryParams.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    /* drawertaskcreate, */ viewtaskpick,
    isAllowedToGetUserTasks,
    searchstate,
    tasktypefilterstate,
    lokasifilterstate,
    fromdatefilterstate,
    todatefilterstate,
    statusfilterstate,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
  ]);

  // Input "Semua Lokasi" in "Semua Task" and "Open Task" section
  // Tree Dropdown "MappinIconSvg" icon click
  useEffect(() => {
    if (!isAllowedToGetCompanyList) {
      setloadingstatustaskdata(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatafilterlokasi(res2.data.children);
        setdatafilterlokasitaskpick(res2.data.children);
        setstatustaskloc(res2.data.children);
        setttcloc(res2.data.children);

        // setdtloc(res2.data.children)
        setloadingstatustaskdata(false);
      });
  }, [isAllowedToGetCompanyList]);

  // Content "Segera Berakhir" card
  useEffect(() => {
    if (!isAllowedToGetLastTwoTasks) {
      setloadinguserlasttwo(false);
      return;
    }

    setloadingtasks(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserLastTwoTasks`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setuserlasttwo(res2.data);
        setloadinguserlasttwo(false);
      });
  }, [isAllowedToGetLastTwoTasks]);

  // Content "Status Task" card
  useEffect(() => {
    if (!isAllowedToGetTaskStatuses) {
      setloadingstatustaskdata(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setstatustaskdata(res2.data.status_list);
        setloadingstatustaskdata(false);
      });
  }, [isAllowedToGetTaskStatuses]);

  // Content "Tipe Task Terbanyak" card
  useEffect(() => {
    if (!isAllowedToGetTaskCount) {
      setloadingttcdata(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskTypeCounts`, {
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
  }, [isAllowedToGetTaskCount]);

  // Table "Open Task" data source
  useEffect(() => {
    if (!isAllowedToGetTaskPickList) {
      setloadingtaskpick(false);
      return;
    }

    const fetchData = async () => {
      setloadingtaskpick(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskPickList?rows=${rowstaskpick}&page=${pagetaskpick}&keyword=${searchfilterstatetaskpick}&task_type=${tasktypefilterstatetaskpick}&location=${lokasifilterstatetaskpick}&from=${fromdatefilterstatetaskpick}&to=${todatefilterstatetaskpick}&sort_by=${sortstatetaskpick.sort_by}&sort_type=${sortstatetaskpick.sort_type}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setdatarawtaskpick(res2.data);
          setdatataskpick(res2.data.data);
          setloadingtaskpick(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    viewtaskpick,
    reloadpick,
    loadingfiltertaskpick,
    isAllowedToGetTaskPickList,
    rowstaskpick,
    pagetaskpick,
    searchfilterstatetaskpick,
    tasktypefilterstatetaskpick,
    lokasifilterstatetaskpick,
    fromdatefilterstatetaskpick,
    todatefilterstatetaskpick,
    sortstatetaskpick.sort_by,
    sortstatetaskpick.sort_type,
  ]);

  // useEffect(() => {
  //   if (triggertasktypupdate !== -1) {
  //     setidtasktypupdate(triggertasktypupdate);
  //   }
  // }, [triggertasktypupdate]);

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
      prevpath={"mytask"}
    >
      <div className="flex flex-col" id="mainWrapper">
        {viewtaskpick ? (
          <>
            {viewtaskpick && (
              <div className="px-5">
                <div className="flex flex-col shadow-md rounded-lg bg-white p-5 mb-6 mx-3">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex">
                      <div
                        className="mr-2 cursor-pointer"
                        onClick={() => {
                          setviewtaskpick(false);
                        }}
                      >
                        <BackIconSvg size={15} color={`#000000`} />
                      </div>
                      <H1>Open Task</H1>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:flex items-center mb-4 gap-2 lg:gap-x-1">
                    <div className="lg:w-3/12">
                      <Input
                        value={searchfilterstatetaskpick}
                        style={{ width: `100%` }}
                        placeholder="Judul Task.."
                        disabled={!isAllowedToGetTaskPickList}
                        allowClear
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setsearchfilterstatetaskpick("");
                          } else {
                            setsearchfilterstatetaskpick(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div className="lg:w-3/12">
                      <Select
                        value={
                          tasktypefilterstatetaskpick === ""
                            ? null
                            : tasktypefilterstatetaskpick
                        }
                        placeholder="Semua Tipe Task"
                        disabled={
                          !isAllowedToGetTaskTypes ||
                          !isAllowedToGetTaskPickList
                        }
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
                          opt.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        name={`task_type_id`}
                        onChange={(value) => {
                          typeof value === "undefined"
                            ? settasktypefilterstatetaskpick("")
                            : settasktypefilterstatetaskpick(value);
                        }}
                      >
                        {datafiltertipetaskstaskpick.map((doc, idx) => (
                          <Select.Option key={idx} value={doc.id}>
                            {doc.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    <div className="lg:w-3/12">
                      <DatePicker.RangePicker
                        showTime
                        allowEmpty
                        className="datepickerStatus"
                        style={{ width: `100%` }}
                        disabled={!isAllowedToGetTaskPickList}
                        value={
                          fromdatefilterstatetaskpick === ""
                            ? [null, null]
                            : [
                                moment(fromdatefilterstatetaskpick),
                                moment(todatefilterstatetaskpick),
                              ]
                        }
                        onChange={(dates, datestrings) => {
                          setfromdatefilterstatetaskpick(datestrings[0]);
                          settodatefilterstatetaskpick(datestrings[1]);
                        }}
                      />
                    </div>
                    <div className="lg:w-2/12">
                      <TreeSelect
                        style={{ width: `100%` }}
                        allowClear
                        placeholder="Semua Lokasi"
                        disabled={
                          !isAllowedToGetCompanyList ||
                          !isAllowedToGetTaskPickList
                        }
                        showSearch
                        suffixIcon={<SearchOutlined />}
                        showArrow
                        name={`locations_id`}
                        onChange={(value) => {
                          typeof value === "undefined"
                            ? setlokasifilterstatetaskpick("")
                            : setlokasifilterstatetaskpick(value);
                        }}
                        treeData={datafilterlokasitaskpick}
                        treeDefaultExpandAll
                        value={
                          lokasifilterstatetaskpick === ""
                            ? null
                            : lokasifilterstatetaskpick
                        }
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
                    <div className="text-right col-span-2">
                      <Buttonsys
                        type={`primary`}
                        onClick={onFilterTaskPick}
                        disabled={!isAllowedToGetTaskPickList}
                      >
                        <div className="flex space-x-2">
                          <SearchIconSvg size={15} color={`#ffffff`} />
                          <p>Cari</p>
                        </div>
                      </Buttonsys>
                    </div>
                  </div>
                  <div>
                    <TableCustomTaskPick
                      dataSource={datataskpick}
                      setDataSource={setdatataskpick}
                      columns={columnsTaskPick}
                      loading={loadingtaskpick}
                      setpraloading={setloadingtaskpick}
                      pageSize={rowstaskpick}
                      total={datarawtaskpick.total}
                      initProps={initProps}
                      setpage={setpagetaskpick}
                      pagefromsearch={pagetaskpick}
                      setdataraw={setdatarawtaskpick}
                      sortstate={sortstatetaskpick}
                      setsortstate={setsortstatetaskpick}
                      searchstate={searchfilterstatetaskpick}
                      tasktypefilterstate={tasktypefilterstatetaskpick}
                      fromdatefilterstate={fromdatefilterstatetaskpick}
                      todatefilterstate={todatefilterstatetaskpick}
                      lokasifilterstate={lokasifilterstatetaskpick}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-12 px-5 gap-6" id="wrapper1">
            {/* SEGERA BERAKHIR */}
            <div className="col-span-12 lg:col-span-6 flex flex-col shadow-md rounded-md bg-gray-50 p-5">
              {loadinguserlasttwo ? (
                <>
                  <Spin />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <H1>Segera Berakhir</H1>
                    {userlasttwo.length > 0 && (
                      <div className="p-2 rounded bg-red-50 text-state1 text-xs flex">
                        {userlasttwo[0]?.deadline ? (
                          <>
                            <div className="mr-1 flex items-center">
                              <ClockIconSvg size={15} color={`#BF4A40`} />
                            </div>
                            {userlasttwo[0]?.deadline
                              ? moment(userlasttwo[0].deadline)
                                  .locale("id")
                                  .format("lll")
                              : "-"}
                          </>
                        ) : null}
                        {/* {moment(userlasttwo[0].deadline)
                          .locale("id")
                          .format("lll")} */}
                      </div>
                    )}
                  </div>
                  <div className="h-full">
                    {userlasttwo.length === 0 ? (
                      <div className=" flex w-full h-full items-center justify-center">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    ) : (
                      <>
                        {userlasttwo.map(
                          (
                            {
                              id,
                              deadline,
                              time_limit_percentage,
                              name,
                              time_left,
                              status,
                            },
                            index
                          ) => {
                            const isOverdue = status === 1;

                            const cardContainerClassName = clsx(
                              {
                                "bg-white hover:bg-mono90": !isOverdue,
                                "bg-state1 hover:bg-state12 text-white mb-2":
                                  isOverdue,
                              },
                              "rounded transition duration-300 shadow p-5 flex justify-between cursor-pointer block mb-2"
                            );

                            // Saat ini: 100 <= time_limit_percentage <= 0
                            // Menjadi: 0 <= progressPrecentage <= 100
                            const progressPrecentage = Math.max(
                              0,
                              Math.min(Math.round(time_limit_percentage), 100)
                            );

                            let berakhirSentence = "Berakhir %s";
                            if (isValidDate(deadline)) {
                              // Delta hari ini dengan deadline (day) (24 hour inclusive)
                              const isEndedToday =
                                moment(new Date(deadline)).diff(
                                  moment(),
                                  "d"
                                ) === 0;
                              const dueDate = moment(deadline)
                                .locale("id")
                                .format("Do MMM");

                              const replaceWith = isEndedToday
                                ? "Hari Ini"
                                : dueDate;

                              berakhirSentence = berakhirSentence.replace(
                                /%s/g,
                                replaceWith
                              );
                            } else {
                              berakhirSentence = "-";
                            }

                            let timeLeftSentence = `${
                              isOverdue ? "Terlambat" : "Sisa"
                            } ${time_left}`;

                            return (
                              <Link
                                key={index}
                                href={`/tasks/detail/${id}?prevpath=mytask`}
                              >
                                <a className={cardContainerClassName}>
                                  <div className="flex flex-col">
                                    <div>
                                      <ClipboardcheckIconSvg
                                        size={50}
                                        color={
                                          isOverdue ? "#ffffff" : "#35763B"
                                        }
                                      />
                                    </div>
                                    <div className="flex flex-col mt-2">
                                      <Text
                                        color={isOverdue ? "white" : undefined}
                                      >
                                        {berakhirSentence}
                                      </Text>
                                      <Progress
                                        trailColor={
                                          isOverdue ? "#4D4D4D" : "#d8e8da"
                                        }
                                        strokeColor={
                                          isOverdue ? "#ffffff" : "#35763B"
                                        }
                                        percent={progressPrecentage}
                                        showInfo={false}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="flex flex-col text-right text-black">
                                      {isOverdue ? (
                                        <p
                                          className={`font-bold text-xl mb-0 text-white`}
                                        >
                                          {name}
                                        </p>
                                      ) : (
                                        <H1>{name}</H1>
                                      )}
                                      <Label
                                        color={isOverdue ? "white" : undefined}
                                      >
                                        T-000{id}
                                      </Label>
                                    </div>
                                    <div className="flex flex-col mt-4 text-right">
                                      <H2
                                        color={isOverdue ? "white" : "primary"}
                                      >
                                        {timeLeftSentence}
                                      </H2>
                                    </div>
                                  </div>
                                </a>
                              </Link>
                            );
                          }
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* STATUS TASK */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <H1>Status Task</H1>
                <div className="flex items-center">
                  <div className=" dropdown">
                    <div
                      tabIndex={`0`}
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        if (!isAllowedToGetTaskStatuses) {
                          permissionWarningNotification(
                            "Mendapatkan",
                            "Informasi Status Task"
                          );
                          return;
                        }

                        if (canOpenLocationTreeDropdown()) {
                          setstatusloctoggle((prev) => !prev);
                        }
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
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=${statustaskdatestate.from}&to=${statustaskdatestate.to}&location=`,
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
                                setstatustaskdata(res2.data.status_list);
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
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=${statustaskdatestate.from}&to=${statustaskdatestate.to}&location=${nodeData.key}`,
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
                                    setstatustaskdata(res2.data.status_list);
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
                      if (!isAllowedToGetTaskStatuses) {
                        permissionWarningNotification(
                          "Mendapatkan",
                          "Informasi Status Task"
                        );
                        return;
                      }

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
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=${datestrings[0]}&to=${datestrings[1]}&location=${statustasklocstate}`,
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
                          setstatustaskdata(res2.data.status_list);
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
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=&to=&location=${statustasklocstate}`,
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
                                setstatustaskdata(res2.data.status_list);
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
                <>
                  <div className="flex justify-center mb-4">
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
                  <div className="flex flex-col">
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
                </>
              )}
            </div>
            {/* TIPE TASK */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <H1>Tipe Task Terbanyak</H1>
                <div className="flex items-center">
                  <div className="dropdown dropdown-left">
                    <div
                      tabIndex={`1`}
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        if (!isAllowedToGetTaskCount) {
                          permissionWarningNotification(
                            "Mendapatkan",
                            "Informasi Tipe Task Terbanyak"
                          );
                          return;
                        }

                        if (canOpenLocationTreeDropdown()) {
                          setttloctoggle((prev) => !prev);
                        }
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
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskTypeCounts?location=`,
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
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskTypeCounts?location=${nodeData.key}`,
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
                <>
                  <div className="flex justify-center mb-5 h-4/6">
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
                </>
              )}
            </div>
            {/* TABLE DAFTAR TASK */}
            <div className="col-span-12 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 ">
              <div className="flex items-center justify-between mb-4">
                <H1>Semua Task</H1>
              </div>
              <div className="grid grid-cols-3 lg:flex items-center mb-4 gap-2 lg:gap-x-1">
                <div className="lg:w-2/12">
                  <Input
                    value={searchstate}
                    style={{ width: `100%` }}
                    placeholder="Judul atau ID.."
                    disabled={!isAllowedToGetUserTasks}
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
                <div className="lg:w-2/12">
                  <Select
                    value={
                      tasktypefilterstate === "" ? null : tasktypefilterstate
                    }
                    placeholder="Semua Tipe Task"
                    disabled={
                      !isAllowedToGetTaskTypes || !isAllowedToGetUserTasks
                    }
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
                <div className="lg:w-3/12">
                  <DatePicker.RangePicker
                    showTime
                    allowEmpty
                    className="datepickerStatus"
                    style={{ width: `100%` }}
                    disabled={!isAllowedToGetUserTasks}
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
                    }}
                  />
                </div>
                <div className="lg:w-2/12">
                  <TreeSelect
                    style={{ width: `100%` }}
                    allowClear
                    placeholder="Semua Lokasi"
                    disabled={
                      !isAllowedToGetCompanyList || !isAllowedToGetUserTasks
                    }
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
                <div className="lg:w-2/12">
                  <Select
                    style={{ width: `100%` }}
                    value={statusfilterstate === "" ? null : statusfilterstate}
                    placeholder="Semua Status"
                    disabled={!isAllowedToGetUserTasks}
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
                <div className="">
                  <Buttonsys
                    type={`primary`}
                    onClick={onFilterTask}
                    disabled={!isAllowedToGetUserTasks}
                  >
                    <div className="flex space-x-2">
                      <SearchIconSvg size={15} color={`#ffffff`} />
                      <p>Cari</p>
                    </div>
                  </Buttonsys>
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <TableCustomTask
                  dataSource={datatasks}
                  columns={columnsTask}
                  loading={loadingtasks}
                  total={datarawtask.total}
                  prevpath={"mytask"}
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                />
              </div>
              <div className="flex items-center justify-end">
                <div>
                  <Buttonsys
                    type={`primary`}
                    disabled={!canViewOpenTaskSection}
                    onClick={() => {
                      setviewtaskpick(true);
                    }}
                  >
                    <div className="mr-1">
                      <LayoutGridAddSvg size={18} color={`#ffffff`} />
                    </div>
                    Ambil Task Baru
                  </Buttonsys>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
      sidemenu: "202",
    },
  };
}

export default TaskIndex;
