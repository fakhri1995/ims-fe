import { Button, Checkbox, Empty, Form, Input, Tabs, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { MODULES_GET, ROLE_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function RolesCreate({ initProps, dataProfile, dataListModules, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToAddRole = hasPermission(ROLE_ADD);
  const isAllowedToGetModulesList = hasPermission(MODULES_GET);

  const rt = useRouter();
  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Buat Role";
  const { originPath } = rt.query;
  const { TextArea } = Input;
  const { TabPane } = Tabs;
  const [instanceForm] = Form.useForm();
  const [loadingcreate, setloadingcreate] = useState(false);
  const [praloading2, setpraloading2] = useState(true);

  //----------CreateGroup-------------
  const [newroles, setNewroles] = useState({
    name: "",
    description: "",
    feature_ids: [],
  });
  const [modules, setmodules] = useState([
    {
      id: "",
      key: "",
      name: "",
      status: "",
      company_id: 0,
      description: "",
      feature: [
        {
          id: "",
          key: "",
          name: "",
        },
      ],
    },
  ]);
  const onChangeCreateRoles = (e) => {
    var val = e.target.value;
    setNewroles({
      ...newroles,
      [e.target.name]: val,
    });
  };
  const onChangeCreateCheckbox = (e, id) => {
    if (e.target.checked) {
      const temp = newroles.feature_ids;
      temp.push(id);
      setNewroles({
        ...newroles,
        feature_ids: temp,
      });
    } else {
      var temp = newroles.feature_ids;
      var idx = temp.indexOf(id);
      temp.splice(idx, 1);
      setNewroles({
        ...newroles,
        feature_ids: temp,
      });
    }
  };
  const handleCreateRoles = () => {
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRole`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newroles),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: "Role berhasil ditambahkan",
            duration: 3,
          });
          setNewroles({
            name: "",
            description: "",
            feature_ids: [],
          });
          setTimeout(() => {
            setloadingcreate(false);
            rt.push(`/admin/roles/detail/${res2.id}`);
          }, 300);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingcreate(false);
        }
      });
  };

  //useEffect
  useEffect(() => {
    if (isAllowedToGetModulesList) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getModules`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setmodules(res2.data);
          setpraloading2(false);
        });
      return;
    }

    permissionWarningNotification("Mendapatkan", "Daftar Module");
    setpraloading2(false);
  }, [isAllowedToGetModulesList]);
  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      originPath={originPath}
      st={st}
    >
      <>
        <div
          className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
          id="formAgentsWrapper"
        >
          <div className="col-span-1 md:col-span-4">
            <Sticky containerSelectorFocus="#formAgentsWrapper">
              <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                <h1 className="font-semibold text-base w-auto ">Buat Role</h1>
                <div className="flex space-x-2">
                  <Link href="/admin/roles">
                    <Button type="default" size="middle">
                      Batal
                    </Button>
                  </Link>
                  <Button
                    disabled={!isAllowedToAddRole}
                    type="primary"
                    size="middle"
                    onClick={instanceForm.submit}
                    loading={loadingcreate}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </Sticky>
          </div>
          <Form
            layout="vertical"
            style={{ display: "contents" }}
            form={instanceForm}
            onFinish={handleCreateRoles}
            initialValues={newroles}
          >
            <div className=" col-span-1 md:col-span-3 flex flex-col">
              <div className="pb-4 md:mb-0 ">
                <Form.Item
                  name="name"
                  style={{ marginRight: `1rem` }}
                  label="Nama Role"
                  rules={[
                    {
                      required: true,
                      message: "Nama role wajib diisi",
                    },
                  ]}
                >
                  <Input
                    name={`name`}
                    disabled={!isAllowedToAddRole}
                    onChange={onChangeCreateRoles}
                  ></Input>
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0">
                <Form.Item
                  name="description"
                  style={{ marginRight: `1rem` }}
                  label="Deskripsi"
                  rules={[
                    {
                      required: true,
                      message: "Deskripsi role wajib diisi",
                    },
                  ]}
                >
                  <TextArea
                    rows={2}
                    disabled={!isAllowedToAddRole}
                    name={`description`}
                    onChange={onChangeCreateRoles}
                  />
                </Form.Item>
              </div>

              {/* </div> */}
              {/* <Divider style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }} /> */}
              <AccessControl hasPermission={ROLE_ADD}>
                <hr />
                <h1 className="font-semibold text-base w-auto p-2">
                  Permissions
                </h1>
                {/* <div className="border-gray-300 p-4 border bg-white w-full h-auto "> */}
                {/* <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ }}>
                                {[...Array.from({ length: 10 }, (v, i) => i)].map(i => (
                                <TabPane tab={`Tab-${i}`} key={i} disabled={i === 5}>
                                    Content of tab {i}
                                </TabPane>
                                ))}
                            </Tabs> */}
                {praloading2 ? null : (
                  <Tabs defaultActiveKey="1" tabPosition="left">
                    {modules.map((doc, idx) => {
                      return (
                        <TabPane tab={doc.name} key={idx + 1}>
                          <div className="mb-5">
                            {doc?.features !== null ? (
                              <>
                                {doc?.features?.map((doc, idx) => {
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-center hover:bg-gray-300 p-3"
                                    >
                                      <Checkbox
                                        style={{ marginRight: `1rem` }}
                                        onChange={(e) => {
                                          onChangeCreateCheckbox(e, doc.id);
                                        }}
                                      />{" "}
                                      {doc.name}
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                <Empty
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                ></Empty>
                              </>
                            )}
                          </div>
                        </TabPane>
                      );
                    })}
                  </Tabs>
                )}
              </AccessControl>

              {/* <Tabs defaultActiveKey="1" tabPosition={'left'} style={{}}>
                                <TabPane tab={`Ticket`} key={1} >
                                    <Tree
                                        checkStrictly={true}
                                        checkable
                                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                                        onSelect={onSelect}
                                        onCheck={onCheck}
                                        treeData={treeData}
                                    />
                                </TabPane>
                                <TabPane tab={`Problems`} key={2} >
                                    Content of tab 2
                                </TabPane>
                                <TabPane tab={`Changes`} key={3} >
                                    Content of tab 3
                                </TabPane>
                            </Tabs> */}

              {/* </div> */}
            </div>
          </Form>
        </div>
      </>
    </Layout>
  );
}

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

  // if (![176].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesGM = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getModules`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps)
  //     }
  // })
  // const resjsonGM = await resourcesGM.json()
  // const dataListModules = resjsonGM

  return {
    props: {
      initProps,
      dataProfile,
      // dataListModules,
      sidemenu: "71",
    },
  };
}

export default RolesCreate;
