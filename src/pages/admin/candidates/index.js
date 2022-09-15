import { Input, Modal, Spin, notification } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  RESUMES_COUNT_GET,
  RESUMES_GET,
  RESUME_ADD,
  RESUME_GET,
} from "lib/features";

import ButtonSys from "../../../components/button";
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerAssessmentCreate from "../../../components/drawer/resume/drawerAssessmentCreate";
import DrawerAssessmentUpdate from "../../../components/drawer/resume/drawerAssessmentUpdate";
import {
  ClipboardIconSvg,
  DownloadIconSvg,
  UsersIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { TableCustomCandidate } from "../../../components/table/tableCustom";
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

const CandidatesIndex = ({
  initProps,
  dataProfile,
  dataCountResumes,
  dataListResumes,
  sidemenu,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToGetResumeList = hasPermission(RESUMES_GET);
  const isAllowedToGetResumeCount = hasPermission(RESUMES_COUNT_GET);
  const isAllowedToAddResume = hasPermission(RESUME_ADD);
  const canDownloadResume =
    hasPermission(RESUMES_GET) && hasPermission(RESUME_GET);

  // const isAllowedToDeleteRoleAssessment = hasPermission(ROLE_ASSESSMENT_DELETE);
  // const canUpdateRoleAssessment = hasPermission([
  //   ROLE_ASSESSMENT_UPDATE,
  //   ROLE_ASSESSMENT_GET,
  // ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2. State
  // 2.1. PENGGUNAAN TERBANYAK CARD
  const [loadingResumeCountData, setLoadingResumeCountData] = useState(true);
  const [dataColorBar, setDataColorBar] = useState([
    "#2F80ED",
    "#E5C471",
    "#BF4A40",
    "#6AAA70",
    "#808080",
  ]);
  const top5CandidateCount = dataCountResumes.resume_assessments_count.slice(
    0,
    5
  );

  // 2.3. CREATE FORM
  const [drawCreate, setDrawCreate] = useState(false);
  const onAddNewCandidateButtonClicked = useCallback(() => {
    rt.push("/admin/candidates/create");
  }, []);

  // 2.4 READ FORM
  const [drawRead, setDrawRead] = useState(false);

  // 2.5. UPDATE FORM
  const [drawUpdate, setDrawUpdate] = useState(false);
  const [triggerResumeUpdate, setTriggerResumeUpdate] = useState(-1);
  const tempIdResumeUpdate = useRef(-1);
  const [resumeData, setResumeData] = useState({
    id: 0,
    name: "",
    telp: "",
    email: "",
    role: "",
  });

  // 2.6. DELETE FORM
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  // const [roleSelected, setRoleSelected] = useState("");
  // const [candidateCount, setCandidateCount] = useState(0);
  const [dataDelete, setDataDelete] = useState({
    id: 0,
  });

  // 2.7. TABLE KANDIDAT
  const [dataTable, setDataTable] = useState([]);
  const [dataRawResume, setDataRawResume] = useState({
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
  const [loadingResumeList, setLoadingResumeList] = useState(true);
  const [pageResume, setPageResume] = useState(1);
  const [rowsResume, setRowsResume] = useState(10);
  const [sortingResume, setSortingResume] = useState({
    sort_by: "name",
    sort_type: "desc",
  });
  const [assessmentIds, setAssessmentIds] = useState([]);

  // Filter
  const [searchingFilterResume, setSearchingFilterResume] = useState("");

  const [roleFilterResume, setRoleFilterResume] = useState("all");

  // Columns
  const columnsResume = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="text-center">{dataRawResume?.from + index}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1>{record.name}</h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetResumeList ? (a, b) => a.name > b.name : false,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="">{record.role}</h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetResumeList ? (a, b) => a.role > b.role : false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="">{record.email}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Nomor Handphone",
      dataIndex: "telp",
      key: "telp",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="">{record.telp}</h1>
            </>
          ),
        };
      },
    },
    {
      key: "button_download",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center space-x-2">
              {/* <ButtonSys
                type={`primary`}
                disabled={!canDownloadResume}
                onClick={(event) => {
                  //  tempIdAssessmentUpdate.current = record.id;
                  //  setTriggerAssessmentUpdate((prev) => prev + 1);
                  //  setDrawUpdate(true);
                  console.log(event)
                }}
              >
                <DownloadIconSvg size={15} color={`#35763B`} />
              </ButtonSys> */}
            </div>
          ),
        };
      },
    },
  ];

  // 3.UseEffect

  // 3.1. Stop loading if dataCountResumes are available
  useEffect(() => {
    if (!isAllowedToGetResumeCount) {
      return;
    }

    if (dataCountResumes !== undefined) {
      setLoadingResumeCountData(false);
    }
  }, [isAllowedToGetResumeCount, dataCountResumes]);

  // 3.2. GET TABEL SEMUA KANDIDAT
  useEffect(() => {
    if (!isAllowedToGetResumeList) {
      return;
    }

    if (dataListResumes !== undefined) {
      setDataRawResume(dataListResumes.data);
      const mappedData = dataListResumes.data.data.map((doc, idx) => {
        return {
          ...doc,
        };
      });
      setDataTable(mappedData);
      setLoadingResumeList(false);
    }
  }, [isAllowedToGetResumeList, dataListResumes]);

  // 4. Event
  const onFilterResume = () => {
    setLoadingResumeList(true);
    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/getResumes?page=${pageResume}&sort_by=${
        sortingResume.sort_by
      }&sort_type=${
        sortingResume.sort_type
      }&rows=${rowsResume}&keyword=${searchingFilterResume}&assessments_ids=${assessmentIds.toString()}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setDataRawResume(res2.data);
        setDataTable(res2.data.data);
        setLoadingResumeList(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterResume, "Enter");

  // const onOpenReadDrawer = (record) => {
  //   setdrawread(true);
  //   setAssessmentData((prev) => ({
  //     ...prev,
  //     id: record.id,
  //     name: record.name,
  //     resumes_count: record.resumes_count,
  //   }));
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessment?id=${record.id}`,
  //     {
  //       method: `GET`,
  //       headers: {
  //         Authorization: JSON.parse(initProps),
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setAssessmentData((prev) => ({
  //         ...prev,
  //         details: res2.data.details,
  //       }));
  //     });
  // };

  // const onOpenDeleteModal = (record) => {
  //   setmodaldelete(true);
  //   setdatadelete({ ...datadelete, id: parseInt(record.id) });
  //   setRoleSelected(record.name);
  //   setCandidateCount(record.resumes_count);
  // };

  // const handleDelete = () => {
  //   if (!isAllowedToDeleteRoleAssessment) {
  //     permissionWarningNotification("Menghapus", "Form Assessment");
  //     return;
  //   }
  //   setloadingdelete(true);
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAssessment?id=${datadelete.id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: JSON.parse(initProps),
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       if (res2.success) {
  //         notification.success({
  //           message: res2.message,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           setloadingdelete(false);
  //           setmodaldelete(false);
  //           rt.push(`/admin/role-assessment`);
  //         }, 500);
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `Gagal menghapus form assessment. ${err.response}`,
  //         duration: 3,
  //       });
  //       setloadingdelete(false);
  //       setmodaldelete(false);
  //     });
  // };

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
            title="Tambah Kandidat"
            disabled={!isAllowedToAddResume}
            onButtonClicked={onAddNewCandidateButtonClicked}
          />
          {/* CHART ROLE KANDIDAT */}
          {loadingResumeCountData ? (
            <>
              <Spin />
            </>
          ) : (
            <div className="flex flex-col shadow-md rounded-md bg-white p-5 my-6">
              <div className="flex items-center justify-between mb-4">
                <H1>Role Kandidat</H1>
              </div>
              <div className=" w-full flex justify-center">
                <Doughnut
                  data={{
                    labels: top5CandidateCount.map((doc) => doc.name),
                    datasets: [
                      {
                        data: top5CandidateCount.map(
                          (doc) => doc.resumes_count
                        ),
                        backgroundColor: top5CandidateCount.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        borderColor: top5CandidateCount.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        borderWidth: 1,
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
                    cutout: 55,
                    spacing: 5,
                  }}
                />
              </div>

              <div className="flex flex-col w-full mt-5">
                {top5CandidateCount.map((doc, idx) => (
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

          {/* CARD TOTAL KANDIDAT */}
          <div className="flex flex-row justify-between items-center shadow-md rounded-md bg-white p-5 mb-6">
            <H1>Total Kandidat</H1>
            <p className="font-semibold text-4xl">
              {dataCountResumes.assessments_count}
            </p>
          </div>
        </div>

        {/* TABEL SEMUA KANDIDAT */}
        <div className="lg:w-2/3 shadow-md rounded-md bg-white p-5 mb-6 lg:mx-2">
          <H1 className="font-bold">Semua Kandidat</H1>
          <div className="mt-5 flex flex-col">
            <div className="flex flex-row w-full mb-5 space-x-4">
              <Input
                value={
                  searchingFilterResume === "" ? null : searchingFilterResume
                }
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSearchingFilterResume("");
                  } else {
                    setSearchingFilterResume(e.target.value);
                  }
                }}
                onKeyPress={onKeyPressHandler}
                disabled={!isAllowedToGetResumeList}
              />

              {/* <Select
                  value={
                    roleFilterResume === ""
                      ? null
                      : roleFilterResume
                  }
                  disabled={!isAllowedToAddResume || !isAllowedToGetResumeList}
                  placeholder="Semua Role"
                  style={{ width: `100%` }}
                  allowClear
                  name={`role`}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setRoleFilterResume("")
                      : setRoleFilterResume(value);
                  }}
                >
                  {dataticketrelation.ticket_types.map((doc, idx) => (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
              </Select> */}

              <ButtonSys
                type={"primary"}
                onClick={onFilterResume}
                disabled={!isAllowedToGetResumeList}
              >
                Cari
              </ButtonSys>
            </div>
            <TableCustomCandidate
              dataSource={dataTable}
              setDataSource={setDataTable}
              columns={columnsResume}
              loading={loadingResumeList}
              setpraloading={setLoadingResumeList}
              pageSize={rowsResume}
              total={dataRawResume?.total}
              initProps={initProps}
              setpage={setPageResume}
              pagefromsearch={pageResume}
              setdataraw={setDataRawResume}
              setsorting={setSortingResume}
              sorting={sortingResume}
              searching={searchingFilterResume}
              assessmentIds={assessmentIds}
            />
          </div>
        </div>
      </div>

      {/* DRAWER */}
      {/* <AccessControl hasPermission={ROLE_ASSESSMENT_ADD}>
        <DrawerAssessmentCreate
          title={"Tambah Form"}
          visible={isCreateDrawerShown}
          buttonOkText={"Tambah Form"}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
        />
      </AccessControl>

      <AccessControl hasPermission={ROLE_ASSESSMENT_GET}>
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

      <AccessControl hasPermission={ROLE_ASSESSMENT_UPDATE}>
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

      <AccessControl hasPermission={ROLE_ASSESSMENT_DELETE}>
        <Modal
          title={`Peringatan`}
          visible={modaldelete}
          okButtonProps={{ disabled: loadingdelete }}
          onCancel={() => {
            setmodaldelete(false);
          }}
          onOk={handleDelete}
          maskClosable={false}
          style={{ top: `3rem` }}
          width={500}
          destroyOnClose={true}
        >
          <p className="mb-4">
            Form assessment <strong>{roleSelected}</strong>&nbsp; digunakan oleh{" "}
            <strong>{candidateCount}</strong> kandidat. Apakah Anda yakin ingin
            melanjutkan penghapusan?
          </p>
          <p>
            Data hasil assessment kandidat yang menggunakan form ini akan tetap
            disimpan.
          </p>
        </Modal>
      </AccessControl> */}
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

  const resourcesGCR = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountResume`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGCR = await resourcesGCR.json();
  const dataCountResumes = resjsonGCR.data;

  const resourcesGR = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResumes?rows=10`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGR = await resourcesGR.json();
  const dataListResumes = resjsonGR;

  return {
    props: {
      initProps,
      dataProfile,
      dataCountResumes,
      dataListResumes,
      sidemenu: "11",
    },
  };
}

export default CandidatesIndex;
