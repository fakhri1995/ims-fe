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
import en from "../../../locales/en";
import id from "../../../locales/id";

function FreeConsultation({}) {
  const [form] = Form.useForm();
  const rt = useRouter();
  const { locale } = rt;
  const t = locale === "en" ? en : id;
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
          "px-[60px] xl:pl-[112px] 2xl:pl-[224px] flex flex-row lg:justify-between"
        }
      >
        <div className="lg:pt-0 w-full lg:w-[52%] px-4 lg:px-0">
          <p
            style={{ lineHeight: "120%" }}
            className={
              "text-xl lg:text-[30px] text-primarygreen font-gilroysemibold"
            }
          >
            {t.thankyouforyourinterest}
          </p>
          <p
            style={{ lineHeight: "150%" }}
            className={"mt-4 text-xl text-blackmig"}
          >
            {t.beforewereach}
          </p>
          <div className="mt-6 lg:px-0">
            <Form
              id="formcontact"
              hidden={!feedback}
              layout={"vertical"}
              onFinish={submitFormConsultation}
              form={form}
            >
              <div className={"w-full lg:w-[495px]"}>
                <Form.Item
                  name={t.companyname}
                  className={"gilroy-medium text-base"}
                  label={<p style={{ fontSize: "16px" }}>{t.companyname}</p>}
                  rules={[{ required: true }]}
                >
                  <Input
                    style={{
                      border: "1px solid #B8B8B8",
                      height: "37px",
                      fontSize: "16px",
                    }}
                    name={t.companyname}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_name: e.target.value,
                      });
                    }}
                    placeholder={t.companynameplaceholder}
                  />
                </Form.Item>
                <Form.Item
                  name={"Email"}
                  initialValue={dataHardware.company_email}
                  className={"gilroy-medium text-base -mt-2"}
                  label={<p style={{ fontSize: "16px" }}>Email</p>}
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    // disabled={true}
                    style={{ border: "1px solid #B8B8B8", fontSize: "16px" }}
                    name={"Email"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_email: e.target.value,
                      });
                    }}
                    placeholder={t.talentheroemailplaceholder}
                  />
                </Form.Item>
              </div>
              <div className={"w-full lg:w-[495px]"}>
                <Form.Item
                  name={"Contact Name"}
                  className={"gilroy-medium text-base -mt-2"}
                  label={<p style={{ fontSize: "16px" }}>{t.contactname}</p>}
                  rules={[
                    { required: true, message: t.contactname + " is required" },
                  ]}
                >
                  <Input
                    style={{
                      border: "1px solid #B8B8B8",
                      height: "37px",
                      fontSize: "16px",
                    }}
                    name={"Contact Name"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        name: e.target.value,
                      });
                    }}
                    placeholder={t.contactnameplaceholder}
                  />
                </Form.Item>
                <Form.Item
                  name={"Phone Number"}
                  className={"gilroy-medium text-base -mt-2"}
                  label={<p style={{ fontSize: "16px" }}>{t.phonenumber}</p>}
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
                    style={{ fontSize: "16px" }}
                    placeholder={t.phonenumberplaceholder}
                  />
                </Form.Item>
              </div>
              <div className={"lg:hidden mt-4"}>
                <Form.Item
                  name="kind_of_solution"
                  className={" text-sm"}
                  label={
                    <p style={{ fontSize: "14px" }}>{t.formlandingpage1}</p>
                  }
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "This input is must be filled",
                  //   },
                  // ]}
                >
                  <Select
                    style={{
                      border: "1px solid #B8B8B8",
                      fontSize: "14px",
                    }}
                    // dropdownStyle={{ backgroundColor: "green" }}
                    name="kind_of_solution"
                    onChange={(value) => {
                      handleKindOfHardware(value);
                    }}
                    allowClear
                  >
                    <Option value="Hardware">Hardware</Option>
                    <Option value="Software">Software</Option>
                    <Option value="Talents">Talents</Option>
                  </Select>
                </Form.Item>
              </div>
              <p
                className={
                  "hidden lg:block text-blackmig text-base font-gilroysemibold"
                }
              >
                {t.formlandingpage1}
              </p>
              <div className={"hidden lg:flex lg:flex-row lg:mt-4"}>
                <a
                  className={"bg-white"}
                  onClick={() => handleKindOfHardware("Hardware")}
                >
                  <div
                    className={
                      kindOfHardware == "Hardware"
                        ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] h-[122px] mr-5 px-auto"
                        : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] h-[122px] mr-5 px-auto"
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
                        ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] h-[122px] mr-5 px-auto"
                        : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] h-[122px] mr-5 px-auto"
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
                        Software
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
                        ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] h-[122px] mr-5 px-auto"
                        : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] h-[122px] mr-5 px-auto"
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
                      <p className={"text-[18px] font-gilroysemibold"}>
                        {t.getstarted}
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
        <div className={"hidden lg:block w-[50%] flex justify-end"}>
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
