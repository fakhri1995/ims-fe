import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Table, notification } from "antd";
import moment from "moment";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { MESSAGES_GET } from "lib/features";

import ButtonSys from "../../../components/button";
import {
  EditIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
import { generateStaticAssetUrl } from "../../../lib/helper";
import httpcookie from "cookie";

const Product = ({ initProps, dataProfile, sidemenu }) => {
  const rt = useRouter();

  const pathArr = rt.pathname.split("/").slice(1);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [refresh, setRefresh] = useState(-1);
  const [dataProductAll, setDataProductAll] = useState(null);
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
              <h1 className="hover:text-gray-500">{record.nomor}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Name Product",
      dataIndex: "name_product",
      key: "name_product",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className=" text-base">{record.name_product}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">
                {record.category_product_id == 1
                  ? "Banking Machinery"
                  : record.category_product_id == 2
                  ? "Workstation"
                  : record.category_product_id == 3
                  ? "Server & Hosting"
                  : "UPS"}
              </p>
            </>
          ),
        };
      },
    },
    {
      title: "attachment",
      dataIndex: "attachment",
      key: "attachment",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <img
                src={generateStaticAssetUrl(record.attachment_product?.link)}
                className="w-1/5 bg-cover object-cover rounded-md shadow-lg"
              />
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
            <div className="flex flex-col space-y-2">
              <ButtonSys
                type={"default"}
                // disabled={!isAllowedToEditDraft}
                onClick={(event) => {
                  event.stopPropagation();
                  rt.push(`/admin/product/create?id=${record.id}`);
                }}
                color={"notice"}
              >
                <div className="flex flex-row space-x-2 items-center">
                  <EditOutlined />
                  <p className="whitespace-nowrap">Edit Product</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={"default"}
                // disabled={!isAllowedToDeleteEmployee}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  setModalDelete(true);
                }}
                color={"warning"}
              >
                <div className="flex flex-row space-x-2 items-center">
                  <DeleteOutlined />
                  <p className="whitespace-nowrap">Hapus Product</p>
                </div>
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  //useState
  const datatemp = dataProductAll ? dataProductAll : [];
  const dataMessagesMap = datatemp.map((doc, idx) => {
    return {
      ...doc,
      nomor: idx + 1,
    };
  });

  //detail
  const [modaldetail, setmodaldetail] = useState(false);
  const [loadingdetail, setloadingdetail] = useState(false);
  const [datadetail, setdatadetail] = useState({
    name: "",
    company_email: "",
    company_name: "",
    interseted_in: "",
    message: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProduct`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataProductAll(res2.data);
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        // setLoadingEmployees(false);
      });
  }, [refresh]);

  const handleDeleteArticle = (articleId) => {
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProduct?id=${articleId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: response2.message,
            duration: 3,
          });
          setModalDelete(false);
        } else {
          notification.error({
            message: `Gagal menghapus Artikel. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus Artikel. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={"95"}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
          <h1 className="font-bold">Product</h1>
          <div className="flex space-x-2">
            <Link href="/admin/product/create" legacyBehavior>
              <Button
                type="primary"
                size="large"
                // disabled={!isAllowedToAddRole}
              >
                Tambah
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-5 p-0 md:p-5 flex flex-col">
          <AccessControl hasPermission={MESSAGES_GET}>
            <Table
              columns={columnsFeature}
              dataSource={dataMessagesMap}
              pagination={{ pageSize: 8 }}
              scroll={{ x: 300 }}
            ></Table>
          </AccessControl>
        </div>
      </div>
      <ModalHapus2
        title={`Peringatan`}
        visible={modalDelete}
        onvisible={setModalDelete}
        onOk={() => handleDeleteArticle(dataRowClicked.id)}
        onCancel={() => {
          setModalDelete(false);
        }}
        itemName={"product"}
        loading={loadingDelete}
      >
        <p>
          Apakah Anda yakin ingin melanjutkan penghapusan produk dengan nama{" "}
          <strong>{dataRowClicked.name_product}?</strong>
        </p>
      </ModalHapus2>
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

  const resourcesGM = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProduct`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGM = await resourcesGM.json();
  const dataMessages = resjsonGM;
  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "96",
    },
  };
}

export default Product;
