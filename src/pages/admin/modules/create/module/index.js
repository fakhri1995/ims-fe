import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import { MODULE_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const ModuleCreate = ({ sidemenu, initProps, dataProfile }) => {
  /**
   * Dependencies
   */
  const rt = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddModule = hasPermission(MODULE_ADD);

  //1. Init
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = "Buat Module";
  const [instanceForm] = Form.useForm();
  const { module } = rt.query;

  //useState
  //1. Create
  const [newdata, setnewdata] = useState({
    name: "",
    description: "",
  });
  const [loadingcreate, setloadingcreate] = useState(false);
  // const [praloading, setpraloading] = useState(true);

  //handleCreate
  const handleCreateModule = () => {
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addModule`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: "Modul berhasil ditambahkan",
            duration: 3,
          });
          setTimeout(() => {
            setloadingcreate(false);
            rt.push(`/admin/modules?module=${module}&featuredisplay=1`);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
          setloadingcreate(false);
        }
      });
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToAddModule) {
      permissionWarningNotification("Menambahkan", "Module");
    }
  }, [isAllowedToAddModule]);

  return (
    <Layout
      sidemenu={sidemenu}
      dataProfile={dataProfile}
      st={st}
      tok={initProps}
      pathArr={pathArr}
    >
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAgentsWrapper"
      >
        <div className=" col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Buat Module</h1>
              <div className="flex space-x-2">
                <Link href={`/admin/modules?module=&featuredisplay=`}>
                  <Button type="default">Batal</Button>
                </Link>
                <Button
                  type="primary"
                  loading={loadingcreate}
                  onClick={instanceForm.submit}
                  disabled={!isAllowedToAddModule}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </Sticky>
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
            <div className="border-b border-black p-4 font-semibold mb-5">
              Module Baru
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-3 col-span-1 md:col-span-3">
                <Form
                  layout="vertical"
                  form={instanceForm}
                  className="createAgentsForm"
                  onFinish={handleCreateModule}
                >
                  <Form.Item
                    label="Nama Modul"
                    required
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Modul wajib diisi",
                      },
                    ]}
                  >
                    <Input
                      value={newdata.name}
                      disabled={!isAllowedToAddModule}
                      name={`name`}
                      onChange={(e) => {
                        setnewdata({
                          ...newdata,
                          name: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Deskripsi"
                    required
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Deskripsi wajib diisi",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      disabled={!isAllowedToAddModule}
                      value={newdata.description}
                      name={`description`}
                      onChange={(e) => {
                        setnewdata({
                          ...newdata,
                          description: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
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

  // if (![179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "72",
    },
  };
}

export default ModuleCreate;
