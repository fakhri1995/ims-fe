import { CheckCircleTwoTone, CloudUploadOutlined } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  Upload,
  notification,
} from "antd";
import { transparent } from "daisyui/src/colors/index.js";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReCAPTCHA from "react-google-recaptcha";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout.js";
import ThankForm from "../../../components/migwebsite/thank-form.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Software({}) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const handleSubmit = (value) => {
    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataHardware),
    // })
    //   .then((res) => res.json())
    //   .then((res2) => {
    //     if (res2.success) {
    //       form.resetFields();
    //       setFeedback(false);
    //       setTimeout(() => {
    //         setFeedback(true);
    //       }, 5000);
    //     } else if (!res2.success) {
    //       notification["error"]({
    //         message: res2.message.errorInfo.status_detail,
    //         duration: 5,
    //       });
    //     }
    //   });
    setFormActive(value);
  };

  const handleForm = () => {
    setFormActive("first");
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleLetsTalk = () => {
    if (dataSoftware.company_email == null) {
    } else {
      setShowform(true);
    }
  };
  const [dataSoftware, setDataSoftware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "software",
    budget_from: null,
    budget_to: null,
    message: null,
    kind_of_project: null,
    type_of_project: null,
  });
  const [email, setEmail] = useState(null);
  const [showForm, setShowform] = useState(false);
  const [showThankForm, setShowThankForm] = useState(false);
  const [formActive, setFormActive] = useState("first");
  const [feedback, setFeedback] = useState(true);
  const [valuePurpose, setValuePurpose] = useState(null);
  const [valueMeetingTime, setValueMeetingTime] = useState(null);
  const [labelMeetingTime, setLabelMeetingTime] = useState(null);
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueDateTemp, onChangeDateTemp] = useState(null);
  const dataMeetingTime = [
    {
      id: 1,
      value: "13:00",
      label_meeting: "13.00 WIB - 13.30 WIB",
    },
    {
      id: 2,
      value: "13:30",
      label_meeting: "13.30 WIB - 14.00 WIB",
    },
    {
      id: 3,
      value: "14:00",
      label_meeting: "14.00 WIB - 14.30 WIB",
    },
    {
      id: 4,
      value: "14:30",
      label_meeting: "14.30 WIB - 15.00 WIB",
    },
    {
      id: 5,
      value: "15:00",
      label_meeting: "15.00 WIB - 15.30 WIB",
    },
  ];
  const dataMeetingTime2 = [
    {
      id: 6,
      value: "15:30",
      label_meeting: "15.30 WIB - 16.00 WIB",
    },
    {
      id: 7,
      value: "16:00",
      label_meeting: "16.00 WIB - 16.30 WIB",
    },
    {
      id: 8,
      value: "16:30",
      label_meeting: "16.30 WIB - 17.00 WIB",
    },
    {
      id: 9,
      value: "17:00",
      label_meeting: "17.00 WIB - 17.30 WIB",
    },
    {
      id: 10,
      value: "17:30",
      label_meeting: "17.30 WIB - 18.00 WIB",
    },
  ];
  const onChangeValuePurpose = (e) => {
    console.log("radio checked", e.target.value);
    // setValuePurpose(e.target.value);
    setDataSoftware({
      ...dataSoftware,
      type_of_project: e.target.value,
    });
  };

  const onChangeValueMeetingTime = (value, label) => {
    if (value == valueMeetingTime) {
      setValueMeetingTime(null);
    } else {
      setValueMeetingTime(value);
      setLabelMeetingTime(label);
    }
  };

  const onPanelChange = (value) => {
    console.log("helo calendar ", value);
    onChangeDateTemp(value);
    onChangeDate(value);
  };
  const dataTypeProject = [
    "New idea or project",
    "Existing project that needs more resources",
    "Ongoing assistance or consultation",
    "None of the above, I'm just looking to learn more about Toptal",
  ];
  const [heightt, setHeightt] = useState("");
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };
  const slider = useRef(null);
  const slider2 = useRef(null);
  const captchaRef = useRef(null);
  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const sliderSettingsPhone = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  const submitFormSoftware = () => {
    if (captchaRef.current.getValue() != "") {
      console.log("tidak kosong");
      notification.success({
        message: "Submit Form Solution Software Success!",
        duration: 3,
      });
      setShowThankForm(true);
    }
  };

  const formatNumber = (val) => {
    if (!val) return 0;
    return `${val}`
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\.(?=\d{0,2}$)/g, ",");
  };

  const parserNumber = (val) => {
    if (!val) return 0;
    return Number.parseFloat(
      val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
    ).toFixed(2);
  };

  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>Software</title>
      </Head>
      {showForm == false && (
        <section
          className={
            "section1advantages hidden md:block fixed w-full z-50 px-4 md:px-[113.5px]"
          }
          style={{ background: "#F4F4F4" }}
        >
          <div className={"block md:flex container mx-auto"}>
            <div className={"flex py-4"}>
              <Link href={{ pathname: "/hardware" }}>
                <p
                  className={
                    "cursor-pointer flex-col text-lg gilroy-medium mr-4"
                  }
                >
                  Hardware
                </p>
              </Link>
              <Link href={{ pathname: "/software" }}>
                <p
                  className={"cursor-pointer flex-col text-lg gilroy-bold mx-4"}
                  style={{
                    borderBottom: "solid 2px #10B981",
                    paddingBottom: "2.5px",
                  }}
                >
                  Software
                </p>
              </Link>
              <Link href={{ pathname: "/talents" }}>
                <p
                  className={
                    "cursor-pointer flex-col text-lg gilroy-medium mx-4"
                  }
                >
                  Talents
                </p>
              </Link>
            </div>
          </div>
        </section>
      )}
      {showForm && showThankForm == false ? (
        <div>
          <section
            className={
              formActive == "first"
                ? "xl:pl-[112px] 2xl:pl-[224px] py-[76px] flex flex-row md:justify-between"
                : "xl:pl-[112px] 2xl:pl-[224px] py-[76px] flex flex-row"
            }
          >
            {formActive == "first" ? (
              <div className="w-[52%]">
                <p className={"text-2xl text-primarygreen font-semibold"}>
                  Thank you for your interest in providing your IT needs through
                  Mitramas Infosys Global
                </p>
                <p className={"mt-4 text-base text-blackmig"}>
                  Before we reach you out, we’d like to ask a few questions to
                  better understand your business & IT needs.
                </p>
                <div className="mt-6">
                  <Form
                    id="formcontact"
                    hidden={!feedback}
                    layout={"vertical"}
                    onFinish={() => handleSubmit("second")}
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
                            setDataSoftware({
                              ...dataSoftware,
                              company_name: e.target.value,
                            });
                          }}
                          placeholder="Enter company name here"
                        />
                      </Form.Item>

                      <Form.Item
                        name={"Contact Name"}
                        className={"gilroy-medium text-xl"}
                        label="Contact Name"
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                          }}
                          name={"Contact Name"}
                          onChange={(e) => {
                            setDataSoftware({
                              ...dataSoftware,
                              name: e.target.value,
                            });
                          }}
                          placeholder="Enter your name here"
                        />
                      </Form.Item>
                    </div>
                    <div className={"w-[495px]"}>
                      <Form.Item
                        initialValue={dataSoftware.company_email}
                        name={"Email"}
                        className={"gilroy-medium text-xl"}
                        label="Email"
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
                          value={"oke"}
                          style={{ border: "1px solid #B8B8B8" }}
                          name={"Email"}
                          onChange={(e) => {
                            setDataSoftware({
                              ...dataSoftware,
                              company_email: e.target.value,
                            });
                          }}
                          placeholder="Enter your email here"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"Phone Number"}
                        className={"gilroy-medium text-xl"}
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
                            setDataSoftware({
                              ...dataSoftware,
                              phone_number: parseInt(e.target.value),
                            });
                          }}
                          placeholder="Enter your phone number here"
                        />
                      </Form.Item>
                    </div>
                    <div className={"border border-dividermig w-full"}></div>
                    <Form.Item>
                      <div className={"w-full flex justify-start mt-2"}>
                        <button
                          type={"submit"}
                          className={
                            "rounded w-[190px] h-[54px] text-white border-2 bg-primarygreen border-primarygreen py-3 pl-6 pr-[19px] mt-9"
                          }
                        >
                          <div className={"flex flex-row justify-between"}>
                            <p className={"text-base font-semibold"}>
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
            ) : formActive == "second" ? (
              <div className="w-[52%]">
                <Form
                  id="formsoftware"
                  layout={"vertical"}
                  onFinish={() => handleSubmit("third")}
                  form={form}
                >
                  <p className={"text-2xl text-blackmig font-semibold"}>
                    Project Information
                  </p>
                  <Form.Item
                    name={"Kind of Project"}
                    className={"gilroy-medium text-xl"}
                    label="What kind of project do you want to build?"
                    rules={[{ required: true }]}
                  >
                    <TextArea
                      rows={4}
                      style={{ border: "1px solid #B8B8B8" }}
                      name={"Kind of Project"}
                      onChange={(e) => {
                        setDataSoftware({
                          ...dataSoftware,
                          kind_of_project: e.target.value,
                        });
                      }}
                      placeholder="Tell us about your project"
                    />
                  </Form.Item>
                  {/* <p className={"mt-9"}>* What type of project are you hiring us for?</p> */}
                  <div className={"mt-9"}>
                    <Form.Item
                      name={"Type of Project"}
                      className={"gilroy-medium text-xl"}
                      label="What type of project are you hiring us for?"
                      rules={[{ required: true }]}
                    >
                      <Radio.Group
                        onChange={onChangeValuePurpose}
                        value={dataSoftware.kind_of_project}
                        buttonStyle={"solid"}
                      >
                        <Space direction="vertical">
                          {dataTypeProject.map((name) => (
                            <Radio
                              className="text-blackmig text-sm"
                              value={name}
                            >
                              {name}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className={"mt-9"}>
                    <p>Budget range</p>
                    <div className={"mt-1 flex flex-row"}>
                      <Form.Item
                        name={"Budget Minimal"}
                        className={"gilroy-medium text-xl"}
                        label="From"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Please input valid budget minimal",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            border: "1px solid #B8B8B8",
                            width: "132px",
                            height: "37px",
                          }}
                          name={"from"}
                          formatter={(value) => formatNumber(value)}
                          parser={(value) => parserNumber(value)}
                          onChange={(e) => {
                            setDataSoftware({
                              ...dataSoftware,
                              budget_from: e,
                            });
                          }}
                          placeholder="Rp00.000"
                        />
                      </Form.Item>
                      <div className={"mx-[19.3px] self-center "}>
                        <img
                          className={"w-5 h-5"}
                          src={"/image/software/arrow_right_alt.png"}
                        />
                      </div>
                      <Form.Item
                        name={"Budget Maximal"}
                        className={"gilroy-medium text-xl"}
                        label="To"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Please input valid budget max",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            border: "1px solid #B8B8B8",
                            width: "132px",
                            height: "37px",
                          }}
                          name={"Budget Maximal"}
                          formatter={(value) => formatNumber(value)}
                          parser={(value) => parserNumber(value)}
                          onChange={(e) => {
                            setDataSoftware({
                              ...dataSoftware,
                              budget_to: e,
                            });
                          }}
                          placeholder="Rp00.000"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={"mt-9"}>
                    <Form.Item label="Attachment">
                      <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                      >
                        <Upload.Dragger
                          name="files"
                          action="/upload.do"
                          style={{ width: "298px", height: "180px" }}
                        >
                          <p className="ant-upload-drag-icon">
                            <CloudUploadOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Drag and drop your sourcing documents here
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                          </p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={handleForm}
                    >
                      <p className={"text-base text-primarygreen"}>Back</p>
                    </button>
                    <button
                      className={
                        "text-white bg-primarygreen w-[95px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                      }
                    >
                      <p className={"text-base text-white"}>Next</p>
                      <img
                        className={"self-center"}
                        style={{ width: "20px", height: "20px" }}
                        src="/image/landingpage/arrow_forward_ios2.png"
                      />
                    </button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="w-[52%]">
                <p className={"text-2xl text-blackmig font-semibold"}>
                  Choose Meeting Date
                </p>
                <div
                  className={
                    "mt-9 bg-bgjoinmig  w-[788px]  px-3 py-2 rounded-lg flex flex-row"
                  }
                >
                  <img src={"image/software/information-circle.png"} />
                  <p className={"ml-3 text-sm text-blackmig self-center"}>
                    Please choose a meeting date & time with Mitramas Infosys
                    Global
                  </p>
                </div>
                <div className={"flex flex-row mt-4"}>
                  <div className={"w-[392px]"}>
                    <div className="site-calendar-demo-card">
                      <Calendar onChange={onPanelChange} value={valueDate} />
                    </div>
                  </div>
                  <div className={"ml-8"}>
                    <p className={"text-xs text-blackmig font-gilroysemibold"}>
                      Choose Time
                    </p>
                    <p className={"font-xs text-blackmig gilroy-regular mt-1"}>
                      Meeting duration: 30 minutes
                    </p>
                    <div className={"mt-4 flex flex-row"}>
                      <div
                        className={
                          "text-xs text-blackmig font-gilroysemibold w-[174px]"
                        }
                      >
                        {dataMeetingTime.map((data) => (
                          <button
                            onClick={() =>
                              onChangeValueMeetingTime(
                                data.value,
                                data.label_meeting
                              )
                            }
                            className={
                              valueMeetingTime == data.value
                                ? "w-[174px] rounded bg-greenTrans20 border border-primarygreen py-2 px-[72px] mt-5"
                                : "mt-5 w-[174px] rounded bg-divider py-2 px-[72px]"
                            }
                          >
                            <p
                              className={
                                valueMeetingTime == data.value &&
                                "text-primarygreen"
                              }
                            >
                              {data.value}
                            </p>
                          </button>
                        ))}
                      </div>
                      <div
                        className={
                          "text-xs text-blackmig font-gilroysemibold ml-4 w-[174px]"
                        }
                      >
                        {dataMeetingTime2.map((data) => (
                          <button
                            onClick={() =>
                              onChangeValueMeetingTime(
                                data.value,
                                data.label_meeting
                              )
                            }
                            className={
                              valueMeetingTime == data.value
                                ? "w-[174px] rounded bg-greenTrans20 border border-primarygreen py-2 px-[72px] mt-5"
                                : "mt-5 w-[174px] rounded bg-divider py-2 px-[72px]"
                            }
                          >
                            <p
                              className={
                                valueMeetingTime == data.value &&
                                "text-primarygreen"
                              }
                            >
                              {data.value}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"mt-[35px]"}>
                  <p className={"text-sm text-blackmig gilroy-regular"}>
                    *Meeting Time
                  </p>

                  {valueDateTemp == null ? (
                    <p className={"mt-1 text-redmig text-xs"}>
                      Please choose your date first on the calendar
                    </p>
                  ) : (
                    <div
                      className={"text-sm text-blackmig font-gilroysemibold"}
                    >
                      <p className={""}>
                        {moment(valueDateTemp).format("dddd,MMMM Do YYYY")}
                      </p>
                      <p>{labelMeetingTime}</p>
                    </div>
                  )}
                </div>
                <div className={"mt-4"}>
                  <ReCAPTCHA
                    ref={captchaRef}
                    // sitekey={"6LdBDkkjAAAAAH9NtxIC8IhWeDbdbSfuKJUaR074"}
                    sitekey={`${process.env.NEXT_PUBLIC_G_RECAPTCHA_CID}`}
                  />
                </div>
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button className={"bg-white py-2 px-4"} onClick={handleForm}>
                    <p className={"text-base text-primarygreen"}>Back</p>
                  </button>
                  <button
                    type={"submit"}
                    onClick={submitFormSoftware}
                    className={
                      "text-white bg-primarygreen w-[95px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                    }
                  >
                    <p className={"text-base text-white"}>Submit</p>
                    <img
                      className={"self-center"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow_forward_ios2.png"
                    />
                  </button>
                </div>
              </div>
            )}
            <div
              className={
                formActive == "first" ? "w-[46%] self-center" : "w-[46%] ml-5"
              }
            >
              <img
                className={"w-full h-auto"}
                src="/image/landingpage/Talents-2.png"
              />
            </div>
          </section>
        </div>
      ) : showForm && showThankForm == true ? (
        <div className="grid justify-items-center">
          <ThankForm type_form={"Software"} />
        </div>
      ) : (
        <div className={"noform"}>
          <section className={"section2software py-4 md:py-16 px-4 md:mx-auto"}>
            <div className={"hidden md:flex container mt-16 mx-auto"}>
              <div className={"flex-col w-1/2"}>
                <p className={"text-[32px] gilroy-bold"}>
                  Simplify and automate the process through digitalization
                </p>
                <p className={"mt-8 gilroy-regular text-base"}>
                  High competition, need transformation, and slow operations
                  force you to be more effective and efficient in order to grow
                  rapidly.
                </p>
                <div className={"mt-[40px]"}>
                  <p className={"gilroy-bold text-primarygreen text-base"}>
                    Reach us to get more information
                  </p>
                  <div className={"flex flex-row items-center mt-1"}>
                    <Input
                      name={"email"}
                      className={"w-1/2 h-[37px]"}
                      onChange={(e) => {
                        setDataSoftware({
                          ...dataSoftware,
                          company_email: e.target.value,
                        });
                      }}
                      placeholder="Enter your email here."
                    />
                    <button
                      onClick={handleLetsTalk}
                      className={
                        "text-base ml-4 rounded text-white py-2 pl-4 pr-2.5 bg-primarygreen border-primarygreen bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between gap-2"}>
                        <p className={"font-semibold"}>Let's talk!</p>
                        <img
                          className={"w-[20px] h-[20px] self-center"}
                          src="/image/landingpage/arrow-circle-right.png"
                        />
                      </div>
                    </button>
                  </div>
                  <div
                    className={
                      "my-4 w-3/4 border rounded-lg shadow-lg p-2 bg-green15"
                    }
                  >
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-5 h-5 mr-1"}
                        src="/image/landingpage/info.png"
                      />
                      <div>
                        <p className={"text-base text-blackmig gilroy-regular"}>
                          Let us help you to achieve business goals with :
                        </p>
                        <ul>
                          <li>
                            <p
                              className={
                                "text-base text-blackmig gilroy-regular"
                              }
                            >
                              {""}
                              <span className={"font-semibold"}>
                                {" "}
                                Customized
                              </span>{" "}
                              software solutions
                            </p>
                          </li>
                          <li>
                            <p
                              className={
                                "text-base text-blackmig gilroy-regular"
                              }
                            >
                              {""}
                              <span className={"font-semibold"}>
                                Automated
                              </span>{" "}
                              business operations
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"flex-col w-1/2"}>
                <img src="/image/landingpage/Software.png"></img>
              </div>
            </div>
            <div className={"block md:hidden py-9 px-4"}>
              <div className={"px-3"}>
                <p
                  className={"text-blackmig text-xl text-center font-semibold"}
                >
                  Simplify and automate the process through digitalization
                </p>
                <img
                  src="/image/hardware/Hardware-Solution.png"
                  className={"w-[304px] h-[174px]"}
                ></img>
                <p
                  className={
                    "py-6 text-center text-base gilroy-regular text-blackmig"
                  }
                >
                  High competition, need transformation, and slow operations
                  force you to be more effective and efficient in order to grow
                  rapidly.
                </p>
              </div>
              <div>
                <p className={"font-semibold text-primarygreen text-sm"}>
                  Reach us to get more information
                </p>
                <div className={"flex flex-row items-center mt-1"}>
                  <Input
                    name={"email"}
                    className={"w-[241px] h-[37px]"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email here."
                  />
                  <button
                    className={
                      "py-2 px-[29.5px] rounded ml-2 w-[79px] h-[36px]  border-2 bg-primarygreen border-primarygreen"
                    }
                  >
                    <img
                      className={"w-[16px] h-[16px]"}
                      src="/image/landingpage/arrow-circle-right.png"
                    />
                  </button>
                </div>
              </div>
              <div
                className={
                  "mt-6 w-[328px] border rounded-lg p-2 bg-greentrans15"
                }
              >
                <div className={"flex flex-row"}>
                  <img
                    className={"w-[20px] h-[20px] mr-1"}
                    src="/image/landingpage/info.png"
                  />
                  <div>
                    <p className={"text-sm text-blackmig gilroy-regular"}>
                      Let us help you to achieve business goals with :
                    </p>
                    <ul className={""}>
                      <li className={"mt-1"}>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-bold"}>Customized</span>{" "}
                          software solutions
                        </p>
                      </li>
                      <li className={"mt-1"}>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-bold"}>Automated</span>{" "}
                          business operations
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*section software portofolio */}
          <section
            className={
              "section3software hidden md:block bg-bgjoinmig px-[52px] py-12"
            }
          >
            <p
              className={
                "text-xl md:text-[32px] text-center gilroy-semibold font-semibold py-8 md:py-0 mb-10"
              }
            >
              Let’s see some of{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                our past works
              </span>{" "}
              in digitalizing businesses
            </p>
            <div className={"flex flex-row"}>
              <button onClick={() => slider2?.current?.slickPrev()}>
                <div
                  className={
                    "self-center flex items-center justify-center  absolute left-[60px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                  }
                >
                  <img
                    className={"grid justify-items-center"}
                    style={{ width: "40px", height: "40px" }}
                    src="/image/landingpage/arrow-sm-left.png"
                  />
                </div>
              </button>
              <div
                className={"center md:content-around hidden md:block"}
                style={{ maxWidth: "1145px" }}
              >
                <Slider {...sliderSettings2} ref={slider}>
                  <div
                    className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience
                      </span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt
                      </span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        " border w-[417px] border-dividermig mt-6 mx-auto"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "68px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-6">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center mx-2 mt-6">
                        <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                          <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"self-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience
                      </span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt
                      </span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        " border w-[417px] border-dividermig mt-6 mx-auto"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "68px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-6">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center mx-2 mt-6">
                        <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                          <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"self-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience
                      </span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt
                      </span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        " border w-[417px] border-dividermig mt-6 mx-auto"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "68px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-6">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center mx-2 mt-6">
                        <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                          <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"self-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </Slider>
              </div>
              <button onClick={() => slider2?.current?.slickNext()}>
                <div
                  className={
                    "self-center flex items-center justify-center  absolute right-[60px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                  }
                >
                  <img
                    className={"grid justify-items-center"}
                    style={{ width: "40px", height: "40px" }}
                    src="/image/landingpage/arrow-sm-right.png"
                  />
                </div>
              </button>
            </div>
          </section>
          {/*section portofolio mobile */}
          <section
            className={
              "section3software block md:hidden bg-bgjoinmig px-6 pt-9 pb-[72px]"
            }
          >
            <p className={"text-xl text-center gilroy-semibold font-semibold"}>
              Let’s see what{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                IT softwares
              </span>{" "}
              we can offer
            </p>
            <div className={"mt-7"}>
              <Slider {...sliderSettingsPhone}>
                <div
                  className={"py-8 px-[16.25px] h-[445px] bg-white rounded-lg"}
                >
                  <img
                    className={"w-full h-[159px]"}
                    // style={{ width: "284.29px", height: "159px" }}
                    src="/image/software/migsys.png"
                  />
                  <div className={"mt-3 flex flex-row justify-between"}>
                    <p className={"gilroy-bold text-blackmig text-sm"}>
                      MIGSys
                    </p>
                    <div className={"px-2 py-1 bg-greenTrans20 rounded-[20px]"}>
                      <p className={"text-primarygreen gilroy-regular text-xs"}>
                        Website Development
                      </p>
                    </div>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"gilroy-regular text-blackmig text-sm"}>
                      An enterprise resource planning that built to enhance
                      employee’s performance and productivity:{" "}
                    </p>
                    <ul className={"gilroy-regular text-blackmig text-sm"}>
                      <li>Task & Recruitment Process</li>
                      <li>Warehouse Managed Service</li>
                      <li>Contract, Order, and Service for Assets</li>
                      <li>Attendance Tracking</li>
                      <li>Tickets, and more</li>
                    </ul>
                  </div>
                </div>
                <div
                  className={"py-8 px-[16.25px] h-[445px] bg-white rounded-lg"}
                >
                  <img
                    className={"w-full h-[159px]"}
                    // style={{ width: "284.29px", height: "159px" }}
                    src="/image/software/lms.png"
                  />
                  <div className={"mt-3 flex flex-row justify-between"}>
                    <p className={"gilroy-bold text-blackmig text-sm"}>
                      MIGSys
                    </p>
                    <div className={"px-2 py-1 bg-greenTrans20 rounded-[20px]"}>
                      <p className={"text-primarygreen gilroy-regular text-xs"}>
                        Website Development
                      </p>
                    </div>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"gilroy-regular text-blackmig text-sm"}>
                      A web-based educational platform (learning management
                      system) that built to digitalize learning programs; plan,
                      implement and assess learning programs at AQL Islamic
                      Center.
                    </p>
                  </div>
                </div>
                <div
                  className={"py-8 px-[16.25px] h-[445px] bg-white rounded-lg"}
                >
                  <img
                    className={"w-full h-[159px]"}
                    // style={{ width: "284.29px", height: "159px" }}
                    src="/image/software/warung-lebaran.png"
                  />
                  <div className={"mt-3 flex flex-row justify-between"}>
                    <p className={"gilroy-bold text-blackmig text-sm"}>
                      MIGSys
                    </p>
                    <div className={"px-2 py-1 bg-greenTrans20 rounded-[20px]"}>
                      <p className={"text-primarygreen gilroy-regular text-xs"}>
                        Website Development
                      </p>
                    </div>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"gilroy-regular text-blackmig text-sm"}>
                      A web-based hardware managed service to enhance the
                      efficiency of distributions between seller and consumer.
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </section>
          <section className={"px-8 md:px-[166.5px] py-4 md:py-16"}>
            <div className={"container mx-auto text-center"}>
              <div className={"pb-12"}>
                <p
                  className={
                    "text-base text-blackmig gilroy-regular text-center w-[646px] mx-auto px-2"
                  }
                >
                  We support your companies to simplify and automate the process
                  through digitalization with all framework that you want.
                </p>
              </div>
              <img className={"m-auto w-full"} src="/image-software.png"></img>
              <div className={"mt-1 md:mt-4 mx-auto"}>
                <Link href="/contactus">
                  <button
                    className={
                      "text-sm md:w-[209px] rounded text-primarygreen border-2 bg-white border-primarygreen px-4 py-2 md:px-2 mt-4"
                    }
                  >
                    <p
                      className={"text-base gilroy-semibold font-semibold mr-2"}
                    >
                      Contact our sales team
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </section>
          {/* section 3 software why you should */}
          <section
            className={
              "section3softwarebrowser bg-transp60 py-4 md:py-12 md:px-[140px]"
            }
          >
            <div className={"flex md:flex-row"}>
              <div className={"hidden md:block w-2/5"}>
                <img
                  src="/image/people/People-Solution.png"
                  className={"w-full h-[282px]"}
                  alt=""
                />
              </div>
              <div className="flex flex-col md:w-3/5 md:ml-[40px]">
                <h4 className="mb-2 text-2xl text-center font-semibold text-blackmig">
                  Why you should{" "}
                  <span
                    style={{
                      borderBottom: "solid 3px #188E4D",
                      paddingBottom: "2.5px",
                    }}
                  >
                    trust us
                  </span>{" "}
                  in building your IT projects?
                </h4>
                <div className={"block md:hidden mx-auto my-[17px]"}>
                  <img
                    src="/image/people/People-Solution.png"
                    className={"w-[253px] h-[150px]"}
                    alt=""
                  />
                </div>
                <div className="flex flex-row mt-5">
                  <img
                    src="/image/landingpage/career-icon1.png"
                    className="w-[42px] h-[42px] self-center"
                  />
                  <div>
                    <h5 className="ml-3.5 text-sm md:text-base font-semibold text-blackmig">
                      Build Software Based on Your Needs
                    </h5>
                    <p className="text-left ml-3.5 text-base text-blackmig gilroy-regular">
                      Giving you customization software to simplify and automate
                      your business.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px] self-center"
                  />
                  <div>
                    <h5 className="ml-3.5 text-sm md:text-base font-semibold text-blackmig">
                      Excellent Talent Support
                    </h5>
                    <p className="text-left ml-3.5 text-base text-blackmig gilroy-regular">
                      We develops software to help you achieve business process
                      automation with our IT talent pool
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon3.png"
                    className="w-[42px] h-[42px] self-center"
                  />
                  <div>
                    <h5 className="ml-3.5 text-sm md:text-base font-semibold text-blackmig">
                      Enhance Productivity & Efficiency
                    </h5>
                    <p className="text-left ml-3.5 text-base text-blackmig gilroy-regular">
                      We can discuss about project also provide the best cost
                      with a mutual agreement based on time, and complexity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section how it work */}
          <section
            className={
              "section4howitworkbrowser bg-white py-4 md:py-16 px-4 md:px-[85.5]"
            }
          >
            <div className={"container text-center mx-auto"}>
              <p className={"text-xl md:text-2xl gilroy-bold py-8 md:py-0"}>
                How it{" "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  works
                </span>{" "}
                ?
              </p>
            </div>
            <div className={"flex flex-row justify-between md:px-20 mt-10"}>
              <div className={""}>
                <div className={"w-[360px]"}>
                  <img
                    className={"mx-auto"}
                    src="/image/software/software-work-1.png"
                    style={{ width: "145px", height: "145px" }}
                  />
                  <p
                    className={
                      "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                    }
                  >
                    Custom project-based collaboration
                  </p>
                  <p
                    className={
                      "text-base text-blackmig gilroy-regular text-center"
                    }
                  >
                    One-stop service to develop tailored products
                  </p>
                </div>
              </div>
              <div className={"self-center"}>
                <img
                  src="/image/hardware/how-it-work-arrow.png"
                  style={{ width: "42px", height: "21px" }}
                />
              </div>
              <div className={"w-[360px]"}>
                <img
                  className={"mx-auto"}
                  src="/image/software/software-work-2.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  className={
                    "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                  }
                >
                  Providing all the resources you’ll need
                </p>
                <p
                  className={
                    "text-base text-blackmig gilroy-regular text-center"
                  }
                >
                  We have extensive talents and technologies tobuild the best
                  project for you and your companies
                </p>
              </div>
              <div className={"self-center"}>
                <img
                  src="/image/hardware/how-it-work-arrow.png"
                  style={{ width: "42px", height: "21px" }}
                />
              </div>
              <div className={"w-[360px]"}>
                <img
                  className={"mx-auto"}
                  src="/image/software/software-work-3.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  className={
                    "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                  }
                >
                  Clear and detailed project development
                </p>
                <p
                  className={
                    "text-base text-blackmig gilroy-regular text-center"
                  }
                >
                  We do multiple iterations and input before you’re receiving
                  the end-product
                </p>
              </div>
            </div>
          </section>
          {/*section how it work mobile */}
          <section
            className={"section4howitworkmobile md:hidden bg-white py-9 px-4"}
          >
            <p className="mb-2 text-2xl text-center font-semibold text-blackmig">
              How{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                it works
              </span>{" "}
              ?
            </p>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-1.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-semibold"}>
                  Custom project-based collaboration
                </p>
                <p className={"text-sm text-blackmig gilroy-regular"}>
                  One-stop service to develop tailored products
                </p>
              </div>
            </div>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-2.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-semibold"}>
                  Providing all the resources you’ll need
                </p>
                <p className={"text-sm text-blackmig gilroy-regular"}>
                  We have extensive talents and technologies tobuild the best
                  project for you and your companies
                </p>
              </div>
            </div>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-3.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-semibold"}>
                  Clear and detailed project development
                </p>
                <p className={"text-sm text-blackmig gilroy-regular"}>
                  We do multiple iterations and input before you’re receiving
                  the end-product
                </p>
              </div>
            </div>
          </section>
          {/* section testimonial browser */}
          <section
            className={
              "section3landingpageadvantages hidden md:block bg-bgjoinmig pt-4 md:pt-12 pb-[30px] md:pb-[179px] px-[30px] md:px-[106px]"
            }
          >
            <p
              className={
                "text-xl md:text-[32px] text-center gilroy-semibold font-semibold mb-[42px]"
              }
            >
              What they say{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                about us
              </span>{" "}
              ?
            </p>
            <div className={"flex flex-row"}>
              <button onClick={() => slider?.current?.slickPrev()}>
                <div
                  className={
                    "self-center flex items-center justify-center  absolute left-[106.5px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                  }
                >
                  <img
                    className={"grid justify-items-center"}
                    style={{ width: "40px", height: "40px" }}
                    src="/image/landingpage/arrow-sm-left.png"
                  />
                </div>
              </button>
              <div
                className={"center md:content-around hidden md:block"}
                style={{ maxWidth: 1000 }}
              >
                <Slider {...sliderSettings2} ref={slider}>
                  <div
                    className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience
                      </span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt
                      </span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        "border-solid border border-dividermig mt-6 mx-auto w-[417px] h-0"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "68px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-6">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center mx-2 mt-6">
                        <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                          <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"self-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience
                      </span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt
                      </span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "68px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-6">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center mx-2 mt-6">
                        <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                          <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"self-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience
                      </span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt
                      </span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "68px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-6">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center mx-2 mt-6">
                        <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                          <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"self-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </Slider>
              </div>
              <button onClick={() => slider?.current?.slickNext()}>
                <div
                  className={
                    "self-center flex items-center justify-center  absolute right-[106.5px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                  }
                >
                  <img
                    className={"grid justify-items-center"}
                    style={{ width: "40px", height: "40px" }}
                    src="/image/landingpage/arrow-sm-right.png"
                  />
                </div>
              </button>
            </div>
          </section>
          {/* testimonial mobile */}
          <section
            className={
              "sectiontestimonialmobile block md:hidden bg-bgjoinmig pt-8 pb-[178px] px-[30px] md:px-10"
            }
          >
            <p
              className={
                "text-xl md:text-[32px] text-center gilroy-semibold font-semibold md:py-0 mb-7 md:mb-10"
              }
            >
              What they say{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                about us
              </span>{" "}
              ?
            </p>
            <div className={"block md:hidden"} style={{ maxWidth: 1000 }}>
              <Slider {...sliderSettingsPhone}>
                <div
                  className="py-4 px-8 bg-white rounded-lg"
                  style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                >
                  <div className="">
                    <p className="text-sm text italic gilroy-semibold font-semibold">
                      "
                    </p>

                    <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience{" "}
                      </span>
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt{" "}
                      </span>
                      ut labore et dolore magna aliqua.
                      <br className="hidden xl:block"></br> optimize your cost
                      and productivity
                    </p>
                    <p className="text-sm text italic gilroy-semibold font-semibold">
                      "
                    </p>
                    <div className="flex flex-col">
                      <div className="flex flex-row mt-2">
                        <img
                          className="rounded-full"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "40px", width: "60px" }}
                          alt=""
                        />
                        <div className="self-center ml-[6.8px]">
                          <p className="text-xs font-semibold Gilroy-semibold text-black">
                            Fachri Fauzan
                          </p>
                          <p className="text-xs font-semibold Gilroy-semibold text-darkgrey">
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="py-4 px-8 bg-white rounded-lg"
                  style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                >
                  <div className="">
                    <p className="text-sm text italic gilroy-semibold font-semibold">
                      "
                    </p>

                    <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience{" "}
                      </span>
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt{" "}
                      </span>
                      ut labore et dolore magna aliqua.
                      <br className="hidden xl:block"></br> optimize your cost
                      and productivity
                    </p>
                    <p className="text-sm text italic gilroy-semibold font-semibold">
                      "
                    </p>
                    <div className="flex flex-col">
                      <div className="flex flex-row mt-2">
                        <img
                          className="rounded-full"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "40px", width: "60px" }}
                          alt=""
                        />
                        <div className="self-center ml-[6.8px]">
                          <p className="text-xs font-semibold Gilroy-semibold text-black">
                            Fachri Fauzan
                          </p>
                          <p className="text-xs font-semibold Gilroy-semibold text-darkgrey">
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="py-4 px-8 bg-white rounded-lg"
                  style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                >
                  <div className="">
                    <p className="text-sm text italic gilroy-semibold font-semibold">
                      "
                    </p>

                    <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                      I had a{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        wonderful experience{" "}
                      </span>
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"text-primarygreen font-semibold"}>
                        tempor incididunt{" "}
                      </span>
                      ut labore et dolore magna aliqua.
                      <br className="hidden xl:block"></br> optimize your cost
                      and productivity
                    </p>
                    <p className="text-sm text italic gilroy-semibold font-semibold">
                      "
                    </p>
                    <div className="flex flex-col">
                      <div className="flex flex-row mt-2">
                        <img
                          className="rounded-full"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "40px", width: "60px" }}
                          alt=""
                        />
                        <div className="self-center ml-[6.8px]">
                          <p className="text-xs font-semibold Gilroy-semibold text-black">
                            Fachri Fauzan
                          </p>
                          <p className="text-xs font-semibold Gilroy-semibold text-darkgrey">
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
            <div className={"block md:hidden mt-16 flex justify-center"}>
              <button className={"w-[142px] py-2 px-4 bg-bgjoinmig"}>
                <div className={"flex flex-row justify-around"}>
                  <p
                    className={
                      "text-base text-primarygreen gilroy-semibold font-semibold"
                    }
                  >
                    Read More
                  </p>
                  <img
                    className={"self-center"}
                    style={{ height: "15.64px", width: "8.95px" }}
                    src="/image/landingpage/arrow-forward-ios.png"
                  />
                </div>
              </button>
            </div>
          </section>
          <section
            className={
              "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter -mt-3 pt-8"
            }
          >
            <div className={"justify-start self-end"}>
              <img
                style={{ width: "332px", height: "142px" }}
                src="/image/landingpage/footer-left.png"
              />
            </div>
            <div className={"container w-1/2 mx-auto"}>
              <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-36 py-4 px-8">
                <p className={"text-2xl font-semibold text-black"}>
                  Fulfill your IT needs easily!
                </p>
                <p className={"py-5 text-base gilroy-regular text-black"}>
                  Need help in providing your needs? Whether they related to
                  hardware, software, or even talent hiring? Contact us and hear
                  what service can we offer to you and your company!
                </p>
                <Link href="/contactus">
                  <button
                    className={
                      "text-sm text-white border-2 rounded bg-primarygreen border-primarygreen py-2 pl-4 pr-[13.67px] mt-4"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p
                        className={
                          "text-base gilroy-semibold font-semibold mr-2"
                        }
                      >
                        Contact Us
                      </p>
                      <img
                        className={"self-center w-[20px] h-[20px]"}
                        src="/image/landingpage/arrow_forward.png"
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            <div className={"justify-end  self-end"}>
              <img
                className={"w-[332px] h-[142px]"}
                src="/image/landingpage/footer-right.png"
              />
            </div>
          </section>
          {/*section contact us mobile */}
          <section
            className={
              "contactusphone md:relative block md:hidden md:flex bg-bgfooter pt-8 h-[205px]"
            }
          >
            <div className={"container mx-auto"}>
              <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-[102px] py-4 px-8">
                <p className={"text-xl font-semibold"}>
                  Fulfill your IT needs easily!
                </p>
                <p className={"py-5 text-sm Gilroy-regular"}>
                  Need help in providing your needs? Whether they related to
                  hardware, software, or even talent hiring? Contact us and hear
                  what service can we offer to you and your company!
                </p>
                <Link href="/hardware">
                  <button
                    className={
                      "text-base text-center text-white border-2 bg-primarygreen border-primarygreen rounded px-4 py-2 md:px-4 mt-4"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"px-1"}>Contact Us</p>
                      <img
                        className={"py-1 px-1"}
                        style={{ width: "15px" }}
                        src="/image/landingpage/arrow_forward.png"
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            <div className={"flex justify-between self-end"}>
              <img
                style={{ width: "160px", height: "69px" }}
                src="/image/landingpage/footer-left.png"
              />
              <img
                style={{ width: "160px", height: "69px" }}
                src="/image/landingpage/footer-right.png"
              />
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}

export default Software;
