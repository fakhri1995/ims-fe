import {
  CheckCircleTwoTone,
  CheckOutlined,
  CloseOutlined,
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
  notification,
} from "antd";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReCAPTCHA from "react-google-recaptcha";
import Slider from "react-slick";

import { objectToFormData } from "lib/helper";

import Layout from "../../../components/migwebsite/layout.js";
import ThankForm from "../../../components/migwebsite/thank-form.js";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Talents({}) {
  const { Panel } = Collapse;
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const handleSubmit = (value) => {
    console.log("set form active ", value);
    setFormActive(value);
  };
  const handleSubmitThird = () => {
    setFormActive("four");
  };

  const [dataPeople, setDataPeople] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "talents",
    message: null,
    // level_employee: null,
    // many_talent: null,
    // maximum_budget:null,
    // details:null,
    // urgently:null,
    // time_used:null,
    // open_remote:null,
  });
  const [dateNow, setDateNow] = useState(new Date());
  const [modalTalents, setModalTalents] = useState(false);
  const [modalTalentsData, setModalTalentsData] = useState(false);
  const [modalTalentsProduct, setModalTalentsProduct] = useState(false);
  const [modalTalentsDesign, setModalTalentsDesign] = useState(false);
  const [modalTalentsMobile, setModalTalentsMobile] = useState(false);
  const [modalTalentsDataMobile, setModalTalentsDataMobile] = useState(false);
  const [modalTalentsProductMobile, setModalTalentsProductMobile] =
    useState(false);
  const [modalTalentsDesignMobile, setModalTalentsDesignMobile] =
    useState(false);
  const [dataEngineering, setDataEngineering] = useState(null);
  // const [feedback, setFeedback] = useState(true);
  const [heightt, setHeightt] = useState("");
  const [showForm, setShowform] = useState(false);
  const [showThankForm, setShowThankForm] = useState(false);
  const [formActive, setFormActive] = useState("first");
  const [feedback, setFeedback] = useState(true);
  const [valuePurpose, setValuePurpose] = useState(null);
  const [valueKindProject, setValueKindProject] = useState(null);
  const [valueMeetingTime, setValueMeetingTime] = useState(null);
  const [labelMeetingTime, setLabelMeetingTime] = useState(null);
  const dataTypeProject = [
    "< 10",
    "11 - 50",
    "51 - 200",
    "201 - 1000",
    "1001 - 5000",
    "> 5000",
  ];
  const [skillSuggestion, setSkillSuggestion] = useState([]);
  const dataKindProject = [
    "New idea or project",
    "Existing project that needs more resources",
    "On going assistance or consultation",
    "None of the above, I just want to know about the service",
  ];
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueDateTemp, onChangeDateTemp] = useState(null);
  const [kindOfTalent, setKindOfTalent] = useState(null);
  const captchaRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [productSelected, setProductSelected] = useState([]);
  const [levelEmployee, setLevelEmployee] = useState(null);
  const [manyTalent, setManyTalent] = useState(null);
  const [urgently, setUrgently] = useState(null);
  const [timeUsed, setTimeUsed] = useState(null);
  const [openRemote, setOpenRemote] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  const [details, setDetails] = useState(null);
  const [dataTalents, setDataTalents] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [deleteTalentValue, setDeleteTalentValue] = useState(null);
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
      setDataTalents({
        ...dataTalents,
        company_email: dataForm.company_email,
        company_name: dataForm.company_name,
        contact_name: dataForm.name,
        phone_number: dataForm.phone_number,
      });
      setShowform(true);
      setFormActive("second");
      localStorage.removeItem("dataForm");
    }
    getDataTestimonial();
  }, []);

  const getDataTestimonial = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialTalentPage`, {
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

  const handleEdit = (index) => {
    console.log("handle edit ", index);
    setStatusEdit(true);
    setIndexEdit(index);
    setProductSelected(dataTalents[index].product);
    setKindOfTalent(dataTalents[index].kindOfTalent);
    setManyTalent(dataTalents[index].manyTalent);
    setUrgently(dataTalents[index].urgently);
    setOpenRemote(dataTalents[index].openRemote);
    handleSetForm(index);
  };

  const handleSetForm = (index) => {
    console.log("data talents ", dataTalents[index]);
    form.setFieldsValue({ urgently_need: dataTalents[index].urgently });
    form.setFieldsValue({ level_employee: dataTalents[index].levelEmployee });
    form.setFieldsValue({ time_used: dataTalents[index].timeUsed });
    // form.setFieldsValue({product: dataHardwareSummary[index].product });
    form.setFieldsValue({ max_budget: dataTalents[index].maxBudget });
    form.setFieldsValue({ many_talent: dataTalents[index].manyTalent });
    form.setFieldsValue({ Details: dataTalents[index].details });
    form.setFieldsValue({ open_remote: dataTalents[index].openRemote });
  };
  const onChangeValuePurpose = (e) => {
    console.log("radio checked", e.target.value);
    setValuePurpose(e.target.value);
  };
  const onChangeValueKindProject = (e) => {
    console.log("radio checked", e.target.value);
    setValueKindProject(e.target.value);
  };
  const handleForm = (value) => {
    setFormActive(value);
  };
  const showModal = () => {
    setModalTalents(true);
  };

  const handleCancel = () => {
    setModalTalents(false);
    setShowform(true);
  };
  const handleCancelDelete = () => {
    setModalDelete(false);
  };
  const showModalData = () => {
    setModalTalentsData(true);
  };

  const handleCancelData = () => {
    setModalTalentsData(false);
  };
  const showModalProduct = () => {
    setModalTalentsProduct(true);
  };

  const handleCancelProduct = () => {
    setModalTalentsProduct(false);
  };
  const showModalDesign = () => {
    setModalTalentsDesign(true);
  };

  const handleCancelDesign = () => {
    setModalTalentsDesign(false);
  };

  {
    /*modal mobile */
  }
  const showModalMobile = () => {
    setModalTalentsMobile(true);
  };

  const handleCancelMobile = () => {
    setModalTalentsMobile(false);
  };
  const showModalDataMobile = () => {
    setModalTalentsDataMobile(true);
  };

  const handleCancelDataMobile = () => {
    setModalTalentsData(false);
  };
  const showModalProductMobile = () => {
    setModalTalentsProductMobile(true);
  };

  const handleCancelProductMobile = () => {
    setModalTalentsProductMobile(false);
  };
  const showModalDesignMobile = () => {
    setModalTalentsDesignMobile(true);
  };

  const handleCancelDesignMobile = () => {
    setModalTalentsDesignMobile(false);
  };

  const handleHireNow = () => {
    if (dataPeople.company_email == null) {
      setShowEmailError(true);
      setEmailError("you must filled email first");
    } else if (
      dataPeople.company_email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setShowEmailError(false);
      setShowform(true);
    } else {
      setShowEmailError(false);
      setShowform(true);
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
  const handleInputProduct = (e) => {
    let arr_product = productSelected;
    arr_product.push(product);
    setProductSelected(arr_product);
    console.log("selected ", formActive);
    setProduct(null);
    form.setFieldsValue({ product: null });
  };

  const deleteProduct = (index) => {
    let arr_product = productSelected;
    arr_product.splice(index, 1);
    setProductSelected([...arr_product]);
  };

  const handleSuggestionSkill = (skill) => {
    console.log("handle suggestion skill ", skill);
    let arr_product = productSelected;
    arr_product.push(skill);
    setProductSelected([...arr_product]);
    // form.setFieldValue(form, "product", "");
  };

  const submitFormSoftware = () => {
    if (captchaRef.current.getValue() != "") {
      let dataTalentPost = {
        company_name: dataPeople.company_name,
        contact_name: dataPeople.name,
        company_email: dataPeople.company_email,
        phone_number: dataPeople.phone_number,
        many_people: valuePurpose,
        kind_form: "talent",
        meeting_schedule:
          moment(valueDate).format("YYYY-MM-DD") + " " + valueMeetingTime,
        talent_list: dataTalents,
      };
      // let formData = objectToFormData(dataTalentPost);
      console.log("talent post ", dataTalentPost);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addFormSolutionTalent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTalentPost),
      })
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            form.resetFields();
            setFeedback(false);
            notification.success({
              message: "Submit Form Solution Talent Success!",
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

  const handleAddAnotherProduct = () => {
    console.log("edit status ", statusEdit);
    console.log("edit status manyTalent", manyTalent);

    if (statusEdit == true) {
      let array_talents = [];
      for (let i = 0; i < dataTalents.length; i++) {
        if (i == indexEdit) {
          array_talents.push({
            kindOfTalent: kindOfTalent,
            product: productSelected,
            levelEmployee: levelEmployee,
            manyTalent: manyTalent,
            urgently: urgently,
            timeUsed: timeUsed,
            openRemote: openRemote,
            maxBudget: maxBudget,
            details: details,
          });
        } else {
          array_talents.push({
            kindOfTalent: dataTalents[i].kindOfTalent,
            product: dataTalents[i].productSelected,
            levelEmployee: dataTalents[i].levelEmployee,
            manyTalent: dataTalents[i].manyTalent,
            urgently: dataTalents[i].urgently,
            timeUsed: dataTalents[i].timeUsed,
            openRemote: dataTalents[i].openRemote,
            maxBudget: dataTalents[i].maxBudget,
            details: dataTalents[i].details,
          });
        }
      }
      setDataTalents([...array_talents]);
      setStatusEdit(false);
      notification.success({
        message: "Edit Talent success!",
        duration: 3,
      });
    } else {
      let array_talents = dataTalents;
      array_talents.push({
        kindOfTalent: kindOfTalent,
        product: productSelected,
        levelEmployee: levelEmployee,
        manyTalent: manyTalent,
        urgently: urgently,
        timeUsed: timeUsed,
        openRemote: openRemote,
        maxBudget: maxBudget,
        details: details,
      });

      setDataTalents([...array_talents]);
      notification.success({
        message: "Add Talent success!",
        duration: 3,
      });
    }
    console.log("array talents ", openRemote);
    clearForm();
  };

  const clearForm = () => {
    setKindOfTalent(null);
    setSkillSuggestion([]);
    form.resetFields(["level_employee"]);
    form.resetFields(["many_talent"]);
    form.resetFields(["time_used"]);
    form.resetFields(["open_remote"]);
    form.resetFields(["urgently_need"]);
    form.resetFields(["max_budget"]);
    form.resetFields(["Details"]);
    setProductSelected([]);
  };

  const handleKindOfTalent = (value) => {
    setKindOfTalent(value);
    let arr = [];
    if (value == "Engineering") {
      arr.push("Web Development");
      arr.push("Mobile Development");
    } else if (value == "Data") {
      arr.push("Phyton");
      arr.push("MySQL");
    } else if (value == "Design") {
      arr.push("Figma");
      arr.push("Adobe XD");
    } else if (value == "Product") {
      arr.push("Github");
      arr.push("Manage Project");
    } else {
      arr.push("Robotica");
      arr.push("Line Tracer");
    }
    console.log("array ", arr);
    setSkillSuggestion(arr);
  };

  const handleDeleteTalents = (value, index) => {
    console.log("index ke ", index);
    setIndexEdit(index);
    setDeleteTalentValue(value);
    setModalDelete(true);
  };

  const handleDeleteConfirm = () => {
    if (dataTalents.length == 1) {
      setDataTalents([]);
      setModalDelete(false);
    } else {
      let array_talents = dataTalents;
      array_talents.splice(indexEdit, 1);
      setModalDelete(false);
      setDataTalents([...array_talents]);
    }

    console.log("handle delete confirm ", array_talents);
  };

  const handleSubmitTalents = () => {
    setModalSubmit(true);
  };

  const handleSubmitConfirm = () => {
    setFormActive("four");
    setModalSubmit(false);
  };
  const handleCancelSubmit = () => {
    setModalSubmit(false);
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
  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>{t.talentmetatitle}</title>
        <meta name="description" content={t.talentmetadescription} />
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
                  className={
                    "cursor-pointer flex-col text-lg font-gilroyregular mr-4"
                  }
                >
                  Hardware
                </p>
              </Link>
              <Link href={{ pathname: "/software" }}>
                <p
                  className={
                    "cursor-pointer flex-col text-lg font-gilroyregular mx-4"
                  }
                >
                  Software
                </p>
              </Link>
              <Link href={{ pathname: "/talents" }}>
                <p
                  className={
                    "cursor-pointer flex-col text-lg font-gilroybold mx-4"
                  }
                  style={{
                    borderBottom: "solid 2px #10B981",
                    paddingBottom: "2.5px",
                  }}
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
                <p className={"text-2xl text-primarygreen font-gilroysemibold"}>
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
                        className={"font-gilroyregular text-xl"}
                        label={<p style={{ fontSize: "16px" }}>Company Name</p>}
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                          }}
                          name={"Company Name"}
                          onChange={(e) => {
                            setDataPeople({
                              ...dataPeople,
                              company_name: e.target.value,
                            });
                          }}
                          placeholder="Enter company name here"
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={dataPeople.company_email}
                        name={"Email"}
                        className={"font-gilroyregular text-xl"}
                        label={<p style={{ fontSize: "16px" }}>Email</p>}
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
                          value={"oke"}
                          style={{ border: "1px solid #B8B8B8" }}
                          name={"Email"}
                          onChange={(e) => {
                            setDataPeople({
                              ...dataPeople,
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
                        className={"font-gilroyregular text-xl"}
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
                            setDataPeople({
                              ...dataPeople,
                              name: e.target.value,
                            });
                          }}
                          placeholder="Enter your name here"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"Phone Number"}
                        className={"font-gilroyregular text-xl"}
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
                            setDataPeople({
                              ...dataPeople,
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
                    General Information
                  </p>
                  {/* <p className={"mt-9"}>* What type of project are you hiring us for?</p> */}
                  <div className={"mt-9"}>
                    <Form.Item
                      name={"type project"}
                      className={"font-gilroyregular text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          How many people are employed at your company?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Radio.Group
                        onChange={onChangeValuePurpose}
                        value={valuePurpose}
                        buttonStyle={"solid"}
                      >
                        <Space direction="vertical">
                          {dataTypeProject.map((name) => (
                            <Radio
                              className="text-blackmig text-base"
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
                    <Form.Item
                      name={"kind project"}
                      className={"font-gilroyregular text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          What kind of project are you hiring for?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Radio.Group
                        onChange={onChangeValueKindProject}
                        value={valueKindProject}
                        buttonStyle={"solid"}
                      >
                        <Space direction="vertical">
                          {dataKindProject.map((name) => (
                            <Radio
                              className="text-blackmig text-base"
                              value={name}
                            >
                              {name}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={() => handleForm("first")}
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
            ) : formActive == "third" ? (
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
                          "mt-4 text-[18px] text-blackmig font-gilroyregular"
                        }
                      >
                        Are you sure you want to remove talent{" "}
                        <span className={"font-gilroysemibold"}>
                          {deleteTalentValue}
                        </span>{" "}
                        ?
                      </p>
                    </div>
                    <button
                      className={"mt-8 py-2 px-[60px] bg-primarygreen rounded"}
                      onClick={handleDeleteConfirm}
                    >
                      <p
                        className={"text-[18px] text-white font-gilroysemibold"}
                      >
                        Yes, delete talent request
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
                          "text-[18px] text-primarygreen font-gilroysemibold"
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
                          "mt-4 text-[18px] text-blackmig font-gilroyregular"
                        }
                      >
                        Are you sure you want to submit your request with only{" "}
                        <span className={"font-gilroysemibold"}>
                          {dataTalents.length}
                        </span>{" "}
                        talent ?
                      </p>
                    </div>
                    <button
                      className={"mt-8 py-2 px-[60px] bg-primarygreen rounded"}
                      onClick={handleSubmitConfirm}
                    >
                      <p
                        className={"text-[18px] text-white font-gilroysemibold"}
                      >
                        Yes, continue with {dataTalents.length} talent
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
                          "text-[18px] text-primarygreen font-gilroysemibold"
                        }
                      >
                        No, I want to complete my request{" "}
                      </p>
                    </button>
                  </div>
                </Modal>
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-[30px] text-blackmig font-gilroysemibold"}
                >
                  Talent Information
                </p>
                <p className={"mt-9 text-base"}>
                  What kind of talent are you looking for?
                </p>
                <Form
                  id="formtalentdetail"
                  hidden={!feedback}
                  layout={"vertical"}
                  // onFinish={handleSubmitThird}
                  form={form}
                >
                  {/* choose product */}
                  <div className={"flex flex-row mt-4"}>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfTalent("Engineering")}
                    >
                      <div
                        className={
                          kindOfTalent == "Engineering"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfTalent == "Engineering" ? (
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
                              kindOfTalent == "Engineering"
                                ? "image/people/engineering-selected.png"
                                : "image/people/engineering-nonselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfTalent == "Engineering"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Engineering
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfTalent("Data")}
                    >
                      <div
                        className={
                          kindOfTalent == "Engineering"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfTalent == "Data" ? (
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
                              kindOfTalent == "Data"
                                ? "image/people/data-selected.png"
                                : "image/people/data-nonselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfTalent == "Data"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Data
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfTalent("Product")}
                    >
                      <div
                        className={
                          kindOfTalent == "Product"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfTalent == "Product" ? (
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
                              kindOfTalent == "Product"
                                ? "image/people/product-selected.png"
                                : "image/people/product-nonselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfTalent == "Product"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Product
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfTalent("Design")}
                    >
                      <div
                        className={
                          kindOfTalent == "Design"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfTalent == "Design" ? (
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
                              kindOfTalent == "Design"
                                ? "image/people/desain-selected.png"
                                : "image/people/desain-nonselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfTalent == "Design"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Design
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      className={"bg-white"}
                      onClick={() => handleKindOfTalent("Others")}
                    >
                      <div
                        className={
                          kindOfTalent == "Others"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfTalent == "Others" ? (
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
                              kindOfTalent == "Others"
                                ? "image/hardware/others_selected.png"
                                : "image/hardware/others_notselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfTalent == "Others"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
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
                    <p className={"text-blackmig text-sm font-gilroysemibold"}>
                      1. Job Specification
                    </p>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      // name={"product"}

                      className={"font-gilroyregular text-xl"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          What roles/skills would you like to see in your new
                          hire?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Input
                        value={product}
                        style={{
                          border: "1px solid #B8B8B8",
                          height: "37px",
                          fontSize: "16px",
                        }}
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
                    <div className={"flex flex-wrap"}>
                      {productSelected.map((data, index) => (
                        <div
                          className={
                            "bg-transp45 rounded-[20px]  mt-3 py-1 pl-2 pr-1.5 flex flex-row mr-3"
                          }
                        >
                          <p
                            className={
                              "text-base text-blackmig font-gilroyregular"
                            }
                          >
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
                  {kindOfTalent != null && (
                    <div className={"mt-4"}>
                      <p className={"text-base text-blackmig"}>
                        Popular roles or skills for{" "}
                        {kindOfTalent == "Engineering"
                          ? "Software Engineer"
                          : kindOfTalent == "Data"
                          ? "Data Engineer"
                          : kindOfTalent == "Design"
                          ? "Designer UI/UX"
                          : kindOfTalent == "Product"
                          ? "Product Manager"
                          : "Others"}
                      </p>
                    </div>
                  )}
                  {skillSuggestion.length > 0 && (
                    <div className={"flex flex-row mt-3"}>
                      {skillSuggestion.map((data, index) => (
                        <button
                          onClick={() => handleSuggestionSkill(data)}
                          className={
                            " border bg-white border-transp45 rounded-[20px] py-1 px-2 flex flex-row mr-3 h-[29px]"
                          }
                        >
                          <p
                            className={
                              "text-sm text-darkgrey font-gilroyregular"
                            }
                          >
                            {data}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                  {console.log("formactive ", formActive)}

                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="level_employee"
                      className={"font-gilroyregular text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          What level of employee you would like to see in your
                          new hire?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ border: "1px solid #B8B8B8" }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="level_employee"
                        onChange={(value) => {
                          setLevelEmployee(value);
                        }}
                        allowClear
                      >
                        <Option value="junior">Junior</Option>
                        <Option value="mid">Middle</Option>
                        <Option value="senior">Senior</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      // name={"product"}
                      name={"many_talent"}
                      className={"font-gilroyregular text-base"}
                      label={
                        <p className={"text-blackmig"}>
                          How many talent in{" "}
                          <span className={"font-gilroysemibold text-base"}>
                            {kindOfTalent}
                          </span>{" "}
                          you want to hire??
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        // value={manyTalent}
                        style={{
                          // border: "1px solid #B8B8B8",

                          width: "170px",
                        }}
                        name={"many_talent"}
                        onChange={(e) => {
                          setManyTalent(e);
                        }}
                        // onPressEnter={handleInputProduct}
                        placeholder="How many?"
                      />
                    </Form.Item>
                  </div>
                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p
                      className={"text-blackmig text-base font-gilroysemibold"}
                    >
                      2. Additional Information
                    </p>
                  </div>
                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="urgently_need"
                      className={"font-gilroyregular text-base"}
                      label={
                        <p
                          style={{ fontSize: "16px" }}
                          className={"text-base font-gilroyregular"}
                        >
                          How soon do you need the talent?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="urgently_need"
                        onChange={(value) => {
                          setUrgently(value);
                        }}
                        allowClear
                        placeholder={"When will you start using the product?"}
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
                      className={"font-gilroyregular text-base"}
                      label={
                        <p
                          style={{ fontSize: "16px" }}
                          className={"text-base font-gilroyregular"}
                        >
                          How long do you need the the talent?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_used"
                        onChange={(value) => {
                          setTimeUsed(value);
                        }}
                        allowClear
                        placeholder={"How long will the product used?"}
                      >
                        <Option value="6">{"< 6 Month Duration"}</Option>
                        <Option value="6 - 12">
                          {"6 - 12 Month Duration"}
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="open_remote"
                      className={"font-gilroyregular text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          Are you open in hiring our remote talent? (work from
                          home)
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="open_remote"
                        onChange={(value) => {
                          setOpenRemote(value);
                        }}
                        allowClear
                        placeholder={"Choose decision"}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      // name={"product"}
                      name={"max_budget"}
                      className={"font-gilroyregular text-base"}
                      label={
                        <p className={"text-blackmig text-base"}>
                          What is your maximum budget for your new hire?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        // value={manyTalent}
                        style={{
                          // border: "1px solid #B8B8B8",
                          fontSize: "16px",
                          height: "37px",
                          width: "170px",
                        }}
                        name={"max_budget"}
                        formatter={(value) =>
                          `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\Rp\s?|(,*)/g, "")}
                        onChange={(e) => {
                          setMaxBudget(e);
                        }}
                        // onPressEnter={handleInputProduct}
                        placeholder="How many?"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"Details"}
                      className={"font-gilroyregular text-base"}
                      label={
                        <p className={"text-blackmig text-base"}>
                          Details (Optional)
                        </p>
                      }

                      // rules={[{ required: true }]}
                    >
                      <TextArea
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        name={"Details"}
                        onChange={(value) => {
                          setDetails(value.target.value);
                        }}
                        rows={4}
                        placeholder="Tell us more about your talent details"
                      />
                    </Form.Item>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={() => handleForm("second")}
                    >
                      <p className={"text-[18px] text-primarygreen"}>Back</p>
                    </button>
                    <button
                      onClick={handleAddAnotherProduct}
                      className={
                        "text-white bg-white border-2 border-primarygreen w-[289px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                      }
                    >
                      <p
                        className={
                          "text-[18px] text-primarygreen font-gilroysemibold"
                        }
                      >
                        {statusEdit
                          ? "I want to Update Talent"
                          : "I want to request more talent"}
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
                    <p className={"mt-1 text-redmig text-base"}>
                      Please choose your date first on the calendar
                    </p>
                  ) : (
                    <div
                      className={"text-base text-blackmig font-gilroysemibold"}
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
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("third")}
                  >
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
            {formActive == "third" ? (
              <div>
                {dataTalents.length > 0 && (
                  <div
                    className={"w-[400px] py-4 pl-4 pr-[17px] ml-5 "}
                    style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
                  >
                    <p
                      className={"font-gilroybold text-primarygreen text-base"}
                    >
                      Talent Request Summary
                    </p>
                    <div className={"mt-3 border border-dividermig"} />
                    {dataTalents.map((data, index) => (
                      <div className={"mt-4   hover:bg-greenTrans5 w-full"}>
                        <div className={"flex flex-row"}>
                          <button
                            className={"bg-transparent text-left"}
                            onClick={() => handleEdit(index)}
                          >
                            <div className={"w-[90%]"}>
                              <p
                                className={
                                  "text-blackmig font-gilroysemibold text-sm "
                                }
                              >
                                {data.kindOfTalent}
                              </p>
                              <p
                                className={
                                  "text-blackmig font-gilroyregular text-sm"
                                }
                              >
                                {data.levelEmployee +
                                  " - level, " +
                                  data.manyTalent +
                                  " talent, " +
                                  data.urgently +
                                  ", " +
                                  data.timeUsed +
                                  " duration"}
                              </p>
                              <div className={"flex"}>
                                <p
                                  className={
                                    "text-blackmig text-xs font-gilroysemibold"
                                  }
                                >
                                  Roles/skills:
                                </p>
                                <div className="flex flex-row ml-2">
                                  {data.product.map(
                                    (data_product, index_product) => (
                                      <p className={"text-xs text-blackmig"}>
                                        {data_product}{" "}
                                        {index_product ==
                                        data.product.length - 1
                                          ? " "
                                          : ", "}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                          <div
                            className={"w-[10%] flex justify-end self-center"}
                          >
                            <button
                              className={"bg-transparent"}
                              onClick={() =>
                                handleDeleteTalents(data.kindOfTalent, index)
                              }
                            >
                              <img
                                src="image/trash.png"
                                className={"w-6 h-6"}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleSubmitTalents}
                      className={
                        "mt-8 py-2 pl-4 bg-primarygreen pr-[9.3px] rounded"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p
                          className={
                            "text-white text-[18px] font-gilroysemibold"
                          }
                        >
                          Submit Request
                        </p>
                        <div
                          className={
                            "w-[30px] h-[30px] ml-4 bg-white rounded-[100px] items-center self-center"
                          }
                        >
                          <p
                            className={
                              "text-primarygreen text-[18px] font-gilroysemibold"
                            }
                          >
                            {dataTalents.length}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )}
          </section>
        </div>
      ) : showForm && showThankForm == true ? (
        <div className="grid justify-items-center">
          <ThankForm type_form={"Talents"} />
        </div>
      ) : (
        <div>
          <section
            className={
              "section2talents py-4 md:py-12 md:px-[113.5px] px-4 mx-auto mt:4 md:mt-12"
            }
          >
            <div className={"hidden md:flex justify-between container mx-auto"}>
              <div className={"flex-col w-2/5"}>
                <h1
                  style={{ lineHeight: "120%" }}
                  className={"text-[36px] pb-4 font-gilroysemibold"}
                >
                  Enabling you to assemble the best team
                </h1>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-8 font-gilroyregular text-xl"}
                >
                  Large quantity of profiles coming in with widely different
                  qualities. Your turnover rate is high and you have to do it
                  all over again.
                </p>
                <div className={"mt-[40px]"}>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={"font-gilroybold text-primarygreen text-xl"}
                  >
                    Reach us to get more information
                  </p>
                  <div className={"flex flex-row items-center mt-1"}>
                    <Input
                      name={"email"}
                      style={{ fontSize: 16 }}
                      className={"w-1/2 h-[37px]"}
                      onChange={(e) => {
                        setDataPeople({
                          ...dataPeople,
                          company_email: e.target.value,
                        });
                      }}
                      placeholder="Enter your email here."
                    />
                    <button
                      onClick={handleHireNow}
                      className={
                        "text-[18px] text-center ml-4 rounded text-white border-2 bg-primarygreen border-primarygree py-2 pl-4 pr-3"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p
                          style={{ lineHeight: "120%" }}
                          className={"font-gilroysemibold"}
                        >
                          Hire now!
                        </p>
                        <img
                          className={"w-[20px] h-[20px] self-center ml-2.5"}
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
                      "w-full border rounded-lg shadow-lg py-2 pr-2 pl-3 bg-green15 mt-[40px]"
                    }
                  >
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-[20px] h-[20px]"}
                        src="/image/landingpage/info.png"
                      />
                      <div className={"ml-2.5"}>
                        <p
                          className={
                            "text-base text-blackmig font-gilroyregular"
                          }
                        >
                          Let us help you to scale and manage your IT
                          infrastructure with :
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
                                predictable
                              </span>{" "}
                              monthly cost
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
              <div className={"flex-col w-[55%]"}>
                <img
                  src="/image/landingpage/Talents-2.png"
                  className={"w-full h-[389px]"}
                ></img>
              </div>
            </div>
            {/*section 1 talents mobile */}
            <div className={"block md:hidden py-9 px-4"}>
              <div className={"px-3"}>
                <p
                  className={
                    "text-blackmig text-xl text-center font-gilroysemibold"
                  }
                >
                  Enabling you to assemble the best team
                </p>
                <img
                  src="/image/landingpage/Talents-2.png"
                  className={"w-[292px] h-[174px] mt-6"}
                ></img>
                <p
                  className={
                    "py-6 text-center text-base font-gilroyregular text-blackmig"
                  }
                >
                  Rapid pace of change, uncertainty on scalability, and heavy
                  capital requirements might break your focus from executing
                  your core business.
                </p>
              </div>
              <div>
                <p className={"font-gilroysemibold text-primarygreen text-sm"}>
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
                    className={"w-[20px] h-[20px] mt-[2.5px] mr-2.5"}
                    src="/image/landingpage/info.png"
                  />
                  <div>
                    <p className={"text-sm text-blackmig font-gilroyregular"}>
                      Let us streamline your process with :
                    </p>
                    <ul className={""}>
                      <li className={"mt-1"}>
                        <p
                          className={"text-sm text-blackmig font-gilroyregular"}
                        >
                          {""}
                          <span className={"font-bold"}>On-demand</span>{" "}
                          expertise
                        </p>
                      </li>
                      <li className={"mt-1"}>
                        <p
                          className={"text-sm text-blackmig font-gilroyregular"}
                        >
                          {""}
                          <span className={"font-bold"}>Flexibility</span> in
                          talent head counts and working period
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className={
              "section3talents bg-bgjoinmig py-9 md:py-12 px-4 md:px-[113.5px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl md:text-[36px] text-center font-gilroysemibold"
              }
            >
              Let’s see what{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                IT Talents
              </span>{" "}
              we can provide
            </h2>
            <div
              className={"mt-7 md:mt-12 md:flex md:flex-row md:justify-center"}
            >
              <div
                className={
                  "md:w-[600px] h-[151px] md:h-[176px] bg-white md:mr-[19px] rounded-lg p-4 pb-6"
                }
                style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
              >
                <div className={"flex flex-row"}>
                  <img
                    className={
                      "w-[56px] h-[56px] self-center md:self-start md:w-[100px] md:h-[100px]"
                    }
                    src="/image/people/engineering.png"
                  />
                  <div
                    className={
                      "ml-4 md:w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                    }
                  >
                    <div>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-accentblue font-gilroybold text-base md:text-2xl"
                        }
                      >
                        Engineering
                      </p>
                    </div>
                    <div className={"mt-2 md:mt-0"}>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={"text-base font-gilroyregular text-darkgrey"}
                      >
                        Typical Roles
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Website Developer, Android/IOS Developer, and more
                      </p>
                    </div>
                  </div>
                </div>
                <div className={"flex justify-end px-4 mt-4"}>
                  <button
                    onClick={showModal}
                    className={
                      "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[37px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen text-base font-gilroysemibold"
                      }
                    >
                      See more
                    </p>
                    <img
                      src="/image/hardware/arrow-circle-right.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </button>
                </div>
              </div>
              <div
                className={
                  "mt-7 md:mt-0 md:w-[600px] h-[151px] md:h-[176px] bg-white rounded-lg p-4 pb-6"
                }
                style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
              >
                <div className={"flex flex-row"}>
                  <img
                    className={
                      "w-[56px] h-[56px] self-center md:self-start md:w-[100px] md:h-[100px]"
                    }
                    src="/image/people/data.png"
                  />
                  <div
                    className={
                      "ml-4 w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                    }
                  >
                    <div>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-accentpink font-gilroybold text-base md:text-2xl"
                        }
                      >
                        Data
                      </p>
                    </div>
                    <div className={"mt-2 md:mt-0"}>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={"text-base font-gilroyregular text-darkgrey"}
                      >
                        Typical Roles
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Data Scientist, Data/Business Intelligence Analyst, and
                        more
                      </p>
                    </div>
                  </div>
                </div>
                <div className={"flex justify-end px-4 mt-4"}>
                  <button
                    onClick={showModalData}
                    className={
                      "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[37px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen text-base font-gilroysemibold"
                      }
                    >
                      See more
                    </p>
                    <img
                      src="/image/hardware/arrow-circle-right.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                "mt-7 md:mt-[42px] md:flex md:flex-row md:justify-center"
              }
            >
              <div
                className={
                  "md:w-[600px] h-[151px] md:h-[176px] bg-white md:mr-[19px] rounded-lg p-4 pb-6"
                }
                style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
              >
                <div className={"flex flex-row"}>
                  <img
                    className={
                      "w-[56px] h-[56px] self-center md:self-start md:w-[100px] md:h-[100px]"
                    }
                    src="/image/people/design.png"
                  />
                  <div
                    className={
                      "ml-4 md:w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                    }
                  >
                    <div>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-accentpurple font-gilroybold text-base md:text-2xl"
                        }
                      >
                        Design
                      </p>
                    </div>
                    <div className={""}>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={"text-base font-gilroyregular text-darkgrey"}
                      >
                        Typical Roles
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Product Designer, Web Designer, Graphic Designer, and
                        more
                      </p>
                    </div>
                  </div>
                </div>
                <div className={"flex justify-end px-4 mt-4"}>
                  <button
                    onClick={showModalDesign}
                    className={
                      "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[37px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen text-base font-gilroysemibold"
                      }
                    >
                      See more
                    </p>
                    <img
                      src="/image/hardware/arrow-circle-right.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </button>
                </div>
              </div>
              <div
                className={
                  "mt-7 md:mt-0 md:w-[600px] h-[151px]  md:h-[176px] bg-white rounded-lg p-4 pb-6"
                }
                style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
              >
                <div className={"flex flex-row"}>
                  <img
                    className={
                      "w-[56px] h-[56px] self-center md:self-start md:w-[100px] md:h-[100px]"
                    }
                    src="/image/people/product.png"
                  />
                  <div
                    className={
                      "ml-4 w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                    }
                  >
                    <div>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-primarygreen font-gilroybold text-lg md:text-2xl"
                        }
                      >
                        Product
                      </p>
                    </div>
                    <div className={"mt-2 md:mt-0"}>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={"text-base font-gilroyregular text-darkgrey"}
                      >
                        Typical Roles
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Product Manager, Product Analyst, Project Manager, and
                        more
                      </p>
                    </div>
                  </div>
                </div>
                <div className={"flex justify-end px-4 mt-4"}>
                  <button
                    onClick={showModalProduct}
                    className={
                      "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[37px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen text-base font-gilroysemibold"
                      }
                    >
                      See more
                    </p>
                    <img
                      src="/image/hardware/arrow-circle-right.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                "mt-7 md:mt-[42px] text-center md:mx-auto md:w-[646px]"
              }
            >
              <p
                style={{ lineHeight: "150%" }}
                className={
                  " font-gilroysemibold text-sm px-2 md:px-0  md:text-xl"
                }
              >
                Didn’t find what you were looking for?
              </p>
              <p
                style={{ lineHeight: "150%" }}
                className={
                  "font-regular font-gilroyregular text-sm px-2 md:px-0  md:text-xl"
                }
              >
                Reach us to get your orders customized based on your IT talent
                needs
              </p>
            </div>
            <div className={"mt-1 md:mt-4 flex justify-center"}>
              <Link href="/contactus">
                <button
                  className={
                    "text-sm md:w-[209px] -mt-10 rounded text-primarygreen border-2 bg-bgjoinmig border-primarygreen px-4 py-2 md:px-2 mt-4"
                  }
                >
                  <p className={"text-xl  font-gilroysemibold"}>
                    Contact our team
                  </p>
                </button>
              </Link>
            </div>
          </section>
          {/* modal talents */}
          <Modal
            open={modalTalents}
            onCancel={handleCancel}
            width={777}
            closeIcon={
              <img
                className={"w-[24px] mt-8 h-[24px]"}
                src="/image/people/close.png"
              />
            }
            footer={null}
          >
            <div className={"hidden md:flex  flex-row"}>
              <img
                className={"w-[63px] h-[63px]"}
                src="/image/people/engineering.png"
              />
              <div className={"ml-12  flex flex-col justify-between"}>
                <div>
                  <p className={"text-2xl font-gilroybold text-blackmig"}>
                    Engineering
                  </p>
                </div>
                <div className={"mt-3"}>
                  <p className={"text-sm text-darkgrey font-gilroysemibold"}>
                    Pilihan Masa Kontrak
                  </p>
                  <p className={"text-base font-gilroyregular text-blackmig"}>
                    1 minggu - 5 tahun
                  </p>
                </div>
              </div>
            </div>
            <div className={"md:hidden mx-auto"}>
              <p className={"text-center text-xl font-gilroybold"}>
                Engineering
              </p>
              <div className={"flex justify-center mt-4"}>
                <img
                  className={"w-[93px] h-[93px]"}
                  src="/image/people/engineering.png"
                />
              </div>
            </div>
            <div className={"text-darkgrey"}>
              <div className={"mt-8 md:hidden"}>
                <p className={"text-xs text-darkgrey font-gilroysemibold"}>
                  Pilihan Masa Kontrak
                </p>
                <p className={"text-sm font-gilroyregular text-blackmig"}>
                  1 minggu - 5 tahun
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"text-sm font-gilroysemibold"}>Typical Roles</p>
                <ul className={"text-base text-blackmig font-gilroyregular"}>
                  <li>Web Developer</li>
                  <li>Mobile App Developer</li>
                  <li>Quality Assurance Engineer, etc.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Skills</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Bachelor's degree in Computer Science, </li>
                  <li>
                    Knowledge of primary coding languages including C++, HTML5,
                    and JavaScript, PHP Java, Spring, Laravel,Tibco, etc.,{" "}
                  </li>
                  <li>Basic programming experience,</li>
                  <li>Knowledge of databases and operating systems, </li>
                  <li>
                    Ability to learn new software and technologies quickly,{" "}
                  </li>
                  <li>Detail-oriented.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  Typical Deliverables
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>
                    Integration of user-facing elements developed by front-end
                    developers,
                  </li>
                  <li>
                    Provide support in building efficient, testable, and
                    reusable software modules,{" "}
                  </li>
                  <li>
                    Provide assistance in solving performance problems and
                    architectural challenges,{" "}
                  </li>
                  <li>Integration of data storage solutions.</li>
                </ul>
              </div>
            </div>
            <div className={"hidden md:block"}>
              <div
                className={"mt-8 bg-bgjoinmig h-[72px] w-[777px] -mx-6 -mb-6"}
              >
                <div className={"flex flex-row justify-end mr-4"}>
                  <p
                    className={
                      "text-base text-mig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                    }
                  >
                    Interested with our talents?
                  </p>
                  <button
                    onClick={handleCancel}
                    className={
                      "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"text-base font-gilroysemibold"}>
                        Hire now
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className={"block md:hidden"}>
              <div
                className={"mt-8 bg-bgjoinmig h-[108px] w-[340px] -mx-5 -mb-6"}
              >
                <div className={"text-center"}>
                  <p
                    className={
                      "text-base text-mig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                    }
                  >
                    Interested with our talents?
                  </p>
                  <button
                    onClick={handleCancel}
                    className={
                      "text-base w-[237px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen mt-3 pl-4 pr-3"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p
                        className={"text-base font-gilroysemibold self-center"}
                      >
                        Contact our sales team
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          {/* modal data */}
          <Modal
            open={modalTalentsData}
            onCancel={handleCancelData}
            width={777}
            closeIcon={
              <img
                className={"w-[24px] mt-8 h-[24px]"}
                src="/image/people/close.png"
              />
            }
            footer={null}
          >
            <div className={"hidden md:flex  flex-row"}>
              <img
                className={"w-[63px] h-[63px]"}
                src="/image/people/data.png"
              />
              <div className={"ml-12 flex flex-col justify-between"}>
                <div>
                  <p className={" text-2xl font-gilroybold text-blackmig"}>
                    Data
                  </p>
                </div>
                <div className={"mt-3"}>
                  <p className={"text-xs text-darkgrey font-gilroysemibold"}>
                    Pilihan Masa Kontrak
                  </p>
                  <p className={"text-sm font-gilroyregular text-blackmig"}>
                    1 minggu - 5 tahun
                  </p>
                </div>
              </div>
            </div>
            <div className={"md:hidden mx-auto"}>
              <p className={"text-center text-xl font-gilroybold"}>Data</p>
              <div className={"flex justify-center mt-4"}>
                <img
                  className={"w-[93px] h-[93px]"}
                  src="/image/people/data.png"
                />
              </div>
            </div>
            <div classname={"text-darkgrey"}>
              <div className={"mt-8 md:hidden"}>
                <p className={"text-xs font-gilroysemibold"}>
                  Pilihan Masa Kontrak
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  1 minggu - 5 tahun
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Roles</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Data Analyst</li>
                  <li> Data Scientist</li>
                  <li>Business Intelligence Analyst, etc.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Skills</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>A high level of mathematical ability,</li>
                  <li>
                    Programming languages, such as SQL, Oracle and Python,{" "}
                  </li>
                  <li>The ability to analyze, model and interpret data, </li>
                  <li>Problem-solving skills, </li>
                  <li>A systematic and logical approach, </li>
                  <li>Written and verbal communication skills.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  Typical Deliverables
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Examines information using data analysis tools.</li>
                  <li>
                    Generate meaningful results that pulled from the raw data
                    and help make decisions by identifying various facts and
                    trends.
                  </li>
                  <li>
                    Typical duties includes removing corrupted data, performing
                    initial analysis to assess the quality of the data,
                    preparing reports based on analysis and presenting to
                    management.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                "mt-8 bg-bgjoinmig h-[72px] w-[777px] -mx-6 -mb-6 hidden md:block"
              }
            >
              <div className={"flex flex-row justify-end mr-4"}>
                <p
                  className={
                    "text-base text-blackmig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                  }
                >
                  Interested with our talents?
                </p>
                <button
                  onClick={handleCancelData}
                  className={
                    "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-base font-gilroysemibold"}>Hire now</p>
                    <img
                      className={"self-center"}
                      style={{ height: "15px", width: "8px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"block md:hidden"}>
              <div
                className={"mt-8 bg-bgjoinmig h-[108px] w-[340px] -mx-5 -mb-6"}
              >
                <div className={"text-center"}>
                  <p
                    className={
                      "text-base text-blackmig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                    }
                  >
                    Interested with our talents?
                  </p>
                  <button
                    onClick={handleCancelData}
                    className={
                      "text-base w-[237px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen mt-3 pl-4 pr-3"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p
                        className={"text-base font-gilroysemibold self-center"}
                      >
                        Contact our sales team
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          {/* modal product */}
          <Modal
            open={modalTalentsProduct}
            onCancel={handleCancelProduct}
            width={777}
            closeIcon={
              <img
                className={"w-[24px] mt-8 h-[24px]"}
                src="/image/people/close.png"
              />
            }
            footer={null}
          >
            <div className={"hidden md:flex  flex-row"}>
              <img
                className={"w-[63px] h-[63px]"}
                src="/image/people/product.png"
              />
              <div className={"ml-12  flex flex-col justify-between"}>
                <div>
                  <p className={"text-2xl font-gilroybold text-blackmig"}>
                    Product
                  </p>
                </div>
                <div>
                  <div className={"mt-3"}>
                    <p className={"text-xs text-darkgrey font-gilroysemibold"}>
                      Pilihan Masa Kontrak
                    </p>
                    <p className={"text-sm font-gilroyregular text-blackmig"}>
                      1 minggu - 5 tahun
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"md:hidden mx-auto"}>
              <p className={"text-center text-xl font-gilroybold"}>Product</p>
              <div className={"flex justify-center mt-4"}>
                <img
                  className={"w-[93px] h-[93px]"}
                  src="/image/people/product.png"
                />
              </div>
            </div>
            <div className={"text-darkgrey"}>
              <div className={"mt-8 md:hidden"}>
                <p className={"text-xs font-gilroysemibold"}>
                  Pilihan Masa Kontrak
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  1 minggu - 5 tahun
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Roles</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Product Manager</li>
                  <li>Product Analyst, etc.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Skills</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>
                    Proven experience with rapid prototyping tools and
                    techniques, such as story mapping, design sprints, and
                    product methodology.
                  </li>
                  <li>
                    Excellent analytical skills and strong intuitions of user
                    behaviors.{" "}
                  </li>
                  <li>Solid oral and written communications skills. </li>
                  <li>Strong business requirement analysis.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  Typical Deliverables
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>
                    Doing the research and analysis of the competitive
                    landscape, product metrics, and latest internet trends to
                    identify and fill product gaps and generate new ideas that
                    improve customer experience.
                  </li>
                  <li>
                    Scope and prioritize activities based on business and
                    customer impact.
                  </li>
                  <li>
                    Analyzing user requirements into specification and
                    architectural design for developers
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                "mt-8 bg-bgjoinmig h-[72px] w-[777px] -mx-6 -mb-6 hidden md:block"
              }
            >
              <div className={"flex flex-row justify-end mr-4"}>
                <p
                  className={
                    "text-base text-blackmig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                  }
                >
                  Interested with our talents?
                </p>
                <button
                  onClick={handleCancelProduct}
                  className={
                    "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-base font-gilroysemibold"}>Hire now</p>
                    <img
                      className={"self-center"}
                      style={{ height: "15px", width: "8px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"block md:hidden"}>
              <div
                className={"mt-8 bg-bgjoinmig h-[108px] w-[340px] -mx-5 -mb-6"}
              >
                <div className={"text-center"}>
                  <p
                    className={
                      "text-base text-blackmig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                    }
                  >
                    Interested with our talents?
                  </p>
                  <button
                    onClick={handleCancelProduct}
                    className={
                      "text-base w-[237px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen mt-3 pl-4 pr-3"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p
                        className={"text-base font-gilroysemibold self-center"}
                      >
                        Contact our sales team
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          {/* modal design*/}
          <Modal
            open={modalTalentsDesign}
            onCancel={handleCancelDesign}
            width={777}
            closeIcon={
              <img
                className={"w-[24px] mt-8 h-[24px]"}
                src="/image/people/close.png"
              />
            }
            footer={null}
          >
            <div className={"hidden md:flex  flex-row"}>
              <img
                className={"w-[63px] h-[63px]"}
                src="/image/people/design.png"
              />
              <div className={"ml-12  flex flex-col justify-between"}>
                <div>
                  <p className={"text-2xl font-gilroybold text-blackmig"}>
                    Design
                  </p>
                </div>
                <div className={"mt-3"}>
                  <p className={"text-xs text-darkgrey font-gilroysemibold"}>
                    Pilihan Masa Kontrak
                  </p>
                  <p className={"text-sm font-gilroyregular text-blackmig"}>
                    1 minggu - 5 tahun
                  </p>
                </div>
              </div>
            </div>
            <div className={"md:hidden mx-auto"}>
              <p className={"text-center text-xl font-gilroybold"}>Design</p>
              <div className={"flex justify-center mt-4"}>
                <img
                  className={"w-[93px] h-[93px]"}
                  src="/image/people/design.png"
                />
              </div>
            </div>
            <div className={"text-darkgrey"}>
              <div className={"mt-8 md:hidden"}>
                <p className={"text-xs font-gilroysemibold"}>
                  Pilihan Masa Kontrak
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  1 minggu - 5 tahun
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Roles</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Graphic Designer,</li>
                  <li>Product Designer,</li>
                  <li>UI/UX Designer, etc.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>Typical Skills</p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>
                    Proven experience with rapid prototyping tools and
                    techniques, such as story mapping, design sprints, and
                    product methodology.
                  </li>
                  <li>
                    Excellent analytical skills and strong intuitions of user
                    behaviors.{" "}
                  </li>
                  <li>Solid oral and written communications skills. </li>
                  <li>Strong business requirement analysis.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  Typical Deliverables
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>
                    Conceptualizing visuals based on client’s requirements
                  </li>
                  <li>
                    Ensure final graphics and layouts are visually appealing and
                    on-brand
                  </li>
                  <li>
                    Work with copywriters and creative director to produce final
                    design
                  </li>
                  <li>
                    Communicate design ideas and research findings to a range of
                    audiences and/or stakeholders
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                "mt-8 bg-bgjoinmig h-[72px] w-[777px] -mx-6 -mb-6 hidden md:block"
              }
            >
              <div className={"flex flex-row justify-end mr-4"}>
                <p
                  className={
                    "text-base text-blackmig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                  }
                >
                  Interested with our talents?
                </p>
                <button
                  onClick={handleCancelDesign}
                  className={
                    "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-base font-gilroysemibold"}>Hire now</p>
                    <img
                      className={"self-center"}
                      style={{ height: "15px", width: "8px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"block md:hidden"}>
              <div
                className={"mt-8 bg-bgjoinmig h-[108px] w-[340px] -mx-5 -mb-6"}
              >
                <div className={"text-center"}>
                  <p
                    className={
                      "text-base text-blackmig font-gilroysemibold px-4 py-2 md:px-4 mt-3.5"
                    }
                  >
                    Interested with our talents?
                  </p>
                  <button
                    onClick={handleCancelDesign}
                    className={
                      "text-base w-[237px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen mt-3 pl-4 pr-3"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p
                        className={"text-base font-gilroysemibold self-center"}
                      >
                        Contact our sales team
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          {/* modal delete */}

          {/*section why you should */}
          <section
            className={
              "section4talents hidden md:block bg-bgtalents py-4 md:py-12 px-4 sm:px-10 md:px-[113.5px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl md:text-[36px] text-center  font-gilroysemibold py-8 md:py-0"
              }
            >
              Why you should{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                trust us
              </span>{" "}
              in building your team?
            </h2>
            <p
              style={{ lineHeight: "150%" }}
              className={
                "text-center text-sm  md:text-xl text-black font-gilroyregular pt-6"
              }
            >
              With on-demand expertise and flexibility in talent head counts and
              working period,
            </p>
            <div
              className={
                "md:my-[40px] mx-auto h-[222px] w-[1142px] flex md:items-stretch"
              }
            >
              <img
                src="/image/landingpage/People.png"
                style={{ width: "374px", height: "222px" }}
              />
              <div className={"pl-[40px] self-center"}>
                <div className="flex flex-row items-center mt-5">
                  <img
                    src="/image/landingpage/career-icon1.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="px-5 text-sm md:text-xl font-gilroysemibold text-blackmig"
                    >
                      Customization Based on Your Needs
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left px-5 text-xl text-blackmig font-gilroyregular"
                    >
                      Numbers of talent and their working period can be tailored
                      as per required by project.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center mt-[20px]">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="px-5 text-sm md:text-xl font-gilroysemibold text-blackmig"
                    >
                      Full Flexibility
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left px-5 text-xl text-blackmig font-gilroyregular"
                    >
                      You have full flexibility to rotate and rematch to make
                      your quality criteria fullfiled.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={"mx-auto h-[222px] w-[1142px] flex md:items-stretch"}
            >
              <div className={"w-[603px] h-[188px] py-1"}>
                <div className={"flex md:flex-row"}>
                  <img
                    style={{ width: "42px", height: "42px" }}
                    src="/image/people/icon-talents1.png"
                  />
                  <div className={"ml-[14px] text-blackmig text-xl"}>
                    <p
                      style={{ lineHeight: "150%" }}
                      className={"font-gilroysemibold"}
                    >
                      Tight Candidate Selection
                    </p>
                    <p
                      style={{ lineHeight: "150%" }}
                      className={"font-gilroyregular"}
                    >
                      Only less than 10% of all candidates from various industry
                      backgrounds and top tier universities are selected as our
                      top talent.
                    </p>
                  </div>
                </div>
                <div className={"flex md:flex-row mt-[20px]"}>
                  <img
                    style={{ width: "42px", height: "42px" }}
                    src="/image/people/icon-talents2.png"
                  />
                  <div className={"ml-[14px] text-blackmig text-xl"}>
                    <p
                      style={{ lineHeight: "150%" }}
                      className={"font-gilroysemibold"}
                    >
                      Excellent Capability
                    </p>
                    <p
                      style={{ lineHeight: "150%" }}
                      className={"font-gilroyregular"}
                    >
                      Extensive test and interview process covering tech stacks,
                      coding algorithm, systems design, and soft skills are
                      given to ensure you having qualified talents.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"w-[525px] h-[222px]"}>
                <img
                  className={"w-full h-full"}
                  src="/image/people/icon-techstack.png"
                />
              </div>
            </div>
          </section>
          {/*section why you should mobile*/}
          <section className={"section3softwarebrowser bg-transp60 md:hidden"}>
            <div
              className={
                "flex md:flex-row md:justify-center py-9 md:py-0 px-4 md:px-0"
              }
            >
              <div className={"md:ml-10 md:py-[53px]"}>
                <div className="flex flex-col md:w-[662px]">
                  <h4 className="mb-2 text-xl text-center font-gilroysemibold text-blackmig">
                    Why you should{" "}
                    <span
                      style={{
                        borderBottom: "solid 3px #188E4D",
                        paddingBottom: "2.5px",
                      }}
                    >
                      trust us
                    </span>{" "}
                    in building your own “Avengers” ?
                  </h4>
                  <div className={"block md:hidden mx-auto my-[17px]"}>
                    <img
                      src="/image/landingpage/hero-hardware.png"
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
                      <h5 className="ml-3.5 text-sm md:text-base font-gilroysemibold text-blackmig">
                        Customization Based on Your Needs
                      </h5>
                      <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                        Numbers of talent and their working period can be
                        tailored as per required by project.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row mt-[17px]">
                    <img
                      src="/image/landingpage/career-icon2.png"
                      className="w-[42px] h-[42px]"
                    />
                    <div>
                      <h5 className="ml-3.5 text-sm md:text-base font-gilroysemibold text-blackmig">
                        Full Flexibility
                      </h5>
                      <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                        You have full flexibility to rotate and rematch to make
                        your quality criteria fullfiled.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row mt-5">
                    <img
                      src="/image/people/icon-talents1.png"
                      className="w-[42px] h-[42px]"
                    />
                    <div>
                      <h5 className="ml-3.5 text-sm md:text-base font-gilroysemibold text-blackmig">
                        Tight Candidate Selection
                      </h5>
                      <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                        Only less than 10% of all candidates applying to MIG are
                        selected as our top talent.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row mt-[17px]">
                    <img
                      src="/image/landingpage/career-icon3.png"
                      className="w-[42px] h-[42px]"
                    />
                    <div>
                      <h5 className="ml-3.5 text-sm md:text-base font-gilroysemibold text-blackmig">
                        Excellent Capability
                      </h5>
                      <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                        Extensive test and interview process covering tech
                        stacks, coding algorithm, systems design, and soft
                        skills are given to ensure you having qualified talents.
                      </p>
                    </div>
                  </div>
                  <div className={"mt-5"}>
                    <img
                      className={"w-full h-full"}
                      src="/image/people/icon-techstack.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className={
              "section5talents bg-white py-4 md:py-12 px-4 sm:px-10 md:px-[112px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl md:text-[36px] text-center  font-gilroysemibold py-8 md:py-0"
              }
            >
              Which{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                recruitment scheme
              </span>{" "}
              we provided?
            </h2>
            <div className={"hidden md:block"}>
              <div
                className={
                  "md:mt-[42px] md: w-[1216px]  flex md:flex-row justify-between mx-auto"
                }
              >
                <div
                  className={
                    "bg-greenTrans5 md:w-[598px]  py-[23.5px] px-4 flex md:flex-row"
                  }
                >
                  <img
                    className={"md:w-[117px] md:h-[136px]"}
                    src="/image/people/head-hunt.png"
                  />
                  <div className={"ml-6 "}>
                    <h3
                      style={{ lineHeight: "120%" }}
                      className={"text-primarygreen text-2xl font-gilroybold"}
                    >
                      Head-Hunt
                    </h3>
                    <ul
                      style={{ lineHeight: "150%" }}
                      className={
                        "text-blackmig text-xl font-gilroyregular mt-2"
                      }
                    >
                      <li>
                        Conduct end-to-end hiring process to provide dedicated
                        talents for your business
                      </li>
                      <li>
                        Rigorous process to obtain shortlisted high-quality
                        candidates{" "}
                      </li>
                      <li>
                        Connection to our extensive talent and recruiting
                        network
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={
                    "bg-greenTrans5 md:w-[598px] py-[23.5px] px-4 flex md:flex-row"
                  }
                >
                  <img
                    className={"md:w-[117px] md:h-[136px]"}
                    src="/image/people/it-staff.png"
                  />
                  <div className={"ml-6 "}>
                    <h3
                      style={{ lineHeight: "120%" }}
                      className={"text-primarygreen text-2xl font-gilroybold"}
                    >
                      IT Staff Augmentation
                    </h3>
                    <ul
                      style={{ lineHeight: "150%" }}
                      className={
                        "text-blackmig text-xl font-gilroyregular mt-2"
                      }
                    >
                      <li>
                        All-in service, where we provide talents, including
                        their compensation & benefit, device, and tax
                      </li>
                      <li>
                        Flexibility of talent headcount and working period{" "}
                      </li>
                      <li>Full access over assignments for talents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/*recruitmen provided mobileview */}
            <div
              className={"md:hidden mt-4 bg-white px-4 py-3 rounded-lg"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className={"flex flex-row"}>
                <img
                  className={"w-[64px] h-[84px] self-center"}
                  src="/image/people/head-hunt.png"
                />
                <div className={"ml-4"}>
                  <p
                    className={"text-primarygreen text-sm font-gilroysemibold"}
                  >
                    Head Hunt
                  </p>
                  <ul
                    style={{ lineHeight: "150%" }}
                    className={"text-blackmig text-xl font-gilroyregular"}
                  >
                    <li>
                      Conduct end-to-end hiring process to provide dedicated
                      talents for your business
                    </li>
                    <li>
                      Rigorous process to obtain shortlisted high-quality
                      candidates
                    </li>
                    <li>
                      Connection to our extensive talent and recruiting network
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={"md:hidden mt-4 bg-white px-4 py-3 mb-8 rounded-lg"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className={"flex flex-row"}>
                <img
                  className={"w-[64px] h-[84px] self-center"}
                  src="/image/people/it-staff.png"
                />
                <div className={"ml-4"}>
                  <p
                    className={"text-primarygreen text-sm font-gilroysemibold"}
                  >
                    IT Staff Augmentation
                  </p>
                  <ul className={"text-blackmig text-xs font-gilroyregular"}>
                    <li>
                      All-in service, where we provide talents, including their
                      compensation & benefit, device, and tax
                    </li>
                    <li>Flexibility of talent headcount and working period</li>
                    <li>Full access over assignments for talents</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={"mt-4 md:hidden"}>
              <p
                className={
                  "text-sm text-blackmig font-gilroysemibold text-center"
                }
              >
                How does our{" "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  Headhunt
                </span>{" "}
                service differ from our{" "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  Tech Staff Augmentation
                </span>{" "}
                service?
              </p>
            </div>
            <div className={"mt-[42px] hidden md:block"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  "text-[36px] text-blackmig font-gilroysemibold text-center"
                }
              >
                How does our{" "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  Headhunt
                </span>{" "}
                service differ from our{" "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  Tech Staff Augmentation
                </span>{" "}
                service?
              </h2>
            </div>
            <div className={"mt-4 hidden md:block flex justify-center"}>
              <div className={"flex flex-row"}>
                <div
                  className={"border border-dividermig  bg-white text-center"}
                >
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  ></p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig py-3 px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen font-gilroysemibold text-[18px]"
                      }
                    >
                      MIG’s IT Staff Augmentation
                    </p>
                    <p className={"text-blackmig mt-2 text-xs"}>
                      All talent contract matters will be handled by MIG.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig py-3 px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen font-gilroysemibold text-[18px]"
                      }
                    >
                      MIG’s Headhunt
                    </p>
                    <p className={"text-blackmig mt-2 text-xs"}>
                      All talent contract matters will be handled by clients.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig py-3 px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <p
                      className={
                        "text-darkgrey font-gilroybold text-[18px] self-center"
                      }
                    >
                      Common Recruitment (CV Search, Job Portal, etc)
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div
                  className={"border border-dividermig  bg-white text-center"}
                >
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    Managing high-demand tech talent
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Leave it to us, we’ll manage everything for you.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      We’ll take care of it all for you.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      But, do you feel overwhelmed sometimes?
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div className={"border border-dividermig  bg-white"}>
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    Large, top-tier tech talent pool
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      We have tech talent at all levels.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Let’s meet our superior tech talents!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CloseOutlined size={"14px"} style={{ color: "#B8B8B8" }} />
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      A time-consuming search for top talent, right?
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div className={"border border-dividermig  bg-white text-left"}>
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    Budget matching
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      We’re a cost-effective solution for you.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Pay per use, and optimize your budget.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[11px] bg-white text-center w-[325px]"
                    }
                  >
                    <CloseOutlined size={"14px"} style={{ color: "#B8B8B8" }} />
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Potentially higher than expected cost!
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div className={"border border-dividermig  bg-white text-left"}>
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    Rigorous technical screening
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      No need to repeat complex technical tests and interviews
                      on your own.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      We'll conduct multiple rounds of technical tests and
                      interviews.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      One more user interview for more understanding.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div className={"border border-dividermig  bg-white"}>
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    Guaranteed talent availability
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Talent headcounts & work periods, level, and tenure, all
                      set!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Anything talent hiring-related, all covered!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CloseOutlined size={"14px"} style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      They may decline your offer, and you'll have to start
                      over.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div className={"border border-dividermig bg-white"}>
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    Covering all administration tasks; from payroll to
                    offboarding.
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Focus on your work, and leave their needs to us.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CloseOutlined size={"14px"} style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      If you want us to do it, check out our IT Staff
                      Augmentation
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      The responsibility is yours to fulfill.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <div className={"border border-dividermig  bg-white"}>
                  <p
                    className={
                      "px-3 py-[26px]  text-mono30 font-gilroybold text-[18px] w-[244px]"
                    }
                  >
                    New candidates are assured, if there’s a resignation.
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CheckOutlined
                      width={"17.59px"}
                      height={"13.41px"}
                      style={{ color: "#188E4D" }}
                    />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      You can expect to meet them soon. There’s no charge!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CloseOutlined size={"14px"} style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Pay as you go, and we’ll handle it.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig pb-3 pt-[17.29px] px-[12px] bg-white text-center w-[325px]"
                    }
                  >
                    <CloseOutlined size={"14px"} style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[18px] mt-[9.29px]"
                      }
                    >
                      Spend the money and time on the recruitment process,
                      again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"mt-[17.39px] md:hidden"}>
              <div className={"flex flex-row overflow-x-auto"}>
                <div className={"border border-dividermig w-[100px] bg-white"}>
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs w-[100px]"
                    }
                  ></p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen font-gilroysemibold text-xs"
                      }
                    >
                      MIG’s IT Staff Augmentation
                    </p>
                    <p className={"text-blackmig mt-2 text-xs"}>
                      All talent contract matters will be handled by MIG.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <p
                      className={
                        "text-primarygreen font-gilroysemibold text-xs"
                      }
                    >
                      MIG’s Headhunt
                    </p>
                    <p className={"text-blackmig mt-2 text-xs"}>
                      All talent contract matters will be handled by clients.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <p
                      className={
                        "text-darkgrey font-gilroybold text-xs self-center"
                      }
                    >
                      All talent contract matters will be handled by clients.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div
                  className={"border border-dividermig  bg-white text-center"}
                >
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs w-[100px]"
                    }
                  >
                    Managing high-demand tech talent
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Leave it to us, we’ll manage everything for you.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      We’ll take care of it all for you.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      But, do you feel overwhelmed sometimes?
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div className={"border border-dividermig  bg-white"}>
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs w-[100px] text-center"
                    }
                  >
                    Large, top-tier tech talent pool
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      We have tech talent at all levels.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Let’s meet our superior tech talents!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CloseOutlined style={{ color: "#B8B8B8" }} />
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      A time-consuming search for top talent, right?
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div
                  className={"border border-dividermig  bg-white text-center"}
                >
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold w-[100px] text-xs"
                    }
                  >
                    Budget matching
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      We’re a cost-effective solution for you.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Pay per use, and optimize your budget.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CloseOutlined style={{ color: "#B8B8B8" }} />
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Potentially higher than expected cost!
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div
                  className={"border border-dividermig  bg-white text-center"}
                >
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs w-[100px]"
                    }
                  >
                    Rigorous technical screening
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      No need to repeat complex technical tests and interviews
                      on your own.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      We'll conduct multiple rounds of technical tests and
                      interviews.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      One more user interview for more understanding.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div className={"border border-dividermig  bg-white"}>
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs w-[100px] text-center"
                    }
                  >
                    Guaranteed talent availability
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Talent headcounts & work periods, level, and tenure, all
                      set!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Anything talent hiring-related, all covered!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CloseOutlined style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      They may decline your offer, and you'll have to start
                      over.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div className={"border border-dividermig bg-white"}>
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs w-[100px] text-center"
                    }
                  >
                    Covering all administration tasks; from payroll to
                    offboarding.
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Focus on your work, and leave their needs to us.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CloseOutlined style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      If you want us to do it, check out our IT Staff
                      Augmentation
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      The responsibility is yours to fulfill.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex flex-row overflow-x-auto"}>
                <div className={"border border-dividermig  bg-white"}>
                  <p
                    className={
                      "p-3  text-mono30 font-gilroybold text-xs text-center w-[100px]"
                    }
                  >
                    New candidates are assured, if there’s a resignation.
                  </p>
                </div>
                <div class="flex flex-row">
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CheckOutlined style={{ color: "#188E4D" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      You can expect to meet them soon. There’s no charge!
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CloseOutlined style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Pay as you go, and we’ll handle it.
                    </p>
                  </div>
                  <div
                    className={
                      "border border-dividermig p-3 bg-white text-center w-[132px]"
                    }
                  >
                    <CloseOutlined style={{ color: "#B8B8B8" }} />{" "}
                    <p
                      className={
                        "text-blackmig font-gilroyregular text-[10px] mt-[8.41px]"
                      }
                    >
                      Spend the money and time on the recruitment process,
                      again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* testimonial */}
          {dataTestimonial && (
            <section
              className={
                "section3landingpageadvantages hidden md:block bg-bgjoinmig pt-8 pb-[172px] px-[30px] md:px-10"
              }
            >
              <p
                className={
                  "text-xl md:text-[32px] text-center  font-gilroysemibold mb-[42px]"
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
                "sectiontestimonialmobile block md:hidden bg-bgjoinmig py-8 md:pt-8 md:py-16 px-[30px] md:px-10"
              }
            >
              <p
                className={
                  "text-xl md:text-3xl text-center  font-gilroysemibold md:py-0 mb-7 md:mb-10"
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
                    className="py-4 px-8 bg-white rounded-lg w-[300px]"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="">
                      <p className="text-sm text italic  font-gilroysemibold">
                        "
                      </p>

                      <p className="pb-4 font-gilroyregular text-sm mx-auto text-left">
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
                      <p className="text-sm text italic  font-gilroysemibold">
                        "
                      </p>
                      <div className="flex flex-col">
                        <div className="flex flex-row mt-2">
                          <img
                            className="rounded-full"
                            src="/image/landingpage/testimonial-user.png"
                            style={{ height: "40px", width: "40px" }}
                            alt=""
                          />
                          <div className="self-center ml-[6.8px]">
                            <p className="text-xs font-gilroysemibold  text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-xs font-gilroysemibold  text-darkgrey">
                              Talent Acquisition at Bukopin
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="py-4 px-8 bg-white rounded-lg w-[300px]"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="">
                      <p className="text-sm text italic  font-gilroysemibold">
                        "
                      </p>

                      <p className="pb-4 font-gilroyregular text-sm mx-auto text-left">
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
                      <p className="text-sm text italic  font-gilroysemibold">
                        "
                      </p>
                      <div className="flex flex-col">
                        <div className="flex flex-row mt-2">
                          <img
                            className="rounded-full"
                            src="/image/landingpage/testimonial-user.png"
                            style={{ height: "40px", width: "40px" }}
                            alt=""
                          />
                          <div className="self-center ml-[6.8px]">
                            <p className="text-xs font-gilroysemibold  text-black">
                              Fachri Fauzan
                            </p>
                            <p className="text-xs font-gilroysemibold  text-darkgrey">
                              Talent Acquisition at Bukopin
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="py-4 px-8 bg-white rounded-lg w-[300px]"
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                  >
                    <div className="">
                      <p className="text-sm text italic  font-gilroysemibold">
                        "
                      </p>

                      <p className="pb-4 font-gilroyregular text-sm mx-auto text-left">
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
                            style={{ height: "40px", width: "40px" }}
                            alt=""
                          />
                          <div className="self-center ml-[6.8px]">
                            <p className="text-xs font-gilroysemibold  text-black">
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
                        "text-base text-primarygreen  font-gilroysemibold"
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

          {/* coverages */}
          <section
            className={
              "sectioncoverages hidden md:block bg-transp60 pt-8 pb-32 px-4 sm:px-10 md:px-[113.5px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl md:text-[36px] text-blackmig text-center  font-gilroysemibold py-8 md:py-0 mb-10"
              }
            >
              Coverages
            </h2>
            <div
              className={"bg-white p-12 items-center w-[788px] mx-auto"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <ul className={"coverage-list text-[18px]"}>
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
                "text-xl text-blackmig text-center  font-gilroysemibold"
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
              "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-[31px] h-[173px]"
            }
          >
            <div className={"justify-start self-end"}>
              <img
                style={{ width: "332px", height: "142px" }}
                src="/image/landingpage/footer-left.png"
              />
            </div>
            <div className={"container w-1/2 mx-auto"}>
              <div class="bg-white border-3 mx-auto w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[144px] py-[31.38px] px-4">
                <h2
                  style={{ lineHeight: "120%" }}
                  className={"text-[28px] font-gilroysemibold text-black"}
                >
                  Fulfill your IT needs easily!
                </h2>
                <div
                  className={
                    "mt-3.5 text-xl font-gilroyregular text-center text-black"
                  }
                >
                  <p
                    style={{ lineHeight: "150%" }}
                    className={"py-5 text-xl font-gilroyregular text-black"}
                  >
                    Need help in providing your needs? Whether they related to
                    hardware, software, or even talent hiring? Contact us and
                    hear what service can we offer to you and your company!
                  </p>
                </div>
                <Link href="/contactus">
                  <button
                    className={
                      "text-sm text-white border-2 rounded bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-3.5"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"text-xl font-gilroysemibold"}>
                        Contact Us
                      </p>
                      <img
                        className={"self-center ml-2"}
                        style={{ height: "20px", width: "20px" }}
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
          <section
            className={
              "contactusphone mt-20 md:relative block md:hidden md:flex bg-bgfooter pt-8"
            }
          >
            <div className={"container mx-auto"}>
              <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
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
                      "text-base text-center -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 rounded"
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

export default Talents;
