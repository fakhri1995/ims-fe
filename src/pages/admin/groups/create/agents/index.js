import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import { AGENT_GROUP_ADD, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function GroupsAgentsCreate({
  initProps,
  dataProfile,
  dataListAccount,
  sidemenu,
}) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToAddAgentGroup = hasPermission(AGENT_GROUP_ADD);
  const isAllowedToShowAgentList = hasPermission(USERS_GET);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = "Create Agents Group";
  const { originPath } = rt.query;
  const dataDetailGroup = [];
  const [instanceForm] = Form.useForm();
  const [loadingbtn, setLoadingbtn] = useState(false);
  //----------CreateGroup-------------
  const [newgroup, setNewgroup] = useState({
    name: "",
    description: "",
    group_head: dataProfile.data.id,
    user_ids: [],
  });
  const onChangeCreateGroup = (e) => {
    var val = e.target.value;
    setNewgroup({
      ...newgroup,
      [e.target.name]: val,
    });
  };
  const onChangeCreateGroupHeadGroup = (value) => {
    setNewgroup({
      ...newgroup,
      ["group_head"]: value,
    });
  };
  //------------add agent---------------
  const handleChangeAddAgent = (value) => {
    setNewgroup({
      ...newgroup,
      ["user_ids"]: value,
    });
  };
  //----------------------------------------------
  const handleCreateGroup = () => {
    setLoadingbtn(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addAgentGroup`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(tok),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newgroup),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadingbtn(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/groups`);
          }, 100);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo[3],
            duration: 3,
          });
        }
      });
  };
  //------------------------------------------

  //----------------radio button--------------
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  //------------------------------------------

  //------------populate list account-------------
  const dataDD = isAllowedToShowAgentList
    ? dataListAccount.data.map((doc, idx) => {
        return {
          value: doc.id,
          label: doc.name,
        };
      })
    : [];
  // console.log(dataDD)
  //----------------------------------------------
  const { TextArea } = Input;

  useEffect(() => {
    if (!isAllowedToAddAgentGroup) {
      permissionWarningNotification("Menambahkan", "Agent Group");
    }
  }, [isAllowedToAddAgentGroup]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      originPath={originPath}
      dataDetailGroup={dataDetailGroup}
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
                <h1 className="font-semibold text-base w-auto">
                  New Agents Group
                </h1>
                <div className="flex space-x-2">
                  <Link href="/admin/groups" legacyBehavior>
                    <Button type="default" size="middle">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    size="middle"
                    disabled={
                      !isAllowedToAddAgentGroup && !isAllowedToShowAgentList
                    }
                    onClick={instanceForm.submit}
                    loading={loadingbtn}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Sticky>
          </div>
          <Form
            layout="vertical"
            onFinish={handleCreateGroup}
            style={{ display: "contents" }}
            form={instanceForm}
          >
            <div className=" col-span-1 md:col-span-3 flex flex-col">
              <div className="pb-4 md:mb-0 ">
                <Form.Item
                  name="name"
                  style={{ marginRight: `1rem` }}
                  label="Group Name"
                  rules={[
                    {
                      required: true,
                      message: "Nama grup harus diisi",
                    },
                  ]}
                  initialValue={newgroup.name}
                >
                  <Input
                    placeholder="Group Name"
                    name={`name`}
                    onChange={onChangeCreateGroup}
                  ></Input>
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0">
                <Form.Item
                  name="description"
                  style={{ marginRight: `1rem` }}
                  label="Group Description"
                  rules={[
                    {
                      required: true,
                      message: "Deskripsi grup harus diisi",
                    },
                  ]}
                  initialValue={newgroup.description}
                >
                  <TextArea
                    placeholder="Group Description"
                    rows={2}
                    name={`description`}
                    onChange={onChangeCreateGroup}
                  />
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0 ">
                <Form.Item
                  name="group_head"
                  style={{ marginRight: `1rem` }}
                  label="Group Head"
                  rules={[
                    {
                      required: true,
                      message: "Ketua grup harus diisi",
                    },
                  ]}
                  initialValue={newgroup.group_head}
                >
                  <Select
                    showSearch
                    placeholder="Add Group Head"
                    name={`group_head`}
                    showArrow
                    options={dataDD}
                    optionFilterProp="label"
                    onChange={onChangeCreateGroupHeadGroup}
                    style={{ width: "100%", lineHeight: "2.4" }}
                    disabled={!isAllowedToShowAgentList}
                  />
                </Form.Item>
              </div>

              {/* </div> */}
              <Divider style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }} />
              <h1 className="font-semibold text-base w-auto py-2">Agents</h1>
              <div className="border-gray-300 md:px-4 px-0 py-4 border bg-white w-full h-auto mb-5">
                <Radio.Group
                  className="flex flex-col md:flex-row"
                  row
                  onChange={onChange}
                  value={value}
                >
                  <Radio className="flex-initial font-bold " value={1}>
                    Add as a Member
                    <p
                      className="pl-6 whitespace-normal font-normal"
                      style={{ width: "min-content", minWidth: "15rem" }}
                    >
                      Members can be assigned tickets, tasks and other items
                      that belong to this group.
                    </p>
                  </Radio>
                  <Radio disabled className="flex-initial font-bold" value={2}>
                    Add as an Observer
                    <p
                      className="pl-6 whitespace-normal font-normal"
                      style={{ width: "min-content", minWidth: "15rem" }}
                    >
                      Members can be assigned tickets, tasks and other items
                      that belong to this group.
                    </p>
                  </Radio>
                </Radio.Group>
                <Row>
                  <Col flex="auto">
                    <Select
                      showSearch
                      placeholder="Add an Agent"
                      showArrow
                      mode="multiple"
                      onChange={handleChangeAddAgent}
                      style={{
                        width: "100%",
                        padding: "0 5px",
                        lineHeight: "2.4",
                      }}
                      optionFilterProp="label"
                      options={dataDD}
                      disabled={!isAllowedToShowAgentList}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
          <div className={`${st.grupdesc} flex flex-col space-y-3 px-4`}></div>
        </div>
      </>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  const reqBodyAccountList = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
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

  // if(![135].every((curr) => dataProfile.data.registered_feature.includes(curr))){
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  const resourcesLA = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=${1}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(reqBodyAccountList)
    }
  );
  const resjsonLA = await resourcesLA.json();
  const dataListAccount = resjsonLA;

  return {
    props: {
      initProps,
      dataProfile,
      dataListAccount,
      sidemenu: "63",
    },
  };
}

export default GroupsAgentsCreate;
