import { LoadingOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Empty,
  Form,
  Input,
  Spin,
  Switch,
  TimePicker,
  notification,
} from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import InfiniteScroll from "react-infinite-scroll-component";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENT_BANKS_GET,
  COMPANY_CLIENT_BANK_ADD,
  COMPANY_CLIENT_BANK_DELETE,
  COMPANY_CLIENT_BANK_UPDATE,
  COMPANY_DETAIL_GET,
  COMPANY_LOG_GET,
  COMPANY_RELATIONSHIP_INVENTORIES_GET,
  COMPANY_STATUS,
  COMPANY_UPDATE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  getBase64,
  permissionWarningNotification,
} from "lib/helper";

import { CompanyService } from "apis/company";

import Buttonsys from "../../../components/button";
import DrawerBankClient from "../../../components/drawer/companies/clients/drawerClientCompanyBankCreate";
import DrawerCore from "../../../components/drawer/drawerCore";
import {
  BackIconSvg,
  CheckIconSvg,
  EditIconSvg,
  EmailIconSvg,
  LocationIconSvg,
  PhoneIconSvg,
  PlusIconSvg,
  RefreshIconSvg,
  SearchIconSvg,
  SettingsIconSvg,
  ShareIconSvg,
  SubLocationIconSvg,
  TrashIconSvg,
  WebIconSvg,
  XIconSvg,
} from "../../../components/icon";
import { InputRequired, RadioRequired } from "../../../components/input";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import {
  ModalEdit,
  ModalEditTag,
  ModalHapus,
  ModalStatus,
} from "../../../components/modal/modalCustom";
import { TableCustomRelasi } from "../../../components/table/tableCustom";
import { H1, H2, Label } from "../../../components/typography";
import httpcookie from "cookie";

const ClientDetail2 = ({ initProps, dataProfile, sidemenu, companyid }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetCompanyLog = hasPermission(COMPANY_LOG_GET);
  const isAllowedToUpdateCompany = hasPermission(COMPANY_UPDATE);
  const isAllowedToActivationCompany = hasPermission(COMPANY_STATUS);
  const isAllowedToGetCompanyDetail = hasPermission(COMPANY_DETAIL_GET);
  const isAllowedToGetRelationshipInventories = hasPermission(
    COMPANY_RELATIONSHIP_INVENTORIES_GET
  );
  /** Bank related stuff */
  const isAllowedToAddBank = hasPermission(COMPANY_CLIENT_BANK_ADD);
  const isAllowedToDeleteBank = hasPermission(COMPANY_CLIENT_BANK_DELETE);
  const isAllowedToUpdateBank = hasPermission(COMPANY_CLIENT_BANK_UPDATE);
  const isAllowedToGetListBank = hasPermission(COMPANY_CLIENT_BANKS_GET);

  const rt = useRouter();
  const axiosClient = useAxiosClient();
  const tok = initProps;

  const [instanceForm] = Form.useForm();
  var activeTab = "profile";
  const { active } = rt.query;
  if (active) {
    activeTab = active;
  }

  //useState
  const [patharr, setpatharr] = useState([]);
  const [refresh, setRefresh] = useState(-1);
  const [rawdata, setrawdata] = useState({
    id: "",
    name: "",
    address: "",
    phone_number: "",
    image_logo: "",
    singkatan: "",
    is_enabled: "",
    tanggal_pkp: null,
    penanggung_jawab: "",
    npwp: "",
    fax: "",
    email: "",
    website: "",
    check_in_time: null,
    autocheckout: null,
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
    company_logo: null, // File | null
    singkatan: "",
    tanggal_pkp: null,
    penanggung_jawab: "",
    npwp: "",
    fax: "",
    email: "",
    website: "",
    check_in_time: null,
    autocheckout: null,
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
  //EDIT PROFILE
  const [editable, seteditable] = useState(false);
  const [modaledit, setmodaledit] = useState(false);
  const [modalSaveTag, setModalSaveTag] = useState(false);
  const [praloadingedit, setpraloadingedit] = useState(true);
  const [editloading, seteditloading] = useState(false);
  const [loadingfoto, setloadingfoto] = useState(false);
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
  //STATUS
  const [modalstatus, setmodalstatus] = useState(false);
  const [isenabled, setisenabled] = useState(false);
  const [statusloading, setstatusloading] = useState(false);
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
  const [tagProyek, setTagProyek] = useState([]);
  const [queryParams, setQueryParams] = useQueryParams({
    name: withDefault(StringParam, undefined),
  });
  //   const tagProyek = [
  //     {
  //         name: "Proyek Absensi",
  //         age: 19,
  //     },
  //     {
  //         name: "Proyek Manajemen",
  //         age: 18,
  //     },
  //     {
  //         name: "Proyek Editorial",
  //         age: 20,
  //     },

  // ];

  const [dataTag, setDataTag] = useState([]);
  // const [dataTag,setDataTag]= useState([
  //   {
  //     id:1,
  //     name:'Proyek Rekrutmen',
  //   },
  //   {
  //     id:2,
  //     name:'Proyek Task Manajemen',
  //   },
  //   {
  //     id:3,
  //     name:'Proyek Dashboard Utama',
  //   },
  //   {
  //     id:4,
  //     name:'Proyek Mobile',
  //   },
  //   {
  //     id:5,
  //     name:'Proyek Prototyping',
  //   },
  //   {
  //     id:6,
  //     name:'Proyek Absensi',
  //   },
  //   {
  //     id:7,
  //     name:'Proyek Submisi Tugas',
  //   },
  //   {
  //     id:8,
  //     name:'Proyek Rekrutmen Ver 2',
  //   },
  //   {
  //     id:9,
  //     name:'Proyek Rekrutmen Talent',
  //   },
  // ]);
  const [dataTagSelected, setDataTagSelected] = useState([]);
  const [showTag, setShowTag] = useState(true);
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
    // {
    //     title: 'Opsi',
    //     dataIndex: 'option',
    //     render: (text, record, index) => {
    //         return {
    //             children:
    //                 <div className="flex items-center">
    //                     <div className="mx-1">
    //                         <Buttonsys type="default" onClick={() => {
    //                             setdataApiupdate({
    //                                 ...dataApiupdate,
    //                                 id: record.relationship.id,
    //                                 relationship_id: record.relationship_id,
    //                                 connected_ids: record.connected_id,
    //                                 is_inverse: record.is_inverse,
    //                                 from_inverse: !record.is_inverse
    //                             })
    //                             setdrawerupdaterelasi(true)
    //                         }}>
    //                             <EditIconSvg size={15} color={`#35763B`} />
    //                         </Buttonsys>
    //                     </div>
    //                     <div className="mx-1">
    //                         <Buttonsys type="default" color="danger" onClick={() => { setmodaldeleterelasi(true) }}>
    //                             <TrashIconSvg size={15} color={`#BF4A40`} />
    //                         </Buttonsys>
    //                     </div>
    //                 </div>
    //         }
    //     }
    // },
  ];

  //handler
  const onChangeInput = (e) => {
    setdisplaydata({
      ...displaydata,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeGambar = async (e) => {
    setloadingfoto(true);

    const blobFile = e.target.files[0];
    const base64Data = await getBase64(blobFile);

    setdisplaydata({
      ...displaydata,
      image_logo: base64Data,
      company_logo: blobFile,
    });

    setloadingfoto(false);
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
    if (!isAllowedToGetCompanyLog) {
      sethasmore(false);
      return;
    }

    if (logs.length >= rawlogs.total || logs.length === 0) {
      sethasmore(false);
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyLog?id=${displaydata.id}&page=${page}`,
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

    const updatePayload = { ...displaydata };
    if ("image_logo" in updatePayload) {
      delete updatePayload["image_logo"];
    }

    CompanyService.update(axiosClient, updatePayload)
      .then((response) => {
        const res2 = response.data;

        setmodaledit(false);
        seteditloading(false);
        if (res2.success) {
          seteditable(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setRefresh((prev) => prev + 1);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Terjadi kesalahan saat memperbarui company",
          duration: 3,
        });
      });
  };
  const handleStatus = () => {
    setstatusloading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companyActivation`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_id: Number(companyid),
        is_enabled: isenabled,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setmodalstatus(false);
        setstatusloading(false);
        if (res2.success) {
          seteditable(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/company/clients/${companyid}`);
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteClientBank?id=${hapusbankdata.id}`,
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
            rt.push(`/company/clients/${companyid}`);
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateClientBank`, {
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
            rt.push(`/company/clents/${companyid}`);
          }, 500);
        } else {
          notification["error"]({
            message: res2.erroInfo.status_detail,
            duration: 3,
          });
        }
      });
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetCompanyDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Company");
      setdisplaydata({
        name: "-",
        singkatan: "-",
        address: "-",
        penanggung_jawab: "-",
        tanggal_pkp: null,
        npwp: "-",
        email: "-",
        phone_number: "-",
        website: "-",
        image_logo: "/image/Company.png",
        fax: "-",
        check_in_time: null,
        autocheckout: null,
      });
      setpraloadingedit(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyDetail?id=${companyid}`,
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
        temp2[temp2.length - 1] = res2.data?.name ?? "-";
        setpatharr(temp2);
        setrawdata(res2.data);
        setdisplaydata({
          id: res2.data.id,
          name: res2.data.name,
          address: res2.data.address,
          phone_number: res2.data.phone_number,
          image_logo: generateStaticAssetUrl(res2.data.company_logo?.link),
          // image_logo:
          //   res2.data.image_logo === "-" || res2.data.image_logo === ""
          //     ? "/image/Company.png"
          //     : res2.data.image_logo,
          singkatan: res2.data.singkatan,
          tanggal_pkp: res2.data?.tanggal_pkp ?? null,
          penanggung_jawab: res2.data.penanggung_jawab,
          npwp: res2.data.npwp,
          fax: res2.data.fax,
          email: res2.data.email,
          website: res2.data.website,
          check_in_time: res2.data?.check_in_time ?? null,
          autocheckout: res2.data?.autocheckout ?? null,
        });
        setisenabled(res2.data.is_enabled);
        return res2.data.id;
      })
      .then((res3) => {
        if (!isAllowedToGetCompanyLog) {
          permissionWarningNotification(
            "Mendapatkan",
            "Riwayat Aktivitas Company"
          );
          setpraloadingedit(false);
          return;
        }

        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyLog?id=${companyid}&page=${page}`,
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
  }, [isAllowedToGetCompanyDetail, isAllowedToGetCompanyLog, refresh]);

  useEffect(() => {
    if (!isAllowedToGetListBank) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getClientBanks?id=${companyid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(tok),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setbanks(res2.data);
      });
  }, [bankloadinghapus, bankloadingedit, bankdrawer, isAllowedToGetListBank]);

  useEffect(() => {
    if (viewrelasi === true) {
      if (!isAllowedToGetRelationshipInventories) {
        permissionWarningNotification(
          "Mendapatkan",
          "Relasi Inventory Company"
        );
        return;
      }

      setloadingrelasi(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyRelationshipInventory?id=${companyid}&page=${pagerelasi}&rows=${rowsrelasi}`,
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
  }, [viewrelasi, isAllowedToGetRelationshipInventories]);

  // Get data tag project
  useEffect(() => {
    getDataTagProject();
  }, []);

  useEffect(() => {
    getListTagProject();
  }, [queryParams.name]);

  const getDataTagProject = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectCategoryListClient?id=${companyid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setTagProyek(res2.data);
        setDataTagSelected(res2.data);
      });
  };

  const getListTagProject = () => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectCategoryList${payload}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setDataTag(res2.data);
      });
  };

  const breadcrumbValues = useMemo(() => {
    const pageBreadcrumbValue = [
      { name: "Clients", hrefValue: "/company/clients" },
    ];

    if (rawdata?.name) {
      pageBreadcrumbValue.push({ name: rawdata.name });
    }

    return pageBreadcrumbValue;
  }, [rawdata]);

  const onClickProject = () => {
    if (showTag == true) {
      setShowTag(false);
    } else {
      if (dataTagSelected.length > 0) {
        setModalSaveTag(true);
      }
    }
  };

  const handleSaveTag = () => {
    let dataTemp = dataTagSelected;
    let dataIds = "";
    for (let a = 0; a < dataTemp.length; a++) {
      if (a != dataTemp.length - 1) {
        dataIds = dataIds + dataTemp[a].id + ",";
      } else {
        dataIds = dataIds + dataTemp[a].id;
      }
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProjectCategoryListClient?id=${companyid}`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categories_list_ids: dataIds,
        }),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setShowTag(true);
          setModalSaveTag(false);
          getDataTagProject();
        } else if (!res2.success) {
          setVisible(false);
          setVisiblenon(false);
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setModalSaveTag(false);
        }
      });
  };

  const onSelectTag = (name, value) => {
    let dataTemp = dataTagSelected;
    let dataNew = {
      id: value,
      name: name,
    };
    let check = false;
    if (dataTemp.length > 0) {
      for (let a = 0; a < dataTemp.length; a++) {
        if (dataTemp[a].id == value) {
          a = dataTemp.length;
          check = true;
        }
      }
    }
    if (dataTemp.length == 0 || check == false) {
      dataTemp.push(dataNew);
      setDataTagSelected([...dataTemp]);
    }
  };

  const onUnselectTag = (id) => {
    var filteredArray = dataTagSelected.filter((e) => e.id !== id);
    setDataTagSelected([...filteredArray]);
  };

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={patharr}
      st={st}
      idpage={companyid}
      fixedBreadcrumbValues={breadcrumbValues}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {praloadingedit ? null : (
          <div className="lg:col-span-3 flex flex-col shadow-md rounded bg-white mx-6 md:m-0">
            <Spin spinning={editloading}>
              <Form form={instanceForm} initialValues={displaydata}>
                <div className="max-h-24 relative">
                  <img
                    src={`/image/Rectangle.png`}
                    alt=""
                    className="object-fit max-h-24 w-full rounded-t"
                  />
                  <div className="absolute -bottom-1/2 left-1/2">
                    <div className="relative bg-white rounded-full -left-1/2">
                      <img
                        src={displaydata.image_logo}
                        alt=""
                        className="object-contain w-24 h-24 rounded-full "
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-14 flex flex-col justify-center text-center">
                  {editable && (
                    <div className=" flex mx-auto mb-5">
                      <Buttonsys
                        type="primaryInput"
                        onChangeGambar={onChangeGambar}
                      >
                        {loadingfoto ? (
                          <LoadingOutlined style={{ marginRight: `0.5rem` }} />
                        ) : (
                          <RefreshIconSvg size={15} color={`#ffffff`} />
                        )}
                        Atur Ulang
                      </Buttonsys>
                    </div>
                  )}
                  {editable ? (
                    <div className={`flex flex-col px-5`}>
                      <div className="flex justify-center">
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
                  <Label>{rawdata?.singkatan ?? "-"}</Label>
                </div>
                {editable ? (
                  <div className="flex flex-wrap justify-center items-center mt-5 gap-2">
                    <Buttonsys
                      type="default"
                      onClick={() => {
                        seteditable(false);
                        setdisplaydata(rawdata);
                      }}
                    >
                      <div className="flex space-x-2 whitespace-nowrap">
                        <XIconSvg size={15} color={`#35763B`} />
                        <p>Batalkan</p>
                      </div>
                    </Buttonsys>

                    <Buttonsys
                      type="primary"
                      submit={true}
                      onClick={() => {
                        instanceForm.submit();
                        setmodaledit(true);
                      }}
                      disabled={!isAllowedToUpdateCompany}
                    >
                      <div className="flex space-x-2">
                        <CheckIconSvg size={15} color={`#ffffff`} />
                        <p>Simpan</p>
                      </div>
                    </Buttonsys>
                  </div>
                ) : (
                  <div
                    className="mt-5 flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      seteditable(true);
                    }}
                  >
                    <div className="mr-1">
                      <EditIconSvg size={20} color={`#35763B`} />
                    </div>
                    <Label color="green">Sunting Profil</Label>
                  </div>
                )}
                <div className="mt-7 flex flex-col px-5">
                  <AccessControl hasPermission={COMPANY_STATUS}>
                    <div className="flex flex-col mb-5">
                      <Label>Status Perusahaan</Label>
                      {statusloading ? null : isenabled ? (
                        <div className="flex justify-between">
                          <p className="text-primary100 font-semibold mb-0">
                            Aktif
                          </p>
                          <Switch
                            defaultChecked={true}
                            disabled={!isAllowedToActivationCompany}
                            onChange={(checked) => {
                              setmodalstatus(true);
                              setisenabled(checked);
                              setstatusloading(true);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <p className="font-semibold mb-0">Non Aktif</p>
                          <Switch
                            defaultChecked={false}
                            disabled={!isAllowedToActivationCompany}
                            onChange={(checked) => {
                              setmodalstatus(true);
                              setisenabled(checked);
                              setstatusloading(true);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </AccessControl>

                  <div className={`flex flex-col mb-5`}>
                    <Label>Singkatan</Label>
                    {editable ? (
                      <Input
                        name="singkatan"
                        defaultValue={rawdata?.singkatan || "-"}
                        onChange={onChangeInput}
                      ></Input>
                    ) : (
                      <p className="mb-0">{rawdata?.singkatan || "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Alamat</Label>
                    {editable ? (
                      <Input
                        name="address"
                        onChange={onChangeInput}
                        defaultValue={rawdata?.address || "-"}
                      ></Input>
                    ) : (
                      <p className="mb-0">{rawdata?.address || "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Penanggung Jawab (PIC)</Label>
                    {editable ? (
                      <Input
                        name="penanggung_jawab"
                        onChange={onChangeInput}
                        defaultValue={rawdata?.penanggung_jawab || "-"}
                      ></Input>
                    ) : (
                      <p className="mb-0">{rawdata?.penanggung_jawab || "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Tanggal PKP</Label>
                    {editable ? (
                      <DatePicker
                        allowClear
                        onChange={(value, dateString) => {
                          setdisplaydata({
                            ...displaydata,
                            tanggal_pkp: dateString,
                          });
                        }}
                        defaultValue={
                          moment(rawdata?.tanggal_pkp).isValid()
                            ? moment(rawdata?.tanggal_pkp)
                            : null
                        }
                      ></DatePicker>
                    ) : (
                      <p className="mb-0">
                        {moment(rawdata?.tanggal_pkp).isValid()
                          ? moment(rawdata?.tanggal_pkp)
                              .locale("id")
                              .format("LL")
                          : "-"}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Jam Masuk</Label>
                    {editable ? (
                      <TimePicker
                        allowClear
                        onChange={(value, dateString) => {
                          setdisplaydata({
                            ...displaydata,
                            check_in_time: dateString,
                          });
                        }}
                        defaultValue={
                          moment(
                            displaydata.check_in_time,
                            "HH:mm:ss"
                          ).isValid()
                            ? moment(displaydata?.check_in_time, "HH:mm:ss")
                            : null
                        }
                        format={"HH:mm:ss"}
                      />
                    ) : (
                      <p className="mb-0">
                        {moment(rawdata.check_in_time, "HH:mm:ss").isValid() &&
                        rawdata.check_in_time !== "00:00:00"
                          ? rawdata?.check_in_time
                          : "-"}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>NPWP</Label>
                    {editable ? (
                      <Input
                        name="npwp"
                        onChange={onChangeInput}
                        defaultValue={rawdata?.npwp || "-"}
                      ></Input>
                    ) : (
                      <p className="mb-0">{rawdata?.npwp || "-"}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Email</Label>
                    {editable ? (
                      <Input
                        name="email"
                        onChange={onChangeInput}
                        prefix={<EmailIconSvg size={15} color={`#35763B`} />}
                        defaultValue={rawdata?.email || "-"}
                      ></Input>
                    ) : (
                      <div className="flex items-center">
                        <div className="mr-1">
                          <EmailIconSvg size={20} color={`#35763B`} />
                        </div>
                        <a
                          href={`mailto:${rawdata?.email}`}
                          className="text-primary100 hover:text-primary75 truncate"
                        >
                          {rawdata?.email || "-"}
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
                        defaultValue={rawdata?.phone_number || "-"}
                      ></Input>
                    ) : (
                      <div className="flex items-center">
                        <div className="mr-1">
                          <PhoneIconSvg size={20} color={`#35763B`} />
                        </div>
                        <a
                          href={`tel:${rawdata?.phone_number}`}
                          className="text-primary100 hover:text-primary75"
                        >
                          {rawdata?.phone_number || "-"}
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
                        defaultValue={rawdata?.website || "-"}
                      ></Input>
                    ) : (
                      <div className="flex items-center">
                        <div className="mr-1">
                          <WebIconSvg size={20} color={`#35763B`} />
                        </div>
                        <a
                          href={rawdata?.website}
                          target="_blank"
                          rel="external"
                          className="text-primary100 hover:text-primary75 truncate"
                        >
                          {rawdata?.website || "-"}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <Label>Auto Check-Out</Label>
                    {editable ? (
                      <div className="flex justify-between">
                        {displaydata?.autocheckout ? (
                          <p className="text-primary100 font-semibold mb-0">
                            Aktif
                          </p>
                        ) : (
                          <p className="font-semibold mb-0">Non Aktif</p>
                        )}

                        <Switch
                          defaultChecked={displaydata?.autocheckout}
                          onChange={(checked) => {
                            setdisplaydata({
                              ...displaydata,
                              autocheckout: Number(checked),
                            });
                          }}
                        />
                      </div>
                    ) : rawdata?.autocheckout ? (
                      <p className="text-primary100 font-semibold mb-0">
                        Aktif
                      </p>
                    ) : (
                      <p className="font-semibold mb-0">Non Aktif</p>
                    )}
                  </div>

                  {/* {editable && (
                    <div className="flex justify-center items-center mb-10">
                      <Buttonsys type="primary" color="danger">
                        <div className="mr-1">
                          <TrashIconSvg size={18} color={"#FFFFFF"} />
                        </div>
                        Hapus Lokasi
                      </Buttonsys>
                    </div>
                  )} */}
                </div>
              </Form>
              {/* Modal konfirmasi update tag */}
              <ModalEditTag
                title={`Konfirmasi Update Tag Project Perusahaan`}
                visible={modalSaveTag}
                onCancel={() => {
                  setModalSaveTag(false);
                }}
                footer={
                  <div className="flex justify-between items-center">
                    <Buttonsys
                      type="default"
                      setModalSaveTag={() => {
                        setModalSaveTag(false);
                      }}
                    >
                      Batalkan
                    </Buttonsys>
                    <Buttonsys type="primary" onClick={handleSaveTag}>
                      <CheckIconSvg size={15} color={`#ffffff`} />
                      Simpan
                    </Buttonsys>
                  </div>
                }
              ></ModalEditTag>
              <AccessControl hasPermission={COMPANY_UPDATE}>
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
                      <Buttonsys
                        type="primary"
                        onClick={handleEdit}
                        disabled={!isAllowedToUpdateCompany}
                      >
                        <CheckIconSvg size={15} color={`#ffffff`} />
                        Simpan
                      </Buttonsys>
                    </div>
                  }
                ></ModalEdit>
              </AccessControl>

              <AccessControl hasPermission={COMPANY_STATUS}>
                <ModalStatus
                  title={`Konfirmasi Ganti Status Perusahaan`}
                  visible={modalstatus}
                  onCancel={() => {
                    setmodalstatus(false);
                  }}
                  footer={
                    <div className="flex justify-between items-center">
                      <Buttonsys
                        type="default"
                        onClick={() => {
                          setmodalstatus(false);
                          setisenabled(rawdata?.is_enabled);
                          setstatusloading(false);
                        }}
                      >
                        Batalkan
                      </Buttonsys>
                      <Buttonsys
                        type="primary"
                        onClick={handleStatus}
                        disabled={!isAllowedToActivationCompany}
                      >
                        <CheckIconSvg size={15} color={`#ffffff`} />
                        Simpan
                      </Buttonsys>
                    </div>
                  }
                  checked={isenabled}
                ></ModalStatus>
              </AccessControl>
            </Spin>
          </div>
        )}
        <div className="lg:col-span-9 flex flex-col gap-5">
          {/* Location */}
          <div className="flex flex-col shadow-md rounded-md bg-white p-8 mx-6 md:mx-0">
            <div className="flex justify-between items-center">
              <H1>Lokasi</H1>
              <div
                onClick={() => {
                  rt.push(
                    `/company/clients/locations?id=${displaydata.id}&company_name=${displaydata.name}`
                  );
                }}
              >
                <Label color="green" cursor="pointer">
                  Lihat Semua
                </Label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-2">
              <div className="md:w-4/12 p-5 rounded-md bg-state2 flex justify-between items-center">
                <LocationIconSvg size={50} color={"#FFFFFF"} />
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-white font-bold mb-0">
                    <CountUp end={rawdata?.induk_level_1_count} />
                  </p>
                  <p className="text-sm text-white mb-0">Induk</p>
                </div>
              </div>
              <div className="md:w-4/12 p-5 rounded-md bg-state3 flex justify-between items-center">
                <SubLocationIconSvg size={50} color={"#FFFFFF"} />
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-white font-bold mb-0">
                    <CountUp end={rawdata?.induk_level_2_count} />
                  </p>
                  <p className="text-sm text-white mb-0">Sub Induk 1</p>
                </div>
              </div>
              <div className="md:w-4/12 p-5 rounded-md bg-state4 flex justify-between items-center">
                <SubLocationIconSvg size={50} color={"#FFFFFF"} />
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-white font-bold mb-0">
                    <CountUp end={rawdata?.induk_level_3_count} />
                  </p>
                  <p className="text-sm text-white mb-0">Sub Lokasi Induk 1</p>
                </div>
              </div>
            </div>
          </div>
          {viewrelasi ? (
            <div className="flex flex-col shadow-md rounded-md bg-white p-8 mx-6 md:mx-0 h-screen">
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
                {/* <div>
                                        <Buttonsys type="primary" onClick={() => { setdrawerlokasi(true) }}>
                                            + Tambah Relasi
                                        </Buttonsys>
                                    </div> */}
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
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-5 ">
              <div className="lg:w-6/12 flex flex-col mx-6 md:mx-0 gap-5">
                {/* Bank */}
                <div className="flex flex-col shadow-md rounded-md bg-white p-8">
                  <div className="flex justify-between items-center">
                    <H1>Akun Bank</H1>
                    <Buttonsys
                      type="primary"
                      disabled={!isAllowedToAddBank}
                      onClick={() => {
                        setbankdrawer(true);
                      }}
                    >
                      + Tambah Akun Bank
                    </Buttonsys>
                  </div>
                  {banks.map((doc, idx) => {
                    return (
                      <div key={doc.id} className="flex mt-5">
                        {/* <AtmMain idx={idx} from={doc.color_first} to={doc.color_second}></AtmMain> */}
                        <div
                          style={
                            doc.color_first == "from-state1" &&
                            doc.color_second == "to-state2"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(to top left, #799F0C, #FFE000)",
                                }
                              : doc.color_first == "from-state3" &&
                                doc.color_second == "to-state4"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(to top left, #6DD5ED, #2193B0)",
                                }
                              : doc.color_first == "from-red-200" &&
                                doc.color_second == "to-red-600"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(to top left, #fecaca, #dc2626)",
                                }
                              : {
                                  backgroundImage:
                                    "linear-gradient(to top left, #9333ea, #db2777)",
                                }
                          }
                          className={`w-5/12 h-28 rounded-md relative mr-3`}
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
                                  if (!isAllowedToUpdateMainBank) {
                                    permissionWarningNotification(
                                      "Memperbarui",
                                      "Bank"
                                    );
                                    return;
                                  }

                                  seteditbankdata({ ...doc });
                                  setbankdraweredit(true);
                                }}
                              >
                                <EditIconSvg size={15} color={`#35763B`} />
                              </div>
                              <div
                                className="mx-1 cursor-pointer"
                                onClick={() => {
                                  if (!isAllowedToDeleteMainBank) {
                                    permissionWarningNotification(
                                      "Menghapus",
                                      "Bank"
                                    );
                                    return;
                                  }

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
                  <AccessControl hasPermission={COMPANY_CLIENT_BANK_ADD}>
                    <DrawerBankClient
                      title={"Tambah Bank"}
                      visible={bankdrawer}
                      onClose={() => {
                        setbankdrawer(false);
                      }}
                      buttonOkText={"Simpan Bank"}
                      initProps={initProps}
                      onvisible={setbankdrawer}
                      companyid={companyid}
                    ></DrawerBankClient>
                  </AccessControl>

                  <AccessControl hasPermission={COMPANY_CLIENT_BANK_UPDATE}>
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
                                editbankdata.color_first ===
                                  "from-purple-600" && "border-primary100"
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
                  </AccessControl>

                  <AccessControl hasPermission={COMPANY_CLIENT_BANK_DELETE}>
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
                            disabled={!isAllowedToDeleteBank}
                          >
                            <TrashIconSvg size={15} color={`#ffffff`} />
                            Ya, saya yakin dan hapus bank
                          </Buttonsys>
                        </div>
                      }
                    ></ModalHapus>
                  </AccessControl>
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
                  {rawdata?.relationship_inventories.map((doc, idx) => {
                    if (idx <= 2) {
                      return (
                        <div key={idx} className="flex items-center mt-5">
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
              <div className="lg:w-6/12 flex flex-col mx-6 md:mx-0 gap-5">
                {/* TAG PROYEK */}
                <div className={"shadow-md rounded-md bg-white p-8 "}>
                  <div className="flex flex-row justify-between mb-6">
                    <H1>Tag Proyek</H1>
                    <div
                      className={
                        "rounded-[5px] py-2 px-6 flex justify-center items-center bg-primary100 hover:cursor-pointer"
                      }
                      onClick={() => onClickProject()}
                    >
                      {showTag ? (
                        <SettingsIconSvg color={"#F3F3F3"} size={16} />
                      ) : (
                        <CheckIconSvg color={"#ffffff"} size={16} />
                      )}
                      <p
                        className={
                          "ml-2 text-white text-[10px] font-medium leading-4 "
                        }
                      >
                        {showTag ? "Kelola Tag Proyek" : "Simpan Perubahan"}
                      </p>
                    </div>
                  </div>
                  {showTag ? (
                    <div>
                      {tagProyek.length == 0 ? (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <p
                              className={
                                "text-sm text-mono50 font-medium leading-6"
                              }
                            >
                              Belum ada tag proyek di perusahaan ini.
                            </p>
                          }
                        />
                      ) : (
                        <div className={"flex flex-row flex-wrap gap-2"}>
                          {tagProyek?.map((tag, idx) => (
                            <div
                              key={idx}
                              className={"bg-primary100 rounded-[5px] p-2"}
                            >
                              <p
                                className={
                                  "text-[10px] text-white font-bold leading-4"
                                }
                              >
                                {tag.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="w-full">
                        <Input
                          value={queryParams.name}
                          prefix={<SearchIconSvg size={16} color={"#CCCCCC"} />}
                          style={{ width: `100%` }}
                          onChange={(e) => {
                            setQueryParams({ name: e.target.value });
                          }}
                          placeholder="Cari proyek ...."
                          allowClear
                        />
                      </div>
                      <div className={"my-6"}>
                        <p
                          className={
                            "mb-2 text-xs font-medium leading-5 text-mono30"
                          }
                        >
                          Tag Proyek Tersedia
                        </p>
                        <div className={"flex flex-row flex-wrap gap-2"}>
                          {dataTag?.map((tag, idx) => (
                            <div
                              key={idx}
                              onClick={() => onSelectTag(tag.name, tag.id)}
                              className={
                                "flex px-2 py-1 gap-1 rounded-[5px] bg-mono80 hover:cursor-pointer"
                              }
                            >
                              <p
                                className={
                                  "text-[10px] font-normal leading-4 text-white"
                                }
                              >
                                {tag.name}
                              </p>
                              <PlusIconSvg size={16} color={"#ffffff"} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={""}>
                        <p
                          className={
                            "mb-2 text-xs font-medium leading-5 text-mono30"
                          }
                        >
                          Tag Proyek Dipilih
                        </p>
                        {dataTagSelected.length == 0 ? (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                              <p
                                className={
                                  "text-sm text-mono50 font-medium leading-6"
                                }
                              >
                                Tags masih kosong
                              </p>
                            }
                          />
                        ) : (
                          <div className={"flex flex-row flex-wrap gap-2"}>
                            {dataTagSelected?.map((tag, idx) => (
                              <div
                                key={idx}
                                onClick={() => onUnselectTag(tag.id)}
                                className={
                                  "bg-primary100 rounded-[5px] p-2 hover:cursor-pointer"
                                }
                              >
                                <p
                                  className={
                                    "text-[10px] text-white font-bold leading-4"
                                  }
                                >
                                  {tag.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className={"shadow-md rounded-md bg-white p-8 "}>
                  {/* Aktivitas */}
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
                                    {doc.causer.name}{" "}
                                    <strong>menambahkan</strong> lokasi{" "}
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
                                          .format("LL")}, ${moment(
                                          doc.created_at
                                        )
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
                                          .format("LL")}, ${moment(
                                          doc.created_at
                                        )
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
                                    {doc.causer.name}{" "}
                                    <strong>menambahkan</strong> akun{" "}
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
                                          .format("LL")}, ${moment(
                                          doc.created_at
                                        )
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
                                          .format("LL")}, ${moment(
                                          doc.created_at
                                        )
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
                                          .format("LL")}, ${moment(
                                          doc.created_at
                                        )
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const companyid = params.companyId;
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
      sidemenu: "52",
      companyid,
    },
  };
}

export default ClientDetail2;
