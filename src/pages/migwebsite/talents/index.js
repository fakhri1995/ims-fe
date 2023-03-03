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
import Linkk from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReCAPTCHA from "react-google-recaptcha";
import Slider from "react-slick";

import { objectToFormData } from "lib/helper";
import { generateStaticAssetUrl } from "lib/helper";

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
  const captchaRefMobile = useRef(null);
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
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const [meetingDateStatus, setMeetingDateStatus] = useState(false);
  const [meetingTimeStatus, setMeetingTimeStatus] = useState(false);
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
      setDataPeople({
        ...dataPeople,
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
    // setShowform(true);
  };
  const handleHireTalent = () => {
    setModalTalents(false);
    setModalTalentsData(false);
    setModalTalentsDesign(false);
    setModalTalentsProduct(false);
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
    setMeetingDateStatus(false);
    onChangeDateTemp(value);
    onChangeDate(value);
  };
  const onChangeValueMeetingTime = (value, label) => {
    if (value == valueMeetingTime) {
      setValueMeetingTime(null);
    } else {
      setMeetingTimeStatus(false);
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
  const changeCaptcha = (value) => {
    console.log("valuenya ", value);
    setCaptchaStatus(false);
  };
  const submitFormSoftware = (device) => {
    let recaptchaValue = null;
    if (device == "web") {
      recaptchaValue = captchaRef.current.getValue();
    } else {
      recaptchaValue = captchaRefMobile.current.getValue();
    }
    if (
      recaptchaValue != "" &&
      valueDateTemp != null &&
      valueMeetingTime != null
    ) {
      setCaptchaStatus(false);
      setMeetingTimeStatus(false);
      setMeetingDateStatus(false);
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
    } else {
      if (recaptchaValue == "") {
        setCaptchaStatus(true);
      }
      if (valueDateTemp == null) {
        setMeetingDateStatus(true);
      }
      if (valueMeetingTime == null) {
        setMeetingTimeStatus(true);
      }
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
      console.log("datatalents ", dataTalents);
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
      arr.push("Web Developer");
      arr.push("Mobile App Developer");
      arr.push("Quality Assurance Engineer");
      arr.push("Android Developer");
      arr.push("iOS Developer");
      arr.push("C++");
      arr.push("HTML5");
      arr.push("JavaScript");
      arr.push("PHP");
      arr.push("Spring");
      arr.push("Laravel");
      arr.push("Tibco");
    } else if (value == "Data") {
      arr.push("Data Scientist");
      arr.push("Data Analyst");
      arr.push("Business Intelligence Analyst");
      arr.push("SQL");
      arr.push("Oracle");
      arr.push("Phyton");
    } else if (value == "Design") {
      arr.push("Graphic Designer");
      arr.push("Product Designer");
      arr.push("UI/UX Designer");
    } else if (value == "Product") {
      arr.push("Product Manager");
      arr.push("Product Analyst");
      arr.push("Project Manager");
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
                ? "xl:pl-[112px] 2xl:pl-[224px] py-[76px] hidden lg:flex lg:flex-row lg:justify-between"
                : "xl:pl-[112px] 2xl:pl-[224px] py-[76px] hidden lg:flex lg:flex-row"
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
                              <p className={"text-blackmig text-base"}>
                                {name}
                              </p>
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
                          ? "Engineering"
                          : kindOfTalent == "Data"
                          ? "Data"
                          : kindOfTalent == "Design"
                          ? "Design"
                          : kindOfTalent == "Product"
                          ? "Product"
                          : "Others"}
                      </p>
                    </div>
                  )}
                  {skillSuggestion.length > 0 && (
                    <div className={"flex flex-row flex-wrap mt-3"}>
                      {skillSuggestion.map((data, index) => (
                        <button
                          onClick={() => handleSuggestionSkill(data)}
                          className={
                            " border bg-white border-transp45 rounded-[20px] py-1 px-2 flex flex-row mr-3 mt-3"
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
                          you want to hire?
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
                          width: "170px",
                          fontSize: "16px",
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
                        "text-white bg-white border-2 border-primarygreen rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
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
                {meetingDateStatus == true || meetingTimeStatus == true ? (
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
                ) : (
                  <div></div>
                )}
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
                    onChange={changeCaptcha}
                    // sitekey={"6LdBDkkjAAAAAH9NtxIC8IhWeDbdbSfuKJUaR074"}
                    sitekey={`${process.env.NEXT_PUBLIC_G_RECAPTCHA_CID}`}
                  />
                </div>
                {captchaStatus && (
                  <div className="ant-form-item-explain-error">
                    <p>You must fill captcha</p>
                  </div>
                )}
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("third")}
                  >
                    <p className={"text-[18px] text-primarygreen"}>Back</p>
                  </button>
                  <button
                    type={"submit"}
                    onClick={() => submitFormSoftware("web")}
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
                <p className={"text-xl text-primarygreen font-gilroysemibold"}>
                  Thank you for your interest in providing your IT needs through
                  Mitramas Infosys Global
                </p>
                <p className={"mt-4 text-sm text-blackmig"}>
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
                        className={"font-gilroyregular text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Company Name</p>}
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
                        className={"font-gilroyregular text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Email</p>}
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
                    <div className={"w-full"}>
                      <Form.Item
                        name={"Contact Name"}
                        className={"font-gilroyregular text-sm"}
                        label={<p style={{ fontSize: "14px" }}>Contact Name</p>}
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
                        className={"font-gilroyregular text-sm"}
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
                    className={"text-base text-blackmig font-gilroysemibold"}
                  >
                    General Information
                  </p>
                  {/* <p className={"mt-9"}>* What type of project are you hiring us for?</p> */}
                  <div className={"mt-9"}>
                    <Form.Item
                      name={"type project"}
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
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
                    <Form.Item
                      name={"kind project"}
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
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
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={() => handleForm("first")}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        Back
                      </p>
                    </button>
                    <button
                      className={
                        "text-white bg-primarygreen rounded py-2 pl-4 pr-[12.18px]  flex flex-row justify-between"
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
                </Form>
              </div>
            ) : formActive == "third" ? (
              <div className="w-full">
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
                  className={"text-base text-blackmig font-gilroysemibold"}
                >
                  Talent Information
                </p>
                <Form
                  id="formtalentdetail"
                  hidden={!feedback}
                  layout={"vertical"}
                  // onFinish={handleSubmitThird}
                  form={form}
                >
                  {/* choose product */}
                  <div className={"mt-8 w-full"}>
                    <Form.Item
                      name="kind_of_talent"
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
                          What kind of talent are you looking for?
                        </p>
                      }
                    >
                      <Select
                        style={{ border: "1px solid #B8B8B8" }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="kind_of_talent"
                        onChange={(value) => {
                          handleKindOfTalent(value);
                        }}
                        allowClear
                      >
                        <Option value="Engineering">Engineering</Option>
                        <Option value="Data">Data</Option>
                        <Option value="Product">Product</Option>
                        <Option value="Design">Design</Option>
                        <Option value="Others">Others</Option>
                      </Select>
                    </Form.Item>
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
                              "text-sm text-blackmig font-gilroyregular"
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
                      <p className={"text-sm text-blackmig"}>
                        Popular roles or skills for{" "}
                        {kindOfTalent == "Engineering"
                          ? "Engineering"
                          : kindOfTalent == "Data"
                          ? "Data"
                          : kindOfTalent == "Design"
                          ? "Design"
                          : kindOfTalent == "Product"
                          ? "Product"
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

                  <div className={"mt-8 w-full"}>
                    <Form.Item
                      name="level_employee"
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
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
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p className={"text-blackmig"}>
                          How many talent in{" "}
                          <span className={"font-gilroysemibold text-sm"}>
                            {kindOfTalent}
                          </span>{" "}
                          you want to hire?
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
                    <p className={"text-blackmig text-sm font-gilroysemibold"}>
                      2. Additional Information
                    </p>
                  </div>
                  <div className={"mt-8 w-full"}>
                    <Form.Item
                      name="urgently_need"
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p
                          style={{ fontSize: "14px" }}
                          className={"text-sm font-gilroyregular"}
                        >
                          How soon do you need the talent?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "14px",
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
                  <div className={"mt-8 w-full"}>
                    <Form.Item
                      name="time_used"
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p
                          style={{ fontSize: "14px" }}
                          className={"text-sm font-gilroyregular"}
                        >
                          How long do you need the the talent?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "14px",
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
                  <div className={"mt-8 w-full"}>
                    <Form.Item
                      name="open_remote"
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
                          Are you open in hiring our remote talent? (work from
                          home)
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "14px",
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
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p className={"text-blackmig text-sm"}>
                          What is your maximum budget for your new hire?
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        // value={manyTalent}
                        style={{
                          // border: "1px solid #B8B8B8",
                          width: "170px",
                          fontSize: "14px",
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
                      className={"font-gilroyregular text-sm"}
                      label={
                        <p className={"text-blackmig text-sm"}>
                          Details (Optional)
                        </p>
                      }

                      // rules={[{ required: true }]}
                    >
                      <TextArea
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "14px",
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
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        Back
                      </p>
                    </button>
                    <button
                      onClick={handleAddAnotherProduct}
                      className={
                        "text-white bg-white border-2 border-primarygreen rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                      }
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        {statusEdit ? "Update Request" : "Add Request"}
                      </p>
                      <img
                        className={"self-center ml-[13.31px]"}
                        style={{ width: "20px", height: "20px" }}
                        src="/image/plus.png"
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
                {meetingDateStatus == true || meetingTimeStatus == true ? (
                  <div className={"mt-9 bg-bgjoinmig px-3 py-2 rounded-lg"}>
                    <p className={"ml-3 text-base text-blackmig self-center"}>
                      Please choose a meeting date & time with Mitramas Infosys
                      Global
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
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
                    ref={captchaRefMobile}
                    onChange={changeCaptcha}
                    // sitekey={"6LdBDkkjAAAAAH9NtxIC8IhWeDbdbSfuKJUaR074"}
                    sitekey={`${process.env.NEXT_PUBLIC_G_RECAPTCHA_CID}`}
                  />
                </div>
                {captchaStatus && (
                  <div className="ant-form-item-explain-error">
                    <p>You must fill captcha</p>
                  </div>
                )}
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("third")}
                  >
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
                    onClick={() => submitFormSoftware("mobile")}
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
            {formActive == "third" ? (
              <div>
                {dataTalents.length > 0 && (
                  <div
                    className={"py-4 pl-4 pr-[17px] mt-4"}
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
              <div></div>
            )}
          </section>
          {/* end section form mobile */}
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
              <div className={"flex-col w-1/2"}>
                <h1
                  style={{ lineHeight: "120%" }}
                  className={"text-[36px] pb-4 font-gilroysemibold"}
                >
                  {t.talentherotitle}
                </h1>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-8 font-gilroyregular text-xl"}
                >
                  {t.talentherodescription}
                </p>
                <div className={"mt-[40px]"}>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={"font-gilroybold text-primarygreen text-xl"}
                  >
                    {t.talentheroreachus}
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
                      placeholder={t.talentheroemailplaceholder}
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
                          {locale == "en" ? " Hire now!" : "Rekrut talent"}
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
                  {/* <div
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
                  </div> */}
                </div>
              </div>
              <div className={"flex-col w-1/2"}>
                <img
                  src="/image/landingpage/Talents-2.png"
                  className={"w-full h-[389px]"}
                ></img>
              </div>
            </div>
            {/*section 1 talents mobile */}
            <div className={"block md:hidden py-9 px-4"}>
              <div className={""}>
                <p
                  className={
                    "text-blackmig text-xl text-center font-gilroysemibold"
                  }
                >
                  {t.talentherotitle}
                </p>
                <img
                  src="/image/landingpage/Talents-2.png"
                  className={"w-[292px] h-[174px] mt-6 mx-auto"}
                ></img>
                <p
                  className={
                    "py-6 text-center text-base font-gilroyregular text-blackmig"
                  }
                >
                  {t.talentherodescription}
                </p>
              </div>
              <div>
                <p className={"font-gilroysemibold text-primarygreen text-sm"}>
                  {t.talentheroreachus}
                </p>
                <div className={"flex flex-row items-center mt-1"}>
                  <Input
                    name={"email"}
                    className={"w-[241px] h-[37px]"}
                    onChange={(e) => {
                      setDataPeople({
                        ...dataPeople,
                        company_email: e.target.value,
                      });
                    }}
                    placeholder={t.talentheroemailplaceholder}
                  />
                  <button
                    onClick={handleHireNow}
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
              "section2talentsnew py-4 md:py-12 md:px-[113.5px] px-4 mx-auto mt:4 md:mt-12"
            }
          >
            <h2
              className={
                "text-xl lg:text-[36px] text-blackmig text-center font-gilroysemibold"
              }
              style={{ lineHeight: "120%" }}
            >
              Conventional hiring takes massive effort.
            </h2>
            <p
              style={{ lineHeight: "150%" }}
              className={"text-base md:text-xl text-blackmig text-center mt-4"}
            >
              Limited profiles coming in with widely different qualities.
              Turnover rate is high and you need to do it all over again.
            </p>
            <div className={"mt-5"}>
              <p
                style={{ lineHeight: "150%" }}
                className={"text-blackmig text-xl md:text-2xl text-center"}
              >
                Let us streamline your process with:
              </p>
            </div>
            <div
              className={"mt-7 md:mt-12 md:flex md:flex-row md:justify-center"}
            >
              <div
                className={
                  "flex flex-row mx-[25px] items-center w-full lg:w-[500px]"
                }
              >
                <img
                  src="/image/landingpage/career-icon1.png"
                  className="w-[42px] h-[42px]"
                />
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-base md:text-xl text-blackmig font-gilroysemibold ml-4"
                    }
                  >
                    On-demand project-based expertise
                  </p>
                </div>
              </div>
              <div
                className={
                  "flex flex-row mt-7 lg:mt-0 mx-[25px] items-center w-full lg:w-[500px]"
                }
              >
                <img
                  src="/image/landingpage/career-icon2.png"
                  className="w-[42px] h-[42px]"
                />
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-base md:text-xl text-blackmig font-gilroysemibold ml-4"
                    }
                  >
                    Flexible talent head counts & working period
                  </p>
                </div>
              </div>
            </div>
            <div
              className={"mt-7 md:mt-12 md:flex md:flex-row md:justify-center"}
            >
              <div
                className={
                  "flex flex-row mx-[25px] items-center w-full lg:w-[500px]"
                }
              >
                <img
                  src="/image/landingpage/career-icon4.png"
                  className="w-[42px] h-[42px]"
                />
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-base md:text-xl text-blackmig font-gilroysemibold ml-4"
                    }
                  >
                    Guaranteed talent quality
                  </p>
                </div>
              </div>
              <div
                className={
                  "flex flex-row mt-7 items-center lg:mt-0 mx-[25px] w-full lg:w-[500px]"
                }
              >
                <img
                  src="/image/landingpage/career-icon3.png"
                  className="w-[42px] h-[42px]"
                />
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-base md:text-xl text-blackmig font-gilroysemibold ml-4"
                    }
                  >
                    Cost and admin process efficiency
                  </p>
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
              {locale == "en"
                ? "Access a wide range of "
                : "Dapatkan akses ke beragam "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                {locale == "en" ? "tech talents " : "talenta teknologi "}
              </span>{" "}
              {locale == "en" ? "with us." : "kami."}
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
                        {locale == "en" ? "Typical Roles" : "Posisi"}
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Website Developer, Android/IOS Developer,{" "}
                        {locale == "en" ? "and more" : "dan lainnya"}
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
                      {locale == "en" ? "See more" : "Selengkapnya"}
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
                        {locale == "en" ? "Typical Roles" : "Posisi"}
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Data Scientist, Data/Business Intelligence Analyst,{" "}
                        {locale == "en" ? "and more" : "dan lainnya"}
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
                      {locale == "en" ? "See more" : "Selengkapnya"}
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
                        {locale == "en" ? "Typical Roles" : "Posisi"}
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Product Designer, Web Designer, Graphic Designer,{" "}
                        {locale == "en" ? "and more" : "dan lainnya"}
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
                      {locale == "en" ? "See more" : "Selengkapnya"}
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
                        {locale == "en" ? "Typical Roles" : "Posisi"}
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-blackmig text-xs md:text-[18px] font-gilroysemibold"
                        }
                      >
                        Product Manager, Product Analyst, Project Manager,{" "}
                        {locale == "en" ? "and more" : "dan lainnya"}
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
                      {locale == "en" ? "See more" : "Selengkapnya"}
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
                {t.talentherocustomizetext}
              </p>
              <p
                style={{ lineHeight: "150%" }}
                className={
                  "font-regular font-gilroyregular text-sm px-2 md:px-0  md:text-xl"
                }
              >
                {t.talentherocustomizetext2}
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
                    {locale == "en" ? "Contact our team" : "Kontak tim kami"}
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
                    {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                  </p>
                  <p className={"text-base font-gilroyregular text-blackmig"}>
                    {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
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
                  {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                </p>
                <p className={"text-sm font-gilroyregular text-blackmig"}>
                  {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"text-sm font-gilroysemibold"}>
                  {locale == "en" ? "Typical Roles" : "Posisi"}
                </p>
                <ul className={"text-base text-blackmig font-gilroyregular"}>
                  <li>Web Developer</li>
                  <li>Mobile App Developer</li>
                  <li>
                    Quality Assurance Engineer,{" "}
                    {locale == "en" ? "etc." : "dan lainnya."}
                  </li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicalskills}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.engineeringpopuppoint1}, </li>
                  <li>{t.engineeringpopuppoint2}, </li>
                  <li>{t.engineeringpopuppoint3},</li>
                  <li>{t.engineeringpopuppoint4}, </li>
                  <li>{t.engineeringpopuppoint5}, </li>
                  <li>{t.engineeringpopuppoint6}</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicaldeliverables}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.engineeringpopupskill1},</li>
                  <li>{t.engineeringpopupskill2}, </li>
                  <li>{t.engineeringpopupskill3}, </li>
                  <li>{t.engineeringpopupskill4}.</li>
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
                    {t.interestwithourtalent}
                  </p>
                  <button
                    onClick={handleHireTalent}
                    className={
                      "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"text-base font-gilroysemibold"}>
                        {t.talenthirenow}
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
                    {t.interestwithourtalent}
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
                    {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                  </p>
                  <p className={"text-sm font-gilroyregular text-blackmig"}>
                    {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
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
                  {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {locale == "en" ? "Typical Roles" : "Posisi"}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Data Analyst</li>
                  <li> Data Scientist</li>
                  <li>
                    Business Intelligence Analyst,{" "}
                    {locale == "en" ? "etc." : "dll."}
                  </li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicalskills}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.datapopuppoint1},</li>
                  <li>{t.datapopuppoint2}, </li>
                  <li>{t.datapopuppoint3}, </li>
                  <li>{t.datapopuppoint4}, </li>
                  <li>{t.datapopuppoint5}, </li>
                  <li>{t.datapopuppoint6}.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicaldeliverables}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.datapopupskill1}.</li>
                  <li>{t.datapopupskill2}.</li>
                  <li>{t.datapopupskill3}.</li>
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
                  {t.interestwithourtalent}
                </p>
                <button
                  onClick={handleHireTalent}
                  className={
                    "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-base font-gilroysemibold"}>
                      {t.talenthirenow}
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
                    {t.interestwithourtalent}
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
                      {locale == "en"
                        ? "Working Period"
                        : "Pilihan Masa Kontrak"}
                    </p>
                    <p className={"text-sm font-gilroyregular text-blackmig"}>
                      {locale == "en"
                        ? "1 week - 5 years"
                        : "1 minggu - 5 tahun"}
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
                  {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {locale == "en" ? "Typical Roles" : "Posisi"}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Product Manager</li>
                  <li>Product Analyst, {locale == "en" ? "etc." : "dll."}</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicalskills}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.productpopuppoint1}.</li>
                  <li>{t.productpopuppoint2}. </li>
                  <li>{t.productpopuppoint3}. </li>
                  <li>{t.productpopuppoint4}.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicaldeliverables}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.productpopupskill1}.</li>
                  <li>{t.productpopupskill2}.</li>
                  <li>{t.productpopupskill3}</li>
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
                  {t.interestwithourtalent}
                </p>
                <button
                  onClick={handleHireTalent}
                  className={
                    "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-base font-gilroysemibold"}>
                      {t.talenthirenow}
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
                    {t.interestwithourtalent}
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
                    {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                  </p>
                  <p className={"text-sm font-gilroyregular text-blackmig"}>
                    {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
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
                  {locale == "en" ? "Working Period" : "Pilihan Masa Kontrak"}
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  {locale == "en" ? "1 week - 5 years" : "1 minggu - 5 tahun"}
                </p>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {locale == "en" ? "Typical Roles" : "Posisi"}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>Graphic Designer,</li>
                  <li>Product Designer,</li>
                  <li>UI/UX Designer, {locale == "en" ? "etc." : "dll."}</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicalskills}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.designpopuppoint1} .</li>
                  <li>{t.designpopuppoint2} . </li>
                  <li>{t.designpopuppoint3}. </li>
                  <li>{t.designpopuppoint4}.</li>
                </ul>
              </div>
              <div className={"mt-8"}>
                <p className={"font-gilroysemibold text-sm"}>
                  {t.talentpopuptypicaldeliverables}
                </p>
                <ul className={"text-base font-gilroyregular text-blackmig"}>
                  <li>{t.designpopupskill1}</li>
                  <li>{t.designpopupskill2}</li>
                  <li>{t.designpopupskill3}</li>
                  <li>{t.designpopupskill4}</li>
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
                  {t.interestwithourtalent}
                </p>
                <button
                  onClick={handleHireTalent}
                  className={
                    "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen md:px-4 mt-3.5"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-base font-gilroysemibold"}>
                      {t.talenthirenow}
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
                    {t.interestwithourtalent}
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
              "section4talents hidden md:block bg-bgtalents pt-4 pb-6 md:pt-12 md:pb-24 px-4 sm:px-10 md:px-[113.5px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl md:text-[36px] text-center  font-gilroysemibold py-8 md:py-0"
              }
            >
              {locale == "en" ? "Let us " : "Biarkan MIG "}
              <span
                style={
                  {
                    // borderBottom: "solid 3px #188E4D",
                    // paddingBottom: "2.5px",
                  }
                }
              >
                {locale == "en" ? "assist you " : "membangun "}
              </span>{" "}
              {locale == "en"
                ? "in building a powerful  & capable team. "
                : "tim yang kuat untuk Anda."}
            </h2>
            {/* <p
              style={{ lineHeight: "150%" }}
              className={
                "text-center text-sm  md:text-xl text-black font-gilroyregular pt-6"
              }
            >
              With on-demand expertise and flexibility in talent head counts and
              working period,
            </p> */}
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
                      {t.talentpoint1}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left px-5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.talentsubpoint1}
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
                      {t.talentpoint2}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left px-5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.talentsubpoint2}
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
                      {t.talentpoint3}
                    </p>
                    <p
                      style={{ lineHeight: "150%" }}
                      className={"font-gilroyregular"}
                    >
                      {t.talentsubpoint3}
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
                      {t.talentpoint4}
                    </p>
                    <p
                      style={{ lineHeight: "150%" }}
                      className={"font-gilroyregular"}
                    >
                      {t.talentsubpoint4}
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
          {/* section how it work */}
          <section
            className={
              "section4howitworkbrowser bg-white py-4 md:py-16 md:mb-10 hidden md:block px-4 sm:px-10 md:px-[113.5px]"
            }
          >
            <div className={"container text-center mx-auto"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  "text-xl md:text-[36px] font-gilroybold py-8 md:py-0"
                }
              >
                {t.howitworktalenttitle}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  MIG ?
                </span>{" "}
              </h2>
            </div>
            <div className={"flex flex-row justify-between mt-10"}>
              <div className={""}>
                <div className={"w-[360px]"}>
                  <img
                    className={"mx-auto"}
                    src="/image/talent/talent-how-it-works-1.png"
                    style={{ width: "145px", height: "145px" }}
                  />
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-blackmig text-sm md:text-xl  font-gilroysemibold mt-4 text-center"
                    }
                  >
                    {t.howitworktalentpoint1}
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
                  src="/image/talent/talent-how-it-works-2.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-blackmig text-sm md:text-xl  font-gilroysemibold mt-4 text-center"
                  }
                >
                  {t.howitworktalentpoint2}
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
                  src="/image/talent/talent-how-it-works-3.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-blackmig text-sm md:text-xl  font-gilroysemibold mt-4 text-center"
                  }
                >
                  {t.howitworktalentpoint3}
                </p>
              </div>
            </div>
          </section>
          {/* section how it work mobile */}
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
                  We find high quality hardware products
                </p>
                <p className={"text-sm text-blackmig font-gilroyregular"}>
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
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Custom match with your needs
                </p>
                <p className={"text-sm text-blackmig font-gilroyregular"}>
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
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  We conduct full operation and maintenance for your hardware
                </p>
                <p className={"text-sm text-blackmig font-gilroyregular"}>
                  We ensure guaranteed level of hardware performance throughout
                </p>
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
                                  {data1.quote && (
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
                                  )}
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
                                        "text-blackmig text-[22px] font-gilroysemibold"
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
                                        className={"max-w-[100px] h-auto"}
                                        src={generateStaticAssetUrl(
                                          data1.company_logo.link
                                        )}
                                      />
                                    ) : (
                                      <img
                                        className={"max-w-[100px] h-auto"}
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
                                        {locale == "en"
                                          ? "Read Story"
                                          : "Baca Cerita"}
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
                {t.customerstorieslandingpage}
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
          {/* <section
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
          </section> */}
          {/*coverages mobile */}
          {/* <section
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
          </section> */}
          <section
            className={
              "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-[20px] h-[173px]"
            }
          >
            <div className={"justify-start self-end"}>
              <img
                style={{ width: "332px", height: "142px" }}
                src="/image/landingpage/footer-left.png"
              />
            </div>
            <div className={"container w-1/2 mx-auto"}>
              <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-24 py-4 px-8">
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
