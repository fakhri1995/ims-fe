import {
  DeleteOutlined,
  EditOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input, Modal, Table, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

export const Careers = ({ initProps, dataProfile, dataCareers, sidemenu }) => {
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  //Definisi table
  const columnsFeature = [
    {
      title: "No",
      dataIndex: "nomor",
      key: "nomor",
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
                  setdrawedit(true);
                  setdataedit({
                    id: record.id,
                    position_name: record.position_name,
                    job_description: record.job_description,
                    job_category: record.job_category,
                    register_link: record.register_link,
                  });
                }}
              >
                <h1 className="hover:text-gray-500">{record.nomor}</h1>
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "Position Name",
      dataIndex: "position_name",
      key: "position_name",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className=" text-base">{record.position_name}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Description",
      dataIndex: "job_description",
      key: "job_description",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.job_description}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Category",
      dataIndex: "job_category",
      key: "job_category",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <h1 className="text-xs">{record.job_category}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Link",
      dataIndex: "register_link",
      key: "register_link",
      align: "center",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <a href={record.register_link} target="_blank">
                <h1 className=" text-blue-400 hover:text-blue-800 text-xs">
                  {record.register_link} <SelectOutlined />
                </h1>
              </a>
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
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <div className=" flex">
              <Button
                onClick={() => {
                  setdrawedit(true);
                  setdataedit({
                    id: record.id,
                    position_name: record.position_name,
                    job_description: record.job_description,
                    job_category: record.job_category,
                    register_link: record.register_link,
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
                  setfeatureselected(record.position_name);
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
  const datatemp = dataCareers.data ?? [];
  const dataCareersMap = datatemp.map((doc, idx) => {
    return {
      ...doc,
      nomor: idx + 1,
    };
  });

  //create
  const [drawcreate, setdrawcreate] = useState(false);
  const [loadingcreate, setloadingcreate] = useState(false);
  const [datacreate, setdatacreate] = useState({
    position_name: "",
    job_description: "",
    job_category: "",
    register_link: "",
  });
  //update
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [dataedit, setdataedit] = useState({
    id: 0,
    position_name: "",
    job_description: "",
    job_category: "",
    register_link: "",
  });
  //delete
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [featureselected, setfeatureselected] = useState("");
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });

  //handler
  const handleCreate = () => {
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addCareer`, {
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
            position_name: "",
            job_description: "",
            job_category: "",
            register_link: "",
          });
          setTimeout(() => {
            setloadingcreate(false);
            setdrawcreate(false);
            rt.push(`/admin/careers`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingcreate(false);
          setdrawcreate(false);
        }
      });
  };
  const handleEdit = () => {
    setloadingedit(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateCareer`, {
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
            position_name: "",
            job_description: "",
            job_category: "",
            register_link: "",
          });
          setTimeout(() => {
            setloadingedit(false);
            setdrawedit(false);
            rt.push(`/admin/careers`);
          }, 500);
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteCareer`, {
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
            rt.push(`/admin/careers`);
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
      sidemenu={sidemenu}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
          <h1 className="font-bold">Careers</h1>
          <Button
            type="primary"
            size="large"
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
            dataSource={dataCareersMap}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 300 }}
          ></Table>
        </div>
      </div>
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
              name="position_name"
              rules={[
                {
                  required: true,
                  message: "Position Name wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={datacreate.position_name}
                onChange={(e) => {
                  setdatacreate({
                    ...datacreate,
                    position_name: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="job_description"
              rules={[
                {
                  required: true,
                  message: "Description Job wajib diisi",
                },
              ]}
            >
              <Input.TextArea
                defaultValue={datacreate.job_description}
                onChange={(e) => {
                  setdatacreate({
                    ...datacreate,
                    job_description: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="job_category"
              rules={[
                {
                  required: true,
                  message: "Category wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={datacreate.job_category}
                onChange={(e) => {
                  setdatacreate({
                    ...datacreate,
                    job_category: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Register Link"
              name="register_link"
              rules={[
                {
                  required: true,
                  message: "Register Link wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={datacreate.register_link}
                onChange={(e) => {
                  setdatacreate({
                    ...datacreate,
                    register_link: e.target.value,
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
              <Button htmlType="submit" type="primary" loading={loadingcreate}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
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
              name="position_name"
              rules={[
                {
                  required: true,
                  message: "Position Name wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={dataedit.position_name}
                onChange={(e) => {
                  setdataedit({ ...dataedit, position_name: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="job_description"
              rules={[
                {
                  required: true,
                  message: "Description Job wajib diisi",
                },
              ]}
            >
              <Input.TextArea
                defaultValue={dataedit.job_description}
                onChange={(e) => {
                  setdataedit({ ...dataedit, job_description: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="job_category"
              rules={[
                {
                  required: true,
                  message: "Category wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={dataedit.job_category}
                onChange={(e) => {
                  setdataedit({ ...dataedit, job_category: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Register Link"
              name="register_link"
              rules={[
                {
                  required: true,
                  message: "Register Link wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={dataedit.register_link}
                onChange={(e) => {
                  setdataedit({ ...dataedit, register_link: e.target.value });
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

  const resourcesGC = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCareers`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGC = await resourcesGC.json();
  const dataCareers = resjsonGC;

  return {
    props: {
      initProps,
      dataProfile,
      dataCareers,
      sidemenu: "4",
    },
  };
}

export default Careers;
