import { DownOutlined, MinusCircleTwoTone } from "@ant-design/icons";
import {
  Anchor,
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Switch,
  notification,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function ServiceUpdate({
  initProps,
  dataProfile,
  dataDetailServiceItem,
  dataListServiceItem,
  dataListServiceCategories,
  serviceid,
  sidemenu,
}) {
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] =
    dataDetailServiceItem.data.service.nama_service_item;
  const { Link } = Anchor;
  const { Option } = Select;

  //data
  const dataListServiceItemMap = dataListServiceItem.data
    .filter((dataa) => {
      return dataa.id != serviceid;
    })
    .map((doc, idx) => {
      return {
        id: doc.id,
        itemName: doc.nama_service_item,
        categoryName: doc.nama_kategori,
        usageType: "Permanent",
        status: doc.is_publish,
      };
    });

  //useState
  const [dataupdate, setdataupdate] = useState({
    id: serviceid,
    id_service_kategori: dataDetailServiceItem.data.service.id_service_kategori,
    nama_service_item: dataDetailServiceItem.data.service.nama_service_item,
    deskripsi_singkat: dataDetailServiceItem.data.service.deskripsi_singkat,
    deskripsi_lengkap: dataDetailServiceItem.data.service.deskripsi_lengkap,
    // new_child_ids: ''
  });
  const [addfields, setaddfields] = useState(dataDetailServiceItem.data.childs);
  const [idfields, setidfields] = useState(
    dataDetailServiceItem.data.childs.map((doc, idx) => doc.id)
  );
  const [loadingupdate, setloadingupdate] = useState(false);
  const [loadinghapus, setloadinghapus] = useState(false);
  const [modalkonfhapuskateg, setmodalkonfhapuskateg] = useState(false);
  const [modalpublish, setmodalpublish] = useState(false);
  const [modalnonpublish, setmodalnonpublish] = useState(false);

  //onChange
  const onChangeAddAdditionalItems = (val) => {
    const selectedData = dataListServiceItemMap
      .filter((dataa) => {
        return dataa.id == val;
      })
      .map((doc, idx) => {
        return {
          id: doc.id,
          nama_service_item: doc.itemName,
        };
      })[0];
    if (selectedData) {
      setaddfields([...addfields, selectedData]);
      setidfields((prev) => [...prev, val]);
    }
  };
  const onSearchAdditionalItems = (val) => {
    if (val === "") {
      setaddfields(addfields);
    }
  };
  const onDeleteAdditionalItems = (id) => {
    setaddfields((prev) =>
      prev.filter((dataa) => {
        return dataa.id !== id;
      })
    );
    setidfields((prev) =>
      prev.filter((dataa) => {
        return dataa !== id;
      })
    );
  };

  //handler
  const handleUpdateService = () => {
    const objupdate = {
      ...dataupdate,
      new_child_ids: idfields,
    };
    setloadingupdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateServiceItem`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objupdate),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setloadingupdate(false);
            // rt.push(`/admin/service/${serviceid}`)
            rt.push(`/admin/service`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingupdate(false);
        }
      });
  };
  const handleHapusService = () => {
    setloadinghapus(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteServiceItem`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: serviceid,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setloadinghapus(false);
            rt.push(`/admin/service`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadinghapus(false);
        }
      });
  };
  const handlePublish = () => {
    setloadinghapus(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/depublishingServiceItem`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: serviceid,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setloadinghapus(false);
            setmodalpublish(false);
            // rt.push(`/admin/service/${serviceid}`)
            rt.push(`/admin/service`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadinghapus(false);
          setmodalpublish(false);
        }
      });
  };

  const handleNonPublish = () => {
    setloadinghapus(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/publishingServiceItem`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: serviceid,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setloadinghapus(false);
            setmodalnonpublish(false);
            rt.push(`/admin/service/${serviceid}`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadinghapus(false);
          setmodalnonpublish(false);
        }
      });
  };

  //Render Components
  // const menu = (
  //     <Menu>
  //         <Menu.Item key="1" onClick={handleUpdateService}>
  //             Save & Publish
  //       </Menu.Item>
  //         <Menu.Item key="2" onClick={handleUpdateService}>
  //             Save As Draft
  //       </Menu.Item>
  //     </Menu>
  // );
  // const uploadButton = (
  //     <div>
  //         {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
  //         <div style={{ marginTop: 8 }}>Unggah</div>
  //     </div>
  // );

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
    >
      <div className="w-full border-t border-opacity-30 border-gray-500 bg-white">
        <div className="w-full flex flex-col md:flex-row justify-between p-3">
          <div className="flex items-center">
            <p className="font-semibold text-lg mr-3 my-0">
              {dataDetailServiceItem.data.service.nama_service_item}
            </p>
            <>
              {/* {
                                [192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr)) ? */}
              <>
                {dataDetailServiceItem.data.service.is_publish ? (
                  <Switch
                    checked={true}
                    onChange={() => {
                      setmodalpublish(true);
                    }}
                    checkedChildren={"Published"}
                  ></Switch>
                ) : (
                  <Switch
                    checked={false}
                    onChange={() => {
                      setmodalnonpublish(true);
                    }}
                    unCheckedChildren={"Draft"}
                  ></Switch>
                )}
              </>
              {/* :
                                    <>
                                        {
                                            dataDetailServiceItem.data.service.is_publish ?
                                                <Switch disabled checked={true} onChange={() => { setmodalpublish(true) }} checkedChildren={"Published"}></Switch>
                                                :
                                                <Switch disabled checked={false} onChange={() => { setmodalnonpublish(true) }} unCheckedChildren={"Draft"}></Switch>
                                        }
                                    </>
                            } */}
            </>
          </div>
          <div className="pt-3">
            <Button
              type="default"
              style={{ marginRight: `1rem` }}
              onClick={() => {
                rt.push("/admin/service");
              }}
            >
              Cancel
            </Button>
            {
              // [191].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Button
                type="ghost"
                style={{ marginRight: `1rem` }}
                onClick={() => {
                  setmodalkonfhapuskateg(true);
                }}
              >
                Delete
              </Button>
            }
            {
              // [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Button
                style={{ backgroundColor: `rgb(24,144,255)`, color: `white` }}
                loading={loadingupdate}
                onClick={handleUpdateService}
              >
                Save {/*<DownOutlined />*/}
              </Button>
            }
          </div>
        </div>
        <div className="w-full grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1 flex flex-col p-3">
            <Anchor>
              <Link href="#generalDetail" title="General Detail" />
              <Link href="#customFields" title="Custom Fields" />
              <Link href="#additionalFields" title="Addtional Fields" />
              <Link href="#settings" title="Settings" />
            </Anchor>
          </div>
          <div className="col-span-7 lg:col-span-6 flex flex-col">
            <div id="generalDetail" className="mb-5 flex flex-col">
              <div className="flex justify-between items-center p-3">
                <div>
                  <p className="font-semibold text-base">General Detail</p>
                </div>
                <div>
                  <a href="#">Help</a>
                </div>
              </div>
              <div className="flex p-3">
                {/* <div className="mr-5">
                                    <div>
                                        <Upload
                                            name="profile_image"
                                            listType="picture-card"
                                            className="profileImage"
                                            showUploadList={false}
                                        >
                                            {datanew.image_logo ? <img src={datanew.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    </div>
                                </div> */}
                <div className="w-full lg:w-7/12">
                  <Form
                    layout="vertical"
                    onFinish={handleUpdateService}
                    initialValues={dataupdate}
                  >
                    <Form.Item
                      label="Item Name"
                      name="nama_service_item"
                      rules={[
                        {
                          required: true,
                          message: "Nama Item wajib diisi",
                        },
                      ]}
                    >
                      {/* {
                                                [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) ? */}
                      <Input
                        name="nama_service_item"
                        onChange={(e) => {
                          setdataupdate({
                            ...dataupdate,
                            nama_service_item: e.target.value,
                          });
                        }}
                        defaultValue={dataupdate.nama_service_item}
                      ></Input>
                      {/* :
                                                    <div className="col-span-1 flex flex-col mb-5">
                                                        <h1 className="font-semibold text-sm">Item Name:</h1>
                                                        <h1 className="text-sm font-normal text-black">{dataupdate.nama_service_item}</h1>
                                                    </div>
                                            } */}
                    </Form.Item>
                    <Form.Item
                      label="Service Category"
                      name="id_service_kategori"
                      rules={[
                        {
                          required: true,
                          message: "Service Category wajib diisi",
                        },
                      ]}
                    >
                      {/* {
                                                [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) ? */}
                      <Select
                        placeholder="Pilih Service Category"
                        onChange={(value) => {
                          setdataupdate({
                            ...dataupdate,
                            id_service_kategori: value,
                          });
                        }}
                        name="id_service_kategori"
                        defaultValue={dataupdate.id_service_kategori}
                      >
                        {dataListServiceCategories.data.map((doc, idx) => {
                          return (
                            <Option key={idx} value={doc.id}>
                              {doc.nama_kategori}
                            </Option>
                          );
                        })}
                      </Select>
                      {/* :
                                                    <Select disabled placeholder="Pilih Service Category" onChange={(value) => { setdataupdate({ ...dataupdate, id_service_kategori: value }) }} name="id_service_kategori" defaultValue={dataupdate.id_service_kategori}>
                                                        {
                                                            dataListServiceCategories.data.map((doc, idx) => {
                                                                return (
                                                                    <Option key={idx} value={doc.id}>{doc.nama_kategori}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                            } */}
                    </Form.Item>
                    <Form.Item
                      label="Short Description"
                      name="deskripsi_singkat"
                    >
                      {/* {
                                                [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) ? */}
                      <Input
                        name="deskripsi_singkat"
                        onChange={(e) => {
                          setdataupdate({
                            ...dataupdate,
                            deskripsi_singkat: e.target.value,
                          });
                        }}
                        defaultValue={dataupdate.deskripsi_singkat}
                      ></Input>
                      {/* :
                                                    <div className="col-span-1 flex flex-col mb-5">
                                                        <h1 className="font-semibold text-sm">Short Description:</h1>
                                                        <h1 className="text-sm font-normal text-black">{dataupdate.deskripsi_singkat}</h1>
                                                    </div>
                                            } */}
                    </Form.Item>
                    <Form.Item label="Description" name="deskripsi_lengkap">
                      {/* {
                                                [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) ? */}
                      <Input.TextArea
                        name="deskripsi_lengkap"
                        onChange={(e) => {
                          setdataupdate({
                            ...dataupdate,
                            deskripsi_lengkap: e.target.value,
                          });
                        }}
                        defaultValue={dataupdate.deskripsi_lengkap}
                      />
                      {/* :
                                                    <div className="col-span-1 flex flex-col mb-5">
                                                        <h1 className="font-semibold text-sm">Description:</h1>
                                                        <p className="text-sm font-normal text-black">{dataupdate.deskripsi_lengkap}</p>
                                                    </div>
                                            } */}
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            <div id="customFields" className=" h-96 mb-5">
              <div className="flex justify-between items-center p-3">
                <div>
                  <p className="font-semibold text-base">Custom Fields</p>
                </div>
              </div>
            </div>
            <div id="additionalFields" className=" flex flex-col mb-5 p-3">
              <h1 className="font-semibold text-base">Additional Items</h1>
              <p className="text-xs text-gray-500">
                Add related service items that can be requested along with this
                item
              </p>
              {
                // [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Select
                  showSearch
                  placeholder="Cari & Tambah Service Items"
                  onChange={onChangeAddAdditionalItems}
                  onSearch={(value) => {
                    onSearchAdditionalItems(value);
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ marginBottom: `0.7rem`, width: `20rem` }}
                  allowClear
                >
                  {dataListServiceItemMap.map((doc, idx) => {
                    return (
                      <Option key={idx} value={doc.id}>
                        {doc.itemName}
                      </Option>
                    );
                  })}
                </Select>
              }
              <div className="flex flex-col">
                {addfields.map((doc, idx) => {
                  return (
                    <div className=" w-6/12 flex justify-between border-2 border-blue-500 p-3 divide-x-2 mb-2">
                      <div className="flex items-center">
                        {
                          // [190].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                          <MinusCircleTwoTone
                            style={{ marginRight: `0.5rem`, cursor: `pointer` }}
                            onClick={() => {
                              onDeleteAdditionalItems(doc.id);
                            }}
                          />
                        }
                        {doc.nama_service_item}
                      </div>
                      <div className="flex pl-3">
                        <Checkbox disabled style={{ marginRight: `0.7rem` }} />{" "}
                        Tandai sebagai Wajib
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div id="settings" className=" h-96 mb-5">
              <div className="flex justify-between items-center p-3">
                <div>
                  <p className="font-semibold text-base">Settings</p>
                </div>
              </div>
            </div>
            <Modal
              title={`Konfirmasi Hapus Service Item`}
              visible={modalkonfhapuskateg}
              okButtonProps={{ disabled: loadinghapus }}
              onCancel={() => {
                setmodalkonfhapuskateg(false);
              }}
              onOk={handleHapusService}
              maskClosable={false}
              style={{ top: `3rem` }}
              width={500}
              destroyOnClose={true}
            >
              Yakin ingin hapus Service Item:{" "}
              <strong>
                {dataDetailServiceItem.data.service.nama_service_item}
              </strong>
              ?
            </Modal>
            <Modal
              title={`Konfirmasi Draft Service Item`}
              visible={modalpublish}
              okButtonProps={{ disabled: loadinghapus }}
              onCancel={() => {
                setmodalpublish(false);
              }}
              onOk={handlePublish}
              maskClosable={false}
              style={{ top: `3rem` }}
              width={500}
              destroyOnClose={true}
            >
              Yakin ingin mengubah status menjadi draft pada Service Item:{" "}
              <strong>
                {dataDetailServiceItem.data.service.nama_service_item}
              </strong>
              ?
            </Modal>
            <Modal
              title={`Konfirmasi Publish Service Item`}
              visible={modalnonpublish}
              okButtonProps={{ disabled: loadinghapus }}
              onCancel={() => {
                setmodalnonpublish(false);
              }}
              onOk={handleNonPublish}
              maskClosable={false}
              style={{ top: `3rem` }}
              width={500}
              destroyOnClose={true}
            >
              Yakin ingin mengubah status menjadi Published pada Service Item:{" "}
              <strong>
                {dataDetailServiceItem.data.service.nama_service_item}
              </strong>
              ?
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const serviceid = params.serviceId;
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

  // if (!([188, 190, 191, 192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr)))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  const resourcesGDI = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getServiceItem?id=${parseInt(
      serviceid
    )}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGDI = await resourcesGDI.json();
  const dataDetailServiceItem = resjsonGDI;

  const resourcesGSI = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getServiceItems`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGSI = await resourcesGSI.json();
  const dataListServiceItem = resjsonGSI;

  const resourcesGSC = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getServiceCategories`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGSC = await resourcesGSC.json();
  const dataListServiceCategories = resjsonGSC;

  return {
    props: {
      initProps,
      dataProfile,
      dataDetailServiceItem,
      dataListServiceItem,
      dataListServiceCategories,
      serviceid,
      sidemenu: "4",
    },
  };
}

export default ServiceUpdate;
