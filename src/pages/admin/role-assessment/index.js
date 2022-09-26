import { Input, Modal, Spin, notification } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";

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
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerAssessmentCreate from "../../../components/drawer/resume/drawerAssessmentCreate";
import DrawerAssessmentUpdate from "../../../components/drawer/resume/drawerAssessmentUpdate";
import {
  ClipboardIconSvg,
  EditIconSvg,
  TrashIconSvg,
  UsersIconSvg,
} from "../../../components/icon";
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

const RoleAssessmentIndex = ({
  initProps,
  dataProfile,
  dataCountAssessments,
  dataListRoleAssessments,
  sidemenu,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRoleAssessmentList = hasPermission(ASSESSMENTS_GET);
  const isAllowedToGetRoleAssessmentCount = hasPermission(ASSESSMENT_COUNT_GET);
  const isAllowedToDeleteRoleAssessment = hasPermission(ASSESSMENT_DELETE);
  const canUpdateRoleAssessment = hasPermission([
    ASSESSMENT_UPDATE,
    ASSESSMENT_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Role Assessment";

  // 2. State
  // 2.1. PENGGUNAAN TERBANYAK CARD
  const [loadingAssessmentsCountData, setLoadingAssessmentsCountData] =
    useState(true);
  const [dataColorBar, setDataColorBar] = useState([
    "#2F80ED",
    "#E5C471",
    "#BF4A40",
    "#6AAA70",
  ]);
  const top4AssessmentsCount =
    dataCountAssessments.resume_assessments_count.slice(0, 4);

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

  // 2.7. TABLE ROLE ASSESSMENT
  const [dataTable, setDataTable] = useState([]);
  const [dataRawRoleAssessment, setDataRawRoleAssessment] = useState({
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
  const [loadingRoleAssesment, setLoadingRoleAssessment] = useState(true);
  const [pageRoleAssessment, setPageRoleAssessment] = useState(1);
  const [rowsRoleAssessment, setRowsRoleAssessment] = useState(10);
  const [sortingRoleAssessment, setSortingRoleAssessment] = useState({
    sort_by: "name",
    sort_type: "desc",
  });

  // Filter
  const [searchingFilterRoleAssessment, setSearchingFilterRoleAssessment] =
    useState("");

  // Columns
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
                type={canUpdateRoleAssessment ? "default" : "primary"}
                disabled={!canUpdateRoleAssessment}
                onClick={() => {
                  tempIdAssessmentUpdate.current = record.id;
                  setTriggerAssessmentUpdate((prev) => prev + 1);
                  setDrawUpdate(true);
                }}
              >
                <EditIconSvg size={15} color={`#35763B`} />
              </ButtonSys>
              <ButtonSys
                type={isAllowedToDeleteRoleAssessment ? "default" : "primary"}
                color="danger"
                disabled={!isAllowedToDeleteRoleAssessment}
                onClick={() => {
                  onOpenDeleteModal(record);
                }}
              >
                <TrashIconSvg size={15} color={`#BF4A40`} />
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  // 3.UseEffect

  // 3.1. Stop loading if dataCountAssessments are available
  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentCount) {
      return;
    }

    if (dataCountAssessments !== undefined) {
      setLoadingAssessmentsCountData(false);
    }
  }, [isAllowedToGetRoleAssessmentCount, dataCountAssessments]);

  // 3.2. GET TABEL SEMUA ROLE ASSESSMENT
  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentList) {
      return;
    }

    if (dataListRoleAssessments !== undefined) {
      setDataRawRoleAssessment(dataListRoleAssessments.data);
      const mappedData = dataListRoleAssessments.data.data.map((doc, idx) => {
        return {
          ...doc,
        };
      });
      setDataTable(mappedData);
      setLoadingRoleAssessment(false);
    }
  }, [isAllowedToGetRoleAssessmentList, dataListRoleAssessments]);

  // 4. Event
  const onFilterRoleAssessment = () => {
    setLoadingRoleAssessment(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?page=${pageRoleAssessment}&sort_by=${sortingRoleAssessment.sort_by}&sort_type=${sortingRoleAssessment.sort_type}&rows=${rowsRoleAssessment}&keyword=${searchingFilterRoleAssessment}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setDataRawRoleAssessment(res2.data);
        setDataTable(res2.data.data);
        setLoadingRoleAssessment(false);
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
    }));
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessment?id=${record.id}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setAssessmentData((prev) => ({
          ...prev,
          details: res2.data.details,
        }));
      });
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
          rt.push(`/admin/role-assessment`);
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

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col px-5 lg:w-1/3">
          <AddNewFormButton
            title="Tambah Form"
            disabled={!hasPermission(ASSESSMENT_ADD)}
            onButtonClicked={onAddNewFormButtonClicked}
          />
          {/* CHART PENGGUNAAN TERBANYAK */}
          {loadingAssessmentsCountData ? (
            <>
              <Spin />
            </>
          ) : (
            <div className="flex flex-col shadow-md rounded-md bg-white p-5 my-6">
              <div className="flex items-center justify-between mb-4">
                <H1>Penggunaan Terbanyak</H1>
              </div>
              <div className=" w-full flex justify-center">
                <Bar
                  data={{
                    labels: top4AssessmentsCount.map((doc) =>
                      doc.name.split(" ")
                    ),
                    datasets: [
                      {
                        data: top4AssessmentsCount.map(
                          (doc) => doc.resumes_count
                        ),
                        backgroundColor: top4AssessmentsCount.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        borderColor: top4AssessmentsCount.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        barPercentage: 1.0,
                        barThickness: 32,
                        maxBarThickness: 32,
                        minBarLength: 2,
                        borderRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    title: {
                      display: false,
                    },
                    legend: {
                      display: false,
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          font: {
                            family: "Montserrat, sans-serif",
                            size: 10,
                          },
                        },
                      },
                      y: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                        display: false,
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          title: (context) => {
                            return context[0].label.replaceAll(",", " ");
                          },
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className="flex flex-col w-full">
                {top4AssessmentsCount.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center mb-1"
                  >
                    <div className="flex">
                      <div
                        className=" w-1 mr-2"
                        style={{
                          backgroundColor: `${
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                          }`,
                        }}
                      ></div>
                      <Text>{doc.name}</Text>
                    </div>
                    <div className="flex">
                      <H2>{doc.resumes_count}</H2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CARD TOTAL FORM */}
          <div className="flex flex-row justify-between items-center shadow-md rounded-md bg-white p-5 mb-6">
            <H1>Total Form</H1>
            <p className="font-semibold text-4xl">
              {dataCountAssessments.assessments_count}
            </p>
          </div>
        </div>

        {/* TABEL SEMUA ROLE ASSESSMENT */}
        <div className="lg:w-2/3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 lg:mx-2 space-y-6">
          <H1 className="font-bold">Semua Role Assessment</H1>
          <div className="flex flex-row w-full mb-5 space-x-4">
            <Input
              value={
                searchingFilterRoleAssessment === ""
                  ? null
                  : searchingFilterRoleAssessment
              }
              style={{ width: `100%` }}
              placeholder="Kata Kunci.."
              allowClear
              onChange={(e) => {
                if (e.target.value === "") {
                  setSearchingFilterRoleAssessment("");
                } else {
                  setSearchingFilterRoleAssessment(e.target.value);
                }
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
            setDataSource={setDataTable}
            columns={columnsRoleAssessment}
            loading={loadingRoleAssesment}
            setpraloading={setLoadingRoleAssessment}
            pageSize={rowsRoleAssessment}
            total={dataRawRoleAssessment?.total}
            initProps={initProps}
            setpage={setPageRoleAssessment}
            pagefromsearch={pageRoleAssessment}
            setdataraw={setDataRawRoleAssessment}
            setsorting={setSortingRoleAssessment}
            sorting={sortingRoleAssessment}
            searching={searchingFilterRoleAssessment}
          />
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
        />
      </AccessControl>

      <AccessControl hasPermission={ASSESSMENT_GET}>
        <DrawerCore
          title={`${assessmentData.name}`}
          visible={drawread}
          onClose={() => {
            setdrawread(false);
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

      <AccessControl hasPermission={ASSESSMENT_UPDATE}>
        <DrawerAssessmentUpdate
          title={"Ubah Form"}
          visible={drawUpdate}
          buttonOkText={"Simpan Form"}
          initProps={initProps}
          onvisible={setDrawUpdate}
          id={tempIdAssessmentUpdate}
          trigger={triggerAssessmentUpdate}
        />
      </AccessControl>

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

  const resourcesGCA = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountAssessment`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGCA = await resourcesGCA.json();
  const dataCountAssessments = resjsonGCA.data;

  const resourcesGA = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?rows=10`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGA = await resourcesGA.json();
  const dataListRoleAssessments = resjsonGA;

  return {
    props: {
      initProps,
      dataProfile,
      dataCountAssessments,
      dataListRoleAssessments,
      sidemenu: "101",
    },
  };
}

export default RoleAssessmentIndex;
