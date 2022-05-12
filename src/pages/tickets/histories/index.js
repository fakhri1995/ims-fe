import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select, TreeSelect } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  TICKETS_CLOSED_GET,
  TICKET_CLIENT_GET,
  TICKET_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../components/button";
import { BackIconSvg } from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import { TableCustomTicketHistories } from "../../../components/table/tableCustom";
import { H1 } from "../../../components/typography";
import httpcookie from "cookie";

const TicketHistories = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isClient = dataProfile.data.role !== 1;

  const isAllowedToGetTicket = hasPermission(
    isClient ? TICKET_CLIENT_GET : TICKET_GET
  );
  const isAllowedToGetClosedTicket = hasPermission(TICKETS_CLOSED_GET);

  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(1, 2);
  pathArr.push(`Riwayat Tiket`);

  //2.Use State
  //TASK HISTORIES
  const [datarawhistories, setdatarawhistories] = useState({
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
  const [datahistories, setdatahistories] = useState([]);
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
  const [loadinghistories, setloadinghistories] = useState(false);
  // const [loadingfilterhistories, setloadingfilterhistories] = useState(false);
  const [pagehistories, setpagehistories] = useState(1);
  const [rowshistories, setrowshistories] = useState(10);
  const [sortinghistories, setsortinghistories] = useState({
    sort_by: "",
    sort_type: "",
  });
  //Filter
  // const [datafilterthistories, setdatafilterthistories] = useState([]);
  const [searcingfilterhistories, setsearcingfilterhistories] = useState("");
  const [tickettypefilterhistories, settickettypefilterhistories] =
    useState("");
  const [fromfilterhistories, setfromfilterhistories] = useState("");
  const [tofilterhistories, settofilterhistories] = useState("");
  const [locfilterhistories, setlocfilterhistories] = useState("");
  const [fromresfilterhistories, setfromresfilterhistories] = useState("");
  const [helperfromresfilterhistories, sethelperfromresfilterhistories] =
    useState("");
  const [toresfilterhistories, settoresfilterhistories] = useState("");
  //create - ticket histories
  // const [drawerhistoriescreate, setdrawerhistoriescreate] = useState(false);
  // const [loadinghistoriescreate, setloadinghistoriescreate] = useState(false);
  // const [refreshcreatehistoriescreate, setrefreshcreatehistoriescreate] =
  //   useState(-1);
  //delete - ticket histories
  // const [datahistoriesdelete, setdatahistoriesdelete] = useState({
  //   id: null,
  //   name: "",
  // });
  // const [modalhistoriesdelete, setmodalhistoriesdelete] = useState(false);
  // const [loadinghistoriesdelete, setloadinghistoriesdelete] = useState(false);
  // const [refreshcreatehistoriesdelete, setrefreshcreatehistoriesdelete] =
  //   useState(-1);

  //2. Column Table
  const columnsTicketHistories = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawhistories.from + index}</>,
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
      sorter: isAllowedToGetClosedTicket ? (a, b) => a.id > b.id : false,
    },
    {
      title: "Tipe Tiket",
      dataIndex: "type",
      render: (text, record, index) => {
        return {
          children: <>{record.type_name}</>,
        };
      },
      sorter: isAllowedToGetClosedTicket
        ? (a, b) => a.type_name.localeCompare(b.type_name)
        : false,
    },
    {
      title: "Diajukan Oleh",
      dataIndex: "requested_by",
      render: (text, record, index) => {
        return {
          // children: <>CREATOR NAME</>,
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
      sorter: isAllowedToGetClosedTicket
        ? (a, b) => a.raised_at.localeCompare(b.raised_at)
        : false,
    },
    // {
    //   title: "Di-assign Ke",
    //   dataIndex: "assignable",
    //   render: (text, record, index) => {
    //     return {
    //       children: <>DI ASSIGN KE</>
    //       // children: (
    //       //   <>
    //       //     {record.task.users.length === 0 ? (
    //       //       <div className=" flex items-center bg-onhold bg-opacity-10">
    //       //         <div className=" mr-2">
    //       //           <UserIconSvg />
    //       //         </div>
    //       //         <div>Belum di-assign</div>
    //       //       </div>
    //       //     ) : (
    //       //       <>{record.task.users[0].name}</>
    //       //     )}
    //       //   </>
    //       // ),
    //     };
    //   },
    // },
    {
      title: "Durasi Selesai",
      dataIndex: "resolved_times",
      render: (text, record, index) => {
        return {
          children: <>{record.resolved_times}</>,
        };
      },
      sorter: isAllowedToGetClosedTicket
        ? (a, b) => a.resolved_times.localeCompare(b.resolved_times)
        : false,
    },
  ];

  //3. Handler
  const onFilterTicketHistories = () => {
    setloadinghistories(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getClosedTickets?page=${pagehistories}&rows=${rowshistories}&ticket_id=${searcingfilterhistories}&from=${fromfilterhistories}&to=${tofilterhistories}&location_id=${locfilterhistories}&from_res=${fromresfilterhistories}&to_res=${toresfilterhistories}&sort_by=${sortinghistories.sort_by}&sort_type=${sortinghistories.sort_type}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawhistories(res2.data);
        setdatahistories(res2.data.data);
        // setdatafilterthistories(res2.data.data);
        setloadinghistories(false);
      });
  };
  // const handleDeleteTicketHistories = () => {
  //     setloadinghistories(true)
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTicketTaskType`, {
  //         method: 'DELETE',
  //         headers: {
  //             'Authorization': JSON.parse(initProps),
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             id: datatickettypesdelete.id
  //         })
  //     })
  //         .then((res) => res.json())
  //         .then(res2 => {
  //             setloadinghistories(false)
  //             if (res2.success) {
  //                 setrefreshcreatetickettypesdelete(prev => prev + 1)
  //                 setmodaltickettypesdelete(false)
  //                 notification['success']({
  //                     message: res2.message,
  //                     duration: 3
  //                 })
  //             }
  //             else {
  //                 notification['error']({
  //                     message: res2.message,
  //                     duration: 3
  //                 })
  //             }
  //         })
  // }

  //4.Use Effect
  useEffect(() => {
    if (!isAllowedToGetClosedTicket) {
      permissionWarningNotification("Mendapatkan", "Daftar Riwayat Tiket");

      setloadinghistories(false);
      return;
    }

    setloadinghistories(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getClosedTickets?page=${pagehistories}&rows=${rowshistories}&ticket_id=${searcingfilterhistories}&from=${fromfilterhistories}&to=${tofilterhistories}&location_id=${locfilterhistories}&from_res=${fromresfilterhistories}&to_res=${toresfilterhistories}&sort_by=${sortinghistories.sort_by}&sort_type=${sortinghistories.sort_type}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawhistories(res2.data);
        setdatahistories(res2.data.data);
        // setdatafilterthistories(res2.data.data);
        setloadinghistories(false);
      });
  }, [isAllowedToGetClosedTicket]);

  useEffect(() => {
    if (!isAllowedToGetTicket) {
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
        setdatatickrelation(res2.data);
      });
  }, [isAllowedToGetTicket]);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className=" flex flex-col px-5">
        <div className="flex flex-col shadow-md rounded-lg bg-white p-5 mb-6 mx-3">
          <div className="flex items-center mb-5">
            <div
              className="mr-2 cursor-pointer flex items-center"
              onClick={() => {
                rt.push(`/tickets`);
              }}
            >
              <BackIconSvg size={15} color={`#000000`} />
            </div>
            <div className=" mr-2 flex items-center">
              <H1>Riwayat Tiket</H1>
            </div>
          </div>
          <div className=" flex items-center mb-5">
            <div className="mx-1 w-2/12">
              <Input
                value={
                  searcingfilterhistories === ""
                    ? null
                    : searcingfilterhistories
                }
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                disabled={!isAllowedToGetClosedTicket}
                allowClear
                onChange={(e) => {
                  if (e.target.value === "") {
                    setsearcingfilterhistories("");
                  } else {
                    setsearcingfilterhistories(e.target.value);
                  }
                }}
              />
            </div>
            <div className="mx-1 w-2/12">
              <Select
                value={
                  tickettypefilterhistories === ""
                    ? null
                    : tickettypefilterhistories
                }
                placeholder="Semua Tipe Tiket"
                disabled={!isAllowedToGetClosedTicket || !isAllowedToGetTicket}
                style={{ width: `100%` }}
                allowClear
                name={`task_type`}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? settickettypefilterhistories("")
                    : settickettypefilterhistories(value);
                }}
              >
                {dataticketrelation.ticket_types.map((doc, idx) => (
                  <Select.Option key={idx} value={doc.id}>
                    {doc.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className=" w-3/12 mx-1">
              <DatePicker.RangePicker
                style={{ width: `100%` }}
                allowEmpty
                className="datepickerStatus"
                disabled={!isAllowedToGetClosedTicket}
                value={
                  fromfilterhistories === ""
                    ? [null, null]
                    : [moment(fromfilterhistories), moment(tofilterhistories)]
                }
                onChange={(dates, datestrings) => {
                  setfromfilterhistories(datestrings[0]);
                  settofilterhistories(datestrings[1]);
                }}
              />
            </div>
            <div className=" mx-1 w-5/12">
              <TreeSelect
                style={{ width: `100%` }}
                allowClear
                placeholder="Semua Lokasi"
                disabled={!isAllowedToGetClosedTicket || !isAllowedToGetTicket}
                showSearch
                suffixIcon={<SearchOutlined />}
                showArrow
                name={`locations_id`}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setlocfilterhistories("")
                    : setlocfilterhistories(value);
                }}
                treeData={[dataticketrelation.companies]}
                treeDefaultExpandAll
                value={locfilterhistories === "" ? null : locfilterhistories}
                treeNodeFilterProp="title"
                filterTreeNode={(search, item) => {
                  /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                  /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                  return (
                    item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
                  );
                }}
              ></TreeSelect>
            </div>
            <div className="mx-1 w-2/12">
              <Select
                value={
                  helperfromresfilterhistories === ""
                    ? null
                    : helperfromresfilterhistories
                }
                placeholder="Durasi Selesai"
                style={{ width: `100%` }}
                allowClear
                name={`resolved_times`}
                onChange={(value, option) => {
                  typeof value === "undefined"
                    ? (setfromresfilterhistories(""),
                      settoresfilterhistories(""),
                      sethelperfromresfilterhistories(""))
                    : (setfromresfilterhistories(option.from),
                      settoresfilterhistories(option.to),
                      sethelperfromresfilterhistories(value));
                }}
                disabled={!isAllowedToGetClosedTicket || !isAllowedToGetTicket}
              >
                {dataticketrelation.resolved_times.map((doc, idx) => {
                  if (doc.from === null)
                    return (
                      <Select.Option key={idx} value={1} from={""} to={doc.to}>
                        Kurang dari 3 jam
                      </Select.Option>
                    );
                  else if (doc.from === 10800)
                    return (
                      <Select.Option
                        key={idx}
                        value={2}
                        from={doc.from}
                        to={doc.to}
                      >
                        3 - 12 jam
                      </Select.Option>
                    );
                  else if (doc.from === 43200)
                    return (
                      <Select.Option
                        key={idx}
                        value={3}
                        from={doc.from}
                        to={doc.to}
                      >
                        12 - 30 jam
                      </Select.Option>
                    );
                  else if (doc.from === 108000)
                    return (
                      <Select.Option
                        key={idx}
                        value={4}
                        from={doc.from}
                        to={doc.to}
                      >
                        30 jam - 3 hari
                      </Select.Option>
                    );
                  else if (doc.from === 259200)
                    return (
                      <Select.Option
                        key={idx}
                        value={5}
                        from={doc.from}
                        to={""}
                      >
                        Lebih dari 3 hari
                      </Select.Option>
                    );
                })}
              </Select>
            </div>
            <div className="mx-1 w-1/12">
              <ButtonSys
                type={`primary`}
                onClick={onFilterTicketHistories}
                disabled={!isAllowedToGetClosedTicket}
              >
                {/* <div className='mr-1'>
                                    <SearchIconSvg size={15} color={`#ffffff`} />
                                </div> */}
                Cari
              </ButtonSys>
            </div>
          </div>
          <div>
            <TableCustomTicketHistories
              dataSource={datahistories}
              setDataSource={setdatahistories}
              columns={columnsTicketHistories}
              loading={loadinghistories}
              setpraloading={setloadinghistories}
              pageSize={rowshistories}
              total={datarawhistories.total}
              initProps={initProps}
              setpage={setpagehistories}
              pagefromsearch={pagehistories}
              setdataraw={setdatarawhistories}
              setsorting={setsortinghistories}
              sorting={sortinghistories}
              searching={searcingfilterhistories}
              tickettype={tickettypefilterhistories}
              fromdate={fromfilterhistories}
              todate={tofilterhistories}
              location={locfilterhistories}
              fromres={fromresfilterhistories}
              tores={toresfilterhistories}
            />
          </div>
        </div>
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

export default TicketHistories;
