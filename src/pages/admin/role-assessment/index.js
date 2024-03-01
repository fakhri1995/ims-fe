import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Modal, Spin, notification } from "antd";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery, useQueryClient } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  ASSESSMENTS_GET,
  ASSESSMENT_ADD,
  ASSESSMENT_COUNT_GET,
  ASSESSMENT_DELETE,
  ASSESSMENT_GET,
  ASSESSMENT_UPDATE,
} from "lib/features";

import ButtonSys from "../../../components/button";
import { ChartVerticalBar } from "../../../components/chart/chartCustom";
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerAssessmentCreate from "../../../components/drawer/resume/drawerAssessmentCreate";
import DrawerAssessmentUpdate from "../../../components/drawer/resume/drawerAssessmentUpdate";
import { ClipboardIconSvg, UsersIconSvg } from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
import { TableCustomRoleAssessment } from "../../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../../components/typography";
import {
  createKeyPressHandler,
  permissionWarningNotification,
} from "../../../lib/helper";
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

const RoleAssessmentIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRoleAssessmentList = hasPermission(ASSESSMENTS_GET);
  const isAllowedToGetRoleAssessmentCount = hasPermission(ASSESSMENT_COUNT_GET);
  const isAllowedToAddRoleAssessment = hasPermission(ASSESSMENT_ADD);
  const isAllowedToDeleteRoleAssessment = hasPermission(ASSESSMENT_DELETE);
  const canUpdateRoleAssessment = hasPermission([
    ASSESSMENT_UPDATE,
    ASSESSMENT_GET,
  ]);

  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    keyword: withDefault(StringParam, undefined),
  });

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Role Assessment";

  // 2. State
  // 2.1. PENGGUNAAN TERBANYAK CARD
  const [dataCountAssessments, setDataCountAssessments] = useState(0);
  useState(true);
  const [dataColorBar, setDataColorBar] = useState([
    "#2F80ED",
    "#E5C471",
    "#BF4A40",
    "#6AAA70",
  ]);

  // 2.2. TABLE ROLE ASSESSMENT
  const [dataTable, setDataTable] = useState([]);
  const [pageRoleAssessment, setPageRoleAssessment] = useState(1);
  const [rowsRoleAssessment, setRowsRoleAssessment] = useState(10);
  const [sortingRoleAssessment, setSortingRoleAssessment] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [searchingFilterRoleAssessment, setSearchingFilterRoleAssessment] =
    useState(undefined);

  // 2.3. CREATE FORM
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const onAddNewFormButtonClicked = useCallback(() => {
    setCreateDrawerShown(true);
  }, []);

  // 2.4 READ FORM
  const [drawread, setdrawread] = useState(false);

  // 2.5. UPDATE FORM
  const [drawUpdate, setDrawUpdate] = useState(false);
  const [triggerAssessmentUpdate, setTriggerAssessmentUpdate] = useState(-1);
  const tempIdAssessmentUpdate = useRef(-1);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    id: 0,
    name: "",
    resumes_count: 0,
    details: [],
  });

  // 2.6. DELETE FORM
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [roleSelected, setRoleSelected] = useState("");
  const [candidateCount, setCandidateCount] = useState(0);
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });

  // 3.UseEffect
  // 3.1. Get Role Assessment Count
  const {
    data: top4AssessmentsCount,
    isLoading: loadingAssessmentsCountData,
    refetch: refetchTop4Assessments,
  } = useQuery({
    enabled: isAllowedToGetRoleAssessmentCount,
    queryKey: [ASSESSMENT_COUNT_GET, isAllowedToGetRoleAssessmentCount],
    queryFn: async () => {
      if (!isAllowedToGetRoleAssessmentCount) {
        permissionWarningNotification(
          "Mendapatkan",
          "Data Chart Penggunaan Terbanyak"
        );
        return;
      }
      return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountAssessment`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          const top4 = res2?.data?.resume_assessments_count?.slice(0, 4);
          return top4;
        });
    },
  });

  // 3.2. Get Role Assessments
  const {
    data: dataRawRoleAssessment,
    isLoading: loadingRoleAssesment,
    refetch: refetchRoleAssessment,
  } = useQuery({
    enabled: isAllowedToGetRoleAssessmentList,
    queryKey: [ASSESSMENTS_GET, isAllowedToGetRoleAssessmentList, queryParams],
    queryFn: async () => {
      if (!isAllowedToGetRoleAssessmentList) {
        permissionWarningNotification("Mendapatkan", "Daftar Role Assessment");
        return;
      }

      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });

      return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments${params}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataTable(res2.data.data);
          setDataCountAssessments(res2.data.total);
          return res2.data;
        });
    },
  });

  // 3.3. Auto fetch on search
  useEffect(() => {
    const timer = setTimeout(() => onFilterRoleAssessment(), 500);
    return () => clearTimeout(timer);
  }, [searchingFilterRoleAssessment]);

  // 4. Event
  const onFilterRoleAssessment = () => {
    setQueryParams({
      keyword: searchingFilterRoleAssessment,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRoleAssessment,
    "Enter"
  );

  const onOpenReadDrawer = (record) => {
    setdrawread(true);
    setAssessmentData((prev) => ({
      ...prev,
      id: record.id,
      name: record.name,
      resumes_count: record.resumes_count,
      details: record.details,
    }));
  };

  const onOpenDeleteModal = (record) => {
    setmodaldelete(true);
    setdatadelete({ ...datadelete, id: parseInt(record.id) });
    setRoleSelected(record.name);
    setCandidateCount(record.resumes_count);
  };

  const handleDelete = () => {
    if (!isAllowedToDeleteRoleAssessment) {
      permissionWarningNotification("Menghapus", "Form Assessment");
      return;
    }
    setloadingdelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAssessment?id=${datadelete.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification.success({
            message: res2.message,
            duration: 3,
          });
        }
        setTimeout(() => {
          setloadingdelete(false);
          setmodaldelete(false);
          refetchRoleAssessment();
          refetchTop4Assessments();
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus form assessment. ${err.response}`,
          duration: 3,
        });
        setloadingdelete(false);
        setmodaldelete(false);
      });
  };

  // 5. Table Columns
  const columnsRoleAssessment = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="text-center">
                {dataRawRoleAssessment?.from + index}
              </h1>
            </>
          ),
        };
      },
    },
    {
      title: "Nama Role Assesment",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1
                className="hover:text-gray-500 cursor-pointer"
                onClick={() => {
                  onOpenReadDrawer(record);
                }}
              >
                {record.name}
              </h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetRoleAssessmentList
        ? (a, b) => a.name.toLowerCase() > b.name.toLowerCase()
        : false,
    },
    {
      title: "Jumlah Kriteria",
      dataIndex: "details_count",
      key: "details_count",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="hover:text-gray-500 text-xs">
                {record.details_count}
              </h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetRoleAssessmentList
        ? (a, b) => a.details_count > b.details_count
        : false,
    },
    {
      title: "Jumlah Kandidat",
      dataIndex: "resumes_count",
      key: "resumes_count",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="hover:text-gray-500 text-xs">
                {record.resumes_count}
              </h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetRoleAssessmentList
        ? (a, b) => a.resumes_count > b.resumes_count
        : false,
    },
    {
      key: "button_ud",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center space-x-2">
              <ButtonSys
                type={"default"}
                disabled={!canUpdateRoleAssessment}
                onClick={(event) => {
                  event.stopPropagation();
                  tempIdAssessmentUpdate.current = record.id;
                  setTriggerAssessmentUpdate((prev) => prev + 1);
                  setDrawUpdate(true);
                }}
              >
                <EditOutlined />
              </ButtonSys>
              <ButtonSys
                type={"default"}
                color="danger"
                disabled={!isAllowedToDeleteRoleAssessment}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDeleteModal(record);
                }}
              >
                <DeleteOutlined />
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="grid grid-cols-1">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:px-5 lg:w-1/3">
            <AddNewFormButton
              title="Tambah Form"
              disabled={!isAllowedToAddRoleAssessment}
              onButtonClicked={onAddNewFormButtonClicked}
            />
            {/* CHART PENGGUNAAN TERBANYAK */}
            {loadingAssessmentsCountData ? (
              <>
                <Spin />
              </>
            ) : (
              <ChartVerticalBar
                dataChart={top4AssessmentsCount}
                objName={"name"}
                value={"resumes_count"}
                colorBarList={dataColorBar}
              />
            )}

            {/* CARD TOTAL FORM */}
            <div className="flex flex-row justify-between items-center shadow-md rounded-md bg-white p-5 mb-6">
              <H1>Total Form</H1>
              <p className="font-semibold text-4xl">{dataCountAssessments}</p>
            </div>
          </div>

          {/* TABEL SEMUA ROLE ASSESSMENT */}
          <div className="lg:w-2/3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 lg:mx-2 space-y-6">
            <h4 className="mig-heading--4">Semua Role Assessment</h4>
            <div className="flex flex-row w-full mb-5 space-x-4">
              <Input
                defaultValue={searchingFilterRoleAssessment}
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  setSearchingFilterRoleAssessment(e.target.value);
                }}
                onKeyPress={onKeyPressHandler}
                disabled={!isAllowedToGetRoleAssessmentList}
              />

              <ButtonSys
                type={"primary"}
                onClick={onFilterRoleAssessment}
                disabled={!isAllowedToGetRoleAssessmentList}
              >
                Cari
              </ButtonSys>
            </div>
            <TableCustomRoleAssessment
              dataSource={dataTable}
              columns={columnsRoleAssessment}
              loading={loadingRoleAssesment}
              total={dataRawRoleAssessment?.total}
              onOpenReadDrawer={onOpenReadDrawer}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <AccessControl hasPermission={ASSESSMENT_ADD}>
        <DrawerAssessmentCreate
          title={"Tambah Form"}
          visible={isCreateDrawerShown}
          buttonOkText={"Tambah Form"}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          isAllowedToAddRoleAssessment={isAllowedToAddRoleAssessment}
        />
      </AccessControl>

      {/* Drawer Role Detail */}
      <AccessControl hasPermission={ASSESSMENT_GET}>
        <DrawerCore
          title={`${assessmentData.name}`}
          visible={drawread}
          onClose={() => {
            setdrawread(false);
            setAssessmentData({
              id: 0,
              name: "",
              resumes_count: 0,
              details: [],
            });
          }}
          width={380}
          buttonOkText={"Ubah Form"}
          onClick={() => {
            tempIdAssessmentUpdate.current = assessmentData.id;
            setTriggerAssessmentUpdate((prev) => prev + 1);
            setDrawUpdate(true);
            setdrawread(false);
          }}
          buttonCancelText={"Hapus Form"}
          onButtonCancelClicked={() => {
            onOpenDeleteModal(assessmentData);
            setdrawread(false);
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-5">
              <div>
                <p className="text-gray-400 mb-2">Jumlah Kriteria</p>
                <div className="flex flex-row items-center space-x-3">
                  <ClipboardIconSvg size={16} color={`#333333`} />
                  <p>{assessmentData.details.length}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Jumlah Kandidat</p>
                <div className="flex flex-row items-center space-x-3">
                  <UsersIconSvg size={16} color={`#333333`} />
                  <p>{assessmentData.resumes_count}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Kriteria</p>
              <ul>
                {assessmentData.details.map((detail) => (
                  <li key={detail.id}>{detail.criteria}</li>
                ))}
              </ul>
            </div>
          </div>
        </DrawerCore>
      </AccessControl>

      <AccessControl hasPermission={[ASSESSMENT_UPDATE, ASSESSMENT_GET]}>
        <DrawerAssessmentUpdate
          title={"Ubah Form"}
          visible={drawUpdate}
          buttonOkText={"Simpan Form"}
          initProps={initProps}
          onvisible={setDrawUpdate}
          id={tempIdAssessmentUpdate}
          trigger={triggerAssessmentUpdate}
          modalUpdate={modalUpdate}
          setModalUpdate={setModalUpdate}
        />
      </AccessControl>

      {/* MODAL */}
      <AccessControl hasPermission={ASSESSMENT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modaldelete}
          onvisible={setmodaldelete}
          onOk={handleDelete}
          onCancel={() => {
            setmodaldelete(false);
          }}
          itemName={"form"}
          loading={loadingdelete}
          disabled={candidateCount > 0}
        >
          {candidateCount > 0 ? (
            <p className="mb-4">
              Form assessment <strong>{roleSelected}</strong> tidak dapat
              dihapus karena masih digunakan oleh{" "}
              <strong>{candidateCount}</strong> kandidat.
            </p>
          ) : (
            <p className="mb-4">
              Apakah Anda yakin ingin melanjutkan penghapusan form assessment{" "}
              <strong>{roleSelected}</strong>?
            </p>
          )}
        </ModalHapus2>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }
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
      dataProfile,
      sidemenu: "101",
    },
  };
}

export default RoleAssessmentIndex;
