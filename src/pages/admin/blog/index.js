import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Table, notification } from "antd";
import moment from "moment";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { MESSAGES_GET } from "lib/features";

import ButtonSys from "../../../components/button";
import ButtonSysColor from "../../../components/buttonColor";
import {
  EditIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
import { generateStaticAssetUrl } from "../../../lib/helper";
import httpcookie from "cookie";

const Blog = ({ initProps, dataProfile, sidemenu }) => {
  const rt = useRouter();

  const pathArr = rt.pathname.split("/").slice(1);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [refresh, setRefresh] = useState(-1);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className=" text-base">{record.title}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.description}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.slug}</p>
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
                src={generateStaticAssetUrl(record.attachment_article?.link)}
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
              <ButtonSysColor
                type={"default"}
                // disabled={!isAllowedToEditDraft}
                onClick={(event) => {
                  event.stopPropagation();
                  rt.push(`/admin/blog/create?id=${record.id}`);
                }}
                color={"border-notice text-notice bg-notice bg-opacity-10"}
              >
                <div className="flex flex-row space-x-2 items-center">
                  <EditIconSvg size={16} color={`#DDB44A`} />
                  <p className="whitespace-nowrap">Edit Article</p>
                </div>
              </ButtonSysColor>
              <ButtonSysColor
                type={"default"}
                // disabled={!isAllowedToDeleteEmployee}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  setModalDelete(true);
                }}
                color={"border-warning text-warning bg-warning bg-opacity-10"}
              >
                <div className="flex flex-row space-x-2 items-center">
                  <TrashIconSvg size={16} color={`#BF4A40`} />
                  <p className="whitespace-nowrap">Hapus Article</p>
                </div>
              </ButtonSysColor>
            </div>
          ),
        };
      },
    },
  ];

  //useState
  const [dataArticleAll, setDataArticleAll] = useState(null);
  const datatemp = dataArticleAll ?? [];
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getArticle`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataArticleAll(res2.data);
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
        // setLoadingEmployees(false);
      });
  }, [refresh]);
  const handleDeleteArticle = (articleId) => {
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteArticle?id=${articleId}`,
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
      sidemenu={"92"}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className=" col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#formAgentsWrapper">
            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
              <h1 className="font-semibold text-base w-auto pt-2">Blog</h1>
              {
                // [176].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <div className="flex space-x-2">
                  <Link href="/admin/blog/create">
                    <Button
                      type="primary"
                      size="large"
                      // disabled={!isAllowedToAddRole}
                    >
                      Tambah
                    </Button>
                  </Link>
                </div>
              }
            </div>
          </Sticky>
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
        itemName={"article"}
        loading={loadingDelete}
      >
        <p>
          Apakah Anda yakin ingin melanjutkan penghapusan artikel dengan judul{" "}
          <strong>{dataRowClicked.title}?</strong>
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "4",
    },
  };
}

export default Blog;
