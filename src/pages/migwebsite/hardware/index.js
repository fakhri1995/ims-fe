import {
  CheckCircleTwoTone,
  CloudUploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
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

function Hardware({}) {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const handleSubmit = () => {
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
    setFormActive("second");
  };

  const handleForm = (value) => {
    setFormActive(value);
  };
  const [dataHardware, setDataHardware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "hardware",
    message: null,
    time_need: null,
    time_used: null,
    product: null,
    many_product: null,
    max_budget: null,
    details: null,
    attachment: null,
  });

  const [dataHardwareSummary, setDataHardwareSummary] = useState([]);
  const [email, setEmail] = useState(null);
  const [showForm, setShowform] = useState(false);
  const [formActive, setFormActive] = useState("first");
  const [feedback, setFeedback] = useState(true);
  const [valuePurpose, setValuePurpose] = useState(null);
  const [manyTalent, setManyTalent] = useState(null);
  const [urgently, setUrgently] = useState(null);
  const [timeUsed, setTimeUsed] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  const [details, setDetails] = useState(null);
  const [indexEdit, setIndexEdit] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [deleteHardwareValue, setDeleteHardwareValue] = useState(null);
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueDateTemp, onChangeDateTemp] = useState(null);
  const [valueMeetingTime, setValueMeetingTime] = useState(null);
  const [labelMeetingTime, setLabelMeetingTime] = useState(null);
  const dataGetProduct = [
    {
      id: 1,
      name: "Bank Machinery",
      selected: true,
      image: "/image/hardware/banking.png",
      image_selected: "/image/hardware/banking_selected.png",
    },
    {
      id: 2,
      name: "Workstation",
      selected: false,
      image: "/image/hardware/station.png",
      image_selected: "/image/hardware/banking_selected.png",
    },
    {
      id: 3,
      name: "Server & Hosting",
      selected: false,
      image: "/image/hardware/server.png",
      image_selected: "/image/hardware/server_selected.png",
    },
    {
      id: 4,
      name: "UPS",
      selected: false,
      image: "/image/hardware/UPS.png",
      image_selected: "/image/hardware/ups_selected.png",
    },
    {
      id: 5,
      name: "Others",
      selected: false,
      image: "/image/hardware/others_notselected.png",
      image_selected: "/image/hardware/others_selected.png",
    },
  ];

  const [dataProduct, setDataProduct] = useState(dataGetProduct);
  const [kindOfHardware, setKindOfHardware] = useState(null);
  const [hardwareSuggestion, setHardwareSuggestion] = useState([]);
  const onChangeValuePurpose = (e) => {
    console.log("radio checked", e.target.value);
    setValuePurpose(e.target.value);
  };
  const [product, setProduct] = useState(null);
  const [productSelected, setProductSelected] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [showThankForm, setShowThankForm] = useState(false);
  const captchaRef = useRef(null);
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

  const deleteProduct = (index) => {
    let arr_product = productSelected;
    arr_product.splice(index, 1);
    setProductSelected([...arr_product]);
  };
  const submitFormSoftware = () => {
    if (captchaRef.current.getValue() != "") {
      console.log("tidak kosong");
      notification.success({
        message: "Submit Form Solution hardware Success!",
        duration: 3,
      });
      setShowThankForm(true);
    }
  };
  const onPanelChange = (value) => {
    console.log("helo calendar ", value);
    onChangeDateTemp(value);
    onChangeDate(value);
  };
  const onChangeValueMeetingTime = (value, label) => {
    if (value == valueMeetingTime) {
      setValueMeetingTime(null);
    } else {
      setValueMeetingTime(value);
      setLabelMeetingTime(label);
    }
  };
  const handleSubmitHardware = () => {
    setModalSubmit(true);
  };

  const handleKindOfHardware = (value) => {
    setKindOfHardware(value);
    let arr = [];
    if (value == "Bank Machinery") {
      arr.push("ATM");
      arr.push("Money Counter");
    } else if (value == "Workstation") {
      arr.push("Laptop");
      arr.push("PC ? Dekstop");
    } else if (value == "Server") {
      arr.push("Server Ultraboost");
      arr.push("Server Boost");
    } else if (value == "UPS") {
      arr.push("UPS 1.2Ghz");
      arr.push("UPS 3.0Ghz");
    } else {
      arr.push("Smartphone");
      arr.push("Tablet");
    }
    console.log("array ", arr);
    setHardwareSuggestion(arr);
  };

  const handleSuggestionHardware = (skill) => {
    let arr_product = productSelected;
    arr_product.push(skill);
    setProductSelected([...arr_product]);
    // form.setFieldValue(form, "product", "");
  };

  const handleAddAnotherProduct = () => {
    if (statusEdit == true) {
      let array_hardwares = [];
      for (let i = 0; i < dataHardwareSummary.length; i++) {
        if (i == indexEdit) {
          array_hardwares.push({
            kindOfHardware: kindOfHardware,
            product: productSelected,
            manyTalent: manyTalent,
            urgently: urgently,
            timeUsed: timeUsed,
            maxBudget: maxBudget,
            details: details,
          });
        } else {
          array_hardwares.push({
            kindOfHardware: dataHardware[i].kindOfHardware,
            product: dataHardware[i].product,
            manyTalent: dataHardware[i].manyTalent,
            urgently: dataHardware[i].urgently,
            timeUsed: dataHardware[i].timeUsed,
            maxBudget: dataHardware[i].maxBudget,
            details: dataHardware[i].details,
          });
        }
      }
      setDataHardwareSummary([...array_hardwares]);
      setStatusEdit(false);
      notification.success({
        message: "Edit Hardware Product success!",
        duration: 3,
      });
    } else {
      let array_hardwares = dataHardwareSummary;
      array_hardwares.push({
        kindOfHardware: kindOfHardware,
        product: productSelected,
        manyTalent: manyTalent,
        urgently: urgently,
        timeUsed: timeUsed,
        maxBudget: maxBudget,
        details: details,
      });
      setDataHardwareSummary([...array_hardwares]);
      notification.success({
        message: "Add Hardware Product success!",
        duration: 3,
      });
    }
    handleClearForm();
  };

  const handleEdit = (index) => {
    setStatusEdit(true);
    setIndexEdit(index);
    setProductSelected(dataHardwareSummary[index].product);
    setKindOfHardware(dataHardwareSummary[index].kindOfHardware);
    setManyTalent(dataHardwareSummary[index].manyTalent);
    handleSetForm(index);
  };
  const handleSetForm = (index) => {
    form.setFieldsValue({
      time_need_product: dataHardwareSummary[index].urgently,
    });
    form.setFieldsValue({ time_used: dataHardwareSummary[index].timeUsed });
    // form.setFieldsValue({product: dataHardwareSummary[index].product });
    form.setFieldsValue({ max_budget: dataHardwareSummary[index].maxBudget });
    form.setFieldsValue({ manyproduct: dataHardwareSummary[index].manyTalent });
    form.setFieldsValue({ Details: dataHardwareSummary[index].details });
  };

  const handleClearForm = () => {
    form.setFieldsValue({ time_need_product: null });
    form.setFieldsValue({ time_used: null });
    form.setFieldsValue({ product: null });
    form.setFieldsValue({ max_budget: null });
    form.setFieldsValue({ manyproduct: null });
    form.setFieldsValue({ Details: null });
    setHardwareSuggestion([]);
    setProductSelected([]);
    setKindOfHardware(null);
  };
  const handleSubmitConfirm = () => {
    setFormActive("four");
    setModalSubmit(false);
  };
  const handleCancelSubmit = () => {
    setModalSubmit(false);
  };
  const handleCancelDelete = () => {
    setModalDelete(false);
  };

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

  const handleDeleteHardware = (value, index) => {
    console.log("index ke ", index);
    setIndexEdit(index);
    setDeleteHardwareValue(value);
    setModalDelete(true);
  };

  const handleDeleteConfirm = () => {
    let array_talents = dataHardwareSummary;
    array_talents.slice(indexEdit, 1);
    if (dataHardwareSummary.length == 1) {
      setDataHardwareSummary([]);
      setModalDelete(false);
    } else {
      setDataHardwareSummary([...array_talents]);
    }

    console.log("handle delete confirm ", array_talents);
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

  const sliderSettingsPhone2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  const handleLetsTalk = () => {
    if (email == null) {
    } else {
      setShowform(true);
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleHardwareType = (value, selected_value) => {
    const newArr = dataProduct.map((object) => {
      if (object.id === value) {
        // 👇️ change value of name property
        return { ...object, selected: !selected_value };
      }
      return object;
    });
    setDataProduct(newArr);
  };
  const handleInputProduct = (e) => {
    let arr_product = productSelected;
    arr_product.push(product);
    setProductSelected(arr_product);
    form.resetFields([product]);
  };
  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>Hardware</title>
      </Head>
      {showForm == false && (
        <section
          className={
            "section1advantages hidden md:block fixed w-full z-50 px-4 md:px-[112px]"
          }
          style={{ background: "#F4F4F4" }}
        >
          <div className={"block md:flex container mx-auto"}>
            <div className={"flex py-4"}>
              <Link href={{ pathname: "/hardware" }}>
                <p
                  className={"cursor-pointer flex-col gilroy-bold text-lg mr-4"}
                  style={{
                    borderBottom: "solid 2px #10B981",
                    paddingBottom: "2.5px",
                  }}
                >
                  Hardware
                </p>
              </Link>
              <Link href={{ pathname: "/software" }}>
                <p
                  className={
                    "cursor-pointer flex-col gilroy-medium text-lg mx-4"
                  }
                >
                  Software
                </p>
              </Link>
              <Link href={{ pathname: "/talents" }}>
                <p
                  className={
                    "cursor-pointer flex-col gilroy-medium text-lg mx-4"
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
                    onFinish={handleSubmit}
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
                        className={"gilroy-medium text-xl"}
                        label="Email"
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
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
                            setDataHardware({
                              ...dataHardware,
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
                <p className={"text-2xl text-blackmig font-semibold"}>
                  General Information
                </p>
                <p className={"pt-9"}>
                  What is your purpose in providing IT needs through Mitramas
                  Infosys Global?
                </p>
                <div className={"mt-4"}>
                  <Radio.Group
                    onChange={onChangeValuePurpose}
                    value={valuePurpose}
                    buttonStyle={"solid"}
                  >
                    <Space direction="vertical">
                      <Radio className="text-blackmig text-sm" value={1}>
                        I want to buy the product
                      </Radio>
                      <Radio className="text-blackmig text-sm" value={2}>
                        I want to lease the product and having hardware managed
                        services
                      </Radio>
                      <Radio className="text-blackmig text-sm" value={3}>
                        None of the above, I just want to know about the service
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
                <div className={"border border-dividermig w-full mt-9"} />
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("first")}
                  >
                    <p className={"text-base text-primarygreen"}>Back</p>
                  </button>
                  <button
                    onClick={() => handleForm("third")}
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
              </div>
            ) : formActive == "third" ? (
              // hardware information form

              <div className="w-[52%]">
                <Modal
                  open={modalDelete}
                  onCancel={handleCancelDelete}
                  width={392}
                  closeIcon={
                    <img
                      className={"w-[24px] mt-8 h-[24px]"}
                      src="/image/people/close.png"
                    />
                  }
                  footer={null}
                >
                  <div className={"text-center mx-auto"}>
                    <div className={"mt-9 grid justify-items-center"}>
                      <img
                        src="image/icon-warning.png"
                        className={"w-[72px] h-[72px]"}
                      />
                    </div>
                    <div className={"mt-8"}>
                      <p
                        className={
                          "font-gilroysemibold text-blackmig text-[32px]"
                        }
                      >
                        Delete
                      </p>
                      <p
                        className={
                          "mt-4 text-base text-blackmig gilroy-regular"
                        }
                      >
                        Are you sure you want to remove{" "}
                        <span className={"font-gilroysemibold"}>
                          {deleteHardwareValue}
                        </span>{" "}
                        ?
                      </p>
                    </div>
                    <button
                      className={
                        "mt-8 py-2 px-[112.5px] bg-primarygreen rounded"
                      }
                      onClick={handleDeleteConfirm}
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        Delete Item
                      </p>
                    </button>
                    <button
                      className={
                        "mt-4 py-2 bg-white border border-primarygreen rounded px-[129px]"
                      }
                      onClick={handleCancelDelete}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        Cancel
                      </p>
                    </button>
                  </div>
                </Modal>
                <Modal
                  open={modalSubmit}
                  onCancel={handleCancelSubmit}
                  width={392}
                  closeIcon={
                    <img
                      className={"w-[24px] mt-8 h-[24px]"}
                      src="/image/people/close.png"
                    />
                  }
                  footer={null}
                >
                  <div className={"text-center mx-auto"}>
                    <div className={"mt-9 grid justify-items-center"}>
                      <img
                        src="image/icon-warning.png"
                        className={"w-[72px] h-[72px]"}
                      />
                    </div>
                    <div className={"mt-8"}>
                      <p
                        className={
                          "font-gilroysemibold text-blackmig text-[32px]"
                        }
                      >
                        Submit Request
                      </p>
                      <div className={"mt-2 border border-dividermig px-8"} />
                      <p
                        className={
                          "mt-4 text-base text-blackmig gilroy-regular"
                        }
                      >
                        Are you sure you want to submit your request with only{" "}
                        <span className={"font-gilroysemibold"}>
                          {dataHardwareSummary.length}
                        </span>{" "}
                        item ?
                      </p>
                    </div>
                    <button
                      className={"mt-8 py-2 px-[60px] bg-primarygreen rounded"}
                      onClick={handleSubmitConfirm}
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        Yes, continue with {dataHardwareSummary.length} item
                      </p>
                    </button>
                    <button
                      className={
                        "mt-4 py-2 bg-white border border-primarygreen rounded px-[27.5px]"
                      }
                      onClick={handleCancelSubmit}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        No, I want to complete my request{" "}
                      </p>
                    </button>
                  </div>
                </Modal>
                <p className={"text-2xl text-blackmig font-semibold"}>
                  Hardware Information
                </p>
                <p className={"mt-9"}>
                  What kind of hardware are you looking for?
                </p>
                <Form
                  id="formhardware"
                  hidden={!feedback}
                  layout={"vertical"}
                  // onFinish={handleSubmit}
                  form={form}
                >
                  <p className={"text-primarygreen text-sm"}>
                    You can choose more than one
                  </p>
                  {/* choose product */}
                  <div className={"flex flex-row mt-4"}>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Bank Machinery")}
                    >
                      <div
                        className={
                          kindOfHardware == "Bank Machinery"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Bank Machinery" ? (
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
                              kindOfHardware == "Bank Machinery"
                                ? "image/hardware/banking_selected.png"
                                : "image/hardware/banking.png"
                            }
                            className={"w-[102px] h-[85px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-sm text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Bank Machinery"
                                ? "font-gilroysemibold"
                                : "gilroy-regular"
                            }
                          >
                            Bank Machinery
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Workstation")}
                    >
                      <div
                        className={
                          kindOfHardware == "Workstation"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Workstation" ? (
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
                              kindOfHardware == "Workstation"
                                ? "image/hardware/workstation_selected.png"
                                : "image/hardware/station.png"
                            }
                            className={"w-[98px] h-[91px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-sm text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Workstation"
                                ? "font-gilroysemibold"
                                : "gilroy-regular"
                            }
                          >
                            Workstation
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Server")}
                    >
                      <div
                        className={
                          kindOfHardware == "Server"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Server" ? (
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
                              kindOfHardware == "Server"
                                ? "image/hardware/server_selected.png"
                                : "image/hardware/server.png"
                            }
                            className={"w-[90px] h-[86px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-sm text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Server"
                                ? "font-gilroysemibold"
                                : "gilroy-regular"
                            }
                          >
                            Server & Hosting
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("UPS")}
                    >
                      <div
                        className={
                          kindOfHardware == "UPS"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "UPS" ? (
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
                              kindOfHardware == "UPS"
                                ? "image/hardware/ups_selected.png"
                                : "image/hardware/UPS.png"
                            }
                            className={"w-[108px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-sm text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "UPS"
                                ? "font-gilroysemibold"
                                : "gilroy-regular"
                            }
                          >
                            UPS
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Others")}
                    >
                      <div
                        className={
                          kindOfHardware == "Others"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Others" ? (
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
                              kindOfHardware == "Others"
                                ? "image/hardware/others_selected.png"
                                : "image/hardware/others_notselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-sm text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Others"
                                ? "font-gilroysemibold"
                                : "gilroy-regular"
                            }
                          >
                            Others
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p className={"text-blackmig text-sm font-semibold"}>
                      1. Job Specification
                    </p>
                  </div>
                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="time_need_product"
                      className={"gilroy-medium text-xl"}
                      label="How soon do you need the product?"
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ border: "1px solid #B8B8B8" }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_need_product"
                        onChange={(value) => {
                          setUrgently(value);
                        }}
                        allowClear
                      >
                        <Option value="Within this week">
                          Within this week
                        </Option>
                        <Option value="Within this month">
                          Within this month
                        </Option>
                        <Option value="Next Month">Next Month</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="time_used"
                      className={"gilroy-medium text-xl"}
                      label="How long do you need the product?"
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ border: "1px solid #B8B8B8" }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_used"
                        onChange={(value) => {
                          setTimeUsed(value);
                        }}
                        allowClear
                      >
                        <Option value="6">{"< 6 Month Duration"}</Option>
                        <Option value="6 - 12">
                          {"6 - 12 Month Duration"}
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      name={"product"}
                      className={"gilroy-medium text-xl"}
                      label={
                        <p>
                          What product in{" "}
                          <span className={"font-semibold"}>Workstation</span>{" "}
                          do you need?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Input
                        value={product}
                        style={{ border: "1px solid #B8B8B8", height: "37px" }}
                        name={"product"}
                        onChange={(e) => {
                          setProduct(e.target.value);
                        }}
                        onPressEnter={handleInputProduct}
                        placeholder="Enter specific roles or skills"
                      />
                    </Form.Item>
                  </div>
                  {productSelected.length > 0 && (
                    <div className={"flex flex-row mt-3"}>
                      {productSelected.map((data, index) => (
                        <div
                          className={
                            "bg-transp45 rounded-[20px] py-1 pl-2 pr-1.5 flex flex-row mr-3"
                          }
                        >
                          <p className={"text-sm text-blackmig gilroy-regular"}>
                            {data}
                          </p>
                          <button
                            className={"bg-transparent ml-2"}
                            onClick={() => deleteProduct(index)}
                          >
                            <img
                              className={"w-5 h-5"}
                              src="/image/hardware/cancel.png"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={"mt-3"}>
                    <p className={"text-sm text-blackmig"}>
                      Popular products in Workstation
                    </p>
                    {hardwareSuggestion.length > 0 && (
                      <div className={"flex flex-row mt-3"}>
                        {hardwareSuggestion.map((data, index) => (
                          <button
                            onClick={() => handleSuggestionHardware(data)}
                            className={
                              " border bg-white border-transp45 rounded-[20px] py-1 px-2 flex flex-row mr-3 h-[29px]"
                            }
                          >
                            <p
                              className={"text-sm text-darkgrey gilroy-regular"}
                            >
                              {data}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p className={"text-blackmig text-sm font-semibold"}>
                      2. Additional Information
                    </p>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      label={
                        <p className={"text-sm"}>
                          {" "}
                          How many product in{" "}
                          <span className={"font-gilroysemibold text-blackmig"}>
                            Workstation{" "}
                          </span>
                          you need?
                        </p>
                      }
                      name={"manyproduct"}
                      rules={[{ required: true }]}
                    >
                      {/* <Form.Item name="input-number" noStyle> */}
                      <InputNumber
                        min={1}
                        name={"manyproduct"}
                        // max={10}
                        style={{
                          border: "1px solid #B8B8B8",
                          height: "37px",
                          width: "170px",
                        }}
                        onChange={(value) => {
                          setManyTalent(value);
                        }}
                      />
                      {/* </Form.Item> */}
                      <span className="ant-form-text" style={{ marginLeft: 8 }}>
                        pieces
                      </span>
                    </Form.Item>
                    <Form.Item
                      name={"max_budget"}
                      label={
                        <p className={"text-sm"}>
                          What is your maximum budget for your new product?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      {/* <Form.Item name="input-number" noStyle> */}
                      <InputNumber
                        name="max_budget"
                        min={1}
                        // max={10}
                        style={{
                          border: "1px solid #B8B8B8",
                          height: "37px",
                          width: "170px",
                        }}
                        onChange={(value) => {
                          setMaxBudget(value);
                        }}
                      />
                      {/* </Form.Item> */}
                      <span className="ant-form-text" style={{ marginLeft: 8 }}>
                        / piece / month
                      </span>
                    </Form.Item>
                    <Form.Item
                      name={"Details"}
                      className={"gilroy-medium text-xl"}
                      label="Details (Optional)"
                      // rules={[{ required: true }]}
                    >
                      <TextArea
                        style={{ border: "1px solid #B8B8B8" }}
                        name={"Details"}
                        onChange={(value) => {
                          setDetails(value);
                        }}
                        rows={4}
                        placeholder="Tell us more about your talent details"
                      />
                    </Form.Item>
                    <Form.Item label="Dragger">
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
                      onClick={() => handleForm("second")}
                    >
                      <p className={"text-base text-primarygreen"}>Back</p>
                    </button>
                    <button
                      onClick={handleAddAnotherProduct}
                      className={
                        "text-white bg-white border-2 border-primarygreen w-[289px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                      }
                    >
                      <p
                        className={"text-base text-primarygreen font-semibold"}
                      >
                        I want to add another product
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "20px", height: "20px" }}
                        src="/image/plus.png"
                      />
                    </button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="w-[52%]">
                {console.log("form active ", formActive)}
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
                    sitekey={"6LdBDkkjAAAAAH9NtxIC8IhWeDbdbSfuKJUaR074"}
                  />
                </div>
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("third")}
                  >
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
            {formActive == "third" ? (
              dataHardwareSummary.length > 0 && (
                <div
                  className={"w-[400px] h-[100%] py-4 pl-4 pr-[17px] ml-5 "}
                  style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
                >
                  <p className={"Gilroy-Bold text-primarygreen text-base"}>
                    Hardware Request Summary
                  </p>
                  <div className={"mt-3 border border-dividermig"} />
                  {dataHardwareSummary.map((data, index) => (
                    <div className={"mt-4   hover:bg-greenTrans5 w-full"}>
                      <div className={"flex flex-row"}>
                        <button
                          className={"bg-transparent w-[90%] text-left"}
                          onClick={() => handleEdit(index)}
                        >
                          <div className={""}>
                            <p
                              className={
                                "text-blackmig font-gilroysemibold text-sm "
                              }
                            >
                              {data.kindOfHardware}
                            </p>
                            <p
                              className={"text-blackmig gilroy-regular text-sm"}
                            >
                              {data.timeUsed +
                                " month duration, " +
                                data.urgently +
                                " , " +
                                data.manyTalent +
                                " products"}
                            </p>
                            <div className={"flex"}>
                              <p
                                className={
                                  "text-blackmig text-xs font-gilroysemibold"
                                }
                              >
                                Hardware:
                                <span>
                                  {data.product.map((data, index) => {
                                    data + " , ";
                                  })}
                                </span>
                              </p>
                            </div>
                          </div>
                        </button>
                        <div className={"w-[10%] flex justify-end self-center"}>
                          <button
                            className={"bg-transparent"}
                            onClick={() =>
                              handleDeleteHardware(data.kindOfHardware, index)
                            }
                          >
                            <img src="image/trash.png" className={"w-6 h-6"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSubmitHardware}
                    className={
                      "mt-8 py-2 pl-4 bg-primarygreen pr-[9.3px] w-[176px] rounded"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"text-white text-base font-gilroysemibold"}>
                        Submit Request
                      </p>
                      <div
                        className={
                          "w-[22px] h-[22px] bg-white rounded-[100px] items-center self-center"
                        }
                      >
                        <p
                          className={
                            "text-primarygreen text-base font-semibold"
                          }
                        >
                          {dataHardwareSummary.length}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )
            ) : (
              <div className={"w-[46%] self-center"}>
                <img
                  className={"w-full h-auto"}
                  src="/image/landingpage/Talents-2.png"
                />
              </div>
            )}
          </section>
        </div>
      ) : showForm && showThankForm == true ? (
        <div className="grid justify-items-center">
          <ThankForm type_form={"Hardware"} />
        </div>
      ) : (
        <div className={"sectionhardware noform"}>
          <section className={"section2hardware py-4 md:py-16 mx-auto"}>
            <div
              className={
                "hidden md:flex w-[1216px] mt-16 justify-between mx-auto"
              }
            >
              <div className={"flex-col w-[495px]"}>
                <p className={"text-3xl pb-4 gilroy-bold"}>
                  Nation-wide managed service model for your IT hardwares
                </p>
                <p className={"mt:4 md:mt-8 gilroy-regular text-base"}>
                  Rapid pace of change, uncertainty on scalability, and heavy
                  capital requirements might break your focus from executing
                  your core business.
                </p>
                <div className={"mt-10"}>
                  <p className={"gilroy-bold text-primarygreen text-base"}>
                    Reach us to get more information
                  </p>
                  <div className={"flex flex-row items-center mt-1"}>
                    <Input
                      name={"email"}
                      className={"w-[253px] h-[40px]"}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter your email here."
                    />
                    <button
                      onClick={handleLetsTalk}
                      className={
                        "text-base text-center rounded ml-4 md:w-[131px] py-1 md:py-2 pl-2 pr-1 md:pl-4 md:pr-3 text-white border-2 bg-primarygreen border-primarygreen"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"gilroy-semibold font-semibold"}>
                          Let's talk!
                        </p>
                        <img
                          className={"w-[20px] h-[20px] self-center"}
                          src="/image/landingpage/arrow-circle-right.png"
                        />
                      </div>
                    </button>
                  </div>
                  <div
                    className={
                      "mt-10 w-[495px] border rounded-lg p-2 bg-greentrans15"
                    }
                  >
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-[20px] h-[20px] mr-1"}
                        src="/image/landingpage/info.png"
                      />
                      <div>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          Let us help you to scale and manage your IT
                          infrastructure with :
                        </p>
                        <ul className={""}>
                          <li className={"mt-1"}>
                            <p
                              className={"text-sm text-blackmig gilroy-regular"}
                            >
                              {""}
                              <span className={"font-bold"}>
                                predictable
                              </span>{" "}
                              monthly cost
                            </p>
                          </li>
                          <li className={"mt-1"}>
                            <p
                              className={"text-sm text-blackmig gilroy-regular"}
                            >
                              {""}
                              <span className={"font-bold"}>
                                guaranteed
                              </span>{" "}
                              service level
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"flex-col w-[666px]"}>
                <img
                  src="/image/hardware/Hardware-Solution.png"
                  className={"w-full h-[375px]"}
                />
              </div>
            </div>
            <div className={"block md:hidden py-9 px-4"}>
              <div className={"px-3"}>
                <p
                  className={"text-blackmig text-xl text-center font-semibold"}
                >
                  Nation-wide managed service model for your IT hardwares
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
                  Rapid pace of change, uncertainty on scalability, and heavy
                  capital requirements might break your focus from executing
                  your core business.
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
                      Let us help you to scale and manage your IT infrastructure
                      with :
                    </p>
                    <ul className={""}>
                      <li className={"mt-1"}>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-bold"}>predictable</span>{" "}
                          monthly cost
                        </p>
                      </li>
                      <li className={"mt-1"}>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-bold"}>guaranteed</span>{" "}
                          service level
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section jenis hardware */}
          <section
            className={
              "section2somehardwarebrowser bg-bgjoinmig py-4 md:py-12 px-4 md:px-[112px]"
            }
          >
            <div className={"container text-center mx-auto"}>
              <p
                className={
                  "text-xl md:text-[32px] px-8 md:px-0 gilroy-semibold font-semibold"
                }
              >
                Let’s see what{" "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  IT hardwares
                </span>{" "}
                we can offer
              </p>
              <div className={"hidden md:block"}>
                <div className={"flex flex-row mt-[42px] justify-center"}>
                  <div
                    className={
                      "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightblue rounded-lg p-3"
                    }
                  >
                    <p className={"text-xl gilroy-bold text-accentblue"}>
                      Banking Machinery
                    </p>
                    <p className={"text-xs font-semibold italic text-blackmig"}>
                      Help you to grow your financial business domestically
                    </p>
                    <div className={"self-center"}>
                      <button className={"bg-lightblue w-[133px]"}>
                        <div
                          className={"flex flex-row justify-between px-4 pb-3"}
                        >
                          <p
                            className={
                              "text-base text-accentblue font-semibold"
                            }
                          >
                            Get yours
                          </p>
                          <img
                            src="/image/hardware/arrow_forward_ios_blue.png"
                            className={"w-[20px] h-[20px] self-center"}
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className={"grid grid-cols-6 gap-[11px] ml-[11px]"}>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                  </div>
                </div>
                <div className={"flex flex-row mt-8 justify-center"}>
                  <div
                    className={
                      "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightgreen rounded-lg p-3"
                    }
                  >
                    <p className={"text-xl gilroy-bold text-primarygreen"}>
                      Workstation
                    </p>
                    <p className={"text-xs font-semibold italic text-blackmig"}>
                      Enhance the productivity of your people
                    </p>
                    <div className={"self-center"}>
                      <button className={"bg-lightgreen w-[133px]"}>
                        <div
                          className={"flex flex-row justify-between px-4 pb-3"}
                        >
                          <p
                            className={
                              "text-base text-primarygreen font-semibold"
                            }
                          >
                            Get yours
                          </p>
                          <img
                            src="/image/hardware/arrow_forward_ios_green.png"
                            className={"w-[20px] h-[20px] self-center"}
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className={"grid grid-cols-6 gap-[11px] ml-[11px]"}>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                  </div>
                </div>
                <div className={"flex flex-row mt-8 justify-center"}>
                  <div
                    className={
                      "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightgrey rounded-lg p-3"
                    }
                  >
                    <p className={"text-xl gilroy-bold text-accentpurple"}>
                      Server & Hosting
                    </p>
                    <p className={"text-xs font-semibold italic text-blackmig"}>
                      Enhance the productivity of your people
                    </p>
                    <div className={"self-center"}>
                      <button className={"bg-lightgrey w-[133px]"}>
                        <div
                          className={"flex flex-row justify-between px-4 pb-3"}
                        >
                          <p
                            className={
                              "text-base text-accentpurple font-semibold"
                            }
                          >
                            Get yours
                          </p>
                          <img
                            src="/image/hardware/arrow_forward_ios_purple.png"
                            className={"w-[20px] h-[20px] self-center"}
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className={"grid grid-cols-6 gap-[11px] ml-[11px]"}>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                  </div>
                </div>
                <div className={"flex flex-row mt-8 justify-center"}>
                  <div
                    className={
                      "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightpink rounded-lg p-3"
                    }
                  >
                    <p className={"text-xl gilroy-bold text-accentblue"}>UPS</p>
                    <p className={"text-xs font-semibold italic text-blackmig"}>
                      Prevent any damage of your devices from power loss
                    </p>
                    <div className={"self-center"}>
                      <button className={"bg-lightpink w-[133px]"}>
                        <div
                          className={"flex flex-row justify-between px-4 pb-3"}
                        >
                          <p
                            className={
                              "text-base text-accentpink font-semibold"
                            }
                          >
                            Get yours
                          </p>
                          <img
                            src="/image/hardware/arrow_forward_ios_pink.png"
                            className={"w-[20px] h-[20px] self-center"}
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className={"grid grid-cols-6 gap-[11px] ml-[11px]"}>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                    <div className="bg-white p-3 border border-divider rounded-lg w-full h-[146px] text-center">
                      <img
                        src="/image/hardware/laptop.png"
                        className={"w-[128px] h-[90px] self-center"}
                        alt=""
                      />
                      <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"block md:hidden"}>
                <div className={"mt-7 px-2"}>
                  <p
                    className={
                      "text-base text-left gilroy-semibold text-blackmig font-semibold"
                    }
                  >
                    Banking Machinery
                  </p>
                  <Slider {...sliderSettingsPhone2}>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                  </Slider>
                </div>
                <div className={"mt-7 px-2"}>
                  <p
                    className={
                      "text-base text-left gilroy-semibold text-blackmig font-semibold"
                    }
                  >
                    Workstation
                  </p>
                  <Slider {...sliderSettingsPhone2}>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                  </Slider>
                </div>
                <div className={"mt-7 px-2"}>
                  <p
                    className={
                      "text-base text-left gilroy-semibold text-blackmig font-semibold"
                    }
                  >
                    Server & Hosting
                  </p>
                  <Slider {...sliderSettingsPhone2}>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                    <div
                      className={
                        "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                      }
                    >
                      <img
                        className={"w-[110px] h-[77.79px]"}
                        src="/image/hardware/laptop.png"
                      />
                      <p className={"text-blackmig gilroy-bold text-xs"}>
                        Laptop
                      </p>
                    </div>
                  </Slider>
                </div>
              </div>
              <div
                className={
                  "mt-7 md:mt-[42px] text-left md:text-center md:mx-auto md:w-[646px]"
                }
              >
                <p
                  className={
                    "font-regular gilroy-regular text-sm px-2 md:px-0  md:text-base"
                  }
                >
                  <span className={"font-semibold"}>
                    Didn’t find what you were looking for?
                  </span>{" "}
                  Reach us to get your orders customized based on your IT needs
                </p>
              </div>
              <div className={"mt-1 md:mt-4 mx-auto"}>
                <Link href="/contactus">
                  <button
                    className={
                      "text-sm md:w-[209px] -mt-10 rounded text-primarygreen border-2 bg-white border-primarygreen px-4 py-2 md:px-2 mt-4"
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
          <section
            className={
              "section3hardwarebrowser bg-transp60 py-4 md:py-12 md:px-[130.4px]"
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
                  in taking care of your IT hardwares?
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
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5 className="ml-3.5 text-sm md:text-base font-semibold text-blackmig">
                      Reliable Partner
                    </h5>
                    <p className="text-left ml-3.5 text-base text-blackmig gilroy-regular">
                      We provide guaranteed level of IT operation services to
                      support your business
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5 className="ml-3.5 text-sm md:text-base font-semibold text-blackmig">
                      Increase Efficiency
                    </h5>
                    <p className="text-left ml-3.5 text-base text-blackmig gilroy-regular">
                      We transform a heavy capital IT hardware infrastructure,
                      that requires large upfront investment into managed
                      services model
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon3.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5 className="ml-3.5 text-sm md:text-base font-semibold text-blackmig">
                      Nationwide Performance
                    </h5>
                    <p className="text-left ml-3.5 text-base text-blackmig gilroy-regular">
                      We provide strong local knowledge and network to help your
                      business strive across Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section how it work */}
          <section
            className={
              "section4howitworkbrowser bg-white py-4 md:py-8 md:mb-10 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
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
                    src="/image/hardware/hardware-work-1.png"
                    style={{ width: "145px", height: "145px" }}
                  />
                  <p
                    className={
                      "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                    }
                  >
                    We find high quality hardware products
                  </p>
                  <p
                    className={
                      "text-base text-blackmig gilroy-regular text-center"
                    }
                  >
                    We have extensive network and partnerships with hardware
                    principles ready to be leveraged for your advantage
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
                  src="/image/hardware/hardware-work-2.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  className={
                    "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                  }
                >
                  Custom match with your needs
                </p>
                <p
                  className={
                    "text-base text-blackmig gilroy-regular text-center"
                  }
                >
                  We customize our procurement with your specification needs
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
                  src="/image/hardware/hardware-work-3.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  className={
                    "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                  }
                >
                  We conduct full operation and maintenance for your hardware
                </p>
                <p
                  className={
                    "text-base text-blackmig gilroy-regular text-center"
                  }
                >
                  We ensure guaranteed level of hardware performance throughout
                </p>
              </div>
            </div>
          </section>
          {/* section how it work mobile */}
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
                  We find high quality hardware products
                </p>
                <p className={"text-sm text-blackmig gilroy-regular"}>
                  We have extensive network and partnerships with hardware
                  principles ready to be leveraged for your advantage
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
                  Custom match with your needs
                </p>
                <p className={"text-sm text-blackmig gilroy-regular"}>
                  We customize our procurement with your specification needs
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
                  We conduct full operation and maintenance for your hardware
                </p>
                <p className={"text-sm text-blackmig gilroy-regular"}>
                  We ensure guaranteed level of hardware performance throughout
                </p>
              </div>
            </div>
          </section>
          {/* testimonial */}
          <section
            className={
              "section3landingpageadvantages hidden md:block bg-bgjoinmig py-8 md:pt-8 md:py-16 px-[30px] md:px-10"
            }
          >
            <p
              className={
                "text-xl md:text-3xl text-center gilroy-semibold font-semibold mb-[42px]"
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
            <div
              className={"center md:content-around block md:hidden"}
              style={{ maxWidth: 1000 }}
            >
              <Slider {...sliderSettingsPhone}>
                <div>
                  <Card
                    bordered
                    style={{
                      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className="">
                      <p className="text-sm text italic gilroy-semibold font-semibold">
                        "
                      </p>

                      <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                        I had a wonderful experience working with Mitramas
                        Infosys Global. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                        <br className="hidden xl:block"></br> optimize your cost
                        and productivity
                      </p>
                      <p className="text-sm text italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <div className="flex flex-col items-center">
                        <div className="flex justify-center mt-2">
                          <img
                            className="rounded-full mr-4"
                            src="/image/landingpage/testimonial-user.png"
                            style={{ height: "40px", width: "60px" }}
                            alt=""
                          />
                          <div className="self-center">
                            <p className="text-sm font-semibold Gilroy-semibold text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-sm font-semibold Gilroy-semibold text-darkgrey">
                              Talent Acquisition at Bukopin
                            </p>
                          </div>
                        </div>
                        <div className="self-start">
                          <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
                            <p className="text-sm text-primarygreen font-semibold ">
                              Industry :
                              <span
                                style={{
                                  fontWeight: "regular",
                                  marginLeft: "5px",
                                }}
                              >
                                Banking
                              </span>
                            </p>
                          </div>
                          <div className="bg-lightblue px-4 rounded-[20px] mt-2">
                            <p className="text-sm text-primarygreen font-semibold ">
                              Service:
                              <span
                                style={{
                                  fontWeight: "regular",
                                  marginLeft: "5px",
                                }}
                              >
                                Hardware, Talents
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div>
                  <Card
                    bordered
                    style={{
                      boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    }}
                  >
                    <div className="">
                      <p className="text-3xl text italic gilroy-semibold font-semibold">
                        "
                      </p>

                      <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                        I had a wonderful experience working with Mitramas
                        Infosys Global. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                        <br className="hidden xl:block"></br> optimize your cost
                        and productivity
                      </p>
                      <p className="text-sm text italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <div className="flex flex-col items-center">
                        <div className="flex justify-center mt-2">
                          <img
                            className="rounded-full mr-4"
                            src="/image/landingpage/testimonial-user.png"
                            style={{ height: "40px", width: "60px" }}
                            alt=""
                          />
                          <div className="self-center">
                            <p className="text-sm font-semibold Gilroy-semibold text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-sm font-semibold Gilroy-semibold text-darkgrey">
                              Talent Acquisition at Bukopin
                            </p>
                          </div>
                        </div>
                        <div className="self-start">
                          <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
                            <p className="text-sm text-primarygreen font-semibold ">
                              Industry :
                              <span
                                style={{
                                  fontWeight: "regular",
                                  marginLeft: "5px",
                                }}
                              >
                                Banking
                              </span>
                            </p>
                          </div>
                          <div className="bg-lightblue px-4 rounded-[20px] mt-2">
                            <p className="text-sm text-primarygreen font-semibold ">
                              Service:
                              <span
                                style={{
                                  fontWeight: "regular",
                                  marginLeft: "5px",
                                }}
                              >
                                Hardware, Talents
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Slider>
            </div>
            <div className={"flex flex-row"}>
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
            </div>
          </section>
          {/* testimonial mobile */}
          <section
            className={
              "sectiontestimonialmobile block md:hidden bg-bgjoinmig py-8 md:pt-8 md:py-16 px-[30px] md:px-10"
            }
          >
            <p
              className={
                "text-xl md:text-3xl text-center gilroy-semibold font-semibold md:py-0 mb-7 md:mb-10"
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
          {/* coverages */}
          <section
            className={
              "sectioncoverages hidden md:block bg-transp60 pt-8 pb-32 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
            }
          >
            <p
              className={
                "text-xl md:text-3xl text-blackmig text-center gilroy-semibold font-semibold py-8 md:py-0 mb-10"
              }
            >
              Coverages
            </p>
            <div
              className={
                "bg-white p-12 items-center w-[788px] h-[408px] mx-auto"
              }
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <ul className={"coverage-list"}>
                <li>
                  <p href="">Banda Aceh</p>
                </li>
                <li>
                  <p href="">Medan</p>
                </li>
                <li>
                  <p href="">Padang</p>
                </li>
                <li>
                  <p href="">Jambi</p>
                </li>
                <li>
                  <p href="">Pekanbaru</p>
                </li>
                <li>
                  <p href="">Batam</p>
                </li>
                <li>
                  <p href="">Tanjung pinang</p>
                </li>
                <li>
                  <p href="">Jakarta</p>
                </li>
                <li>
                  <p href="">Bekasi</p>
                </li>
                <li>
                  <p href="">Depok</p>
                </li>
                <li>
                  <p href="">Karawang</p>
                </li>
                <li>
                  <p href="">Cilegon</p>
                </li>
                <li>
                  <p href="">Sukabumi</p>
                </li>
                <li>
                  <p href="">Bandar lampung</p>
                </li>
                <li>
                  <p href="">Palembang</p>
                </li>
                <li>
                  <p href="">Bandung</p>
                </li>
                <li>
                  <p href="">Tasikmalaya</p>
                </li>
                <li>
                  <p href="">Cirebon</p>
                </li>
                <li>
                  <p href="">Semarang</p>
                </li>
                <li>
                  <p href="">Purwokerto</p>
                </li>
                <li>
                  <p href="">Tegal</p>
                </li>
                <li>
                  <p href="">Yogyakarta</p>
                </li>
                <li>
                  <p href="">Magelang</p>
                </li>
                <li>
                  <p href="">Solo</p>
                </li>
                <li>
                  <p href="">Surabaya</p>
                </li>
                <li>
                  <p href="">Madiun</p>
                </li>
                <li>
                  <p href="">Sidoarjo</p>
                </li>
                <li>
                  <p href="">Malang</p>
                </li>
                <li>
                  <p href="">Kediri</p>
                </li>
                <li>
                  <p href="">Bogor</p>
                </li>
                <li>
                  <p href="">Probolingo</p>
                </li>
                <li>
                  <p href="">Banyuwangi</p>
                </li>
                <li>
                  <p href="">Jember</p>
                </li>
                <li>
                  <p href="">Bali</p>
                </li>
                <li>
                  <p href="">Mataram</p>
                </li>
                <li>
                  <p href="">Kupang</p>
                </li>
                <li>
                  <p href="">Samarinda</p>
                </li>
                <li>
                  <p href="">Banjarmasin</p>
                </li>
                <li>
                  <p href="">Pontianak</p>
                </li>
                <li>
                  <p href="">Balikpapan</p>
                </li>
                <li>
                  <p href="">Makasar</p>
                </li>
                <li>
                  <p href="">Sorong</p>
                </li>
                <li>
                  <p href="">Palu</p>
                </li>
                <li>
                  <p href="">Manado</p>
                </li>
                <li>
                  <p href="">Pare-pare</p>
                </li>
              </ul>
            </div>
          </section>
          {/*coverages mobile */}
          <section
            className={
              "sectioncoveragesmobile block md:hidden bg-transp60 pt-4 px-4 py-[118px]"
            }
          >
            <p
              className={
                "text-xl text-blackmig text-center gilroy-semibold font-semibold"
              }
            >
              Coverages
            </p>
            <div
              className={"bg-white p-6 mt-4 mx-auto"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <ul className={"coverage-list"}>
                <li>
                  <p href="">Banda Aceh</p>
                </li>
                <li>
                  <p href="">Medan</p>
                </li>
                <li>
                  <p href="">Padang</p>
                </li>
                <li>
                  <p href="">Jambi</p>
                </li>
                <li>
                  <p href="">Pekanbaru</p>
                </li>
                <li>
                  <p href="">Batam</p>
                </li>
                <li>
                  <p href="">Tanjung pinang</p>
                </li>
                <li>
                  <p href="">Jakarta</p>
                </li>
                <li>
                  <p href="">Bekasi</p>
                </li>
                <li>
                  <p href="">Depok</p>
                </li>
                <li>
                  <p href="">Karawang</p>
                </li>
                <li>
                  <p href="">Cilegon</p>
                </li>
                <li>
                  <p href="">Sukabumi</p>
                </li>
                <li>
                  <p href="">Bandar lampung</p>
                </li>
                <li>
                  <p href="">Palembang</p>
                </li>
                <li>
                  <p href="">Bandung</p>
                </li>
                <li>
                  <p href="">Tasikmalaya</p>
                </li>
                <li>
                  <p href="">Cirebon</p>
                </li>
                <li>
                  <p href="">Semarang</p>
                </li>
                <li>
                  <p href="">Purwokerto</p>
                </li>
                <li>
                  <p href="">Tegal</p>
                </li>
                <li>
                  <p href="">Yogyakarta</p>
                </li>
                <li>
                  <p href="">Magelang</p>
                </li>
                <li>
                  <p href="">Solo</p>
                </li>
                <li>
                  <p href="">Surabaya</p>
                </li>
                <li>
                  <p href="">Madiun</p>
                </li>
                <li>
                  <p href="">Sidoarjo</p>
                </li>
                <li>
                  <p href="">Malang</p>
                </li>
                <li>
                  <p href="">Kediri</p>
                </li>
                <li>
                  <p href="">Bogor</p>
                </li>
                <li>
                  <p href="">Probolingo</p>
                </li>
                <li>
                  <p href="">Banyuwangi</p>
                </li>
                <li>
                  <p href="">Jember</p>
                </li>
                <li>
                  <p href="">Bali</p>
                </li>
                <li>
                  <p href="">Mataram</p>
                </li>
                <li>
                  <p href="">Kupang</p>
                </li>
                <li>
                  <p href="">Samarinda</p>
                </li>
                <li>
                  <p href="">Banjarmasin</p>
                </li>
                <li>
                  <p href="">Pontianak</p>
                </li>
                <li>
                  <p href="">Balikpapan</p>
                </li>
                <li>
                  <p href="">Makasar</p>
                </li>
                <li>
                  <p href="">Sorong</p>
                </li>
                <li>
                  <p href="">Palu</p>
                </li>
                <li>
                  <p href="">Manado</p>
                </li>
                <li>
                  <p href="">Pare-pare</p>
                </li>
              </ul>
            </div>
          </section>
          <section
            className={
              "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-8"
            }
          >
            <div className={"justify-start self-end"}>
              <img
                style={{ width: "332px", height: "142px" }}
                src="/image/landingpage/footer-left.png"
              />
            </div>
            <div className={"container w-1/2 mx-auto"}>
              <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-32 py-4 px-8">
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
                      "text-sm w-[145px] -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
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
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
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
          <section
            className={
              "contactusphone md:relative block md:hidden md:flex bg-bgfooter pt-8"
            }
          >
            <div className={"container mx-auto"}>
              <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
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
                      "text-base text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"px-1"}>Contact Us</p>
                      <img
                        className={"py-1 px-1"}
                        style={{ width: "15px" }}
                        src="/image/landingpage/arrow-forward.png"
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

export default Hardware;
