import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";

const ModalConnectAccount = ({ visible, onvisible }) => {
  const [instanceForm] = useForm();
  const userData = [
    { id: 1, name: "Bagus Pratama", role: "user" },
    { id: 2, name: "Siti Aisyah", role: "admin" },
    { id: 3, name: "Raka Wijaya", role: "moderator" },
    { id: 4, name: "Dewi Anindya", role: "user" },
    { id: 5, name: "I Made Santoso", role: "user" },
  ];
  return (
    <Modal
      title={<p className="mig-heading--4 text-mono30">Add Account</p>}
      visible={visible}
      closable={true}
      onCancel={() => {
        setDataCurrentColumn({ idx: -1, name: "" });
        onvisible(false);
      }}
      maskClosable={false}
      footer={
        <ButtonSys
          type={"primary"}
          fullWidth
          //   onClick={handleAddColumn}
          //   disabled={!dataCurrentColumn?.name}
        >
          <div className="flex items-center space-x-2">
            <p>Save Account</p>
          </div>
        </ButtonSys>
      }
    >
      <div className="">
        <Form layout="vertical" form={instanceForm}>
          <p
            className={"text-[#424242] font-inter font-bold text-[16px]/6 mb-4"}
          >
            Connect Account
          </p>
          <Form.Item className={"w-1/2"} label="" name="account">
            <Select
              showSearch
              allowClear
              className={"w-full"}
              placeholder="Select Account"
            >
              {userData.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </Option>
              ))}
            </Select>
          </Form.Item>
          <p
            className={"text-[#424242] font-inter font-bold text-[16px]/6 mb-4"}
          >
            Add Account
          </p>
          <Form.Item
            label="Email"
            className={"w-1/2"}
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
          <div className={"grid grid-cols-2 space-x-5"}>
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
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalConnectAccount;
