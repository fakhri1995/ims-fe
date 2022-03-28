import { SearchOutlined } from "@ant-design/icons";
import { Empty, Spin, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import InfiniteScroll from "react-infinite-scroll-component";

import { TicketDetailTaskList } from "components/screen/ticket";

import ButtonSys from "../../../components/button";
import DrawerTicketAssign from "../../../components/drawer/tickets/drawerTicketAssign";
import DrawerTicketConnectItem from "../../../components/drawer/tickets/drawerTicketConnectItem";
import DrawerTicketCreate from "../../../components/drawer/tickets/drawerTicketCreate";
import DrawerTicketDeadline from "../../../components/drawer/tickets/drawerTicketDeadline";
import DrawerTicketUpdate from "../../../components/drawer/tickets/drawerTicketUpdate";
import {
  CalendartimeIconSvg,
  CheckIconSvg,
  EditIconSvg,
  FileExportIconSvg,
  FilePlusIconSvg,
  ForbidIconSvg,
  InfoCircleIconSvg,
  PlusIconSvg,
  TicketIconSvg,
  UserIconSvg,
  UserSearchIconSvg,
  XIconSvg,
} from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import {
  ModalCancelTiket,
  ModalNoteTiket,
  ModalReleaseItemTiket,
} from "../../../components/modal/modalCustom";
import { TableCustomTickets } from "../../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../../components/typography";
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

const TicketDetail = ({ dataProfile, sidemenu, initProps, ticketid }) => {
  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(1, 2);
  pathArr.push(`Detail Tiket`);

  //2.useState
  //2.1 General
  const [displaydata, setdisplaydata] = useState({
    id: null,
    ticketable_id: null,
    task_id: null,
    closed_at: null,
    resolved_times: "",
    status: null,
    name: "",
    creator_name: "",
    creator_location: "",
    raised_at: "",
    assignment_type: "",
    assignment_operator_id: null,
    assignment_operator_name: "",
    assignment_profile_image: "",
    deadline: null,
    status_name: "",
    ticketable: {
      id: null,
      product_type: null,
      product_id: "",
      pic_name: "",
      pic_contact: "",
      location_id: null,
      inventory_id: null,
      problem: "",
      incident_time: "",
      files: [],
      description: "",
      deleted_at: null,
      asset_type_name: "",
      location: {
        id: null,
        name: "",
        full_location: "",
      },
      asset_type: {
        id: null,
        task_type_id: null,
        ticket_type_id: null,
        name: "",
        description: "",
        deleted_at: null,
      },
      inventory: null,
    },
  });
  const [dataticketrelation, setdatatickrelation] = useState({
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
  const [praloading, setpraloading] = useState(true);
  //2.2.Update
  const [datapayloadupdate, setdatapayloadupdate] = useState({
    id: Number(ticketid),
    requester_id: null,
    raised_at: null,
    closed_at: null,
    product_id: "",
    pic_name: "",
    pic_contact: "",
    location_id: null,
    problem: "",
    incident_time: null,
    files: [],
    description: "",
  });
  const [drawerupdateticket, setdrawerupdateticket] = useState(false);
  const [refreshclosedupdateticket, setrefreshclosedupdateticket] =
    useState(-1);
  const [refreshupdateticket, setrefreshupdateticket] = useState(-1);
  const [disabledupdate, setdisabledupdate] = useState(false);
  //2.3.Hubungkan Item
  const [datapayloadconnectitem, setdatapayloadconnectitem] = useState({
    id: Number(ticketid),
    inventory_id: null,
    name: "",
  });
  const [selectedassettype, setselectedassettype] = useState(null);
  const [drawerconnectitemticket, setdrawerconnectitemticket] = useState(false);
  const [modalreleaseitemticket, setmodalreleaseitemticket] = useState(false);
  const [loadingreleaseitemticket, setloadingreleaseitemticket] =
    useState(false);
  const [refreshclosedconnectitemticket, setrefreshclosedconnectitemticket] =
    useState(-1);
  const [refreshconnectitemticket, setrefreshconnectitemticket] = useState(-1);
  //2.4.Assign Item
  const [datapayloadassign, setdatapayloadassign] = useState({
    id: Number(ticketid),
    assignable_type: true,
    assignable_id: null,
  });
  const [drawerassignticket, setdrawerassignticket] = useState(false);
  const [refreshclosedassignticket, setrefreshclosedassignticket] =
    useState(-1);
  const [refreshassignticket, setrefreshassignticket] = useState(-1);
  //2.5.Deadline
  const [datapayloaddeadline, setdatapayloaddeadline] = useState({
    id: Number(ticketid),
    deadline: null,
  });
  const [drawerdeadlineicket, setdrawedeadlineticket] = useState(false);
  const [refreshcloseddeadlineticket, setrefreshcloseddeadlineticket] =
    useState(-1);
  const [refreshdeadlineicket, setrefreshdeadlineicket] = useState(-1);
  const [showdatepicker, setshowdatepicker] = useState(false);
  const [datevalue, setdatevalue] = useState(null);
  //2.6.Status(Batalkan Tiket)
  const [modalcancelticket, setmodalcancelticket] = useState(false);
  const [datacancelticket, setdatacancelticket] = useState({
    id: Number(ticketid),
    notes: "",
    name: "",
  });
  const [loadingcancelticket, setloadingcancelticket] = useState(false);
  const [refreshcancelticket, setrefreshcancelticket] = useState(-1);
  //2.7.Note
  const [displaynoteticket, setdisplaynoteticket] = useState([]);
  const [datanoteticket, setdatanoteticket] = useState({
    id: Number(ticketid),
    notes: "",
  });
  const [modalnoteticket, setmodalnoteticket] = useState(false);
  const [loadingnoteticket, setloadingnoteticket] = useState(false);
  const [refreshnoteticket, setrefreshnoteticket] = useState(-1);
  //2.8.Activity Log
  const [displaylogticket, setdisplaylogticket] = useState([]);
  const [praloadinglogticket, setpraloadinglogticket] = useState(true);
  //2.9 Export
  const [loadingexportticket, setloadingexportticket] = useState(false);

  //3.Handler
  const handleNoteTicket = () => {
    setloadingnoteticket(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1 ? "addNoteTicket" : "clientAddNoteTicket"
      }`,
      {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datanoteticket),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setloadingnoteticket(false);
        setmodalnoteticket(false);
        if (res2.success) {
          setdatanoteticket({ id: Number(ticketid), notes: "" });
          setrefreshnoteticket((prev) => prev + 1);
          notification["success"]({
            message: "Note berhasil ditambahkan",
            duration: 3,
          });
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleCancelTicket = () => {
    setloadingcancelticket(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1 ? `cancelTicket` : `cancelClientTicket`
      }`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datacancelticket),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setloadingcancelticket(false);
        setmodalcancelticket(false);
        if (res2.success) {
          setdatacancelticket({ id: Number(ticketid), notes: "" });
          setrefreshcancelticket((prev) => prev + 1);
          notification["success"]({
            message: "Tiket berhasil dibatalkan",
            duration: 3,
          });
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleReleaseItemTicket = () => {
    setloadingreleaseitemticket(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setItemTicket`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...datapayloadconnectitem,
        inventory_id: null,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingreleaseitemticket(false);
        setmodalreleaseitemticket(false);
        if (res2.success) {
          setdatapayloadconnectitem({
            id: Number(ticketid),
            inventory_id: null,
            name: "",
          });
          setrefreshconnectitemticket((prev) => prev + 1);
          notification["success"]({
            message: "Tiket berhasil dibatalkan",
            duration: 3,
          });
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //4.useEffect
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1 ? "getTicket" : "getClientTicket"
      }?id=${ticketid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdisplaydata(res2.data);
        setdatapayloadupdate({
          ...datapayloadupdate,
          requester_id: res2.data.creator_id,
          raised_at: moment(res2.data.raised_at).locale("id").format(),
          closed_at:
            res2.data.closed_at === null
              ? null
              : moment(res2.data.closed_at).locale("id").format(),
          product_id: res2.data.ticketable.product_id,
          pic_name: res2.data.ticketable.pic_name,
          pic_contact: res2.data.ticketable.pic_contact,
          location_id: res2.data.ticketable.location_id,
          problem: res2.data.ticketable.problem,
          incident_time:
            res2.data.ticketable.original_incident_time === null
              ? null
              : moment(res2.data.ticketable.original_incident_time)
                  .locale("id")
                  .format(),
          files: res2.data.ticketable.files,
          description: res2.data.ticketable.description,
        });
        setdisabledupdate(false);
        res2.data.assignment_operator_id === 0
          ? setdatapayloadassign({
              id: Number(ticketid),
              assignable_type: true,
              assignable_id: null,
            })
          : setdatapayloadassign({
              ...datapayloadassign,
              assignable_type:
                res2.data.assignment_type === "Engineer" ? true : false,
              assignable_id: res2.data.assignment_operator_id,
            });
        res2.data.ticketable.inventory === null
          ? setselectedassettype(null)
          : (setdatapayloadconnectitem({
              id: Number(ticketid),
              inventory_id: res2.data.ticketable.inventory.id,
              name: res2.data.ticketable.inventory.mig_id,
            }),
            setselectedassettype(
              res2.data.ticketable.inventory.model_inventory.asset_id
            ));
        setdatapayloaddeadline({
          id: Number(ticketid),
          deadline: res2.data.deadline === "-" ? null : res2.data.deadline,
        });
        res2.data.deadline === "-"
          ? setshowdatepicker(false)
          : setshowdatepicker(true);
        res2.data.deadline === "-" ? setdatevalue(null) : setdatevalue(-10);
        setdatacancelticket({ ...datacancelticket, name: res2.data.name });
      })
      .then(() => {
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
            setdatatickrelation(res2.data);
            setpraloading(false);
          });
      });
  }, [
    refreshconnectitemticket,
    refreshassignticket,
    refreshdeadlineicket,
    refreshcancelticket,
    refreshupdateticket,
    refreshclosedupdateticket,
    refreshclosedconnectitemticket,
    refreshclosedassignticket,
    refreshcloseddeadlineticket,
  ]);
  useEffect(() => {
    setpraloadinglogticket(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
        dataProfile.data.role === 1 ? "getTicketLog" : "getClientTicketLog"
      }?id=${ticketid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdisplaylogticket(res2.data.normal_logs);
        setdisplaynoteticket(
          res2.data.special_logs.filter(
            (note) => note.log_name === "Note Khusus"
          )
        );
        setpraloadinglogticket(false);
      });
  }, [
    refreshnoteticket,
    refreshupdateticket,
    refreshconnectitemticket,
    refreshassignticket,
    refreshdeadlineicket,
  ]);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className=" flex flex-col">
        <div className=" grid grid-cols-11 px-5">
          <div className=" col-span-3 flex flex-col">
            {/* Informasi Umum Tiket */}
            <div className=" flex flex-col mb-2 mr-2 shadow-md rounded-md bg-white p-5">
              <div className=" flex flex-col mb-4">
                <div className=" flex items-center justify-center mb-2">
                  <div className="mr-2">
                    <TicketIconSvg size={30} color={`#000000`} />
                  </div>
                  <div>
                    <H1>{displaydata.name}</H1>
                  </div>
                </div>
                <div className=" flex items-center justify-center mb-4">
                  {praloading ? null : (
                    <div>
                      <Label>
                        {
                          dataticketrelation.ticket_types.filter(
                            (type) =>
                              type.id === displaydata.ticketable.product_type
                          )[0]?.name
                        }
                      </Label>
                    </div>
                  )}
                </div>
                <div className=" flex justify-center items-center">
                  {dataProfile.data.role === 1 ? (
                    praloading ? null : (
                      <ButtonSys
                        type={`default`}
                        onClick={() => {
                          setdrawerupdateticket(true);
                        }}
                      >
                        <div className=" mr-1">
                          <EditIconSvg size={15} color={`#35763B`} />
                        </div>
                        Ubah Tiket
                      </ButtonSys>
                    )
                  ) : null}
                </div>
              </div>
              {praloading ? (
                <div className=" flex justify-center">
                  <Spin />
                </div>
              ) : (
                <div className=" flex flex-col">
                  <div className=" flex flex-col mb-5">
                    <Label>Diajukan Oleh:</Label>
                    <p className=" mb-0 text-gray-600">
                      {displaydata.creator_name}
                    </p>
                  </div>
                  <div className=" flex flex-col mb-5">
                    <Label>Lokasi:</Label>
                    <p className=" mb-0 text-gray-600">
                      {displaydata.creator_location}
                    </p>
                  </div>
                  <div className=" flex flex-col mb-5">
                    <Label>Tanggal Diajukan:</Label>
                    <p className=" mb-0 text-gray-600">
                      {!displaydata.raised_at
                        ? "-"
                        : moment(displaydata.raised_at)
                            .locale("id")
                            .format("LL")}
                    </p>
                  </div>
                  <div className=" flex flex-col mb-5">
                    <Label>Tanggal Selesai:</Label>
                    <p className=" mb-0 text-gray-600">
                      {displaydata.closed_at === null
                        ? `-`
                        : moment(displaydata.closed_at)
                            .locale("id")
                            .format("LL")}
                    </p>
                  </div>
                  <div className=" flex flex-col mb-5">
                    <Label>Durasi Penyelesaian:</Label>
                    <p className=" mb-0 text-gray-600">
                      {displaydata.resolved_times}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* INFORMASI DETAIL TIKET */}
            <div className="flex flex-col my-2 mr-2 shadow-md rounded-md bg-white p-5">
              <div className=" mb-7">
                <H1>Detail Masalah</H1>
              </div>
              <div className=" flex flex-col mb-5">
                <Label>Tipe Aset:</Label>
                <p className=" mb-0 text-gray-600">
                  {displaydata.ticketable.asset_type_name}
                </p>
              </div>
              <div className=" flex flex-col mb-5">
                <Label>Terminal ID:</Label>
                <p className=" mb-0 text-gray-600">
                  {displaydata.ticketable.product_id}
                </p>
              </div>
              <div className=" flex flex-col mb-5">
                <Label>PIC:</Label>
                <p className=" mb-0 text-gray-600">
                  {displaydata.ticketable.pic_name === ""
                    ? `-`
                    : displaydata.ticketable.pic_name}{" "}
                  / {displaydata.ticketable.pic_contact}
                </p>
              </div>
              <div className=" flex flex-col mb-5">
                <Label>Waktu Kejadian:</Label>
                <p className=" mb-0 text-gray-600">
                  {displaydata.ticketable.incident_time}
                </p>
              </div>
              <div className=" flex flex-col mb-5">
                <Label>Lokasi Masalah:</Label>
                <p className=" mb-0 text-gray-600">
                  {displaydata.ticketable.location.full_location}
                </p>
              </div>
              <div className=" flex flex-col mb-5">
                <Label>Deskripsi Kerusakan:</Label>
                <p className=" mb-0 text-gray-600">
                  {displaydata.ticketable.description}
                </p>
              </div>
            </div>
            {/* BUKTI KEJADIAN TIKET */}
            <div className="flex flex-col my-2 mr-2 shadow-md rounded-md bg-white p-5">
              <div className=" mb-7">
                <H1>Bukti Kejadian</H1>
              </div>
              {displaydata.ticketable.files?.length === 0 ? (
                <>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </>
              ) : (
                <div className=" grid grid-cols-2">
                  {displaydata.ticketable.files?.map((doc, idx) => (
                    <a target={`_blank`} href={doc}>
                      <div className=" col-span-1 mx-1 flex flex-col items-center mb-2 cursor-pointer">
                        <img
                          src={doc}
                          className=" object-contain mb-1 h-28 w-full"
                          alt=""
                        />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* EKSPOR TIKET */}
            <div className="flex items-center justify-center mb-2 mr-2 shadow-md rounded-md bg-white p-5">
              {loadingexportticket ? (
                <>
                  <Spin />
                </>
              ) : (
                <div>
                  <ButtonSys
                    type={`default`}
                    onClick={() => {
                      setloadingexportticket(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
                          dataProfile.data.role === 1
                            ? `ticketExport`
                            : `clientTicketExport`
                        }?id=${ticketid}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.blob())
                        .then((res2) => {
                          var newBlob = new Blob([res2], {
                            type: "application/pdf",
                          });
                          const data = window.URL.createObjectURL(newBlob);
                          var link = document.createElement("a");
                          link.href = data;
                          link.download = `${displaydata.name}.pdf`;
                          link.click();
                          setTimeout(function () {
                            window.URL.revokeObjectURL(data);
                          });
                          setloadingexportticket(false);
                        });
                    }}
                  >
                    <div className=" mr-1">
                      <FileExportIconSvg size={15} color={`#35763B`} />
                    </div>
                    Ekspor Tiket
                  </ButtonSys>
                </div>
              )}
            </div>
          </div>
          <div className=" col-span-8 flex flex-col">
            {/* STATUS ASSIGN DEADLINE TIKET */}
            <div className=" w-full flex justify-between mb-2 ml-2 shadow-md rounded-md bg-white p-5">
              <div className=" w-1/2 pr-8 flex items-center justify-between mb-2">
                <div className=" flex flex-col">
                  <div className="mb-2">
                    <Label>Status</Label>
                  </div>
                  <div className=" flex items-center">
                    <div className=" mr-2">
                      <CheckIconSvg size={25} color={`#35763B`} />
                    </div>
                    <p className=" mb-0 text-base font-bold">
                      {displaydata.status_name}
                    </p>
                  </div>
                </div>
                {displaydata.status !== 7 && (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={`1`}
                      className=" h-full flex justify-end items-start cursor-pointer text-lg font-bold"
                    >
                      <span className="mb-0">...</span>
                    </div>
                    <div
                      tabIndex={`1`}
                      className=" menu dropdown-content bg-backdrop p-3"
                    >
                      <div
                        className=" p-3 w-52 flex items-center bg-white rounded shadow hover:bg-red-100 text-overdue cursor-pointer"
                        onClick={() => {
                          setmodalcancelticket(true);
                        }}
                      >
                        <div className="mr-2">
                          <XIconSvg size={15} color={`#BF4A40`} />
                        </div>
                        <p className=" mb-0">Batalkan Tiket</p>
                      </div>
                    </div>
                  </div>
                )}
                <ModalCancelTiket
                  title={"Pembatalan Tiket"}
                  visible={modalcancelticket}
                  onvisible={setmodalcancelticket}
                  onCancel={() => {
                    setmodalcancelticket(false);
                  }}
                  loading={loadingcancelticket}
                  onOk={handleCancelTicket}
                  data={datacancelticket}
                  setdata={setdatacancelticket}
                  ticketid={ticketid}
                />
              </div>
              {/* <div className=" w-4/12 px-8 flex items-center justify-between mb-2 bg-red-400">
                <div className=" flex flex-col">
                  <div className="mb-2">
                    <Label>
                      {dataProfile.data.role === 1
                        ? displaydata.assignment_type
                        : `Engineer/Grup`}
                    </Label>
                  </div>
                  {praloading ? (
                    <>
                      <Spin />
                    </>
                  ) : displaydata.assignment_operator_id === 0 ? (
                    dataProfile.data.role === 1 ? (
                      <button
                        className="btn btn-sm text-white bg-state2 border-state2 hover:bg-onhold hover:border-onhold px-6 py-0"
                        onClick={() => {
                          setdrawerassignticket(true);
                        }}>
                        <div className="mr-1">
                          <FilePlusIconSvg size={15} color={`#ffffff`} />
                        </div>
                        Assign Engineer
                      </button>
                    ) : (
                      <div className="flex items-center">
                        <div className="mr-1 mb-1">
                          <ForbidIconSvg size={15} color={`#CCCCCC`} />
                        </div>
                        <Label>Belum di-assign</Label>
                      </div>
                    )
                  ) : (
                    <div className=" flex items-center">
                      <div className=" flex items-center">
                        {displaydata.assignment_type === "Engineer" ? (
                          <div className=" w-8 h-8 rounded-full mr-2">
                            <img
                              src={
                                displaydata.assignment_profile_image === "" ||
                                displaydata.assignment_profile_image === "-"
                                  ? "/image/staffTask.png"
                                  : `${displaydata.assignment_profile_image}`
                              }
                              className=" object-contain w-10 h-10"
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className=" mr-2">
                            <UserIconSvg />
                          </div>
                        )}
                      </div>
                      <p className=" mb-0 text-base font-bold">
                        {displaydata.assignment_operator_name}
                      </p>
                    </div>
                  )}
                </div>
                {dataProfile.data.role === 1 ? (
                  praloading ? null : displaydata.status !== 7 ? (
                    displaydata.assignment_operator_id === 0 ? null : (
                      <div
                        className=" h-full flex justify-end items-start cursor-pointer"
                        onClick={() => {
                          setdrawerassignticket(true);
                        }}>
                        <UserSearchIconSvg size={18} color={`#4D4D4D`} />
                      </div>
                    )
                  ) : null
                ) : null}
              </div> */}
              <div className=" w-1/2 pl-8 flex items-center justify-between mb-2">
                <div className=" flex flex-col">
                  <div className=" mb-2">
                    <Label>Deadline</Label>
                  </div>
                  {praloading ? (
                    <>
                      <Spin />
                    </>
                  ) : displaydata.deadline === "-" ? (
                    dataProfile.data.role === 1 ? (
                      <button
                        className=" btn btn-sm text-white bg-state2 border-state2 hover:bg-onhold hover:border-onhold px-6 py-0"
                        onClick={() => {
                          setdrawedeadlineticket(true);
                        }}
                      >
                        <div className="mr-1">
                          <CalendartimeIconSvg size={15} color={`#ffffff`} />
                        </div>
                        Tentukan Deadline
                      </button>
                    ) : (
                      <div className="flex items-center">
                        <div className="mr-1 mb-1">
                          <ForbidIconSvg size={15} color={`#CCCCCC`} />
                        </div>
                        <Label>Belum ada deadline</Label>
                      </div>
                    )
                  ) : (
                    <div className=" flex items-center">
                      <p className=" mb-0 text-base font-bold">
                        {displaydata.deadline}
                      </p>
                    </div>
                  )}
                </div>
                {dataProfile.data.role === 1 ? (
                  praloading ? null : displaydata.status !== 7 ? (
                    displaydata.deadline === "-" ? null : (
                      <div
                        className=" h-full flex justify-end items-start cursor-pointer"
                        onClick={() => {
                          setdrawedeadlineticket(true);
                        }}
                      >
                        <CalendartimeIconSvg size={18} color={`#4D4D4D`} />
                      </div>
                    )
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-6/12 mx-2 flex flex-col">
                {/* Task */}
                {dataProfile.data.role === 1 && (
                  <div className="my-2">
                    <TicketDetailTaskList
                      ticketId={displaydata.id}
                      ticketName={displaydata.name}
                    />
                  </div>
                )}

                {/* DETAIL ASET TIKET */}
                {dataProfile.data.role === 1 ? (
                  <div className=" flex w-full flex-col mt-2 shadow-md rounded-md bg-white p-5">
                    <div className=" flex items-center justify-between mb-5">
                      <H1>Detail Aset</H1>
                      {displaydata.ticketable.inventory === null ? null : (
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={`2`}
                            className=" h-full flex justify-end items-start cursor-pointer text-lg font-bold"
                          >
                            <span className="mb-0">...</span>
                          </div>
                          <div
                            tabIndex={`2`}
                            className=" menu dropdown-content bg-backdrop p-3"
                          >
                            <div
                              className=" p-3 w-52 mb-4 flex items-center bg-white rounded shadow hover:bg-primary25 text-primary100 cursor-pointer"
                              onClick={() => {
                                setdrawerconnectitemticket(true);
                              }}
                            >
                              <p className=" mb-0">Ganti Aset</p>
                            </div>
                            <div
                              className=" p-3 w-52 flex items-center bg-white rounded shadow hover:bg-primary25 text-primary100 cursor-pointer"
                              onClick={() => {
                                setmodalreleaseitemticket(true);
                              }}
                            >
                              <p className=" mb-0">Pisah Aset</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <ModalReleaseItemTiket
                        title={"Pemisahan Item dengan Tiket"}
                        visible={modalreleaseitemticket}
                        onvisible={setmodalreleaseitemticket}
                        onCancel={() => {
                          setmodalreleaseitemticket(false);
                        }}
                        loading={loadingreleaseitemticket}
                        onOk={handleReleaseItemTicket}
                        data={datapayloadconnectitem}
                        setdata={setdatapayloadconnectitem}
                        ticketid={ticketid}
                      />
                    </div>
                    {displaydata.ticketable.inventory === null ? (
                      <>
                        <div className=" flex flex-col justify-center items-center mb-5">
                          <div className="w-52 h-52 mb-2">
                            <img
                              src="/image/emptyAssetTicket.png"
                              className=" object-contain"
                              alt=""
                            />
                          </div>
                          <div className=" w-8/12 text-center">
                            <p className=" mb-0 text-gray-400">
                              Belum ada aset terhubung. Silakan hubungkan aset.
                            </p>
                          </div>
                        </div>
                        <div className=" flex justify-center mb-5">
                          <ButtonSys
                            type={`primary`}
                            onClick={() => {
                              setdrawerconnectitemticket(true);
                            }}
                          >
                            + Hubungkan Aset
                          </ButtonSys>
                        </div>
                      </>
                    ) : (
                      <div className=" flex flex-col">
                        {displaydata.status === 6 && (
                          <div className=" flex bg-primary100 text-white rounded-md p-4 w-full mb-5">
                            <div className=" flex items-center justify-center h-full mr-2">
                              <InfoCircleIconSvg size={20} color={`#ffffff`} />
                            </div>
                            <p className=" mb-0">
                              Berikut tampilan detail item yang di-closed pada
                              tanggal{" "}
                              <strong>
                                {displaydata.closed_at === null
                                  ? `-`
                                  : displaydata.closed_at}
                              </strong>
                            </p>
                          </div>
                        )}
                        <div className="mb-8 flex flex-col items-center">
                          <H1>
                            {
                              displaydata.ticketable?.inventory?.model_inventory
                                ?.name
                            }
                          </H1>
                          <Label>
                            {displaydata.ticketable?.inventory?.mig_id}
                          </Label>
                        </div>
                        <div className=" flex flex-col mb-5">
                          <Label>Tipe Aset:</Label>
                          <p className=" mb-0 text-gray-600">
                            {
                              displaydata.ticketable?.inventory?.model_inventory
                                ?.asset?.full_name
                            }
                          </p>
                        </div>
                        <div className=" flex flex-col mb-5">
                          <Label>No Seri:</Label>
                          <p className=" mb-0 text-gray-600">
                            {displaydata.ticketable?.inventory
                              ?.serial_number === null
                              ? `-`
                              : displaydata.ticketable?.inventory
                                  ?.serial_number}
                          </p>
                        </div>
                        <div className=" flex flex-col mb-5">
                          <Label>Status Pemakaian:</Label>
                          <div>
                            {displaydata.ticketable.inventory.status_usage
                              .id === 1 && (
                              <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">
                                In Used
                              </div>
                            )}
                            {displaydata.ticketable.inventory.status_usage
                              .id === 2 && (
                              <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">
                                In Stock
                              </div>
                            )}
                            {displaydata.ticketable.inventory.status_usage
                              .id === 3 && (
                              <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">
                                Replacement
                              </div>
                            )}
                          </div>
                        </div>
                        <div className=" flex flex-col mb-5">
                          <Label>Kondisi Aset:</Label>
                          <div>
                            {displaydata.ticketable.inventory.status_condition
                              .id === 1 && (
                              <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">
                                Good
                              </div>
                            )}
                            {displaydata.ticketable.inventory.status_condition
                              .id === 2 && (
                              <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">
                                Gray
                              </div>
                            )}
                            {displaydata.ticketable.inventory.status_condition
                              .id === 3 && (
                              <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">
                                Bad
                              </div>
                            )}
                          </div>
                        </div>
                        <div className=" flex flex-col mb-5">
                          <Label>Lokasi Item:</Label>
                          <p className=" mb-0 text-gray-600">
                            {displaydata.ticketable?.inventory?.location ===
                            null
                              ? `-`
                              : displaydata.ticketable?.inventory?.location}
                          </p>
                        </div>
                        <hr />
                        {displaydata.ticketable.inventory.additional_attributes.map(
                          (doccolumns, idxcolumns) => {
                            return (
                              <div
                                key={idxcolumns}
                                className={`flex flex-col mb-5 ${
                                  idxcolumns === 0 ? `mt-5` : ``
                                }`}
                              >
                                <Label>{doccolumns.name}:</Label>
                                <p className="mb-0 text-sm">
                                  {doccolumns.data_type === "dropdown" ||
                                  doccolumns.data_type === "checkbox" ||
                                  doccolumns.data_type === "date" ? (
                                    <>
                                      {doccolumns.data_type === "dropdown" && (
                                        <>
                                          {
                                            doccolumns.value.opsi[
                                              doccolumns.value.default
                                            ]
                                          }
                                        </>
                                      )}
                                      {doccolumns.data_type === "checkbox" && (
                                        <>
                                          {doccolumns.value.opsi
                                            .filter((_, idxfil) => {
                                              return doccolumns.value.default.includes(
                                                idxfil
                                              );
                                            })
                                            .join(", ")}
                                        </>
                                      )}
                                      {doccolumns.data_type === "date" && (
                                        <>
                                          {moment(doccolumns.value)
                                            .locale("id")
                                            .format("LL")}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <p className=" mb-0 text-gray-600">
                                      {doccolumns.value}
                                    </p>
                                  )}
                                </p>
                              </div>
                            );
                          }
                        )}
                        <div className=" flex flex-col mb-5">
                          <Label>Deskripsi:</Label>
                          <p className=" mb-0 text-gray-600">
                            {displaydata.ticketable?.inventory?.deskripsi ===
                            null
                              ? `-`
                              : displaydata.ticketable?.inventory?.deskripsi}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className=" shadow-md rounded-md bg-white p-5 my-2 ml-2">
                    <div className=" flex items-center justify-between mb-5">
                      <H1>Catatan</H1>
                      <div
                        className=" h-full flex justify-end items-start cursor-pointer"
                        onClick={() => {
                          setmodalnoteticket(true);
                        }}
                      >
                        <PlusIconSvg size={25} color={`#35763B`} />
                      </div>
                    </div>
                    {loadingnoteticket ? (
                      <>
                        <Spin />
                      </>
                    ) : displaynoteticket.length === 0 ? (
                      <>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </>
                    ) : (
                      displaynoteticket.map((note, idx) => (
                        <div className=" flex flex-col mb-5">
                          <p className=" mb-3 line-clamp-6 font-light">
                            {note.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className=" flex">
                              <div className=" w-5 h-5 rounded-full mr-2">
                                <img
                                  src={"/image/staffTask.png"}
                                  className=" object-contain w-5 h-5"
                                  alt=""
                                />
                              </div>
                              <Text color={`green`}>{note.causer.name}</Text>
                            </div>
                            <div>
                              <Label>
                                {moment(note.created_at)
                                  .locale("id")
                                  .format("LL, LT")}
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-6/12">
                {/* CATATAN TIKET */}
                {dataProfile.data.role === 1 && (
                  <div className=" shadow-md rounded-md bg-white p-5 my-2 ml-2">
                    <div className=" flex items-center justify-between mb-5">
                      <H1>Catatan</H1>
                      <div
                        className=" h-full flex justify-end items-start cursor-pointer"
                        onClick={() => {
                          setmodalnoteticket(true);
                        }}
                      >
                        <PlusIconSvg size={25} color={`#35763B`} />
                      </div>
                    </div>
                    {loadingnoteticket ? (
                      <>
                        <Spin />
                      </>
                    ) : displaynoteticket.length === 0 ? (
                      <>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </>
                    ) : (
                      displaynoteticket.map((note, idx) => (
                        <div className=" flex flex-col mb-5">
                          <p className=" mb-3 line-clamp-6 font-light">
                            {note.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className=" flex">
                              <div className=" w-5 h-5 rounded-full mr-2">
                                <img
                                  src={"/image/staffTask.png"}
                                  className=" object-contain w-5 h-5"
                                  alt=""
                                />
                              </div>
                              <Text color={`green`}>{note.causer.name}</Text>
                            </div>
                            <div>
                              <Label>
                                {moment(note.created_at)
                                  .locale("id")
                                  .format("LL, LT")}
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                <ModalNoteTiket
                  title={"Catatan Baru"}
                  visible={modalnoteticket}
                  onvisible={setmodalnoteticket}
                  onCancel={() => {
                    setmodalnoteticket(false);
                  }}
                  loading={loadingnoteticket}
                  onOk={handleNoteTicket}
                  datanoteticket={datanoteticket}
                  setdatanoteticket={setdatanoteticket}
                  ticketid={ticketid}
                />
                {/* AKTIVITAS TIKET */}
                <div className="shadow-md rounded-md bg-white p-5 mt-2 ml-2">
                  <div className=" flex items-center justify-between mb-5">
                    <H1>Aktivitas</H1>
                  </div>
                  {
                    praloadinglogticket ? (
                      <div className=" flex justify-center">
                        <Spin />
                      </div>
                    ) : displaylogticket.length === 0 ? (
                      <>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </>
                    ) : (
                      // <InfiniteScroll
                      //     dataLength={logs.length}
                      //     next={fetchDataMoreLogs}
                      //     hasMore={hasmore}
                      //     loader={
                      //         <>
                      //             <Spin />
                      //         </>
                      //     }
                      //     endMessage={
                      //         <div className="flex justify-center text-center">
                      //             <Label>Sudah Semua</Label>
                      //         </div>
                      //     }
                      // >
                      //     {
                      displaylogticket.map((log, idx) => (
                        <div className=" flex flex-col mb-4">
                          <p className=" mb-2 line-clamp-6 font-medium">
                            {log.log_name}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className=" flex">
                              <div className=" w-5 h-5 rounded-full mr-2">
                                <img
                                  src={
                                    log.causer.profile_image === "-"
                                      ? "/image/staffTask.png"
                                      : log.causer.profile_image
                                  }
                                  className=" object-contain w-5 h-5"
                                  alt=""
                                />
                              </div>
                              <Text color={`green`}>{log.causer.name}</Text>
                            </div>
                            <div>
                              <Label>
                                {moment(log.created_at)
                                  .locale("id")
                                  .format("LL, LT")}
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                    //     }
                    // </InfiniteScroll>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dataProfile.data.role === 1 && (
        <>
          <DrawerTicketConnectItem
            title={"Hubungkan Aset"}
            visible={drawerconnectitemticket}
            onClose={() => {
              setdrawerconnectitemticket(false);
            }}
            buttonOkText={"Hubungkan Aset"}
            initProps={initProps}
            onvisible={setdrawerconnectitemticket}
            refresh={refreshconnectitemticket}
            setrefresh={setrefreshconnectitemticket}
            setrefreshclosed={setrefreshclosedconnectitemticket}
            ticketid={ticketid}
            datapayload={datapayloadconnectitem}
            setdatapayload={setdatapayloadconnectitem}
            selectedassettype={selectedassettype}
            setselectedassettype={setselectedassettype}
          />
          <DrawerTicketAssign
            visible={drawerassignticket}
            onClose={() => {
              setdrawerassignticket(false);
            }}
            buttonOkText={"Simpan"}
            initProps={initProps}
            onvisible={setdrawerassignticket}
            refresh={refreshassignticket}
            setrefresh={setrefreshassignticket}
            setrefreshclosed={setrefreshclosedassignticket}
            ticketid={ticketid}
            datapayload={datapayloadassign}
            setdatapayload={setdatapayloadassign}
          />
          <DrawerTicketDeadline
            title={"Deadline"}
            visible={drawerdeadlineicket}
            onClose={() => {
              setdrawedeadlineticket(false);
            }}
            buttonOkText={"Simpan"}
            initProps={initProps}
            onvisible={setdrawedeadlineticket}
            refresh={refreshdeadlineicket}
            setrefresh={setrefreshdeadlineicket}
            setrefreshclosed={setrefreshcloseddeadlineticket}
            ticketid={ticketid}
            datapayload={datapayloaddeadline}
            setdatapayload={setdatapayloaddeadline}
            showdatetime={showdatepicker}
            setshowdatetime={setshowdatepicker}
            datevalue={datevalue}
            setdatevalue={setdatevalue}
          />
          <DrawerTicketUpdate
            title={"Ubah Tiket"}
            visible={drawerupdateticket}
            onClose={() => {
              setdrawerupdateticket(false);
            }}
            buttonOkText={"Simpan Perubahan Tiket"}
            initProps={initProps}
            onvisible={setdrawerupdateticket}
            refreshtickets={refreshupdateticket}
            setrefreshtickets={setrefreshupdateticket}
            setrefreshclosed={setrefreshclosedupdateticket}
            dataprofile={dataProfile}
            datapayload={datapayloadupdate}
            setdatapayload={setdatapayloadupdate}
            ticketid={ticketid}
            displaydata={displaydata}
            disabledsubmit={disabledupdate}
            setdisabledsubmit={setdisabledupdate}
          />
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const ticketid = params.ticketId;
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
      ticketid,
    },
  };
}

export default TicketDetail;
