import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Empty, Input, Select, Spin, TreeSelect } from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  TICKETS_CLIENT_GET,
  TICKETS_EXPORT,
  TICKETS_GET,
  TICKET_ADD,
  TICKET_CLIENT_GET,
  TICKET_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../components/button";
import DrawerTicketCreate from "../../components/drawer/tickets/drawerTicketCreate";
import DrawerTicketExports from "../../components/drawer/tickets/drawerTicketExports";
import {
  AdjusmentsHorizontalIconSvg,
  AlerttriangleIconSvg,
  HistoryIconSvg,
  TableExportIconSvg,
  TicketIconSvg,
} from "../../components/icon";
import st from "../../components/layout-dashboard.module.css";
import Layout from "../../components/layout-dashboardNew";
import { TableCustomTickets } from "../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../components/typography";
import { createKeyPressHandler } from "../../lib/helper";
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

const TicketIndex2 = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  // role === 1 -> internal, role !== 1 -> client
  const isClient = dataProfile.data.role !== 1;

  const isAllowedGetTickets = hasPermission(
    isClient ? TICKETS_CLIENT_GET : TICKETS_GET
  );
  const isAllowedGetTicket = hasPermission(
    isClient ? TICKET_CLIENT_GET : TICKET_GET
  );

  const isAllowedToAddTicket = hasPermission(TICKET_ADD);
  const canCreateNewTicket = isAllowedToAddTicket && isAllowedGetTicket;

  const isAllowedToExportTickets = hasPermission(TICKETS_EXPORT);

  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(
      StringParam,
      /** @type {"name"|"count"} */ "raised_at"
    ),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ "desc"),
  });

  //2.useState
  //2.1.PENYELESAIAN TIKET
  const [dataresolvedtimesticket, setdataresolvedtimesticket] = useState([]);
  const [loadingdataresolvedtimes, setloadingdataresolvedtimes] =
    useState(true);
  //2.2.STATUS TIKET
  const [datastatusticket, setdatastatusticket] = useState([]);
  //2.3.JUMLAH TIKET
  const [datacountsticket, setdatacountsticket] = useState("");
  //2.4.TAMBAH TIKET
  const [drawerticketscreate, setdrawerticketscreate] = useState(false);
  // const [loadingticketscreate, setloadingticketscreate] = useState(false);
  const [refreshcreateticketscreate, setrefreshcreateticketscreate] =
    useState(-1);
  //2.5.EKSPOR TIKET
  const [drawerticketexports, setdrawerticketexports] = useState(false);
  //2.6.TABLE TIKET
  const [datatickets, setdatatickets] = useState([]);
  const [datarawtickets, setdatarawtickets] = useState({
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
  const [dataticketrelation, setdataticketrelation] = useState({
    status_ticket: [
      {
        id: 0,
        name: "",
      },
    ],
    ticket_types: [],
    incident_type: [],
    companies: {
      data: [
        {
          id: 0,
          title: "",
          key: "",
          value: 0,
        },
      ],
    },
    ticket_task_types: [],
    resolved_times: [],
  });
  const [loadingtickets, setloadingtickets] = useState(false);

  //Filter
  // const [datafilterttickets, setdatafilterttickets] = useState([]);
  const [searcingfiltertickets, setsearcingfiltertickets] = useState("");
  const [tickettypefiltertickets, settickettypefiltertickets] = useState("");
  const [fromfiltertickets, setfromfiltertickets] = useState("");
  const [tofiltertickets, settofiltertickets] = useState("");
  const [locfiltertickets, setlocfiltertickets] = useState("");
  const [statusfiltertickets, setstatusfiltertickets] = useState("");

  //3.Columns
  const columnsTickets = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawtickets?.from + index}</>,
        };
      },
    },
    {
      title: "No. Tiket",
      dataIndex: "id",
      render: (text, record, index) => {
        return {
          children: <>{record.full_name}</>,
        };
      },
      sorter: isAllowedGetTickets ? (a, b) => a.id > b.id : false,
    },
    {
      title: "Tipe Tiket",
      dataIndex: "type",
      render: (text, record, index) => {
        return {
          children: <>{record.type_name}</>,
        };
      },
      sorter: isAllowedGetTickets
        ? (a, b) => a.type_name.localeCompare(b.type_name)
        : false,
    },
    {
      title: "Diajukan Oleh",
      dataIndex: "requested_by",
      render: (text, record, index) => {
        return {
          children: <>{record.creator.name}</>,
        };
      },
    },
    {
      title: "Lokasi Problem",
      dataIndex: "location_id",
      render: (text, record, index) => {
        return {
          children: <>{record.ticketable.location.full_location}</>,
        };
      },
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "raised_at",
      render: (text, record, index) => {
        return {
          children: <>{record.raised_at}</>,
        };
      },
      sorter: isAllowedGetTickets
        ? (a, b) => a.raised_at.localeCompare(b.raised_at)
        : false,
      defaultSortOrder: "descend",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {dataProfile.data.role === 1 ? (
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
                  {record.status === 7 && (
                    <div className="rounded-md h-auto px-3 text-center py-1 bg-canceled bg-opacity-10 text-canceled">
                      Canceled
                    </div>
                  )}
                </>
              ) : (
                <>
                  {(record.status === 1 ||
                    record.status === 3 ||
                    record.status === 4) && (
                    <div className="rounded-md h-auto px-3 text-center py-1 bg-onprogress bg-opacity-10 text-onprogress">
                      Dalam Proses
                    </div>
                  )}
                  {record.status === 2 && (
                    <div className="rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">
                      Menunggu Staff
                    </div>
                  )}
                  {record.status === 6 && (
                    <div className="rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">
                      Selesai
                    </div>
                  )}
                  {record.status === 7 && (
                    <div className="rounded-md h-auto px-3 text-center py-1 bg-canceled bg-opacity-10 text-canceled">
                      Dibatalkan
                    </div>
                  )}
                </>
              )}
            </>
          ),
        };
      },
      sorter: isAllowedGetTickets
        ? (a, b) => a?.status_name.localeCompare(b?.status_name)
        : false,
    },
  ];

  //4.Handler
  const onFilterTickets = () => {
    setloadingtickets(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1 ? `getTickets` : `getClientTickets`
      }?page=1&rows=${
        queryParams.rows
      }&ticket_id=${searcingfiltertickets}&type_id=${tickettypefiltertickets}&from=${fromfiltertickets}&to=${tofiltertickets}&location_id=${locfiltertickets}&status_id=${statusfiltertickets}&sort_by=${
        queryParams.sort_by
      }&sort_type=${queryParams.sort_type}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawtickets(res2.data);
        setdatatickets(res2.data.data);
        // setdatafilterttickets(res2.data.data);
        setQueryParams({ page: 1 });
        setloadingtickets(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterTickets, "Enter");

  //5.useEffect
  useEffect(() => {
    if (!isAllowedGetTickets) {
      permissionWarningNotification("Mendapatkan", "Daftar Tiket");

      setloadingdataresolvedtimes(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1
          ? `getTicketStatusCounts`
          : `getClientTicketStatusCounts`
      }`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (dataProfile.data.role === 1) {
          var tempresolvedtimes = [];
          for (var times in res2.data.counts) {
            if (times !== "total_counts") {
              tempresolvedtimes.push({
                counts: res2.data.counts[times].counts,
                percentage: res2.data.counts[times].percentage,
                name: times,
              });
            }
          }
          setdataresolvedtimesticket(tempresolvedtimes);
          setdatacountsticket(res2.data.sum_ticket);
        }
        setdatastatusticket(res2.data.statuses);
        setloadingdataresolvedtimes(false);
      });
  }, [isAllowedGetTickets]);

  useEffect(() => {
    if (!isAllowedGetTickets) {
      setloadingtickets(false);
      return;
    }

    const fetchData = async () => {
      setloadingtickets(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
          dataProfile.data.role === 1 ? `getTickets` : `getClientTickets`
        }?page=${queryParams.page}&rows=${
          queryParams.rows
        }&ticket_id=${searcingfiltertickets}&type_id=${tickettypefiltertickets}&from=${fromfiltertickets}&to=${tofiltertickets}&location_id=${locfiltertickets}&status_id=${statusfiltertickets}&sort_by=${
          queryParams.sort_by
        }&sort_type=${queryParams.sort_type}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setdatarawtickets(res2.data);
          setdatatickets(res2.data.data);
          // setdatafilterttickets(res2.data.data);
          setloadingtickets(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    refreshcreateticketscreate,
    isAllowedGetTickets,
    searcingfiltertickets,
    tickettypefiltertickets,
    fromfiltertickets,
    tofiltertickets,
    locfiltertickets,
    statusfiltertickets,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
  ]);

  useEffect(() => {
    if (!isAllowedGetTicket) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1
          ? "getTicketRelation"
          : "getClientTicketRelation"
      }`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdataticketrelation(res2.data);
      });
  }, [isAllowedGetTicket]);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-2 md:grid-cols-10 px-5">
          {dataProfile.data.role === 1 ? (
            <>
              {/* PENYELESAIAN TIKET */}
              <div className="col-span-2 md:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 md:mx-3">
                <div className="flex items-center justify-between mb-4">
                  <H1>Penyelesaian Tiket</H1>
                </div>
                {loadingdataresolvedtimes ? (
                  <>
                    <Spin />
                  </>
                ) : (
                  <div className=" flex flex-col">
                    {dataresolvedtimesticket.every(
                      (docevery) => docevery.counts === 0
                    ) ? (
                      <div className=" w-full flex items-center justify-center">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    ) : (
                      <div className=" w-full flex justify-center">
                        <Doughnut
                          data={{
                            labels: dataresolvedtimesticket.map(
                              (doc) => doc.name
                            ),
                            datasets: [
                              {
                                data: dataresolvedtimesticket.map(
                                  (doc) => doc.counts
                                ),
                                backgroundColor: [
                                  "#2F80ED",
                                  "#BF4A40",
                                  "#ED962F",
                                  "#E5C471",
                                  "#6AAA70",
                                ],
                                borderColor: [
                                  "#2F80ED",
                                  "#BF4A40",
                                  "#ED962F",
                                  "#E5C471",
                                  "#6AAA70",
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
                    )}
                    <div className="flex flex-col w-full">
                      {dataresolvedtimesticket.map((doc, idx) => {
                        return (
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex">
                              <div
                                className={`w-1 mr-1 ${
                                  doc.name === "three_hours" && `bg-open`
                                } ${
                                  doc.name === "three_to_twelve_hours" &&
                                  `bg-overdue`
                                } ${
                                  doc.name === "twelve_to_thirty_hours" &&
                                  `bg-onprogress`
                                } ${
                                  doc.name === "thirty_hours_to_three_days" &&
                                  `bg-onhold`
                                } ${
                                  doc.name === "three_days" && `bg-completed`
                                }`}
                              ></div>
                              <Text>
                                {doc.name === "three_hours" &&
                                  `Kurang dari 3 jam`}{" "}
                                {doc.name === "three_to_twelve_hours" &&
                                  `3 - 12 jam`}{" "}
                                {doc.name === "twelve_to_thirty_hours" &&
                                  `12 - 30 jam`}{" "}
                                {doc.name === "thirty_hours_to_three_days" &&
                                  `30 jam - 3 hari`}{" "}
                                {doc.name === "three_days" &&
                                  `Lebih dari 3 hari`}
                              </Text>
                            </div>
                            <div className="flex">
                              <H2>{doc.counts}</H2>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {/* STATUS DAN JUMLAH TIKET */}
              {loadingdataresolvedtimes ? (
                <>
                  <Spin />
                </>
              ) : (
                <div className="col-span-2 flex flex-col md:col-span-3 lg:col-span-4 xl:col-span-3 mb-6">
                  <div className=" mb-3 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-0">
                    <div className="col-span-1 shadow-md rounded-md bg-white p-5 flex flex-row justify-between md:mx-2 mb-2 space-x-2 xl:space-x-0">
                      <div>
                        <TicketIconSvg size={30} color={`#BF4A40`} />
                      </div>
                      <div className="flex flex-col">
                        <div className=" flex items-center justify-end">
                          <p className="mb-0 text-overdue font-semibold text-base mr-1">
                            {datastatusticket[0]?.status_count}
                          </p>
                          <div>
                            <AlerttriangleIconSvg size={15} color={`#BF4A40`} />
                          </div>
                        </div>
                        <div className="flex justify-end text-right">
                          <Label>{datastatusticket[0]?.status_name}</Label>
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between md:mx-2 mb-2 space-x-2 xl:space-x-0">
                      <div>
                        <TicketIconSvg size={30} color={`#2F80ED`} />
                      </div>
                      <div className=" flex flex-col">
                        <div className=" flex items-center justify-end">
                          <p className="mb-0 text-open font-semibold text-base mr-1">
                            {datastatusticket[1]?.status_count}
                          </p>
                        </div>
                        <div className="justify-end flex text-right">
                          <Label>{datastatusticket[1]?.status_name}</Label>
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between md:mx-2 my-2 space-x-2 xl:space-x-0">
                      <div>
                        <TicketIconSvg size={30} color={`#ED962F`} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-end">
                          <p className="mb-0 text-onprogress font-semibold text-base mr-1">
                            {datastatusticket[2]?.status_count}
                          </p>
                        </div>
                        <div className="flex justify-end text-right">
                          <Label>{datastatusticket[2]?.status_name}</Label>
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between md:mx-2 my-2 space-x-2 xl:space-x-0">
                      <div>
                        <TicketIconSvg size={30} color={`#E5C471`} />
                      </div>
                      <div className=" flex flex-col">
                        <div className=" flex items-center justify-end">
                          <p className="mb-0 text-onhold font-semibold text-base mr-1">
                            {datastatusticket[3]?.status_count}
                          </p>
                        </div>
                        <div className="flex justify-end text-right">
                          <Label>{datastatusticket[3]?.status_name}</Label>
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between md:mx-2 mt-2 space-x-2 xl:space-x-0">
                      <div>
                        <TicketIconSvg size={30} color={`#808080`} />
                      </div>
                      <div className=" flex flex-col">
                        <div className=" flex items-center justify-end">
                          <p className="mb-0 text-closed font-semibold text-base mr-1">
                            {datastatusticket[4]?.status_count}
                          </p>
                        </div>
                        <div className="flex justify-end  text-right">
                          <Label>{datastatusticket[4]?.status_name}</Label>
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between md:mx-2 mt-2 space-x-2 xl:space-x-0">
                      <div>
                        <TicketIconSvg size={30} color={`#F46780`} />
                      </div>
                      <div className=" flex flex-col">
                        <div className=" flex items-center justify-end">
                          <p className="mb-0 text-canceled font-semibold text-base mr-1">
                            {datastatusticket[5]?.status_count}
                          </p>
                        </div>
                        <div className="flex justify-end text-right">
                          <Label>{datastatusticket[5]?.status_name}</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shadow-md rounded-md bg-white p-5 md:mx-2 flex justify-between items-center h-full">
                    <div>
                      <H1>Total Tiket</H1>
                    </div>
                    <div>
                      <p className=" mb-0 text-5xl font-light text-primary100">
                        {datacountsticket}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-span-2 md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col mb-6">
                {/* BUAT TIKET */}
                <div
                  className="btn-gradient shadow-md rounded-md transition ease-in-out cursor-pointer p-5 md:mx-3 flex items-center mb-2 "
                  onClick={() => {
                    if (!canCreateNewTicket) {
                      permissionWarningNotification("Membuat", "Tiket Baru");
                      return;
                    }
                    setdrawerticketscreate(true);
                  }}
                >
                  <div className="mr-5">
                    <TicketIconSvg size={40} color={`#ffffff`} />
                  </div>
                  <div className=" flex flex-col">
                    <p className=" mb-1 text-lg text-white font-semibold">
                      Buat Tiket
                    </p>
                    <p className=" mb-0 text-sm text-white text-opacity-60">
                      {moment(new Date()).locale("id").format("dddd, LL")}
                    </p>
                  </div>
                </div>
                {/* KELOLA TIKET */}
                <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mt-2 md:mx-3 h-full">
                  <div className="flex flex-col justify-center h-full">
                    <div
                      className=" h-2/6 flex flex-row items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
                      onClick={() => {
                        if (!isAllowedToExportTickets) {
                          permissionWarningNotification(
                            "Melakukan",
                            "Expor Tiket"
                          );
                          return;
                        }

                        setdrawerticketexports(true);
                      }}
                    >
                      <div className="flex p-1 bg-primary10 rounded mr-3">
                        <TableExportIconSvg size={35} color={`#35763B`} />
                      </div>
                      <div className="flex flex-col">
                        <H2>Expor Tiket</H2>
                        <Label>
                          Download daftar tiket dalam bentuk spreadsheet/excel
                        </Label>
                      </div>
                    </div>
                    <div
                      className=" h-2/6 flex flex-row items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
                      onClick={() => {
                        rt.push(`/tickets/histories`);
                      }}
                    >
                      <div className="flex p-1 bg-primary10 rounded mr-3">
                        <HistoryIconSvg size={35} color={`#35763B`} />
                      </div>
                      <div className="flex flex-col">
                        <H2>Riwayat Tiket</H2>
                        <Label>
                          Lihat seluruh tiket yang berstatus closed berikut
                          durasi
                        </Label>
                      </div>
                    </div>
                    <div
                      className=" h-2/6 flex flex-row items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
                      onClick={() => {
                        rt.push(`/tickets/tickettypes`);
                      }}
                    >
                      <div className="flex p-1 bg-primary10 rounded mr-3">
                        <AdjusmentsHorizontalIconSvg
                          size={35}
                          color={`#35763B`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <H2>Atur Tiket</H2>
                        <Label>
                          Hubungkan tiket dengan task yang akan dijalankan
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-2 md:col-span-10 grid grid-cols-4 md:grid-cols-12">
              <div className="col-span-4 md:col-span-8 grid grid-cols-2 md:grid-cols-8 mb-6 gap-2">
                <div className="md:col-span-2 shadow-md rounded-md bg-white items-center lg:items-start p-3 lg:p-5 flex justify-between">
                  <div>
                    <TicketIconSvg size={30} color={`#ED962F`} />
                  </div>
                  <div className=" flex flex-col">
                    <div className=" flex items-center justify-end">
                      <p className="mb-0 text-onprogress font-semibold text-base mr-1">
                        {datastatusticket[0]?.status_count}
                      </p>
                      <div>
                        <AlerttriangleIconSvg size={15} color={`#BF4A40`} />
                      </div>
                    </div>
                    <div className=" justify-end flex text-right">
                      <Label>{datastatusticket[0]?.status_name}</Label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 shadow-md rounded-md bg-white items-center lg:items-start p-3 lg:p-5 flex justify-between">
                  <div>
                    <TicketIconSvg size={30} color={`#2F80ED`} />
                  </div>
                  <div className=" flex flex-col">
                    <div className=" flex items-center justify-end">
                      <p className="mb-0 text-open font-semibold text-base mr-1">
                        {datastatusticket[1]?.status_count}
                      </p>
                    </div>
                    <div className=" justify-end flex text-right">
                      <Label>{datastatusticket[1]?.status_name}</Label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 shadow-md rounded-md bg-white items-center lg:items-start p-3 lg:p-5 flex justify-between">
                  <div>
                    <TicketIconSvg size={30} color={`#808080`} />
                  </div>
                  <div className=" flex flex-col">
                    <div className=" flex items-center justify-end">
                      <p className="mb-0 text-closed font-semibold text-base mr-1">
                        {datastatusticket[2]?.status_count}
                      </p>
                    </div>
                    <div className=" justify-end flex text-right">
                      <Label>{datastatusticket[2]?.status_name}</Label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 shadow-md rounded-md bg-white items-center lg:items-start p-3 lg:p-5 flex justify-between">
                  <div>
                    <TicketIconSvg size={30} color={`#BF4A40`} />
                  </div>
                  <div className=" flex flex-col">
                    <div className=" flex items-center justify-end">
                      <p className="mb-0 text-overdue font-semibold text-base mr-1">
                        {datastatusticket[3]?.status_count}
                      </p>
                    </div>
                    <div className=" justify-end flex text-right">
                      <Label>{datastatusticket[3]?.status_name}</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-span-4 shadow-md rounded-md bg-gradient-to-br from-primary100 to-state4 transition ease-in-out hover:from-primary75 cursor-pointer p-5 md:mx-3 flex items-center mb-6"
                onClick={() => {
                  if (!canCreateNewTicket) {
                    permissionWarningNotification("Membuat", "Tiket Baru");
                    return;
                  }

                  setdrawerticketscreate(true);
                }}
              >
                <div className=" mr-5">
                  <TicketIconSvg size={40} color={`#ffffff`} />
                </div>
                <div className=" flex flex-col">
                  <p className=" mb-1 text-lg text-white font-semibold">
                    Buat Tiket
                  </p>
                  <p className=" mb-0 text-sm text-white text-opacity-60">
                    {moment(new Date()).locale("id").format("dddd, LL")}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* TABLE TIKET */}
          <div className="col-span-2 md:col-span-10 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 md:mx-2">
            <div className="flex items-center justify-between mb-4">
              <H1>Semua Tiket</H1>
            </div>

            {/* Start: Search criteria */}
            <div className="mb-4 grid grid-cols-2 lg:flex gap-2 lg:justify-between">
              {/* Search by keyword (nomor tiket) */}
              <div className="lg:w-2/12">
                <Input
                  value={
                    searcingfiltertickets === "" ? null : searcingfiltertickets
                  }
                  style={{ width: `100%` }}
                  placeholder="Masukkan Nomor Tiket..."
                  allowClear
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setsearcingfiltertickets("");
                    } else {
                      setsearcingfiltertickets(e.target.value);
                    }
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedGetTickets}
                />
              </div>

              {/* Filter by ticket (dropdown) */}
              <div className="lg:w-2/12">
                <Select
                  value={
                    tickettypefiltertickets === ""
                      ? null
                      : tickettypefiltertickets
                  }
                  disabled={!isAllowedToAddTicket || !isAllowedGetTickets}
                  placeholder="Semua Tipe Tiket"
                  style={{ width: `100%` }}
                  allowClear
                  name={`task_type`}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? settickettypefiltertickets("")
                      : settickettypefiltertickets(value);
                  }}
                >
                  {dataticketrelation.ticket_types.map((doc, idx) => (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Filter by date */}
              <div className="lg:w-3/12">
                <DatePicker.RangePicker
                  style={{ width: `100%` }}
                  allowEmpty
                  disabled={!isAllowedGetTickets}
                  className="datepickerStatus"
                  value={
                    fromfiltertickets === ""
                      ? [null, null]
                      : [moment(fromfiltertickets), moment(tofiltertickets)]
                  }
                  onChange={(dates, datestrings) => {
                    setfromfiltertickets(datestrings[0]);
                    settofiltertickets(datestrings[1]);
                  }}
                />
              </div>

              {/* Search by location */}
              <div className="lg:w-2/12">
                <TreeSelect
                  style={{ width: `100%` }}
                  allowClear
                  disabled={!isAllowedGetTicket || !isAllowedGetTickets}
                  placeholder="Semua Lokasi"
                  showSearch
                  suffixIcon={<SearchOutlined />}
                  showArrow
                  name={`locations_id`}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setlocfiltertickets("")
                      : setlocfiltertickets(value);
                  }}
                  treeData={[dataticketrelation.companies]}
                  // treeData={[
                  //   dataProfile.data.role === 1
                  //     ? dataticketrelation.companies
                  //     : dataticketrelation.companies,
                  // ]}
                  treeDefaultExpandAll
                  value={locfiltertickets === "" ? null : locfiltertickets}
                  treeNodeFilterProp="title"
                  filterTreeNode={(search, item) => {
                    /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                    /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                    return (
                      item.title.toLowerCase().indexOf(search.toLowerCase()) >=
                      0
                    );
                  }}
                ></TreeSelect>
              </div>

              {/* Search by status (dropdown) */}
              <div className="lg:w-2/12">
                <Select
                  value={
                    statusfiltertickets === "" ? null : statusfiltertickets
                  }
                  disabled={!isAllowedGetTicket || !isAllowedGetTickets}
                  placeholder="Status"
                  style={{ width: `100%` }}
                  allowClear
                  name={`status`}
                  onChange={(value, option) => {
                    typeof value === "undefined"
                      ? setstatusfiltertickets("")
                      : setstatusfiltertickets(value);
                  }}
                >
                  {dataProfile.data.role === 1
                    ? dataticketrelation.status_ticket.map((doc, idx) => {
                        if (doc.id === 1)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-overdue"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 2)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-open"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 3)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-onprogress"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 4)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-onhold"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 5)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-completed"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 6)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-closed"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                      })
                    : dataticketrelation.status_ticket.map((doc, idx) => {
                        if (doc.id === 1)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-onprogress"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 2)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-open"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 6)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-closed"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 7)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-canceled"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                      })}
                </Select>
              </div>

              <div className="">
                <ButtonSys
                  type={`primary`}
                  onClick={onFilterTickets}
                  disabled={!isAllowedGetTickets}
                >
                  {/* <div className='mr-1'>
                                        <SearchIconSvg size={15} color={`#ffffff`} />
                                    </div> */}
                  Cari
                </ButtonSys>
              </div>
            </div>
            {/* End: Search criteria */}

            <div>
              <TableCustomTickets
                dataSource={datatickets}
                columns={columnsTickets}
                loading={loadingtickets}
                total={datarawtickets?.total}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </div>
          </div>
        </div>
      </div>

      {canCreateNewTicket && (
        <DrawerTicketCreate
          title={"Tiket Baru"}
          visible={drawerticketscreate}
          onClose={() => {
            setdrawerticketscreate(false);
          }}
          buttonOkText={"Simpan"}
          initProps={initProps}
          onvisible={setdrawerticketscreate}
          refreshtickets={refreshcreateticketscreate}
          setrefreshtickets={setrefreshcreateticketscreate}
          dataprofile={dataProfile}
        />
      )}

      <AccessControl hasPermission={TICKETS_EXPORT}>
        {dataProfile.data.role === 1 && (
          <DrawerTicketExports
            title={"Ekspor Tiket"}
            visible={drawerticketexports}
            onClose={() => {
              setdrawerticketexports(false);
            }}
            buttonOkText={"Ekspor Tiket"}
            initProps={initProps}
            onvisible={setdrawerticketexports}
          />
        )}
      </AccessControl>
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

  // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "2",
    },
  };
}

export default TicketIndex2;
