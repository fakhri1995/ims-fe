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
import { Bar } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  ROLE_ASSESSMENTS_GET,
  ROLE_ASSESSMENT_ADD,
  ROLE_ASSESSMENT_COUNT_GET,
  ROLE_ASSESSMENT_DELETE,
  ROLE_ASSESSMENT_UPDATE,
} from "lib/features";

import DrawerCore from "../../../components/drawer/drawerCore";
import { DrawerFormCreate } from "../../../components/drawer/resume/drawerFormCreate";
import { TrashIconSvg } from "../../../components/icon";
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
  dataListRoleAssessments,
  sidemenu,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRoleAssessmentList = hasPermission(ROLE_ASSESSMENTS_GET);
  const isAllowedToGetRoleAssessmentCount = hasPermission(
    ROLE_ASSESSMENT_COUNT_GET
  );
  const isAllowedToUpdateRoleAssessment = hasPermission(ROLE_ASSESSMENT_UPDATE);
  const isAllowedToDeleteRoleAssessment = hasPermission(ROLE_ASSESSMENT_DELETE);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2.useState
  // 2.1. PENGGUNAAN TERBANYAK
  const [assessmentsCountData, setAssessmentsCountData] = useState([]);
  const [loadingAssessmentsCountData, setLoadingAssessmentsCountData] =
    useState(true);
  const [dataColorBar, setDataColorBar] = useState([
    "#2F80ED",
    "#E5C471",
    "#BF4A40",
    "#6AAA70",
  ]);
  // 2.2. TOTAL FORM
  const [assessmentsCount, setAssessmentsCount] = useState(0);
  // 2.3 CREATE FORM
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const onAddNewFormButtonClicked = useCallback(() => {
    setCreateDrawerShown(true);
  }, []);

  //Definisi table
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

  //Filter
  const [searchingFilterRoleAssessment, setSearchingFilterRoleAssessment] =
    useState("");

  //Columns
  const columnsRoleAssessment = [
    {
      title: "No.",
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="font-semibold hover:text-gray-500">{record.id}</h1>
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
              <h1 className="hover:text-gray-500">{record.name}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Jumlah Kriteria",
      dataIndex: "criteria-count",
      key: "criteria-count",
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
    },
    {
      title: "Jumlah Kandidat",
      dataIndex: "candidate-count",
      key: "candidate-count",
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
    },
    {
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return {
          children: (
            <div className=" flex">
              <Button
                onClick={() => {
                  setdrawedit(true);
                  setdataedit((prev) => ({
                    ...prev,
                    id: record.id,
                    name: record.name,
                  }));
                  setAssessmentData((prev) => ({
                    ...prev,
                    id: record.id,
                    name: record.name,
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
                      console.log(res2.data);
                      setAssessmentData((prev) => ({
                        ...prev,
                        details: res2.data.details,
                      }));

                      // setAssessmentsCount(res2.data.assessments_count);
                      // setLoadingAssessmentsCountData(false);
                    });
                }}
                style={{
                  paddingTop: `0`,
                  paddingBottom: `0.3rem`,
                  marginRight: `1rem`,
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                danger
                onClick={() => {
                  setmodaldelete(true);
                  setdatadelete({ ...datadelete, id: parseInt(record.id) });
                  setRoleSelected(record.name);
                  setCandidateCount(record.resumes_count);
                }}
                // loading={loadingdelete}
                style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          ),
        };
      },
    },
  ];

  //update
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
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
    details: [],
  });
  //delete
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [roleSelected, setRoleSelected] = useState("");
  const [candidateCount, setCandidateCount] = useState(0);
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });

  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentCount) {
      setLoadingAssessmentsCountData(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountAssessment`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log(res2.data);
        setAssessmentsCountData(res2.data.resume_assessments_count); // "Name Role" chart's data source
        setAssessmentsCount(res2.data.assessments_count);
        setLoadingAssessmentsCountData(false);
      });
  }, [isAllowedToGetRoleAssessmentCount]);

  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentList) {
      return;
    }

    const mappedData = dataListRoleAssessments.data.data.map((doc, idx) => {
      return {
        ...doc,
        number: idx + 1,
      };
    });
    setDataTable(mappedData);
  }, [isAllowedToGetRoleAssessmentList, dataListRoleAssessments]);

  // useEffect(() => {
  //   if (!isAllowedToUpdateRoleAssessment) {
  //     return;
  //   }

  //   if(dataedit.id > 0){
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessment?id=${dataedit.id}`, {
  //       method: `GET`,
  //       headers: {
  //       Authorization: JSON.parse(initProps),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res2) => {
  //           console.log(res2.data.details)
  //           setDataEditDetails(res2.data.details); // "Name Role" chart's data source
  //           // setAssessmentsCount(res2.data.assessments_count);
  //           // setLoadingAssessmentsCountData(false);
  //       });

  //   }

  // }, [isAllowedToUpdateRoleAssessment, dataedit]);

  //event
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
        // setdatafilterttickets(res2.data.data);
        setLoadingRoleAssessment(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRoleAssessment,
    "Enter"
  );
  // const onDeleteButtonClicked = () => {
  //   if (!isAllowedToDeleteForm) {
  //     permissionWarningNotification("Menghapus", "Form Assessment");
  //     return;
  //   }

  //   confirm({
  //     title: "Konfirmasi Penghapusan Form Assessment!",
  //     content: (
  //       <p>
  //         Apakah Anda yakin untuk menghapus Form Assessment{" "}
  //         {/* <strong>{existingFormAssessmentData.name}</strong> dengan ID{" "} */}
  //         <strong>{formAssessmentId}</strong>?
  //       </p>
  //     ),
  //     onOk: () => {
  //       return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addAssessment?id=${formAssessmentId}`
  //       ).then((response) => {
  //           notification.success({
  //             message: response.data.message,
  //             duration: 3,
  //           })
  //           onvisible(false);
  //       }).catch((err) => {
  //           notification.error({
  //               message: `Gagal menghapus form assessment. ${err.response.data.message}`,
  //               duration: 3,
  //           });
  //       })
  //       // return deleteFormAssessment(formAssessmentId);
  //     },
  //     centered: true,
  //   });
  // };

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
        // body: JSON.stringify(datadelete),
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
        console.log(err);
        notification.error({
          message: `Gagal menghapus form assessment. ${err.response}`,
          duration: 3,
        });
        setloadingdelete(false);
        setmodaldelete(false);
      });
  };

  const handleEdit = () => {
    setloadingedit(true);
    // const payload = {
    //   id: dataedit.id,
    //   name: dataedit.name,
    //   add: dataedit.add,
    //   update:
    // }
    // setdataedit((prev) => ({
    //   ...prev,
    //   add: [
    //     ...prev.add
    //   ],
    //   update: [

    //   ],
    //   delete: [

    //   ]

    // }))
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateAssessment`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataedit),
    })
      .then((res) => res.json())
      .then((res2) => {
        notification.success({
          message: res2.message,
          duration: 3,
        });
        setdataedit({
          id: 0,
          name: "",
          add: [],
          update: [],
          delete: [],
        });
        setTimeout(() => {
          setloadingedit(false);
          setdrawedit(false);
          rt.push(`/admin/role-assessment`);
        }, 500);
      })
      .catch((err) => {
        notification["error"]({
          message: `Gagal mengubah form assessment. ${err.response}`,
          duration: 3,
        });
        setloadingedit(false);
        setdrawedit(false);
      });
  };

  console.log(assessmentData);
  console.log(dataedit);
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
                    labels: assessmentsCountData.map((doc) =>
                      doc.name.split(" ")
                    ),
                    datasets: [
                      {
                        data: assessmentsCountData.map(
                          (doc) => doc.resumes_count
                        ),
                        backgroundColor: assessmentsCountData.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        borderColor: assessmentsCountData.map(
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
                {assessmentsCountData.map((doc, idx) => (
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
          <div className="flex flex-row justify-between items-center shadow-md rounded-md bg-white p-5 mb-6">
            <H1>Total Form</H1>
            <p className="font-semibold text-4xl">{assessmentsCount}</p>
          </div>
        </div>

        <div className="xl:w-full shadow-md rounded-md bg-white p-5 mb-6 lg:mx-2">
          <H1 className="font-bold">Semua Role Assesment</H1>
          <div className="mt-5 flex flex-col">
            <div className="w-full md:w-8/12 mb-5">
              {/* <div className="mx-1 w-2/12"> */}
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
              {/* </div> */}
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
            {/* <Table
                      columns={columnsFeature}
                      dataSource={datatable}
                      pagination={{ pageSize: 8 }}
                      scroll={{ x: 300 }}
                  ></Table> */}
          </div>
        </div>
      </div>

      <AccessControl hasPermission={ROLE_ASSESSMENT_ADD}>
        <DrawerFormCreate
          title="Tambah Form"
          buttonOkText="Tambah Form"
          onvisible={setCreateDrawerShown}
          visible={isCreateDrawerShown}
          initProps={initProps}
        />
      </AccessControl>

      <AccessControl hasPermission={ROLE_ASSESSMENT_UPDATE}>
        {/* <DrawerFormCreate
            title="Ubah Form"
            buttonOkText="Ubah Form"
            onvisible={setdrawedit}
            visible={drawedit}
            initProps={initProps}
            formAssessmentId={dataedit.id}
          /> */}
        <DrawerCore
          title={`Ubah Form`}
          visible={drawedit}
          onClose={() => {
            setdrawedit(false);
          }}
          width={380}
          // destroyOnClose={true}
          buttonOkText={"Tambah Form"}
          onClick={handleEdit}
          // disabled={disabledcreate}
        >
          <div className="flex flex-col">
            <Form
              layout="vertical"
              // initialValues={dataedit}
              // onFinish={handleEdit}
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
                    <div key={idx} className="flex flex-row mb-3">
                      <Input
                        value={detail.criteria}
                        placeholder="Nama kriteria"
                        onChange={(e) => {
                          var temp = [...assessmentData.details];
                          temp[idx].criteria = e.target.value;
                          setdataedit((prev) => ({
                            ...prev,
                            update: temp,
                          }));
                        }}
                      ></Input>
                      <div
                        className="ml-2 cursor-pointer"
                        onClick={() => {
                          if (assessmentData.details.length > 1) {
                            const temp = [...assessmentData.details];
                            const deleted = temp.splice(idx, 1);
                            console.log(temp);
                            console.log(deleted);
                            setAssessmentData((prev) => ({
                              ...prev,
                              details: temp,
                            }));
                            setdataedit((prev) => ({
                              ...prev,
                              delete: [...prev.delete, deleted[0].id],
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
        </DrawerCore>
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

  const resourcesGF = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGF = await resourcesGF.json();
  const dataListRoleAssessments = resjsonGF;

  return {
    props: {
      initProps,
      dataProfile,
      dataListRoleAssessments,
      sidemenu: "4",
    },
  };
}

export default RoleAssessmentIndex;
