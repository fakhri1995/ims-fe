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
import Linkk from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReCAPTCHA from "react-google-recaptcha";
import Slider from "react-slick";

import { generateStaticAssetUrl, objectToFormData } from "lib/helper";
import { getBase64 } from "lib/helper";

import Layout from "../../../components/migwebsite/layout.js";
import ThankForm from "../../../components/migwebsite/thank-form.js";
import en from "../../../locales/en";
import id from "../../../locales/id";
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
    window.scrollTo(0, 0);
  };

  const handleForm = () => {
    setFormActive("first");
    window.scrollTo(0, 0);
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
      setShowEmailError(true);
      setEmailError("you must filled email first");
    } else if (
      dataSoftware.company_email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setShowEmailError(false);
      setShowform(true);
    } else {
      setShowEmailError(true);
      setEmailError("your email is invalid");
    }
  };

  const [dataSoftware, setDataSoftware] = useState({
    company_name: null,
    company_email: null,
    contact_name: null,
    phone_number: null,
    kind_form: "software",
    budget_from: null,
    budget_to: null,
    kind_project: null,
    type_project: null,
    attachment: null,
  });
  const [dateNow, setDateNow] = useState(new Date());
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
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [dataTestimonial, setDataTestimonial] = useState(null);
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

  useEffect(() => {
    if (localStorage.getItem("dataForm")) {
      let dataForm = JSON.parse(localStorage.getItem("dataForm"));
      console.log("dataform ", dataForm);
      setDataSoftware({
        ...dataSoftware,
        company_email: dataForm.company_email,
        company_name: dataForm.company_name,
        contact_name: dataForm.name,
        phone_number: dataForm.phone_number,
      });
      setShowform(true);
      setFormActive("second");
      localStorage.removeItem("dataForm");
      window.scrollTo(0, 0);
    }
    getDataTestimonial();
  }, []);

  const getDataTestimonial = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialSoftwarePage`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          setDataTestimonial(res2.data);
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };
  const onChangeValuePurpose = (e) => {
    console.log("radio checked", e.target.value);
    // setValuePurpose(e.target.value);
    setDataSoftware({
      ...dataSoftware,
      type_project: e.target.value,
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
    "None of the above, I just want to know about the service",
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

  const onChangeFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      console.log("info file ", info);
      setDataSoftware({
        ...dataSoftware,
        attachment: blobFile,
      });
    }
  };

  const submitFormSoftware = () => {
    if (captchaRef.current.getValue() != "") {
      let dataSoftwarePost = {
        company_name: dataSoftware.company_name,
        contact_name: dataSoftware.contact_name,
        company_email: dataSoftware.company_email,
        phone_number: dataSoftware.phone_number,
        kind_project: dataSoftware.kind_project,
        type_project: dataSoftware.type_project,
        budget_from: dataSoftware.budget_from,
        budget_to: dataSoftware.budget_to,
        kind_form: "software",
        meeting_schedule:
          moment(valueDate).format("YYYY-MM-DD") + " " + valueMeetingTime,
        attachment: dataSoftware.attachment,
      };
      let formData = objectToFormData(dataSoftwarePost);
      console.log("data meeting schedule ", dataSoftwarePost.meeting_schedule);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addFormSolution`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            form.resetFields();
            setFeedback(false);
            notification.success({
              message: "Submit Form Solution Software Success!",
              duration: 3,
            });
            setShowThankForm(true);
          } else if (!res2.success) {
            notification["error"]({
              message: res2.message.errorInfo.status_detail,
              duration: 5,
            });
          }
        });
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
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>{t.softwaremetatitle}</title>
        <meta name="description" content={t.softwaremetadescription} />
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
                  className={
                    "cursor-pointer flex-col text-lg font-gilroybold mx-4"
                  }
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
                ? "hidden xl:pl-[112px] 2xl:pl-[224px] py-[76px] md:flex md:flex-row md:justify-between"
                : "hidden xl:pl-[112px] 2xl:pl-[224px] py-[76px] md:flex md:flex-row"
            }
          >
            {formActive == "first" ? (
              <div className="w-[52%]">
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-[30px] text-primarygreen font-gilroysemibold"
                  }
                >
                  Thank you for your interest in providing your IT needs through
                  Mitramas Infosys Global
                </p>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-4 text-xl text-blackmig"}
                >
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
                        className={"gilroy-medium text-base"}
                        label={<p style={{ fontSize: "16px" }}>Company Name</p>}
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "16px",
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
                        className={"gilroy-medium text-base"}
                        label={<p style={{ fontSize: "16px" }}>Contact Name</p>}
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
                              contact_name: e.target.value,
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
                        className={"gilroy-medium text-base"}
                        label={<p style={{ fontSize: "16px" }}>Email</p>}
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
                          value={"oke"}
                          style={{
                            border: "1px solid #B8B8B8",
                            fontSize: "16px",
                          }}
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
                        className={"gilroy-medium text-base"}
                        label={<p style={{ fontSize: "16px" }}>Phone Number</p>}
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
                          style={{ fontSize: "16px" }}
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
                            <p className={"text-[18px] font-gilroysemibold"}>
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
                  <p
                    style={{ lineHeight: "120%" }}
                    className={"text-[30px] text-blackmig font-gilroysemibold"}
                  >
                    Project Information
                  </p>
                  <Form.Item
                    name={"Kind of Project"}
                    className={"text-blackmig text-base"}
                    label={
                      <p style={{ fontSize: "16px" }}>
                        What kind of project do you want to build?
                      </p>
                    }
                    rules={[{ required: true }]}
                  >
                    <TextArea
                      rows={4}
                      style={{ border: "1px solid #B8B8B8", fontSize: "16px" }}
                      name={"Kind of Project"}
                      onChange={(e) => {
                        setDataSoftware({
                          ...dataSoftware,
                          kind_project: e.target.value,
                        });
                      }}
                      placeholder="Tell us about your project"
                    />
                  </Form.Item>
                  {/* <p className={"mt-9"}>* What type of project are you hiring us for?</p> */}
                  <div className={"mt-9"}>
                    <Form.Item
                      name={"Type of Project"}
                      className={"text-blackmig text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          What type of project are you hiring us for?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Radio.Group
                        onChange={onChangeValuePurpose}
                        value={dataSoftware.type_project}
                        buttonStyle={"solid"}
                      >
                        <Space direction="vertical">
                          {dataTypeProject.map((name) => (
                            <Radio
                              className="text-blackmig text-base"
                              value={name}
                            >
                              <p className={"text-blackmig text-base"}>
                                {name}
                              </p>
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className={"mt-9"}>
                    <p className={"text-base"}>Budget range</p>
                    <div className={"mt-1 flex flex-row"}>
                      <Form.Item
                        name={"Budget Minimal"}
                        className={"text-blackmig text-base"}
                        label={<p style={{ fontSize: "16px" }}>From</p>}
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
                            // border: "1px solid #B8B8B8",
                            width: "132px",
                            // height: "37px",
                            fontSize: "16px",
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
                      <div
                        className={
                          "mx-[19.3px] grid justify-center self-center mt-3"
                        }
                      >
                        <img
                          className={"w-5 h-5"}
                          src={"/image/software/arrow_right_alt.png"}
                        />
                      </div>
                      <Form.Item
                        name={"Budget Maximal"}
                        className={"text-blackmig text-base"}
                        label={<p style={{ fontSize: "16px" }}>To</p>}
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
                            // border: "1px solid #B8B8B8",
                            width: "132px",
                            // height: "37px",
                            fontSize: "16px",
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
                    <Form.Item
                      label={<p style={{ fontSize: "16px" }}>Attachment</p>}
                    >
                      <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                      >
                        <Upload.Dragger
                          className={"border-1 border-dashed border-accentblue"}
                          name="files"
                          maxCount={1}
                          onChange={onChangeFile}
                          accept=".pdf,.jpg,.jpeg,.png"
                          // action="/upload.do"
                          style={{ width: "298px", height: "180px" }}
                        >
                          <img
                            className="anticon anticon-inbox mt-3"
                            style={{ width: "48px", height: "32px" }}
                            src="/image/landingpage/upload.png"
                          />
                          <p className="text-xs font-gilroyregular px-9 mt-9">
                            Drag and drop your sourcing documents here
                          </p>
                          <p className="text-xs font-gilroyregular mt-2">Or</p>
                          <p className="text-xs font-gilroyregular text-bluemig mt-2">
                            browse
                          </p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"text-darkgrey text-xs font-gilroyregular"}>
                      Product images or files lead to more accurate quotes.
                    </p>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={handleForm}
                    >
                      <p className={"text-[18px] text-primarygreen"}>Back</p>
                    </button>
                    <button
                      className={
                        "text-white bg-primarygreen w-[95px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                      }
                    >
                      <p className={"text-[18px] text-white"}>Next</p>
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
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-[30px] text-blackmig font-gilroysemibold"}
                >
                  Choose Meeting Date
                </p>
                <div
                  className={
                    "mt-9 bg-bgjoinmig  w-[788px]  px-3 py-2 rounded-lg flex flex-row"
                  }
                >
                  <img src={"image/software/information-circle.png"} />
                  <p className={"ml-3 text-base text-blackmig self-center"}>
                    Please choose a meeting date & time with Mitramas Infosys
                    Global
                  </p>
                </div>
                <div className={"flex flex-row mt-4"}>
                  <div className={"w-[392px]"}>
                    <div className="site-calendar-demo-card">
                      <Calendar
                        minDate={dateNow}
                        onChange={onPanelChange}
                        value={valueDate}
                      />
                    </div>
                  </div>
                  <div className={"ml-8"}>
                    <p
                      className={"text-base text-blackmig font-gilroysemibold"}
                    >
                      Choose Time
                    </p>
                    <p
                      className={
                        "text-base text-blackmig font-gilroyregular mt-1"
                      }
                    >
                      Meeting duration: 30 minutes
                    </p>
                    <div className={"mt-4 flex flex-row"}>
                      <div
                        className={
                          "text-base text-blackmig font-gilroysemibold w-[174px]"
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
                          "text-base text-blackmig font-gilroysemibold ml-4 w-[174px]"
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
                  <p className={"text-base text-blackmig font-gilroyregular"}>
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
                      <p className={"text-blackmig text-base"}>
                        {moment(valueDateTemp).format("dddd,MMMM Do YYYY")}
                      </p>
                      <p className={"text-blackmig text-base"}>
                        {labelMeetingTime}
                      </p>
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
                    <p className={"text-[18px] text-primarygreen"}>Back</p>
                  </button>
                  <button
                    type={"submit"}
                    onClick={submitFormSoftware}
                    className={
                      "text-white bg-primarygreen w-[95px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                    }
                  >
                    <p className={"text-[18px] text-white"}>Submit</p>
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
          {/* section form mobile */}
          <section
            className={
              formActive == "first"
                ? "px-4 py-9 lg:hidden"
                : "px-4 py-9 lg:hidden"
            }
          >
            {formActive == "first" ? (
              <div className="w-full">
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-xl text-primarygreen font-gilroysemibold"}
                >
                  Thank you for your interest in providing your IT needs through
                  Mitramas Infosys Global
                </p>
                <img
                  className={"w-[192px] h-[112px] mt-4 mx-auto"}
                  src="/image/landingpage/Talents-2.png"
                />
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-4 text-sm text-blackmig"}
                >
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
                    <div className={"w-full"}>
                      <Form.Item
                        name={"Company Name"}
                        className={"text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Company Name</p>}
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "14px",
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
                        className={"text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Contact Name</p>}
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "14px",
                          }}
                          name={"Contact Name"}
                          onChange={(e) => {
                            setDataSoftware({
                              ...dataSoftware,
                              contact_name: e.target.value,
                            });
                          }}
                          placeholder="Enter your name here"
                        />
                      </Form.Item>
                    </div>
                    <div className={"w-full"}>
                      <Form.Item
                        initialValue={dataSoftware.company_email}
                        name={"Email"}
                        className={"text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Email</p>}
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
                          value={"oke"}
                          style={{
                            border: "1px solid #B8B8B8",
                            fontSize: "14px",
                          }}
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
                        className={"text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Phone Number</p>}
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
                          style={{ fontSize: "14px" }}
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
                            "rounded text-white border-2 bg-primarygreen border-primarygreen py-2 pl-4 pr-[12.18px] mt-9"
                          }
                        >
                          <div className={"flex flex-row justify-between"}>
                            <p className={"text-base font-gilroysemibold"}>
                              Get Started
                            </p>
                            <img
                              className={"self-center ml-[13.52px]"}
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
              <div className="w-full">
                <Form
                  id="formsoftware"
                  layout={"vertical"}
                  onFinish={() => handleSubmit("third")}
                  form={form}
                >
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-base text-blackmig font-gilroysemibold mb-9"
                    }
                  >
                    Project Information
                  </p>
                  <Form.Item
                    name={"Kind of Project"}
                    className={"text-blackmig text-sm"}
                    label={
                      <p style={{ fontSize: "16px" }}>
                        What kind of project do you want to build?
                      </p>
                    }
                    rules={[{ required: true }]}
                  >
                    <TextArea
                      rows={4}
                      style={{ border: "1px solid #B8B8B8", fontSize: "14px" }}
                      name={"Kind of Project"}
                      onChange={(e) => {
                        setDataSoftware({
                          ...dataSoftware,
                          kind_project: e.target.value,
                        });
                      }}
                      placeholder="Tell us about your project"
                    />
                  </Form.Item>
                  {/* <p className={"mt-9"}>* What type of project are you hiring us for?</p> */}
                  <div className={"mt-9"}>
                    <Form.Item
                      name={"Type of Project"}
                      className={"text-blackmig text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
                          What type of project are you hiring us for?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Radio.Group
                        onChange={onChangeValuePurpose}
                        value={dataSoftware.type_project}
                        buttonStyle={"solid"}
                      >
                        <Space direction="vertical">
                          {dataTypeProject.map((name) => (
                            <Radio
                              className="text-blackmig text-sm"
                              value={name}
                            >
                              <p className={"text-blackmig text-sm"}>{name}</p>
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className={"mt-9"}>
                    <p className={"text-sm"}>Budget range</p>
                    <div className={"mt-1 flex flex-row"}>
                      <Form.Item
                        name={"Budget Minimal"}
                        className={"text-blackmig text-sm"}
                        label={<p style={{ fontSize: "14px" }}>From</p>}
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
                            // border: "1px solid #B8B8B8",
                            width: "132px",
                            // height: "37px",
                            fontSize: "14px",
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
                      <div
                        className={
                          "mx-[19.3px] grid justify-center self-center mt-3"
                        }
                      >
                        <img
                          className={"w-5 h-5"}
                          src={"/image/software/arrow_right_alt.png"}
                        />
                      </div>
                      <Form.Item
                        name={"Budget Maximal"}
                        className={"text-blackmig text-sm"}
                        label={<p style={{ fontSize: "14px" }}>To</p>}
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
                            // border: "1px solid #B8B8B8",
                            width: "132px",
                            // height: "37px",
                            fontSize: "14px",
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
                    <Form.Item
                      label={<p style={{ fontSize: "14px" }}>Attachment</p>}
                    >
                      <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                      >
                        <Upload.Dragger
                          className={"border-1 border-dashed border-accentblue"}
                          name="files"
                          maxCount={1}
                          onChange={onChangeFile}
                          accept=".pdf,.jpg,.jpeg,.png"
                          // action="/upload.do"
                          style={{ width: "298px", height: "180px" }}
                        >
                          <img
                            className="anticon anticon-inbox mt-3"
                            style={{ width: "48px", height: "32px" }}
                            src="/image/landingpage/upload.png"
                          />
                          <p className="text-xs font-gilroyregular px-9 mt-9">
                            Drag and drop your sourcing documents here
                          </p>
                          <p className="text-xs font-gilroyregular mt-2">Or</p>
                          <p className="text-xs font-gilroyregular text-bluemig mt-2">
                            browse
                          </p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"text-darkgrey text-xs font-gilroyregular"}>
                      Product images or files lead to more accurate quotes.
                    </p>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={handleForm}
                    >
                      <p
                        className={
                          "text-base text-primarygreen fontgilroysemibold"
                        }
                      >
                        Back
                      </p>
                    </button>
                    <button
                      className={
                        "text-white bg-primarygreen rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
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
              <div className="w-full">
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-base text-blackmig font-gilroysemibold"}
                >
                  Choose Meeting Date
                </p>
                <div className={"mt-9 bg-bgjoinmig px-3 py-2 rounded-lg"}>
                  <p className={"ml-3 text-base text-blackmig self-center"}>
                    Please choose a meeting date & time with Mitramas Infosys
                    Global
                  </p>
                </div>
                <div className={"mt-4"}>
                  <div className={"w-full"}>
                    <div className="site-calendar-demo-card">
                      <Calendar
                        minDate={dateNow}
                        onChange={onPanelChange}
                        value={valueDate}
                      />
                    </div>
                  </div>
                  <div className={"w-full mt-4"}>
                    <p className={"text-xs text-blackmig font-gilroysemibold"}>
                      Choose Time
                    </p>
                    <p
                      className={
                        "text-xs text-blackmig font-gilroyregular mt-1"
                      }
                    >
                      Meeting duration: 30 minutes
                    </p>
                    {valueDateTemp == null ? (
                      <p className={"mt-1 text-redmig text-xs"}>
                        Please choose your date first on the calendar
                      </p>
                    ) : (
                      <div
                        className={"text-sm text-blackmig font-gilroysemibold"}
                      >
                        <p className={"text-blackmig text-sm"}>
                          {moment(valueDateTemp).format("dddd,MMMM Do YYYY")}
                        </p>
                        <p className={"text-blackmig text-sm"}>
                          {labelMeetingTime}
                        </p>
                      </div>
                    )}
                    {valueDateTemp != null && (
                      <div className={"mt-4 flex flex-col"}>
                        <div
                          className={
                            "text-base text-blackmig font-gilroysemibold flex flex-row"
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
                                  ? "rounded bg-greenTrans20 border border-primarygreen py-2 px-[21px] mt-5 mr-3"
                                  : "mt-5 rounded bg-divider py-2 px-[21px] mr-3"
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
                            "text-base text-blackmig font-gilroysemibold flex flex-row"
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
                                  ? "mr-[12px] rounded bg-greenTrans20 border border-primarygreen py-2 px-[21px] mt-5"
                                  : "mt-5 mr-[12px]  rounded bg-divider py-2 px-[21px]"
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
                    )}
                  </div>
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
                    <p
                      className={
                        "text-base text-primarygreen font-gilroysemibold"
                      }
                    >
                      Back
                    </p>
                  </button>
                  <button
                    type={"submit"}
                    onClick={submitFormSoftware}
                    className={
                      "text-white bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                    }
                  >
                    <p className={"text-base text-white"}>Next</p>
                    <img
                      className={"self-center ml-[13.52px]"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow_forward_ios2.png"
                    />
                  </button>
                </div>
              </div>
            )}
            {/* <div
              className={
                formActive == "first" ? "w-[46%] self-center" : "w-[46%] ml-5"
              }
            >
              <img
                className={"w-full h-auto"}
                src="/image/landingpage/Talents-2.png"
              />
            </div> */}
          </section>
          {/* end section form mobile */}
        </div>
      ) : showForm && showThankForm == true ? (
        <div className="grid justify-items-center">
          <ThankForm type_form={"Software"} />
        </div>
      ) : (
        <div className={"noform"}>
          <section
            className={"section2software py-4 md:py-16 px-4 md:px-[113.5px]"}
          >
            <div className={"hidden md:flex container mt-16 mx-auto"}>
              <div className={"flex-col w-1/2"}>
                <h1
                  style={{ lineHeight: "120%" }}
                  className={"text-[36px] font-gilroysemibold"}
                >
                  {t.softwareherosection}
                </h1>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-8 font-gilroyregular text-xl"}
                >
                  {t.softwareheosectionsubtitle}
                </p>
                <div className={"mt-[40px]"}>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={"font-gilroysemibold text-primarygreen text-xl"}
                  >
                    {t.hardwarereachus}
                  </p>
                  <div className={"flex flex-row items-center mt-1"}>
                    <Input
                      name={"email"}
                      style={{ fontSize: 16 }}
                      className={"w-1/2 h-[37px]"}
                      onChange={(e) => {
                        setDataSoftware({
                          ...dataSoftware,
                          company_email: e.target.value,
                        });
                      }}
                      placeholder={t.hardwareenteremail}
                    />
                    <button
                      onClick={handleLetsTalk}
                      className={
                        "text-[18px] ml-4 rounded text-white py-2 pl-4 pr-2.5 bg-primarygreen border-primarygreen bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between gap-2"}>
                        <p
                          style={{ lineHeight: "120%" }}
                          className={"font-gilroysemibold"}
                        >
                          {locale == "en" ? "Let's talk!" : "Konsultasi gratis"}
                        </p>
                        <img
                          className={"w-[20px] h-[20px] self-center"}
                          src="/image/landingpage/arrow-circle-right.png"
                        />
                      </div>
                    </button>
                  </div>
                  {showEmailError && (
                    <div className={"mt-2"}>
                      <p
                        className={"text-redmig font-gilroysemibold text-base"}
                      >
                        {emailError}
                      </p>
                    </div>
                  )}
                  <div
                    className={
                      "my-4 w-3/4 border rounded-lg shadow-lg p-2 bg-green15"
                    }
                  >
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-5 h-5 mt-[2.5px] mr-2.5"}
                        src="/image/landingpage/info.png"
                      />
                      <div>
                        <p
                          className={
                            "text-base text-blackmig font-gilroyregular"
                          }
                        >
                          {t.softwareherosectionboxtitle}
                        </p>
                        <ul>
                          <li>
                            <p
                              className={
                                "text-base text-blackmig font-gilroyregular"
                              }
                            >
                              {""}
                              <span className={"font-gilroysemibold"}>
                                {" "}
                                {t.softwareherosectionboxsubtitle1bold}
                              </span>{" "}
                              {t.softwareherosectionboxsubtitle1}
                            </p>
                          </li>
                          <li>
                            <p
                              className={
                                "text-base text-blackmig font-gilroyregular"
                              }
                            >
                              {""}
                              <span className={"font-gilroysemibold"}>
                                {t.softwareherosectionboxsubtitle2bold}
                              </span>{" "}
                              {t.softwareherosectionboxsubtitle2}
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
                  className={
                    "text-blackmig text-xl text-center font-gilroysemibold"
                  }
                >
                  {t.softwareherosection}
                </p>
                <img
                  src="/image/hardware/Hardware-Solution.png"
                  className={"w-[304px] h-[174px]"}
                ></img>
                <p
                  className={
                    "py-6 text-center text-base font-gilroyregular text-blackmig"
                  }
                >
                  {t.softwareheosectionsubtitle}
                </p>
              </div>
              <div>
                <p className={"font-gilroysemibold text-primarygreen text-sm"}>
                  {t.hardwarereachus}
                </p>
                <div className={"flex flex-row items-center mt-1"}>
                  <Input
                    name={"email"}
                    className={"w-[241px] h-[37px]"}
                    onChange={(e) => {
                      setDataSoftware({
                        ...dataSoftware,
                        company_email: e.target.value,
                      });
                    }}
                    placeholder={t.hardwareenteremail}
                  />
                  <button
                    onClick={handleLetsTalk}
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
                    <p className={"text-sm text-blackmig font-gilroyregular"}>
                      {t.softwareherosectionboxtitle}
                    </p>
                    <ul className={""}>
                      <li className={"mt-1"}>
                        <p
                          className={"text-sm text-blackmig font-gilroyregular"}
                        >
                          {""}
                          <span className={"font-bold"}>
                            {t.softwareherosectionboxsubtitle1bold}
                          </span>{" "}
                          {t.softwareherosectionboxsubtitle1}
                        </p>
                      </li>
                      <li className={"mt-1"}>
                        <p
                          className={"text-sm text-blackmig font-gilroyregular"}
                        >
                          {""}
                          <span className={"font-bold"}>
                            {t.softwareherosectionboxsubtitle2bold}
                          </span>{" "}
                          {t.softwareherosectionboxsubtitle2}
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
              "section3software hidden md:block bg-bgjoinmig px-[52px] md:px-[113.5px] py-12"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl md:text-[36px] text-center font-gilroysemibold py-8 md:py-0 mb-10"
              }
            >
              {t.softwarepastworksectiontitle1}{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                {t.softwarepastworksectiontitle2}
              </span>{" "}
              {t.softwarepastworksectiontitle3}
            </h2>
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
                <Slider {...sliderSettings2} ref={slider2}>
                  <div className={"py-8 px-[16.25px] rounded-lg"}>
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-[480px] h-[283px]"}
                        // style={{ width: "284.29px", height: "159px" }}
                        src="/image/landingpage/migsys_browser.png"
                      />
                      <div className={"ml-11 mt-2"}>
                        <p
                          className={
                            "text-primarygreen font-gilroyregular text-[14px] rounded-[20px] w-[161px] px-2 py-1 bg-greenTrans20"
                          }
                        >
                          Website Development
                        </p>
                        <p
                          style={{ lineHeight: "120%" }}
                          className={
                            "font-gilroybold text-blackmig text-[28px] mt-4"
                          }
                        >
                          MIGSys
                        </p>
                        <div className={"mt-4"}>
                          <p
                            style={{ lineHeight: "150%" }}
                            className={
                              "font-gilroyregular text-blackmig text-xl"
                            }
                          >
                            {t.migsysdescription}{" "}
                          </p>
                          <ul
                            style={{ lineHeight: "150%" }}
                            className={
                              "font-gilroyregular text-blackmig text-xl"
                            }
                          >
                            <li>{t.migsysdetail1}</li>
                            <li>{t.migsysdetail2}</li>
                            <li>{t.migsysdetail3}</li>
                            <li>{t.migsysdetail4}</li>
                            <li>{t.migsysdetail5}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"py-8 px-[16.25px] rounded-lg"}>
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-[480px] h-[283px]"}
                        // style={{ width: "284.29px", height: "159px" }}
                        src="/image/landingpage/lms-browser.png"
                      />
                      <div className={"ml-11 mt-2"}>
                        <p
                          className={
                            "text-primarygreen font-gilroyregular text-[14px] rounded-[20px] w-[161px] px-2 py-1 bg-greenTrans20"
                          }
                        >
                          Website Development
                        </p>
                        <p
                          style={{ lineHeight: "120%" }}
                          className={
                            "font-gilroybold text-blackmig text-[28px] mt-4"
                          }
                        >
                          AQL Learning Management System (LMS)
                        </p>
                        <div className={"mt-4"}>
                          <p
                            style={{ lineHeight: "150%" }}
                            className={
                              "font-gilroyregular text-blackmig text-xl"
                            }
                          >
                            {t.lmsdescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"py-8 px-[16.25px] rounded-lg"}>
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-[480px] h-[283px]"}
                        // style={{ width: "284.29px", height: "159px" }}
                        src="/image/landingpage/warung_lebaran_browser.png"
                      />
                      <div className={"ml-11 mt-2"}>
                        <p
                          className={
                            "text-primarygreen font-gilroyregular text-[14px] rounded-[20px] w-[161px] px-2 py-1 bg-greenTrans20"
                          }
                        >
                          Website Development
                        </p>
                        <p
                          style={{ lineHeight: "120%" }}
                          className={
                            "font-gilroybold text-blackmig text-[28px] mt-4"
                          }
                        >
                          Warung Lebaran
                        </p>
                        <div className={"mt-4"}>
                          <p
                            style={{ lineHeight: "150%" }}
                            className={
                              "font-gilroyregular text-blackmig text-xl"
                            }
                          >
                            {t.warunglebarandescription}
                          </p>
                        </div>
                      </div>
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
            <p className={"text-xl text-center font-gilroysemibold"}>
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
                    <p className={"font-gilroysemibold text-blackmig text-sm"}>
                      MIGSys
                    </p>
                    <div className={"px-2 py-1 bg-greenTrans20 rounded-[20px]"}>
                      <p
                        className={
                          "text-primarygreen font-gilroyregular text-xs"
                        }
                      >
                        Website Development
                      </p>
                    </div>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"font-gilroyregular text-blackmig text-sm"}>
                      {t.migsysdescription}{" "}
                    </p>
                    <ul className={"font-gilroyregular text-blackmig text-sm"}>
                      <li>{t.migsysdetail1}</li>
                      <li>{t.migsysdetail2}</li>
                      <li>{t.migsysdetail3}</li>
                      <li>{t.migsysdetail4}</li>
                      <li>{t.migsysdetail5}</li>
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
                    <p className={"font-gilroysemibold text-blackmig text-sm"}>
                      MIGSys
                    </p>
                    <div className={"px-2 py-1 bg-greenTrans20 rounded-[20px]"}>
                      <p
                        className={
                          "text-primarygreen font-gilroyregular text-xs"
                        }
                      >
                        Website Development
                      </p>
                    </div>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"font-gilroyregular text-blackmig text-sm"}>
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
                    <p className={"font-gilroysemibold text-blackmig text-sm"}>
                      MIGSys
                    </p>
                    <div className={"px-2 py-1 bg-greenTrans20 rounded-[20px]"}>
                      <p
                        className={
                          "text-primarygreen font-gilroyregular text-xs"
                        }
                      >
                        Website Development
                      </p>
                    </div>
                  </div>
                  <div className={"mt-1"}>
                    <p className={"font-gilroyregular text-blackmig text-sm"}>
                      A web-based hardware managed service to enhance the
                      efficiency of distributions between seller and consumer.
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </section>
          <section className={"px-8 md:px-[113.5px] py-9 md:py-16"}>
            <div className={"container mx-auto text-center"}>
              <div className={"pb-12"}>
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-xl text-blackmig font-gilroyregular text-center w-full lg:w-[646px] mx-auto px-2"
                  }
                >
                  {t.softwarepastworksectionlast}
                </p>
              </div>
              <img className={"m-auto w-full"} src="/image-software.png"></img>
              <div className={"mt-1 md:mt-4 mx-auto"}>
                <Link href="/contactus">
                  <button
                    className={
                      "text-sm md:text-xl  rounded text-primarygreen border-2 bg-white border-primarygreen px-4 py-2 md:px-2 mt-4"
                    }
                  >
                    <p className={"text-base lg:text-xl font-gilroysemibold"}>
                      {locale == "en" ? "Contact our team" : "Kontak tim kami"}
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </section>
          {/* section 3 software why you should */}
          <section
            className={
              "section3softwarebrowser bg-transp60 py-9 lg:py-12 px-4 lg:px-[113.5px]"
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
                <h2
                  style={{ lineHeight: "120%" }}
                  className="mb-2 text-xl lg:text-[28px] text-center lg:text-left font-gilroysemibold text-blackmig"
                >
                  {t.softwarewhyussectiontitle1}{" "}
                  <span
                    style={{
                      borderBottom: "solid 3px #188E4D",
                      paddingBottom: "2.5px",
                    }}
                  >
                    {t.softwarewhyussectiontitle2}
                  </span>{" "}
                  {t.softwarewhyussectiontitle3}
                </h2>
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
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="ml-3.5 text-sm md:text-xl font-gilroysemibold text-blackmig"
                    >
                      {t.softwarehyyousectionlist1}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.softwarewhyyousectionsublist1}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px] self-center"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="ml-3.5 text-sm md:text-xl font-gilroysemibold text-blackmig"
                    >
                      {t.softwarehyyousectionlist2}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.softwarewhyyousectionsublist2}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon3.png"
                    className="w-[42px] h-[42px] self-center"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="ml-3.5 text-sm md:text-xl font-gilroysemibold text-blackmig"
                    >
                      {t.softwarehyyousectionlist3}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.softwarewhyyousectionsublist3}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section how it work */}
          <section
            className={
              "section4howitworkbrowser hidden lg:block bg-white py-4 md:py-16 px-4 md:px-[113.5]"
            }
          >
            <div className={"container text-center mx-auto"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  "text-xl md:text-[36px] font-gilroysemibold py-8 md:py-0"
                }
              >
                {locale == "en"
                  ? "How do MIG's services enable the creation of "
                  : "Bagaimana cara membuat software lewat "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  {locale == "en" ? "top-quality software" : "layanan MIG "}
                </span>{" "}
                ?
              </h2>
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
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-blackmig text-sm md:text-xl font-gilroysemibold mt-4 text-center"
                    }
                  >
                    {t.softwarehowitwork1}
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
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-blackmig text-sm md:text-xl font-gilroysemibold mt-4 text-center"
                  }
                >
                  {t.softwarehowitwork2}
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
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-blackmig text-sm md:text-xl font-gilroysemibold mt-4 text-center"
                  }
                >
                  {t.softwarehowitwork3}
                </p>
              </div>
            </div>
          </section>
          {/*section how it work mobile */}
          <section
            className={"section4howitworkmobile md:hidden bg-white py-9 px-4"}
          >
            <p className="mb-2 text-2xl text-center font-gilroysemibold text-blackmig">
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
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  {t.softwarehowitwork1}
                </p>
              </div>
            </div>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-2.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  {t.softwarehowitwork2}
                </p>
              </div>
            </div>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-3.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  {t.softwarehowitwork3}
                </p>
              </div>
            </div>
          </section>
          {/* section testimonial browser */}
          {dataTestimonial && (
            <section
              className={
                "section3landingpageadvantages hidden md:block bg-bgjoinmig pt-4 md:pt-12 pb-[30px] md:pb-[179px] px-[30px] md:px-[106px]"
              }
            >
              <p
                className={
                  "text-xl md:text-[32px] text-center font-gilroysemibold mb-[42px]"
                }
              >
                {t.customerstorieslandingpage}
              </p>
              <div className={"flex flex-row"}>
                {dataTestimonial ? (
                  dataTestimonial.length > 1 ? (
                    <button onClick={() => slider?.current?.slickPrev()}>
                      <div
                        className={
                          "self-center flex items-center justify-center  absolute left-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                        }
                      >
                        <img
                          className={"grid justify-items-center"}
                          style={{ width: "40px", height: "40px" }}
                          src="/image/landingpage/arrow-sm-left.png"
                        />
                      </div>
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <div
                  className={"center md:content-around hidden md:block"}
                  style={{ maxWidth: 1000 }}
                >
                  <Slider {...sliderSettings2} ref={slider}>
                    {dataTestimonial
                      ? dataTestimonial.map((data1) => (
                          <div className="pt-6 pb-8 md:px-16 bg-bgadvantagecard border border-advantagecard rounded-lg">
                            <div className={"flex flex-row justify-between"}>
                              <div className={"w-[45%]"}>
                                <div className={"flex relative self-center "}>
                                  {data1.attachment_article ? (
                                    <img
                                      className={"w-[356px] h-[237px] "}
                                      src={generateStaticAssetUrl(
                                        data1.attachment_article.link
                                      )}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className={"w-[356px] h-[237px] "}
                                      src={
                                        "/image/landingpage/testimonial-client.png"
                                      }
                                      alt=""
                                    />
                                  )}
                                  <div
                                    className={
                                      "bg-white p-4 absolute -bottom-4 -right-[50px] w-[293px] mt-[115px] rounded-lg"
                                    }
                                    style={{
                                      boxShadow:
                                        "0px 16px 40px rgba(113, 176, 112, 0.2)",
                                    }}
                                  >
                                    {locale == "en" ? (
                                      <div
                                        className=""
                                        dangerouslySetInnerHTML={{
                                          __html: data1.quote,
                                        }}
                                      />
                                    ) : locale == "id" &&
                                      data1.quote_id != null ? (
                                      <div
                                        className=""
                                        dangerouslySetInnerHTML={{
                                          __html: data1.quote_id,
                                        }}
                                      />
                                    ) : (
                                      <div
                                        className=""
                                        dangerouslySetInnerHTML={{
                                          __html: data1.quote,
                                        }}
                                      />
                                    )}
                                    <div
                                      className={
                                        "mt-3 border border-dividermig w-[144px]"
                                      }
                                    />
                                    <p
                                      className={
                                        "mt-1 text-[10px] text-blackmig font-gilroysemibold"
                                      }
                                    >
                                      {data1.author}
                                    </p>
                                    <p
                                      className={
                                        "mt-1 text-[10px] text-blackmig  font-gilroyregular"
                                      }
                                    >
                                      {locale == "en"
                                        ? data1.job_title
                                        : locale == "id" &&
                                          data1.job_title_id != null
                                        ? data1.job_title_id
                                        : data1.job_title}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"w-[45%]"}>
                                <div
                                  className={"flex flex-row justify-between"}
                                >
                                  <div>
                                    <h2
                                      style={{ lineHeight: "120%" }}
                                      className={
                                        "text-blackmig text-[36px] font-gilroysemibold"
                                      }
                                    >
                                      {locale == "en"
                                        ? data1.title
                                        : locale == "id" &&
                                          data1.title_id != null
                                        ? data1.title_id
                                        : data1.title}
                                    </h2>
                                    <p
                                      className={
                                        "text-primarygreen text-base font-gilroysemibold mt-1"
                                      }
                                    >
                                      {data1.company_name}
                                    </p>
                                  </div>
                                  <div>
                                    {data1.company_logo ? (
                                      <img
                                        className={"w-[58.5px] h-[42.5px]"}
                                        src={generateStaticAssetUrl(
                                          data1.company_logo.link
                                        )}
                                      />
                                    ) : (
                                      <img
                                        className={"w-[58.5px] h-[42.5px]"}
                                        src={
                                          "/image/landingpage/testimonial-client.png"
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="mt-4"
                                  dangerouslySetInnerHTML={{
                                    __html: data1.description,
                                  }}
                                />
                                <Linkk
                                  href={`/customerstories/${data1.page_path}`}
                                >
                                  <button
                                    className={
                                      "text-sm rounded mt-8 pl-4 py-2 pr-[12.18px] text-white border-2 bg-primarygreen border-primarygreen"
                                    }
                                  >
                                    <div
                                      className={
                                        "flex flex-row justify-between"
                                      }
                                    >
                                      <p
                                        className={
                                          "pr-[13.52px] text-base font-gilroysemibold"
                                        }
                                      >
                                        Read Story
                                      </p>
                                      <img
                                        className={"w-5 h-5"}
                                        src="/image/landingpage/arrow_forward_ios2.png"
                                      />
                                    </div>
                                  </button>
                                </Linkk>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </Slider>
                </div>
                {dataTestimonial ? (
                  dataTestimonial.length > 1 ? (
                    <button onClick={() => slider?.current?.slickNext()}>
                      <div
                        className={
                          "self-center flex items-center justify-center  absolute right-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                        }
                      >
                        <img
                          className={"grid justify-items-center"}
                          style={{ width: "40px", height: "40px" }}
                          src="/image/landingpage/arrow-sm-right.png"
                        />
                      </div>
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </section>
          )}
          {/* testimonial mobile */}
          {dataTestimonial && (
            <section
              className={
                "sectiontestimonialmobile block md:hidden bg-bgjoinmig pt-8 pb-[178px] px-[30px] md:px-10"
              }
            >
              <p
                className={
                  "text-xl md:text-[32px] text-center font-gilroysemibold md:py-0 mb-7 md:mb-10"
                }
              >
                {t.customerstorieslandingpage}
              </p>
              <div className={"block md:hidden"} style={{ maxWidth: 1000 }}>
                <Slider {...sliderSettingsPhone}>
                  <div
                    className="py-4 px-8 bg-white rounded-lg"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="">
                      <p className="text-sm text italic font-gilroysemibold">
                        "
                      </p>

                      <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                        I had a{" "}
                        <span
                          className={"text-primarygreen font-gilroysemibold"}
                        >
                          wonderful experience{" "}
                        </span>
                        working with Mitramas Infosys Global. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                        <span
                          className={"text-primarygreen font-gilroysemibold"}
                        >
                          tempor incididunt{" "}
                        </span>
                        ut labore et dolore magna aliqua.
                        <br className="hidden xl:block"></br> optimize your cost
                        and productivity
                      </p>
                      <p className="text-sm text italic font-gilroysemibold">
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
                            <p className="text-xs font-gilroysemibold text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-xs font-gilroysemibold text-darkgrey">
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
                      <p className="text-sm text italic font-gilroysemibold">
                        "
                      </p>

                      <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                        I had a{" "}
                        <span
                          className={"text-primarygreen font-gilroysemibold"}
                        >
                          wonderful experience{" "}
                        </span>
                        working with Mitramas Infosys Global. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                        <span
                          className={"text-primarygreen font-gilroysemibold"}
                        >
                          tempor incididunt{" "}
                        </span>
                        ut labore et dolore magna aliqua.
                        <br className="hidden xl:block"></br> optimize your cost
                        and productivity
                      </p>
                      <p className="text-sm text italic font-gilroysemibold">
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
                            <p className="text-xs font-gilroysemibold text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-xs font-gilroysemibold text-darkgrey">
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
                      <p className="text-sm text italic font-gilroysemibold">
                        "
                      </p>

                      <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                        I had a{" "}
                        <span
                          className={"text-primarygreen font-gilroysemibold"}
                        >
                          wonderful experience{" "}
                        </span>
                        working with Mitramas Infosys Global. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                        <span
                          className={"text-primarygreen font-gilroysemibold"}
                        >
                          tempor incididunt{" "}
                        </span>
                        ut labore et dolore magna aliqua.
                        <br className="hidden xl:block"></br> optimize your cost
                        and productivity
                      </p>
                      <p className="text-sm text italic font-gilroysemibold">
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
                            <p className="text-xs font-gilroysemibold text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-xs font-gilroysemibold text-darkgrey">
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
                        "text-base text-primarygreen font-gilroysemibold"
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
          )}
          <section
            className={
              dataTestimonial
                ? "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter -mt-3 pt-8"
                : "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter mt-[100px] pt-8"
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
                <h2
                  style={{ lineHeight: "120%" }}
                  className={"text-[28px] font-gilroysemibold text-black"}
                >
                  {t.contactussectiontitle}
                </h2>
                <div
                  className={
                    "mt-3.5 text-xl font-gilroyregular text-center text-black"
                  }
                >
                  <p style={{ lineHeight: "120%" }}>
                    {t.contactussectionsubtitle1}
                  </p>
                  <p style={{ lineHeight: "120%" }}>
                    {t.contactussectionsubtitle2}
                  </p>
                </div>
                <div className="mt-3.5 flex flex-row justify-center">
                  <div className={"mr-3.5"}>
                    <Linkk href="/contactus">
                      <button
                        className={
                          "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                        }
                      >
                        <p className={"text-xl font-gilroysemibold"}>
                          {t.ctacontactuslandingpage}
                        </p>
                      </button>
                    </Linkk>
                  </div>
                  <div>
                    <Linkk href="/aboutus">
                      <button
                        className={
                          "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                        }
                      >
                        <p className={"text-xl font-gilroysemibold"}>
                          {t.ctalearnmorelandingpage}
                        </p>
                      </button>
                    </Linkk>
                  </div>
                </div>
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
                <p className={"text-xl font-gilroysemibold"}>
                  Fulfill your IT needs easily!
                </p>
                <p className={"py-5 text-sm font-gilroyregular"}>
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
