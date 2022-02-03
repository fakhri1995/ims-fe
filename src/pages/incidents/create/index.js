import UploadOutlined from "@ant-design/icons/UploadOutlined";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Upload,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Sticky from "wil-react-sticky";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

function IncidentsCreate({ initProps, dataProfile, sidemenu }) {
  const rt = useRouter();
  const tok = initProps;
  // const pathArr = rt.pathname.split("/").slice(1)
  const pathArr = ["incidents"];
  const { originPath } = rt.query;
  const [instanceForm] = Form.useForm();
  const [loadingbtn, setLoadingbtn] = useState(false);

  //----------Create Incident-------------
  const [newincident, setNewincident] = useState({
    requester: dataProfile.data.user_id,
    requester_email: dataProfile.data.email,
    subject: "",
    description: "",
    file: [],
    associate_asset: 1,
  });
  const onChangeCreateIncident = (e) => {
    var val = e.target.value;
    setNewincident({
      ...newincident,
      [e.target.name]: val,
    });
  };
  //-----------------Handle create incident-----------------------------
  const handleCreateIncident = () => {
    setLoadingbtn(true);
    let formData = new FormData();
    newincident["file"].forEach((file) => {
      formData.append("file[]", file);
    });
    // formData.append('file', newincident.file[0]);
    formData.append("requester", newincident.requester);
    formData.append("subject", newincident.subject);
    formData.append("description", newincident.description);
    formData.append("associate_asset", newincident.associate_asset);
    // for (var value of formData.values()) {
    //     console.log(value);
    //  }
    // console.log(formData.values().requester)
    fetch(`https://boiling-thicket-46501.herokuapp.com/addIncident`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(tok),
      },
      body: formData,
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
            rt.push(`/dashboard/home`);
          }, 100);
        } else if (!res2.success) {
          console.log(res2);
          notification["error"]({
            message: res2.message.errorInfo[3],
            // message: res2.message,
            duration: 3,
          });
        }
      });
  };
  //------------------------------------------

  //----------------------------------------------
  const { TextArea } = Input;

  const checkFile = () => {
    console.log(newincident);
  };
  const [fileList, setFileList] = useState([]);
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    ...(newincident["file"] = fileList),
  };

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
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
          <Form
            layout="vertical"
            onFinish={handleCreateIncident}
            style={{ display: "contents" }}
            form={instanceForm}
          >
            <div
              className=" col-span-1 md:col-span-3 flex flex-col"
              id="formAgentsWrapper"
            >
              <Sticky containerSelectorFocus="#formAgentsWrapper">
                <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                  <h1 className="font-semibold text-base w-auto">
                    Report an Issue
                  </h1>
                  <div className="flex space-x-2">
                    <Link href="/groups?originPath=Admin">
                      <Button type="default" size="middle">
                        Batalkan
                      </Button>
                    </Link>
                    <Button
                      type="primary"
                      size="middle"
                      onClick={instanceForm.submit}
                      loading={loadingbtn}
                    >
                      Simpan
                    </Button>
                  </div>
                </div>
              </Sticky>

              {/* <div className="w-120 h-auto p-0 "> */}
              <div className="pb-4 md:mb-0 ">
                <Form.Item
                  hidden
                  name="requester"
                  style={{ marginRight: `1rem` }}
                  label="Requester"
                  rules={[
                    {
                      required: true,
                      message: "Requester harus diisi",
                    },
                  ]}
                  initialValue={newincident.requester}
                >
                  <Input
                    placeholder="Requester"
                    name={`requester`}
                    onChange={onChangeCreateIncident}
                  ></Input>
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0 ">
                <Form.Item
                  name="requester_email"
                  style={{ marginRight: `1rem` }}
                  label="Requester"
                  rules={[
                    {
                      required: true,
                      message: "Requester harus diisi",
                    },
                  ]}
                  initialValue={newincident.requester_email}
                >
                  <Input
                    disabled
                    placeholder="Requester"
                    name={`requester_email`}
                    onChange={onChangeCreateIncident}
                  ></Input>
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0 ">
                <Form.Item
                  name="subject"
                  style={{ marginRight: `1rem` }}
                  label="Subject"
                  rules={[
                    {
                      required: true,
                      message: "Subject harus diisi",
                    },
                  ]}
                  initialValue={newincident.subject}
                >
                  <Input
                    placeholder="Subject"
                    name={`subject`}
                    onChange={onChangeCreateIncident}
                  ></Input>
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0">
                <Form.Item
                  name="description"
                  style={{ marginRight: `1rem` }}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Deskripsi harus diisi",
                    },
                  ]}
                  initialValue={newincident.description}
                >
                  <TextArea
                    placeholder="Description"
                    rows={2}
                    name={`description`}
                    onChange={onChangeCreateIncident}
                  />
                </Form.Item>
              </div>

              <div className="pb-4 md:mb-0">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </div>
              <Button onClick={checkFile}>Check Data</Button>
            </div>
          </Form>
          <div className={`${st.grupdesc} flex flex-col space-y-3 px-4`}>
            <div className="font-semibold text-base">Incidents</div>
            <p className="font-normal text-base">Tralala Trilili</p>
          </div>
        </div>
      </>
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

  const resourcesGP = await fetch(
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
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

export default IncidentsCreate;
