import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function Financial({ initProps, dataProfile, dataGetDepreciations, sidemenu }) {
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const { Option } = Select;

  //data Table
  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: <>{record.nama}</>,
        };
      },
    },
    {
      title: "Tipe",
      dataIndex: "jenis",
      key: "jenis",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: <>{record.jenis}</>,
        };
      },
    },
    {
      title: "Tahun Penggunaan",
      dataIndex: "tahun_penggunaan",
      key: "tahun_penggunaan",
      align: "center",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: <div className="flex justify-center">{text}</div>,
        };
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: <>{record.deskripsi}</>,
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
              {[171].every((curr) =>
                dataProfile.data.registered_feature.includes(curr)
              ) && (
                <Button
                  onClick={() => {
                    setdataedit({
                      id: record.id,
                      nama: record.nama,
                      jenis: record.jenis,
                      tahun_penggunaan: record.tahun_penggunaan,
                      deskripsi: record.deskripsi,
                    });
                    setmodaledit(true);
                  }}
                  style={{
                    paddingTop: `0`,
                    paddingBottom: `0.3rem`,
                    marginRight: `1rem`,
                  }}
                >
                  <EditOutlined />
                </Button>
              )}
              {[172].every((curr) =>
                dataProfile.data.registered_feature.includes(curr)
              ) && (
                <Button
                  danger
                  onClick={() => {
                    setmodaldelete(true);
                    setiddelete(record.id);
                  }}
                  loading={loadingdelete}
                  style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}
                >
                  <DeleteOutlined />
                </Button>
              )}
            </div>
          ),
        };
      },
    },
  ];

  const dataListDepreciationsMap = dataGetDepreciations.data.map((doc, idx) => {
    return {
      id: doc.id,
      nama: doc.nama,
      jenis: doc.jenis,
      tahun_penggunaan: doc.tahun_penggunaan,
      deskripsi: doc.deskripsi,
    };
  });

  //useState
  const [recordrow, setrecordrow] = useState({});
  const [datacreate, setdatacreate] = useState({
    nama: "",
    jenis: "",
    tahun_penggunaan: 0,
    deskripsi: "",
  });
  const [dataedit, setdataedit] = useState({
    id: recordrow.id,
    nama: recordrow.nama,
    jenis: recordrow.jenis,
    tahun_penggunaan: recordrow.tahun_penggunaan,
    deskripsi: recordrow.deskripsi,
  });
  var datacell = [];
  for (var i = 0; i < dataGetDepreciations.data.length; i++) {
    datacell.push(false);
  }
  const [tambahbtn, settambahbtn] = useState(true);
  const [hoverbtn, sethoverbtn] = useState(datacell);
  const [editarea, seteditarea] = useState(datacell);
  const [iddelete, setiddelete] = useState(0);
  const [loadingcreate, setloadingcreate] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [modaldelete, setmodaldelete] = useState(false);
  const [modaledit, setmodaledit] = useState(false);

  //events
  const onHoverCell = (e, idx) => {
    console.log("over:" + idx + hoverbtn[idx]);
    const temp = hoverbtn;
    temp[idx] = true;
    sethoverbtn(temp);
  };
  const onLeaveCell = (e, idx) => {
    console.log("leave:" + idx + hoverbtn[idx]);
    const temp = hoverbtn;
    temp[idx] = false;
    sethoverbtn(temp);
  };
  const onChangeCreate = (e) => {
    setdatacreate({
      ...datacreate,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeEdit = (e) => {
    setdataedit({
      ...dataedit,
      [e.target.name]: e.target.value,
    });
  };

  //handler
  const handleCancelUpdate = (index) => {
    var temp = editarea;
    temp[index] = false;
    seteditarea(temp);
    console.log("cancel " + editarea[index]);
  };
  const handleCreate = () => {
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addDepreciation`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacreate),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingcreate(false);
        settambahbtn(true);
        setdatacreate({
          nama: "",
          jenis: "",
          tahun_penggunaan: 0,
          deskripsi: "",
        });
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/financial`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
        }
      });
  };
  const handleDelete = () => {
    setloadingdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteDepreciation`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: iddelete,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingdelete(false);
        setmodaldelete(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/financial`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
        }
      });
  };
  const handleEdit = () => {
    setloadingedit(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateDepreciation`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataedit),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingedit(false);
        setmodaledit(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/financial`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
        }
      });
  };

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 lg:col-span-5 flex flex-col">
          <div className="border-b border-opacity-30 border-gray-400 flex items-center p-4 mb-5">
            <h1 className="font-semibold">Financial</h1>
          </div>
          <div className="flex flex-col">
            <div className="border-b w-full mb-3">
              <div className=" border-b-4 border-gray-400 p-1 w-24">
                Depreciation
              </div>
            </div>
            {!tambahbtn ? (
              <div className="flex flex-col mb-4">
                <div className="flex items-center font-bold mb-6">
                  Tambah Depresiasi Baru
                </div>
                <div className=" flex flex-col">
                  <div className="w-full">
                    <Form
                      layout="vertical"
                      onFinish={handleCreate}
                      initialValues={datacreate}
                      style={{ width: `100%` }}
                    >
                      <div className="w-full md:grid md:grid-cols-3">
                        <Form.Item
                          label="Nama"
                          name="nama"
                          rules={[
                            {
                              required: true,
                              message: "Nama wajib diisi",
                            },
                          ]}
                          style={{ marginRight: `1rem` }}
                        >
                          <Input
                            name="nama"
                            onChange={onChangeCreate}
                            defaultValue={datacreate.nama}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Tipe"
                          name="jenis"
                          rules={[
                            {
                              required: true,
                              message: "Wajib diisi",
                            },
                          ]}
                          style={{ marginRight: `1rem` }}
                        >
                          <Select
                            defaultValue={datacreate.jenis}
                            onChange={(value) => {
                              setdatacreate({ ...datacreate, jenis: value });
                            }}
                          >
                            <Option value={"Declining Balance"}>
                              Declining Balance
                            </Option>
                            <Option value={"Staright Line"}>
                              Staright Line
                            </Option>
                            <Option value={"Sum of Years Digit"}>
                              Sum of Years Digit
                            </Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Daya Tahan (tahun)"
                          name="tahun_penggunaan"
                          rules={[
                            {
                              required: true,
                              message: "Wajib diisi",
                            },
                          ]}
                          style={{ marginRight: `1rem` }}
                        >
                          <Input
                            name="tahun_penggunaan"
                            onChange={onChangeCreate}
                            defaultValue={datacreate.tahun_penggunaan}
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-2">
                        <Form.Item label="Deskripsi" name="deskripsi">
                          <Input.TextArea
                            name="deskripsi"
                            onChange={onChangeCreate}
                            defaultValue={datacreate.deskripsi}
                            style={{ width: `100%` }}
                          ></Input.TextArea>
                        </Form.Item>
                      </div>
                      <div className="flex justify-end items-center">
                        <Button
                          type="default"
                          onClick={() => {
                            settambahbtn(true);
                          }}
                          size="middle"
                          style={{ marginRight: `1rem` }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loadingcreate}
                          size="middle"
                        >
                          Save
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-between mb-3">
              <div className=" font-semibold text-gray-400">
                Semua Depresiasi
              </div>
              {tambahbtn ? (
                // <button className={`${tambahbtn} text-blue-500 hover:text-blue-700 text-sm flex items-center`} onClick={() => { settambahbtn(false) }}>
                //     <PlusCircleTwoTone style={{ marginRight: `0.2rem`, marginTop: `0.1rem` }} /> Tambah Baru
                // </button>
                <>
                  {[170].every((curr) =>
                    dataProfile.data.registered_feature.includes(curr)
                  ) && (
                    <Button
                      type="primary"
                      onClick={() => {
                        settambahbtn(false);
                      }}
                    >
                      Add New
                    </Button>
                  )}
                </>
              ) : null}
            </div>
            <Table
              columns={columns}
              dataSource={dataListDepreciationsMap}
              pagination={{ pageSize: 8 }}
              scroll={{ x: 300 }}
            ></Table>
            <Modal
              title={`Konfirmasi hapus depresiasi`}
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
              Yakin ingin hapus depresiasi ini?
            </Modal>
            <Modal
              title={`Edit Depresiasi`}
              visible={modaledit}
              onCancel={() => {
                setmodaledit(false);
              }}
              footer={null}
              maskClosable={false}
              style={{ top: `3rem` }}
              width={700}
              destroyOnClose={true}
            >
              <div className="flex flex-col mb-4">
                <div className="flex items-center font-bold mb-3">
                  Edit Depresiasi
                </div>
                <div className=" flex flex-col">
                  <div className="w-full">
                    <Form
                      layout="vertical"
                      onFinish={handleEdit}
                      initialValues={dataedit}
                    >
                      <div className=" w-full md:grid grid-cols-3">
                        <Form.Item
                          label="Nama"
                          name="nama"
                          rules={[
                            {
                              required: true,
                              message: "Nama wajib diisi",
                            },
                          ]}
                          style={{ marginRight: `1rem` }}
                        >
                          <Input
                            name="nama"
                            onChange={onChangeEdit}
                            defaultValue={dataedit.nama}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Tipe"
                          name="jenis"
                          rules={[
                            {
                              required: true,
                              message: "Wajib diisi",
                            },
                          ]}
                          style={{ marginRight: `1rem` }}
                        >
                          <Select
                            defaultValue={dataedit.jenis}
                            onChange={(value) => {
                              setdataedit({ ...dataedit, jenis: value });
                            }}
                          >
                            <Option value={"Declining Balance"}>
                              Declining Balance
                            </Option>
                            <Option value={"Staright Line"}>
                              Staright Line
                            </Option>
                            <Option value={"Sum of Years Digit"}>
                              Sum of Years Digit
                            </Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Daya Tahan (tahun)"
                          name="tahun_penggunaan"
                          rules={[
                            {
                              required: true,
                              message: "Wajib diisi",
                            },
                          ]}
                          style={{ marginRight: `1rem` }}
                        >
                          <Input
                            name="tahun_penggunaan"
                            onChange={onChangeEdit}
                            defaultValue={dataedit.tahun_penggunaan}
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-2">
                        <Form.Item label="Deskripsi" name="deskripsi">
                          <Input.TextArea
                            name="deskripsi"
                            onChange={onChangeEdit}
                            defaultValue={dataedit.deskripsi}
                            style={{ width: `100%` }}
                          ></Input.TextArea>
                        </Form.Item>
                      </div>
                      <div className="flex justify-end items-center">
                        <Button
                          type="default"
                          onClick={() => {
                            setmodaledit(false);
                          }}
                          size="middle"
                          style={{ marginRight: `1rem` }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loadingedit}
                          size="middle"
                        >
                          Save
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

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

  // if (![169, 170, 171, 172].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  const resourcesGD = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDepreciations`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGD = await resourcesGD.json();
  const dataGetDepreciations = resjsonGD;
  return {
    props: {
      initProps,
      dataProfile,
      dataGetDepreciations,
      sidemenu: "4",
    },
  };
}

export default Financial;
