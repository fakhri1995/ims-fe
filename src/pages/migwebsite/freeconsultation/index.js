import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Collapse,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Upload,
  notification,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

import Layout from "../../../components/migwebsite/layout.js";

function FreeConsultation({}) {
  const [form] = Form.useForm();
  const rt = useRouter();
  const { Option } = Select;
  const [dataHardware, setDataHardware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
  });
  const [feedback, setFeedback] = useState(true);
  const [kindOfHardware, setKindOfHardware] = useState(null);
  useEffect(() => {}, []);

  const handleKindOfHardware = (value) => {
    setKindOfHardware(value);
  };

  const submitFormConsultation = () => {
    console.log("submit free consultation ");
    localStorage.setItem("dataForm", JSON.stringify(dataHardware));
    if (kindOfHardware == null || kindOfHardware == "Hardware") {
      rt.push("/hardware");
    } else if (kindOfHardware == "Software") {
      rt.push("/software");
    } else {
      rt.push("/talents");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Free Consultation</title>
      </Head>
      <section
        className={
          "xl:pl-[112px] 2xl:pl-[224px] py-[76px] flex flex-row md:justify-between"
        }
      >
        <div className="w-[52%]">
          <p className={"text-2xl text-primarygreen font-gilroysemibold"}>
            Thank you for your interest in providing your IT needs through
            Mitramas Infosys Global
          </p>
          <p className={"mt-4 text-base text-blackmig"}>
            Before we reach you out, we’d like to ask a few questions to better
            understand your business & IT needs.
          </p>
          <div className="mt-6">
            <Form
              id="formcontact"
              hidden={!feedback}
              layout={"vertical"}
              onFinish={submitFormConsultation}
              form={form}
            >
              <div className={"w-[495px]"}>
                <Form.Item
                  name={"Company Name"}
                  className={"gilroy-medium text-xl"}
                  label="Company Name"
                  rules={[{ required: true }]}
                >
                  <Input
                    style={{
                      border: "1px solid #B8B8B8",
                      height: "37px",
                    }}
                    name={"Company Name"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_name: e.target.value,
                      });
                    }}
                    placeholder="Enter company name here"
                  />
                </Form.Item>
                <Form.Item
                  name={"Email"}
                  initialValue={dataHardware.company_email}
                  className={"gilroy-medium text-xl -mt-2"}
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    // disabled={true}
                    style={{ border: "1px solid #B8B8B8" }}
                    name={"Email"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_email: e.target.value,
                      });
                    }}
                    placeholder="Enter your email here"
                  />
                </Form.Item>
              </div>
              <div className={"w-[495px]"}>
                <Form.Item
                  name={"Contact Name"}
                  className={"gilroy-medium text-xl -mt-2"}
                  label="Contact Name"
                  rules={[
                    { required: true, message: "Contact name is required" },
                  ]}
                >
                  <Input
                    style={{
                      border: "1px solid #B8B8B8",
                      height: "37px",
                    }}
                    name={"Contact Name"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        name: e.target.value,
                      });
                    }}
                    placeholder="Enter your name here"
                  />
                </Form.Item>
                <Form.Item
                  name={"Phone Number"}
                  className={"gilroy-medium text-xl -mt-2"}
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
                    // style={{ border: "1px solid #B8B8B8",height:"37px" }}
                    addonBefore="+62"
                    name={"Phone Number"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        phone_number: parseInt(e.target.value),
                      });
                    }}
                    placeholder="Enter your phone number here"
                  />
                </Form.Item>
              </div>
              <div className={"flex flex-row mt-4"}>
                <a
                  className={"bg-white"}
                  onClick={() => handleKindOfHardware("Hardware")}
                >
                  <div
                    className={
                      kindOfHardware == "Hardware"
                        ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                        : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                    }
                  >
                    {kindOfHardware == "Hardware" ? (
                      <div className={"flex justify-end mt-1 mr-2"}>
                        <img
                          src={"image/hardware/check-list.png"}
                          className={"w-[19px] h-[19px]"}
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                        }
                      ></div>
                    )}
                    <div className={"flex justify-center"}>
                      <img
                        src={
                          kindOfHardware == "Hardware"
                            ? "image/landingpage/form-solution-hardware-active.png"
                            : "image/landingpage/form-solution-hardware.png"
                        }
                        className={"w-[52px] h-[48px]"}
                      />
                    </div>
                    <div
                      className={"mt-1 mb-1 text-center text-sm text-blackmig "}
                    >
                      <p
                        className={
                          kindOfHardware == "Hardware"
                            ? "font-gilroysemibold"
                            : "font-gilroyregular"
                        }
                      >
                        Hardware
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  className={"bg-white"}
                  onClick={() => handleKindOfHardware("Software")}
                >
                  <div
                    className={
                      kindOfHardware == "Software"
                        ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                        : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                    }
                  >
                    {kindOfHardware == "Software" ? (
                      <div className={"flex justify-end mt-1 mr-2"}>
                        <img
                          src={"image/hardware/check-list.png"}
                          className={"w-[19px] h-[19px]"}
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                        }
                      ></div>
                    )}
                    <div className={"flex justify-center"}>
                      <img
                        src={
                          kindOfHardware == "Software"
                            ? "image/landingpage/form-solution-software-active.png"
                            : "image/landingpage/form-solution-software.png"
                        }
                        className={"w-[52px] h-[44px]"}
                      />
                    </div>
                    <div
                      className={"mt-1 mb-1 text-center text-sm text-blackmig "}
                    >
                      <p
                        className={
                          kindOfHardware == "Workstation"
                            ? "font-gilroysemibold"
                            : "font-gilroyregular"
                        }
                      >
                        Workstation
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  className={"bg-white"}
                  onClick={() => handleKindOfHardware("Talents")}
                >
                  <div
                    className={
                      kindOfHardware == "Talents"
                        ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                        : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                    }
                  >
                    {kindOfHardware == "Talents" ? (
                      <div className={"flex justify-end mt-1 mr-2"}>
                        <img
                          src={"image/hardware/check-list.png"}
                          className={"w-[19px] h-[19px]"}
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                        }
                      ></div>
                    )}
                    <div className={"flex justify-center"}>
                      <img
                        src={
                          kindOfHardware == "Talents"
                            ? "image/landingpage/form-solution-talents-active.png"
                            : "image/landingpage/form-solution-talents.png"
                        }
                        className={"w-[52px] h-[52px]"}
                      />
                    </div>
                    <div
                      className={"mt-1 mb-1 text-center text-sm text-blackmig "}
                    >
                      <p
                        className={
                          kindOfHardware == "Talents"
                            ? "font-gilroysemibold"
                            : "font-gilroyregular"
                        }
                      >
                        Talents
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className={"border border-dividermig w-[90%] mt-4 "}></div>
              <Form.Item>
                <div className={"w-full flex justify-start mt-2"}>
                  <button
                    type={"submit"}
                    className={
                      "rounded w-[190px] h-[54px] text-white border-2 bg-primarygreen border-primarygreen py-3 pl-6 pr-[19px] mt-9"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"text-base font-gilroysemibold"}>
                        Get Started
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "20px", height: "20px" }}
                        src="/image/landingpage/arrow_forward_ios2.png"
                      />
                    </div>
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={"w-[50%] flex justify-end"}>
          <img
            className={"w-[607px] h-[354px]"}
            src="/image/landingpage/Talents-2.png"
          />
        </div>
      </section>
    </Layout>
  );
}

export default FreeConsultation;
