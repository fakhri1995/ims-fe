import Buttonsys from "../../../components/button";
import DrawerBank from "../../../components/drawer/companies/mycompany/drawerMyCompanyBankCreate";
import DrawerAddRelasi from "../../../components/drawer/companies/mycompany/drawerMyCompanyRelasiCreate";
import DrawerCore from "../../../components/drawer/drawerCore";
import {
  BackIconSvg,
  CheckIconSvg,
  EditIconSvg,
  EmailIconSvg,
  LocationIconSvg,
  PhoneIconSvg,
  ShareIconSvg,
  SubLocationIconSvg,
  TrashIconSvg,
  WebIconSvg,
} from "../../../components/icon";
import { InputRequired, RadioRequired } from "../../../components/input";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import ModalCore from "../../../components/modal/modalCore";
import { ModalEdit, ModalHapus } from "../../../components/modal/modalCustom";
import {
  TableCustom,
  TableCustomRelasi,
} from "../../../components/table/tableCustom";
import { H1, H2, Label } from "../../../components/typography";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Empty,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  TreeSelect,
  notification,
} from "antd";
import httpcookie from "cookie";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import InfiniteScroll from "react-infinite-scroll-component";

const MyCompanyIndex2 = ({ initProps, dataProfile, sidemenu }) => {
  const rt = useRouter();
  const tok = initProps;
  const [instanceForm] = Form.useForm();
  var activeTab = "profile";
  const { active } = rt.query;
  if (active) {
    activeTab = active;
  }

  //useState
  const [patharr, setpatharr] = useState([]);
  const [rawdata, setrawdata] = useState({
    id: "",
    name: "",
    address: "",
    phone_number: "",
    image_logo: "",
    singkatan: "",
    tanggal_pkp: moment(new Date()),
    penanggung_jawab: "",
    npwp: "",
    fax: "",
    email: "",
    website: "",
    role: "",
    induk_level_1_count: "",
    induk_level_2_count: "",
    induk_level_3_count: "",
    relationship_inventories: [],
  });
  const [displaydata, setdisplaydata] = useState({
    id: "",
    name: "",
    address: "",
    phone_number: "",
    image_logo: "",
    singkatan: "",
    tanggal_pkp: moment(new Date()),
    penanggung_jawab: "",
    npwp: "",
    fax: "",
    email: "",
    website: "",
  });
  const [hapusbankdata, sethapusbankdata] = useState({
    id: "",
  });
  const [editbankdata, seteditbankdata] = useState({
    id: "",
    name: "",
    account_number: "",
    owner: "",
    currency: "",
    color_first: "from-state1",
    color_second: "to-state2",
  });
  const [isenabled, setisenabled] = useState(false);
  //EDIT PROFILE
  const [editable, seteditable] = useState(false);
  const [modaledit, setmodaledit] = useState(false);
  const [praloadingedit, setpraloadingedit] = useState(true);
  const [editloading, seteditloading] = useState(false);
  //ACTIVITY
  const [rawlogs, setrawlogs] = useState({
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
  const [logs, setlogs] = useState([]);
  const [hasmore, sethasmore] = useState(true);
  const [page, setpage] = useState(1);
  //BANKS
  const [banks, setbanks] = useState([]);
  //create
  const [bankdrawer, setbankdrawer] = useState(false);
  //edit
  const [bankdraweredit, setbankdraweredit] = useState(false);
  const [bankloadingedit, setbankloadingedit] = useState(false);
  //delete
  const [bankmodalhapus, setbankmodalhapus] = useState(false);
  const [bankloadinghapus, setbankloadinghapus] = useState(false);
  //RELASI
  const [viewrelasi, setviewrelasi] = useState(false);
  const [datarawrelasi, setdatarawrelasi] = useState({
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
  const [datarelasi, setdatarelasi] = useState([]);
  const [pagerelasi, setpagerelasi] = useState(1);
  const [rowsrelasi, setrowsrelasi] = useState(6);
  const [loadingrelasi, setloadingrelasi] = useState(false);
  const [drawerelasi, setdrawerelasi] = useState(false);
  //relasi-update
  const [drawerupdaterelasi, setdrawerupdaterelasi] = useState(false);
  const [fetchingmodel, setfetchingmodel] = useState(false);
  const [dataupdaterelasi, setdataupdaterelasi] = useState({
    id: null,
    subject_id: null,
    relationship_id: null,
    connected_id: null,
    is_inverse: null,
    relationship: {
      id: null,
      relationship_type: "",
      inverse_relationship_type: "",
    },
    inventory: {},
  });
  const [dataApiupdate, setdataApiupdate] = useState({
    id: null,
    relationship_id: null,
    connected_id: null,
    backup_connected_id: null,
    is_inverse: null,
    from_inverse: null,
    type_id: null,
  });
  const [displaydatarelations, setdisplaydatarelations] = useState([]);
  const [relationnameupdate, setrelationnameupdate] = useState("");
  const [relationnameddupdate, setrelationnameddupdate] = useState(false);
  const [relationselectedidxupdate, setrelationselectedidxupdate] =
    useState(-1);
  const [relationselectedisinverseupdate, setrelationselectedisinverseupdate] =
    useState(-1);
  const [detailtipeupdate, setdetailtipeupdate] = useState(-9);
  const [detailtipedataupdate, setdetailtipedataupdate] = useState([]);
  const [disabledupdate, setdisabledupdate] = useState(true);
  const [loadingupdate, setloadingupdate] = useState(false);
  const [sublocdata, setsublocdata] = useState(null);
  const [subloctrig, setsubloctrig] = useState(-1);
  const [triggerupdaterelasi, settriggerupdaterelasi] = useState(0);
  //relasi-delete
  const [datadeleterelasi, setdatadeleterelasi] = useState({
    id: null,
    subject_id: null,
    relationship_id: null,
    connected_id: null,
    is_inverse: null,
    relationship: {
      id: null,
      relationship_type: "",
      inverse_relationship_type: "",
    },
    inventory: {},
  });
  const [modaldeleterelasi, setmodaldeleterelasi] = useState(false);
  const [loadingdeleterelasi, setloadingdeleterelasi] = useState(false);
  const [triggerdeleterelasi, settriggerdeleterelasi] = useState(0);

  //columns table items
  const columnrelasi = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawrelasi.from + index}</>,
        };
      },
    },
    {
      title: "Tipe Relasi",
      dataIndex: "relationship_type",
      render: (text, record, index) => {
        return {
          children: <>{record.relationship_name}</>,
        };
      },
      sorter: (a, b) => a.mig_id - b.mig_id,
    },
    {
      title: "Nama Model",
      dataIndex: "model_name",
      render: (text, record, index) => {
        return {
          children: <>{record.model_name}</>,
        };
      },
    },
    {
      title: "Lokasi",
      dataIndex: "location_inventory",
      render: (text, record, index) => {
        return {
          children: <>{record.location_name}</>,
        };
      },
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
                    setdataApiupdate({
                      ...dataApiupdate,
                      id: record.id,
                      relationship_id: record.relationship_id,
                      connected_id: record.connected_id,
                      backup_connected_id: record.connected_id,
                      is_inverse: record.is_inverse,
                      from_inverse: record.from_inverse,
                      type_id: -3,
                    });
                    setrelationnameupdate(record.relationship_name);
                    setrelationselectedidxupdate(
                      displaydatarelations
                        .map((doc, idx) => ({ ...doc, index: idx }))
                        .filter(
                          (doc, idx) => doc.id === record.relationship_id
                        )[0].index
                    );
                    setrelationselectedisinverseupdate(!record.is_inverse);
                    setdetailtipeupdate(-3);
                    setdrawerupdaterelasi(true);
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
                    setmodaldeleterelasi(true);
                    setdatadeleterelasi(record);
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

  //handler
  const onChangeInput = (e) => {
    setdisplaydata({
      ...displaydata,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeInputBankEdit = (e) => {
    seteditbankdata({
      ...editbankdata,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeRadioBankEdit = (e) => {
    seteditbankdata({
      ...editbankdata,
      [e.target.name]: e.target.value,
    });
  };
  const fetchDataMoreLogs = () => {
    if (logs.length >= rawlogs.total || logs.length === 0) {
      sethasmore(false);
    } else {
      fetch(
        `https://boiling-thicket-46501.herokuapp.com/getCompanyLog?id=${displaydata.id}&page=${page}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(tok),
          },
        }
      )
        .then((res4) => res4.json())
        .then((res5) => {
          setlogs((prev) => prev.concat(res5.data.data));
          setpage((prev) => prev + 1);
        });
    }
  };
  const handleEdit = () => {
    if (displaydata.address === "") {
      setdisplaydata({
        ...displaydata,
        address: "-",
      });
    }
    if (displaydata.phone_number === "") {
      setdisplaydata({
        ...displaydata,
        phone_number: "-",
      });
    }
    seteditloading(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainCompany`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(displaydata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setmodaledit(false);
        seteditloading(false);
        if (res2.success) {
          seteditable(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/company/myCompany`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleDeleteBank = () => {
    setbankloadinghapus(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/deleteMainBank?id=${hapusbankdata.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setbankloadinghapus(false);
        setbankmodalhapus(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/company/myCompany`);
          }, 500);
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleEditBank = () => {
    setbankloadingedit(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainBank`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editbankdata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setbankloadingedit(false);
        setbankdraweredit(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/company/myCompany`);
          }, 500);
        } else {
          notification["error"]({
            message: res2.erroInfo.status_detail,
            duration: 3,
          });
        }
      });
  };
  const handleUpdateRelationshipItem = () => {
    setloadingupdate(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/updateRelationshipInventory`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataApiupdate),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setloadingupdate(false);
        setdrawerupdaterelasi(false);
        settriggerupdaterelasi((prev) => prev + 1);
        if (res2.success) {
          setdataApiupdate({
            subject_id: Number(dataProfile.data.company.id),
            relationship_id: null,
            is_inverse: null,
            type_id: null,
            connected_id: null,
            backup_connected_id: null,
          });
          setrelationnameupdate("");
          setsublocdata(null);
          setrelationselectedidxupdate(-1);
          setrelationselectedisinverseupdate(-1);
          setsubloctrig(-1);
          notification["success"]({
            message: "Relationship Item berhasil ditambahkan",
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
  const handleDeleteRelationshipItem = () => {
    setloadingdeleterelasi(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/deleteRelationshipInventory`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(datadeleterelasi.id),
        }),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setloadingdeleterelasi(false);
        setmodaldeleterelasi(false);
        settriggerdeleterelasi((prev) => prev + 1);
        if (res2.success) {
          notification["success"]({
            message: "Relationship Company berhasil dihapus",
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

  //useEffect
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationships`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdisplaydatarelations(res2.data);
      });
  }, []);
  useEffect(() => {
    if (subloctrig !== -1) {
      fetch(
        `https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${subloctrig}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setsublocdata(res2.data.children);
        });
    } else if (detailtipeupdate !== -10) {
      fetch(
        `https://boiling-thicket-46501.herokuapp.com/getFilterInventories`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setdetailtipedataupdate(res2.data);
          // dataApiupdate.type_id === -3 && setdetailtipedataupdate([res2.data])
          // dataApiupdate.type_id === -1 && setdetailtipedataupdate(res2.data)
          // dataApiupdate.type_id === -2 && setdetailtipedataupdate(res2.data)
          // dataApiupdate.type_id === -4 && setdetailtipedataupdate(res2.data.data)
        });
    }
  }, [detailtipeupdate, subloctrig]);

  //useEffect
  useEffect(() => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getCompanyDetail?id=${dataProfile.data.company.id}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(tok),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        var temp2 = rt.pathname.split("/").slice(1);
        temp2[temp2.length - 1] = res2.data.name;
        setpatharr(temp2);
        setrawdata(res2.data);
        setdisplaydata({
          id: res2.data.id,
          name: res2.data.name,
          address: res2.data.address,
          phone_number: res2.data.phone_number,
          image_logo:
            res2.data.image_logo === "-" || res2.data.image_logo === ""
              ? "/image/Company.png"
              : res2.data.image_logo,
          singkatan: res2.data.singkatan,
          tanggal_pkp:
            res2.data.tanggal_pkp === null
              ? moment(new Date())
              : moment(res2.data.tanggal_pkp),
          penanggung_jawab: res2.data.penanggung_jawab,
          npwp: res2.data.npwp,
          fax: res2.data.fax,
          email: res2.data.email,
          website: res2.data.website,
        });
        setisenabled(res2.data.is_enabled);
        return res2.data.id;
      })
      .then((res3) => {
        fetch(
          `https://boiling-thicket-46501.herokuapp.com/getCompanyLog?id=${res3}&page=${page}`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(tok),
            },
          }
        )
          .then((res4) => res4.json())
          .then((res5) => {
            setrawlogs(res5.data);
            setlogs(res5.data.data);
            setpage((prev) => prev + 1);
            setpraloadingedit(false);
          });
      });
  }, []);
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(tok),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setbanks(res2.data);
      });
  }, [bankloadinghapus, bankloadingedit, bankdrawer]);
  useEffect(() => {
    if (viewrelasi === true) {
      setloadingrelasi(true);
      fetch(
        `https://boiling-thicket-46501.herokuapp.com/getCompanyRelationshipInventory?id=${dataProfile.data.company.id}&page=${pagerelasi}&rows=${rowsrelasi}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setdatarawrelasi(res2.data);
          setdatarelasi(res2.data.data);
          setloadingrelasi(false);
        });
    }
  }, [viewrelasi, drawerelasi, triggerdeleterelasi, triggerupdaterelasi]);
  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={patharr}
      st={st}
    >
      <div className="grid grid-cols-12">
        {praloadingedit ? null : (
          <div className="col-span-3 flex flex-col shadow-md rounded bg-white m-3">
            <Spin spinning={editloading}>
              <Form form={instanceForm} initialValues={displaydata}>
                <div className="max-h-24 relative">
                  <img
                    src={`/image/Rectangle.png`}
                    alt=""
                    className="object-fit max-h-24 w-full rounded-t"
                  />
                  <div className="absolute -bottom-1/2 bg-white left-28 rounded-full">
                    <img
                      src={displaydata.image_logo}
                      alt=""
                      className="object-contain w-24 h-24 rounded-full"
                    />
                  </div>
                </div>
                <div className="mt-14 flex flex-col justify-center text-center">
                  {editable ? (
                    <div className={`flex flex-col px-5`}>
                      <div className="flex">
                        <Label>Nama Perusahaan</Label>
                        <span className="namaField"></span>
                        <style jsx>
                          {`
                                            .namaField::before{
                                                content: '*';
                                                color: red;
                                            }
                                        `}
                        </style>
                      </div>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Nama Perusahaan wajib diisi",
                          },
                        ]}
                      >
                        <Input name="name" onChange={onChangeInput}></Input>
                      </Form.Item>
                    </div>
                  ) : (
                    <H1>{displaydata.name ?? "-"}</H1>
                  )}
                  <Label>{displaydata.singkatan}</Label>
                </div>
                {editable ? (
                  <div className="flex justify-center items-center mt-5">
                    <div
                      className="mx-1"
                      onClick={() => {
                        seteditable(false);
                      }}
                    >
                      <Buttonsys type="default">X Batalkan</Buttonsys>
                    </div>
                    <div className="mx-1" onClick={() => {}}>
                      <Buttonsys
                        type="primary"
                        submit={true}
                        onClick={() => {
                          instanceForm.submit();
                          setmodaledit(true);
                        }}
                      >
                        <CheckIconSvg size={15} color={`#ffffff`} />
                        Simpan
                      </Buttonsys>
                    </div>
                  </div>
                ) : (
                  <div
                    className="mt-5 flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      seteditable(true);
                    }}
                  >
                    <div className="mr-1 mb-1">
                      <EditIconSvg size={20} color={`#35763B`} />
                    </div>
                    <Label color="green">Sunting Profil</Label>
                  </div>
                )}
                <div className="mt-7 flex flex-col px-5">
                  <div className="flex flex-col mb-5">
                    <Label>Status Perusahaan</Label>
                    {isenabled ? (
                      <div className="flex justify-between">
                        <p className="text-primary100 font-semibold mb-0">
                          Aktif
                        </p>
                        <Switch defaultChecked={true} disabled />
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <p className="font-semibold mb-0">Non Aktif</p>
                        <Switch defaultChecked={false} disabled />
                      </div>
                    )}
                  </div>
                  <div className={`flex flex-col mb-5`}>
                    <Label>Singkatan</Label>
                    {editable ? (
                      <Input
                        name="singkatan"
                        defaultValue={displaydata.singkatan ?? "-"}
                        onChange={onChangeInput}
                      ></Input>
                    ) : (
                      <p className="mb-0">{displaydata.singkatan ?? "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Alamat</Label>
                    {editable ? (
                      <Input
                        name="address"
                        onChange={onChangeInput}
                        defaultValue={displaydata.address ?? "-"}
                      ></Input>
                    ) : (
                      <p className="mb-0">{displaydata.address ?? "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Penanggung Jawab (PIC)</Label>
                    {editable ? (
                      <Input
                        name="penanggung_jawab"
                        onChange={onChangeInput}
                        defaultValue={displaydata.penanggung_jawab ?? "-"}
                      ></Input>
                    ) : (
                      <p className="mb-0">
                        {displaydata.penanggung_jawab ?? "-"}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Tanggal PKP</Label>
                    {editable ? (
                      <DatePicker
                        onChange={(value, dateString) => {
                          setdisplaydata({
                            ...displaydata,
                            tanggal_pkp: dateString,
                          });
                        }}
                        defaultValue={
                          displaydata.tanggal_pkp === "-"
                            ? null
                            : moment(displaydata.tanggal_pkp)
                        }
                      ></DatePicker>
                    ) : (
                      <p className="mb-0">
                        {displaydata.tanggal_pkp === "-"
                          ? "-"
                          : moment(displaydata.tanggal_pkp)
                              .locale("id")
                              .format("LL")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>NPWP</Label>
                    {editable ? (
                      <Input
                        name="npwp"
                        onChange={onChangeInput}
                        defaultValue={displaydata.npwp ?? "-"}
                      ></Input>
                    ) : (
                      <p className="mb-0">{displaydata.npwp ?? "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Email</Label>
                    {editable ? (
                      <Input
                        name="email"
                        onChange={onChangeInput}
                        prefix={<EmailIconSvg size={15} color={`#35763B`} />}
                        defaultValue={displaydata.email ?? "-"}
                      ></Input>
                    ) : (
                      <div className="flex">
                        <div className="mr-1">
                          <EmailIconSvg size={20} color={`#35763B`} />
                        </div>
                        <a
                          href={`mailto:${displaydata.email}`}
                          className="text-primary100 hover:text-primary75"
                        >
                          {displaydata.email}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>No.Telp</Label>
                    {editable ? (
                      <Input
                        name="phone_number"
                        onChange={onChangeInput}
                        prefix={<PhoneIconSvg size={15} color={`#35763B`} />}
                        defaultValue={displaydata.phone_number ?? "-"}
                      ></Input>
                    ) : (
                      <div className="flex">
                        <div className="mr-1">
                          <PhoneIconSvg size={20} color={`#35763B`} />
                        </div>
                        <a
                          href={`tel:${displaydata.phone_number}`}
                          className="text-primary100 hover:text-primary75"
                        >
                          {displaydata.phone_number}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Website</Label>
                    {editable ? (
                      <Input
                        name="website"
                        onChange={onChangeInput}
                        prefix={<WebIconSvg size={15} color={`#35763B`} />}
                        defaultValue={displaydata.website ?? "-"}
                      ></Input>
                    ) : (
                      <div className="flex">
                        <div className="mr-1">
                          <WebIconSvg size={20} color={`#35763B`} />
                        </div>
                        <a
                          href={`${displaydata.website}`}
                          className="text-primary100 hover:text-primary75"
                        >
                          {displaydata.website}
                        </a>
                      </div>
                    )}
                  </div>
                  {editable && (
                    <div className="flex justify-center items-center mb-10">
                      <Buttonsys type="primary" color="danger">
                        <div className="mr-1">
                          <TrashIconSvg size={18} color={"#FFFFFF"} />
                        </div>
                        Hapus Lokasi
                      </Buttonsys>
                    </div>
                  )}
                </div>
              </Form>
              <ModalEdit
                title={`Konfirmasi Edit Perusahaan`}
                visible={modaledit}
                onCancel={() => {
                  setmodaledit(false);
                }}
                footer={
                  <div className="flex justify-between items-center">
                    <Buttonsys
                      type="default"
                      onClick={() => {
                        setmodaledit(false);
                      }}
                    >
                      Batalkan
                    </Buttonsys>
                    <Buttonsys type="primary" onClick={handleEdit}>
                      <CheckIconSvg size={15} color={`#ffffff`} />
                      Simpan
                    </Buttonsys>
                  </div>
                }
              ></ModalEdit>
            </Spin>
          </div>
        )}
        <div className="col-span-9 m-3 flex flex-col">
          {/* Location */}
          <div className="flex flex-col shadow-md rounded-md bg-white p-8 mb-5 mx-2">
            <div className="flex justify-between items-center">
              <H1>Lokasi</H1>
              <div
                onClick={() => {
                  rt.push(`/company/myCompany/locations?id=${displaydata.id}`);
                }}
              >
                <Label color="green" cursor="pointer">
                  Lihat Semua
                </Label>
              </div>
            </div>
            <div className="flex mt-5">
              <div className="w-4/12 p-5 rounded-md bg-state2 flex justify-between items-center mx-2">
                <LocationIconSvg size={50} color={"#FFFFFF"} />
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-white font-bold mb-0">
                    <CountUp end={rawdata.induk_level_1_count} />
                  </p>
                  <p className="text-sm text-white mb-0">Induk</p>
                </div>
              </div>
              <div className="w-4/12 p-5 rounded-md bg-state3 flex justify-between items-center mx-2">
                <SubLocationIconSvg size={50} color={"#FFFFFF"} />
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-white font-bold mb-0">
                    <CountUp end={rawdata.induk_level_2_count} />
                  </p>
                  <p className="text-sm text-white mb-0">Sub Induk 1</p>
                </div>
              </div>
              <div className="w-4/12 p-5 rounded-md bg-state4 flex justify-between items-center mx-2">
                <SubLocationIconSvg size={50} color={"#FFFFFF"} />
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-white font-bold mb-0">
                    <CountUp end={rawdata.induk_level_3_count} />
                  </p>
                  <p className="text-sm text-white mb-0">Sub Lokasi Induk 1</p>
                </div>
              </div>
            </div>
          </div>
          {viewrelasi ? (
            <div className="flex flex-col shadow-md rounded-md bg-white p-8 mx-2 h-screen">
              <div className="flex justify-between items-center mb-5">
                <div className="flex">
                  <div
                    className="mr-2 cursor-pointer"
                    onClick={() => {
                      setviewrelasi(false);
                    }}
                  >
                    <BackIconSvg size={15} color={`#000000`} />
                  </div>
                  <H1>Relasi</H1>
                </div>
                <div>
                  <Buttonsys
                    type="primary"
                    onClick={() => {
                      setdrawerelasi(true);
                    }}
                  >
                    + Tambah Relasi
                  </Buttonsys>
                </div>
              </div>
              <div>
                <TableCustomRelasi
                  dataSource={datarelasi}
                  setDataSource={setdatarelasi}
                  columns={columnrelasi}
                  loading={loadingrelasi}
                  setpraloading={setloadingrelasi}
                  pageSize={rowsrelasi}
                  total={datarawrelasi.total}
                  initProps={initProps}
                  setpage={setpagerelasi}
                  id={dataProfile.data.company.id}
                  setdataraw={setdatarawrelasi}
                />
              </div>
              <DrawerAddRelasi
                title={"Tambah Relasi"}
                visible={drawerelasi}
                onClose={() => {
                  setdrawerelasi(false);
                }}
                buttonOkText={"Simpan Relasi"}
                initProps={initProps}
                onvisible={setdrawerelasi}
                id={dataProfile.data.company.id}
              />
              <DrawerCore
                title={"Edit Relasi"}
                visible={drawerupdaterelasi}
                onClose={() => {
                  /*console.log(dataApiadd)*/ setdrawerupdaterelasi(false);
                }}
                buttonOkText={"Simpan Relasi"}
                onClick={handleUpdateRelationshipItem}
              >
                <Spin spinning={loadingupdate}>
                  <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                      <p className="mb-0">
                        Relationship Type <span className="namapart"></span>
                      </p>
                      <div
                        className="w-full border p-2 hover:border-primary100 rounded-sm flex items-center justify-between cursor-pointer"
                        onClick={() => {
                          setrelationnameddupdate((prev) => !prev);
                        }}
                      >
                        <p className="mb-0">{relationnameupdate}</p>
                        {relationnameddupdate ? (
                          <UpOutlined style={{ color: `rgb(229,231,235)` }} />
                        ) : (
                          <DownOutlined style={{ color: `rgb(229,231,235)` }} />
                        )}
                      </div>
                      {relationnameddupdate ? (
                        <div className="flex flex-col">
                          <div className="flex">
                            <div className="bg-gray-200 font-semibold p-3 w-6/12">
                              Relationship Type
                            </div>
                            <div className="bg-gray-200 font-semibold p-3 w-6/12">
                              Inverse Relationship Type
                            </div>
                          </div>
                          {displaydatarelations.map((doc, idx) => {
                            return (
                              <div className="flex">
                                <div
                                  className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${
                                    relationselectedidxupdate === idx &&
                                    relationselectedisinverseupdate === false
                                      ? " bg-primary50"
                                      : "bg-white"
                                  }`}
                                  onClick={(e) => {
                                    setrelationnameddupdate(false);
                                    setrelationnameupdate(
                                      doc.relationship_type
                                    );
                                    setdataApiupdate({
                                      ...dataApiupdate,
                                      relationship_id: doc.id,
                                      is_inverse: false,
                                    });
                                    doc.id === null ||
                                    dataApiupdate.type_id === null
                                      ? setdisabledadd(true)
                                      : setdisabledadd(false);
                                    setrelationselectedidxupdate(idx);
                                    setrelationselectedisinverseupdate(false);
                                  }}
                                >
                                  {doc.relationship_type}
                                </div>
                                <div
                                  className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${
                                    relationselectedidxupdate === idx &&
                                    relationselectedisinverseupdate === true
                                      ? " bg-primary50"
                                      : "bg-white"
                                  }`}
                                  onClick={(e) => {
                                    setrelationnameddupdate(false);
                                    setrelationnameupdate(
                                      doc.inverse_relationship_type
                                    );
                                    setdataApiupdate({
                                      ...dataApiupdate,
                                      relationship_id: doc.id,
                                      is_inverse: true,
                                    });
                                    doc.id === null ||
                                    dataApiupdate.type_id === null
                                      ? setdisabledadd(true)
                                      : setdisabledadd(false);
                                    setrelationselectedidxupdate(idx);
                                    setrelationselectedisinverseupdate(true);
                                  }}
                                >
                                  {doc.inverse_relationship_type}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                      <style jsx>
                        {`
                                                        .namapart::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                      </style>
                    </div>
                    <div className="flex flex-col mb-3">
                      <p className="mb-0">Item</p>
                      <Select
                        allowClear
                        value={dataApiupdate.connected_id}
                        showSearch
                        optionFilterProp="children"
                        notFoundContent={
                          fetchingmodel ? <Spin size="small" /> : null
                        }
                        onSearch={(value) => {
                          setfetchingmodel(true);
                          fetch(
                            `https://boiling-thicket-46501.herokuapp.com/getFilterInventories?keyword=${
                              value !== "" ? value : ""
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
                              setdetailtipedataupdate(res2.data);
                              setfetchingmodel(false);
                            });
                        }}
                        // filterOption={(input, opt) => (
                        //     opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // )}
                        onChange={(value) => {
                          setdataApiupdate({
                            ...dataApiupdate,
                            connected_id: value,
                            backup_connected_id: value,
                          });
                        }}
                      >
                        {detailtipedataupdate.map((doc, idx) => {
                          return (
                            <Select.Option value={doc.id}>
                              {doc.mig_id} - {doc.model_name} - {doc.asset_name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                    {/* <div className="flex flex-col mb-3">
                                                <p className="mb-0">Tipe <span className="tipepart"></span></p>
                                                <Select disabled value={dataApiupdate.type_id} onChange={(value) => {
                                                    setdataApiupdate({ ...dataApiupdate, type_id: value })
                                                    dataApiupdate.relationship_id === null || value === null ? setdisabledadd(true) : setdisabledadd(false)
                                                    setdetailtipeupdate(value)
                                                }}>
                                                    <Select.Option value={-1}>Agent</Select.Option>
                                                    <Select.Option value={-2}>Requester</Select.Option>
                                                    <Select.Option value={-3}>Company</Select.Option>
                                                    <Select.Option value={-4}>Asset Type</Select.Option>
                                                </Select>
                                                <style jsx>
                                                    {`
                                                        .tipepart::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                                                </style>
                                            </div> */}
                    {/* {
                                                dataApiupdate.type_id !== null ?
                                                    <>
                                                        {
                                                            dataApiupdate.type_id === -3 &&
                                                            <div className="flex flex-col mb-3">
                                                                <p className="mb-0">Detail Tipe</p>
                                                                <TreeSelect value={dataApiupdate.backup_connected_id === null ? null : dataApiupdate.backup_connected_id} treeDefaultExpandedKeys={[1]} treeData={detailtipedataupdate} onChange={(value, label, extra) => {
                                                                    setdataApiupdate({ ...dataApiupdate, connected_id: value, backup_connected_id: value })
                                                                    setsubloctrig(value)
                                                                }}></TreeSelect>
                                                            </div>
                                                        }
                                                    </>
                                                    :
                                                    null

                                            } */}
                    {/* {
                                                sublocdata !== null &&
                                                <div className="flex flex-col mb-3">
                                                    <p className="mb-0">Detail Tipe (Sublokasi)</p>
                                                    <TreeSelect multiple allowClear treeData={sublocdata} onChange={(value, label, extra) => {
                                                        if (value.length === 0) {
                                                            setdataApiupdate({ ...dataApiupdate, connected_id: dataApiupdate.backup_connected_id })
                                                        }
                                                        else {
                                                            setdataApiupdate({ ...dataApiupdate, connected_id: value })
                                                        }
                                                    }}></TreeSelect>
                                                </div>
                                            } */}
                  </div>
                </Spin>
              </DrawerCore>
              <ModalCore
                title={"Konfirmasi Hapus Relasi"}
                visible={modaldeleterelasi}
                onCancel={() => {
                  setmodaldeleterelasi(false);
                }}
                footer={
                  <Spin spinning={loadingdeleterelasi}>
                    <div className="flex justify-between items-center">
                      <Buttonsys
                        type="default"
                        color="danger"
                        onClick={() => {
                          setmodaldeleterelasi(false);
                        }}
                      >
                        Batalkan
                      </Buttonsys>
                      <Buttonsys
                        type="primary"
                        color="danger"
                        onClick={handleDeleteRelationshipItem}
                      >
                        <TrashIconSvg size={15} color={`#ffffff`} />
                        Ya, saya yakin dan hapus relasi
                      </Buttonsys>
                    </div>
                  </Spin>
                }
                loading={loadingdeleterelasi}
              >
                Apakah Anda yakin ingin melanjutkan penghapusan relasi{" "}
                <strong>{datadeleterelasi.relationship_name}</strong>?
              </ModalCore>
            </div>
          ) : (
            <div className="flex">
              <div className="w-6/12 flex flex-col mx-2">
                {/* Bank */}
                <div className="flex flex-col shadow-md rounded-md bg-white p-8 mb-5">
                  <div className="flex justify-between items-center">
                    <H1>Akun Bank</H1>
                    <div
                      onClick={() => {
                        setbankdrawer(true);
                      }}
                    >
                      <Buttonsys type="primary">+ Tambah Akun Bank</Buttonsys>
                    </div>
                  </div>
                  {banks.map((doc, idx) => {
                    return (
                      <div className="flex mt-5">
                        {/* <AtmMain idx={idx} from={doc.color_first} to={doc.color_second}></AtmMain> */}
                        <div
                          className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${doc.color_first} ${doc.color_second} relative mr-3`}
                        >
                          <div className="absolute bottom-0 right-2">
                            <img
                              src="/image/visa.png"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="w-7/12 flex flex-col justify-between">
                          <div className="flex justify-between w-full items-center">
                            <H2>{doc.name ?? "-"}</H2>
                            <div className="flex">
                              <div
                                className="mx-1 cursor-pointer"
                                onClick={() => {
                                  seteditbankdata({ ...doc });
                                  setbankdraweredit(true);
                                }}
                              >
                                <EditIconSvg size={15} color={`#35763B`} />
                              </div>
                              <div
                                className="mx-1 cursor-pointer"
                                onClick={() => {
                                  sethapusbankdata({
                                    ...hapusbankdata,
                                    id: doc.id,
                                  });
                                  setbankmodalhapus(true);
                                }}
                              >
                                <TrashIconSvg size={15} color={`#BF4A40`} />
                              </div>
                            </div>
                          </div>
                          <div className=" flex flex-col">
                            <Label>
                              ***
                              {doc.account_number.slice(
                                doc.account_number.length - 4,
                                doc.account_number.length
                              )}{" "}
                              - {doc.owner}
                            </Label>
                            <Label>{doc.currency ?? "-"}</Label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <DrawerBank
                    title={"Tambah Bank"}
                    visible={bankdrawer}
                    onClose={() => {
                      setbankdrawer(false);
                    }}
                    buttonOkText={"Simpan Bank"}
                    initProps={initProps}
                    onvisible={setbankdrawer}
                  ></DrawerBank>
                  <DrawerCore
                    title={`Edit Bank`}
                    visible={bankdraweredit}
                    onClose={() => {
                      setbankdraweredit(false);
                    }}
                    buttonOkText={`Simpan Bank`}
                    onClick={handleEditBank}
                  >
                    <Spin spinning={bankloadingedit}>
                      <div className="flex flex-col">
                        <div className="flex justify-center items-center mb-5">
                          {/* <AtmBank from={editbankdata.color_first} to={editbankdata.color_second}></AtmBank> */}
                          <div
                            className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${editbankdata.color_first} ${editbankdata.color_second} relative mr-3`}
                          >
                            <div className="absolute bottom-0 right-2">
                              <img
                                src="/image/visa.png"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center mb-10">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state1 to-state2 border cursor-pointer ${
                              editbankdata.color_first === "from-state1" &&
                              "border-primary100"
                            } mx-2`}
                            onClick={() => {
                              seteditbankdata({
                                ...editbankdata,
                                color_first: "from-state1",
                                color_second: "to-state2",
                              });
                            }}
                          ></div>
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state3 to-state4 border cursor-pointer ${
                              editbankdata.color_first === "from-state3" &&
                              "border-primary100"
                            } mx-2`}
                            onClick={() => {
                              seteditbankdata({
                                ...editbankdata,
                                color_first: "from-state3",
                                color_second: "to-state4",
                              });
                            }}
                          ></div>
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-tl from-red-200 to-red-600 border cursor-pointer ${
                              editbankdata.color_first === "from-red-200" &&
                              "border-primary100"
                            } mx-2`}
                            onClick={() => {
                              seteditbankdata({
                                ...editbankdata,
                                color_first: "from-red-200",
                                color_second: "to-red-600",
                              });
                            }}
                          ></div>
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-tl from-purple-600 to-pink-600 border cursor-pointer ${
                              editbankdata.color_first === "from-purple-600" &&
                              "border-primary100"
                            } mx-2`}
                            onClick={() => {
                              seteditbankdata({
                                ...editbankdata,
                                color_first: "from-purple-600",
                                color_second: "to-pink-600",
                              });
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-col ">
                          <InputRequired
                            name="name"
                            defaultValue={editbankdata.name}
                            onChangeInput={onChangeInputBankEdit}
                            label="Nama Bank"
                          ></InputRequired>
                          <InputRequired
                            name="account_number"
                            defaultValue={editbankdata.account_number}
                            onChangeInput={onChangeInputBankEdit}
                            label="Nomor Rekening"
                          ></InputRequired>
                          <InputRequired
                            name="owner"
                            defaultValue={editbankdata.owner}
                            onChangeInput={onChangeInputBankEdit}
                            label="Nama Pemegang Rekening"
                          ></InputRequired>
                          <RadioRequired
                            name="currency"
                            label="Mata Uang"
                            defaultValue={editbankdata.currency}
                            onChangeRadio={onChangeRadioBankEdit}
                            options={[
                              {
                                value: "IDR",
                                title: "IDR",
                              },
                              {
                                value: "USD",
                                title: "USD",
                              },
                            ]}
                          ></RadioRequired>
                        </div>
                      </div>
                    </Spin>
                  </DrawerCore>
                  <ModalHapus
                    title={`Konfirmasi Hapus Bank`}
                    visible={bankmodalhapus}
                    onCancel={() => {
                      setbankmodalhapus(false);
                    }}
                    footer={
                      <div className="flex justify-between items-center">
                        <Buttonsys
                          type="default"
                          color="danger"
                          onClick={() => {
                            setbankmodalhapus(false);
                          }}
                        >
                          Batalkan
                        </Buttonsys>
                        <Buttonsys
                          type="primary"
                          color="danger"
                          onClick={handleDeleteBank}
                        >
                          <TrashIconSvg size={15} color={`#ffffff`} />
                          Ya, saya yakin dan hapus bank
                        </Buttonsys>
                      </div>
                    }
                  ></ModalHapus>
                </div>
                {/* Relationship */}
                <div className="flex flex-col shadow-md rounded-md bg-white p-8 h-full">
                  <div className="flex justify-between items-center">
                    <H1>Relasi</H1>
                    <div
                      onClick={() => {
                        setviewrelasi(true);
                      }}
                    >
                      <Label color="green" cursor="pointer">
                        Lihat Semua
                      </Label>
                    </div>
                  </div>
                  {rawdata.relationship_inventories.map((doc, idx) => {
                    if (idx <= 2) {
                      return (
                        <div className="flex items-center mt-5">
                          <ShareIconSvg size={25} color={`#000000`} />
                          <div className="flex flex-col ml-2">
                            <H2>{doc.relationship_total}</H2>
                            <Label>{doc.relationship_name}</Label>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {/* Aktivitas */}
              <div className="w-6/12 flex flex-col shadow-md rounded-md bg-white p-8 mx-2">
                <div className="mb-8">
                  <H1>Aktivitas</H1>
                </div>
                <div className="h-screen overflow-auto">
                  {praloadingedit ? (
                    <>
                      <Spin />
                    </>
                  ) : logs.length === 0 ? (
                    <>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </>
                  ) : (
                    <InfiniteScroll
                      dataLength={logs.length}
                      next={fetchDataMoreLogs}
                      hasMore={hasmore}
                      loader={
                        <>
                          <Spin />
                        </>
                      }
                      endMessage={
                        <div className="flex justify-center text-center">
                          <Label>Sudah Semua</Label>
                        </div>
                      }
                    >
                      {logs.map((doc, idx) => {
                        var tanggalan =
                          (new Date() - new Date(doc.created_at)) /
                          (1000 * 60 * 60 * 24);
                        var aksi = "";
                        const type = doc.subjectable_type.split("\\");
                        if (type[1] === "Company") {
                          if (doc.log_name === "Created") {
                            return (
                              <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                  {doc.causer.name} <strong>menambahkan</strong>{" "}
                                  lokasi <strong>{doc.subjectable.name}</strong>
                                </p>
                                <Label>
                                  {tanggalan < 1
                                    ? `Hari ini, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`
                                    : `${moment(doc.created_at)
                                        .locale("id")
                                        .format("dddd")} ${moment(
                                        doc.created_at
                                      )
                                        .locale("id")
                                        .format("LL")}, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`}
                                </Label>
                              </div>
                            );
                          }
                          if (doc.log_name === "Updated") {
                            return (
                              <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                  {doc.causer.name} <strong>mengubah</strong>{" "}
                                  informasi profil perusahaan
                                </p>
                                <Label>
                                  {tanggalan < 1
                                    ? `Hari ini, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`
                                    : `${moment(doc.created_at)
                                        .locale("id")
                                        .format("dddd")} ${moment(
                                        doc.created_at
                                      )
                                        .locale("id")
                                        .format("LL")}, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`}
                                </Label>
                              </div>
                            );
                          }
                        } else if (type[1] === "Bank") {
                          if (doc.log_name === "Created") {
                            return (
                              <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                  {doc.causer.name} <strong>menambahkan</strong>{" "}
                                  akun <strong>{doc.subjectable.name}</strong>
                                </p>
                                <Label>
                                  {tanggalan < 1
                                    ? `Hari ini, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`
                                    : `${moment(doc.created_at)
                                        .locale("id")
                                        .format("dddd")} ${moment(
                                        doc.created_at
                                      )
                                        .locale("id")
                                        .format("LL")}, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`}
                                </Label>
                              </div>
                            );
                          } else if (doc.log_name === "Updated") {
                            return (
                              <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                  {doc.causer.name} <strong>mengubah</strong>{" "}
                                  informasi akun{" "}
                                  <strong>{doc.subjectable.name}</strong>
                                </p>
                                <Label>
                                  {tanggalan < 1
                                    ? `Hari ini, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`
                                    : `${moment(doc.created_at)
                                        .locale("id")
                                        .format("dddd")} ${moment(
                                        doc.created_at
                                      )
                                        .locale("id")
                                        .format("LL")}, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`}
                                </Label>
                              </div>
                            );
                          } else if (doc.log_name === "Deleted") {
                            return (
                              <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                  {doc.causer.name} <strong>menghapus</strong>{" "}
                                  akun <strong>{doc.subjectable.name}</strong>
                                </p>
                                <Label>
                                  {tanggalan < 1
                                    ? `Hari ini, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`
                                    : `${moment(doc.created_at)
                                        .locale("id")
                                        .format("dddd")} ${moment(
                                        doc.created_at
                                      )
                                        .locale("id")
                                        .format("LL")}, ${moment(doc.created_at)
                                        .locale("id")
                                        .format(`LT`)}`}
                                </Label>
                              </div>
                            );
                          }
                        }
                      })}
                    </InfiniteScroll>
                  )}
                </div>
              </div>
            </div>
          )}
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "51",
    },
  };
}

export default MyCompanyIndex2;
