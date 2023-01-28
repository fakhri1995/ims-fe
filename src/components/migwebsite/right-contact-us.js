import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import React from "react";

function RightContactUs({
  feedback,
  heightt,
  form,
  handleSubmit,
  Option,
  dataContactUs,
  setDataContactUs,
}) {
  return (
    <div className={"w-full md:w-1/2"}>
      <div className={"w-full"}>
        <p
          style={{ lineHeight: "120%" }}
          className={
            "text-xl pt-6 md:pt-0 md:text-[30px] font-gilroysemibold text-blackmig"
          }
        >
          Send us your questions
        </p>
        <p
          style={{ lineHeight: "150%" }}
          className={"text-xs md:text-[18px] mt-1 md:mt-3 text-blackmig mb-5"}
        >
          Fill in your contact information, and our sales team will contact you
          shortly.
        </p>
        <div
          hidden={feedback}
          className={"bg-white hidden md:block"}
          style={{ height: `${heightt}` }}
        >
          <div className={"h-1/3"}></div>
          <div
            className={
              "px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 text-center"
            }
          >
            <div className={"mx-auto my-auto"}>
              <p
                className={"text-3xl md:text-4xl gilroy-bold py-0"}
                style={{ color: "#188E4D" }}
              >
                <CheckCircleTwoTone
                  className={"relative -top-2"}
                  twoToneColor="#188E4D"
                />
                &nbsp;Submited !
              </p>
              <p className={"text-3xl gilroy-bold"}>
                Thank you for your interest in MIG
              </p>
              <p className={"text-xl font-gilroyregular"}>
                Someone from our team will be contact you shortly.
              </p>
            </div>
          </div>
        </div>
        <div
          hidden={feedback}
          className={"bg-white md:hidden"}
          style={{ height: `${heightt}` }}
        >
          <div className={"h-1/3"}></div>
          <div
            className={
              "px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 text-center"
            }
          >
            <div className={"mx-auto my-auto"}>
              <p
                className={"text-3xl md:text-4xl gilroy-bold py-0"}
                style={{ color: "#188E4D" }}
              >
                <CheckCircleTwoTone
                  className={"relative -top-2"}
                  twoToneColor="#188E4D"
                />
                &nbsp;Submited !
              </p>
              <p className={"text-3xl gilroy-bold"}>
                Thank you for your interest in MIG
              </p>
              <p className={"text-xl font-gilroyregular"}>
                Someone from our team will be contact you shortly.
              </p>
            </div>
          </div>
        </div>
        <Form
          id="formcontact"
          hidden={!feedback}
          layout={"vertical"}
          onFinish={handleSubmit}
          form={form}
        >
          <div className={""}>
            <Form.Item
              name={"Company Name"}
              className={"font-gilroyregular text-[16px]"}
              label="Company Name"
              rules={[{ required: true }]}
            >
              <Input
                style={{ border: "1px solid #B8B8B8", fontSize: 16 }}
                name={"Company Name"}
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    company_name: e.target.value,
                  });
                }}
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name={"Email"}
              className={"font-gilroyregular text-[16px]"}
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                style={{ border: "1px solid #B8B8B8", fontSize: 16 }}
                name={"Email"}
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    company_email: e.target.value,
                  });
                }}
                placeholder=""
              />
            </Form.Item>
          </div>
          <div className={""}>
            <Form.Item
              name={"Contact Name"}
              className={"font-gilroyregular text-[16px]"}
              label="Contact Name"
              rules={[{ required: true }]}
            >
              <Input
                style={{ border: "1px solid #B8B8B8", fontSize: 16 }}
                name={"Contact Name"}
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    name: e.target.value,
                  });
                }}
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name={"Phone Number"}
              className={"font-gilroyregular text-[16px]"}
              label="Phone Number"
              rules={[
                {
                  required: true,
                  pattern: new RegExp("^[0-9]*$"),
                  message: "Please input valid phone number",
                },
              ]}
            >
              <Input
                // style={{ border: "1px solid #B8B8B8" }}
                style={{ fontSize: 16 }}
                addonBefore="+62"
                name={"Phone Number"}
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    phone_number: parseInt(e.target.value),
                  });
                }}
                placeholder=""
              />
            </Form.Item>
          </div>

          <Form.Item
            name="Interest"
            className={"font-gilroyregular text-[16px]"}
            label="Interest"
            rules={[{ required: true }]}
          >
            <Select
              // style={{ border: "1px solid #B8B8B8" }}
              style={{ fontSize: 16 }}
              dropdownStyle={{ backgroundColor: "green" }}
              name="Interest"
              onChange={(value) => {
                setDataContactUs({
                  ...dataContactUs,
                  interested_in: value,
                });
              }}
              allowClear
            >
              <Option value="hardware">Hardware</Option>
              <Option value="software">Software</Option>
              <Option value="talents">Talents</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Message"
            className={"font-gilroyregular text-[16px]"}
            label="Message"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              style={{ border: "1px solid #B8B8B8", fontSize: 16 }}
              name="Message"
              onChange={(e) => {
                setDataContactUs({
                  ...dataContactUs,
                  message: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="checkbox"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox
              name="checkbox"
              className="text-xs md:text-base text-blackmig font-gilroyregular"
            >
              By proceeding, I agree that MIG's representative may contact me by
              email, phone, or SMS (including by automatic telephone dialing
              system) at the email address or number I provide, including for
              marketing purposes.*
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <div className={"w-full flex justify-start"}>
              <button
                type={"submit"}
                className={
                  "text-center rounded w-[113px] text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={"text-[18px] font-gilroysemibold"}
                  >
                    Submit
                  </p>
                  <img
                    className={"self-center"}
                    style={{ width: "8px", height: "15px" }}
                    src="/image/landingpage/arrow-forward.png"
                  />
                </div>
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RightContactUs;
