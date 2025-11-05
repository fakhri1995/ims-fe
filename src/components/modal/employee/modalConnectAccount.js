import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import ButtonSys from "../../button";
import { LinkIconSvg, PlusIconSvg } from "../../icon";

const ModalConnectAccount = ({
  visible,
  onvisible,
  initProps,
  dataEmployee,
  getData,
}) => {
  const [instanceForm] = useForm();
  const [connectForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [dataRoles, setDataRoles] = useState([]);
  const [dataAgentList, setDataAgentList] = useState([]);
  const [formAktivitasData, setFormAktivitasData] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorEmail, setErrorEmail] = useState(false);
  const [emailConnect, setEmailConnect] = useState(null);
  const [loadingConnect, setLoadingConnect] = useState(false);
  const [loadingAddAccount, setLoadingAddAccount] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    role_ids: [],
    password: "",
    confirm_password: "",
    attendance_form_ids: [],
  });
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoles`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setDataRoles(res2.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceForms?rows=50`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setFormAktivitasData(res2.data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAgentEmployeeList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setDataAgentList(res2.data);
      });
  }, []);

  const onChangeCreateAgents = (e) => {
    var val = e.target.value;
    if (e.target.name === "role") {
      val = parseInt(e.target.value);
    }
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: val,
    }));
  };

  const handleAddAccount = async () => {
    const values = await instanceForm.validateFields();
    sendDataAccount();
  };

  const sendDataAccount = () => {
    /*
     fullname: "",
    email: "",
    role_ids: [],
    phone_number: "",
    nip: 0,
    profile_image: "",
    profile_image_file: null,
    company_id: 1,
    password: "",
    confirm_password: "",
    position: "",
    attendance_form_ids: [], 
    */
    setLoadingAddAccount(true);
    let payload = {
      employee_id: dataEmployee.id,
      fullname: dataEmployee.name,
      email: newUser.email,
      role_ids: newUser.role_ids,
      attendance_form_ids: newUser.attendance_form_ids,
      password: newUser.password,
      confirm_password: newUser.confirm_password,
      company_id: 1,
      nip: dataEmployee.nip,
      position: dataEmployee.role_name,
      phone_number: dataEmployee.phone_number,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addConnectAgent`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Add Account & Connect Employee Data Success.`,
            duration: 3,
          });
          getData();
          onvisible();
        } else {
          notification.error({
            message: `Add Account & Connect Employee Data Failed. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Add Account & Connect Employee Data Failed. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingAddAccount(false));
  };

  const handleConnect = async () => {
    try {
      // ✅ validate semua field dulu
      if (emailConnect) {
        sendDataConnect();
      } else {
        setErrorEmail(true);
      }
      // kirim ke backend, misalnya pakai fetch/axios
      // await axios.post('/api/connect-account', values);
    } catch (error) {}
  };

  const sendDataConnect = () => {
    setLoadingConnect(true);
    let payload = {
      id: dataEmployee.id,
      user_id: emailConnect,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/connectAgent`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Connect Employee Data Success.`,
            duration: 3,
          });
          getData();
          onvisible();
        } else {
          notification.error({
            message: `Gagal menambahkan kontrak karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kontrak karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingConnect(false));
  };

  return (
    <Modal
      open={visible}
      onCancel={onvisible}
      className="modalCore"
      title={
        <div className={"flex justify-center"}>
          <p className={"mig-body--bold"}>Add/Connect Agent Account</p>
        </div>
      }
      footer={null}
      width={450}
    >
      <div className="">
        <div className={"flex justify-center items-center gap-3"}>
          <div
            onClick={() => activeTab != "1" && setActiveTab("1")}
            className={`hover:cursor-pointer rounded-[48px] py-1 px-4 ${
              activeTab == "1"
                ? "bg-primary100 text-white"
                : "bg-white text-[#808080]"
            }`}
          >
            <p
              className={`text-sm/6 font-inter ${
                activeTab == "1" ? "font-semibold" : "font-normal"
              }`}
            >
              Tambah Akun
            </p>
          </div>
          <div
            onClick={() => activeTab != "2" && setActiveTab("2")}
            className={`hover:cursor-pointer rounded-[48px] py-1 px-4 ${
              activeTab == "2"
                ? "bg-primary100 text-white"
                : "bg-white text-[#808080]"
            }`}
          >
            <p
              className={`text-sm/6 font-inter ${
                activeTab == "2" ? "font-semibold" : "font-normal"
              }`}
            >
              Hubungkan Akun
            </p>
          </div>
        </div>
        {activeTab == "1" ? (
          <Form layout="vertical" form={instanceForm} className="mt-4">
            <Form.Item
              label="Email"
              required
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email wajib diisi",
                },
                {
                  pattern:
                    /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                  message: "Email belum diisi dengan benar",
                },
              ]}
            >
              <Input
                placeholder="Input Email"
                name={`email`}
                onChange={onChangeCreateAgents}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password must be filled",
                },
                {
                  pattern: /([A-z0-9]{8})/,
                  message: "Password minimum 8 character",
                },
              ]}
            >
              <Input.Password
                value={newUser.password}
                name={`password`}
                placeholder="input password"
                onChange={onChangeCreateAgents}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Confirm Account must be filled",
                },
                {
                  pattern: /([A-z0-9]{8})/,
                  message: "Confirm Account minimum 8 character",
                },
              ]}
            >
              <>
                <Input.Password
                  placeholder="Input Confirm Password"
                  value={newUser.confirm_password}
                  name={`confirm_password`}
                  onChange={onChangeCreateAgents}
                />
                {newUser.password !== newUser.confirm_password && (
                  <p className=" text-red-500 mb-0">
                    Confirm Password must be same with password
                  </p>
                )}
              </>
            </Form.Item>
            <Form.Item label="Activity Form" name="attendance_form_ids">
              <Select
                showSearch
                allowClear
                placeholder="Select Activity form"
                filterOption={false}
                // onSearch={(value) => setFormAktivitasValue(value)}
                onChange={(value) => {
                  // if (value === undefined || value === "") {
                  //   setFormAktivitasValue("");
                  //   return;
                  // }

                  setNewUser((prev) => ({
                    ...prev,
                    attendance_form_ids: [value],
                  }));
                }}
              >
                {formAktivitasData?.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Account Role" name="role">
              <Select
                mode="multiple"
                placeholder={"Select Account Role"}
                showSearch
                // disabled={!isAllowedToGetRolesList}
                onChange={(value) => {
                  setNewUser({ ...newUser, role_ids: value });
                }}
                /*defaultValue={idrole}*/
                style={{ width: `100%` }}
                options={dataRoles.map((doc) => ({
                  label: doc.name,
                  value: doc.id,
                }))}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <div
              onClick={() => handleAddAccount()}
              className={
                "hover:cursor-pointer mt-4 rounded-[5px] bg-primary100 py-2.5 flex justify-center items-center gap-1.5"
              }
            >
              {loadingAddAccount ? (
                <LoadingOutlined color="white" />
              ) : (
                <PlusCircleOutlined style={{ color: "white", fontSize: 16 }} />
              )}
              <p className={"text-white text-sm/4 font-roboto font-medium"}>
                Add Account
              </p>
            </div>
          </Form>
        ) : (
          <Form layout="vertical" form={connectForm} className="mt-4">
            <Form.Item
              label="Email"
              required
              name="email_agent"
              rules={[
                {
                  required: true,
                  message: "Email wajib diisi",
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Select Email"
                filterOption={false}
                // onSearch={(value) => setFormAktivitasValue(value)}
                onChange={(value) => {
                  if (value === undefined || value === "") {
                    setEmailConnect("");
                    setErrorEmail(true);
                    return;
                  }
                  setErrorEmail(false);
                  setEmailConnect(value);
                }}
              >
                {dataAgentList?.map(({ id, email }) => (
                  <Select.Option key={id} value={id}>
                    {email}
                  </Select.Option>
                ))}
              </Select>
              {errorEmail && (
                <p className="text-red-500 text-xs mt-1">
                  Email must be filled
                </p>
              )}
            </Form.Item>
            <div
              onClick={() => handleConnect()}
              className={
                "hover:cursor-pointer mt-[170px] rounded-[5px] bg-primary100 py-2.5 flex justify-center items-center gap-1.5"
              }
            >
              {loadingConnect ? (
                <LoadingOutlined color={"white"} />
              ) : (
                <LinkIconSvg style={{ color: "white", fontSize: 16 }} />
              )}
              <p className={"text-white text-sm/4 font-roboto font-medium"}>
                Connect Account
              </p>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default ModalConnectAccount;
