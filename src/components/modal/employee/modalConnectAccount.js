import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import ButtonSys from "../../button";
import { LinkIconSvg, PlusIconSvg } from "../../icon";

const ModalConnectAccount = ({ visible, onvisible, initProps }) => {
  const [instanceForm] = useForm();
  const [connectForm] = useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [dataRoles, setDataRoles] = useState([]);
  const [formAktivitasData, setFormAktivitasData] = useState([]);
  const userData = [
    { id: 1, name: "Bagus Pratama", role: "user" },
    { id: 2, name: "Siti Aisyah", role: "admin" },
    { id: 3, name: "Raka Wijaya", role: "moderator" },
    { id: 4, name: "Dewi Anindya", role: "user" },
    { id: 5, name: "I Made Santoso", role: "user" },
  ];
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
        console.log("isi datanya ", res2);
        setFormAktivitasData(res2.data.data);
      });
  }, []);

  const handleAddAccount = () => {
    instanceForm
      .validateFields()
      .then(() => {
        sendDataAccount();
      })
      .catch(() => {
        // form validation failed
      });
  };

  const sendDataAccount = () => {
    console.log("");
  };

  return (
    <Modal
      open={visible}
      // onCancel={onClose}
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
                //   onChange={onChangeCreateAgents}
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
                // value={newuser.password}
                name={`password`}
                placeholder="input password"
                // onChange={onChangeCreateAgents}
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
                  //   value={newuser.confirm_password}
                  placeholder="Input Confirm Password"
                  name={`confirm_password`}
                />
                {/* {newuser.password !== newuser.confirm_password && (
                                                      <p className=" text-red-500 mb-0">
                                                        Confirm Password must be same with password
                                                      </p>
                                                    )} */}
              </>
            </Form.Item>
            <Form.Item label="Activity Form" name="attendance_form_ids">
              <Select
                showSearch
                allowClear
                placeholder="Select Activity form"
                filterOption={false}
                // onSearch={(value) => setFormAktivitasValue(value)}
                // onChange={(value) => {
                //   if (value === undefined || value === "") {
                //     setFormAktivitasValue("");
                //     return;
                //   }

                //   setNewuser((prev) => ({
                //     ...prev,
                //     attendance_form_ids: [value],
                //   }));
                // }}
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
                // onChange={(value) => {
                //   setNewuser({ ...newuser, role_ids: value });
                // }}
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
              <PlusCircleOutlined style={{ color: "white", fontSize: 16 }} />
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
                //   onChange={onChangeCreateAgents}
              />
            </Form.Item>
            <div
              className={
                "hover:cursor-pointer mt-[170px] rounded-[5px] bg-primary100 py-2.5 flex justify-center items-center gap-1.5"
              }
            >
              <LinkIconSvg style={{ color: "white", fontSize: 16 }} />
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
