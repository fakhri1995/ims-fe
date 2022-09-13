import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Spin,
  Table,
  message,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  ROLE_ASSESSMENTS_GET,
  ROLE_ASSESSMENT_ADD,
  ROLE_ASSESSMENT_COUNT_GET,
  ROLE_ASSESSMENT_DELETE,
  ROLE_ASSESSMENT_GET,
  ROLE_ASSESSMENT_UPDATE,
} from "lib/features";

import ButtonSys from "../../../components/button";
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerAssessmentCreate from "../../../components/drawer/resume/drawerAssessmentCreate";
import DrawerAssessmentUpdate from "../../../components/drawer/resume/drawerAssessmentUpdate";
import { EditIconSvg, TrashIconSvg } from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
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
  const isAllowedToGetRoleAssessmentList = hasPermission(ROLE_ASSESSMENTS_GET);
  const isAllowedToDeleteRoleAssessment = hasPermission(ROLE_ASSESSMENT_DELETE);
  const canUpdateRoleAssessment = hasPermission([
    ROLE_ASSESSMENT_UPDATE,
    ROLE_ASSESSMENT_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

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

  // 2.3. CREATE FORM
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const onAddNewFormButtonClicked = useCallback(() => {
    setCreateDrawerShown(true);
  }, []);

  // 2.4 READ FORM
  const [drawread, setdrawread] = useState(false);

  // 2.5. UPDATE FORM
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [triggerAssessmentUpdate, setTriggerAssessmentUpdate] = useState(-1);
  const tempIdAssessmentUpdate = useRef(-1);
  const [dataedit, setdataedit] = useState({
    id: 0,
    name: "",
    add: [],
    update: [],
    delete: [],
  });
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
  const [loadingRoleAssesment, setLoadingRoleAssessment] = useState(false);
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
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="font-semibold hover:text-gray-500">
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
        ? (a, b) => a.name > b.name
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
                  // onOpenUpdateDrawer(record)
                  tempIdAssessmentUpdate.current = record.id;
                  setTriggerAssessmentUpdate((prev) => prev + 1);
                  setdrawedit(true);
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
                // loading={loadingdelete}
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
    if (dataCountAssessments !== undefined) {
      setLoadingAssessmentsCountData(false);
    }
  }, [dataCountAssessments]);

  // 3.2. GET TABEL SEMUA ROLE ASSESSMENT
  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentList) {
      return;
    }

    const mappedData = dataListRoleAssessments.data.data.map((doc, idx) => {
      return {
        ...doc,
      };
    });

    setDataTable(mappedData);
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
        setdatafilterttickets(res2.data.data);
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
        notification.success({
          message: res2.message,
          duration: 3,
        });
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

  // DEBUG
  // console.log(assessmentData);
  // console.log(dataedit);
  // console.log(dataedit)

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:px-5">
          <AddNewFormButton
            disabled={!hasPermission(ROLE_ASSESSMENT_ADD)}
            onButtonClicked={onAddNewFormButtonClicked}
          />
          {/* PENGGUNAAN TERBANYAK */}
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
                    labels: dataCountAssessments.resume_assessments_count.map(
                      (doc) => doc.name.split(" ")
                    ),
                    datasets: [
                      {
                        data: dataCountAssessments.resume_assessments_count.map(
                          (doc) => doc.resumes_count
                        ),
                        backgroundColor:
                          dataCountAssessments.resume_assessments_count.map(
                            (doc, idx) =>
                              dataColorBar[idx + (1 % dataColorBar.length) - 1]
                          ),
                        borderColor:
                          dataCountAssessments.resume_assessments_count.map(
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
                {dataCountAssessments.resume_assessments_count.map(
                  (doc, idx) => (
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
                  )
                )}
              </div>
            </div>
          )}
          <div className="flex flex-row justify-between items-center shadow-md rounded-md bg-white p-5 mb-6">
            <H1>Total Form</H1>
            <p className="font-semibold text-4xl">
              {dataCountAssessments.assessments_count}
            </p>
          </div>
        </div>

        <div className="xl:w-full shadow-md rounded-md bg-white p-5 mb-6 lg:mx-2">
          <H1 className="font-bold">Semua Role Assesment</H1>
          <div className="mt-5 flex flex-col">
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
      </div>

      {/* DRAWER */}
      <AccessControl hasPermission={ROLE_ASSESSMENT_ADD}>
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
            setdrawedit(true);
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
                <p>{assessmentData.details.length}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Jumlah Kandidat</p>
                <p>{assessmentData.resumes_count}</p>
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
          visible={drawedit}
          buttonOkText={"Simpan Form"}
          initProps={initProps}
          onvisible={setdrawedit}
          id={tempIdAssessmentUpdate}
          trigger={triggerAssessmentUpdate}
        />
        {/* <DrawerCore
          title={`Ubah Form`}
          visible={drawedit}
          onClose={() => {
            setdrawedit(false);
          }}
          width={380}
          // destroyOnClose={true}
          buttonOkText={"Tambah Form"}
          onClick={handleUpdate}
          // disabled={disabledcreate}
        >
          <div className="flex flex-col">
            <Form
              layout="vertical"
              // initialValues={dataedit}
              // onFinish={handleUpdate}
            >
              <Form.Item
                label="Nama Form"
                name="nama_form"
                rules={[
                  {
                    required: true,
                    message: "Nama form wajib diisi",
                  },
                ]}
              >
                <Input
                  defaultValue={assessmentData.name}
                  onChange={(e) => {
                    setdataedit({ ...dataedit, name: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Kriteria"
                name="kriteria"
                rules={[
                  {
                    required: true,
                    message: "Kriteria wajib diisi",
                  },
                ]}
              >
                {assessmentData.details.map((detail, idx) => {
                  return (
                    <div key={detail.id} className="flex flex-row mb-3">
                      <Input
                        value={detail.criteria}
                        placeholder="Nama kriteria"
                        onChange={(e) => {
                          var temp = [...assessmentData.details];
                          temp[idx].criteria = e.target.value;
                          
                          
                          // console.log(temp[idx].criteria)
                          if(detail.id) {
                            // if(detail.id === prev.detail.id){
                              
                            // }
                            
                            setdataedit((prev) => ({
                              ...prev,
                              update: [
                                ...prev.update,
                                {
                                  id: detail.id,
                                  criteria: temp[idx].criteria
                                }
                              ],
                            }));
                          } else {
                            setdataedit((prev) => ({
                              ...prev,
                              update: [
                                ...prev.add,
                                {
                                  criteria: temp[idx].criteria
                                }
                              ],
                            }));

                          }
                          
                          
                        }}
                      ></Input>
                      <div
                        className="ml-2 cursor-pointer"
                        onClick={() => {
                          if (assessmentData.details.length > 1) {
                            const temp = [...assessmentData.details];
                            const deleted = temp.splice(idx, 1);
                            if(deleted[0].id){
                              // console.log(deleted);
                              setdataedit((prev) => ({
                                ...prev,
                                delete: [...prev.delete, deleted[0].id],
                              }));
                            }
                            // console.log(temp);
                            
                            setAssessmentData((prev) => ({
                              ...prev,
                              details: temp,
                            }));
                            
                          }
                        }}
                      >
                        <TrashIconSvg
                          size={15}
                          color={
                            assessmentData.details.length == 1
                              ? `#CCCCCC`
                              : `#BF4A40`
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </Form.Item>
              <div
                className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer"
                onClick={() => {
                  setdataedit((prev) => ({
                    ...prev,
                    add: [
                      ...prev.add,
                      {
                        criteria: "",
                      },
                    ],
                  }));
                  
                  setAssessmentData((prev) => ({
                    ...prev,
                    details: [...prev.details, { criteria: "" }],
                  }));
                }}
              >
                <div className="text-primary100 hover:text-primary75">
                  + Tambah Kriteria
                </div>
              </div>
            </Form>
          </div>
        </DrawerCore> */}
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?rows=11`,
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
      sidemenu: "4",
    },
  };
}

export default RoleAssessmentIndex;
