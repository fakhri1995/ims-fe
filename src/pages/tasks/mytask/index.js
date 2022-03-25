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
import {
  AlerttriangleIconSvg,
  BackIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  ClipboardcheckIconSvg,
  ClockIconSvg,
  EditIconSvg,
  LayoutGridAddSvg,
  LocationIconSvg,
  MappinIconSvg,
  SearchIconSvg,
  TrashIconSvg,
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
  pathArr[pathArr.length - 1] = `My Task`;

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
  const [triggertasktypupdate, settriggertasktypupdate] = useState(-1);
  const [idtasktypupdate, setidtasktypupdate] = useState(-1);
  const [drawertasktypupdate, setdrawertasktypupdate] = useState(false);
  //TASK TYPES
  const [searcingtipetask, setsearcingtipetask] = useState("");
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
      sorter: (a, b) => a.id > b.id,
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
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=1&rows=${rowstask}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setpagetask(1);
        setdatarawtask(res2.data);
        setdatatasks(res2.data.data);
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
  }, []);
  useEffect(() => {
    setloadingtasks(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=${pagetask}&rows=${rowstask}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
  }, [drawertaskcreate, viewtaskpick]);
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
        setdatafilterlokasitaskpick(res2.data.children);
        setstatustaskloc(res2.data.children);
        setttcloc(res2.data.children);
        // setdtloc(res2.data.children)
        setloadingstatustaskdata(false);
      });
  }, []);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
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
  }, [viewtaskpick, reloadpick, loadingfiltertaskpick]);
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
                  <div className=" flex items-center mb-4">
                    <div className="mx-1 w-3/12">
                      <Input
                        value={searchfilterstatetaskpick}
                        style={{ width: `100%` }}
                        placeholder="Judul Task.."
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
                    <div className="mx-1 w-2/12">
                      <Select
                        value={
                          tasktypefilterstatetaskpick === ""
                            ? null
                            : tasktypefilterstatetaskpick
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
                    <div className=" w-3/12 mx-1">
                      <DatePicker.RangePicker
                        showTime
                        allowEmpty
                        className="datepickerStatus"
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
                    <div className=" mx-1 w-3/12">
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
                    <div className="mx-1 w-1/12">
                      <Buttonsys type={`primary`} onClick={onFilterTaskPick}>
                        <div className="mr-1">
                          <SearchIconSvg size={15} color={`#ffffff`} />
                        </div>
                        Cari
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
          <div className="grid grid-cols-11 px-5" id="wrapper1">
            {/* SEGERA BERAKHIR */}
            <div className=" col-span-5 flex flex-col shadow-md rounded-md bg-gray-50 p-5 mb-6 mr-3">
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
                  <div className=" h-full">
                    {userlasttwo.length < 1 ? (
                      <div className=" flex w-full h-full items-center justify-center">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    ) : (
                      <>
                        {userlasttwo.length >= 1 && (
                          <div
                            className="rounded bg-state1 hover:bg-state12 transition duration-300 shadow text-white p-5 flex justify-between mb-2 cursor-pointer h-3/6"
                            onClick={() => {
                              rt.push(`/tasks/detail/${userlasttwo[0].id}`);
                            }}
                          >
                            <div className="flex flex-col">
                              <div>
                                <ClipboardcheckIconSvg
                                  size={50}
                                  color={`#ffffff`}
                                />
                              </div>
                              <div className="flex flex-col mt-2">
                                <Text color={`white`}>
                                  Berakhir{" "}
                                  {userlasttwo[0]?.deadline
                                    ? (new Date() -
                                        new Date(userlasttwo[0].deadline)) /
                                        (1000 * 60 * 60 * 24) <
                                      1
                                      ? `Hari Ini`
                                      : `${moment(userlasttwo[0].deadline)
                                          .locale("id")
                                          .format("Do MMM")}`
                                    : "-"}
                                  {/* {(new Date() -
                                    new Date(userlasttwo[0].deadline)) /
                                    (1000 * 60 * 60 * 24) <
                                  1
                                    ? `Hari Ini`
                                    : `${moment(userlasttwo[0].deadline)
                                        .locale("id")
                                        .format("Do MMM")}`} */}
                                </Text>
                                <Progress
                                  trailColor={`#4D4D4D`}
                                  strokeColor={`#ffffff`}
                                  percent={userlasttwo[0].time_limit_percentage}
                                  showInfo={false}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex flex-col text-right">
                                <p
                                  className={`font-bold text-xl mb-0 text-white`}
                                >
                                  {userlasttwo[0].name}
                                </p>
                                <Label>T-000{userlasttwo[0].id}</Label>
                              </div>
                              <div className="flex flex-col mt-4 text-right">
                                <H2 color={`white`}>
                                  Sisa {userlasttwo[0].time_left}
                                </H2>
                              </div>
                            </div>
                          </div>
                        )}
                        {userlasttwo.length >= 2 && (
                          <div
                            className="rounded bg-white hover:bg-mono90 transition duration-300 shadow p-5 flex justify-between cursor-pointer h-3/6"
                            onClick={() => {
                              rt.push(`/tasks/detail/${userlasttwo[1].id}`);
                            }}
                          >
                            <div className="flex flex-col">
                              <div>
                                <ClipboardcheckIconSvg
                                  size={50}
                                  color={`#35763B`}
                                />
                              </div>
                              <div className="flex flex-col mt-2">
                                <Text>
                                  Berakhir{" "}
                                  {userlasttwo[1].deadline
                                    ? (new Date() -
                                        new Date(userlasttwo[1].deadline)) /
                                        (1000 * 60 * 60 * 24) <
                                      1
                                      ? `Hari Ini`
                                      : `${moment(userlasttwo[1].deadline)
                                          .locale("id")
                                          .format("Do MMM")}`
                                    : "-"}
                                  {/* {(new Date() -
                                    new Date(userlasttwo[1].deadline)) /
                                    (1000 * 60 * 60 * 24) <
                                  1
                                    ? `Hari Ini`
                                    : `${moment(userlasttwo[1].deadline)
                                        .locale("id")
                                        .format("Do MMM")}`} */}
                                </Text>
                                <Progress
                                  trailColor={`#d8e8da`}
                                  strokeColor={`#35763B`}
                                  percent={userlasttwo[1].time_limit_percentage}
                                  showInfo={false}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex flex-col text-right">
                                <H1>{userlasttwo[1].name}</H1>
                                <Label>T-000{userlasttwo[1].id}</Label>
                              </div>
                              <div className="flex flex-col mt-4 text-right">
                                <H2 color={`primary`}>
                                  Sisa {userlasttwo[1].time_left}
                                </H2>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* STATUS TASK */}
            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
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
            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
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
            <div className="col-span-11 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
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
              <div className="flex flex-col mb-5">
                <TableCustomTask
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
                  prevpath={"mytask"}
                />
              </div>
              <div className="flex items-center justify-end">
                <div>
                  <Buttonsys
                    type={`primary`}
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
