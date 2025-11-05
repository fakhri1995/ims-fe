import {
  LoadingOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { color } from "@chakra-ui/react";
import {
  Button,
  Form,
  Input,
  Modal,
  Spin,
  Switch,
  Table,
  Tabs,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  AGENT_DELETE,
  AGENT_GET,
  AGENT_PASSWORD_UPDATE,
  AGENT_STATUS,
  AGENT_UPDATE,
  EMPLOYEE_ADD,
} from "lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";

import UserPicturUploadIcon from "assets/vectors/user-picture-upload.svg";

import ButtonSys from "../../../../../components/button";
import {
  ArrowLeftIconSvg,
  CheckIconSvg,
  DeleteTablerIconSvg,
  EditIconSvg,
  EditTablerIconSvg,
  LeftIconSvg,
  PlusIconSvg,
} from "../../../../../components/icon";
import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
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
      <p className={"text-[16px]/6 text-[#424242] font-inter font-bold mb-5"}>
        Relationship
      </p>
      {datatable.length > 0 && (
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
      )}
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

function AgentDetail({
  initProps,
  dataProfile,
  dataDetailRequester,
  userid,
  sidemenu,
}) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAgentDetail = hasPermission(AGENT_GET);
  const isAllowedToAgentActivation = hasPermission(AGENT_STATUS);
  const isAllowedToDeleteAgent = hasPermission(AGENT_DELETE);
  const isAllowedToUpdatePassword = hasPermission(AGENT_PASSWORD_UPDATE);
  const isAllowedToUpdateAgent = hasPermission(AGENT_UPDATE);
  const isAllowedToAddEmployee = hasPermission(EMPLOYEE_ADD);
  const [instanceForm] = Form.useForm();
  const [loadingubahpass, setloadingubahpass] = useState(false);
  const rt = useRouter();
  const [dataPassword, setDataPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const tok = initProps;
  const { TabPane } = Tabs;

  //STATE
  //data payload
  const [data1, setData1] = useState({
    id: "",
    name: "",
    role: "",
    phone_number: "",
    nip: "",
    profile_image: `/default-users.jpeg`,
    position: "",
    attendance_forms: [],
  });
  //data email
  const [dataemail, setdataemail] = useState("");
  const [sideActive, setSideActive] = useState("1");
  //data roles
  const [namarolearr, setnamarolearr] = useState([]);
  const [patharr, setpatharr] = useState([]);
  //custom breadcrumb
  const [isenabled, setisenabled] = useState(false);
  //nama company
  const [origincomp, setorigincomp] = useState("");
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
  const [loadingAddEmployee, setLoadingAddEmployee] = useState(false);

  const handleActivationRequesters = (status) => {
    var keaktifan = false;
    if (status === "aktif") {
      keaktifan = false;
      setloadingubahaktif(true);
    } else if (status === "nonAktif") {
      keaktifan = true;
      setloadingubahnonaktif(true);
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agentActivation`, {
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

  const handleDeleteAgent = () => {
    setloadinghapus(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAgent`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(userid),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setvisiblehapus(false);
        setloadinghapus(false);
        if (res2.success) {
          notification["success"]({
            message: "Akun Agent berhasil dihapus",
            duration: 3,
          });
          rt.push(`/admin/agents`);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  const onAddEmployeeButtonClicked = useCallback(() => {
    handleAddEmployee();
  }, []);

  const handleAddEmployee = () => {
    if (!isAllowedToAddEmployee) {
      permissionWarningNotification("Menambah", "Karyawan");
      return;
    }
    setLoadingAddEmployee(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeeFromUser`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: Number(userid),
      }),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setTimeout(() => {
            setLoadingAddEmployee(false);
            rt.push(
              `/admin/employees/create?id=${response2.data?.id}&prevpath=agent`
            );
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan karyawan. ${response2.message}`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingAddEmployee(false);
          }, 500);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan karyawan. ${err.response}`,
          duration: 3,
        });
        setLoadingAdd(false);
      });
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetAgentDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Agent");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAgentDetail?account_id=${userid}`,
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
          role: res2.data.roles,
          phone_number: res2.data.phone_number,
          nip: res2.data?.nip || "-",
          profile_image: generateStaticAssetUrl(res2.data.profile_image?.link),
          // profile_image:
          //   res2.data.profile_image === "" || res2.data.profile_image === "-"
          //     ? `/default-users.jpeg`
          //     : res2.data.profile_image,
          position: res2.data.position,
          attendance_forms: res2.data.attendance_forms,
        };
        setisenabled(res2.data.is_enabled);
        setData1(temp);
        setdataemail(res2.data.email);
        var pathArr = rt.pathname.split("/").slice(1);
        pathArr.splice(2, 1);
        pathArr[pathArr.length - 1] = `Detail Profil Agent - ` + res2.data.name;
        setpatharr(pathArr);
        setorigincomp(res2.data.company.name);
        setnamarolearr(res2.data.roles);
        setpraloading(false);
        // return res2.data.roles
      });
  }, [ubahstatus, isAllowedToGetAgentDetail]);

  const onChangeCreatePassword = (e) => {
    var val = e.target.value;
    console.log("e target ", e.target.name);
    setDataPassword((prev) => ({
      ...prev,
      [e.target.name]: val,
    }));
  };

  const handleChangePassword = async () => {
    try {
      const values = await instanceForm.validateFields();
      if (values) {
        console.log("isi values ", values);
        // setModalConfirm(true)
        sendPassword(values);
        // Kirim ke API
      }
    } catch (errorInfo) {
      console.log("❌ Form invalid:", errorInfo);
    }
  };

  const sendPassword = async (values) => {
    setloadingubahpass(true);
    const datapass = {
      id: Number(userid),
      new_password: values.new_password,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/changeAgentPassword`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapass),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingubahpass(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setSideActive("1");
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={patharr}
      sidemenu={sidemenu}
      dataDetailAccount={data1}
      st={st}
    >
      <div className="w-full bg-white rounded-[10px] border border-neutrals70 shadow-desktopCard">
        <Sticky containerSelectorFocus="#formAgentsWrapper">
          <div
            className={
              "px-5 bg-white py-5 border-b flex justify-between items-center"
            }
          >
            <div className={"flex gap-3"}>
              <div className={"hover:cursor-pointer"} onClick={() => rt.back()}>
                <ArrowLeftIconSvg color={"#808080"} size={20} />
              </div>

              <p
                className={"text-[16px]/6 font-bold font-inter text-[#424242]"}
              >
                {data1.name}
              </p>
            </div>
            {sideActive == "2" ? (
              <div className={"flex flex-row gap-3"}>
                <div
                  onClick={() => setSideActive("1")}
                  className={
                    "hover:cursor-pointer border border-primary100 text-primary100 rounded-[5px] h-[36px] w-[76px] flex justify-center items-center"
                  }
                >
                  <p className={"text-sm/4 font-inter font-normal"}>Cancel</p>
                </div>
                <div
                  onClick={() => !loadingubahpass && handleChangePassword()}
                  className={
                    "hover:cursor-pointer border bg-primary100 border-primary100 text-white rounded-[5px] h-[36px] w-[146px] gap-1.5 flex justify-center items-center"
                  }
                >
                  {loadingubahpass ? (
                    <LoadingOutlined />
                  ) : (
                    <CheckIconSvg size={16} />
                  )}
                  <p className={"text-sm/4 font-inter font-normal"}>
                    Save Password
                  </p>
                </div>
              </div>
            ) : (
              <div className={"flex gap-3"}>
                <div
                  onClick={() => {
                    setvisiblehapus(true);
                  }}
                  className={
                    "hover:cursor-pointer flex justify-center gap-3 items-center w-[137px] h-[36px] border border-[#BF4A40] text-[#BF4A40] rounded-[5px]"
                  }
                >
                  {loadinghapus ? (
                    <LoadingOutlined />
                  ) : (
                    <DeleteTablerIconSvg size={16} />
                  )}
                  <p className={"font-roboto font-medium text-sm/4"}>
                    Delete Agent
                  </p>
                </div>
                <div
                  onClick={() => {
                    rt.push(`/admin/agents/update/${data1.id}`);
                  }}
                  className={
                    "hover:cursor-pointer flex justify-center gap-3 items-center w-[114px] h-[36px] bg-primary100 rounded-[5px]"
                  }
                >
                  <EditTablerIconSvg size={16} color={"white"} />
                  <p className={"text-white font-roboto font-medium text-sm/4"}>
                    Edit Agent
                  </p>
                </div>
              </div>
            )}
          </div>
        </Sticky>
        <div className={"flex"}>
          <div className={"w-1/5 border-r p-5 flex flex-col gap-3"}>
            <div
              onClick={() => sideActive != "1" && setSideActive("1")}
              className={`${
                sideActive == "1"
                  ? "bg-[#EBF8FD] py-2 px-3 rounded-[100px] max-w-fit"
                  : null
              } hover:cursor-pointer`}
            >
              <p
                className={`${
                  sideActive == "1"
                    ? "text-[#03A0E3] font-bold"
                    : "text-[#4D4D4D] font-medium ml-3"
                } font-inter text-xs/5`}
              >
                Overview
              </p>
            </div>
            <div
              onClick={() => sideActive != "2" && setSideActive("2")}
              className={`${
                sideActive == "2"
                  ? "bg-[#EBF8FD] py-2 px-3 rounded-[100px] max-w-fit"
                  : null
              } hover:cursor-pointer`}
            >
              <p
                className={`${
                  sideActive == "2"
                    ? "text-[#03A0E3] font-bold"
                    : "text-[#4D4D4D] font-medium ml-3"
                } font-inter text-xs/5`}
              >
                Change Password
              </p>
            </div>
            <div
              onClick={() => sideActive != "3" && setSideActive("3")}
              className={`${
                sideActive == "3"
                  ? "bg-[#EBF8FD] py-2 px-3 rounded-[100px] max-w-fit"
                  : null
              } hover:cursor-pointer`}
            >
              <p
                className={`${
                  sideActive == "3"
                    ? "text-[#03A0E3] font-bold"
                    : "text-[#4D4D4D] font-medium ml-3"
                } font-inter text-xs/5`}
              >
                Relationship
              </p>
            </div>
          </div>
          <div className={"w-4/5 p-5"}>
            {sideActive == "1" && (
              <>
                <div
                  className={
                    "flex justify-between items-center border border-[#E6E6E6] p-5 rounded-[12px]"
                  }
                >
                  <div className={"flex gap-5"}>
                    {data1.profile_image ? (
                      <img
                        src={data1.profile_image}
                        alt="imageProfile"
                        className=" object-cover w-[74px] h-[74px] rounded-full"
                      />
                    ) : (
                      <UserPicturUploadIcon />
                    )}

                    <div className={"flex flex-col gap-[5px]"}>
                      <p
                        className={
                          "text-sm/6 font-bold font-inter text-[#4D4D4D]"
                        }
                      >
                        {data1.name}
                      </p>
                      <p
                        className={
                          "text-xs/5 font-medium font-inter text-[#808080]"
                        }
                      >
                        {data1.position}
                      </p>
                      <p
                        className={
                          "text-xs/5 font-medium font-inter text-[#808080]"
                        }
                      >
                        {origincomp}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={onAddEmployeeButtonClicked}
                    className={"hover:cursor-pointer flex gap-1.5 py-2.5 px-3"}
                  >
                    <PlusCircleOutlined
                      style={{ fontSize: 16, color: "#03A0E3" }}
                      size={16}
                      color={"#03A0E3"}
                    />
                    <p
                      className={
                        "text-[#03A0E3] text-sm/4 font-roboto font-medium"
                      }
                    >
                      Add to Employee
                    </p>
                  </div>
                </div>
                <div
                  className={"border border-[#E6E6E6] p-5 rounded-[12px] mt-5"}
                >
                  <p
                    className={
                      "text-[16px]/6 text-[#424242] font-inter font-bold"
                    }
                  >
                    Informasi Akun
                  </p>
                  <div className="mt-5">
                    {isenabled ? (
                      <div className={"flex flex-row gap-2.5"}>
                        <Switch
                          style={{ width: 32 }}
                          disabled={praloading}
                          checked={true}
                          onChange={() => {
                            setVisible(true);
                          }}
                          // checkedChildren={"AKTIF"}
                        />
                        <p
                          className={
                            "text-[#4D4D4D] font-normal font-inter text-sm/6"
                          }
                        >
                          Agent Active
                        </p>
                      </div>
                    ) : (
                      <div className={"flex flex-row gap-2.5"}>
                        <Switch
                          disabled={praloading}
                          checked={false}
                          onChange={() => {
                            setVisiblenon(true);
                          }}
                          // unCheckedChildren={"NON-AKTIF"}
                        />
                        <p
                          className={
                            "text-[#4D4D4D] font-normal font-inter text-sm/6"
                          }
                        >
                          Agent Non Active
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={"grid grid-cols-2 space-x-3 mt-5"}>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Full Name
                      </p>
                      <p
                        className={
                          "text-sm/6 text-[#4D4D4D] font-normal font-inter"
                        }
                      >
                        {data1.name}
                      </p>
                    </div>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Company
                      </p>
                      <p
                        className={
                          "text-sm/6 text-[#4D4D4D] font-normal font-inter"
                        }
                      >
                        {origincomp}
                      </p>
                    </div>
                  </div>
                  <div className={"grid grid-cols-2 space-x-3 mt-5"}>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Email
                      </p>
                      <p
                        className={
                          "text-sm/6 text-[#4D4D4D] font-normal font-inter"
                        }
                      >
                        {dataemail}
                      </p>
                    </div>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Position
                      </p>
                      <p
                        className={
                          "text-sm/6 text-[#4D4D4D] font-normal font-inter"
                        }
                      >
                        {data1.position}
                      </p>
                    </div>
                  </div>
                  <div className={"grid grid-cols-2 space-x-3 mt-5"}>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Phone Number
                      </p>
                      <p
                        className={
                          "text-sm/6 text-[#4D4D4D] font-normal font-inter"
                        }
                      >
                        {data1.phone_number}
                      </p>
                    </div>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        NIP
                      </p>
                      <p
                        className={
                          "text-sm/6 text-[#4D4D4D] font-normal font-inter"
                        }
                      >
                        {data1.nip}
                      </p>
                    </div>
                  </div>
                  <div className={"grid grid-cols-2 space-x-3 mt-5"}>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Activity Form
                      </p>
                      <div className=" flex flex-wrap items-center gap-2 ">
                        {data1.attendance_forms.map((doc, idx) => (
                          <div
                            key={doc.id}
                            className={
                              "text-[#35763B] text-xs/[18px] font-inter font-bold bg-[#35763B1A] py-1 px-3 rounded-[5px]"
                            }
                          >
                            {doc.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={"col-span-1"}>
                      <p
                        className={
                          "text-xs/5 font-normal font-inter text-[#808080]"
                        }
                      >
                        Account Role
                      </p>

                      <div className=" flex flex-wrap items-center gap-2 ">
                        {namarolearr.map((doc, idx) => (
                          <div
                            key={doc.id}
                            className={
                              "text-[#35763B] text-xs/[18px] font-inter font-bold bg-[#35763B1A] py-1 px-3 rounded-[5px]"
                            }
                          >
                            {doc.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {sideActive == "2" && (
              <div>
                <p
                  className={
                    "text-[16px]/6 text-[#424242] font-inter font-bold mb-4"
                  }
                >
                  Change Password
                </p>
                <Form
                  form={instanceForm}
                  layout="vertical"
                  name="agentForm"
                  className="updateAgentsForm col-span-2"
                  onValuesChange={(changedValues, allValues) => {
                    console.log("allvalues ", allValues);
                    setDataPassword(allValues);
                  }}
                >
                  <Form.Item
                    label="Current Password"
                    name="current_password"
                    className="w-1/2"
                    rules={[
                      { required: true, message: "Password must be filled" },
                      {
                        pattern: /^.{8,}$/,
                        message: "Password minimum 8 characters",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="new_password"
                    className="w-1/2"
                    rules={[
                      {
                        required: true,
                        message: "New Password must be filled",
                      },
                      {
                        pattern: /^.{8,}$/,
                        message: "New Password minimum 8 characters",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Confirm New Password"
                    name="confirm_new_password"
                    className="w-1/2"
                    dependencies={["new_password"]}
                    rules={[
                      {
                        required: true,
                        message: "Confirm New Password must be filled",
                      },
                      {
                        pattern: /^.{8,}$/,
                        message: "Confirm New Password minimum 8 characters",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("new_password") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Confirm password must match new password"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Form>
              </div>
            )}
            {sideActive == "3" && (
              <Relationship userid={userid} initProps={initProps} />
            )}
          </div>
          <AccessControl hasPermission={AGENT_STATUS}>
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
              Apakah anda yakin ingin menon-aktifkan akun agent{" "}
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
              Apakah anda yakin ingin mengaktifkan akun agent{" "}
              <strong>{data1.name}</strong>?`
            </Modal>
          </AccessControl>

          <AccessControl hasPermission={AGENT_DELETE}>
            <Modal
              title="Konfirmasi untuk menghapus akun Agent"
              visible={visiblehapus}
              onOk={handleDeleteAgent}
              onCancel={() => setvisiblehapus(false)}
              okText="Ya"
              cancelText="Tidak"
              okButtonProps={{ loading: loadinghapus }}
            >
              Apakah anda yakin ingin menghapus akun agent{" "}
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
      sidemenu: "61",
      userid,
    },
  };
}

export default AgentDetail;
