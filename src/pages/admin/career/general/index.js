import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Spin,
  Switch,
  Table,
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
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import CurrencyFormat from "react-currency-format";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  CAREERS_V2_APPLY_STATUSES,
  CAREERS_V2_GET,
  CAREER_ADD,
  CAREER_DELETE,
  CAREER_UPDATE,
  CAREER_V2_APPLY_EXPORT,
  CAREER_V2_APPLY_UPDATE,
  RECRUITMENTS_GET,
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
  RECRUITMENT_STAGES_LIST_GET,
  RECRUITMENT_STATUSES_LIST_GET,
  SIDEBAR_RECRUITMENT_SETUP,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import DrawerPelamarDetail from "../../../../components/drawer/career/DrawerPelamarDetail";
import {
  AddCareerIconSvg,
  DownIconSvg,
  DownloadIcon2Svg,
  DownloadIconSvg,
  EyeIconSvg,
  SearchIconSvg,
  ShowCareerIconSvg,
  UpIconSvg,
  UserPlusIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import {
  ModalEkspor,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
import {
  createKeyPressHandler,
  momentFormatDate,
} from "../../../../lib/helper";
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

const CareerGeneralIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToSetupRecruitment = hasPermission(SIDEBAR_RECRUITMENT_SETUP);
  const isAllowedToGetRecruitments = hasPermission(RECRUITMENTS_GET);
  const isAllowedToGetStatusApply = hasPermission(CAREERS_V2_APPLY_STATUSES);
  const isAllowedToGetCareer = hasPermission(CAREERS_V2_GET);
  const isAllowedToUpdateCareer = hasPermission(CAREER_UPDATE);
  const isAllowedToDeleteCareer = hasPermission(CAREER_DELETE);
  const isAllowedToAddCareer = hasPermission(CAREER_ADD);
  const isAllowedToGetRecruitmentRolesList = hasPermission(
    RECRUITMENT_ROLES_LIST_GET
  );
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const isAllowedToGetRecruitmentStatusesList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );
  const isAllowedToGetRecruitmentStagesList = hasPermission(
    RECRUITMENT_STAGES_LIST_GET
  );
  const isAllowedToGetRecruitmentJalurDaftarsList = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_LIST_GET
  );

  const canUpdateStatuses = hasPermission(CAREER_V2_APPLY_UPDATE);
  const [dataUpdateStatus, setDataUpdateStatus] = useState({
    id: null,
    recruitment_status_id: null,
    name: "",
    prev_recruitment_status_name: "",
    recruitment_status_name: "",
  });
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    keyword: withDefault(StringParam, undefined),
    // career_id: withDefault(NumberParam, undefined),
    career_apply_status_id: withDefault(NumberParam, undefined),
  });

  const [dataStatusList, setDataStatusList] = useState([
    {
      id: undefined,
      name: "All",
    },
    {
      id: 0,
      name: "Draft",
    },
    {
      id: 1,
      name: "Posted",
    },
  ]);

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);
  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 2, "Karir Manajemen", "Pelamar Tanpa Lowongan");
  // 2. Use state
  // 2.1. Role List & Candidate Count

  // filter search & selected options
  const [searchingFilterRecruitments, setSearchingFilterRecruitments] =
    useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [selectedName, setSelectedName] = useState(undefined);
  const [showCollapsible, setShowCollapsible] = useState(true);
  // table data
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [dataCareers, setDataCareers] = useState([]);
  const [dataRawRCareers, setDataRawCareers] = useState({
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
  //create
  const [dataStatusApply, setDataStatusApply] = useState([]);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );
  const [dataRoleTypeList, setDataRoleTypeList] = useState([]);
  //delete
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [featureselected, setfeatureselected] = useState("");
  const [dataExportStatus, setDataExportStatus] = useState({
    id: null,
    name: "",
  });
  const [modalExportStatus, setModalExportStatus] = useState(false);
  const canExportCandidate = hasPermission(CAREER_V2_APPLY_EXPORT);
  const [loadingEkspor, setLoadingEkspor] = useState(false);
  const [disableEkspor, setDisableEkspor] = useState(false);
  const [drawDetailPelamar, setDrawDetailPelamar] = useState(false);
  const [dataTerpilih, setDataTerpilih] = useState(null);
  const [refresh, setRefresh] = useState(-1);
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });

  // 3. UseEffect
  // 3.1. Get Recruitment Count

  //get data type role list
  useEffect(() => {
    if (!isAllowedToGetStatusApply) {
      permissionWarningNotification("Mendapatkan", "Daftar Status Apply");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareerApplyStatuses`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        // if (res2.success) {
        setDataStatusApply(res2);
        // } else {
        //     console.log('error apa ',res2)
        //     notification.error({
        //         message: `${res2.message}`,
        //         duration: 3,
        //     });
        // }
      })
      .catch((err) => {
        // notification.error({
        //     message: `${err.response}`,
        //     duration: 3,
        // });
      })
      .finally(() => {
        // setLoadingRoleTypeList(false);
      });
  }, [isAllowedToGetStatusApply]);

  // 3.3. Get Careers
  useEffect(() => {
    if (!isAllowedToGetCareer) {
      permissionWarningNotification("Mendapatkan", "Daftar Lowongan");
      setLoadingCareers(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      getCareers(payload);
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    isAllowedToGetCareer,
    searchingFilterRecruitments,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.career_apply_status_id,
    queryParams.keyword,
  ]);

  const getCareers = (params) => {
    setLoadingCareers(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareerApplys${params}&has_career=0`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawCareers(res2.data);
          setDataCareers(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingCareers(false);
      });
  };

  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setQueryParams({
      career_apply_status_id: selectedStatus,
      keyword: selectedName,
    });
  };

  const downloadNoData = () => {
    notification.error({
      message: `Pelamar tidak punya file resume`,
      duration: 3,
    });
  };

  const handleClickExportPelamar = (record) => {
    setDataExportStatus({
      id: record.id,
      name: record.name,
    });
    setModalExportStatus(true);
  };

  const handleClickDetailPelamar = (record) => {
    setDataTerpilih(record);
    setDrawDetailPelamar(true);
  };

  const handleUpdateExport = () => {
    const payload = {
      id: dataExportStatus.id,
    };

    if (!canExportCandidate) {
      permissionWarningNotification("Mengekspor", "Data Kandidat");
      setLoadingEkspor(false);
      return;
    }

    setLoadingEkspor(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/exportCareerApply`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setTimeout(() => {
            setDataExportStatus({});
          }, 1500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: `Gagal mengekspor data kandidat. ${res2.message}`,
            duration: 3,
          });
        }
        setLoadingEkspor(false);
        setModalExportStatus(false);
      })
      .catch((err) => {
        setLoadingEkspor(false);
        notification["error"]({
          message: `Gagal mengekspor data kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  // "Semua Kandidat" Table's columns
  const columnRecruitment = [
    {
      title: "No",
      key: "number",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawRCareers?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Tanggal Melamar",
      key: "created_at",
      dataIndex: "created_at",
      render: (text, record, index) => {
        return {
          children: <>{moment(text).format("DD MMMM YYYY")}</>,
        };
      },
    },
    {
      title: "Nama Pelamar",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
      sorter: isAllowedToGetCareer
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Kontak Pelamar",
      key: "phone",
      dataIndex: "phone",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Email Pelamar",
      key: "email",
      dataIndex: "email",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <select
                value={record.status?.id}
                className="rounded-md py-1 hover:cursor-pointer bg-bgstatuscareer2 px-2 customcareerselectstatus"
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  setDataUpdateStatus({
                    ...dataUpdateStatus,
                    id: record.id,
                    name: record.name,
                    prev_recruitment_status_name: record.status.name,
                    recruitment_status_name:
                      event.target.selectedOptions[0].text,
                    recruitment_status_id: Number(event.target.value),
                  });

                  setModalUpdateStatus(true);
                }}
                style={{
                  backgroundColor:
                    record.status?.id == 1
                      ? "#4D4D4D1A"
                      : record.status?.id == 2
                      ? "#35763B"
                      : "#BF4A40",
                  color: record.status?.id != 1 ? "white" : "#4D4D4D",
                }}
              >
                {dataStatusApply.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    style={{
                      backgroundColor:
                        status.id == 1
                          ? "#4D4D4D1A"
                          : status?.id == 2
                          ? "#35763B"
                          : "#BF4A40",
                      color: status.id != 1 ? "white" : "#4D4D4D",
                    }}
                  >
                    {status?.name}
                  </option>
                ))}
              </select>
            </>
          ),
        };
      },
    },
    {
      title: "Action",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className={"flex flex-row gap-2.5"}>
              <div
                onClick={() => handleClickExportPelamar(record)}
                className={
                  "p-2 rounded-[5px] bg-bgstatustaskfinish flex justify-center items-center hover:cursor-pointer"
                }
              >
                <UserPlusIconSvg size={20} color={"#35763B"} />
              </div>
              <div
                onClick={() => handleClickDetailPelamar(record)}
                className={
                  "p-2 rounded-[5px] bg-mono100 flex justify-center items-center hover:cursor-pointer"
                }
              >
                <EyeIconSvg size={20} color={"#808080"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const handleUpdateStatus = () => {
    const payload = {
      id: dataUpdateStatus.id,
      career_apply_status_id: dataUpdateStatus.recruitment_status_id,
    };

    if (!canUpdateStatuses) {
      permissionWarningNotification("Mengubah", "Status Kandidat");
      setLoadingUpdate(false);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareerApply`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setTimeout(() => {
            setDataUpdateStatus({});
          }, 1500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: `Gagal mengubah status kandidat. ${res2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
        setModalUpdateStatus(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah status kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:px-5 gap-6">
          {/* Table Kandidat */}
          <div
            className="lg:col-span-3 flex flex-col rounded-md bg-white p-5 mb-6"
            style={{ boxShadow: "0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className={"w-2/4 mb-2 lg:mb-0"}>
                <h4 className="mig-heading--4 ">
                  Daftar Pelamar Tanpa Lowongan
                </h4>
              </div>
              <div className={"flex flex-col md:flex-row gap-4 lg:w-2/4"}>
                <div className="w-full">
                  <Input
                    defaultValue={queryParams.keyword}
                    style={{ width: `100%` }}
                    placeholder="Cari Nama ..."
                    allowClear
                    onChange={(e) => {
                      setQueryParams({ keyword: e.target.value });
                      setSelectedName(e.target.value);
                    }}
                    // onKeyPress={onKeyPressHandler}
                    // disabled={!isAllowedToGetCareer}
                  />
                </div>
                <div className="w-full lg:w-1/2 customselectcareer">
                  <Select
                    defaultValue={queryParams.career_apply_status_id}
                    allowClear
                    name={`status`}
                    placeholder="Pilih Status"
                    style={{ width: `100%` }}
                    onChange={(value) => {
                      setQueryParams({ career_apply_status_id: value });
                      setSelectedStatus(value);
                    }}
                    suffixIcon={<DownIconSvg size={24} color={"#35763B"} />}
                  >
                    {dataStatusApply.map((status) => (
                      <Select.Option key={status.id} value={status.id}>
                        <div className="flex items-center">
                          <p className="truncate">{status.name}</p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className={"flex justify-end ml-8"}>
                  <ButtonSys
                    type={`primary`}
                    onClick={onFilterRecruitments}
                    disabled={!isAllowedToGetCareer}
                  >
                    <div className="flex flex-row space-x-2.5 w-full items-center">
                      <p>Simpan Filter</p>
                    </div>
                  </ButtonSys>
                </div>
              </div>
            </div>

            <div>
              <Table
                columns={columnRecruitment}
                dataSource={dataCareers}
                loading={loadingCareers}
                rowKey={(record) => record.id}
                pagination={{
                  current: queryParams.page,
                  pageSize: queryParams.rows,
                  total: dataRawRCareers?.total,
                  showSizeChanger: true,
                }}
                onChange={(pagination, filters, sorter, extra) => {
                  const sortTypePayload =
                    sorter.order === "ascend"
                      ? "asc"
                      : sorter.order === "descend"
                      ? "desc"
                      : undefined;

                  setQueryParams({
                    sort_type: sortTypePayload,
                    sort_by:
                      sortTypePayload === undefined ? undefined : sorter.field,
                    page: pagination.current,
                    rows: pagination.pageSize,
                  });
                }}
                scroll={{ x: 300 }}
              ></Table>
              {/* <TableCustomRecruitmentCandidate
                    dataSource={dataCareers}
                    columns={columnRecruitment}
                    loading={loadingCareers}
                    total={dataRawRCareers?.total}
                    isBulk={isBulk}
                    setSelectedRecruitments={setSelectedRecruitments}
                    setSelectedRecruitmentIds={setSelectedRecruitmentIds}
                    setDrawerShown={setPreviewDrawerShown}
                    tempIdClicked={tempIdClicked}
                    setTriggerRowClicked={setTriggerRowClicked}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                  /> */}
            </div>
          </div>
        </div>
      </div>
      <AccessControl hasPermission={CAREER_V2_APPLY_EXPORT}>
        <ModalEkspor
          title={`Konfirmasi Eksport`}
          visible={modalExportStatus}
          onvisible={setModalExportStatus}
          onOk={handleUpdateExport}
          onCancel={() => {
            setModalExportStatus(false);
            setDataExportStatus({});
          }}
          loading={loadingEkspor}
          disabled={disableEkspor}
        >
          <div className="space-y-4">
            <p className="">
              Anda akan melakukan eksport pada kandidat{" "}
              <strong>{dataExportStatus.name}</strong>
            </p>

            <p>Apakah Anda yakin ingin mengeksport?</p>
          </div>
        </ModalEkspor>
      </AccessControl>
      <AccessControl hasPermission={CAREERS_V2_GET}>
        <DrawerPelamarDetail
          title={"Informasi Pelamar"}
          visible={drawDetailPelamar}
          setDrawDetailPelamar={setDrawDetailPelamar}
          dataTerpilih={dataTerpilih}
        />
      </AccessControl>
      <AccessControl hasPermission={CAREERS_V2_GET}>
        <ModalUbah
          title={`Konfirmasi Perubahan`}
          visible={modalUpdateStatus}
          onvisible={setModalUpdateStatus}
          onOk={handleUpdateStatus}
          onCancel={() => {
            setModalUpdateStatus(false);
            setDataUpdateStatus({});
          }}
          loading={loadingUpdate}
          disabled={disableUpdate}
        >
          <div className="space-y-4">
            <p className="">
              Anda telah melakukan perubahan pada kandidat{" "}
              <strong>{dataUpdateStatus.name}</strong>
              &nbsp;pada item berikut
            </p>
            <p className="font-bold">
              {`Status ${dataUpdateStatus.prev_recruitment_status_name} → ${dataUpdateStatus.recruitment_status_name}`}
            </p>

            <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
          </div>
        </ModalUbah>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  let initProps = {};
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
      method: "GET",
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
      sidemenu: "career-management",
    },
  };
}

export default CareerGeneralIndex;
