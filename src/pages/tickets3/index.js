import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Table,
  Tooltip,
  TreeSelect,
} from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../../components/layout-dashboard2";
import st from "../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const TicketsIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  var ticketid1 = "",
    locationid1 = "",
    from1 = "",
    to1 = "",
    statusid1 = "";
  const { ticket_id, location_id, from, to, status_id } = rt.query;
  if (ticket_id) {
    ticketid1 = ticket_id;
  }
  if (location_id) {
    locationid1 = location_id;
  }
  if (status_id) {
    statusid1 = status_id;
  }
  if (from) {
    from1 = from;
  }
  if (to) {
    to1 = to;
  }

  //2.useState
  const [displaydata, setdisplaydata] = useState([]);
  const [ticketrelations, setticketrelations] = useState({
    status_ticket: [
      {
        id: 0,
        name: "",
      },
    ],
    incident_type: [],
    requesters: [
      {
        user_id: 0,
        fullname: "",
        company_id: 0,
      },
    ],
    requester_companies: [],
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
  });
  const [displaydata1, setdisplaydata1] = useState([]);
  const [displaydata2, setdisplaydata2] = useState([]);
  const [rawdata, setrawdata] = useState({
    total_tickets: 0,
    open_tickets_count: 0,
    on_progress_tickets_count: 0,
    on_hold_tickets_count: 0,
    canceled_tickets_count: 0,
    closed_tickets_count: 0,
    tickets: {},
  });
  const [displayentiredata, setdisplayentiredata] = useState({
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
  });
  const [namasearchact, setnamasearchact] = useState(
    ticketid1 === "" ? false : true
  );
  const [namavalue, setnamavalue] = useState(null);
  const [lokasifilteract, setlokasifilteract] = useState(
    locationid1 === "" ? false : true
  );
  const [lokasivalue, setlokasivalue] = useState(null);
  const [rangedatefilteract, setrangedatefilteract] = useState(false);
  const [rangedatevalue, setrangedatevalue] = useState([]);
  const [fromact, setfromact] = useState(from1 === "" ? false : true);
  const [fromvalue, setfromvalue] = useState(null);
  const [toact, settoact] = useState(to1 === "" ? false : true);
  const [tovalue, settovalue] = useState(null);
  const [statusfilteract, setstatusfilteract] = useState(
    statusid1 === "" ? false : true
  );
  const [statusvalue, setstatusvalue] = useState(null);
  const [namaasset, setnamaasset] = useState(locationid1);
  const [defasset, setdefasset] = useState(null);
  const [rowstate, setrowstate] = useState(0);
  const [praloading, setpraloading] = useState(true);
  const [inputnumberfalse, setinputnumberfalse] = useState(false);

  //declaration
  const column = [
    {
      title: "No Ticket",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <strong>{record.full_name}</strong>
            </>
          ),
        };
      },
    },
    {
      title: "Raised By",
      dataIndex: "raised_by",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {/* {ticketrelations.requesters.filter(docfil => docfil.user_id === record.requester.user_id)[0].fullname} */}
              {record.task.creator.name}
            </>
          ),
        };
      },
    },
    {
      title: "Lokasi Problem",
      dataIndex: "location_problem",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <>
              {/* {ticketrelations.companies.filter(docfil => docfil.company_id === record.location)[0].company_name} */}
              {record.task.location.id === 0
                ? "-"
                : record.task.location.full_location}
            </>
          ),
        };
      },
    },
    {
      title: "Date Raised",
      dataIndex: "date_raised",
      render: (text, record, index) => {
        // var jumlahHari = Math.floor((new Date().getTime() - new Date(record.raised_at).getTime()) / (1000 * 3600 * 24))
        // var jumlahJam = ""
        // if (jumlahHari < 1) {
        //     jumlahJam = Math.floor((new Date().getTime() - new Date(record.raised_at).getTime()) / (1000 * 3600))
        // }
        return {
          children: (
            <>
              {/* {moment(record.raised_at).locale('id').format('L')} ({jumlahHari < 1 ? `${jumlahJam} jam` : `${jumlahHari} hari`} yang lalu) */}
              {record.raised_at}
            </>
          ),
        };
      },
    },
    // {
    //     title: 'Assign To',
    //     dataIndex: 'assign_to',
    //     render: (text, record, index) => {
    //         return {
    //             children:
    //                 <>
    //                     {/* {ticketrelations.requesters.filter(docfil => docfil.user_id === record.assign_to)[0].fullname} */}
    //                     {record.assignable.id === 0 ?
    //                         <div className="flex items-center">
    //                             <p className='mb-0 mr-2'>None</p>
    //                             <Tooltip placement="right" title="Ticket Belum di assign ke engineer">
    //                                 <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
    //                             </Tooltip>
    //                         </div>
    //                         :
    //                         record.assignable.name
    //                     }
    //                 </>
    //         }
    //     }
    // },
    // {
    //     title: 'Status',
    //     dataIndex: 'status',
    //     align: `center`,
    //     render: (text, record, index) => {
    //         return {
    //             children:
    //                 <>
    //                     {/* {ticketrelations.status_ticket.filter(docfil => docfil.id === record.status)[0].name} */}
    //                     {
    //                         record.status.id === 1 &&
    //                         <div className="rounded-md h-auto px-1 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">{record.status.name}</div>
    //                     }
    //                     {
    //                         record.status.id === 2 &&
    //                         <div className="rounded-md h-auto px-1 text-center py-1 bg-green-100 border border-green-200 text-green-600">{record.status.name}</div>
    //                     }
    //                     {
    //                         record.status.id === 3 &&
    //                         <div className="rounded-md h-auto px-1 text-center py-1 bg-yellow-100 border border-yellow-200 text-yellow-600">{record.status.name}</div>
    //                     }
    //                     {
    //                         record.status.id === 4 &&
    //                         <div className="rounded-md h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">{record.status.name}</div>
    //                     }
    //                     {
    //                         record.status.id === 5 &&
    //                         <div className="rounded-md h-auto px-1 text-center py-1 bg-gray-100 border border-gray-200 text-gray-600">{record.status.name}</div>
    //                     }
    //                 </>
    //         }
    //     }
    // },
  ];

  //3.onChange
  //search nama
  const onChangeSearch = (e) => {
    if (e.target.value === "") {
      // setdisplaydata(displaydata2)
      window.location.href = `/tickets?ticket_id=&location_id=${
        lokasifilteract ? locationid1 : ""
      }&status_id=${statusfilteract ? statusid1 : ""}&from=${
        fromact ? from1 : ""
      }&to=${toact ? to1 : ""}`;
      setnamasearchact(false);
    } else {
      if (/(^\d*$)/.test(e.target.value)) {
        setinputnumberfalse(false);
        setnamasearchact(true);
        setnamavalue(e.target.value);
      } else {
        setinputnumberfalse(true);
      }
    }
  };
  //search lokasi
  const onChangeLokasi = (idlokasi) => {
    if (typeof idlokasi === "undefined") {
      // setdisplaydata(displaydata2)
      window.location.href = `/tickets?ticket_id=${
        namasearchact ? ticketid1 : ""
      }&location_id=&status_id=${statusfilteract ? statusid1 : ""}&from=${
        fromact ? from1 : ""
      }&to=${toact ? to1 : ""}`;
      setlokasifilteract(false);
    } else {
      setlokasifilteract(true);
      setlokasivalue(idlokasi);
    }
  };
  //search range date
  const onChangeRangeDate = (datestrings) => {
    if (typeof datestrings === "undefined") {
      // setdisplaydata(displaydata2)
      window.location.href = `/tickets?ticket_id=${
        namasearchact ? ticketid1 : ""
      }&location_id=${lokasifilteract ? locationid1 : ""}&status_id=${
        statusfilteract ? statusid1 : ""
      }&from=&to=`;
      setrangedatefilteract(false);
      setfromact(false);
      settoact(false);
    } else {
      setrangedatefilteract(true);
      setfromact(true);
      settoact(true);
      setrangedatevalue(datestrings);
      setfromvalue(moment(datestrings[0]).locale("id").format("YYYY-MM-DD"));
      settovalue(moment(datestrings[1]).locale("id").format("YYYY-MM-DD"));
    }
  };
  //search status
  const onChangeStatus = (idstatus) => {
    if (typeof idstatus === "undefined") {
      // setdisplaydata(displaydata2)
      window.location.href = `/tickets?ticket_id=${
        namasearchact ? ticketid1 : ""
      }&location_id=${lokasifilteract ? locationid1 : ""}&status_id=&from=${
        fromact ? from1 : ""
      }&to=${toact ? to1 : ""}`;
      setstatusfilteract(false);
    } else {
      setstatusfilteract(true);
      setstatusvalue(idstatus);
    }
  };
  const onFinalClick = () => {
    // var datatemp = displaydata1
    // if (rangedatefilteract) {
    //     datatemp = datatemp.filter(flt => {
    //         return flt.asset_name.toLowerCase() === rangedatevalue.toLowerCase()
    //         // return (flt.asset_name.toLowerCase().includes(assettypevalue.toLowerCase())) || (flt.asset_name.replaceAll(/\s+\/\s+/g, "/").split("/")[0] === namaasset)
    //     })
    // }
    // if (lokasifilteract) {
    //     datatemp = datatemp.filter(flt => flt.model_id === lokasivalue)
    // }
    // if (statusfilteract) {
    //     datatemp = datatemp.filter(flt => flt.status_condition === statusvalue)
    // }
    // if (namasearchact) {
    //     datatemp = datatemp.filter(flt => {
    //         return flt.inventory_name.toLowerCase().includes(namavalue.toLowerCase())
    //     })
    // }
    // setdisplaydata(datatemp)
    if (inputnumberfalse === false) {
      window.location.href = `/tickets?ticket_id=${
        namasearchact ? (namavalue === null ? ticketid1 : namavalue) : ""
      }&location_id=${
        lokasifilteract
          ? lokasivalue === null
            ? locationid1
            : lokasivalue
          : ""
      }&status=${
        statusfilteract ? (statusvalue === null ? statusid1 : statusvalue) : ""
      }&from=${fromact ? (fromvalue === null ? from1 : fromvalue) : ""}&to=${
        toact ? (tovalue === null ? to1 : tovalue) : ""
      }`;
    }
    // setpraloading(true)
    // fetch(`https://boiling-thicket-46501.herokuapp.com/getTickets?ticket_id=${namasearchact ? namavalue : ""}&location_id=${lokasifilteract ? lokasivalue : ""}&status_id=${statusfilteract ? statusvalue : ""}&from=${rangedatefilteract ? moment(rangedatevalue[0]).locale('id').format('YYYY-MM-DD') : ""}&to=${rangedatefilteract ? moment(rangedatevalue[1]).locale('id').format('YYYY-MM-DD') : ""}`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    //     .then(res => res.json())
    //     .then(res2 => {
    //         res2.data.tickets.data.length === 0 ? setdisplaydata([]) : setdisplaydata(res2.data.tickets.data)
    //         setpraloading(false)
    //     })
  };

  //5.useEffect
  useEffect(() => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/${
        dataProfile.data.role === 1 ? "getTickets" : "getClientTickets"
      }?ticket_id=${ticketid1}&location_id=${locationid1}&status_id=${statusid1}&from=${from1}&to=${to1}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setrawdata(res2.data);
        setdisplayentiredata(res2.data);
        setdisplaydata(res2.data.data);
        setdisplaydata1(res2.data.data);
        setdisplaydata2(res2.data.data);
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/${
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
        var status_ticket_map = [];
        if (dataProfile.data.role !== 1) {
          for (var attr in res2.data.status_ticket) {
            status_ticket_map.push(res2.data.status_ticket[attr]);
          }
          setticketrelations({
            ...res2.data,
            status_ticket: status_ticket_map,
          });
        } else {
          setticketrelations(res2.data);
        }
        setdefasset(namaasset);
        setpraloading(false);
      });
  }, []);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className=" w-full grid grid-cols-1 md:grid-cols-4 border-gray-400 md:border-t md:border-b bg-white mb-5 px-4 py-5">
        <div className=" col-span-1 md:col-span-3 flex items-center mb-2 md:mb-0">
          <div className="font-bold text-2xl w-auto mr-14">Tickets</div>
          <div className="flex flex-col mr-10">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <p className="mb-0">Open</p>
            </div>
            <div className=" text-lg text-center">
              {rawdata.open_tickets_count}
            </div>
          </div>
          {dataProfile.data.role === 1 && (
            <div className="flex flex-col mr-10">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <p className="mb-0">On Progress</p>
              </div>
              <div className=" text-lg text-center">
                {rawdata.on_progress_tickets_count}
              </div>
            </div>
          )}
          {dataProfile.data.role === 1 && (
            <div className="flex flex-col mr-10">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <p className="mb-0">On Hold</p>
              </div>
              <div className=" text-lg text-center">
                {rawdata.on_hold_tickets_count}
              </div>
            </div>
          )}

          <div className="flex flex-col mr-10">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
              <p className="mb-0">Cancel</p>
            </div>
            <div className=" text-lg text-center">
              {rawdata.canceled_tickets_count}
            </div>
          </div>
          <div className="flex flex-col mr-12">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
              <p className="mb-0">Closed</p>
            </div>
            <div className=" text-lg text-center">
              {rawdata.closed_tickets_count}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <p className="mb-0 font-bold text-lg">Total Tiket</p>
            </div>
            <div className=" font-bold text-xl text-center">
              {rawdata.total_tickets}
            </div>
          </div>
        </div>
        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
          {dataProfile.data.role === 1 ? (
            <Link href={"/tickets/histories"}>
              <Button
                size="large"
                type="primary"
                style={{ marginRight: `1rem` }}
                onClick={() => {
                  rt.push(`/tickets/histories`);
                }}
              >
                History
              </Button>
            </Link>
          ) : (
            <>
              {dataProfile.data.features.includes(108) && (
                <Link href={"/tickets/histories"}>
                  <Button
                    size="large"
                    type="primary"
                    style={{ marginRight: `1rem` }}
                    onClick={() => {
                      rt.push(`/tickets/histories`);
                    }}
                  >
                    History
                  </Button>
                </Link>
              )}
            </>
          )}
          {dataProfile.data.role === 1 && (
            <Link href={"/tickets/exporting?closed=0"}>
              <Button
                style={{
                  backgroundColor: `gray`,
                  borderColor: `gray`,
                  marginRight: `1rem`,
                }}
                size="large"
                type="primary"
              >
                Export
              </Button>
            </Link>
          )}
          <Link href={"/tickets/create"}>
            <Button size="large" type="primary">
              Buat Tiket
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
          {praloading ? null : (
            <div className="flex mb-8">
              <div className=" w-full mr-1 grid grid-cols-12">
                <div className="col-span-3 mr-1 flex flex-col">
                  <Input
                    defaultValue={ticketid1}
                    style={{ width: `100%`, marginRight: `0.5rem` }}
                    placeholder="Cari Ticket Number"
                    onChange={onChangeSearch}
                    allowClear
                  ></Input>
                  {inputnumberfalse && (
                    <p className="mb-0 text-xs text-red-400">
                      Ticket number harus angka
                    </p>
                  )}
                </div>
                <div className="col-span-3 mr-1">
                  <TreeSelect
                    defaultValue={namaasset === "" ? null : Number(defasset)}
                    placeholder="Lokasi Problem"
                    style={{ width: `100%` }}
                    allowClear
                    onChange={(value, label, extra) => {
                      if (typeof value === "undefined") {
                        onChangeLokasi();
                      } else {
                        onChangeLokasi(value);
                      }
                    }}
                    treeData={
                      dataProfile.data.role === 1
                        ? [ticketrelations.companies]
                        : [ticketrelations.companies.data]
                    }
                    treeDefaultExpandAll
                  />
                </div>
                <div className="col-span-3 mr-1">
                  <DatePicker.RangePicker
                    defaultValue={
                      from1 === "" && to1 === ""
                        ? null
                        : [moment(from1), moment(to1)]
                    }
                    style={{ width: `100%` }}
                    placeholder={["Tanggal Awal", "Tanggal Akhir"]}
                    onChange={(dates, datestrings) => {
                      if (datestrings[0] === "" && datestrings[1] === "") {
                        onChangeRangeDate();
                      } else {
                        onChangeRangeDate(datestrings);
                      }
                    }}
                  ></DatePicker.RangePicker>
                </div>
                <div className="col-span-2 mr-1">
                  <Select
                    defaultValue={statusid1 === "" ? null : Number(statusid1)}
                    placeholder="Status"
                    style={{ width: `100%` }}
                    allowClear
                    onChange={(value) => {
                      if (typeof value === "undefined") {
                        onChangeStatus();
                      } else {
                        onChangeStatus(value);
                      }
                    }}
                  >
                    {ticketrelations.status_ticket.map((docconds, idxconds) => {
                      return (
                        <Select.Option value={docconds.id}>
                          {docconds.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
                <div className=" col-span-1">
                  <Button
                    type="primary"
                    style={{ width: `100%` }}
                    onClick={onFinalClick}
                  >
                    <SearchOutlined />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="px-6">
            <Table
              pagination={{
                pageSize: 10,
                total: displayentiredata.total,
                onChange: (page, pageSize) => {
                  setpraloading(true);
                  fetch(
                    `https://boiling-thicket-46501.herokuapp.com/${
                      dataProfile.data.role === 1
                        ? "getTickets"
                        : "getClientTickets"
                    }?page=${page}&rows=10&ticket_id=${ticketid1}&location_id=${locationid1}&status_id=${statusid1}&from=${from1}&to=${to1}`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setdisplayentiredata(res2.data.tickets);
                      setdisplaydata(res2.data.tickets.data);
                      setdisplaydata1(res2.data.tickets.data);
                      setdisplaydata2(res2.data.tickets.data);
                      setpraloading(false);
                    });
                },
              }}
              scroll={{ x: 200 }}
              dataSource={displaydata}
              columns={column}
              loading={praloading}
              onRow={(record, rowIndex) => {
                return {
                  onMouseOver: (event) => {
                    setrowstate(record.id);
                  },
                  onClick: (event) => {
                    // {
                    //     [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                    dataProfile.data.role === 1
                      ? rt.push(`/tickets/detail/${record.id}`)
                      : dataProfile.data.features.includes(109) &&
                        rt.push(`/tickets/detail/${record.id}`);
                    //         :
                    //         null
                    // }
                  },
                };
              }}
              rowClassName={(record, idx) => {
                return record.id === rowstate ? `cursor-pointer` : ``;
              }}
            ></Table>
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
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
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

export default TicketsIndex;
