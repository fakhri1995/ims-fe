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
  Table,
  message,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const FeaturesIndex = ({
  initProps,
  dataProfile,
  dataListFeatures,
  sidemenu,
}) => {
  //Definisi table
  const columnsFeature = [
    {
      title: "Nomor",
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
                    name: record.name,
                    description: record.description,
                  });
                }}
              >
                <h1 className="font-semibold hover:text-gray-500">
                  {record.nomor}
                </h1>
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "Nama Feature",
      dataIndex: "name",
      key: "name",
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
                    name: record.name,
                    description: record.description,
                  });
                }}
              >
                <h1 className="hover:text-gray-500">{record.name}</h1>
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
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
                    name: record.name,
                    description: record.description,
                  });
                }}
              >
                <h1 className="hover:text-gray-500 text-xs">
                  {record.description}
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
                disabled
                onClick={() => {
                  setdrawedit(true);
                  setdataedit({
                    id: record.id,
                    name: record.name,
                    description: record.description,
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
                disabled
                danger
                onClick={() => {
                  setmodaldelete(true);
                  setdatadelete({ ...datadelete, id: parseInt(record.id) });
                  setfeatureselected(record.name);
                }}
                loading={loadingdelete}
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

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const { Search } = Input;

  //useState
  dataListFeatures.data = dataListFeatures.data.map((doc, idx) => {
    return {
      ...doc,
      nomor: idx + 1,
    };
  });
  const [datatable, setdatatable] = useState(dataListFeatures.data);

  //create
  const [drawcreate, setdrawcreate] = useState(false);
  const [loadingcreate, setloadingcreate] = useState(false);
  const [datacreate, setdatacreate] = useState({
    name: "",
    description: "",
  });
  //update
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [dataedit, setdataedit] = useState({
    id: 0,
    name: "",
    description: "",
  });
  //delete
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [featureselected, setfeatureselected] = useState("");
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });

  //event
  const onCariFeature = (e) => {
    console.log("asa: " + e.target.value);
    if (e.target.value === "") {
      setdatatable(dataListFeatures.data);
    } else {
      setdatatable(dataListFeatures.data);
      setdatatable((prev) => {
        return prev.filter((dataa) => {
          return dataa.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
      });
    }
  };
  const handleDelete = () => {
    setloadingdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteFeature`, {
      method: "POST",
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
          setTimeout(() => {
            setloadingdelete(false);
            setmodaldelete(false);
            rt.push(`/admin/features`);
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
  const handleEdit = () => {
    notification["warning"]({
      message: "API still not available",
      duration: 3,
    });
  };
  const handleCreate = () => {
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addFeature`, {
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
          setTimeout(() => {
            setloadingcreate(false);
            setdrawcreate(false);
            rt.push(`/admin/features`);
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
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
          <h1 className="font-bold">Features</h1>
          <Button
            disabled
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
          <div className="w-full md:w-5/12">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Cari Fitur"
              style={{
                borderRadius: `0.1rem`,
                marginBottom: `1rem`,
                width: `100%`,
              }}
              onChange={onCariFeature}
              allowClear
            />
          </div>
          <Table
            columns={columnsFeature}
            dataSource={datatable}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 300 }}
          ></Table>
        </div>
      </div>
      <Drawer
        title={`Tambah Feature`}
        maskClosable={false}
        visible={drawcreate}
        onClose={() => {
          setdrawcreate(
            false
          ); /*closeClientsDrawer(); instanceForm.resetFields()*/
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
              label="Nama Feature"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Nama feature wajib diisi",
                },
              ]}
            >
              <Input
                defaultValue={datacreate.name}
                onChange={(e) => {
                  setdatacreate({ ...datacreate, name: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Deskripsi"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Deskripsi wajib diisi",
                },
              ]}
            >
              <Input.TextArea
                defaultValue={datacreate.description}
                onChange={(e) => {
                  setdatacreate({ ...datacreate, description: e.target.value });
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
                onClick={() => {
                  setdrawcreate(false);
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
      <Drawer
        title={`Edit Feature`}
        maskClosable={false}
        visible={drawedit}
        onClose={() => {
          setdrawedit(
            false
          ); /*closeClientsDrawer(); instanceForm.resetFields()*/
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
              label="Nama Feature"
              rules={[
                {
                  required: true,
                  message: "Nama feature wajib diisi",
                },
              ]}
              name="name"
            >
              <Input
                defaultValue={dataedit.name}
                onChange={(e) => {
                  setdataedit({ ...dataedit, name: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Deskripsi"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Deskripsi wajib diisi",
                },
              ]}
              style={{ marginBottom: `3rem` }}
            >
              <Input.TextArea
                defaultValue={dataedit.description}
                onChange={(e) => {
                  setdataedit({ ...dataedit, description: e.target.value });
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
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => {
                  setdrawedit(false);
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
      <Modal
        title={`Konfirmasi hapus feature`}
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
        Yakin ingin hapus feature {featureselected}?
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFeatures`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGF = await resourcesGF.json();
  const dataListFeatures = resjsonGF;

  return {
    props: {
      initProps,
      dataProfile,
      dataListFeatures,
      sidemenu: "4",
    },
  };
}

export default FeaturesIndex;
