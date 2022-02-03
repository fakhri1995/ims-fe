import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { DownOutlined, MinusCircleTwoTone } from "@ant-design/icons";
import {
  Anchor,
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Menu,
  Select,
  notification,
} from "antd";
import httpcookie from "cookie";
import { useRouter } from "next/router";
import { useState } from "react";

function ServiceCreate({
  initProps,
  dataProfile,
  dataListServiceCategories,
  dataListServiceItem,
  sidemenu,
}) {
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const { Link } = Anchor;
  const { Option } = Select;

  //data Source
  const dataListServiceItemMap = dataListServiceItem.data.map((doc, idx) => {
    return {
      id: doc.id,
      itemName: doc.nama_service_item,
      categoryName: doc.nama_kategori,
      usageType: "Permanent",
      status: doc.is_publish,
    };
  });
  // const dataSource = [
  //     {
  //         key: '1',
  //         itemName: 'Adobe Illustrator',
  //         categoryName: 'Software Installation',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  //     {
  //         key: '2',
  //         itemName: 'Adobe Photoshop CS6',
  //         categoryName: 'Software Installation',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  //     {
  //         key: '3',
  //         itemName: 'Microsoft Outlook',
  //         categoryName: 'Software Installation',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  //     {
  //         key: '4',
  //         itemName: 'Microsoft Excel',
  //         categoryName: 'Software Installation',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  //     {
  //         key: '5',
  //         itemName: 'Apple Macbook',
  //         categoryName: 'Hardware Provisioning',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  //     {
  //         key: '6',
  //         itemName: 'Scan Printer Epson',
  //         categoryName: 'Hardware Provisioning',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  //     {
  //         key: '7',
  //         itemName: 'Employement Verification Letter',
  //         categoryName: 'HR Management',
  //         usageType: 'Permanent',
  //         status: 'Published'
  //     },
  // ];

  //UseState

  const [idfields, setidfields] = useState([]);
  const [datanew, setdatanew] = useState({
    id_service_kategori: "",
    nama_service_item: "",
    deskripsi_singkat: "",
    deskripsi_lengkap: "",
    // child_ids: []
  });
  const [addfields, setaddfields] = useState([]);
  const [loadingbtntambahitem, setloadingbtntambahitem] = useState(false);
  // const [loadingupload, setloadingupload] = useState(false)

  //onChange
  const onChangeAddAdditionalItems = (val) => {
    const selectedData = dataListServiceItemMap.filter((dataa) => {
      return dataa.id == val;
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
  const handleCreateService = () => {
    const objnew = {
      ...datanew,
      child_ids: idfields,
    };
    setloadingbtntambahitem(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/addServiceItem`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objnew),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setloadingbtntambahitem(false);
            rt.push(`/admin/service`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingbtntambahitem(false);
        }
      });
  };

  //Render Components
  const menu = (
    <Menu>
      {/* <Menu.Item key="1" onClick={handleCreateService}>
                Save & Publish
          </Menu.Item> */}
      <Menu.Item key="2" onClick={handleCreateService}>
        Save As Draft
      </Menu.Item>
    </Menu>
  );
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
          <div>
            <p className="font-semibold text-lg">Add Service Item</p>
          </div>
          <div>
            <Button
              type="default"
              style={{ marginRight: `1rem` }}
              onClick={() => {
                rt.push("/admin/service");
              }}
            >
              Cancel
            </Button>
            {/* <Dropdown overlay={menu} trigger={['click']}> */}
            <Button
              style={{ backgroundColor: `rgb(24,144,255)`, color: `white` }}
              loading={loadingbtntambahitem}
              onClick={handleCreateService}
            >
              Save {/*<DownOutlined />*/}
            </Button>
            {/* </Dropdown> */}
          </div>
        </div>
        <div className="w-full grid grid-cols-7">
          <div className=" col-span-7 md:col-span-1 flex flex-col">
            <Anchor>
              <Link href="#generalDetail" title="General Detail" />
              <Link href="#customFields" title="Custom Fields" />
              <Link href="#additionalFields" title="Addtional Fields" />
              <Link href="#settings" title="Settings" />
            </Anchor>
          </div>
          <div className=" col-span-7 md:col-span-6 flex flex-col">
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
                <div className=" w-full md:w-7/12">
                  <Form
                    layout="vertical"
                    onFinish={handleCreateService}
                    initialValues={datanew}
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
                      <Input
                        name="nama_service_item"
                        onChange={(e) => {
                          setdatanew({
                            ...datanew,
                            nama_service_item: e.target.value,
                          });
                        }}
                        defaultValue={datanew.nama_service_item}
                      ></Input>
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
                      <Select
                        placeholder="Pilih Service Category"
                        onChange={(value) => {
                          setdatanew({
                            ...datanew,
                            id_service_kategori: value,
                          });
                        }}
                        name="id_service_kategori"
                        defaultValue={datanew.id_service_kategori}
                      >
                        {dataListServiceCategories.data.map((doc, idx) => {
                          return (
                            <Option key={idx} value={doc.id}>
                              {doc.nama_kategori}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Deskripsi Singkat"
                      name="deskripsi_singkat"
                    >
                      <Input
                        name="deskripsi_singkat"
                        onChange={(e) => {
                          setdatanew({
                            ...datanew,
                            deskripsi_singkat: e.target.value,
                          });
                        }}
                        defaultValue={datanew.deskripsi_singkat}
                      ></Input>
                    </Form.Item>
                    <Form.Item label="Deskripsi" name="deskripsi_lengkap">
                      <Input.TextArea
                        name="deskripsi_lengkap"
                        onChange={(e) => {
                          setdatanew({
                            ...datanew,
                            deskripsi_lengkap: e.target.value,
                          });
                        }}
                        defaultValue={datanew.deskripsi_lengkap}
                      />
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
              <Select
                showSearch
                placeholder="Cari & Tambah Service Items"
                onChange={onChangeAddAdditionalItems}
                onSearch={(value) => {
                  onSearchAdditionalItems(value);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ marginBottom: `0.7rem`, width: `20rem` }}
                allowClear
              >
                {dataListServiceItemMap.map((doc, idx) => {
                  return <Option value={doc.id}>{doc.itemName}</Option>;
                })}
              </Select>
              <div className="flex flex-col">
                {addfields.map((doc, idx) => {
                  return (
                    <div className=" w-6/12 flex justify-between border-2 border-blue-500 p-3 divide-x-2 mb-2">
                      <div className="flex items-center">
                        <MinusCircleTwoTone
                          style={{ marginRight: `0.5rem`, cursor: `pointer` }}
                          onClick={() => {
                            onDeleteAdditionalItems(doc.id);
                          }}
                        />
                        {doc.itemName}
                      </div>
                      <div className="flex pl-3">
                        <Checkbox style={{ marginRight: `0.7rem` }} /> Tandai
                        sebagai Wajib
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
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  // if(![189].every((curr) => dataProfile.data.registered_feature.includes(curr))){
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  const resourcesGSI = await fetch(
    `https://boiling-thicket-46501.herokuapp.com/getServiceItems`,
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
    `https://boiling-thicket-46501.herokuapp.com/getServiceCategories`,
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
      dataListServiceItem,
      dataListServiceCategories,
      sidemenu: "4",
    },
  };
}

export default ServiceCreate;
