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

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  REQUESTERS_GET,
  REQUESTER_GROUP_GET,
  REQUESTER_GROUP_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function GroupsRequestersDetail({
  initProps,
  dataProfile,
  dataListAccount,
  dataDetailGroup,
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
  const isAllowedToShowRequesterList = hasPermission(REQUESTERS_GET);
  const isAllowedToGetRequesterGroup = hasPermission(REQUESTER_GROUP_GET);
  const isAllowedToUpdateRequesterGroup = hasPermission(REQUESTER_GROUP_UPDATE);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 2);
  pathArr[pathArr.length - 1] = "Edit Requesters Group";
  // const pathArr = ['groups', 'edit requester groups']
  const { originPath } = rt.query;
  const [instanceForm] = Form.useForm();
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [editgroup, setEditgroup] = useState(() => {
    return {
      id: isAllowedToGetRequesterGroup
        ? dataDetailGroup.data.group_detail.id
        : null,
      name: isAllowedToGetRequesterGroup
        ? dataDetailGroup.data.group_detail.name
        : "",
      description: isAllowedToGetRequesterGroup
        ? dataDetailGroup.data.group_detail.description
        : "",
      group_head: isAllowedToGetRequesterGroup
        ? dataDetailGroup.data.group_detail.group_head
        : null,
      user_ids: isAllowedToGetRequesterGroup
        ? dataDetailGroup.data.group_user
        : null,
    };
  });
  const onChangeEditGroup = (e) => {
    var val = e.target.value;
    setEditgroup({
      ...editgroup,
      [e.target.name]: val,
    });
  };
  const onChangeEditGroupHeadGroup = (value) => {
    setEditgroup({
      ...editgroup,
      ["group_head"]: value,
    });
  };
  const handleChangeEditRequester = (value) => {
    setEditgroup({
      ...editgroup,
      ["user_ids"]: value,
    });
  };
  // function handleClick() {
  //   console.log(editgroup);
  // }
  const handleEditGroup = () => {
    setLoadingbtn(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRequesterGroup`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(tok),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editgroup),
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
            rt.push(
              `/admin/groups/update/requesters/${dataDetailGroup.data.group_detail.id}`
            );
          }, 100);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
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
  const dataDD = isAllowedToShowRequesterList
    ? dataListAccount.data.data.map((doc, idx) => {
        return {
          value: doc.id,
          label: doc.name,
        };
      })
    : [];

  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }

  //----------------------------------------------
  const { TextArea } = Input;

  useEffect(() => {
    if (!isAllowedToGetRequesterGroup) {
      permissionWarningNotification("Mendapatkan", "Detail Requester Group");
    }
  }, [isAllowedToGetRequesterGroup]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      dataDetailGroup={dataDetailGroup}
      originPath={originPath}
      st={st}
    >
      <>
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
          <div className=" col-span-1 md:col-span-4">
            <Sticky containerSelectorFocus="#formAgentsWrapper">
              <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                <h1 className="font-semibold text-base w-auto">
                  Edit Requesters Group
                </h1>
                <div className="flex space-x-2">
                  <Button
                    type="default"
                    size="middle"
                    onClick={() => rt.back()}
                  >
                    Cancel
                  </Button>
                  {
                    // [142].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <Button
                      disabled={
                        !isAllowedToUpdateRequesterGroup &&
                        !isAllowedToGetRequesterGroup
                      }
                      type="primary"
                      size="middle"
                      onClick={instanceForm.submit}
                      loading={loadingbtn}
                    >
                      Save
                    </Button>
                  }
                </div>
              </div>
            </Sticky>
          </div>
          <AccessControl hasPermission={REQUESTERS_GET}>
            <Form
              layout="vertical"
              onFinish={handleEditGroup}
              style={{ display: "contents" }}
              form={instanceForm}
            >
              <div
                className=" col-span-1 md:col-span-3 flex flex-col"
                id="formAgentsWrapper"
              >
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
                    initialValue={editgroup.name}
                  >
                    {
                      // [142].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                      <Input
                        placeholder="Group Name"
                        name={`name`}
                        onChange={onChangeEditGroup}
                      ></Input>
                    }
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
                    initialValue={editgroup.description}
                  >
                    {
                      // [142].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                      <TextArea
                        placeholder="Group Description"
                        rows={2}
                        name={`description`}
                        onChange={onChangeEditGroup}
                      />
                    }
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
                    initialValue={editgroup.group_head}
                  >
                    {
                      // [142].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                      <Select
                        showSearch
                        placeholder="Add Group Head"
                        name={`group_head`}
                        showArrow
                        options={dataDD}
                        optionFilterProp="label"
                        onChange={onChangeEditGroupHeadGroup}
                        style={{ width: "100%", lineHeight: "2.4" }}
                      />
                    }
                  </Form.Item>
                </div>

                {/* </div> */}
                <Divider
                  style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}
                />
                {
                  // [142].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                  <>
                    <h1 className="font-semibold text-base w-auto py-2">
                      Agents
                    </h1>
                    <div className="border-gray-300 md:px-4 px-0 py-4 mb-5 border bg-white w-full h-auto ">
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
                            Members can be assigned tickets, tasks and other
                            items that belong to this group.
                          </p>
                        </Radio>
                        <Radio
                          disabled
                          className="flex-initial font-bold"
                          value={2}
                        >
                          Add as an Observer
                          <p
                            className="pl-6 whitespace-normal font-normal"
                            style={{ width: "min-content", minWidth: "15rem" }}
                          >
                            Members can be assigned tickets, tasks and other
                            items that belong to this group.
                          </p>
                        </Radio>
                      </Radio.Group>
                      <Row>
                        <Col flex="auto">
                          <Select
                            placeholder="Add an Requester"
                            showArrow
                            mode="multiple"
                            optionFilterProp="label"
                            onChange={handleChangeEditRequester}
                            defaultValue={editgroup.user_ids}
                            options={dataDD}
                            style={{
                              width: "100%",
                              padding: "0 5px",
                              lineHeight: "2.4",
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                }
              </div>
            </Form>
          </AccessControl>
          <div className={`${st.grupdesc} flex flex-col space-y-3 px-4`}></div>
        </div>
      </>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  var initProps = {};
  const groupsid = params.groupsId;
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
  //get data detail group
  const resourcesGetDetailGroup = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRequesterGroup?id=${groupsid}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGetDetailGroup = await resourcesGetDetailGroup.json();
  const dataDetailGroup = resjsonGetDetailGroup;

  //get detail profil yang login
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

  // if (![141, 142].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  //get data list akun
  const resourcesLA = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRequesterList`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    }
  );
  const resjsonLA = await resourcesLA.json();
  const dataListAccount = resjsonLA;

  return {
    props: {
      initProps,
      dataProfile,
      dataListAccount,
      dataDetailGroup,
      sidemenu: "63",
    },
  };
}

export default GroupsRequestersDetail;
