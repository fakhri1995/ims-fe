import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Switch, Table, Tabs, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  GUEST_DELETE,
  GUEST_GET,
  GUEST_STATUS,
  GUEST_UPDATE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";

import Layout from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const Relationship = ({ userid, initProps }) => {
  //useState
  const [praloadingrel, setpraloadingrel] = useState(true);
  const [datatable, setdatatable] = useState([]);
  const [datatable2, setdatatable2] = useState([]);
  const [datatable3, setdatatable3] = useState([]);
  const [namasearchact, setnamasearchact] = useState(false);
  const [namavalue, setnamavalue] = useState("");

  //helper
  const columns = [
    {
      title: "Relationship Type",
      dataIndex: "relationship_name",
      key: "relationship_name",
    },
    {
      title: "Nama Item",
      dataIndex: "connected_detail_name",
      key: "connected_detail_name",
    },
    {
      title: "Tipe",
      dataIndex: "type",
      key: "type",
    },
  ];

  //handler
  //search nama
  const onChangeSearch = (e) => {
    if (e.target.value === "") {
      setdatatable(datatable3);
      setnamasearchact(false);
    } else {
      setnamasearchact(true);
      setnamavalue(e.target.value);
    }
  };
  //finalClick
  const onFinalClick = () => {
    var datatemp = datatable2;
    if (namasearchact) {
      datatemp = datatemp.filter((flt) => {
        return flt.connected_detail_name
          .toLowerCase()
          .includes(namavalue.toLowerCase());
      });
    }
    setdatatable(datatemp);
  };

  //useEffect
  useEffect(() => {
    setpraloadingrel(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRelationshipInventory?id=${userid}&type_id=-1`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatatable(res2.data.from_inverse.concat(res2.data.not_from_inverse));
        setdatatable2(
          res2.data.from_inverse.concat(res2.data.not_from_inverse)
        );
        setdatatable3(
          res2.data.from_inverse.concat(res2.data.not_from_inverse)
        );
        setpraloadingrel(false);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="border-b flex justify-between p-5 mb-8">
        <h1 className="font-bold text-xl my-auto">Relationship</h1>
      </div>
      <div className="flex mb-5">
        {praloadingrel ? null : (
          <div className=" w-full mr-1 grid grid-cols-12">
            <div className="col-span-11 mr-1">
              <Input
                style={{ width: `100%`, marginRight: `0.5rem` }}
                placeholder="Cari Nama Item"
                onChange={(e) => onChangeSearch(e)}
                allowClear
              ></Input>
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
        )}
      </div>
      <Table
        loading={praloadingrel}
        pagination={{ pageSize: 9 }}
        scroll={{ x: 200 }}
        dataSource={datatable}
        columns={columns}
      ></Table>
    </div>
  );
};

function GuestDetail({ initProps, dataProfile, userid, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetGuestDetail = hasPermission(GUEST_GET);
  const isAllowedToGuestActivation = hasPermission(GUEST_STATUS);
  const isAllowedToDeleteGuest = hasPermission(GUEST_DELETE);
  const isAllowedToUpdateGuest = hasPermission(GUEST_UPDATE);

  const rt = useRouter();

  const tok = initProps;
  const { TabPane } = Tabs;

  //STATE
  //data payload
  const [data1, setData1] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    profile_image: `/default-users.jpeg`,
  });
  //data roles
  const [namarolearr, setnamarolearr] = useState([]);
  const [patharr, setpatharr] = useState([]);
  //custom breadcrumb
  const [isenabled, setisenabled] = useState(false);
  const [ubahstatus, setubahstatus] = useState(false);
  //modal to non aktif
  const [visible, setVisible] = useState(false);
  //modal to aktif
  const [visiblenon, setVisiblenon] = useState(false);
  //modal hapus
  const [visiblehapus, setvisiblehapus] = useState(false);
  //loading hapus
  const [loadinghapus, setloadinghapus] = useState(false);
  //loading to non aktif
  const [loadingubahaktif, setloadingubahaktif] = useState(false);
  //loading to aktif
  const [loadingubahnonaktif, setloadingubahnonaktif] = useState(false);
  //loading pra render
  const [praloading, setpraloading] = useState(true);

  const handleActivationRequesters = (status) => {
    if (!isAllowedToGuestActivation) {
      permissionWarningNotification("Mengubah", "Status Aktivasi Guest");
      return;
    }

    let keaktifan = false;
    if (status === "aktif") {
      keaktifan = false;
      setloadingubahaktif(true);
    } else if (status === "nonAktif") {
      keaktifan = true;
      setloadingubahnonaktif(true);
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/guestActivation`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data1.id,
        is_enabled: keaktifan,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setVisible(false);
          setVisiblenon(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setubahstatus((prev) => !prev);
          setTimeout(() => {
            if (status === "aktif") {
              setloadingubahaktif(false);
            } else if (status === "nonAktif") {
              setloadingubahnonaktif(false);
            }
          }, 500);
        } else if (!res2.success) {
          setVisible(false);
          setVisiblenon(false);
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setTimeout(() => {
            if (status === "aktif") {
              setloadingubahaktif(false);
            } else if (status === "nonAktif") {
              setloadingubahnonaktif(false);
            }
          }, 500);
        }
      });
  };
  const handleDeleteGuest = () => {
    if (!isAllowedToDeleteGuest) {
      permissionWarningNotification("Menghapus", "Guest");
      return;
    }

    setloadinghapus(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteGuest?id=${userid}`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setvisiblehapus(false);
        setloadinghapus(false);
        if (res2.success) {
          notification["success"]({
            message: "Akun Guest berhasil dihapus",
            duration: 3,
          });
          rt.push(`/admin/guests`);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetGuestDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Guest");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getGuestDetail?account_id=${userid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        var temp = {
          id: res2.data.id,
          name: res2.data.name,
          email: res2.data.email,
          phone_number: res2.data.phone_number,
          profile_image: generateStaticAssetUrl(res2.data.profile_image?.link),
          // profile_image:
          //   res2.data.profile_image === "" || res2.data.profile_image === "-"
          //     ? `/default-users.jpeg`
          //     : res2.data.profile_image,
        };
        setisenabled(res2.data.is_enabled);
        setData1(temp);
        var pathArr = rt.pathname.split("/").slice(1);
        pathArr.splice(2, 1);
        pathArr[pathArr.length - 1] = `Detail Profil Guest - ` + res2.data.name;
        setpatharr(pathArr);
        setnamarolearr(res2.data.roles);
        setpraloading(false);
        // return res2.data.roles
      });
  }, [ubahstatus, isAllowedToGetGuestDetail]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={patharr}
      sidemenu={sidemenu}
      dataDetailAccount={data1}
      st={st}
    >
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#formAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Detail Profil Guest</h1>
              <div className="flex space-x-2">
                <Link href={`/admin/guests`}>
                  <Button type="default">Kembali</Button>
                </Link>
                {
                  // [116, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                  <Button
                    disabled={praloading || !isAllowedToUpdateGuest}
                    type="primary"
                    onClick={() => {
                      rt.push(`/admin/guests/update/${data1.id}`);
                    }}
                  >
                    Ubah Profil
                  </Button>
                  // <Button type="primary" loading={loadingupdate} onClick={instanceForm.submit}>Save</Button>
                }
                {
                  <div className="w-full h-auto">
                    <Button
                      disabled={!isAllowedToDeleteGuest}
                      type="danger"
                      onClick={() => {
                        setvisiblehapus(true);
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                }
              </div>
            </div>
          </Sticky>
        </div>

        <div
          className=" col-span-1 md:col-span-4 flex flex-col"
          id="formAgentsWrapper"
        >
          <div className=" hidden md:block">
            <Tabs tabPosition={`left`} defaultActiveKey={"overview"}>
              <TabPane tab="Overview" key={`overview`}>
                <div className="shadow-lg flex flex-col rounded-md w-11/12 h-auto p-4 mb-5">
                  <div className="border-b border-black p-4 font-semibold mb-5 flex flex-row items-center">
                    <div className=" mr-3 md:mr-5 ">{data1.name}</div>
                    {
                      // [114].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                      <div className="">
                        {isenabled ? (
                          <Switch
                            disabled={praloading || !isAllowedToGuestActivation}
                            checked={true}
                            onChange={() => {
                              setVisible(true);
                            }}
                            checkedChildren={"AKTIF"}
                          ></Switch>
                        ) : (
                          <Switch
                            disabled={praloading || !isAllowedToGuestActivation}
                            checked={false}
                            onChange={() => {
                              setVisiblenon(true);
                            }}
                            unCheckedChildren={"NON-AKTIF"}
                          ></Switch>
                        )}
                      </div>
                    }
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                      <img
                        src={data1.profile_image}
                        alt="imageProfile"
                        className=" object-cover w-32 h-32 rounded-full mb-4"
                      />
                    </div>
                    <div className="p-3 col-span-1 md:col-span-3">
                      <div className="col-span-1 flex flex-col mb-5">
                        <h1 className="font-semibold text-sm">Nama Lengkap:</h1>
                        <h1 className="text-sm font-normal text-black">
                          {data1.name}
                        </h1>
                      </div>
                      <div className="col-span-1 flex flex-col mb-5">
                        <h1 className="font-semibold text-sm">Email:</h1>
                        <h1 className="text-sm font-normal text-black">
                          {data1.email}
                        </h1>
                      </div>
                      <div className="col-span-1 flex flex-col mb-5">
                        <h1 className="font-semibold text-sm">Role:</h1>
                        <div className=" flex items-center">
                          {namarolearr.map((doc, idx) => (
                            <div className=" p-2 rounded bg-primary100 bg-opacity-10 text-primary100 mr-2">
                              {doc.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              {/* <TabPane tab="Relationship" key={`relationship`}>
                <Relationship userid={userid} initProps={initProps} />
              </TabPane> */}
            </Tabs>
          </div>
          <div className=" block md:hidden">
            <Tabs tabPosition={`top`} defaultActiveKey={"overview"}>
              <TabPane tab="Overview" key={`overview`}>
                <div className="shadow-lg flex flex-col rounded-md w-11/12 h-auto p-4 mb-5">
                  <div className="border-b border-black p-4 font-semibold mb-5 flex">
                    <div className=" mr-3 md:mr-5 pt-1">{data1.name}</div>
                    {
                      // [114].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                      <div className="pt-1">
                        {isenabled ? (
                          <Switch
                            disabled={praloading || !isAllowedToGuestActivation}
                            checked={true}
                            onChange={() => {
                              setVisible(true);
                            }}
                            checkedChildren={"AKTIF"}
                          ></Switch>
                        ) : (
                          <Switch
                            disabled={praloading || !isAllowedToGuestActivation}
                            checked={false}
                            onChange={() => {
                              setVisiblenon(true);
                            }}
                            unCheckedChildren={"NON-AKTIF"}
                          ></Switch>
                        )}
                      </div>
                    }
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                      <img
                        src={data1.profile_image}
                        alt="imageProfile"
                        className=" object-cover w-32 h-32 rounded-full mb-4"
                      />
                    </div>
                    <div className="p-3 col-span-1 md:col-span-3">
                      <div className="col-span-1 flex flex-col mb-5">
                        <h1 className="font-semibold text-sm">Nama Lengkap:</h1>
                        <h1 className="text-sm font-normal text-black">
                          {data1.name}
                        </h1>
                      </div>
                      <div className="col-span-1 flex flex-col mb-5">
                        <h1 className="text-sm font-semibold">Email:</h1>
                        <h1 className="text-sm font-normal text-black">
                          {data1.email}
                        </h1>
                      </div>
                      <div className="col-span-1 flex flex-col mb-5">
                        <h1 className="font-semibold text-sm">Role:</h1>
                        <div className=" flex items-center">
                          {namarolearr.map((doc, idx) => (
                            <div className=" p-2 rounded bg-primary100 bg-opacity-10 text-primary100 mr-2">
                              {doc.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              {/* <TabPane tab="Relationship" key={`relationship`}>
                <Relationship userid={userid} initProps={initProps} />
              </TabPane> */}
            </Tabs>
          </div>

          <AccessControl hasPermission={GUEST_STATUS}>
            <Modal
              title="Konfirmasi untuk menon-aktifkan akun"
              visible={visible}
              onOk={() => {
                handleActivationRequesters("aktif");
              }}
              onCancel={() => setVisible(false)}
              okText="Ya"
              cancelText="Tidak"
              okButtonProps={{ loading: loadingubahaktif }}
            >
              Apakah anda yakin ingin menon-aktifkan akun guest{" "}
              <strong>{data1.name}</strong>?
            </Modal>
            <Modal
              title="Konfirmasi untuk mengakaktifkan akun"
              visible={visiblenon}
              onOk={() => {
                handleActivationRequesters("nonAktif");
              }}
              onCancel={() => setVisiblenon(false)}
              okText="Ya"
              cancelText="Tidak"
              okButtonProps={{ loading: loadingubahnonaktif }}
            >
              Apakah anda yakin ingin mengaktifkan akun guest{" "}
              <strong>{data1.name}</strong>?`
            </Modal>
          </AccessControl>

          <AccessControl hasPermission={GUEST_DELETE}>
            <Modal
              title="Konfirmasi untuk menghapus akun Guest"
              visible={visiblehapus}
              onOk={handleDeleteGuest}
              onCancel={() => setvisiblehapus(false)}
              okText="Ya"
              cancelText="Tidak"
              okButtonProps={{ loading: loadinghapus }}
            >
              Apakah anda yakin ingin menghapus akun guest{" "}
              <strong>{data1.name}</strong>?`
            </Modal>
          </AccessControl>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const userid = params.userId;
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
  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  return {
    props: {
      initProps,
      // dataDetailRequester,
      dataProfile,
      // dataRoles,
      sidemenu: "64",
      userid,
    },
  };
}

export default GuestDetail;
