import {
  DeleteOutlined,
  EditOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  Table,
  notification,
} from "antd";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  CAREERS_V2_GET,
  CAREER_ADD,
  CAREER_DELETE,
  CAREER_UPDATE,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

export const Careers = ({ initProps, dataProfile, sidemenu }) => {
  const rt = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetCareer = hasPermission(CAREERS_V2_GET);
  const isAllowedToAddCareer = hasPermission(CAREER_ADD);
  const isAllowedToUpdateCareer = hasPermission(CAREER_UPDATE);
  const isAllowedToDeleteCareer = hasPermission(CAREER_DELETE);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    from: withDefault(StringParam, undefined),
    to: withDefault(StringParam, undefined),
  });
  const [dataExperience, setDataExperience] = useState([
    {
      id: 1,
      name: "0 - 1 Tahun",
    },
    {
      id: 2,
      name: "1 - 3 Tahun",
    },
    {
      id: 3,
      name: "3 - 5 Tahun",
    },
    {
      id: 4,
      name: "Lebih dari 5 Tahun",
    },
  ]);
  const pathArr = rt.pathname.split("/").slice(1);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );
  const [dataRoleTypeList, setDataRoleTypeList] = useState([]);
  //Definisi table
  const columnsFeature = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <a
                href="#"
                onClick={() => {
                  if (!isAllowedToUpdateCareer) {
                    permissionWarningNotification("Memperbarui", "Career");
                    return;
                  }

                  setdrawedit(true);
                  setdataedit({
                    id: record.id,
                    name: record.name,
                    description: record.description,
                    qualification: record.qualification,
                    overview: record.overview,
                    salary_min: record.salary_min,
                    salary_max: record.salary_max,
                    career_role_type_id: record.career_role_type_id,
                    career_experience_id: record.career_experience_id,
                    is_posted: record.is_posted,
                  });
                }}
              >
                <h1 className="hover:text-gray-500">
                  {dataRawCareers?.from + index}
                </h1>
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "Position Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className=" text-base">{record.name}</p>
            </>
          ),
        };
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "job_description",
    //   key: "job_description",
    //   render: (text, record, index) => {
    //     return {
    //       props: {
    //         style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
    //       },
    //       children: (
    //         <>
    //           <p className="text-xs">{record.job_description}</p>
    //         </>
    //       ),
    //     };
    //   },
    // },
    {
      title: "Status",
      dataIndex: "is_posted",
      key: "is_posted",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <h1 className="text-xs">{text == 1 ? "Posted" : "Archived"}</h1>
            </>
          ),
        };
      },
    },
    // {
    //   title: "Link",
    //   dataIndex: "register_link",
    //   key: "register_link",
    //   align: "center",
    //   render: (text, record, index) => {
    //     return {
    //       props: {
    //         style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
    //       },
    //       children: (
    //         <>
    //           <a href={record.register_link} target="_blank">
    //             <h1 className=" text-blue-400 hover:text-blue-800 text-xs">
    //               {record.register_link} <SelectOutlined />
    //             </h1>
    //           </a>
    //         </>
    //       ),
    //     };
    //   },
    // },
    {
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <div className=" flex">
              <Button
                disabled={!isAllowedToUpdateCareer}
                onClick={() => {
                  if (!isAllowedToUpdateCareer) {
                    permissionWarningNotification("Memperbarui", "Career");
                    return;
                  }

                  setdrawedit(true);
                  setdataedit({
                    id: record.id,
                    name: record.name,
                    description: record.description,
                    qualification: record.qualification,
                    overview: record.overview,
                    salary_min: record.salary_min,
                    salary_max: record.salary_max,
                    career_role_type_id: record.career_role_type_id,
                    career_experience_id: record.career_experience_id,
                    is_posted: record.is_posted,
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
                disabled={!isAllowedToDeleteCareer}
                danger
                onClick={() => {
                  setmodaldelete(true);
                  setdatadelete({ ...datadelete, id: parseInt(record.id) });
                  setfeatureselected(record.name);
                }}
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

  //useState
  const [loadingProjects, setLoadingProjects] = useState(true);

  //create
  const [drawcreate, setdrawcreate] = useState(false);
  const [loadingcreate, setloadingcreate] = useState(false);
  const [datacreate, setdatacreate] = useState({
    name: "",
    description: "",
    qualification: "",
    overview: "",
    salary_min: 0,
    salary_max: 0,
    career_role_type_id: null,
    career_experience_id: null,
    is_posted: 0,
  });
  //update
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [dataedit, setdataedit] = useState({
    id: 0,
    name: "",
    description: "",
    qualification: "",
    overview: "",
    salary_min: 0,
    salary_max: 0,
    career_role_type_id: null,
    career_experience_id: null,
    is_posted: 0,
  });
  //delete
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [featureselected, setfeatureselected] = useState("");
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });
  const [dataCareersNew, setDataCareersNew] = useState([]);
  const [dataRawCareers, setDataRawCareers] = useState({
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

  //get data type role list
  useEffect(() => {
    if (!isAllowedToGetRoleTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Role");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoleTypesList`,
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
          setDataRoleTypeList(res2.data);
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
        // setLoadingRoleTypeList(false);
      });
  }, [isAllowedToGetRoleTypeList]);
  //get data
  useEffect(() => {
    if (!isAllowedToGetCareer) {
      permissionWarningNotification("Mendapatkan", "Data Tabel Careers");
      setLoadingProjects(false);
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      getCareers(params);
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    isAllowedToGetCareer,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.from,
    queryParams.to,
  ]);

  //getdata careers
  const getCareers = (params) => {
    setLoadingProjects(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareers${params}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawCareers(res2.data);
          setDataCareersNew(res2.data.data);
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
        setLoadingProjects(false);
      });
  };

  //handler
  const handleCreate = () => {
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/addCareer`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacreate),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdatacreate({
            name: "",
            description: "",
            qualification: "",
            overview: "",
            salary_min: 0,
            salary_max: 0,
            career_role_type_id: null,
            career_experience_id: null,
          });
          setTimeout(() => {
            setloadingcreate(false);
            setdrawcreate(false);
            const params = QueryString.stringify(queryParams, {
              addQueryPrefix: true,
            });
            getCareers(params);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
          setdrawcreate(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setloadingcreate(false));
  };
  const handleEdit = () => {
    setloadingedit(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareer`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataedit),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdataedit({
            id: 0,
            name: "",
            description: "",
            qualification: "",
            overview: "",
            salary_min: 0,
            salary_max: 0,
            career_role_type_id: null,
            career_experience_id: null,
          });
          setloadingedit(false);
          setdrawedit(false);
          const params = QueryString.stringify(queryParams, {
            addQueryPrefix: true,
          });
          getCareers(params);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingedit(false);
          setdrawedit(false);
        }
      });
  };
  const handleDelete = () => {
    setloadingdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/deleteCareer`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datadelete),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdatadelete({
            id: 0,
          });
          setTimeout(() => {
            setloadingdelete(false);
            setmodaldelete(false);
            const params = QueryString.stringify(queryParams, {
              addQueryPrefix: true,
            });
            getCareers(params);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
          setloadingdelete(false);
          setmodaldelete(false);
        }
      });
  };
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={"91"}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
          <h1 className="font-bold">Careers</h1>
          <Button
            type="primary"
            size="large"
            disabled={!isAllowedToAddCareer}
            onClick={() => {
              setdrawcreate(true);
            }}
          >
            Add New
          </Button>
        </div>
        <div className="col-span-5 p-0 md:p-5 flex flex-col">
          <Table
            columns={columnsFeature}
            dataSource={dataCareersNew}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 300 }}
          ></Table>
        </div>
      </div>

      <AccessControl hasPermission={CAREER_ADD}>
        <Drawer
          title={`Add A New Career`}
          maskClosable={false}
          visible={drawcreate}
          onClose={() => {
            setdrawcreate(false);
          }}
          width={380}
          destroyOnClose={true}
        >
          <div className="flex flex-col">
            <Form
              layout="vertical"
              initialValues={datacreate}
              onFinish={handleCreate}
            >
              <Form.Item
                label="Position Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Position Name wajib diisi",
                  },
                ]}
              >
                <Input
                  defaultValue={datacreate.name}
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      name: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Status Kontrak"
                name="career_role_type_id"
                rules={[
                  {
                    required: true,
                    message: "Status Kontrak wajib diisi",
                  },
                ]}
              >
                <Select
                  value={
                    datacreate?.career_role_type_id &&
                    Number(datacreate?.career_role_type_id)
                  }
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      career_role_type_id: e,
                    });
                  }}
                  placeholder="Pilih status kontrak"
                >
                  <>
                    {dataRoleTypeList?.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </>
                </Select>
              </Form.Item>
              <Form.Item
                label="Pengalaman Kerja"
                name="career_experience_id"
                rules={[
                  {
                    required: true,
                    message: "Pengalaman Kerja wajib diisi",
                  },
                ]}
              >
                <Select
                  value={
                    datacreate?.career_experience_id &&
                    Number(datacreate?.career_experience_id)
                  }
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      career_experience_id: e,
                    });
                  }}
                  placeholder="Pilih pengalaman kerja"
                >
                  <>
                    {dataExperience?.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </>
                </Select>
              </Form.Item>
              <Form.Item
                label="Salary Min"
                name="salary_min"
                rules={[
                  {
                    required: true,
                    message: "Salary Min wajib diisi",
                  },
                ]}
              >
                <CurrencyFormat
                  customInput={Input}
                  placeholder={"Masukkan Minimal Gaji"}
                  value={datacreate?.salary_min || 0}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setdatacreate((prev) => ({
                      ...prev,
                      salary_min: floatValue || 0,
                    }));
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </Form.Item>
              <Form.Item
                label="Salary Max"
                name="salary_max"
                rules={[
                  {
                    required: true,
                    message: "Salary Max wajib diisi",
                  },
                ]}
              >
                <CurrencyFormat
                  customInput={Input}
                  placeholder={"Masukkan Maksimal Gaji"}
                  value={datacreate?.salary_max || 0}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setdatacreate((prev) => ({
                      ...prev,
                      salary_max: floatValue || 0,
                    }));
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </Form.Item>
              <Form.Item
                label="Overview"
                name="overview"
                rules={[
                  {
                    required: true,
                    message: "Overview wajib diisi",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: 200 }}
                  defaultValue={datacreate.overview}
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      overview: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Description Job wajib diisi",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: 200 }}
                  defaultValue={datacreate.description}
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      description: e.target.value,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Qualification"
                name="qualification"
                rules={[
                  {
                    required: true,
                    message: "Qualification wajib diisi",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: 200 }}
                  defaultValue={datacreate.qualification}
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      qualification: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Status"
                name="is_posted"
                rules={[
                  {
                    required: true,
                    message: "Status wajib diisi",
                  },
                ]}
              >
                <Switch
                  size="large"
                  checkedChildren="Posted"
                  unCheckedChildren="Archived"
                  defaultChecked
                  checked={datacreate?.is_posted}
                  onChange={(e) => {
                    setdatacreate({
                      ...datacreate,
                      is_posted: e == true ? 1 : 0,
                    });
                  }}
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button
                  type="default"
                  onClick={() => {
                    setdrawcreate(false);
                  }}
                  style={{ marginRight: `1rem` }}
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={loadingcreate}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </Drawer>
      </AccessControl>

      <AccessControl hasPermission={CAREER_UPDATE}>
        <Drawer
          title={`Edit Career`}
          maskClosable={false}
          visible={drawedit}
          onClose={() => {
            setdrawedit(false);
          }}
          width={380}
          destroyOnClose={true}
        >
          <div className="flex flex-col">
            <Form
              layout="vertical"
              initialValues={dataedit}
              onFinish={handleEdit}
            >
              <Form.Item
                label="Position Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Position Name wajib diisi",
                  },
                ]}
              >
                <Input
                  defaultValue={dataedit.name}
                  onChange={(e) => {
                    setdataedit({ ...dataedit, name: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Status Kontrak"
                name="career_role_type_id"
                rules={[
                  {
                    required: true,
                    message: "Status Kontrak wajib diisi",
                  },
                ]}
              >
                <Select
                  value={
                    dataedit?.career_role_type_id &&
                    Number(dataedit?.career_role_type_id)
                  }
                  onChange={(e) => {
                    setdataedit({
                      ...dataedit,
                      career_role_type_id: e,
                    });
                  }}
                  placeholder="Pilih status kontrak"
                >
                  <>
                    {dataRoleTypeList?.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </>
                </Select>
              </Form.Item>
              <Form.Item
                label="Pengalaman Kerja"
                name="career_experience_id"
                rules={[
                  {
                    required: true,
                    message: "Pengalaman Kerja wajib diisi",
                  },
                ]}
              >
                <Select
                  value={
                    dataedit?.career_experience_id &&
                    Number(dataedit?.career_experience_id)
                  }
                  onChange={(e) => {
                    setdataedit({
                      ...dataedit,
                      career_experience_id: e,
                    });
                  }}
                  placeholder="Pilih pengalaman kerja"
                >
                  <>
                    {dataExperience?.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </>
                </Select>
              </Form.Item>
              <Form.Item
                label="Salary Min"
                name="salary_min"
                rules={[
                  {
                    required: true,
                    message: "Salary Min wajib diisi",
                  },
                ]}
              >
                <CurrencyFormat
                  customInput={Input}
                  placeholder={"Masukkan Minimal Gaji"}
                  value={dataedit?.salary_min || 0}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setdataedit((prev) => ({
                      ...prev,
                      salary_min: floatValue || 0,
                    }));
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </Form.Item>
              <Form.Item
                label="Salary Max"
                name="salary_max"
                rules={[
                  {
                    required: true,
                    message: "Salary Max wajib diisi",
                  },
                ]}
              >
                <CurrencyFormat
                  customInput={Input}
                  placeholder={"Masukkan Maksimal Gaji"}
                  value={dataedit?.salary_max || 0}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setdataedit((prev) => ({
                      ...prev,
                      salary_max: floatValue || 0,
                    }));
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </Form.Item>
              <Form.Item
                label="Overview"
                name="overview"
                rules={[
                  {
                    required: true,
                    message: "Overview wajib diisi",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: 200 }}
                  defaultValue={dataedit.overview}
                  onChange={(e) => {
                    setdataedit({
                      ...dataedit,
                      overview: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Description Job wajib diisi",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: 200 }}
                  defaultValue={dataedit.description}
                  onChange={(e) => {
                    setdataedit({
                      ...dataedit,
                      description: e.target.value,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Qualification"
                name="qualification"
                rules={[
                  {
                    required: true,
                    message: "Qualification wajib diisi",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: 200 }}
                  defaultValue={dataedit.qualification}
                  onChange={(e) => {
                    setdataedit({
                      ...dataedit,
                      qualification: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Status"
                name="is_posted"
                rules={[
                  {
                    required: true,
                    message: "Status wajib diisi",
                  },
                ]}
              >
                <Switch
                  size="large"
                  checkedChildren="Posted"
                  unCheckedChildren="Archived"
                  defaultChecked
                  checked={dataedit?.is_posted}
                  onChange={(e) => {
                    setdataedit({
                      ...dataedit,
                      is_posted: e == true ? 1 : 0,
                    });
                  }}
                />
              </Form.Item>
              <div className="flex justify-end">
                <Button
                  type="default"
                  onClick={() => {
                    setdrawedit(false);
                  }}
                  style={{ marginRight: `1rem` }}
                >
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary" loading={loadingedit}>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </Drawer>
      </AccessControl>

      <AccessControl hasPermission={CAREER_DELETE}>
        <Modal
          title={`Konfirmasi hapus career`}
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
          Yakin ingin hapus career dengan posisi {featureselected}?
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
      sidemenu: "4",
    },
  };
}

export default Careers;
