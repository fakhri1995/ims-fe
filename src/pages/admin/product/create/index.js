import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import {
  Button,
  Form,
  Input,
  Select,
  TreeSelect,
  Upload,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { COMPANY_CLIENTS_GET, REQUESTER_ADD, ROLES_GET } from "lib/features";
import { getBase64 } from "lib/helper";

import { RequesterService } from "apis/user";

import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import { objectToFormData } from "../../../../lib/helper";
import httpcookie from "cookie";

// function modifData(dataa) {
//   for (var i = 0; i < dataa.length; i++) {
//     dataa[i]["key"] = dataa[i].id;
//     dataa[i]["value"] = dataa[i].id;
//     dataa[i]["title"] = dataa[i].name;
//     dataa[i]["children"] = dataa[i].members;
//     delete dataa[i].members;
//     if (dataa[i].children) [modifData(dataa[i].children)];
//   }
//   return dataa;
// }

function ProductCreate({ initProps, dataProfile, sidemenu, dataCompanyList }) {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToAddRequester = hasPermission(REQUESTER_ADD);
  const isAllowedToGetClientCompanyList = hasPermission(COMPANY_CLIENTS_GET);

  const axiosClient = useAxiosClient();
  const rt = useRouter();
  const { id: articleId, prevpath } = rt.query;
  const tok = initProps;
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Create";
  // dataCompanyList = dataCompanyList.data.members.filter(data => data.company_id !== 66)
  const [instanceForm] = Form.useForm();
  const { Option } = Select;

  //useState
  const [dataProduct, setDataProduct] = useState({
    id: null,
    name_product: "",
    category_product_id: "",
    product_image: "",
    product_image_file: null,
  });

  const [artikelEdit, setArtikelEdit] = useState(null);
  const [loadingupload, setLoadingupload] = useState(false);
  const [loadingcreate, setLoadingcreate] = useState(false);
  const [datacompanylist, setdatacompanylist] = useState([]);
  const [dataraw1, setdataraw1] = useState([]);
  const [praloading, setpraloading] = useState(true);
  const [loadingEmployee, setLoadingEmployee] = useState(false);
  const [refresh, setRefresh] = useState(-1);

  //handleCreateButton

  useEffect(() => {
    if (articleId) {
      setLoadingEmployee(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProductDetail?id=${articleId}`,
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
            if (prevpath === "add") {
            } else {
              instanceForm.setFieldsValue({
                name_product: res2.data.name_product,
                category_product_id: res2.data.category_product_id,
              });
              setDataProduct({
                name_product: res2.data.name_product,
                category_product_id: res2.data.category_product_id,
              });
            }
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
          setLoadingEmployee(false);
        });
    }
  }, [refresh]);

  const handleCreateProduct = () => {
    let dataProducts = {
      id: articleId ? articleId : null,
      name_product: dataProduct.name_product,
      category_product_id: dataProduct.category_product_id,
      attachment_product: dataProduct.product_image_file,
    };

    let formData = objectToFormData(dataProducts);
    let url = "";
    if (articleId) {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProduct`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProduct`;
    }
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        Accept: "*/*",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          instanceForm.resetFields();
          instanceForm.setFieldsValue({
            name_product: "",
            category_product_id: "",
          });
          setDataProduct({
            name_product: "",
            category_product_id: "",
            product_image: "",
            product_image_file: null,
          });
          notification.success({
            message: articleId
              ? "Update Product Success!"
              : "Add Product Success!",
            duration: 3,
          });
        } else if (!res2.success) {
          notification["error"]({
            message: articleId
              ? "Update Product Failed!"
              : "Add Product Failed!",
            duration: 5,
          });
        }
      });
  };

  const onChangeCreateProduct = (e) => {
    setDataProduct({
      ...dataProduct,
      [e.target.name]: e.target.value,
    });
  };

  const beforeUploadProfileImage = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onChangeProfileImage = async (info) => {
    if (info.file.status === "uploading") {
      setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);

      setDataProduct({
        ...dataProduct,
        product_image: base64Data,
        product_image_file: blobFile,
      });
    }
  };
  const uploadButton = (
    <div>
      {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //useEffect

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      st={st}
    >
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAgentsWrapper"
      >
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Tambah Produk</h1>
              <div className="flex space-x-2">
                {/* <Link href="/admin/requesters"> */}
                <Button
                  // disabled={praloading}
                  onClick={() => {
                    rt.push(`/admin/requesters`);
                  }}
                  type="default"
                >
                  Batal
                </Button>
                {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button> */}
                {/* </Link> */}
                <Button
                  // disabled={
                  //   praloading ||
                  //   !isAllowedToAddRequester ||
                  //   !isAllowedToGetClientCompanyList
                  // }
                  loading={loadingcreate}
                  onClick={instanceForm.submit}
                  type="primary"
                >
                  {articleId ? "Update" : "Simpan"}
                </Button>
                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleCreateAgents}>Save</button> */}
              </div>
            </div>
          </Sticky>
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
            <div className="border-b border-black p-4 font-semibold mb-5">
              Produk
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              {/* <div className="p-3 col-span-1 md:col-span-1">
                <Upload
                  name="profile_image"
                  listType="picture-card"
                  className="profileImage"
                  showUploadList={false}
                  beforeUpload={beforeUploadProfileImage}
                  onChange={onChangeProfileImage}
                >
                  {newuserrequesters.profile_image ? (
                    <img
                      src={newuserrequesters.profile_image}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div> */}
              <div className="p-3 col-span-1 md:col-span-3">
                <Form
                  layout="vertical"
                  className="createAgentsForm"
                  onFinish={handleCreateProduct}
                  form={instanceForm}
                >
                  <Form.Item
                    label="Nama Produk"
                    required
                    initialValue={dataProduct.name_product}
                    name="name_product"
                    rules={[
                      {
                        required: true,
                        message: "Nama Produk wajib diisi",
                      },
                    ]}
                  >
                    <Input
                      value={dataProduct.name_product}
                      name={`name_product`}
                      onChange={onChangeCreateProduct}
                    />
                  </Form.Item>
                  <Form.Item
                    name="category_product_id"
                    className={"gilroy-medium text-xl"}
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Category wajib diisi",
                      },
                    ]}
                  >
                    <Select
                      style={{ border: "1px solid #B8B8B8" }}
                      // dropdownStyle={{ backgroundColor: "green" }}
                      name="category_product_id"
                      onChange={(value) => {
                        setDataProduct({
                          ...dataProduct,
                          category_product_id: value,
                        });
                      }}
                      allowClear
                    >
                      <Option value={1}>Banking Machinery</Option>
                      <Option value={2}>Workstation</Option>
                      <Option value={3}>Server & Hosting</Option>
                      <Option value={4}>UPS</Option>
                    </Select>
                  </Form.Item>
                  <Upload
                    name="artikel_image"
                    listType="picture-card"
                    className="profileImage"
                    showUploadList={false}
                    beforeUpload={beforeUploadProfileImage}
                    onChange={onChangeProfileImage}
                  >
                    {dataProduct.product_image ? (
                      <img
                        src={dataProduct.product_image}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;

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

  // if (![117].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesGCL = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getClientCompanyList`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(reqBody)
  // })
  // const resjsonGCL = await resourcesGCL.json()
  // const dataCompanyList = resjsonGCL

  return {
    props: {
      initProps,
      dataProfile,
      // dataCompanyList,
      sidemenu: "95",
    },
  };
}

export default ProductCreate;
