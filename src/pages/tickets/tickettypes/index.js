import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Popover, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ButtonSys from "../../../components/button";
import DrawerTicketTypeCreate from "../../../components/drawer/tickets/drawerTicketTypeCreate";
import DrawerTicketTypeUpdate from "../../../components/drawer/tickets/drawerTicketTypeUpdate";
import {
  AlerttriangleIconSvg,
  EditIconSvg,
  MappinIconSvg,
} from "../../../components/icon";
import {
  BackIconSvg,
  FilePlusIconSvg,
  TrashIconSvg,
} from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import { ModalHapusTipeTiket } from "../../../components/modal/modalCustom";
import { TableCustomTicketTypes } from "../../../components/table/tableCustom";
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

const TicketTypes = ({ dataProfile, sidemenu, initProps }) => {
  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(1, 2);
  pathArr.push(`Tipe Task Tiket`);

  //2.Use State
  //TICKET TYPES
  const [datarawtickettypes, setdatarawtickettypes] = useState({
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
  const [datatickettypes, setdatatickettypes] = useState([]);
  const [loadingtickettypes, setloadingtickettypes] = useState(false);
  const [pagetickettypes, setpagetickettypes] = useState(1);
  const [rowstickettypes, setrowstickettypes] = useState(10);
  const [sortingtickettypes, setsortingtickettypes] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [searcingtickettypes, setsearcingtickettypes] = useState("");
  const [datafiltertiickettypes, setdatafiltertiickettypes] = useState([]);
  //create - ticket types
  const [drawertickettypescreate, setdrawertickettypescreate] = useState(false);
  const [loadingtickettypescreate, setloadingtickettypescreate] =
    useState(false);
  const [refreshtickettypescreate, setrefreshtickettypescreate] = useState(-1);
  //update - ticket types
  const [drawertickettypesupdate, setdrawertickettypesupdate] = useState(false);
  const [loadingtickettypesupdate, setloadingtickettypesupdate] =
    useState(false);
  const [refreshtickettypesupdate, setrefreshtickettypesupdate] = useState(-1);
  const [disabledupdate, setdisabledupdate] = useState(false);
  const [datapayloadtickettype, setdatapayloadtickettype] = useState({
    id: null,
    name: "",
    description: "",
    ticket_type_id: 1,
    task_type_id: null,
  });
  //delete - ticket types
  const [datatickettypesdelete, setdatatickettypesdelete] = useState({
    id: null,
    name: "",
  });
  const [modaltickettypesdelete, setmodaltickettypesdelete] = useState(false);
  const [loadingtickettypesdelete, setloadingtickettypesdelete] =
    useState(false);
  const [refreshcreatetickettypesdelete, setrefreshcreatetickettypesdelete] =
    useState(-1);
  const [coloricondeletehover, setcoloricondeletehover] = useState(0);

  //2. Column Table
  const columnsTicketTypes = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawtickettypes.from + index}</>,
        };
      },
    },
    {
      title: "Tipe Tiket",
      dataIndex: "ticket_type_name",
      render: (text, record, index) => {
        return {
          children: <>{record.ticket_type_name}</>,
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record.name}</>,
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tipe Task",
      dataIndex: "task_type_name",
      render: (text, record, index) => {
        return {
          children: <>{record.task_type_name}</>,
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },
    {
      title:
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
      dataIndex: "actions",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <div className=" flex justify-center">
              <div className="mx-1">
                <ButtonSys
                  type="default"
                  onClick={() => {
                    setdatapayloadtickettype({
                      id: Number(record.id),
                      name: record.name,
                      description: record.description,
                      ticket_type_id: record.ticket_type_id,
                      task_type_id: record.task_type_id,
                    });
                    setdrawertickettypesupdate(true);
                  }}
                >
                  <EditIconSvg size={15} color={`#35763B`} />
                </ButtonSys>
              </div>
              <div className="mx-1">
                <ButtonSys
                  type="default"
                  color="danger"
                  onClick={() => {
                    setdatatickettypesdelete({
                      id: record.id,
                      name: record.name,
                    });
                    setmodaltickettypesdelete(true);
                  }}
                >
                  <TrashIconSvg size={15} color={`#BF4A40`} />
                </ButtonSys>
              </div>
            </div>
          ),
        };
      },
    },
  ];

  //3. Handler
  const handleDeleteTipeTiket = () => {
    setloadingtickettypesdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTicketDetailType`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: datatickettypesdelete.id,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingtickettypesdelete(false);
        if (res2.success) {
          setrefreshcreatetickettypesdelete((prev) => prev + 1);
          setmodaltickettypesdelete(false);
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

  //4.Use Effect
  useEffect(() => {
    setloadingtickettypes(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketDetailTypes?page=${pagetickettypes}&rows=${rowstickettypes}&keyword=${searcingtickettypes}&sort_by=${sortingtickettypes.sort_by}&sort_type=${sortingtickettypes.sort_type}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawtickettypes(res2.data);
        setdatatickettypes(res2.data.data);
        setdatafiltertiickettypes(res2.data.data);
        setdisabledupdate(false);
        setloadingtickettypes(false);
      });
  }, [
    refreshtickettypescreate,
    refreshtickettypesupdate,
    refreshcreatetickettypesdelete,
  ]);

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
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <div
                className="mr-2 cursor-pointer flex items-center"
                onClick={() => {
                  rt.push(`/tickets`);
                }}
              >
                <BackIconSvg size={15} color={`#000000`} />
              </div>
              <div className=" mr-2 flex items-center">
                <H1>Atur Tiket</H1>
              </div>
              <div className=" flex items-center">
                <Popover
                  placement="right"
                  content={
                    <div className=" flex">
                      <div className=" mr-2 h-full flex items-center">
                        <ExclamationCircleOutlined
                          style={{ color: `red` }}
                        ></ExclamationCircleOutlined>
                      </div>
                      <div className=" flex flex-col">
                        <div className=" mb-2">
                          <Label>
                            Halaman ini berisi daftar tiket dan task yang akan
                            dijalankan berdasarkan tiket tersebut.
                          </Label>
                        </div>
                        <div>
                          <Label>
                            <strong>PENTING:</strong> Perubahan yang dilakukan
                            akan mengubah seluruh alur task yang sedang berjalan
                          </Label>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <ExclamationCircleOutlined
                    style={{ color: `gray` }}
                  ></ExclamationCircleOutlined>
                </Popover>
              </div>
            </div>
            <div className="w-8/12 flex justify-end">
              <div className=" mx-2">
                <ButtonSys
                  type="primary"
                  onClick={() => {
                    setdrawertickettypescreate(true);
                  }}
                >
                  <div className=" mr-1">
                    <FilePlusIconSvg size={15} color={`#ffffff`} />
                  </div>
                  Tambah Pengaturan
                </ButtonSys>
              </div>
              <div className="mx-2">
                <Input
                  style={{ width: `20rem` }}
                  placeholder="Nama tipe task.."
                  allowClear
                  onChange={(e) => {
                    setsearcingtickettypes(e.target.value);
                    setloadingtickettypes(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketDetailTypes?page=${pagetickettypes}&rows=${rowstickettypes}&keyword=${e.target.value}&sort_by=${sortingtickettypes.sort_by}&sort_type=${sortingtickettypes.sort_type}`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setdatarawtickettypes(res2.data);
                        setdatatickettypes(res2.data.data);
                        setloadingtickettypes(false);
                      });
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <TableCustomTicketTypes
              dataSource={datatickettypes}
              setDataSource={setdatatickettypes}
              columns={columnsTicketTypes}
              loading={loadingtickettypes}
              setpraloading={setloadingtickettypes}
              pageSize={rowstickettypes}
              total={datarawtickettypes.total}
              initProps={initProps}
              setpage={setpagetickettypes}
              pagefromsearch={pagetickettypes}
              setdataraw={setdatarawtickettypes}
              setsorting={setsortingtickettypes}
              sorting={sortingtickettypes}
              searching={searcingtickettypes}
            />
          </div>
        </div>
      </div>
      <DrawerTicketTypeCreate
        title={"Pengaturan Baru"}
        visible={drawertickettypescreate}
        onClose={() => {
          setdrawertickettypescreate(false);
        }}
        buttonOkText={"Simpan Pengaturan"}
        initProps={initProps}
        onvisible={setdrawertickettypescreate}
        refreshtickettypescreate={refreshtickettypescreate}
        setrefreshtickettypescreate={setrefreshtickettypescreate}
      />
      <DrawerTicketTypeUpdate
        title={"Ubah Pengaturan"}
        visible={drawertickettypesupdate}
        onClose={() => {
          setdrawertickettypesupdate(false);
        }}
        buttonOkText={"Simpan Pengaturan"}
        initProps={initProps}
        onvisible={setdrawertickettypesupdate}
        refresh={refreshtickettypesupdate}
        setrefresh={setrefreshtickettypesupdate}
        datapayload={datapayloadtickettype}
        setdatapayload={setdatapayloadtickettype}
        disabledsubmit={disabledupdate}
        setdisabledsubmit={setdisabledupdate}
      />
      <ModalHapusTipeTiket
        title={"Konfirmasi Hapus Pengaturan"}
        visible={modaltickettypesdelete}
        onvisible={setmodaltickettypesdelete}
        onCancel={() => {
          setmodaltickettypesdelete(false);
        }}
        loading={loadingtickettypesdelete}
        datadelete={datatickettypesdelete}
        onOk={handleDeleteTipeTiket}
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

export default TicketTypes;
